'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

/**
 * Forces the route it is rendered in to start at the top.
 *
 * Why this is needed rather than relying on Next's own scroll pass:
 * `ResponsiveFigmaPage` starts at `isMobile: false`, so a phone renders the
 * *desktop* tree first and swaps to the mobile tree in an effect. That swap
 * lands after Next has finished its scroll handling, and the mobile document
 * is far shorter than the desktop one — so a scroll offset carried over from
 * the previous route gets clamped to the new, smaller max scroll, dropping you
 * at the bottom of the page.
 *
 * Re-applied across two animation frames so it survives both the variant swap
 * and any content that streams in after the first paint.
 *
 * A URL hash wins over this — `/destinations/x#foo` still lands on `#foo`.
 * Note this also overrides the browser's restored position on back/forward
 * navigation into this route; starting at the top is the intended behaviour.
 */
export function ScrollToTop() {
  const pathname = usePathname()

  useEffect(() => {
    if (window.location.hash) return

    const toTop = () => window.scrollTo(0, 0)
    toTop()

    let inner = 0
    const outer = requestAnimationFrame(() => {
      inner = requestAnimationFrame(toTop)
    })

    return () => {
      cancelAnimationFrame(outer)
      cancelAnimationFrame(inner)
    }
  }, [pathname])

  return null
}
