import Link from 'next/link'
import { ResponsiveFigmaPage } from '@/components/landing/ResponsiveFigmaPage'
import { CtaSection } from '@/components/landing/CtaSection'
import { CtaButton } from '@/components/landing/CtaButton'
import { MobileCta } from '@/components/landing/MobileSections'
import { DESKTOP_ARTBOARD, DESKTOP_EXPLORE_OFFSET } from '@/lib/nav-config'

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
      className="group relative min-w-0 flex-1 h-[var(--dest-card-h,300px)] min-h-[200px] overflow-clip rounded-[24px] block"
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

/** Content top offset below the fixed navbar (116px @ 1440, scales with viewport). */
const EXPLORE_TOP = `calc(${DESKTOP_EXPLORE_OFFSET} / ${DESKTOP_ARTBOARD} * 100vw)`

/** Destination category grid — Figma 466:731. */
function ExploreCategories() {
  return (
    <section
      className="bg-white flex flex-col gap-[48px] items-center pb-[40px] px-[40px] w-full"
      style={{
        paddingTop: EXPLORE_TOP,
        // Row height so exactly 3 rows (6 cards) fill one viewport with 20px of
        // whitespace under row 3. Must stay under the 24px row gap so row 4
        // remains below the fold: (100svh − top offset − 2 row gaps − 20) / 3.
        ['--dest-card-h' as string]: `calc((100svh - ${EXPLORE_TOP} - 68px) / 3)`,
      }}
      data-node-id="466:731"
    >
      <div className="flex gap-[48px] items-start w-full" data-node-id="466:733">
        {/* Left column spans the full grid height; text and CTA stick
            independently — text pins under the navbar for the whole grid
            scroll, CTA pins to the viewport bottom left */}
        <div
          className="flex flex-col items-start justify-between self-stretch shrink-0 w-[346px]"
          data-node-id="466:734"
        >
          {/* flex-1 wrapper bounds the sticky text so it stops 48px above the
              CTA instead of sliding into it at the end of the scroll */}
          <div className="w-full min-h-0 flex-1 pb-[48px]">
            <div
              className="sticky flex flex-col gap-[24px] items-start w-full"
              style={{ top: EXPLORE_TOP }}
              data-node-id="466:735"
            >
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
          </div>

          {/* Stamp CTA — Figma 466:738 */}
          <div className="sticky bottom-[40px]">
            <CtaButton size="sm" label="Check Out Reels" />
          </div>
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
                className="absolute left-[20px] right-[20px] bottom-[20px] flex flex-col gap-[8px] text-white"
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

const MOBILE_DESTS = [
  { name: 'Sylhet', slug: 'sylhet', img: '/landing/destinations/sylhet-hq.png' },
  { name: "Cox's Bazar", slug: 'coxs-bazar', img: '/landing/destinations/coxs-bazar-hq.png' },
  { name: 'Sundarbans', slug: 'sundarbans', img: '/landing/destinations/sundarbans.png' },
  { name: 'Sajek Valley', slug: 'sajek', img: '/landing/destinations/sajek-hq.png' },
  { name: 'Rangamati', slug: 'rangamati', img: '/landing/destinations/rangamati.png' },
  { name: 'Saint Martin', slug: 'saint-martin', img: '/landing/destinations/saint-martin.png' },
  { name: 'Ratargul', slug: 'ratargul', img: '/landing/destinations/ratargul.png' },
  { name: 'Jaflong', slug: 'jaflong', img: '/landing/destinations/jaflong.png' },
] as const

function ExploreMobile() {
  return (
    <div className="relative w-full overflow-x-clip bg-white" data-node-id="498:3222">
      <section className="flex w-full flex-col gap-[24px] px-[16px] pt-[78px] pb-[40px]">
        <div className="flex flex-col gap-[12px]">
          <h1 className="font-[family-name:var(--font-body)] text-[20px] font-medium tracking-[-0.6px] text-[#132110] capitalize">
            Find your{' '}
            <span className="font-[family-name:var(--font-script)] font-bold text-[#31542a]">
              perfect
            </span>{' '}
            destination experience
          </h1>
          <p className="font-[family-name:var(--font-body)] text-[13px] leading-[1.4] text-[#132110] opacity-60">
            Experience Bangladesh like never before, go to places which is not less than heaven.
            Visit the Beautiful Bangladesh
          </p>
        </div>
        <div className="grid grid-cols-2 gap-[12px]">
          {MOBILE_DESTS.map((d) => (
            <Link
              key={d.slug}
              href={`/destinations/${d.slug}`}
              className="group relative aspect-[171/120] overflow-clip rounded-[12px] block"
              aria-label={d.name}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={d.img}
                alt=""
                className="absolute inset-0 size-full max-w-none object-cover"
                draggable={false}
              />
              <div className="absolute inset-0 bg-[rgba(0,0,0,0.35)]" />
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="font-[family-name:var(--font-body)] text-[16px] font-medium leading-none text-white whitespace-nowrap">
                  {d.name}
                </p>
              </div>
            </Link>
          ))}
        </div>
        <CtaButton size="sm" label="Check Out Reels" className="mt-[8px] self-center" />
      </section>
      <MobileCta />
    </div>
  )
}

/** Explore — Designs `466:730` / mobile `498:3222`. */
export function ExplorePage() {
  return <ResponsiveFigmaPage desktop={<ExploreDesktop />} mobile={<ExploreMobile />} />
}
