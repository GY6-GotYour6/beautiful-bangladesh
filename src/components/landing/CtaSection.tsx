import { FigmaFrame } from './FigmaFrame'
import { CtaButton } from './CtaButton'

/**
 * Final CTA — Figma `466:1460` rebuilt in HTML.
 * Hills use the flattened export (halftone baked in); live pill CTA on top.
 */
export function CtaSection() {
  return (
    <FigmaFrame
      width={1440}
      height={800}
      className="bg-white"
      data-node-id="466:1460"
      aria-label="Beautiful Bangladesh CTA"
    >
      <div className="relative size-full overflow-hidden bg-white">
        {/* Title — behind hills */}
        <p
          className="pointer-events-none absolute left-1/2 top-[117px] -translate-x-1/2 whitespace-nowrap text-center font-[family-name:var(--font-body)] text-[116px] font-semibold leading-none text-transparent"
          style={{
            backgroundImage: 'url(/landing/cta/title-fill.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
          }}
          data-node-id="466:1461"
        >
          BEAUTIFUL BANGLADESH
        </p>

        {/* Hills — flattened Figma render with halftone; overlays title */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/landing/cta/hills.png"
          alt=""
          width={1440}
          height={800}
          className="pointer-events-none absolute inset-0 z-[1] block size-full max-w-none object-cover"
          draggable={false}
          data-node-id="466:1462"
        />

        {/* Live CTA — no stamp */}
        <div className="absolute bottom-[52px] left-1/2 z-10 -translate-x-1/2">
          <CtaButton size="lg" label="Explore More Reels" />
        </div>
      </div>
    </FigmaFrame>
  )
}
