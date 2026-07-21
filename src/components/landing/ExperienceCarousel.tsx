'use client'

import { useState, useEffect, useRef } from 'react'

const STAMPS = [
  { id: 'shopping',   label: 'Shopping',      photo: '/landing/experience/shopping.png',   svg: '/landing/experience/stamp-shopping.svg' },
  { id: 'activities', label: 'Activities',    photo: '/landing/experience/activities.png', svg: '/landing/experience/stamp-activities.svg' },
  { id: 'food',       label: 'Food & Drinks', photo: '/landing/experience/food.png',        svg: '/landing/experience/stamp-food.svg' },
  { id: 'culture',    label: 'Culture',       photo: '/landing/experience/culture.png',    svg: '/landing/experience/stamp-culture.svg' },
  { id: 'history',    label: 'History',       photo: '/landing/experience/history.png',    svg: '/landing/experience/stamp-history.svg' },
]

const N = STAMPS.length

function computePos(i: number, active: number): number {
  let pos = i - active
  if (pos >  Math.floor(N / 2)) pos -= N
  if (pos < -Math.floor(N / 2)) pos += N
  return pos
}

type JumpState = { card: number; phase: 'out' | 'teleport' | 'in' } | null

interface Props {
  cardW:      number
  cardH:      number
  scale1:     number
  scale2:     number
  gap:        number
  labelSize?: number
  fadeW?:     number
  className?: string
}

export function ExperienceCarousel({
  cardW,
  cardH,
  scale1,
  scale2,
  gap,
  labelSize = 28,
  fadeW     = 120,
  className,
}: Props) {
  const [active,    setActive]    = useState(2)
  const [jumpState, setJumpState] = useState<JumpState>(null)
  const activeRef = useRef(2)
  activeRef.current = active

  useEffect(() => {
    let t1: ReturnType<typeof setTimeout> | null = null
    let t2: ReturnType<typeof setTimeout> | null = null

    const interval = setInterval(() => {
      if (t1) clearTimeout(t1)
      if (t2) clearTimeout(t2)

      const prev     = activeRef.current
      const next     = (prev + 1) % N
      // Card sitting at pos=-2 (far left) will wrap to pos=+2 (far right)
      const jumpCard = ((prev - 2) % N + N) % N

      // Fade jump card OUT at left edge, slide all other cards to new positions
      setJumpState({ card: jumpCard, phase: 'out' })
      setActive(next)

      // After fade-out: instantly move jump card to right edge (still opacity=0)
      t1 = setTimeout(() => {
        setJumpState({ card: jumpCard, phase: 'teleport' })
        // Next paint: fade jump card IN at right edge
        requestAnimationFrame(() =>
          requestAnimationFrame(() =>
            setJumpState({ card: jumpCard, phase: 'in' })
          )
        )
      }, 350)

      // After full animation cycle: clear jump state
      t2 = setTimeout(() => setJumpState(null), 920)
    }, 3200)

    return () => {
      clearInterval(interval)
      if (t1) clearTimeout(t1)
      if (t2) clearTimeout(t2)
    }
  }, [])

  const half  = cardW / 2
  const half1 = half * scale1
  const half2 = half * scale2
  const tx1   = half + gap + half1
  const tx2   = tx1 + half1 + gap + half2

  // #f5de8f — matches section background for both desktop and mobile
  const fadeColor = 'rgba(245,222,143,1)'
  const fadeTrans = 'rgba(245,222,143,0)'

  return (
    <div
      className={`relative w-full overflow-hidden ${className ?? ''}`}
      style={{ height: cardH + 24 }}
    >
      {STAMPS.map((stamp, i) => {
        const isJump = jumpState?.card === i
        const phase  = jumpState?.phase

        let pos = computePos(i, active)
        let opacity: number
        let transition: string

        if (isJump) {
          if (phase === 'out') {
            pos        = -2                    // hold at left-edge position while fading out
            opacity    = 0                     // CSS will animate from previous opacity(1) → 0
            transition = 'opacity 0.3s ease'   // only opacity, no transform slide
          } else if (phase === 'teleport') {
            // pos = computePos(...) now = +2 (correct after active update)
            opacity    = 0
            transition = 'none'               // instant: no jump flash, no opacity transition
          } else {
            // phase === 'in'
            opacity    = 1                     // CSS will animate from 0 → 1
            transition = 'opacity 0.5s ease'
          }
        } else {
          opacity    = 1
          transition = 'transform 0.65s cubic-bezier(0.4,0,0.2,1), opacity 0.4s ease'
        }

        const tx    = pos ===  0 ?  0
                    : pos ===  1 ?  tx1
                    : pos === -1 ? -tx1
                    : pos ===  2 ?  tx2
                    :              -tx2
        const scale = pos === 0 ? 1 : Math.abs(pos) === 1 ? scale1 : scale2

        return (
          <div
            key={stamp.id}
            style={{
              position:  'absolute',
              left:      '50%',
              top:       '50%',
              transform: `translateX(calc(-50% + ${tx}px)) translateY(-50%) scale(${scale})`,
              transition,
              opacity,
              zIndex: pos === 0 ? 2 : Math.abs(pos) === 1 ? 1 : 0,
            }}
          >
            <div style={{ width: cardW, height: cardH, position: 'relative' }}>
              {/* Photo — inset inside stamp perforations */}
              <div
                aria-hidden
                style={{ position: 'absolute', top: '4.5%', left: '6%', right: '6%', bottom: '4.5%', overflow: 'hidden' }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={stamp.photo}
                  alt=""
                  draggable={false}
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.2)' }} />
              </div>

              {/* SVG stamp frame */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={stamp.svg}
                alt=""
                draggable={false}
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
              />

              {/* Label */}
              <p
                style={{
                  position:      'absolute',
                  left: 0, right: 0,
                  top:           '50%',
                  transform:     'translateY(-50%)',
                  textAlign:     'center',
                  color:         '#f8ff98',
                  fontSize:      labelSize,
                  fontFamily:    'var(--font-script)',
                  letterSpacing: '-0.08em',
                  lineHeight:    'normal',
                  textShadow:    '0px 4px 4px rgba(0,0,0,0.25)',
                  whiteSpace:    'nowrap',
                  pointerEvents: 'none',
                }}
              >
                {stamp.label}
              </p>
            </div>
          </div>
        )
      })}

      {/* Cloud fades — inside carousel div so they're bounded to card height only */}
      {fadeW > 0 && (
        <>
          <div
            aria-hidden
            style={{
              position:            'absolute',
              inset:               0,
              right:               'auto',
              width:               fadeW,
              background:          `linear-gradient(to right, ${fadeColor} 40%, ${fadeTrans} 125.47%)`,
              backdropFilter:      'blur(8px)',
              WebkitBackdropFilter:'blur(8px)',
              pointerEvents:       'none',
              zIndex:              10,
            }}
          />
          <div
            aria-hidden
            style={{
              position:            'absolute',
              inset:               0,
              left:                'auto',
              width:               fadeW,
              background:          `linear-gradient(to left, ${fadeColor} 40%, ${fadeTrans} 125.47%)`,
              backdropFilter:      'blur(8px)',
              WebkitBackdropFilter:'blur(8px)',
              pointerEvents:       'none',
              zIndex:              10,
            }}
          />
        </>
      )}
    </div>
  )
}
