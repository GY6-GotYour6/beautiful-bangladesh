import { FigmaSection } from './FigmaSection'
import { HeroSection } from './HeroSection'
import {
  MobileHero,
  MobileLatestReels,
  MobileExperience,
  MobileTopDestinations,
  MobileBlogs,
  MobileCta,
} from './MobileSections'
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
    <div className="relative w-full overflow-x-clip bg-[#faf7f2]" data-node-id="498:2373">
      <MobileHero />
      <MobileLatestReels />
      {/* Intro illustrations still baked — complex vectors (same as desktop) */}
      <FigmaSection
        id="about"
        src="/landing/figma/designs/mobile/landing-intro.webp"
        width={390}
        height={1529}
        nodeId="498:2373-intro"
        label="Nature culture cuisine"
      />
      <MobileExperience />
      <MobileTopDestinations />
      {/* Viral Travel Contents — baked slice from the destination mobile
          export, per preference for that exact design */}
      <FigmaSection
        id="creator-reels"
        src="/landing/figma/designs/mobile/viral-reels.webp"
        width={390}
        height={930}
        nodeId="498:2910-reels"
        label="Explore the viral travel contents"
      />
      <MobileBlogs />
      <YoutubeLineup />
      <MobileCta />
    </div>
  )
}

/** Landing — Designs `466:882` / mobile `498:2373`. */
export function LandingPage() {
  return <ResponsiveFigmaPage desktop={<LandingDesktop />} mobile={<LandingMobile />} />
}
