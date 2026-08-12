/**
 * Animated "Scroll Down" cue — text + mouse-scroll glyph, bobbing on a 2s loop
 * (`bb-scroll-cue` in `styles.css`). Anchored bottom-right of the landing hero.
 */
export function ScrollDownCue({
  position,
  className = '',
}: {
  position?: React.CSSProperties
  className?: string
}) {
  return (
    <div
      className={`bb-scroll-cue pointer-events-none absolute z-20 flex items-center gap-[6px] ${className}`}
      style={position}
      aria-hidden
      data-node-id="466:901"
    >
      <span className="select-none text-[16px] leading-[1.4] text-[#f8ff98]">Scroll Down</span>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/landing/interactive/scroll/mouse.svg"
        alt=""
        width={16}
        height={16}
        className="size-4 shrink-0"
        draggable={false}
      />
    </div>
  )
}
