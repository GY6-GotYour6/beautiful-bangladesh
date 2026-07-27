'use client'

import { useCallback, useState } from 'react'
import type { LandingCreator, LandingDestination, LandingPageData } from '@/lib/landing-global'
import {
  AddRowButton,
  CmsTopBar,
  SectionCard,
  StatusBadge,
  Toast,
} from './CmsChrome'
import { GripIcon, TrashIcon } from './CmsEditorControls'

// ─── Types ────────────────────────────────────────────────────────────────────

type ToastState = { kind: 'success' | 'error'; text: string } | null

// ─── Shared input style ───────────────────────────────────────────────────────

const input =
  'w-full rounded border border-[#e5e7eb] bg-[#fafafa] px-2 py-1.5 text-[13px] text-[#132110] outline-none transition-colors focus:border-[#31542a] focus:bg-white focus:ring-2 focus:ring-[rgba(49,84,42,0.12)]'

// ─── Destination row ──────────────────────────────────────────────────────────

function DestinationRow({
  item,
  index,
  dragIndex,
  overIndex,
  onChange,
  onRemove,
  onDragStart,
  onDragOver,
  onDrop,
  onDragEnd,
}: {
  item: LandingDestination
  index: number
  dragIndex: number | null
  overIndex: number | null
  onChange: (next: LandingDestination) => void
  onRemove: () => void
  onDragStart: () => void
  onDragOver: () => void
  onDrop: () => void
  onDragEnd: () => void
}) {
  const isDragging = dragIndex === index
  const isOver = overIndex === index && dragIndex !== null && dragIndex !== index

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); onDragOver() }}
      onDrop={onDrop}
      className={`flex items-start gap-3 rounded-lg border bg-white p-3 transition-[opacity,border-color,box-shadow] ${
        isDragging ? 'border-[#e5e7eb] opacity-40' :
        isOver ? 'border-[#31542a] shadow-[0_0_0_1px_#31542a]' :
        'border-[#f3f4f6]'
      }`}
    >
      {/* Drag handle */}
      <span
        draggable
        onDragStart={(e) => { e.dataTransfer.effectAllowed = 'move'; onDragStart() }}
        onDragEnd={onDragEnd}
        className="mt-1 cursor-grab select-none text-[#9ca3af] transition-colors hover:text-[#31542a] active:cursor-grabbing"
        title="Drag to reorder"
        aria-hidden
      >
        <GripIcon />
      </span>

      {/* Thumbnail preview */}
      <div className="relative flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-md border border-[#e5e7eb] bg-[#f5f5f5]">
        {item.imagePath ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={item.imagePath} alt="" className="size-full object-cover" draggable={false} />
        ) : (
          <span className="text-[18px] text-[#8c8c8c]">🖼</span>
        )}
      </div>

      {/* Fields */}
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <input
          className={`${input} font-semibold`}
          placeholder="Destination name"
          value={item.name}
          onChange={(e) => onChange({ ...item, name: e.target.value })}
        />
        <input
          className={input}
          placeholder="Description"
          value={item.description}
          onChange={(e) => onChange({ ...item, description: e.target.value })}
        />
        <div className="flex items-center gap-1 text-[11px] text-[#808080]">
          <span className="shrink-0">Slug:</span>
          <input
            className="min-w-0 flex-1 rounded border border-[#f3f4f6] bg-transparent px-1 py-0.5 text-[11px] text-[#b3b3b3] outline-none focus:border-[#31542a] focus:text-[#132110]"
            placeholder="/destinations/coxs-bazar"
            value={item.slug}
            onChange={(e) => onChange({ ...item, slug: e.target.value })}
          />
        </div>
        <div className="flex items-center gap-1 text-[11px] text-[#808080]">
          <span className="shrink-0">Image path:</span>
          <input
            className="min-w-0 flex-1 rounded border border-[#f3f4f6] bg-transparent px-1 py-0.5 text-[11px] text-[#b3b3b3] outline-none focus:border-[#31542a] focus:text-[#132110]"
            placeholder="/landing/destinations/coxs-bazar.webp"
            value={item.imagePath}
            onChange={(e) => onChange({ ...item, imagePath: e.target.value })}
          />
        </div>
      </div>

      {/* Remove */}
      <button
        type="button"
        aria-label="Remove"
        onClick={onRemove}
        className="mt-0.5 rounded p-1 text-[#9ca3af] transition-colors hover:bg-[#fef2f2] hover:text-[#b91c1c]"
      >
        <TrashIcon size={16} />
      </button>
    </div>
  )
}

// ─── Creator row ──────────────────────────────────────────────────────────────

function CreatorRow({
  item,
  index,
  dragIndex,
  overIndex,
  onChange,
  onRemove,
  onDragStart,
  onDragOver,
  onDrop,
  onDragEnd,
}: {
  item: LandingCreator
  index: number
  dragIndex: number | null
  overIndex: number | null
  onChange: (next: LandingCreator) => void
  onRemove: () => void
  onDragStart: () => void
  onDragOver: () => void
  onDrop: () => void
  onDragEnd: () => void
}) {
  const isDragging = dragIndex === index
  const isOver = overIndex === index && dragIndex !== null && dragIndex !== index

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); onDragOver() }}
      onDrop={onDrop}
      className={`flex items-start gap-3 rounded-lg border bg-white p-3 transition-[opacity,border-color,box-shadow] ${
        isDragging ? 'border-[#e5e7eb] opacity-40' :
        isOver ? 'border-[#31542a] shadow-[0_0_0_1px_#31542a]' :
        'border-[#f3f4f6]'
      }`}
    >
      <span
        draggable
        onDragStart={(e) => { e.dataTransfer.effectAllowed = 'move'; onDragStart() }}
        onDragEnd={onDragEnd}
        className="mt-1 cursor-grab select-none text-[#9ca3af] transition-colors hover:text-[#31542a] active:cursor-grabbing"
        title="Drag to reorder"
        aria-hidden
      >
        <GripIcon />
      </span>

      {/* Photo preview */}
      <div className="relative flex shrink-0 items-center justify-center overflow-hidden rounded-md border border-[#e5e7eb] bg-[#f5f5f5]" style={{ width: 64, height: 72 }}>
        {item.imagePath ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={item.imagePath} alt="" className="size-full object-cover" draggable={false} />
        ) : (
          <span className="text-[18px] text-[#8c8c8c]">👤</span>
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <input
          className={`${input} font-semibold`}
          placeholder="Creator name"
          value={item.name}
          onChange={(e) => onChange({ ...item, name: e.target.value })}
        />
        <div className="flex items-center gap-1 text-[11px] text-[#808080]">
          <span className="shrink-0">Instagram URL:</span>
          <input
            className="min-w-0 flex-1 rounded border border-[#f3f4f6] bg-transparent px-1 py-0.5 text-[11px] text-[#b3b3b3] outline-none focus:border-[#31542a] focus:text-[#132110]"
            placeholder="https://www.instagram.com/..."
            value={item.instagramUrl}
            onChange={(e) => onChange({ ...item, instagramUrl: e.target.value })}
          />
        </div>
        <div className="flex items-center gap-1 text-[11px] text-[#808080]">
          <span className="shrink-0">Image path:</span>
          <input
            className="min-w-0 flex-1 rounded border border-[#f3f4f6] bg-transparent px-1 py-0.5 text-[11px] text-[#b3b3b3] outline-none focus:border-[#31542a] focus:text-[#132110]"
            placeholder="/landing/creators/creator-1.jpg"
            value={item.imagePath}
            onChange={(e) => onChange({ ...item, imagePath: e.target.value })}
          />
        </div>
      </div>

      <button
        type="button"
        aria-label="Remove"
        onClick={onRemove}
        className="mt-0.5 rounded p-1 text-[#9ca3af] transition-colors hover:bg-[#fef2f2] hover:text-[#b91c1c]"
      >
        <TrashIcon size={16} />
      </button>
    </div>
  )
}

// ─── Main editor ──────────────────────────────────────────────────────────────

export function LandingEditor({ initial }: { initial: LandingPageData }) {
  const [destinations, setDestinations] = useState<LandingDestination[]>(
    initial.featuredDestinations,
  )
  const [creators, setCreators] = useState<LandingCreator[]>(initial.featuredCreators)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState<ToastState>(null)

  // Drag state for destinations
  const [destDragIdx, setDestDragIdx] = useState<number | null>(null)
  const [destOverIdx, setDestOverIdx] = useState<number | null>(null)

  // Drag state for creators
  const [creatDragIdx, setCreatDragIdx] = useState<number | null>(null)
  const [creatOverIdx, setCreatOverIdx] = useState<number | null>(null)

  // ── Destination helpers ──────────────────────────────────────────────────
  const changeDestination = useCallback((i: number, next: LandingDestination) => {
    setDestinations((prev) => prev.map((d, idx) => (idx === i ? next : d)))
  }, [])

  const removeDestination = useCallback((i: number) => {
    setDestinations((prev) => prev.filter((_, idx) => idx !== i))
  }, [])

  const addDestination = useCallback(() => {
    setDestinations((prev) => [
      ...prev,
      { name: '', slug: '', imagePath: '', description: '' },
    ])
  }, [])

  function dropDestination(to: number) {
    if (destDragIdx == null || destDragIdx === to) return
    setDestinations((prev) => {
      const next = [...prev]
      const [moved] = next.splice(destDragIdx, 1)
      next.splice(to, 0, moved)
      return next
    })
    setDestDragIdx(null)
    setDestOverIdx(null)
  }

  // ── Creator helpers ──────────────────────────────────────────────────────
  const changeCreator = useCallback((i: number, next: LandingCreator) => {
    setCreators((prev) => prev.map((c, idx) => (idx === i ? next : c)))
  }, [])

  const removeCreator = useCallback((i: number) => {
    setCreators((prev) => prev.filter((_, idx) => idx !== i))
  }, [])

  const addCreator = useCallback(() => {
    setCreators((prev) => [...prev, { name: '', imagePath: '', instagramUrl: '' }])
  }, [])

  function dropCreator(to: number) {
    if (creatDragIdx == null || creatDragIdx === to) return
    setCreators((prev) => {
      const next = [...prev]
      const [moved] = next.splice(creatDragIdx, 1)
      next.splice(to, 0, moved)
      return next
    })
    setCreatDragIdx(null)
    setCreatOverIdx(null)
  }

  // ── Save ────────────────────────────────────────────────────────────────
  async function save() {
    setSaving(true)
    try {
      const res = await fetch('/api/cms/landing', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          featuredDestinations: destinations,
          featuredCreators: creators,
        }),
      })
      if (!res.ok) throw new Error(await res.text())
      setToast({ kind: 'success', text: 'Landing page saved.' })
    } catch {
      setToast({ kind: 'error', text: 'Save failed — please try again.' })
    } finally {
      setSaving(false)
    }
  }

  // ── Render ───────────────────────────────────────────────────────────────
  return (
    <div className="flex min-h-screen flex-col bg-[#f5f5f5]">
      <CmsTopBar
        backHref="/cms"
        title={
          <>
            <span className="text-[18px] font-bold uppercase tracking-[-0.02em] text-[#132110] md:text-[20px]">
              Landing Page
            </span>
            <StatusBadge status="published" />
          </>
        }
        actions={
          <>
            <button
              type="button"
              onClick={() => {
                setDestinations(initial.featuredDestinations)
                setCreators(initial.featuredCreators)
              }}
              className="rounded-lg border border-[#e5e7eb] bg-white px-4 py-2.5 text-[14px] font-semibold text-[#4b5563] transition-colors hover:bg-[#f9fafb]"
            >
              Discard
            </button>
            <button
              type="button"
              onClick={save}
              disabled={saving}
              className="rounded-lg bg-[#31542a] px-5 py-2.5 text-[14px] font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              {saving ? 'Saving…' : 'Update Page'}
            </button>
          </>
        }
      />

      <main className="mx-auto flex w-full max-w-[864px] flex-col gap-6 px-4 py-8 md:px-6 md:py-10">
        {/* Destinations */}
        <div className="w-full">
          <SectionCard title="Top Destinations" count={destinations.length}>
            <div className="flex flex-col gap-2">
              {destinations.map((d, i) => (
                <DestinationRow
                  key={i}
                  item={d}
                  index={i}
                  dragIndex={destDragIdx}
                  overIndex={destOverIdx}
                  onChange={(next) => changeDestination(i, next)}
                  onRemove={() => removeDestination(i)}
                  onDragStart={() => setDestDragIdx(i)}
                  onDragOver={() => { if (destOverIdx !== i) setDestOverIdx(i) }}
                  onDrop={() => dropDestination(i)}
                  onDragEnd={() => { setDestDragIdx(null); setDestOverIdx(null) }}
                />
              ))}
            </div>
            {destinations.length < 4 && (
              <AddRowButton label="Add Destination" onClick={addDestination} />
            )}
            {destinations.length >= 4 && (
              <p className="text-center text-[12px] text-[#9ca3af]">Maximum 4 destinations</p>
            )}
          </SectionCard>
        </div>

        {/* Creators */}
        <div className="w-full">
          <SectionCard title="Top Creators" count={creators.length}>
            <div className="flex flex-col gap-2">
              {creators.map((c, i) => (
                <CreatorRow
                  key={i}
                  item={c}
                  index={i}
                  dragIndex={creatDragIdx}
                  overIndex={creatOverIdx}
                  onChange={(next) => changeCreator(i, next)}
                  onRemove={() => removeCreator(i)}
                  onDragStart={() => setCreatDragIdx(i)}
                  onDragOver={() => { if (creatOverIdx !== i) setCreatOverIdx(i) }}
                  onDrop={() => dropCreator(i)}
                  onDragEnd={() => { setCreatDragIdx(null); setCreatOverIdx(null) }}
                />
              ))}
            </div>
            <AddRowButton label="Add Creator" onClick={addCreator} />
          </SectionCard>
        </div>
      </main>

      {toast && (
        <Toast kind={toast.kind} onDismiss={() => setToast(null)}>
          {toast.text}
        </Toast>
      )}
    </div>
  )
}
