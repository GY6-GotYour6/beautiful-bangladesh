import { LandingEditor } from '@/components/cms/LandingEditor'
import { requireCmsUser } from '@/lib/cms-auth'
import { getLandingPageData } from '@/lib/landing-global'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = { title: 'Landing Page · CMS' }

export default async function CmsLandingPage() {
  await requireCmsUser()
  const initial = await getLandingPageData()
  return <LandingEditor initial={initial} />
}
