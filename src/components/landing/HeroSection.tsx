'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { navLinks, getActiveNavLabel } from '@/lib/nav-config'

const A = 1440
const vw = (px: number) => `calc(${px} / ${A} * 100vw)`

function ChevronRight({ color = 'currentColor' }: { color?: string }) {
  return (
    <svg width={16} height={16} viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M6 3l5 5-5 5" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function HeroNav({ visible }: { visible: boolean }) {
  const pathname = usePathname()
  const active = getActiveNavLabel(pathname)

  return (
    <div
      className="absolute flex items-center justify-between overflow-hidden rounded-[200px] bg-white"
      style={{
        top: vw(40),
        left: vw(270),
        width: vw(900),
        height: vw(60),
        paddingLeft: vw(20),
        paddingRight: vw(20),
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(-14px)',
        transition: 'opacity 0.45s ease, transform 0.45s cubic-bezier(0.22,1,0.36,1)',
        pointerEvents: visible ? 'auto' : 'none',
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/nav/logo.svg"
        alt="Beautiful Bangladesh"
        style={{ height: vw(30), width: vw(173.472) }}
        draggable={false}
      />

      <Link
        href="/explore"
        className="flex shrink-0 items-center gap-[8px] border-2 border-[#31542a] bg-[#f8ff98] font-medium text-[#31542a] transition-opacity hover:opacity-80"
        style={{
          height: vw(40),
          borderRadius: vw(20),
          paddingLeft: vw(12),
          paddingRight: vw(12),
          fontSize: vw(16),
          lineHeight: 1.4,
        }}
      >
        Contact Us
        <ChevronRight color="#31542a" />
      </Link>

      <div
        className="absolute left-1/2 top-1/2 flex items-center"
        style={{ transform: 'translate(-50%,-50%)', gap: vw(36) }}
      >
        {navLinks.slice(0, 3).map((link) => {
          const isActive = active === link.label
          return (
            <Link
              key={link.label}
              href={link.href}
              className="whitespace-nowrap text-[#31542a] transition-opacity hover:opacity-70"
              style={{ fontSize: vw(16), lineHeight: 1.4, fontWeight: isActive ? 500 : 400 }}
            >
              {link.label}
            </Link>
          )
        })}
      </div>
    </div>
  )
}

/**
 * Animation applied directly on the card's own positioned div to avoid the
 * CSS bug where transform on a wrapper creates a new containing block,
 * causing position:absolute children to mis-position.
 */
function LatestReelsCard({ visible }: { visible: boolean }) {
  return (
    <div
      className="absolute overflow-hidden rounded-[12px] bg-white"
      style={{
        bottom: vw(40),
        right: vw(40),
        width: vw(400),
        height: vw(182),
        padding: vw(8),
        display: 'flex',
        gap: vw(12),
        // Slide from right — applied directly here (no wrapper div)
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateX(0)' : 'translateX(80px)',
        transition: 'opacity 0.65s ease, transform 0.65s cubic-bezier(0.22,1,0.36,1)',
      }}
    >
      <div className="shrink-0 overflow-hidden rounded-[8px]" style={{ width: vw(128) }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/landing/assets/hero/latest-reels-thumb.jpg"
          alt=""
          className="size-full object-cover"
          draggable={false}
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-between">
        <div className="flex flex-col" style={{ gap: vw(6) }}>
          <p className="font-medium text-[#132110]" style={{ fontSize: vw(16), lineHeight: 1.4 }}>
            Latest Reels
          </p>
          <p className="text-[#132110] opacity-60" style={{ fontSize: vw(14), lineHeight: 1.2 }}>
            From mangrove forests and{' '}rolling hills to waterfalls,{' '}tea estates, and endless coastlines
          </p>
        </div>

        <Link
          href="/#creator-reels"
          className="flex shrink-0 items-center justify-center gap-[8px] border-2 border-[#31542a] bg-[#f8ff98] text-[#31542a] transition-opacity hover:opacity-80"
          style={{
            height: vw(36),
            borderRadius: vw(200),
            paddingLeft: vw(12),
            paddingRight: vw(12),
            fontSize: vw(16),
            lineHeight: 1.4,
          }}
        >
          Checkout Reels
          <ChevronRight color="#31542a" />
        </Link>
      </div>
    </div>
  )
}

export function HeroSection() {
  const [navVisible, setNavVisible] = useState(false)
  const [titleVisible, setTitleVisible] = useState(false)
  const [reelsVisible, setReelsVisible] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setNavVisible(true), 400)
    const t2 = setTimeout(() => setTitleVisible(true), 800)
    const t3 = setTimeout(() => setReelsVisible(true), 1200)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [])

  return (
    <div
      className="relative hidden md:block"
      style={{ height: '100dvh', overflow: 'clip', scrollSnapAlign: 'start', scrollSnapStop: 'always' }}
      data-node-id="701:1861"
    >
      <section
        className="flex h-full w-full flex-col bg-[#fffae7]"
        style={{ padding: vw(20) }}
      >
        <div
          className="relative min-h-0 flex-1 w-full overflow-hidden rounded-[20px]"
        >
          <video
            className="pointer-events-none absolute inset-0 size-full object-cover"
            src="/hero/hero.mp4"
            autoPlay
            muted
            loop
            playsInline
            poster="/hero/bg.webp"
            aria-hidden="true"
          />

          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 9%, rgba(0,0,0,0.03))' }}
            aria-hidden="true"
          />

          <HeroNav visible={navVisible} />

          {/* "Beautiful Bangladesh" — slides in from the left.
              position:absolute on this div is fine because the <p> children
              are NOT absolutely positioned, so transform here doesn't
              mis-anchor any absolute children. */}
          <div
            className="absolute"
            style={{
              bottom: vw(40),
              left: vw(40),
              opacity: titleVisible ? 1 : 0,
              transform: titleVisible ? 'translateX(0)' : 'translateX(-80px)',
              transition: 'opacity 0.65s ease, transform 0.65s cubic-bezier(0.22,1,0.36,1)',
            }}
            data-node-id="701:1890"
          >
            <p
              className="font-medium leading-none whitespace-nowrap text-white"
              style={{ fontSize: vw(112), letterSpacing: vw(-3.36) }}
            >
              Beautiful
            </p>
            <p
              className="font-medium leading-none whitespace-nowrap text-white"
              style={{ fontSize: vw(112), letterSpacing: vw(-3.36) }}
            >
              Bangladesh
            </p>
          </div>

          {/* Reels card — animation on the card's own div, no wrapper */}
          <LatestReelsCard visible={reelsVisible} />
        </div>
      </section>
    </div>
  )
}
