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

      {/* Title */}
      <p
        className="relative font-[family-name:var(--font-body)] font-medium text-[32px] text-[#39260b] text-center tracking-[-0.96px] w-[352px] leading-[normal]"
        data-node-id="466:1234"
      >
        Experience it{' '}
        <span className="font-[family-name:var(--font-script)] font-bold">once</span>
        {', and it will '}
        <span className="font-[family-name:var(--font-script)] font-bold">live in</span>
        {' you forever'}
      </p>

      {/*
        Figma 466:1232 proportions:
          pos 0  (Food):       300 × 300 px  → scale 1.000
          pos ±1 (Activities/Culture): ~272 px → scale 0.907
          pos ±2 (Shopping/History):   ~223 px → scale 0.743
          gap between cards: 32 px
      */}
      {/* Carousel — fades and blur handled inside the component, bounded to card height */}
      <ExperienceCarousel
        cardW={300}
        cardH={300}
        scale1={0.907}
        scale2={0.743}
        gap={32}
        labelSize={28}
        fadeW={120}
      />
    </div>
  )
}
