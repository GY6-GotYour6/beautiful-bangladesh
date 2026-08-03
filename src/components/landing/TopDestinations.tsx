'use client'

import Link from 'next/link'
import { useState } from 'react'
import { destinationHref } from '@/lib/explore-destinations'
import type { LandingDestination } from '@/lib/landing-global'

const A = 1440
const vw = (px: number) => `calc(${px} / ${A} * 100vw)`
const SPRING = 'cubic-bezier(0.22,1,0.36,1)'

type Dest = {
  name: string
  slug: string
  img: string
  description: string
}


function DestCard({ name, slug, img, description }: Dest) {
  const [hovered, setHovered] = useState(false)

  return (
    <Link
      href={destinationHref(slug)}
      className="relative overflow-clip rounded-[20px]"
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

      {/* Text anchored to card bottom. All siblings are absolute so the
          Link has zero intrinsic height — outer grid's align-self:stretch
          sets the actual height. Description expanding inside this
          bottom-anchored div lifts the name naturally; no translateY
          needed and no grid reflow that would fight it. */}
      <div
        className="absolute inset-x-0 bottom-0 z-10"
        style={{ padding: `0 ${vw(24)} ${vw(14)} ${vw(24)}` }}
      >
        <p
          className="font-medium text-white"
          style={{ fontSize: vw(40), letterSpacing: vw(-1.2), lineHeight: 1.05, paddingBottom: vw(6) }}
        >
          {name}
        </p>
        <p
          className="overflow-hidden text-white/75"
          style={{
            fontSize: vw(15),
            lineHeight: 1.5,
            maxHeight: hovered ? '200px' : '0px',
            opacity: hovered ? 1 : 0,
            transition: `max-height 0.5s ${SPRING} 0.08s, opacity 0.4s ease 0.08s`,
          }}
        >
          {description}
        </p>
      </div>
    </Link>
  )
}

/** Top Destinations — Figma 701:1891 */
export function TopDestinations({
  destinations: cmsDestinations,
}: {
  destinations?: LandingDestination[]
}) {
  // CMS-only, same rule as the mobile section: nothing published means no
  // section at all, rather than a heading over an empty grid.
  if (!cmsDestinations || cmsDestinations.length === 0) return null

  const destinations: Dest[] = cmsDestinations.map((d) => ({
    name: d.name,
    slug: d.slug,
    img: d.imagePath,
    description: d.description,
  }))

  return (
    <section
      id="destinations"
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

      {/* Card grid: three per row, every card the same size. `gridAutoRows: 1fr`
          keeps rows equal for any number of destinations. Each Link is a grid
          item sized by the grid — absolute children position correctly because
          the Link has definite dimensions. */}
      <div
        style={{
          flex: '1 0 0',
          minHeight: 0,
          width: vw(1368),
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridAutoRows: '1fr',
          gap: vw(12),
        }}
      >
        {destinations.map((d) => (
          <DestCard key={d.slug} {...d} />
        ))}
      </div>
    </section>
  )
}
