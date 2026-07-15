'use client'

import { usePathname } from 'next/navigation'
import { DesktopSiteHeader } from './DesktopSiteHeader'
import { MobileSiteHeader } from './MobileSiteHeader'

/** Public sticky nav chrome — skipped on `/cms`. */
export function SiteHeader() {
  const pathname = usePathname()
  if (pathname.startsWith('/cms')) return null

  return (
    <>
      <DesktopSiteHeader />
      <MobileSiteHeader />
    </>
  )
}
