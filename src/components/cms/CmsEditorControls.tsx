'use client'

import { useRef, useState } from 'react'

/* ---------------------------------- icons ---------------------------------- */

export function GripIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor" aria-hidden>
      <circle cx="5.5" cy="3.5" r="1.3" />
      <circle cx="10.5" cy="3.5" r="1.3" />
      <circle cx="5.5" cy="8" r="1.3" />
      <circle cx="10.5" cy="8" r="1.3" />
      <circle cx="5.5" cy="12.5" r="1.3" />
      <circle cx="10.5" cy="12.5" r="1.3" />
    </svg>
  )
}

export function TrashIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3 6h18M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
      <path d="M10 11v6M14 11v6" />
    </svg>
  )
}

export function PlusIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden>
      <path d="M12 5v14M5 12h14" />
    </svg>
  )
}

export function StarIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" aria-hidden>
      <path d="M12 3l2.7 5.7 6.3.8-4.6 4.3 1.2 6.2L12 17l-5.6 3 1.2-6.2L3 9.5l6.3-.8L12 3z" />
    </svg>
  )
}

export function XIcon({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  )
}

function ChevronIcon({ up = false, size = 20 }: { up?: boolean; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={up ? 'rotate-180' : undefined}
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  )
}

function PlayGlyph() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M8 5.5v13l11-6.5-11-6.5z" />
    </svg>
  )
}

/* ------------------------------- primitives -------------------------------- */

/** Green circle-plus add button — design 618:4362. */
export function AddItemButton({ label, onClick, disabled }: { label: string; onClick?: () => void; disabled?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="group flex items-center gap-2 py-2 disabled:opacity-50"
    >
      <span className="flex size-6 items-center justify-center rounded-full bg-[rgba(49,84,42,0.1)] text-[#31542a] transition-colors group-hover:bg-[rgba(49,84,42,0.2)]">
        <PlusIcon />
      </span>
      <span className="text-[14px] font-semibold text-[#31542a]">{label}</span>
    </button>
  )
}

/** Gray label over plain value — design "Field" pattern (site-fixed copy). */
export function ReadOnlyField({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-[14px] font-medium text-[#666]">{label}</p>
      {value ? <p className="text-[14px] text-[#12210f]">{value}</p> : null}
    </div>
  )
}

/** Extract a YouTube video id from watch/embed/shorts/youtu.be URLs. */
export function youtubeId(url?: string): string | null {
  if (!url) return null
  const m = url.match(
    /(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{6,})/,
  )
  return m ? m[1] : null
}

const rowInput =
  'w-full rounded-md border border-[#f3f4f6] bg-[#fafafa] px-2 py-2 text-[13px] text-[#132110] outline-none transition-colors focus:border-[#31542a] focus:bg-white focus:ring-2 focus:ring-[rgba(49,84,42,0.12)]'

/* ------------------------------ drag plumbing ------------------------------ */

function useRowDrag(onMove?: (from: number, to: number) => void) {
  const [dragIndex, setDragIndex] = useState<number | null>(null)
  const [overIndex, setOverIndex] = useState<number | null>(null)
  const enabled = Boolean(onMove)

  function endDrag() {
    setDragIndex(null)
    setOverIndex(null)
  }

  function rowProps(i: number) {
    if (!enabled) return {}
    return {
      onDragOver: (e: React.DragEvent) => {
        e.preventDefault()
        if (overIndex !== i) setOverIndex(i)
      },
      onDrop: () => {
        if (dragIndex != null && dragIndex !== i) onMove?.(dragIndex, i)
        endDrag()
      },
    }
  }

  function handleProps(i: number) {
    if (!enabled) return {}
    return {
      draggable: true,
      onDragStart: (e: React.DragEvent) => {
        e.dataTransfer.effectAllowed = 'move'
        setDragIndex(i)
      },
      onDragEnd: endDrag,
    }
  }

  function rowState(i: number) {
    if (dragIndex === i) return 'dragging' as const
    if (overIndex === i && dragIndex != null) return 'over' as const
    return 'idle' as const
  }

  return { enabled, rowProps, handleProps, rowState }
}

function DragHandle({
  drag,
  index,
}: {
  drag: ReturnType<typeof useRowDrag>
  index: number
}) {
  return (
    <span
      {...drag.handleProps(index)}
      className={`shrink-0 select-none text-[#9ca3af] ${
        drag.enabled ? 'cursor-grab transition-colors hover:text-[#31542a] active:cursor-grabbing' : ''
      }`}
      title={drag.enabled ? 'Drag to reorder' : undefined}
      aria-hidden
    >
      <GripIcon />
    </span>
  )
}

function rowClass(state: 'dragging' | 'over' | 'idle') {
  return `flex items-center gap-4 border border-[#f3f4f6] bg-white p-3 transition-[opacity,box-shadow] ${
    state === 'dragging' ? 'opacity-40' : state === 'over' ? 'shadow-[inset_0_0_0_1px_#31542a]' : ''
  }`
}

function RemoveRowButton({ onClick }: { onClick?: () => void }) {
  return (
    <button
      type="button"
      aria-label="Remove"
      className="shrink-0 rounded p-1 text-[#9ca3af] transition-colors hover:bg-[#fef2f2] hover:text-[#ef4444]"
      onClick={onClick}
    >
      <TrashIcon />
    </button>
  )
}

/* ------------------------------ embed row list ----------------------------- */

export type EmbedRow = { title: string; embedUrl: string }

/** Rows with a video thumb, title input and inline embed URL — design 618:4304. */
export function EmbedRowList({
  items,
  addLabel,
  onChange,
  onAdd,
  onRemove,
  onMove,
}: {
  items: EmbedRow[]
  addLabel: string
  onChange: (index: number, next: EmbedRow) => void
  onAdd: () => void
  onRemove: (index: number) => void
  onMove?: (from: number, to: number) => void
}) {
  const drag = useRowDrag(onMove)
  return (
    <>
      {items.length ? (
        <div className="flex w-full flex-col overflow-clip rounded-lg border border-[#f3f4f6]">
          {items.map((item, i) => {
            const vid = youtubeId(item.embedUrl)
            return (
              <div key={`row-${i}`} {...drag.rowProps(i)} className={rowClass(drag.rowState(i))}>
                <DragHandle drag={drag} index={i} />
                <span className="flex size-12 shrink-0 items-center justify-center overflow-clip rounded-md border border-[#d9d9d9] bg-[#f5f5f5] text-[#8c8c8c]">
                  {vid ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={`https://i.ytimg.com/vi/${vid}/default.jpg`} alt="" className="size-full object-cover" />
                  ) : (
                    <PlayGlyph />
                  )}
                </span>
                <div className="flex min-w-0 flex-1 flex-col gap-1">
                  <input
                    className={`${rowInput} h-9`}
                    value={item.title}
                    placeholder="Title"
                    onChange={(e) => onChange(i, { ...item, title: e.target.value })}
                  />
                  <div className="flex items-center gap-1 text-[11px]">
                    <span className="shrink-0 text-[#808080]">Embed URL:</span>
                    <input
                      className="min-w-0 flex-1 bg-transparent text-[11px] text-[#6b7280] outline-none placeholder:text-[#b3b3b3]"
                      value={item.embedUrl}
                      placeholder="https://youtube.com/embed/..."
                      onChange={(e) => onChange(i, { ...item, embedUrl: e.target.value })}
                    />
                  </div>
                </div>
                <RemoveRowButton onClick={() => onRemove(i)} />
              </div>
            )
          })}
        </div>
      ) : null}
      <AddItemButton label={addLabel} onClick={onAdd} />
    </>
  )
}

/* ---------------------------- highlight row list ---------------------------- */

export type TitleDescRow = { title: string; description: string }

/** Rows with a star badge, title and description inputs — design 618:4575. */
export function HighlightRowList({
  items,
  addLabel,
  onChange,
  onAdd,
  onRemove,
  onMove,
  maxItems,
}: {
  items: TitleDescRow[]
  addLabel: string
  onChange: (index: number, next: TitleDescRow) => void
  onAdd: () => void
  onRemove: (index: number) => void
  onMove?: (from: number, to: number) => void
  maxItems?: number
}) {
  const drag = useRowDrag(onMove)
  return (
    <>
      {items.length ? (
        <div className="flex w-full flex-col overflow-clip rounded-lg border border-[#f3f4f6]">
          {items.map((item, i) => (
            <div key={`row-${i}`} {...drag.rowProps(i)} className={rowClass(drag.rowState(i))}>
              <DragHandle drag={drag} index={i} />
              <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#f3f4f6] text-[#4b5563]">
                <StarIcon />
              </span>
              <div className="flex min-w-0 flex-1 flex-col gap-1">
                <input
                  className={`${rowInput} h-9`}
                  value={item.title}
                  placeholder="Title"
                  onChange={(e) => onChange(i, { ...item, title: e.target.value })}
                />
                <textarea
                  className={`${rowInput} h-11 resize-none leading-[1.4]`}
                  value={item.description}
                  placeholder="Short description"
                  onChange={(e) => onChange(i, { ...item, description: e.target.value })}
                />
              </div>
              <RemoveRowButton onClick={() => onRemove(i)} />
            </div>
          ))}
        </div>
      ) : null}
      <AddItemButton
        label={addLabel}
        onClick={onAdd}
        disabled={maxItems != null && items.length >= maxItems}
      />
    </>
  )
}

/* ----------------------------- social row list ------------------------------ */

export type SocialRow = { creator: string; platform: string; embedUrl?: string }

const platforms = ['YouTube', 'Instagram', 'Facebook', 'TikTok']
const SOCIAL_PREVIEW_COUNT = 6

/** Creator rows with thumb, platform badge and collapse — design 618:4493. */
export function SocialRowList({
  items,
  onChange,
  onAdd,
  onRemove,
  onMove,
  maxItems,
}: {
  items: SocialRow[]
  onChange: (index: number, next: SocialRow) => void
  onAdd: () => void
  onRemove: (index: number) => void
  onMove?: (from: number, to: number) => void
  maxItems?: number
}) {
  const drag = useRowDrag(onMove)
  const [showAll, setShowAll] = useState(false)
  const collapsed = !showAll && items.length > SOCIAL_PREVIEW_COUNT
  const visible = collapsed ? items.slice(0, SOCIAL_PREVIEW_COUNT) : items

  return (
    <>
      {items.length ? (
        <div className="flex w-full flex-col overflow-clip rounded-lg border border-[#f3f4f6]">
          {visible.map((item, i) => {
            const vid = youtubeId(item.embedUrl)
            return (
              <div key={`row-${i}`} {...drag.rowProps(i)} className={rowClass(drag.rowState(i))}>
                <DragHandle drag={drag} index={i} />
                <span className="flex size-12 shrink-0 items-center justify-center overflow-clip rounded border border-[#f3f4f6] bg-[#f5f5f5] text-[#8c8c8c]">
                  {vid ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={`https://i.ytimg.com/vi/${vid}/default.jpg`} alt="" className="size-full object-cover" />
                  ) : (
                    <PlayGlyph />
                  )}
                </span>
                <div className="flex min-w-0 flex-1 flex-col gap-1">
                  <input
                    className={`${rowInput} h-9`}
                    value={item.creator}
                    placeholder="Creator"
                    onChange={(e) => onChange(i, { ...item, creator: e.target.value })}
                  />
                  <div className="flex items-center gap-1 text-[11px]">
                    <span className="shrink-0 text-[#808080]">Embed URL:</span>
                    <input
                      className="min-w-0 flex-1 bg-transparent text-[11px] text-[#6b7280] outline-none placeholder:text-[#b3b3b3]"
                      value={item.embedUrl || ''}
                      placeholder="https://youtube.com/embed/..."
                      onChange={(e) => onChange(i, { ...item, embedUrl: e.target.value })}
                    />
                  </div>
                </div>
                <select
                  aria-label="Platform"
                  className="shrink-0 cursor-pointer appearance-none rounded bg-[#f3f4f6] px-2 py-1 text-center text-[11px] font-semibold uppercase text-[#132110] outline-none transition-colors hover:bg-[#e5e7eb] focus:ring-2 focus:ring-[rgba(49,84,42,0.3)]"
                  value={item.platform}
                  onChange={(e) => onChange(i, { ...item, platform: e.target.value })}
                >
                  {platforms.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
                <RemoveRowButton onClick={() => onRemove(i)} />
              </div>
            )
          })}
        </div>
      ) : null}
      {items.length > SOCIAL_PREVIEW_COUNT ? (
        <button
          type="button"
          className="w-full py-1 text-center text-[14px] font-semibold text-[#31542a] underline"
          onClick={() => setShowAll((v) => !v)}
        >
          {collapsed ? `Show all ${items.length} items` : 'Show less'}
        </button>
      ) : null}
      <AddItemButton
        label="Add Social Content"
        onClick={() => {
          setShowAll(true)
          onAdd()
        }}
        disabled={maxItems != null && items.length >= maxItems}
      />
    </>
  )
}

/* ------------------------------ FAQ accordion ------------------------------- */

export type FaqRow = { question: string; answer: string }

/** Accordion FAQ list; the open row is editable — design 618:4726. */
export function FaqAccordion({
  items,
  onChange,
  onAdd,
  onRemove,
  onMove,
  maxItems,
}: {
  items: FaqRow[]
  onChange: (index: number, next: FaqRow) => void
  onAdd: () => void
  onRemove: (index: number) => void
  onMove?: (from: number, to: number) => void
  maxItems?: number
}) {
  const drag = useRowDrag(onMove)
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <>
      <div className="flex w-full flex-col gap-3">
        {items.map((item, i) => {
          const open = openIndex === i
          const state = drag.rowState(i)
          return (
            <div
              key={`faq-${i}`}
              {...drag.rowProps(i)}
              className={`w-full rounded-lg border transition-[opacity,border-color] ${
                open ? 'border-[#31542a] bg-[#f5f5f5]' : 'border-[#f3f4f6] bg-white'
              } ${state === 'dragging' ? 'opacity-40' : state === 'over' ? 'shadow-[0_0_0_1px_#31542a]' : ''}`}
            >
              <div className="flex w-full items-center justify-between gap-3 p-5">
                <div className="flex min-w-0 flex-1 items-center gap-3">
                  <DragHandle drag={drag} index={i} />
                  {open ? (
                    <input
                      className="min-w-0 flex-1 bg-transparent text-[15px] font-semibold text-[#132110] outline-none placeholder:text-[#9ca3af]"
                      value={item.question}
                      placeholder="Question"
                      onChange={(e) => onChange(i, { ...item, question: e.target.value })}
                    />
                  ) : (
                    <button
                      type="button"
                      className="min-w-0 flex-1 truncate text-left text-[15px] font-semibold text-[#132110]"
                      onClick={() => setOpenIndex(i)}
                    >
                      {item.question || 'New question'}
                    </button>
                  )}
                </div>
                <div className="flex shrink-0 items-center gap-1">
                  {open ? <RemoveRowButton onClick={() => onRemove(i)} /> : null}
                  <button
                    type="button"
                    aria-label={open ? 'Collapse' : 'Expand'}
                    aria-expanded={open}
                    className="rounded p-0.5 text-[#4b5563] transition-colors hover:text-[#31542a]"
                    onClick={() => setOpenIndex(open ? null : i)}
                  >
                    <ChevronIcon up={open} />
                  </button>
                </div>
              </div>
              {open ? (
                <div className="px-5 pb-5">
                  <textarea
                    className="min-h-[80px] w-full rounded-md border border-[#e5e7eb] bg-white p-3 text-[14px] leading-[1.5] text-[#132110] outline-none transition-colors focus:border-[#31542a] focus:ring-2 focus:ring-[rgba(49,84,42,0.12)]"
                    value={item.answer}
                    placeholder="Answer"
                    onChange={(e) => onChange(i, { ...item, answer: e.target.value })}
                  />
                </div>
              ) : null}
            </div>
          )
        })}
      </div>
      <AddItemButton
        label="Add FAQ"
        onClick={() => {
          onAdd()
          setOpenIndex(items.length)
        }}
        disabled={maxItems != null && items.length >= maxItems}
      />
    </>
  )
}

/* ------------------------------ image dropzone ------------------------------ */

/** Dashed dropzone with preview + Replace/Remove — design 618:4585. */
export function ImageDropzone({
  value,
  uploading,
  onFile,
  onRemove,
  emptyHint = 'Drop an image here or click to upload',
}: {
  value?: string
  uploading?: boolean
  onFile: (file: File | null) => void
  onRemove: () => void
  emptyHint?: string
}) {
  const fileRef = useRef<HTMLInputElement>(null)
  return (
    <div
      className="flex h-[240px] w-full flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed border-[#e5e7eb] bg-[#f9fafb] p-6"
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault()
        onFile(e.dataTransfer.files?.[0] || null)
      }}
    >
      {value ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={value} alt="" className="h-[100px] w-[160px] rounded-lg object-cover" />
      ) : (
        <p className="text-[13px] text-[#9ca3af]">{emptyHint}</p>
      )}
      <div className="flex gap-3">
        <button
          type="button"
          disabled={uploading}
          className="rounded-md border border-[#e5e7eb] bg-white px-3 py-2 text-[13px] font-semibold text-[#132110] transition-colors hover:bg-[#f9fafb] disabled:opacity-50"
          onClick={() => fileRef.current?.click()}
        >
          {uploading ? 'Uploading…' : value ? 'Replace Image' : 'Upload Image'}
        </button>
        {value ? (
          <button
            type="button"
            className="rounded-md bg-[#fef2f2] px-3 py-2 text-[13px] font-semibold text-[#ef4444] transition-colors hover:bg-[#fee2e2]"
            onClick={onRemove}
          >
            Remove
          </button>
        ) : null}
      </div>
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          onFile(e.target.files?.[0] || null)
          e.target.value = ''
        }}
      />
    </div>
  )
}

/* ------------------------------- gallery grid ------------------------------- */

/** Thumbnail tiles with × overlay + dashed add tile — design 618:4283. */
export function GalleryGrid({
  images,
  uploading,
  maxImages = 4,
  onAddFile,
  onRemove,
}: {
  images: string[]
  uploading?: boolean
  maxImages?: number
  onAddFile: (file: File | null) => void
  onRemove: (index: number) => void
}) {
  const fileRef = useRef<HTMLInputElement>(null)
  const canAdd = images.length < maxImages
  return (
    <div
      className="grid grid-cols-2 gap-3 md:grid-cols-4"
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault()
        if (canAdd) onAddFile(e.dataTransfer.files?.[0] || null)
      }}
    >
      {images.map((src, i) => (
        <div key={`${src}-${i}`} className="relative aspect-[3/2] overflow-hidden rounded-lg">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt="" className="size-full object-cover" />
          <button
            type="button"
            aria-label="Remove photo"
            className="absolute top-1 right-1 flex size-5 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70"
            onClick={() => onRemove(i)}
          >
            <XIcon />
          </button>
        </div>
      ))}
      {canAdd ? (
        <button
          type="button"
          aria-label="Add photo"
          disabled={uploading}
          className="flex aspect-[3/2] items-center justify-center rounded-lg border-2 border-dashed border-[#e5e7eb] text-[#9ca3af] transition-colors hover:border-[#31542a] hover:text-[#31542a] disabled:opacity-50"
          onClick={() => fileRef.current?.click()}
        >
          {uploading ? (
            <span className="text-[12px] font-semibold">Uploading…</span>
          ) : (
            <PlusIcon size={24} />
          )}
        </button>
      ) : null}
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          onAddFile(e.target.files?.[0] || null)
          e.target.value = ''
        }}
      />
    </div>
  )
}

/* ------------------------------ related picker ------------------------------ */

/** Selected chips with × plus an "Add destination…" menu — design 618:4706. */
export function RelatedPicker({
  options,
  selectedIds,
  onChange,
  maxItems = 4,
}: {
  options: { id: number | string; name: string }[]
  selectedIds: (number | string)[]
  onChange: (ids: (number | string)[]) => void
  maxItems?: number
}) {
  const [menuOpen, setMenuOpen] = useState(false)
  const selected = selectedIds
    .map((id) => options.find((o) => o.id === id))
    .filter((o): o is { id: number | string; name: string } => Boolean(o))
  const remaining = options.filter((o) => !selectedIds.includes(o.id))
  const canAdd = selected.length < maxItems && remaining.length > 0

  if (options.length === 0) {
    return <p className="text-[13px] text-[#9ca3af]">No other destinations to link yet.</p>
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      {selected.map((d) => (
        <span
          key={d.id}
          className="flex items-center gap-2 rounded-md bg-[#f3f4f6] py-2 pl-3 pr-2 text-[13px] font-medium text-[#132110]"
        >
          {d.name}
          <button
            type="button"
            aria-label={`Remove ${d.name}`}
            className="flex size-[14px] items-center justify-center text-[#6b7280] transition-colors hover:text-[#ef4444]"
            onClick={() => onChange(selectedIds.filter((id) => id !== d.id))}
          >
            <XIcon size={11} />
          </button>
        </span>
      ))}
      {canAdd ? (
        <span className="relative">
          <button
            type="button"
            className="rounded-md border border-dashed border-[#d1d5db] px-3 py-2 text-[13px] text-[#9ca3af] transition-colors hover:border-[#31542a] hover:text-[#31542a]"
            onClick={() => setMenuOpen((v) => !v)}
          >
            Add destination...
          </button>
          {menuOpen ? (
            <span className="absolute left-0 top-full z-10 mt-1 flex max-h-56 min-w-48 flex-col overflow-y-auto rounded-lg border border-[#e5e7eb] bg-white py-1 shadow-[0_8px_24px_rgba(0,0,0,0.12)]">
              {remaining.map((d) => (
                <button
                  key={d.id}
                  type="button"
                  className="px-3 py-2 text-left text-[13px] text-[#132110] transition-colors hover:bg-[#f3f4f6]"
                  onClick={() => {
                    onChange([...selectedIds, d.id])
                    setMenuOpen(false)
                  }}
                >
                  {d.name}
                </button>
              ))}
            </span>
          ) : null}
        </span>
      ) : null}
      <span className="w-full text-[12px] text-[#9ca3af]">{selected.length}/{maxItems} selected</span>
    </div>
  )
}

/* ------------------------------- analytics ---------------------------------- */

function buildLinePath(pts: [number, number][]): string {
  return pts.reduce((acc, [x, y], i) => {
    if (i === 0) return `M${x},${y}`
    const [px, py] = pts[i - 1]
    const cx = (x - px) * 0.35
    return `${acc} C${px + cx},${py} ${x - cx},${y} ${x},${y}`
  }, '')
}

/**
 * Static analytics mockup — Monthly Visitors + Page Views vs Engagement.
 *
 * The figures below are hardcoded design placeholders, identical for every
 * destination. Until a real source is wired up this MUST stay visibly labelled:
 * an unlabelled chart reading ~90k monthly visitors is a fabricated metric that
 * someone will eventually screenshot and act on.
 */
export function AnalyticsPanel() {
  const CW = 688

  // Line chart — 12 months of visitor data (thousands)
  const visitData = [45, 52, 38, 65, 78, 88, 92, 86, 72, 58, 64, 55]
  const LX0 = 40, LX1 = 700, LY0 = 20, LY1 = 180
  const visitPts = visitData.map((v, i): [number, number] => [
    LX0 + (i / 11) * (LX1 - LX0),
    LY0 + (1 - v / 100) * (LY1 - LY0),
  ])
  const linePath = buildLinePath(visitPts)
  const fillPath = `${linePath} L${LX1},${LY1} L${LX0},${LY1} Z`
  const lineMonths = ['Jan', 'Mar', 'May', 'Jul', 'Sep', 'Nov']
  const lineMonthX = [40, 160, 280, 400, 520, 640]

  // Bar chart — weekly page views vs engagement (%)
  const barData: [number, number][] = [[43, 65], [59, 49], [76, 86], [49, 38]]
  const barDays = ['Mon', 'Tue', 'Wed', 'Thu']
  const barGX = [40, 216, 392, 568]
  const BY0 = 20, BY1 = 180, BRANGE = BY1 - BY0

  return (
    <div className="flex flex-col gap-5">
      <p
        role="note"
        className="rounded-lg border border-[#f0c36d] bg-[#fdf6e3] px-4 py-3 text-[13px] leading-[1.5] text-[#7a5c12]"
      >
        <strong className="font-semibold">Sample data — not real traffic.</strong> These charts are
        design placeholders showing the same figures for every destination. Analytics are not
        connected yet.
      </p>

      {/* Monthly Visitors */}
      <div className="overflow-clip rounded-xl border border-[#f3f4f6]">
        <div className="flex items-center justify-between px-6 pt-5 pb-3">
          <p className="text-[14px] font-semibold text-[#132110]">Monthly Visitors</p>
          <span className="rounded bg-[#f3f4f6] px-2.5 py-1 text-[11px] font-medium text-[#6b7280]">Last 12 Months</span>
        </div>
        <div className="px-2 pb-4">
          <svg viewBox={`0 0 ${CW} 225`} className="w-full" aria-hidden>
            <line x1={LX0} y1="60" x2={LX1} y2="60" stroke="#f3f4f6" />
            <line x1={LX0} y1="120" x2={LX1} y2="120" stroke="#f3f4f6" />
            <line x1={LX0} y1={LY1} x2={LX1} y2={LY1} stroke="#f3f4f6" />
            <text x="2" y="63" fontSize="10" fill="#9ca3af">100k</text>
            <text x="2" y="123" fontSize="10" fill="#9ca3af">50k</text>
            <text x="2" y="183" fontSize="10" fill="#9ca3af">0</text>
            {lineMonths.map((m, i) => (
              <text key={m} x={lineMonthX[i]} y="210" fontSize="10" fill="#9ca3af" textAnchor="middle">{m}</text>
            ))}
            <path d={fillPath} fill="rgba(49,84,42,0.07)" />
            <path d={linePath} fill="none" stroke="#31542a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* Page Views vs Engagement */}
      <div className="overflow-clip rounded-xl border border-[#f3f4f6]">
        <div className="flex items-center justify-between px-6 pt-5 pb-3">
          <p className="text-[14px] font-semibold text-[#132110]">Page Views vs Engagement</p>
          <span className="rounded bg-[#f3f4f6] px-2.5 py-1 text-[11px] font-medium text-[#6b7280]">Weekly</span>
        </div>
        <div className="px-2 pb-4">
          <svg viewBox={`0 0 ${CW} 240`} className="w-full" aria-hidden>
            <line x1={barGX[0]} y1="60" x2="640" y2="60" stroke="#f3f4f6" />
            <line x1={barGX[0]} y1="120" x2="640" y2="120" stroke="#f3f4f6" />
            <line x1={barGX[0]} y1={BY1} x2="640" y2={BY1} stroke="#f3f4f6" />
            <text x="2" y="63" fontSize="10" fill="#9ca3af">100%</text>
            <text x="2" y="123" fontSize="10" fill="#9ca3af">50%</text>
            <text x="2" y="183" fontSize="10" fill="#9ca3af">0%</text>
            {barData.map(([views, eng], gi) => {
              const gx = barGX[gi]
              const vh = (views / 100) * BRANGE
              const eh = (eng / 100) * BRANGE
              return (
                <g key={gi}>
                  <rect x={gx} y={BY1 - vh} width="28" height={vh} rx="3" fill="#31542a" />
                  <rect x={gx + 40} y={BY1 - eh} width="28" height={eh} rx="3" fill="rgba(49,84,42,0.28)" />
                </g>
              )
            })}
            {barDays.map((d, i) => (
              <text key={d} x={barGX[i] + 28} y="210" fontSize="10" fill="#9ca3af" textAnchor="middle">{d}</text>
            ))}
            {/* legend */}
            <rect x={barGX[0]} y="224" width="10" height="10" rx="2" fill="#31542a" />
            <text x={barGX[0] + 14} y="234" fontSize="10" fill="#6b7280">Page Views</text>
            <rect x={barGX[0] + 88} y="224" width="10" height="10" rx="2" fill="rgba(49,84,42,0.28)" />
            <text x={barGX[0] + 102} y="234" fontSize="10" fill="#6b7280">Engagement</text>
          </svg>
        </div>
      </div>
    </div>
  )
}

/* --------------------------- embed link dropzone ---------------------------- */

/** Dashed box holding a centered embed URL input — design 618:4215. */
export function EmbedLinkBox({
  value,
  onChange,
  hint = 'Video Embed Link',
}: {
  value: string
  onChange: (v: string) => void
  hint?: string
}) {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-[#e5e7eb] bg-[#f9fafb] p-6">
      <p className="text-[13px] font-semibold text-[#666]">{hint}</p>
      <input
        className="h-10 w-full max-w-[500px] rounded-md border border-[#d1d1d1] bg-white px-3 text-[13px] text-[#132110] outline-none transition-colors placeholder:text-[#b3b3b3] focus:border-[#31542a] focus:ring-2 focus:ring-[rgba(49,84,42,0.12)]"
        value={value}
        placeholder="https://www.youtube.com/embed/..."
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}
