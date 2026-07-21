import { ExperienceCarousel } from './ExperienceCarousel'

/** Experience stamps — Figma 466:1232 */
export function ExperienceSection() {
  return (
    <div
      className="relative flex flex-col gap-[48px] items-center justify-center py-[80px] w-full overflow-hidden"
      style={{ background: '#f5de8f' }}
      data-node-id="466:1232"
    >
      {/* Tiled texture overlay */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute bg-[#f5de8f] inset-0" />
        <div
          className="absolute inset-0 mix-blend-overlay opacity-30"
          style={{
            backgroundImage: 'url(/landing/experience/pattern.png)',
            backgroundSize: '204.8px 204.8px',
            backgroundPosition: 'top left',
          }}
        />
      </div>

      {/* Title — Figma text: "once & it will" */}
      <p
        className="relative font-[family-name:var(--font-body)] font-medium text-[32px] text-[#39260b] text-center tracking-[-0.96px] w-[352px] leading-[normal]"
        data-node-id="466:1234"
      >
        Experience it{' '}
        <span className="font-[family-name:var(--font-script)] font-bold">once</span>
        {' & it will '}
        <span className="font-[family-name:var(--font-script)] font-bold">live in</span>
        {' you forever'}
      </p>

      {/* Carousel — fades are section-level below, not inside carousel */}
      <ExperienceCarousel
        cardW={300}
        cardH={300}
        scale1={0.907}
        scale2={0.743}
        gap={32}
      />

      {/*
        Cloud fades — Figma 466:1258 / 466:1259.
        Left fade positioned left=-50px (50px outside section, clipped by overflow-hidden)
        so the fully-opaque part is off-screen and the section edge sees ~80% opacity,
        fading to transparent at 183px from left edge. Width/offset/color match Figma exactly.
      */}
      <div
        className="pointer-events-none absolute top-0 bottom-0 z-10"
        style={{
          left: -50,
          width: 233,
          background: 'linear-gradient(to right, #f4df92 0%, rgba(241,209,96,0) 125.47%)',
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute top-0 bottom-0 z-10"
        style={{
          right: -60,
          width: 234,
          background: 'linear-gradient(to left, #f4df92 0%, rgba(241,209,96,0) 125.47%)',
        }}
        aria-hidden
      />
    </div>
  )
}
