'use client'

import Link from 'next/link'
import { useId, useState } from 'react'
import { MOBILE_ARTBOARD, MOBILE_HEADER_CLIP } from '@/lib/nav-config'
import { MobileNavDrawer } from './MobileNavDrawer'
import { useMobileNavScale } from './useNavScale'

function MenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z" />
    </svg>
  )
}

/** Sticky mobile header — Designs `428:154`. */
export function MobileSiteHeader() {
  const scale = useMobileNavScale()
  const [open, setOpen] = useState(false)
  const panelId = useId()

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-50 md:hidden"
      style={{ ['--nav-mobile-scale' as string]: String(scale) }}
    >
      <div
        className="pointer-events-none w-full"
        style={{
          height: MOBILE_HEADER_CLIP * scale,
        }}
      >
        <div
          className="pointer-events-auto"
          style={{
            width: MOBILE_ARTBOARD,
            height: MOBILE_HEADER_CLIP,
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
          }}
        >
          <header
            className="relative flex h-[44px] w-[358px] items-center justify-between rounded-[1200px] bg-[#31542a] px-4"
            style={{ marginLeft: 16, marginTop: 24 }}
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
        </div>
      </div>
      <MobileNavDrawer open={open} onClose={() => setOpen(false)} panelId={panelId} />
    </div>
  )
}
