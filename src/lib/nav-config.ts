/** Canonical public nav — Designs Header `428:414` / mobile `428:154`. */

export const NAV_BRAND = '#31542A'
export const NAV_ACCENT = '#F8FF98'
export const NAV_INACTIVE = '#FFFFFF'
export const NAV_CREAM = '#F9F6F1'

/** Desktop header band: instance y=20 + height 48 */
export const DESKTOP_HEADER_CLIP = 68
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
