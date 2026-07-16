/** Canonical public nav — Designs Header `428:414` / mobile `428:154`. */

export const NAV_BRAND = '#31542A'
export const NAV_ACCENT = '#F8FF98'
export const NAV_INACTIVE = '#FFFFFF'
export const NAV_CREAM = '#F9F6F1'

/** Desktop header band: instance y=20 + height 48 */
export const DESKTOP_HEADER_TOP = 20
export const DESKTOP_HEADER_HEIGHT = 48
export const DESKTOP_HEADER_CLIP = DESKTOP_HEADER_TOP + DESKTOP_HEADER_HEIGHT
/** Gap between header and hero image — Hero frame `466:883` gap */
export const DESKTOP_HEADER_GAP = 24
/** Top padding before hero image when header is fixed above content */
export const DESKTOP_HERO_OFFSET = DESKTOP_HEADER_CLIP + DESKTOP_HEADER_GAP
/** Hero image block height at 1440 artboard — `466:885` */
export const DESKTOP_HERO_HEIGHT = 988
/** Gap between header and explore content — Explore `466:733` y=116 − header bottom 68 */
export const DESKTOP_EXPLORE_GAP = 48
/** Top padding before explore content when header is fixed above it */
export const DESKTOP_EXPLORE_OFFSET = DESKTOP_HEADER_CLIP + DESKTOP_EXPLORE_GAP
/** Horizontal inset shared by header + hero — 40px @ 1440 */
export const DESKTOP_PAGE_INSET = 40
/** Mobile header band: instance y=24 + height 44 */
export const MOBILE_HEADER_CLIP = 68

export const DESKTOP_ARTBOARD = 1440
export const MOBILE_ARTBOARD = 390

export type NavLabel = 'Home' | 'About' | 'Explore' | 'Destination'

export type NavLink = {
  href: string
  label: NavLabel
}

export const navLinks: readonly NavLink[] = [
  { href: '/', label: 'Home' },
  { href: '/#about', label: 'About' },
  { href: '/explore', label: 'Explore' },
  { href: '/explore', label: 'Destination' },
] as const

/** Route → which pill label is active (ignores inconsistent Figma instance overrides). */
export function getActiveNavLabel(pathname: string): NavLabel | null {
  if (pathname.startsWith('/destinations')) return 'Destination'
  if (pathname.startsWith('/explore')) return 'Explore'
  if (pathname === '/') return 'Home'
  return null
}
