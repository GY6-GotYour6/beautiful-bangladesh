'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

const A = 1440
const vw = (px: number) => `calc(${px} / ${A} * 100vw)`
const CARD_W = 250
const GAP = 12
const STEP = CARD_W + GAP

function cardH(dist: number): number {
  const steps = [340, 300, 280, 250]
  return steps[Math.min(dist, steps.length - 1)]
}

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <rect x="1" y="1" width="14" height="14" rx="4" stroke="#132110" strokeWidth="1.4" />
      <circle cx="8" cy="8" r="3.5" stroke="#132110" strokeWidth="1.4" />
      <circle cx="11.5" cy="4.5" r="0.8" fill="#132110" />
    </svg>
  )
}

type Creator = { src: string; name: string; instagramUrl: string }

const DEFAULT_CREATORS: Creator[] = [
  { src: '/landing/creators/creator-1.jpg', name: '', instagramUrl: '' },
  { src: '/landing/creators/creator-2.jpg', name: '', instagramUrl: '' },
  { src: '/landing/creators/creator-3.jpg', name: '', instagramUrl: '' },
  {
    src: '/landing/creators/creator-4.jpg',
    name: 'Rafsan the Chotobhai',
    instagramUrl: 'https://www.instagram.com/rafsanthechotobhai',
  },
  { src: '/landing/creators/creator-5.jpg', name: '', instagramUrl: '' },
  { src: '/landing/creators/creator-6.jpg', name: '', instagramUrl: '' },
  { src: '/landing/creators/creator-7.jpg', name: '', instagramUrl: '' },
]

export function CreatorsSection({
  creators: cmsCreators,
}: {
  creators?: { name: string; imagePath: string; instagramUrl: string }[]
}) {
  const creators: Creator[] =
    cmsCreators && cmsCreators.length > 0
      ? cmsCreators.map((c) => ({ src: c.imagePath, name: c.name, instagramUrl: c.instagramUrl }))
      : DEFAULT_CREATORS

  const n = creators.length
  // Triple the array so we can scroll right endlessly and silently reset from 3rd copy → 2nd copy
  const extended: Creator[] = [...creators, ...creators, ...creators]
  // Start at creator-4 position (Math.floor(n/2)) in the MIDDLE copy
  const START = n + Math.floor(n / 2)

  const [idx, setIdx] = useState(START)
  const [animated, setAnimated] = useState(true)
  const [focusOverride, setFocusOverride] = useState<number | null>(null)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const focusIdx = focusOverride ?? idx

  // When we've scrolled into the 3rd copy (idx >= 2n), silently jump back to the
  // equivalent position in the 2nd copy — same visual card, no transition.
  useEffect(() => {
    if (idx >= 2 * n) {
      const t = setTimeout(() => {
        setAnimated(false)
        setIdx((prev) => prev - n)
        requestAnimationFrame(() => requestAnimationFrame(() => setAnimated(true)))
      }, 560)
      return () => clearTimeout(t)
    }
  }, [idx, n])

  const startAuto = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setIdx((prev) => prev + 1)
    }, 2500)
  }, [])

  useEffect(() => {
    startAuto()
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [startAuto])

  // translateX so focusIdx card sits at viewport center (720 design px)
  const offsetPx = 720 - (focusIdx * STEP + CARD_W / 2)

  const focused = extended[focusIdx]
  const handle = focused?.instagramUrl
    ? focused.instagramUrl
        .replace(/^https?:\/\/(www\.)?instagram\.com\/?/, '')
        .replace(/\/$/, '')
    : null

  return (
    <section
      className="flex w-full flex-col items-center bg-[#fffae7]"
      style={{
        height: '100dvh',
        overflow: 'clip',
        scrollSnapAlign: 'start',
        scrollSnapStop: 'always',
        paddingTop: vw(80),
        paddingBottom: vw(80),
        gap: vw(48),
      }}
      data-node-id="701:1926"
    >
      <h2
        className="font-medium text-[#132110]"
        style={{ fontSize: vw(40), letterSpacing: vw(-1.2), lineHeight: 'normal' }}
      >
        Bangladeshi Creators You Should Watch
      </h2>

      <div className="flex w-full flex-col items-center" style={{ gap: vw(12) }}>
        {/* Infinite scroll row — overflows hidden, slides right continuously */}
        <div className="w-full" style={{ overflow: 'hidden' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              gap: vw(GAP),
              transform: `translateX(calc(${offsetPx} / ${A} * 100vw))`,
              transition: animated ? 'transform 0.55s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
              willChange: 'transform',
            }}
          >
            {extended.map((c, i) => {
              const dist = Math.abs(i - focusIdx)
              const isActive = i === focusIdx
              return (
                <a
                  key={i}
                  href={c.instagramUrl || undefined}
                  target={c.instagramUrl ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  onClick={!c.instagramUrl ? (e) => e.preventDefault() : undefined}
                  onMouseEnter={() => {
                    setFocusOverride(i)
                    if (timerRef.current) clearInterval(timerRef.current)
                  }}
                  onMouseLeave={() => {
                    setFocusOverride(null)
                    startAuto()
                  }}
                  className="relative shrink-0 overflow-hidden rounded-[12px]"
                  style={{
                    width: vw(CARD_W),
                    height: vw(cardH(dist)),
                    background: isActive ? '#f4df92' : '#d4d4d4',
                    transition:
                      'height 0.55s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.35s ease',
                    cursor: c.instagramUrl ? 'pointer' : 'default',
                    display: 'block',
                    textDecoration: 'none',
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={c.src}
                    alt={c.name || ''}
                    className="absolute inset-0 size-full max-w-none object-cover"
                    draggable={false}
                  />
                </a>
              )
            })}
          </div>
        </div>

        {/* Name + instagram of focused creator */}
        <div
          className="flex flex-col items-center"
          style={{ gap: vw(4), minHeight: vw(42) }}
        >
          {focused?.name && (
            <p
              className="font-medium capitalize text-[#132110]"
              style={{ fontSize: vw(18), letterSpacing: vw(-0.54), lineHeight: 'normal' }}
            >
              {focused.name}
            </p>
          )}
          {handle && (
            <div className="flex items-center justify-center" style={{ gap: vw(4) }}>
              <InstagramIcon />
              <p
                className="text-[#132110] opacity-60"
                style={{ fontSize: vw(14), lineHeight: 'normal' }}
              >
                @{handle}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
