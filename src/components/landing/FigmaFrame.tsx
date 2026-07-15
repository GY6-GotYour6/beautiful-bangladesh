'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import type { CSSProperties } from 'react'

type Props = {
  width: number
  height: number
  className?: string
  style?: CSSProperties
  children: ReactNode
  'data-node-id'?: string
  'aria-label'?: string
  id?: string
}

/** Scales a fixed Figma artboard to container width (pixel-faithful). */
export function FigmaFrame({
  width,
  height,
  className,
  style,
  children,
  id,
  ...rest
}: Props) {
  const ref = useRef<HTMLElement>(null)
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => {
      setScale(entry.contentRect.width / width)
    })
    ro.observe(el)
    setScale(el.clientWidth / width)
    return () => ro.disconnect()
  }, [width])

  return (
    <section
      ref={ref}
      id={id}
      className={className}
      style={{
        position: 'relative',
        width: '100%',
        marginInline: 'auto',
        height: height * scale,
        overflow: 'hidden',
        ...style,
      }}
      {...rest}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width,
          height,
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
        }}
      >
        {children}
      </div>
    </section>
  )
}
