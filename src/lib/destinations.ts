import 'server-only'

import { getPayloadClient } from '@/lib/payload'
import { toEditorRecord, toListItem } from '@/lib/destination-dto'

export { toEditorRecord, toListItem } from '@/lib/destination-dto'

export async function listDestinations(opts?: { draft?: boolean }) {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'destinations',
    depth: 1,
    limit: 100,
    sort: '-updatedAt',
    draft: opts?.draft ?? true,
    overrideAccess: true,
  })
  return result.docs.map((d) => toListItem(d as unknown as Record<string, unknown>))
}

export async function getDestinationBySlug(
  slug: string,
  opts?: { draft?: boolean; overrideAccess?: boolean },
) {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'destinations',
    where: { slug: { equals: slug } },
    depth: 1,
    limit: 1,
    draft: opts?.draft ?? false,
    overrideAccess: opts?.overrideAccess ?? false,
  })
  const doc = result.docs[0]
  return doc ? (doc as unknown as Record<string, unknown>) : null
}

export async function getPublishedDestination(slug: string) {
  const doc = await getDestinationBySlug(slug, { draft: false, overrideAccess: false })
  if (!doc) return null
  if (doc._status && doc._status !== 'published') return null
  return toEditorRecord(doc)
}

export async function getEditorDestination(slug: string) {
  const doc = await getDestinationBySlug(slug, { draft: true, overrideAccess: true })
  return doc ? toEditorRecord(doc) : null
}
