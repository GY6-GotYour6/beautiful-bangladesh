'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { ResponsiveFigmaPage } from '@/components/landing/ResponsiveFigmaPage'
import { MobileCta } from '@/components/landing/MobileSections'
import { HeroNav } from '@/components/landing/HeroSection'
import { CtaSection } from '@/components/landing/CtaSection'
import { exploreDestinations } from '@/lib/explore-destinations'

const A = 1440
const vw = (px: number) => `calc(${px} / ${A} * 100vw)`
const SPRING = 'cubic-bezier(0.22,1,0.36,1)'

const DESTINATIONS = exploreDestinations

// ─── Desktop ──────────────────────────────────────────────────────────────────

function ExploreHeroSection() {
  const heroRef = useRef<HTMLDivElement>(null)
  const phaseRef = useRef(0)
  const cooldownRef = useRef(false)
  const [phase, setPhase] = useState(0)
  const MAX_PHASE = 2

  useEffect(() => {
    phaseRef.current = phase
  }, [phase])

  useEffect(() => {
    const container = heroRef.current?.parentElement
    if (!container) return

    function advance() {
      if (cooldownRef.current) return
      cooldownRef.current = true
      setPhase((p) => {
        const next = Math.min(p + 1, MAX_PHASE)
        phaseRef.current = next
        return next
      })
      setTimeout(() => { cooldownRef.current = false }, 700)
    }

    function onWheel(e: WheelEvent) {
      if (phaseRef.current >= MAX_PHASE && !cooldownRef.current) return
      if (!heroRef.current) return
      const top = heroRef.current.getBoundingClientRect().top
      if (top < -5 || top > 5) return
      if (e.deltaY <= 0) return
      e.preventDefault()
      if (phaseRef.current < MAX_PHASE) advance()
    }

    container.addEventListener('wheel', onWheel, { passive: false })
    return () => container.removeEventListener('wheel', onWheel)
  }, [])

  return (
    <div
      ref={heroRef}
      style={{
        height: '100dvh',
        overflow: 'clip',
        scrollSnapAlign: 'start',
        scrollSnapStop: 'always',
      }}
    >
      <section className="flex h-full w-full flex-col bg-[#fffae7]" style={{ padding: vw(20) }}>
        <div className="relative min-h-0 flex-1 w-full overflow-hidden rounded-[20px]">
          <video
            className="pointer-events-none absolute inset-0 size-full object-cover"
            src="/explore/hero.mp4"
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

          <HeroNav visible={phase >= 1} />

          {/* Centering wrapper is stable; animation transform on inner div only */}
          <div
            className="pointer-events-none absolute"
            style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
          >
            <div
              className="flex items-center text-white"
              style={{
                gap: vw(280),
                fontSize: vw(24),
                fontWeight: 500,
                lineHeight: 1,
                whiteSpace: 'nowrap',
                opacity: phase >= 2 ? 1 : 0,
                transform: phase >= 2 ? 'translateY(0)' : 'translateY(20px)',
                transition: `opacity 0.65s ease, transform 0.65s ${SPRING}`,
              }}
            >
              <span>Find</span>
              <span>Your</span>
              <span>Perfect</span>
              <span>Destination</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function DestCard({
  name,
  slug,
  img,
  description,
}: {
  name: string
  slug: string
  img: string
  description: string
}) {
  return (
    <div
      className="flex min-w-0 flex-1 flex-col"
      style={{
        gap: vw(16),
        borderLeft: '1px solid rgba(0,0,0,0.08)',
        paddingLeft: vw(24),
      }}
    >
      <p
        className="w-full shrink-0 font-medium text-[#132110]"
        style={{ fontSize: vw(24), letterSpacing: vw(-0.72), lineHeight: 'normal' }}
      >
        {name}
      </p>
      {/* Image grows to fill remaining row space */}
      <Link
        href={`/destinations/${slug}`}
        className="block w-full min-h-0 flex-1 overflow-hidden"
        style={{ borderRadius: vw(20) }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={img}
          alt={name}
          className="size-full max-w-none object-cover transition-transform duration-500 hover:scale-[1.03]"
          draggable={false}
        />
      </Link>
      <p
        className="w-full shrink-0 text-[#132110] opacity-60"
        style={{ fontSize: vw(16), lineHeight: 1.4 }}
      >
        {description}
      </p>
    </div>
  )
}

function ExploreDestinations() {
  const row1 = DESTINATIONS.slice(0, 3)
  const row2 = DESTINATIONS.slice(3, 6)
  return (
    <section
      className="w-full bg-white"
      style={{
        height: '100dvh',
        overflow: 'clip',
        scrollSnapAlign: 'start',
        scrollSnapStop: 'always',
        display: 'flex',
        flexDirection: 'column',
        padding: vw(40),
      }}
    >
      <div
        className="flex w-full"
        style={{
          flex: '1 1 0',
          minHeight: 0,
          gap: vw(32),
          paddingBottom: vw(24),
          borderBottom: '1px solid #f0f0f0',
        }}
      >
        {row1.map((d) => (
          <DestCard key={d.slug} {...d} />
        ))}
      </div>
      <div
        className="flex w-full"
        style={{
          flex: '1 1 0',
          minHeight: 0,
          gap: vw(32),
          paddingTop: vw(24),
        }}
      >
        {row2.map((d) => (
          <DestCard key={d.slug} {...d} />
        ))}
      </div>
    </section>
  )
}

function ExploreDesktop() {
  useEffect(() => {
    if (window.innerWidth < 768) return
    const html = document.documentElement
    html.style.scrollSnapType = 'y mandatory'
    return () => {
      html.style.scrollSnapType = ''
    }
  }, [])

  return (
    <div className="relative w-full overflow-x-clip">
      <ExploreHeroSection />
      <ExploreDestinations />
      <CtaSection />
    </div>
  )
}

// ─── Mobile ───────────────────────────────────────────────────────────────────

function MobileDestCard({
  name,
  slug,
  img,
  description,
}: {
  name: string
  slug: string
  img: string
  description: string
}) {
  return (
    <div className="flex flex-col gap-[12px]" style={{ borderLeft: '2px solid rgba(0,0,0,0.08)', paddingLeft: 12 }}>
      <p className="text-[16px] font-medium leading-normal tracking-[-0.48px] text-[#132110]">
        {name}
      </p>
      <Link
        href={`/destinations/${slug}`}
        className="block w-full overflow-hidden rounded-[12px]"
        style={{ height: 180 }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={img}
          alt={name}
          className="size-full max-w-none object-cover"
          draggable={false}
        />
      </Link>
      <p className="text-[13px] leading-[1.4] text-[#132110] opacity-60">{description}</p>
    </div>
  )
}

function ExploreMobile() {
  return (
    <div className="relative w-full overflow-x-clip bg-white">
      {/* Hero */}
      <div className="w-full p-[8px]">
        <div
          className="relative w-full overflow-clip rounded-[16px]"
          style={{ height: 'calc(240 / 390 * 100vw)' }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/explore/hero-bg.png"
            alt=""
            className="absolute inset-0 size-full max-w-none object-cover"
            draggable={false}
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute text-white"
            style={{
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              display: 'flex',
              alignItems: 'center',
              gap: 'calc(48 / 390 * 100vw)',
              fontSize: 'calc(12 / 390 * 100vw)',
              fontWeight: 500,
              lineHeight: 1,
              whiteSpace: 'nowrap',
            }}
          >
            <span>Find</span>
            <span>Your</span>
            <span>Perfect</span>
            <span>Destination</span>
          </div>
        </div>
      </div>

      {/* Cards */}
      <section className="flex w-full flex-col gap-[24px] px-[16px] py-[32px]">
        {DESTINATIONS.map((d) => (
          <MobileDestCard key={d.slug} {...d} />
        ))}
      </section>

      {/* CTA */}
      <MobileCta />
    </div>
  )
}

// ─── Entry ────────────────────────────────────────────────────────────────────

export function ExplorePage() {
  return (
    <ResponsiveFigmaPage desktop={<ExploreDesktop />} mobile={<ExploreMobile />} />
  )
}
