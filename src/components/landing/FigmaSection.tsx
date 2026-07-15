import Link from 'next/link'
import type { ReactNode } from 'react'
import { FigmaFrame } from './FigmaFrame'

export type Hotspot = {
  href: string
  left: number
  top: number
  width: number
  height: number
  label: string
  external?: boolean
}

type HotspotInput = Hotspot | Readonly<Hotspot>

type Props = {
  src: string
  width: number
  height: number
  nodeId: string
  label: string
  id?: string
  hotspots?: HotspotInput[]
  clipTop?: number
  /** Absolute overlays in Figma artboard coords (e.g. search input). */
  children?: ReactNode
}

/** One Figma frame — official export, scaled 1:1 via FigmaFrame */
export function FigmaSection({
  src,
  width,
  height,
  nodeId,
  label,
  id,
  hotspots = [],
  clipTop = 0,
  children,
}: Props) {
  return (
    <FigmaFrame
      id={id}
      width={width}
      height={height}
      data-node-id={nodeId}
      aria-label={label}
      /* Clipped header band sits under the sticky nav — match page white, not cream */
      className={clipTop > 0 ? 'bg-white' : 'bg-[#f9f6f1]'}
    >
      <div className="relative" style={{ width, height }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={label}
          width={width}
          height={height}
          className="pointer-events-none absolute inset-0 block max-w-none"
          style={{
            width,
            height,
            ...(clipTop > 0 ? { clipPath: `inset(${clipTop}px 0 0 0)` } : null),
          }}
          draggable={false}
        />
        {children}
        {hotspots.map((h) => (
          <Link
            key={`${h.label}-${h.left}-${h.top}`}
            href={h.href}
            aria-label={h.label}
            className="absolute z-10 cursor-pointer"
            style={{
              left: h.left,
              top: h.top,
              width: h.width,
              height: h.height,
            }}
            {...(h.external
              ? { target: '_blank', rel: 'noreferrer' }
              : null)}
          />
        ))}
      </div>
    </FigmaFrame>
  )
}
