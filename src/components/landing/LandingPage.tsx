import { MOBILE_HEADER_CLIP } from '@/lib/nav-config'
import { FigmaStack, hs } from './FigmaStack'
import { FigmaSection } from './FigmaSection'
import { CtaButton } from './CtaButton'
import { HeroSection } from './HeroSection'
import { ExperienceSection } from './ExperienceSection'
import { CreatorReels } from './CreatorReels'
import { YoutubeLineup } from './YoutubeLineup'
import { BlogsSection } from './BlogsSection'
import { CtaSection } from './CtaSection'
import { ResponsiveFigmaPage } from './ResponsiveFigmaPage'
import { TopDestinations } from './TopDestinations'

const BASE = '/landing/figma/designs/landing'


function LandingDesktop() {
  return (
    <div className="relative w-full overflow-x-clip bg-[#f9f6f1]" data-node-id="466:882">
      <HeroSection />

      {/* 02-intro still baked — complex vector illustrations */}
      <FigmaSection
        id="about"
        src={`${BASE}/02-intro.webp`}
        width={1440}
        height={2002}
        nodeId="466:908"
        label="Nature culture cuisine"
      />

      <ExperienceSection />

      <TopDestinations />

      <CreatorReels />

      <BlogsSection />

      <YoutubeLineup />

      <CtaSection />
    </div>
  )
}

function LandingMobile() {
  return (
    <div className="relative w-full overflow-x-clip bg-[#f9f6f1]" data-node-id="498:2373">
      <FigmaSection
        src="/landing/figma/designs/mobile/landing.webp"
        width={390}
        height={7137}
        nodeId="498:2373"
        label="Landing mobile"
        clipTop={MOBILE_HEADER_CLIP}
        hotspots={[
          hs('/destinations/chittagong', 'Chittagong', 16, 2996, 195, 209),
          hs('/destinations/sylhet', 'Sylhet', 227, 2996, 195, 209),
        ]}
      >
        <div className="absolute z-30" style={{ left: 110, top: 1010 }}>
          <CtaButton size="sm" label="Check Out Reels" />
        </div>
      </FigmaSection>
    </div>
  )
}

/** Landing — Designs `466:882` / mobile `498:2373`. */
export function LandingPage() {
  return <ResponsiveFigmaPage desktop={<LandingDesktop />} mobile={<LandingMobile />} />
}
