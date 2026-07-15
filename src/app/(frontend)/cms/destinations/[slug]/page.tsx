import { DestinationEditor } from '@/components/cms/DestinationEditor'
import { emptyDestinationRecord } from '@/lib/cms-data'
import { requireCmsUser } from '@/lib/cms-auth'
import { getEditorDestination } from '@/lib/destinations'
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

  if (slug === 'new') {
    return <DestinationEditor initial={emptyDestinationRecord()} isNew />
  }

  const record = await getEditorDestination(slug)
  if (!record) notFound()
  return <DestinationEditor initial={record} />
}
