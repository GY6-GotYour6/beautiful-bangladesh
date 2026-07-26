import Link from 'next/link'

const A = 1440
const vw = (px: number) => `calc(${px} / ${A} * 100vw)`

function ArrowButton({ variant, top, right }: { variant: 'green' | 'white'; top: number; right: number }) {
  const bg = variant === 'green' ? '#31542a' : 'white'
  const stroke = variant === 'green' ? 'white' : '#31542a'
  const border = variant === 'white' ? '1.5px solid white' : 'none'
  return (
    <div
      className="absolute flex items-center justify-center overflow-hidden rounded-full"
      style={{ top: vw(top), right: vw(right), width: vw(32), height: vw(32), background: bg, border }}
      aria-hidden="true"
    >
      <div style={{ transform: 'rotate(-45deg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width={20} height={20} viewBox="0 0 20 20" fill="none">
          <path d="M4 10h12M12 4l6 6-6 6" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  )
}

function CoxBazarCard() {
  return (
    <Link
      href="/destinations/coxs-bazar"
      className="relative shrink-0 overflow-clip rounded-[20px]"
      style={{ width: vw(808), height: '100%' }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/landing/destinations/coxs-bazar.webp" alt="Cox Bazar" className="absolute inset-0 size-full max-w-none object-cover" draggable={false} />
      <div className="pointer-events-none absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 35%, rgba(0,0,0,0.55) 75%, rgba(0,0,0,0.70) 100%)' }} aria-hidden="true" />
      <ArrowButton variant="green" top={24} right={24} />
      {/* text anchored to bottom — safe for any card height */}
      <div
        className="absolute inset-x-0 bottom-0 flex flex-col items-start text-white"
        style={{ padding: `0 ${vw(24)} ${vw(16)} ${vw(24)}`, gap: vw(4) }}
      >
        <p className="font-medium leading-none w-full" style={{ fontSize: vw(88), letterSpacing: vw(-2.64), lineHeight: 'normal' }}>
          Cox Bazar
        </p>
        <p className="w-full" style={{ fontSize: vw(21.373), lineHeight: 1.4 }}>
          Beautiful mangrove with a vast where life where beautiful sea where both jungle &amp; meets with eachother.
        </p>
      </div>
    </Link>
  )
}

function SylhetCard() {
  return (
    <Link
      href="/destinations/sylhet"
      className="relative min-w-0 overflow-clip rounded-[20px]"
      style={{ flex: '1 0 0', height: '100%' }}
    >
      <div className="absolute inset-0 pointer-events-none rounded-[20px]" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/landing/destinations/sylhet.webp" alt="" className="absolute max-w-none size-full rounded-[20px] object-cover" draggable={false} />
        <div className="absolute inset-0 rounded-[20px] bg-[rgba(0,0,0,0.3)]" />
      </div>
      <ArrowButton variant="white" top={20} right={20} />
      <p
        className="absolute left-0 whitespace-nowrap font-medium text-white"
        style={{ bottom: vw(96), fontSize: vw(88), letterSpacing: vw(-2.64), lineHeight: 'normal', transform: 'translateY(100%)' }}
      >
        Sylhet
      </p>
    </Link>
  )
}

function SundarbanCard() {
  return (
    <Link
      href="/destinations/sundarbans"
      className="relative shrink-0 overflow-clip rounded-[20px]"
      style={{ width: vw(548), height: '100%' }}
    >
      <div className="absolute inset-0 pointer-events-none rounded-[20px]" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/landing/destinations/sundarbans.png" alt="" className="absolute max-w-none size-full rounded-[20px] object-cover" draggable={false} />
        <div className="absolute inset-0 rounded-[20px] bg-[rgba(0,0,0,0.3)]" />
      </div>
      <ArrowButton variant="white" top={20} right={20} />
      <div className="absolute bottom-0 left-0">
        <p className="relative shrink-0 whitespace-nowrap font-medium text-white" style={{ fontSize: vw(88), letterSpacing: vw(-2.64), lineHeight: 'normal' }}>
          Sundarban
        </p>
      </div>
    </Link>
  )
}

function RangamatiCard() {
  return (
    <Link
      href="/destinations/rangamati"
      className="relative shrink-0 overflow-clip rounded-[20px]"
      style={{ width: vw(808), height: '100%' }}
    >
      <div className="absolute inset-0 pointer-events-none rounded-[20px]" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/landing/destinations/rangamati.png" alt="" className="absolute max-w-none size-full rounded-[20px] object-cover" draggable={false} />
        <div className="absolute inset-0 rounded-[20px] bg-[rgba(0,0,0,0.3)]" />
      </div>
      <ArrowButton variant="white" top={20} right={20} />
      <div className="absolute bottom-0 left-0">
        <p className="relative shrink-0 whitespace-nowrap font-medium text-white" style={{ fontSize: vw(88), letterSpacing: vw(-2.64), lineHeight: 'normal' }}>
          Rangamati
        </p>
      </div>
    </Link>
  )
}

/** Top Destinations — Figma 701:1891
 *
 * Flex-fill layout: section is 100dvh, cards fill remaining height after
 * header. No scale transform → no side margins.
 * Card widths stay vw()-based (proportional to 1440px artboard).
 * Cards container is vw(1368) wide — slightly wider than content area,
 * overflowing the padding symmetrically (clipped by section overflow:clip).
 */
export function TopDestinations() {
  return (
    <section
      className="flex w-full flex-col items-center bg-[#fffae7]"
      style={{
        height: '100dvh',
        overflow: 'clip',
        scrollSnapAlign: 'start',
        paddingTop: `min(${vw(80)}, 4dvh)`,
        paddingBottom: `min(${vw(80)}, 4dvh)`,
        paddingLeft: vw(80),
        paddingRight: vw(80),
        gap: vw(48),
      }}
      data-node-id="701:1891"
    >
      {/* Header row */}
      <div className="flex w-full shrink-0 items-center justify-between" style={{ maxWidth: vw(1368) }}>
        <h2
          className="shrink-0 font-medium text-[#132110]"
          style={{ fontSize: vw(40), letterSpacing: vw(-1.2), lineHeight: 'normal', width: vw(303) }}
        >
          Top Destinations
        </h2>
        <Link
          href="/explore"
          className="flex shrink-0 items-center text-[#132110] transition-opacity hover:opacity-70"
          style={{ gap: vw(12) }}
        >
          <span style={{ fontSize: vw(24), lineHeight: 1.4 }}>View All</span>
          <svg width={28} height={28} viewBox="0 0 28 28" fill="none" aria-hidden>
            <path d="M11 6l8 8-8 8" stroke="#132110" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>

      {/* Cards grid — fills remaining height, vw(1368) wide */}
      <div
        className="flex flex-col"
        style={{ flex: '1 0 0', minHeight: 0, width: vw(1368), gap: vw(12) }}
      >
        <div className="flex" style={{ flex: '1 0 0', minHeight: 0, gap: vw(12) }}>
          <CoxBazarCard />
          <SylhetCard />
        </div>
        <div className="flex" style={{ flex: '1 0 0', minHeight: 0, gap: vw(12) }}>
          <SundarbanCard />
          <RangamatiCard />
        </div>
      </div>
    </section>
  )
}
