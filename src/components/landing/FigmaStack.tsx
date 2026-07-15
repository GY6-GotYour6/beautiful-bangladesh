import type { ComponentProps } from 'react'
import { FigmaSection } from './FigmaSection'

export type Hotspot = {
  href: string
  label: string
  left: number
  top: number
  width: number
  height: number
  external?: boolean
}

export type FigmaSectionDef = Omit<ComponentProps<typeof FigmaSection>, 'hotspots'> & {
  hotspots?: Hotspot[]
}

/** Compact hotspot tuple → object. */
export function hs(
  href: string,
  label: string,
  left: number,
  top: number,
  width: number,
  height: number,
  external = false,
): Hotspot {
  return { href, label, left, top, width, height, ...(external ? { external: true } : {}) }
}

export function shiftHotspots(list: readonly Hotspot[], dy: number): Hotspot[] {
  return list.map((h) => ({ ...h, top: h.top + dy }))
}

/**
 * Footer links + socials — artboard coords for dedicated footer frames
 * (`explore/03-footer`, `destination/10-footer`). Landing CTA+footer uses +800.
 */
export const footerHotspots: Hotspot[] = [
  hs('/', 'Home', 420, 232, 56, 28),
  hs('/#about', 'About', 530, 232, 58, 28),
  hs('/explore', 'Explore', 642, 232, 64, 28),
  hs('/explore', 'Destination', 761, 232, 88, 28),
  hs('/cms', 'Documentation', 904, 232, 115, 28),
  hs('/cms', 'Developers', 509, 278, 88, 28),
  hs('/privacy', 'Privacy Policy', 652, 278, 102, 28),
  hs('/terms', 'Terms of Service', 810, 278, 120, 28),
  hs('https://www.facebook.com/', 'Facebook', 668, 355, 40, 40, true),
  hs('https://www.instagram.com/', 'Instagram', 700, 355, 40, 40, true),
  hs('https://www.youtube.com/', 'YouTube', 732, 355, 40, 40, true),
]

/** Stack of Figma artboard sections (shared page chrome). */
export function FigmaStack({
  nodeId,
  sections,
  destination,
  bare = false,
}: {
  nodeId: string
  sections: FigmaSectionDef[]
  destination?: string
  /** Skip outer wrapper when composing with sibling interactive sections. */
  bare?: boolean
}) {
  const body = sections.map((section) => <FigmaSection key={section.nodeId} {...section} />)
  if (bare) return <>{body}</>
  return (
    <div
      className="relative w-full overflow-x-clip bg-[#f9f6f1]"
      data-node-id={nodeId}
      {...(destination ? { 'data-destination': destination } : null)}
    >
      {body}
    </div>
  )
}
