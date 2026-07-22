import { ExplorePage } from '@/components/explore/ExplorePage'
import { listDestinations } from '@/lib/destinations'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Explore | Beautiful Bangladesh',
  description: 'Discover top destinations, experiences, and locations across Bangladesh.',
}

export default async function ExploreRoute() {
  const all = await listDestinations({ draft: false })
  const destinations = all.filter((d) => d.status === 'published')
  return <ExplorePage destinations={destinations} />
}
