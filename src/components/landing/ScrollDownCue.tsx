/**
 * Animated Scroll Down cue — Figma `466:901` (left 60, bottom 100).
 */
export function ScrollDownCue() {
  return (
    <div
      className="bb-scroll-cue pointer-events-none absolute z-20 flex items-center gap-1"
      style={{ left: 60, bottom: 100 }}
      aria-hidden
      data-node-id="466:901"
    >
      <span className="select-none font-[family-name:var(--font-ui)] text-[16px] leading-[1.4] text-[#f8ff98]">
        Scroll Down
      </span>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/landing/interactive/scroll/mouse.svg"
        alt=""
        width={16}
        height={16}
        className="bb-scroll-cue-arrow size-4 shrink-0"
        draggable={false}
      />
    </div>
  )
}
