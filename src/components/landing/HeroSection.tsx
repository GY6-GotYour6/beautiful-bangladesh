'use client'

import { useEffect, useRef, useState } from 'react'
import { HeroNav, HERO_NAV_TOP } from '@/components/nav/HeroNav'
import { ScrollDownCue } from './ScrollDownCue'

const A = 1440
const vw = (px: number) => `calc(${px} / ${A} * 100vw)`

export function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null)
  const phaseRef = useRef(0)
  const cooldownRef = useRef(false)
  const [phase, setPhase] = useState(0)

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
        const next = Math.min(p + 1, 1)
        phaseRef.current = next
        return next
      })
      setTimeout(() => { cooldownRef.current = false }, 700)
    }

    function onWheel(e: WheelEvent) {
      // Only fully unlock once the title has revealed AND its cooldown has cleared
      if (phaseRef.current >= 1 && !cooldownRef.current) return
      if (!heroRef.current) return
      const top = heroRef.current.getBoundingClientRect().top
      if (top < -5 || top > 5) return // hero not snapped to viewport
      if (e.deltaY <= 0) return        // upward scroll — ignore
      e.preventDefault()
      if (phaseRef.current < 1) advance()
      // title already shown + cooldown still active: just block the scroll, wait it out
    }

    container.addEventListener('wheel', onWheel, { passive: false })
    return () => container.removeEventListener('wheel', onWheel)
  }, [])

  return (
    <div
      ref={heroRef}
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

          {/* Navbar is load-time only — never gated on scroll */}
          <div className="absolute z-30" style={{ top: vw(HERO_NAV_TOP), left: vw(270) }}>
            <HeroNav />
          </div>

          <div
            className="absolute"
            style={{
              bottom: vw(40),
              left: vw(40),
              opacity: phase >= 1 ? 1 : 0,
              transform: phase >= 1 ? 'translateX(0)' : 'translateX(-80px)',
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

          <ScrollDownCue position={{ bottom: vw(40), right: vw(40) }} />
        </div>
      </section>
    </div>
  )
}
