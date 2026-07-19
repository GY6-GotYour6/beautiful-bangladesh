import { CmsDestinationView } from '@/components/destination/CmsDestinationView'
import { DestinationPage } from '@/components/destination/DestinationPage'
import { getPublishedDestination, listDestinations } from '@/lib/destinations'
import { destinations as staticDestinations } from '@/lib/landing-content'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

type Props = { params: Promise<{ slug: string }> }

export const dynamic = 'force-dynamic'

export async function generateStaticParams() {
  try {
    const fromCms = await listDestinations({ draft: true })
    const slugs = new Set([
      ...fromCms.filter((d) => d.status === 'published').map((d) => d.slug),
      ...staticDestinations.map((d) => d.slug),
    ])
    return Array.from(slugs).map((slug) => ({ slug }))
  } catch {
    return staticDestinations.map((d) => ({ slug: d.slug }))
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
  const dest = staticDestinations.find((d) => d.slug === slug)
  if (!dest) return { title: 'Destination' }
  return {
    title: `${dest.title} | Beautiful Bangladesh`,
    description: dest.blurb,
  }
}

export default async function DestinationRoute({ params }: Props) {
  const { slug } = await params

  // The Figma design always wins; CmsDestinationView is a plain fallback
  // for CMS-only slugs until the designed template is data-driven.
  const dest = staticDestinations.find((d) => d.slug === slug)
  if (dest) return <DestinationPage title={dest.title} />

  try {
    const record = await getPublishedDestination(slug)
    if (record) return <CmsDestinationView record={record} />
  } catch {
    // DB unavailable
  }

  notFound()
}
