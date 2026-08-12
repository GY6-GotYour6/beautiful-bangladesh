'use client'

import { HeroNav, HERO_NAV_TOP, HERO_NAV_WIDTH } from './HeroNav'

const vw = (px: number) => `calc(${px} / 1440 * 100vw)`

/**
 * Sitewide desktop header. Renders the SAME white pill as the landing hero
 * (`HeroNav`) — the navbar must be identical on every route.
 * Absolute (not fixed) so it scrolls away with the hero, like the landing page.
 */
export function DesktopSiteHeader() {
  return (
    <div
      className="pointer-events-none absolute inset-x-0 z-50 hidden md:block"
      style={{ top: vw(HERO_NAV_TOP) }}
    >
      <div className="pointer-events-auto mx-auto" style={{ width: vw(HERO_NAV_WIDTH) }}>
        <HeroNav elevated />
      </div>
    </div>
  )
}
