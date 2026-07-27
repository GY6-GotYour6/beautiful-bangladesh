const A = 1440
const vw = (px: number) => `calc(${px} / ${A} * 100vw)`

export function CtaSection() {
  return (
    <section
      className="relative w-full bg-[#fffae7]"
      style={{
        height: '100dvh',
        overflow: 'clip',
        scrollSnapAlign: 'start',
        scrollSnapStop: 'always',
      }}
      data-node-id="701:1944"
      aria-label="Beautiful Bangladesh CTA"
    >
      {/* "BANGLADESH" — behind wave (mountain overlays text) */}
      <p
        className="pointer-events-none absolute whitespace-nowrap font-semibold leading-none text-transparent"
        style={{
          top: vw(80),
          left: vw(113.06),
          fontSize: vw(207.346),
          letterSpacing: vw(-16.588),
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
          top: vw(80),
          left: vw(220.06),
          transform: 'translateX(-50%)',
          fontSize: vw(36.564),
          letterSpacing: vw(-1),
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

      {/* Wave anchored to bottom — transparent sky shows text + cream above the
          mountain silhouette; opaque mountain body covers the text below it.
          width:100% + height:auto preserves the image aspect ratio at all
          viewport widths, so the mountain always fills from bottom upward. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/landing/cta/cta-wave.png"
        alt=""
        className="pointer-events-none absolute inset-x-0 bottom-0 block w-full"
        style={{ height: 'auto' }}
        draggable={false}
        aria-hidden="true"
        data-node-id="701:1947"
      />
    </section>
  )
}
