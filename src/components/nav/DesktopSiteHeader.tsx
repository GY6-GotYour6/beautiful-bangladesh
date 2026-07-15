'use client'

import Link from 'next/link'
import { DESKTOP_ARTBOARD, DESKTOP_HEADER_CLIP } from '@/lib/nav-config'
import { NavPill } from './NavPill'
import { useDesktopNavScale } from './useNavScale'

/** Sticky desktop header — Designs `428:414`, scale-synced like FigmaFrame. */
export function DesktopSiteHeader() {
  const scale = useDesktopNavScale()

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-50 hidden md:block"
      aria-hidden={false}
    >
      <div
        className="pointer-events-none w-full overflow-visible"
        style={{
          height: DESKTOP_HEADER_CLIP * scale,
        }}
      >
        <div
          className="pointer-events-auto"
          style={{
            width: DESKTOP_ARTBOARD,
            height: DESKTOP_HEADER_CLIP,
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
          }}
        >
          <header
            className="relative flex h-[48px] w-[1360px] content-stretch items-center justify-between"
            style={{ marginLeft: 40, marginTop: 20 }}
            data-node-id="428:414"
          >
            <Link
              href="/"
              className="relative shrink-0 whitespace-nowrap font-[family-name:var(--font-display)] text-[32px] leading-[1.1] font-bold tracking-[-0.64px] text-[#31542a] uppercase outline-none not-italic focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#31542a]"
              data-node-id="428:406"
            >
              beautiful Bangladesh{' '}
            </Link>
            <NavPill />
          </header>
        </div>
      </div>
    </div>
  )
}
