'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { navLinks, getActiveNavLabel } from '@/lib/nav-config'
import { ContactModal } from '@/components/site/ContactModal'

const A = 1440
const vw = (px: number) => `calc(${px} / ${A} * 100vw)`

/** Pill geometry at the 1440 artboard — shared by the landing hero and every other page. */
export const HERO_NAV_TOP = 40
export const HERO_NAV_WIDTH = 900
export const HERO_NAV_HEIGHT = 60

function ChevronRight({ color = 'currentColor' }: { color?: string }) {
  return (
    <svg width={16} height={16} viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M6 3l5 5-5 5"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/**
 * The canonical desktop navbar — white `rounded-[200px]` pill, logo left,
 * centred links, yellow "Contact Us" right. Used on EVERY desktop route:
 * the landing hero mounts it inside the video frame, `DesktopSiteHeader`
 * mounts it at the top of every other page.
 *
 * Fades in over 1s on load; it is never tied to scroll position.
 */
export function HeroNav({ elevated = false }: { elevated?: boolean }) {
  const pathname = usePathname()
  const active = getActiveNavLabel(pathname)
  const [contactOpen, setContactOpen] = useState(false)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const id = requestAnimationFrame(() => setShown(true))
    return () => cancelAnimationFrame(id)
  }, [])

  return (
    <div
      className="relative flex items-center justify-between overflow-hidden rounded-[200px] bg-white"
      style={{
        width: vw(HERO_NAV_WIDTH),
        height: vw(HERO_NAV_HEIGHT),
        paddingLeft: vw(20),
        paddingRight: vw(20),
        opacity: shown ? 1 : 0,
        transition: 'opacity 1s ease',
        // Pages without a photo behind the pill need an edge, or white-on-cream vanishes
        boxShadow: elevated ? '0 6px 28px rgba(19,33,16,0.10)' : undefined,
      }}
    >
      <Link href="/" aria-label="Beautiful Bangladesh — home" className="shrink-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/nav/logo.svg"
          alt="Beautiful Bangladesh"
          style={{ height: vw(30), width: vw(173.472) }}
          draggable={false}
        />
      </Link>

      <button
        type="button"
        onClick={() => setContactOpen(true)}
        className="flex shrink-0 cursor-pointer items-center gap-[8px] border-2 border-[#31542a] bg-[#f8ff98] font-medium text-[#31542a] transition-opacity hover:opacity-80"
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
      </button>

      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />

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
              aria-current={isActive ? 'page' : undefined}
            >
              {link.label}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
