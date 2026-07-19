import { DestinationEditor } from '@/components/cms/DestinationEditor'
import { emptyDestinationRecord } from '@/lib/cms-data'
import { requireCmsUser } from '@/lib/cms-auth'
import { getEditorDestination, listDestinations } from '@/lib/destinations'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

type Props = { params: Promise<{ slug: string }> }

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  await requireCmsUser()
  const { slug } = await params
  if (slug === 'new') return { title: 'New Destination · CMS' }
  const record = await getEditorDestination(slug)
  return { title: record ? `${record.name} · CMS` : 'Destination · CMS' }
}

export default async function CmsDestinationEditorPage({ params }: Props) {
  await requireCmsUser()
  const { slug } = await params

  const relatable = (await listDestinations({ draft: true }))
    .filter((d) => d.id != null && d.slug !== slug)
    .map((d) => ({ id: d.id!, name: d.name }))

  if (slug === 'new') {
    return <DestinationEditor initial={emptyDestinationRecord()} isNew relatable={relatable} />
  }

  const record = await getEditorDestination(slug)
  if (!record) notFound()
  return <DestinationEditor initial={record} relatable={relatable} />
}
