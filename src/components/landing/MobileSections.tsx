import Link from 'next/link'
import { destinations } from '@/lib/landing-content'
import { FigmaFrame } from './FigmaFrame'
import { CtaButton } from './CtaButton'
import { ScrollDownCue } from './ScrollDownCue'
import { ROW1 } from './CreatorReels'
import { BlogCard, BLOG_CARDS } from './BlogsSection'

/*
 * Real mobile sections — mobile Figma `498:2373` (390 artboard).
 * Flow-based with fixed px (phones are 360–430 wide, ~1:1 with the design);
 * only the blogs stack uses FigmaFrame because its stamp cards have fixed
 * Figma geometry.
 */

const heroReels = [
  { src: '/hero/reel1.webp', alt: "Cox's Bazar reel" },
  { src: '/hero/reel2.webp', alt: 'Sunset reel' },
  { src: '/hero/reel3.webp', alt: 'Scenic reel' },
]

export function MobileHero() {
  return (
    <section
      className="w-full bg-[#faf7f2] px-[8px] pt-[62px]"
      data-node-id="498:2373-hero"
    >
      <div className="relative w-full overflow-hidden rounded-[24px]" style={{ height: 'calc(484 / 390 * 100vw)' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/hero/bg.webp"
          alt="Beautiful Bangladesh — aerial landscape"
          className="absolute inset-0 size-full object-cover"
          draggable={false}
        />
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[55%]"
          style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.35), rgba(0,0,0,0.02))' }}
          aria-hidden
        />
        <h1 className="absolute left-[20px] top-[36px] font-[family-name:var(--font-display)] text-[40px] font-medium leading-[1.05] text-white">
          Beautiful
          <br />
          Bangladesh
        </h1>
        <p className="absolute left-[20px] right-[20px] top-[150px] font-[family-name:var(--font-ui)] text-[14px] leading-[1.4] text-white/85">
          From mangrove forests and rolling hills to waterfalls, tea estates, and endless coastlines
        </p>
        {/* Full-width flex row + justify-center so centering survives the
            cue's transform-based bob animation */}
        <ScrollDownCue position={{ left: 0, right: 0, bottom: 24, justifyContent: 'center' }} />
      </div>
    </section>
  )
}

export function MobileLatestReels() {
  return (
    <section className="flex w-full flex-col gap-[16px] bg-[#faf7f2] px-[16px] pt-[32px] pb-[40px]">
      <h2 className="font-[family-name:var(--font-body)] text-[24px] font-medium text-[#132110]">
        Latest Reels
      </h2>
      <div className="-mx-[16px] flex gap-[12px] overflow-x-auto px-[16px] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {heroReels.map((r) => (
          <div
            key={r.src}
            className="relative aspect-[178/318] w-[178px] shrink-0 overflow-hidden rounded-[8px]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={r.src} alt={r.alt} className="absolute inset-0 size-full object-cover" draggable={false} />
          </div>
        ))}
      </div>
      <CtaButton size="sm" label="Check Out Reels" className="mt-[8px] self-center" />
    </section>
  )
}

export function MobileExperience() {
  return (
    <section className="flex w-full flex-col bg-[#f5de8f]">
      <p className="px-[40px] py-[24px] text-center font-[family-name:var(--font-body)] text-[24px] font-medium tracking-[-0.72px] text-[#39260b]">
        Experience it{' '}
        <span className="font-[family-name:var(--font-script)] font-bold">once</span>
        {', and it will '}
        <span className="font-[family-name:var(--font-script)] font-bold">live in</span>
        {' you forever'}
      </p>
      {/* Stamp strip — baked slice of the mobile design */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/landing/figma/designs/mobile/experience-stamps.webp"
        alt="Shopping, activities, food, culture and history stamps"
        className="block h-auto w-full"
        draggable={false}
      />
    </section>
  )
}

export function MobileTopDestinations() {
  return (
    <section className="flex w-full flex-col gap-[24px] bg-white px-[16px] py-[40px]">
      <h2 className="text-center font-[family-name:var(--font-body)] text-[24px] font-medium tracking-[-0.72px] text-[#132110]">
        Top{' '}
        <span className="font-[family-name:var(--font-script)] font-bold text-[#31542a]">
          Destinations
        </span>
      </h2>
      <div className="grid grid-cols-2 gap-x-[12px] gap-y-[24px]">
        {destinations.slice(0, 2).map((d) => (
          <Link key={d.slug} href={`/destinations/${d.slug}`} className="flex flex-col gap-[8px]">
            <div className="relative aspect-[3/2] w-full overflow-hidden rounded-[8px] bg-[#f2f2f2]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/landing/destinations/${d.slug}.webp`}
                alt=""
                className="absolute inset-0 size-full object-cover"
                draggable={false}
              />
            </div>
            <h3 className="font-[family-name:var(--font-body)] text-[18px] font-medium text-[#132110]">
              {d.title}
            </h3>
            <p className="font-[family-name:var(--font-body)] text-[12px] leading-[1.4] text-[#132110]/70">
              {d.blurb}
            </p>
          </Link>
        ))}
      </div>
    </section>
  )
}

export function MobileCreatorReels() {
  return (
    <section
      id="creator-reels"
      className="flex w-full flex-col gap-[24px] bg-white px-[16px] py-[40px]"
    >
      <h2 className="mx-auto w-[280px] text-center font-[family-name:var(--font-body)] text-[24px] font-medium tracking-[-0.72px] text-[#132110]">
        {'Explore the '}
        <span className="font-[family-name:var(--font-script)] font-bold text-[#e77f22]">
          Viral Travel
        </span>
        {' Contents'}
      </h2>
      {/* Card design from the destination page mobile export: poster,
          caption, then avatar + name */}
      <div className="grid grid-cols-2 gap-x-[12px] gap-y-[24px]">
        {ROW1.slice(0, 4).map((r) => (
          <div key={r.id} className="flex flex-col gap-[10px]">
            <div className="relative aspect-[178/300] w-full overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/landing/reels/${r.id}.png`}
                alt=""
                className="absolute inset-0 size-full object-cover"
                draggable={false}
              />
            </div>
            <p className="font-[family-name:var(--font-body)] text-[14px] font-medium leading-[1.35] text-[#132110]">
              The Stories Hidden Between Rivers, Roads &amp; People
            </p>
            <div className="flex items-center gap-[6px]">
              <div className="relative size-[16px] shrink-0 overflow-hidden rounded-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/landing/reels/avatar-${r.id}.png`}
                  alt=""
                  className="absolute inset-0 size-full"
                  draggable={false}
                />
              </div>
              <p className="font-[family-name:var(--font-body)] text-[13px] font-medium text-[#132110] opacity-70">
                {r.name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

const TEAL_SCALE = 357 / 400

export function MobileBlogs() {
  const stackHeight = BLOG_CARDS.reduce(
    (sum, c) => sum + (c.cardW > 390 ? c.cardH * TEAL_SCALE : c.cardH) + 24,
    0,
  )
  const height = 130 + stackHeight + 16

  return (
    <FigmaFrame width={390} height={height} data-node-id="498:2373-blogs" aria-label="Explore locations">
      <div className="relative flex w-[390px] flex-col items-center pt-[40px]" style={{ height }}>
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[#f5efe5]" />
          <div
            className="absolute inset-0 mix-blend-overlay opacity-60"
            style={{
              backgroundImage: 'url(/landing/blogs/pattern.png)',
              backgroundSize: '204.8px 204.8px',
              backgroundPosition: 'top left',
            }}
          />
        </div>
        <p className="relative z-[1] w-[300px] text-center font-[family-name:var(--font-body)] text-[24px] font-medium tracking-[-0.72px] text-[#39260b]">
          {'Explore '}
          <span className="font-[family-name:var(--font-script)] font-bold">Locations</span>
          {' with Diversity'}
        </p>
        <div className="relative z-[1] mt-[24px] flex flex-col items-center gap-[24px]">
          {BLOG_CARDS.map((card) =>
            card.cardW > 390 ? (
              <div key={card.title} style={{ height: card.cardH * TEAL_SCALE }}>
                <div style={{ transform: `scale(${TEAL_SCALE})`, transformOrigin: 'top center' }}>
                  <BlogCard {...card} />
                </div>
              </div>
            ) : (
              <BlogCard key={card.title} {...card} />
            ),
          )}
        </div>
      </div>
    </FigmaFrame>
  )
}

/** Mobile final CTA — big clipped title, tall hills, pill button. */
export function MobileCta() {
  return (
    <FigmaFrame
      width={390}
      height={720}
      className="bg-white"
      data-node-id="498:2373-cta"
      aria-label="Beautiful Bangladesh CTA"
    >
      <div className="relative size-full overflow-hidden bg-white">
        <p
          className="pointer-events-none absolute left-1/2 top-[32px] -translate-x-1/2 whitespace-nowrap text-center font-[family-name:var(--font-body)] text-[36px] font-semibold leading-none tracking-[-1px] text-transparent"
          style={{
            backgroundImage: 'url(/landing/cta/title-fill.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
          }}
        >
          BEAUTIFUL BANGLADESH
        </p>
        {/* hills.png's top 25% (200/800 artboard px) is blank — the box extends
            above the section so the visible peak lands at y≈52, overlapping the
            title's lower half like the design */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/landing/cta/hills.png"
          alt=""
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] w-full max-w-none object-cover"
          style={{ height: 890 }}
          draggable={false}
        />
        <div className="absolute bottom-[36px] left-1/2 z-10 -translate-x-1/2">
          <CtaButton size="sm" label="Check Out Reels" />
        </div>
      </div>
    </FigmaFrame>
  )
}
