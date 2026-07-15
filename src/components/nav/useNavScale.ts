'use client'

import { useEffect, useState } from 'react'
import { DESKTOP_ARTBOARD, MOBILE_ARTBOARD } from '@/lib/nav-config'

/** Mirrors FigmaFrame: scale = viewport / artboard (full-bleed). */
export function useArtboardScale(artboardWidth: number) {
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const update = () => {
      setScale(window.innerWidth / artboardWidth)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [artboardWidth])

  return scale
}

export function useIsMobileNav(breakpoint = 767) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint}px)`)
    const apply = () => setIsMobile(mq.matches)
    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [breakpoint])

  return isMobile
}

export function useDesktopNavScale() {
  return useArtboardScale(DESKTOP_ARTBOARD)
}

export function useMobileNavScale() {
  return useArtboardScale(MOBILE_ARTBOARD)
}
