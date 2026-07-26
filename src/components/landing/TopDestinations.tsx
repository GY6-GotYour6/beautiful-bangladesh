'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

const A = 1440
const vw = (px: number) => `calc(${px} / ${A} * 100vw)`

// Total section height at 1440px wide (padding×2 + header + gap + row1 + rowGap + row2 + padding)
// 80 + 80 + 48 + 48 + 400 + 12 + 400 = 1068
const DESIGN_HEIGHT = 1068

/** ep:right icon at -45deg = diagonal top-right arrow */
function ArrowButton({
  variant,
  top,
  right,
}: {
  variant: 'green' | 'white'
  top: number
  right: number
}) {
  const bg = variant === 'green' ? '#31542a' : 'white'
  const stroke = variant === 'green' ? 'white' : '#31542a'
  const border = variant === 'white' ? '1.5px solid white' : 'none'
  return (
    <div
      className="absolute flex items-center justify-center overflow-hidden rounded-full"
      style={{
        top: vw(top),
        right: vw(right),
        width: vw(32),
        height: vw(32),
        background: bg,
        border,
      }}
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

/** Figma 701:1900 — Cox Bazar */
function CoxBazarCard() {
  return (
    <Link
      href="/destinations/coxs-bazar"
      className="relative shrink-0 overflow-clip rounded-[20px]"
      style={{ width: vw(808), height: vw(400) }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/landing/destinations/coxs-bazar.webp"
        alt="Cox Bazar"
        className="absolute inset-0 size-full max-w-none object-cover"
        draggable={false}
      />
      {/* gradient behind text — Figma node 701:1901 gradient blob */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'linear-gradient(to bottom, transparent 35%, rgba(0,0,0,0.55) 75%, rgba(0,0,0,0.70) 100%)' }}
        aria-hidden="true"
      />

      <ArrowButton variant="green" top={24} right={24} />

      {/* Text block: name then description, together at top-219px */}
      <div
        className="absolute flex flex-col items-start text-white"
        style={{
          top: vw(219),
          left: vw(24),
          height: vw(157),
          width: vw(760),
        }}
      >
        <p
          className="relative shrink-0 w-full font-medium leading-none"
          style={{
            fontSize: vw(88),
            letterSpacing: vw(-2.64),
            lineHeight: 'normal',
          }}
        >
          Cox Bazar
        </p>
        <p
          className="flex-1 min-h-0 w-full"
          style={{ fontSize: vw(21.373), lineHeight: 1.4 }}
        >
          Beautiful mangrove with a vast where life where beautiful sea where both jungle &amp; meets with eachother.
        </p>
      </div>
    </Link>
  )
}

/** Figma 701:1908 — Sylhet: flex-1, name at bottom-96px + translate-y-full, dark overlay */
function SylhetCard() {
  return (
    <Link
      href="/destinations/sylhet"
      className="relative min-w-0 overflow-clip rounded-[20px]"
      style={{ flex: '1 0 0', height: vw(400) }}
    >
      <div className="absolute inset-0 pointer-events-none rounded-[20px]" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/landing/destinations/sylhet.webp"
          alt=""
          className="absolute max-w-none size-full rounded-[20px] object-cover"
          draggable={false}
        />
        <div className="absolute inset-0 rounded-[20px] bg-[rgba(0,0,0,0.3)]" />
      </div>

      <ArrowButton variant="white" top={20} right={20} />

      {/* Name: bottom-96px + translate-y-full → overflows card bottom */}
      <p
        className="absolute left-0 whitespace-nowrap font-medium text-white"
        style={{
          bottom: vw(96),
          fontSize: vw(88),
          letterSpacing: vw(-2.64),
          lineHeight: 'normal',
          transform: 'translateY(100%)',
        }}
      >
        Sylhet
      </p>
    </Link>
  )
}

/** Figma 701:1914 — Sundarban: fixed width 548px, name at bottom-0 left-0, dark overlay */
function SundarbanCard() {
  return (
    <Link
      href="/destinations/sundarbans"
      className="relative shrink-0 overflow-clip rounded-[20px]"
      style={{ width: vw(548), height: vw(400) }}
    >
      <div className="absolute inset-0 pointer-events-none rounded-[20px]" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/landing/destinations/sundarbans.png"
          alt=""
          className="absolute max-w-none size-full rounded-[20px] object-cover"
          draggable={false}
        />
        <div className="absolute inset-0 rounded-[20px] bg-[rgba(0,0,0,0.3)]" />
      </div>

      <ArrowButton variant="white" top={20} right={20} />

      <div className="absolute bottom-0 left-0 flex flex-col items-start">
        <p
          className="relative shrink-0 whitespace-nowrap font-medium text-white"
          style={{
            fontSize: vw(88),
            letterSpacing: vw(-2.64),
            lineHeight: 'normal',
          }}
        >
          Sundarban
        </p>
      </div>
    </Link>
  )
}

/** Figma 701:1920 — Rangamati: fixed width 808px, name at bottom-0 left-0, dark overlay */
function RangamatiCard() {
  return (
    <Link
      href="/destinations/rangamati"
      className="relative shrink-0 overflow-clip rounded-[20px]"
      style={{ width: vw(808), height: vw(400) }}
    >
      <div className="absolute inset-0 pointer-events-none rounded-[20px]" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/landing/destinations/rangamati.png"
          alt=""
          className="absolute max-w-none size-full rounded-[20px] object-cover"
          draggable={false}
        />
        <div className="absolute inset-0 rounded-[20px] bg-[rgba(0,0,0,0.3)]" />
      </div>

      <ArrowButton variant="white" top={20} right={20} />

      <div className="absolute bottom-0 left-0 flex flex-col items-start">
        <p
          className="relative shrink-0 whitespace-nowrap font-medium text-white"
          style={{
            fontSize: vw(88),
            letterSpacing: vw(-2.64),
            lineHeight: 'normal',
          }}
        >
          Rangamati
        </p>
      </div>
    </Link>
  )
}

function ViewAllArrow() {
  return (
    <svg width={28} height={28} viewBox="0 0 28 28" fill="none" aria-hidden>
      <path d="M11 6l8 8-8 8" stroke="#132110" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/** Top Destinations — Figma 701:1891
 *
 * All card/text dimensions stay at their original Figma vw() values.
 * A single scale transform on the inner content block uniformly shrinks
 * the whole section to fit the viewport height, preserving all proportions.
 */
export function TopDestinations() {
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const update = () => {
      // Section height at current viewport width = DESIGN_HEIGHT × (vpw / 1440)
      // Scale to fit viewport height, capped at 1
      const s = Math.min(1, (window.innerHeight * A) / (DESIGN_HEIGHT * window.innerWidth))
      setScale(s)
    }
    window.addEventListener('resize', update)
    update()
    return () => window.removeEventListener('resize', update)
  }, [])

  return (
    <section
      className="relative w-full bg-[#fffae7]"
      style={{ overflow: 'clip', height: '100dvh', scrollSnapAlign: 'start' }}
      data-node-id="701:1891"
    >
      {/* Scale the entire content uniformly so everything fits in the viewport */}
      <div style={{ transform: `scale(${scale})`, transformOrigin: 'top center' }}>
        <div
          className="flex w-full flex-col items-center"
          style={{ padding: vw(80), gap: vw(48) }}
        >
          {/* Header row — 1280px wide */}
          <div
            className="flex shrink-0 items-center justify-between"
            style={{ width: vw(1280) }}
          >
            <h2
              className="shrink-0 font-medium text-[#132110]"
              style={{
                fontSize: vw(40),
                letterSpacing: vw(-1.2),
                lineHeight: 'normal',
                width: vw(303),
              }}
            >
              Top Destinations
            </h2>

            <Link
              href="/explore"
              className="flex shrink-0 items-center text-[#132110] transition-opacity hover:opacity-70"
              style={{ gap: vw(12) }}
            >
              <span style={{ fontSize: vw(24), lineHeight: 1.4 }}>View All</span>
              <ViewAllArrow />
            </Link>
          </div>

          {/* Cards grid — 1368px wide */}
          <div
            className="flex shrink-0 flex-col items-start"
            style={{ width: vw(1368), gap: vw(12) }}
          >
            {/* Row 1: Cox Bazar + Sylhet */}
            <div className="flex w-full items-start" style={{ gap: vw(12) }}>
              <CoxBazarCard />
              <SylhetCard />
            </div>

            {/* Row 2: Sundarban + Rangamati */}
            <div className="flex w-full items-start" style={{ gap: vw(12) }}>
              <SundarbanCard />
              <RangamatiCard />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
