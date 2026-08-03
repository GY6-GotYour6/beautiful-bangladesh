import { NextResponse } from 'next/server'
import { headers as getHeaders } from 'next/headers'
import { revalidatePath, revalidateTag } from 'next/cache'
import { getPayloadClient } from '@/lib/payload'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const payload = await getPayloadClient()
    const headers = await getHeaders()
    const { user } = await payload.auth({ headers })
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const doc = await payload.findGlobal({ slug: 'landing-page', overrideAccess: true })
    return NextResponse.json(doc)
  } catch (err: unknown) {
    if (err && typeof err === 'object' && 'digest' in err) throw err
    return NextResponse.json({ error: 'Failed to load' }, { status: 500 })
  }
}

export async function PATCH(req: Request) {
  try {
    const payload = await getPayloadClient()
    const headers = await getHeaders()
    const { user } = await payload.auth({ headers })
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const body = (await req.json()) as Record<string, unknown>
    const doc = await payload.updateGlobal({
      slug: 'landing-page',
      data: body,
      overrideAccess: true,
    })
    revalidateTag('landing-page', 'default')
    revalidatePath('/', 'layout')
    return NextResponse.json(doc)
  } catch (err: unknown) {
    if (err && typeof err === 'object' && 'digest' in err) throw err
    return NextResponse.json({ error: 'Failed to save' }, { status: 500 })
  }
}
