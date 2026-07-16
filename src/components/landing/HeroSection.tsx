'use client'

import Link from 'next/link'
import Image from 'next/image'
import {
  DESKTOP_ARTBOARD,
  DESKTOP_HERO_OFFSET,
  DESKTOP_PAGE_INSET,
} from '@/lib/nav-config'
import { CtaButton } from './CtaButton'
import { ScrollDownCue } from './ScrollDownCue'

const reels = [
  { src: '/hero/reel1.webp', alt: "Cox's Bazar reel", href: '/#creator-reels' },
  { src: '/hero/reel2.webp', alt: 'Sunset reel', href: '/#creator-reels' },
  { src: '/hero/reel3.webp', alt: 'Scenic reel', href: '/#creator-reels' },
]

const vw = (px: number) => `calc(${px} / ${DESKTOP_ARTBOARD} * 100vw)`

/** Desktop hero — Figma `466:883`: frame is one 1080px viewport, hero image
    fills from y=92 to the frame bottom. Height derives from the real viewport
    (100svh − scaled 92px offset) so the whole hero fits on screen unscrolled. */
export function HeroSection() {
  return (
    <div
      className="hidden w-full bg-[#faf7f2] md:block"
      style={{
        paddingTop: vw(DESKTOP_HERO_OFFSET),
        paddingLeft: vw(DESKTOP_PAGE_INSET),
        paddingRight: vw(DESKTOP_PAGE_INSET),
      }}
      data-node-id="466:883"
    >
      <div
        className="relative w-full overflow-hidden rounded-tl-[40px] rounded-tr-[40px]"
        style={{ height: `calc(100svh - ${vw(DESKTOP_HERO_OFFSET)})`, minHeight: 720 }}
      >
        {/* Background photo */}
        <Image
          src="/hero/bg.webp"
          alt="Beautiful Bangladesh — aerial landscape"
          fill
          className="object-cover pointer-events-none"
          priority
          sizes="(min-width: 768px) 100vw"
        />

        {/* Top-down gradient */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[400px]"
          style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.03))' }}
          aria-hidden="true"
        />

        {/* Headline — Figma: absolute 60/60, w 720, 80px medium, lh 100%, ls −3.2 */}
        <div className="absolute" style={{ left: vw(60), top: vw(60) }} data-node-id="466:887">
          <h1
            className="font-[family-name:var(--font-display)] font-medium text-white"
            style={{ fontSize: vw(80), letterSpacing: vw(-3.2), lineHeight: 1 }}
          >
            Beautiful<br />Bangladesh
          </h1>
        </div>

        {/* Tagline — upper right; Figma 16px @ 1440, scales with viewport */}
        <p
          className="absolute text-right font-[family-name:var(--font-ui)] text-white/80"
          style={{
            right: vw(60),
            top: vw(107),
            width: vw(239),
            fontSize: vw(16),
            lineHeight: 1.4,
          }}
          data-node-id="466:900"
        >
          From mangrove forests and rolling hills to waterfalls, tea estates, and endless coastlines
        </p>

        {/* Reel thumbnails + CTA — bottom right */}
        <div
          className="absolute bottom-[100px] right-[60px] flex w-[630px] flex-col gap-3"
          data-node-id="466:888"
        >
          <div className="flex items-center justify-between">
            <span className="font-[family-name:var(--font-ui)] text-[16px] font-medium text-[#faf7f2]">
              Latest Reels
            </span>

            {/* Stamp button — Figma 466:891 */}
            <CtaButton size="sm" label="Check Out Reels" />
          </div>

          {/* Thumbnails strip */}
          <div className="relative overflow-hidden rounded-[5px] bg-[#faf7f2]" style={{ height: 312 }}>
            <div className="absolute inset-y-0 left-4 flex gap-3">
              {reels.map((r) => (
                <Link
                  key={r.src}
                  href={r.href}
                  className="relative h-[280px] w-[180px] shrink-0 overflow-hidden rounded-sm self-center"
                  aria-label={r.alt}
                >
                  <Image
                    src={r.src}
                    alt={r.alt}
                    fill
                    className="object-cover"
                    sizes="180px"
                  />
                </Link>
              ))}
            </div>
            {/* Fade right edge */}
            <div
              className="pointer-events-none absolute inset-y-0 right-0 w-[140px]"
              style={{ background: 'linear-gradient(to right, transparent, #f3f3ed)' }}
              aria-hidden="true"
            />
          </div>
        </div>

        {/* Cloud mist at bottom — Figma 466:899.
            30px container at bottom-[-26px]; inner image expands via percentage insets
            so only ~121px of the 264px image is visible inside the hero (rest clipped). */}
        <div
          className="pointer-events-none absolute bottom-[-26px] left-[-36px] h-[30px] w-[calc(100%+100px)]"
          aria-hidden="true"
        >
          <div className="absolute" style={{ inset: '-390% -4.37% -390% -3.49%' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/hero/cloud.png"
              alt=""
              className="block h-full w-full max-w-none"
              draggable={false}
            />
          </div>
        </div>

        {/* Same scaled left inset as the headline so both start on one line */}
        <ScrollDownCue position={{ left: vw(60), bottom: vw(100) }} />

      </div>
    </div>
  )
}
