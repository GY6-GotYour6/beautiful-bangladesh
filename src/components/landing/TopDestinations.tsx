'use client'

import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from 'react'
import { destinations } from '@/lib/landing-content'
import { FigmaFrame } from './FigmaFrame'

const CARD_W = 260
const GAP = 24
const STEP = CARD_W + GAP
const THUMB = 0.28

/** Interactive Top Destinations — Designs `466:1260`. */
export function TopDestinations() {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState(0)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(false)
  const [mounted, setMounted] = useState(false)

  const sync = useCallback(() => {
    const el = scrollerRef.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    const ratio = max > 0 ? el.scrollLeft / max : 0
    setOffset(ratio * (1 - THUMB))
    setCanPrev(el.scrollLeft > 2)
    setCanNext(max > 0 && el.scrollLeft < max - 2)
  }, [])

  useEffect(() => {
    const el = scrollerRef.current
    if (!el) return
    setMounted(true)
    sync()
    el.addEventListener('scroll', sync, { passive: true })
    const ro = new ResizeObserver(sync)
    ro.observe(el)
    return () => {
      el.removeEventListener('scroll', sync)
      ro.disconnect()
    }
  }, [sync])

  const scrollByStep = (dir: -1 | 1) => {
    scrollerRef.current?.scrollBy({ left: dir * STEP, behavior: 'smooth' })
  }

  // Drag the progress scrubber (large hit target).
  useEffect(() => {
    const track = trackRef.current
    const el = scrollerRef.current
    if (!track || !el) return
    let active = false

    const scrub = (clientX: number) => {
      const rect = track.getBoundingClientRect()
      if (rect.width <= 0) return
      let ratio = (clientX - rect.left) / rect.width - THUMB / 2
      ratio = Math.min(1 - THUMB, Math.max(0, ratio)) / (1 - THUMB)
      const max = el.scrollWidth - el.clientWidth
      el.scrollLeft = ratio * Math.max(0, max)
    }

    const onDown = (e: PointerEvent) => {
      if (e.button !== 0) return
      active = true
      track.setPointerCapture(e.pointerId)
      scrub(e.clientX)
      e.preventDefault()
    }
    const onMove = (e: PointerEvent) => {
      if (!active) return
      scrub(e.clientX)
    }
    const onUp = (e: PointerEvent) => {
      if (!active) return
      active = false
      if (track.hasPointerCapture(e.pointerId)) track.releasePointerCapture(e.pointerId)
    }

    track.addEventListener('pointerdown', onDown)
    track.addEventListener('pointermove', onMove)
    track.addEventListener('pointerup', onUp)
    track.addEventListener('pointercancel', onUp)
    return () => {
      track.removeEventListener('pointerdown', onDown)
      track.removeEventListener('pointermove', onMove)
      track.removeEventListener('pointerup', onUp)
      track.removeEventListener('pointercancel', onUp)
    }
  }, [])

  return (
    <FigmaFrame
      id="destinations"
      width={1440}
      height={566}
      data-node-id="466:1260"
      aria-label="Top destinations"
      className="bg-white"
    >
      <div className="relative flex h-full w-[1440px] flex-col justify-center gap-12 bg-white px-20 py-20">
        <div className="flex w-full items-center justify-between">
          <h2 className="text-[32px] tracking-[-0.96px] text-[#132110]">
            Top{' '}
            <span className="font-[family-name:var(--font-script)] font-bold text-[#31542a]">
              Destinations
            </span>
          </h2>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <CarouselBtn
                label="Previous destinations"
                disabled={mounted ? !canPrev : undefined}
                onClick={() => scrollByStep(-1)}
                mirror
              />
              <CarouselBtn
                label="Next destinations"
                disabled={mounted ? !canNext : undefined}
                onClick={() => scrollByStep(1)}
              />
            </div>
            <Link
              href="/explore"
              className="text-[14px] font-medium text-[#31542a] transition-opacity hover:opacity-70"
            >
              View All
            </Link>
          </div>
        </div>

        <div
          ref={scrollerRef}
          className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          style={{ touchAction: 'pan-x' }}
          role="list"
          aria-label="Destination cards"
        >
          {destinations.map((d) => (
            <Link
              key={d.slug}
              href={`/destinations/${d.slug}`}
              role="listitem"
              className="group flex w-[260px] shrink-0 snap-start flex-col gap-2.5 outline-none"
            >
              <div className="relative h-[149px] w-full overflow-hidden bg-[#f2f2f2]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/landing/destinations/${d.slug}.webp`}
                  alt=""
                  className="absolute inset-0 size-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  draggable={false}
                />
              </div>
              <div className="flex flex-col gap-3 text-[#132110]">
                <h3 className="text-[24px] font-medium leading-none transition-colors group-hover:text-[#31542a]">
                  {d.title}
                </h3>
                <p className="text-[16px] leading-[1.4] text-[#132110]/70">{d.blurb}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Visual bar is 2px; hit target is ~28px tall so it’s easy to grab */}
        <div
          ref={trackRef}
          className="relative -mt-2 flex h-7 w-full cursor-pointer items-center touch-none"
          role="scrollbar"
          aria-controls="destinations"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round((offset / (1 - THUMB)) * 100)}
          aria-orientation="horizontal"
          aria-label="Scroll destinations"
        >
          <div className="relative h-0.5 w-full bg-[#d9d9d9]">
            <div
              className="absolute top-0 h-full bg-[#132110]"
              style={{ width: `${THUMB * 100}%`, left: `${offset * 100}%` }}
            />
          </div>
        </div>
      </div>
    </FigmaFrame>
  )
}

function CarouselBtn({
  label,
  onClick,
  disabled,
  mirror,
}: {
  label: string
  onClick: () => void
  disabled?: boolean
  mirror?: boolean
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled ?? undefined}
      onClick={onClick}
      className="flex size-9 items-center justify-center rounded-full border border-[#132110]/20 text-[#132110] transition enabled:hover:border-[#31542a] enabled:hover:bg-[#31542a] enabled:hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden
        className={mirror ? 'rotate-180' : undefined}
      >
        <path
          d="M6 3l5 5-5 5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  )
}
