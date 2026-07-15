import { DestinationsList } from '@/components/cms/DestinationsList'
import { requireCmsUser } from '@/lib/cms-auth'
import { listDestinations } from '@/lib/destinations'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'CMS · Destinations | Beautiful Bangladesh',
  description: 'Manage destination content for Beautiful Bangladesh.',
}

export const dynamic = 'force-dynamic'

export default async function CmsDestinationsPage() {
  await requireCmsUser()
  const destinations = await listDestinations({ draft: true })
  return <DestinationsList initial={destinations} />
}
