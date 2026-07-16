'use client'

import Link from 'next/link'
import { useId, useState } from 'react'
import { MobileNavDrawer } from './MobileNavDrawer'

function MenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z" />
    </svg>
  )
}

/**
 * Mobile header — Designs `428:154`: pill inset 16px, top 24px, height 44px.
 * Plain responsive CSS (no scale transform) so it can never overflow the
 * viewport; page content starts at 76px (8px gap under the pill).
 */
export function MobileSiteHeader() {
  const [open, setOpen] = useState(false)
  const panelId = useId()

  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-50 md:hidden">
      <header
        className="pointer-events-auto mx-[16px] mt-[10px] flex h-[44px] items-center justify-between rounded-[1200px] bg-[#31542a] px-4"
        data-node-id="428:154"
      >
        <Link
          href="/"
          className="relative shrink-0 whitespace-nowrap font-[family-name:var(--font-display)] text-[14px] leading-[1.1] font-bold tracking-[-0.28px] text-white uppercase outline-none focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f8ff98]"
          data-node-id="428:109"
        >
          beautiful Bangladesh
        </Link>
        <button
          type="button"
          className="inline-flex h-7 w-7 items-center justify-center text-white outline-none focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f8ff98]"
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
