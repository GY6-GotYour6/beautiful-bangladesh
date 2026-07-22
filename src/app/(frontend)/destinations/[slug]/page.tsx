import { CmsDestinationView } from '@/components/destination/CmsDestinationView'
import { getPublishedDestination, listDestinations } from '@/lib/destinations'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

type Props = { params: Promise<{ slug: string }> }

export const dynamic = 'force-dynamic'

export async function generateStaticParams() {
  try {
    const fromCms = await listDestinations({ draft: false })
    return fromCms.filter((d) => d.status === 'published').map((d) => ({ slug: d.slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  try {
    const record = await getPublishedDestination(slug)
    if (record) {
      return {
        title: record.metaTitle || `${record.name} | Beautiful Bangladesh`,
        description: record.metaDescription || record.heroSubtitle || record.overviewDescription,
      }
    }
  } catch {
    // fall through
  }
  return { title: 'Destination | Beautiful Bangladesh' }
}

export default async function DestinationRoute({ params }: Props) {
  const { slug } = await params

  try {
    const record = await getPublishedDestination(slug)
    if (record) return <CmsDestinationView record={record} />
  } catch {
    // DB unavailable
  }

  notFound()
}
