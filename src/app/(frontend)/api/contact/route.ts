import { NextResponse } from 'next/server'
import { headers as getHeaders } from 'next/headers'
import { getPayloadClient } from '@/lib/payload'

export const dynamic = 'force-dynamic'

const LIMITS = { name: 120, email: 200, message: 4000 } as const

/** Deliberately loose — real validation is "can this bounce", not RFC 5322. */
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

/** A human takes longer than this to read the form and type a message. */
const MIN_FILL_MS = 2500

/**
 * Per-instance throttle. On Vercel each serverless instance has its own map, so
 * this thins out floods rather than enforcing a hard global cap — that needs
 * shared state (Upstash Redis) to be airtight. Good enough to stop one bot
 * hammering a single warm instance.
 */
const RATE_LIMIT = { max: 5, windowMs: 10 * 60 * 1000 }
const hits = new Map<string, number[]>()

function rateLimited(ip: string): boolean {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT.windowMs)
  recent.push(now)
  hits.set(ip, recent)

  // Opportunistic cleanup so the map cannot grow without bound on a long-lived
  // instance. Cheap because it only runs when the map is already large.
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= RATE_LIMIT.windowMs)) hits.delete(key)
    }
  }

  return recent.length > RATE_LIMIT.max
}

function clean(value: unknown, max: number): string {
  return typeof value === 'string' ? value.trim().slice(0, max) : ''
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Record<string, unknown>

    // Honeypot: a field hidden from humans that bots fill in anyway. Answer 200
    // so the bot records a success and does not retry with a different shape.
    if (clean(body.company, 200)) {
      return NextResponse.json({ ok: true })
    }

    // Same treatment for an implausibly fast submit. `elapsedMs` is client-sent
    // and therefore forgeable — it filters naive bots, it is not a real defence.
    // Turnstile is the upgrade path.
    const elapsedMs = typeof body.elapsedMs === 'number' ? body.elapsedMs : 0
    if (elapsedMs > 0 && elapsedMs < MIN_FILL_MS) {
      return NextResponse.json({ ok: true })
    }

    const headers = await getHeaders()
    const ip = (headers.get('x-forwarded-for') ?? '').split(',')[0].trim() || 'unknown'

    if (rateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many messages from this connection. Please try again later.' },
        { status: 429 },
      )
    }

    const name = clean(body.name, LIMITS.name)
    const email = clean(body.email, LIMITS.email)
    const message = clean(body.message, LIMITS.message)

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email and message are all required.' }, { status: 400 })
    }
    if (!EMAIL.test(email)) {
      return NextResponse.json({ error: 'That email address does not look right.' }, { status: 400 })
    }

    const payload = await getPayloadClient()
    await payload.create({
      collection: 'contact-submissions',
      // The collection closes `create` so Payload's generic REST endpoint is not
      // publicly writable; this route is the only sanctioned way in.
      overrideAccess: true,
      data: {
        name,
        email,
        message,
        status: 'new',
        meta: {
          sourcePath: clean(body.sourcePath, 300) || null,
          userAgent: headers.get('user-agent')?.slice(0, 300) ?? null,
          ip,
        },
      },
    })

    // TODO: notify on new submissions once an email provider is configured.
    // Storing first means a provider outage can never lose a lead.

    return NextResponse.json({ ok: true })
  } catch (err: unknown) {
    if (err && typeof err === 'object' && 'digest' in err) throw err
    console.error('[contact] submission failed:', err)
    return NextResponse.json({ error: 'Could not send your message. Please try again.' }, { status: 500 })
  }
}
