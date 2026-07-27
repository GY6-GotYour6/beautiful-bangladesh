import { LandingPage } from '@/components/landing/LandingPage'
import { getLandingPageData } from '@/lib/landing-global'

export default async function HomePage() {
  const data = await getLandingPageData()
  return <LandingPage data={data} />
}
