import Link from 'next/link'
import { FigmaSection } from '@/components/landing/FigmaSection'
import { FigmaStack } from '@/components/landing/FigmaStack'
import { ResponsiveFigmaPage } from '@/components/landing/ResponsiveFigmaPage'
import { CtaSection } from '@/components/landing/CtaSection'
import { CtaButton } from '@/components/landing/CtaButton'
import {
  DESKTOP_ARTBOARD,
  DESKTOP_EXPLORE_OFFSET,
  MOBILE_HEADER_CLIP,
} from '@/lib/nav-config'

/** Single destination card — photo bg, dark overlay, and name text. */
function DestCard({
  name,
  slug,
  img,
  overlay,
  children,
}: {
  name: string
  slug: string
  img: string
  overlay: string
  children?: React.ReactNode
}) {
  return (
    <Link
      href={`/destinations/${slug}`}
      className="group relative min-w-0 flex-1 h-[300px] overflow-clip rounded-[24px] block"
      aria-label={name}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={img}
        alt=""
        className="absolute inset-0 size-full max-w-none object-cover rounded-[24px] transition-transform duration-300 group-hover:scale-[1.04]"
        draggable={false}
      />
      <div className={`absolute inset-0 rounded-[24px] ${overlay}`} />
      {children}
    </Link>
  )
}

/** Destination category grid — Figma 466:731. */
function ExploreCategories() {
  return (
    <section
      className="bg-white flex flex-col gap-[48px] items-center pb-[40px] px-[40px] w-full"
      style={{ paddingTop: `calc(${DESKTOP_EXPLORE_OFFSET} / ${DESKTOP_ARTBOARD} * 100vw)` }}
      data-node-id="466:731"
    >
      <div className="flex gap-[48px] items-start w-full" data-node-id="466:733">
        {/* Left column: title + CTA */}
        <div className="flex flex-col items-start justify-between self-stretch shrink-0 w-[346px]" data-node-id="466:734">
          <div className="flex flex-col gap-[24px] items-start w-full" data-node-id="466:735">
            <p
              className="font-[family-name:var(--font-body)] text-[32px] font-medium leading-none tracking-[-1.28px] text-[#132110] capitalize w-full"
              data-node-id="466:736"
            >
              Find your{' '}
              <span className="font-[family-name:var(--font-script)] font-bold text-[#31542a]">
                perfect
              </span>{' '}
              destination experience
            </p>
            <p
              className="font-[family-name:var(--font-body)] text-[18px] leading-[1.4] text-[#132110] opacity-60 w-full"
              data-node-id="466:737"
            >
              Experience Bangladesh like never before, go to places which is not less than heaven. Visit the Beautiful Bangladesh
            </p>
          </div>

          {/* Stamp CTA — Figma 466:738 */}
          <CtaButton size="sm" label="Check Out Reels" />
        </div>

        {/* Right: 4-row × 2-col destination grid */}
        <div className="flex flex-1 flex-col gap-[24px] min-w-0 self-stretch" data-node-id="466:739">
          {/* Row 1 */}
          <div className="flex gap-[24px] shrink-0 w-full" data-node-id="466:740">
            <DestCard
              name="Sylhet"
              slug="sylhet"
              img="/landing/destinations/sylhet-hq.png"
              overlay="bg-[rgba(0,0,0,0.34)]"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="font-[family-name:var(--font-body)] text-[32px] font-medium leading-none text-white whitespace-nowrap">
                  Sylhet
                </p>
              </div>
            </DestCard>
            <DestCard
              name="Cox's Bazar"
              slug="coxs-bazar"
              img="/landing/destinations/coxs-bazar-hq.png"
              overlay="bg-[rgba(0,0,0,0.34)]"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="font-[family-name:var(--font-body)] text-[32px] font-medium leading-none text-white whitespace-nowrap">
                  {"Cox's Bazar"}
                </p>
              </div>
            </DestCard>
          </div>

          {/* Row 2 */}
          <div className="flex gap-[24px] shrink-0 w-full" data-node-id="466:745">
            <DestCard
              name="Sundarbans"
              slug="sundarbans"
              img="/landing/destinations/sundarbans.png"
              overlay="bg-gradient-to-b from-[34.333%] from-[rgba(0,0,0,0)] to-[rgba(0,0,0,0.89)]"
            >
              {/* Bottom-left text with description — Figma 466:747 */}
              <div
                className="absolute left-[20px] right-[20px] flex flex-col gap-[8px] text-white"
                style={{ top: 194 }}
                data-node-id="466:747"
              >
                <p className="font-[family-name:var(--font-body)] text-[24px] font-medium leading-none">
                  Sundarbans
                </p>
                <p className="font-[family-name:var(--font-body)] text-[14px] leading-[1.4]">
                  {"The Sundarbans, the world's largest mangrove forest, is a UNESCO World Heritage Site in southwest Bangladesh. Home to the Royal Bengal Tiger,"}
                </p>
              </div>
            </DestCard>
            <DestCard
              name="Sajek Valley"
              slug="sajek"
              img="/landing/destinations/sajek-hq.png"
              overlay="bg-[rgba(0,0,0,0.36)]"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="font-[family-name:var(--font-body)] text-[32px] font-medium leading-none text-white whitespace-nowrap">
                  Sajek Valley
                </p>
              </div>
            </DestCard>
          </div>

          {/* Row 3 */}
          <div className="flex gap-[24px] shrink-0 w-full" data-node-id="466:752">
            <DestCard
              name="Rangamati"
              slug="rangamati"
              img="/landing/destinations/rangamati.png"
              overlay="bg-[rgba(0,0,0,0.36)]"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="font-[family-name:var(--font-body)] text-[32px] font-medium leading-none text-white whitespace-nowrap">
                  Rangamati
                </p>
              </div>
            </DestCard>
            <DestCard
              name="Saint Martin"
              slug="saint-martin"
              img="/landing/destinations/saint-martin.png"
              overlay="bg-[rgba(0,0,0,0.36)]"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="font-[family-name:var(--font-body)] text-[32px] font-medium leading-none text-white whitespace-nowrap">
                  Saint Martin
                </p>
              </div>
            </DestCard>
          </div>

          {/* Row 4 */}
          <div className="flex gap-[24px] shrink-0 w-full" data-node-id="466:757">
            <DestCard
              name="Ratargul"
              slug="ratargul"
              img="/landing/destinations/ratargul.png"
              overlay="bg-[rgba(0,0,0,0.36)]"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="font-[family-name:var(--font-body)] text-[32px] font-medium leading-none text-white whitespace-nowrap">
                  Ratargul
                </p>
              </div>
            </DestCard>
            <DestCard
              name="Jaflong"
              slug="jaflong"
              img="/landing/destinations/jaflong.png"
              overlay="bg-[rgba(0,0,0,0.36)]"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="font-[family-name:var(--font-body)] text-[32px] font-medium leading-none text-white whitespace-nowrap">
                  Jaflong
                </p>
              </div>
            </DestCard>
          </div>
        </div>
      </div>
    </section>
  )
}

function ExploreDesktop() {
  return (
    <div className="relative w-full overflow-x-clip bg-white" data-node-id="466:730">
      <ExploreCategories />
      <CtaSection />
    </div>
  )
}

function ExploreMobile() {
  return (
    <FigmaStack
      nodeId="498:3222"
      sections={[
        {
          src: '/landing/figma/designs/mobile/explore.webp',
          width: 390,
          height: 1544,
          nodeId: '498:3222',
          label: 'Explore mobile',
          clipTop: MOBILE_HEADER_CLIP,
        },
      ]}
    />
  )
}

/** Explore — Designs `466:730` / mobile `498:3222`. */
export function ExplorePage() {
  return <ResponsiveFigmaPage desktop={<ExploreDesktop />} mobile={<ExploreMobile />} />
}
