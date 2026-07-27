'use client'

import Link from 'next/link'
import { useState } from 'react'

const A = 1440
const vw = (px: number) => `calc(${px} / ${A} * 100vw)`
const SPRING = 'cubic-bezier(0.22,1,0.36,1)'

type Dest = {
  name: string
  slug: string
  img: string
  description: string
}

const DESTINATIONS: Dest[] = [
  {
    name: 'Cox Bazar',
    slug: '/destinations/coxs-bazar',
    img: '/landing/destinations/coxs-bazar.webp',
    description: "World's longest natural sea beach — 120 km of golden sands along the Bay of Bengal.",
  },
  {
    name: 'Sylhet',
    slug: '/destinations/sylhet',
    img: '/landing/destinations/sylhet.webp',
    description: 'Rolling tea gardens, mystical haors, and the lush highland forests of Bangladesh.',
  },
  {
    name: 'Sundarban',
    slug: '/destinations/sundarbans',
    img: '/landing/destinations/sundarbans.png',
    description: "The world's largest mangrove forest — home to the Royal Bengal Tiger and rare wildlife.",
  },
  {
    name: 'Rangamati',
    slug: '/destinations/rangamati',
    img: '/landing/destinations/rangamati.png',
    description: 'Emerald hills, serene Kaptai Lake, and the rich traditions of the Chittagong Hill Tracts.',
  },
]

function DestCard({ name, slug, img, description }: Dest) {
  const [hovered, setHovered] = useState(false)

  return (
    <Link
      href={slug}
      className="relative overflow-clip rounded-[20px]"
      style={{ display: 'grid', gridTemplateRows: '1fr auto' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Background image — absolute, not in grid flow */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={img}
        alt={name}
        className="absolute inset-0 size-full max-w-none object-cover"
        style={{
          transform: hovered ? 'scale(1.04)' : 'scale(1)',
          transition: `transform 0.7s ${SPRING}`,
        }}
        draggable={false}
      />

      {/* Gradient overlay */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, transparent 28%, rgba(0,0,0,0.42) 62%, rgba(0,0,0,0.82) 100%)',
        }}
        aria-hidden
      />

      {/* Arrow */}
      <div
        className="absolute flex items-center justify-center overflow-hidden rounded-full"
        style={{
          top: vw(24),
          right: vw(24),
          width: vw(40),
          height: vw(40),
          background: hovered ? '#31542a' : 'white',
          color: hovered ? 'white' : '#31542a',
          border: hovered ? '1.5px solid transparent' : '1.5px solid rgba(255,255,255,0.6)',
          transform: hovered ? 'scale(1.15)' : 'scale(1)',
          transition: 'transform 0.3s ease, background 0.3s ease, color 0.3s ease, border-color 0.3s ease',
        }}
        aria-hidden
      >
        <div style={{ transform: 'rotate(-45deg)', display: 'flex' }}>
          <svg width={20} height={20} viewBox="0 0 20 20" fill="none">
            <path
              d="M4 10h12M12 4l6 6-6 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* Grid row 1: spacer (1fr) — pushes text row to bottom */}
      <div aria-hidden />

      {/* Grid row 2: text (auto height) — always at card bottom */}
      <div
        className="relative z-10"
        style={{
          padding: `0 ${vw(24)} ${vw(14)} ${vw(24)}`,
          transform: hovered ? `translateY(${vw(-40)})` : 'translateY(0)',
          transition: `transform 0.5s ${SPRING}`,
        }}
      >
        <p
          className="font-medium text-white"
          style={{ fontSize: vw(88), letterSpacing: vw(-2.64), lineHeight: 1, paddingBottom: vw(6) }}
        >
          {name}
        </p>
        <p
          className="text-white/75"
          style={{
            fontSize: vw(16),
            lineHeight: 1.5,
            transform: hovered ? 'translateY(0)' : 'translateY(50px)',
            opacity: hovered ? 1 : 0,
            transition: `transform 0.5s ${SPRING} 0.08s, opacity 0.4s ease 0.08s`,
          }}
        >
          {description}
        </p>
      </div>
    </Link>
  )
}

/** Top Destinations — Figma 701:1891 */
export function TopDestinations() {
  return (
    <section
      className="flex w-full flex-col items-center bg-[#fffae7]"
      style={{
        height: '100dvh',
        overflow: 'clip',
        scrollSnapAlign: 'start',
        scrollSnapStop: 'always',
        paddingTop: `min(${vw(80)}, 4dvh)`,
        paddingBottom: `min(${vw(80)}, 4dvh)`,
        paddingLeft: vw(80),
        paddingRight: vw(80),
        gap: vw(48),
      }}
      data-node-id="701:1891"
    >
      {/* Header */}
      <div className="flex w-full shrink-0 items-center justify-between" style={{ maxWidth: vw(1368) }}>
        <h2
          className="shrink-0 font-medium text-[#132110]"
          style={{ fontSize: vw(40), letterSpacing: vw(-1.2), lineHeight: 'normal', width: vw(303) }}
        >
          Top Destinations
        </h2>
        <Link
          href="/explore"
          className="group flex shrink-0 cursor-pointer items-center text-[#132110]"
          style={{ gap: vw(8) }}
        >
          <span
            className="transition-opacity duration-200 group-hover:opacity-70"
            style={{ fontSize: vw(24), lineHeight: 1.4 }}
          >
            View All
          </span>
          <svg
            width={28}
            height={28}
            viewBox="0 0 28 28"
            fill="none"
            aria-hidden
            className="transition-transform duration-200 group-hover:translate-x-1"
          >
            <path
              d="M11 6l8 8-8 8"
              stroke="#132110"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>

      {/* Card grid: two separate CSS grids, one per row, with different column
          templates. Each Link is a grid item and gets a definite size in both
          axes, fixing the absolute-child positioning for all four cards. */}
      <div
        className="flex flex-col"
        style={{ flex: '1 0 0', minHeight: 0, width: vw(1368), gap: vw(12) }}
      >
        {/* Row 1: Cox Bazar wide (808) + Sylhet fills remaining */}
        <div
          style={{
            flex: '1 0 0',
            minHeight: 0,
            display: 'grid',
            gridTemplateColumns: `${vw(808)} 1fr`,
            gridTemplateRows: '1fr',
            gap: vw(12),
          }}
        >
          <DestCard {...DESTINATIONS[0]} />
          <DestCard {...DESTINATIONS[1]} />
        </div>

        {/* Row 2: Sundarban narrow (548) + Rangamati fills remaining */}
        <div
          style={{
            flex: '1 0 0',
            minHeight: 0,
            display: 'grid',
            gridTemplateColumns: `${vw(548)} 1fr`,
            gridTemplateRows: '1fr',
            gap: vw(12),
          }}
        >
          <DestCard {...DESTINATIONS[2]} />
          <DestCard {...DESTINATIONS[3]} />
        </div>
      </div>
    </section>
  )
}
