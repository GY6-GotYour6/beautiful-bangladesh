import { FigmaFrame } from './FigmaFrame'

export function CtaSection() {
  return (
    <FigmaFrame
      width={1440}
      height={800}
      className="bg-[#fffae7]"
      style={{ height: '100dvh', scrollSnapAlign: 'start' }}
      data-node-id="701:1944"
      aria-label="Beautiful Bangladesh CTA"
    >
      <div className="relative size-full overflow-hidden bg-[#fffae7]">
        {/* "BANGLADESH" — behind wave (mountain overlays text) */}
        <p
          className="pointer-events-none absolute whitespace-nowrap font-semibold leading-none text-transparent"
          style={{
            top: 80,
            left: 113.06,
            fontSize: 207.346,
            letterSpacing: -16.588,
            backgroundImage: 'url(/landing/cta/bangladesh-fill.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
          }}
          data-node-id="701:1945"
        >
          BANGLADESH
        </p>

        {/* "BEAUTIFUL" — behind wave */}
        <p
          className="pointer-events-none absolute whitespace-nowrap text-center font-semibold leading-none text-transparent"
          style={{
            top: 80,
            left: 220.06,
            transform: 'translateX(-50%)',
            fontSize: 36.564,
            letterSpacing: -1,
            backgroundImage: 'url(/landing/cta/beautiful-fill.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
          }}
          data-node-id="701:1946"
        >
          BEAUTIFUL
        </p>

        {/* Wave overlay — sky pixels made transparent via ImageMagick (-fuzz 8%
            -transparent #fffae7), so the mountain body (with halftone dots)
            opaquely covers the text below the silhouette while the sky shows
            the text and cream background above it. Normal blend, no tricks. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/landing/cta/cta-wave.png"
          alt=""
          className="pointer-events-none absolute inset-0 block size-full max-w-none"
          draggable={false}
          aria-hidden="true"
          data-node-id="701:1947"
        />
      </div>
    </FigmaFrame>
  )
}
