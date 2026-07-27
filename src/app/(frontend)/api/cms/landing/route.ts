import { NextResponse } from 'next/server'
import { getPayloadClient } from '@/lib/payload'
import { requireCmsUser } from '@/lib/cms-auth'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const { payload } = await requireCmsUser()
    const doc = await payload.findGlobal({ slug: 'landing-page', overrideAccess: true })
    return NextResponse.json(doc)
  } catch (err: unknown) {
    // requireCmsUser throws a redirect — let Next handle it
    if (err && typeof err === 'object' && 'digest' in err) throw err
    return NextResponse.json({ error: 'Failed to load' }, { status: 500 })
  }
}

export async function PATCH(req: Request) {
  try {
    const { payload } = await requireCmsUser()
    const body = (await req.json()) as Record<string, unknown>
    const doc = await payload.updateGlobal({
      slug: 'landing-page',
      data: body,
      overrideAccess: true,
    })
    try {
      const { revalidatePath } = await import('next/cache')
      revalidatePath('/')
    } catch {}
    return NextResponse.json(doc)
  } catch (err: unknown) {
    if (err && typeof err === 'object' && 'digest' in err) throw err
    return NextResponse.json({ error: 'Failed to save' }, { status: 500 })
  }
}
