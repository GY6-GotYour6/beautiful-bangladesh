import Link from 'next/link'
import { ResponsiveFigmaPage } from '@/components/landing/ResponsiveFigmaPage'
import { CtaSection } from '@/components/landing/CtaSection'
import { CtaButton } from '@/components/landing/CtaButton'
import { MobileCta } from '@/components/landing/MobileSections'
import { DESKTOP_ARTBOARD, DESKTOP_EXPLORE_OFFSET } from '@/lib/nav-config'

const DESTS = [
  { name: 'Sylhet',       slug: 'sylhet',       img: '/landing/destinations/sylhet-hq.png',     overlay: 'bg-[rgba(0,0,0,0.34)]' },
  { name: 'Cox Bazar',    slug: 'coxs-bazar',   img: '/landing/destinations/coxs-bazar-hq.png', overlay: 'bg-[rgba(0,0,0,0.34)]' },
  { name: 'Sundarban',    slug: 'sundarbans',   img: '/landing/destinations/sundarbans.png',    overlay: 'bg-gradient-to-b from-[34.333%] from-[rgba(0,0,0,0)] to-[rgba(0,0,0,0.89)]' },
  { name: 'Sajek Vally',  slug: 'sajek',        img: '/landing/destinations/sajek-hq.png',      overlay: 'bg-[rgba(0,0,0,0.36)]' },
  { name: 'Chittagong',   slug: 'chittagong',   img: '/landing/destinations/chittagong.webp',   overlay: 'bg-[rgba(0,0,0,0.36)]' },
  { name: 'Saint Martin', slug: 'saint-martin', img: '/landing/destinations/saint-martin.png',  overlay: 'bg-[rgba(0,0,0,0.36)]' },
  { name: 'Ratar Gul',    slug: 'ratargul',     img: '/landing/destinations/ratargul.png',      overlay: 'bg-[rgba(0,0,0,0.36)]' },
  { name: 'Jafflong',     slug: 'jaflong',      img: '/landing/destinations/jaflong.png',       overlay: 'bg-[rgba(0,0,0,0.36)]' },
] as const

// ─── Desktop ─────────────────────────────────────────────────────────────────

function DestCard({ name, slug, img, overlay }: (typeof DESTS)[number]) {
  return (
    <Link
      href={`/destinations/${slug}`}
      className="group relative min-w-0 flex-1 h-[300px] overflow-clip rounded-[12px] block"
      aria-label={name}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={img}
        alt=""
        className="absolute inset-0 size-full max-w-none object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        draggable={false}
      />
      <div className={`absolute inset-0 ${overlay}`} />
      {/*
        Name — Figma: bottom-[107px] translate-y-full on 300px card.
        80px * 1.4 lh = 112px element height.
        After translate-y-full: top=193px, bottom=305px → 107px visible (5px clipped).
      */}
      <p
        className="pointer-events-none absolute bottom-[107px] left-0 right-0 translate-y-full text-center
          font-[family-name:var(--font-script)] text-[80px] leading-[1.4] tracking-[-2.4px]
          whitespace-nowrap text-white"
      >
        {name}
      </p>
    </Link>
  )
}

const EXPLORE_TOP = `calc(${DESKTOP_EXPLORE_OFFSET} / ${DESKTOP_ARTBOARD} * 100vw)`

function ExploreCategories() {
  return (
    <section
      className="bg-white flex flex-col gap-[32px] pb-[40px] px-[40px] w-full"
      style={{ paddingTop: EXPLORE_TOP }}
      data-node-id="466:731"
    >
      {/* Hero copy — Figma 602:364 */}
      <div className="flex flex-col gap-[16px] text-[#132110]" data-node-id="602:364">
        <p
          className="font-[family-name:var(--font-body)] text-[40px] font-medium leading-none
            tracking-[-0.64px] capitalize"
          data-node-id="602:365"
        >
          Find your{' '}
          <span className="font-[family-name:var(--font-script)] font-bold text-[#31542a]">
            perfect
          </span>{' '}
          destination experience
        </p>
        <p
          className="font-[family-name:var(--font-body)] text-[18px] leading-[1.4] opacity-60"
          data-node-id="603:412"
        >
          Where endless golden shores meet the Bay of Bengal. From sunrise walks and seafood feasts
          to dramatic coastal drives and hidden beaches. Where endless golden shores meet the Bay of
          Bengal. From sunrise walks and seafood feasts to dramatic coastal drives and hidden beaches.
        </p>
      </div>

      {/* 4 rows × 2 cols — Figma 603:387, gap 16px */}
      <div className="flex flex-col gap-[16px]" data-node-id="603:387">
        <div className="flex gap-[16px]" data-node-id="466:740">
          <DestCard {...DESTS[0]} />
          <DestCard {...DESTS[1]} />
        </div>
        <div className="flex gap-[16px]" data-node-id="466:745">
          <DestCard {...DESTS[2]} />
          <DestCard {...DESTS[3]} />
        </div>
        <div className="flex gap-[16px]" data-node-id="466:752">
          <DestCard {...DESTS[4]} />
          <DestCard {...DESTS[5]} />
        </div>
        <div className="flex gap-[16px]" data-node-id="466:757">
          <DestCard {...DESTS[6]} />
          <DestCard {...DESTS[7]} />
        </div>
      </div>

      {/* CTA — Figma 602:367 */}
      <div className="flex justify-center" data-node-id="602:367">
        <CtaButton size="sm" label="Check Out Reels" />
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

// ─── Mobile ──────────────────────────────────────────────────────────────────

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
            Where endless golden shores meet the Bay of Bengal. From sunrise walks and seafood
            feasts to dramatic coastal drives and hidden beaches.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-[12px]">
          {DESTS.map((d) => (
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
                className="absolute inset-0 size-full max-w-none object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                draggable={false}
              />
              <div className={`absolute inset-0 ${d.overlay}`} />
              {/* Name — same bottom-overflow style as desktop, scaled for mobile cards */}
              <p
                className="pointer-events-none absolute bottom-[35%] left-0 right-0 translate-y-full
                  text-center font-[family-name:var(--font-script)] text-[28px] leading-[1.4]
                  tracking-[-0.84px] whitespace-nowrap text-white"
              >
                {d.name}
              </p>
            </Link>
          ))}
        </div>

        <CtaButton size="sm" label="Check Out Reels" className="mt-[8px] self-center" />
      </section>
      <MobileCta />
    </div>
  )
}

// ─── Page ────────────────────────────────────────────────────────────────────

/** Explore — Designs `466:730` / mobile `498:3222`. */
export function ExplorePage() {
  return <ResponsiveFigmaPage desktop={<ExploreDesktop />} mobile={<ExploreMobile />} />
}
