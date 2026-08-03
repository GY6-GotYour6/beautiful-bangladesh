'use client'

import Link from 'next/link'
import { useId, useState } from 'react'
import { MobileNavDrawer } from './MobileNavDrawer'

/** Logo intrinsic ratio — `/nav/logo.svg` viewBox is 173.472 × 30. */
const LOGO_HEIGHT = 22
const LOGO_WIDTH = (173.472 / 30) * LOGO_HEIGHT

function MenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z" />
    </svg>
  )
}

/**
 * Mobile header — Designs `428:154`: pill inset 16px, top 24px, height 44px.
 * White pill + logo mirrors the desktop hero nav (`HeroSection` `HeroNav`);
 * the logo artwork is dark green, so it needs a light pill to read.
 * Plain responsive CSS (no scale transform) so it can never overflow the
 * viewport; page content starts at 76px (8px gap under the pill).
 * `fixed` so the pill stays put while the page scrolls.
 */
export function MobileSiteHeader() {
  const [open, setOpen] = useState(false)
  const panelId = useId()

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-50 md:hidden">
      <header
        className="pointer-events-auto mx-[16px] mt-[10px] flex h-[44px] items-center justify-between rounded-[1200px] bg-white px-4"
        data-node-id="428:154"
      >
        <Link
          href="/"
          className="relative shrink-0 outline-none focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#31542a]"
          data-node-id="428:109"
          aria-label="Beautiful Bangladesh — home"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/nav/logo.svg"
            alt="Beautiful Bangladesh"
            style={{ height: LOGO_HEIGHT, width: LOGO_WIDTH }}
            draggable={false}
          />
        </Link>
        <button
          type="button"
          className="inline-flex h-7 w-7 items-center justify-center text-[#31542a] outline-none focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#31542a]"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
          data-node-id="428:110"
        >
          <MenuIcon />
        </button>
      </header>
      <MobileNavDrawer open={open} onClose={() => setOpen(false)} panelId={panelId} />
    </div>
  )
}
