'use client'

import { useEffect, useState, type ReactNode } from 'react'

/** Switches desktop/mobile Figma clones at 768px. */
export function ResponsiveFigmaPage({
  desktop,
  mobile,
}: {
  desktop: ReactNode
  mobile: ReactNode
}) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    const apply = () => setIsMobile(mq.matches)
    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [])

  return <>{isMobile ? mobile : desktop}</>
}
