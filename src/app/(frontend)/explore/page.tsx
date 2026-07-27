import { ExplorePage } from '@/components/explore/ExplorePage'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Explore | Beautiful Bangladesh',
  description: 'Discover top destinations, experiences, and locations across Bangladesh.',
}

export default function ExploreRoute() {
  return <ExplorePage />
}
