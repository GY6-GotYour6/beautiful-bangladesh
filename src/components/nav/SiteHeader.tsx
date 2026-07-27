'use client'

import { usePathname } from 'next/navigation'
import { DesktopSiteHeader } from './DesktopSiteHeader'
import { MobileSiteHeader } from './MobileSiteHeader'

/** Public sticky nav chrome — skipped on `/cms`. */
export function SiteHeader() {
  const pathname = usePathname()
  if (pathname.startsWith('/cms')) return null

  // Landing + explore embed their own white nav pill inside the hero — skip desktop header
  if (pathname === '/' || pathname === '/explore') {
    return <MobileSiteHeader />
  }

  return (
    <>
      <DesktopSiteHeader />
      <MobileSiteHeader />
    </>
  )
}
