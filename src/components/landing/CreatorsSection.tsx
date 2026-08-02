'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

const A = 1440
const vw = (px: number) => `calc(${px} / ${A} * 100vw)`

const CARD_W = 250
const GAP = 12
const STEP = CARD_W + GAP

function cardH(distFromCenter: number): number {
  const steps = [340, 300, 280, 250]
  return steps[Math.min(Math.abs(distFromCenter), steps.length - 1)]
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

const DEFAULT_CREATORS = [
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
  const creators =
    cmsCreators && cmsCreators.length > 0
      ? cmsCreators.map((c) => ({ src: c.imagePath, name: c.name, instagramUrl: c.instagramUrl }))
      : DEFAULT_CREATORS

  const initIdx = Math.floor(creators.length / 2)
  const [activeIdx, setActiveIdx] = useState(initIdx)
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const focusIdx = hoveredIdx ?? activeIdx

  const startAuto = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % creators.length)
    }, 2500)
  }, [creators.length])

  useEffect(() => {
    startAuto()
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [startAuto])

  // Shift row so focusIdx card is centered at viewport midpoint (720 design px)
  const offsetPx = 720 - (focusIdx * STEP + CARD_W / 2)

  const focused = creators[focusIdx]
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
        {/* Card row — slides to keep focused card centered */}
        <div className="w-full" style={{ overflow: 'hidden' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              gap: vw(GAP),
              transform: `translateX(calc(${offsetPx} / ${A} * 100vw))`,
              transition: 'transform 0.55s cubic-bezier(0.4, 0, 0.2, 1)',
              willChange: 'transform',
            }}
          >
            {creators.map((c, i) => {
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
                    setHoveredIdx(i)
                    if (intervalRef.current) clearInterval(intervalRef.current)
                  }}
                  onMouseLeave={() => {
                    setHoveredIdx(null)
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
                    textDecoration: 'none',
                    display: 'block',
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
