import { redirect } from 'next/navigation'
import type { Metadata } from 'next'

// TEMPORARILY DISABLED — the "Destination" nav link now points at the landing
// page's #destinations section instead of this page. Both the desktop and
// mobile designs live inside ExplorePage, so commenting out the render below
// disables both. To restore: uncomment the import + return, drop the redirect.
// import { ExplorePage } from '@/components/explore/ExplorePage'

export const metadata: Metadata = {
  title: 'Explore | Beautiful Bangladesh',
  description: 'Discover top destinations, experiences, and locations across Bangladesh.',
}

export default function ExploreRoute() {
  // Existing /explore links across the site land on the landing section instead
  // of a blank page while this is disabled.
  redirect('/#destinations')

  // return <ExplorePage />
}
