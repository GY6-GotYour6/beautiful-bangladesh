'use client'

import { useEffect } from 'react'
import {
  MobileHero,
  MobileLatestReels,
  MobileExperience,
  MobileCreatorReels,
  MobileCta,
} from './MobileSections'
import { HeroSection } from './HeroSection'
import { TopDestinations } from './TopDestinations'
import { CreatorsSection } from './CreatorsSection'
import { CtaSection } from './CtaSection'
import { ResponsiveFigmaPage } from './ResponsiveFigmaPage'
import { FigmaSection } from './FigmaSection'
import type { LandingPageData } from '@/lib/landing-global'

const MOBILE_BASE = '/landing/figma/designs/mobile'

function LandingDesktop({ data }: { data?: LandingPageData }) {
  useEffect(() => {
    // Scroll snap only on desktop — mobile sections have their own layout
    if (window.innerWidth < 768) return
    const html = document.documentElement
    html.style.scrollSnapType = 'y mandatory'
    return () => {
      html.style.scrollSnapType = ''
    }
  }, [])

  return (
    <div className="relative w-full overflow-x-clip bg-[#fffae7]">
      <HeroSection />
      <TopDestinations destinations={data?.featuredDestinations} />
      <CreatorsSection creators={data?.featuredCreators} />
      <CtaSection />
    </div>
  )
}

function LandingMobile() {
  return (
    <div className="relative w-full overflow-x-clip bg-[#faf7f2]">
      <MobileHero />
      <MobileLatestReels />
      <FigmaSection
        id="about"
        src={`${MOBILE_BASE}/landing-intro.webp`}
        width={390}
        height={1529}
        nodeId="498:2373-intro"
        label="Nature culture cuisine"
      />
      <MobileExperience />
      <MobileCreatorReels />
      <MobileCta />
    </div>
  )
}

export function LandingPage({ data }: { data?: LandingPageData }) {
  return (
    <ResponsiveFigmaPage
      desktop={<LandingDesktop data={data} />}
      mobile={<LandingMobile />}
    />
  )
}
