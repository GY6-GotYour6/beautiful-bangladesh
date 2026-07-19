'use client'

import Link from 'next/link'
import { useEffect, useState, type ReactNode } from 'react'

type Props = {
  crumbs?: { href?: string; label: string }[]
  actions?: ReactNode
  backHref?: string
  title?: ReactNode
}

export function CmsTopBar({ crumbs, actions, backHref, title }: Props) {
  return (
    <header className="flex h-[72px] w-full shrink-0 items-center justify-between border-b border-[#e5e7eb] bg-white px-6 md:px-10">
      <div className="flex min-w-0 items-center gap-4 md:gap-6">
        {backHref ? (
          <Link
            href={backHref}
            className="flex size-6 shrink-0 items-center justify-center text-[#132110]"
            aria-label="Back"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M15 18l-6-6 6-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        ) : null}

        {title ? (
          <div className="flex min-w-0 items-center gap-3">{title}</div>
        ) : (
          <>
            <Link
              href="/cms"
              className="shrink-0 text-[18px] font-bold uppercase tracking-[-0.02em] text-[#31542a] md:text-[20px]"
            >
              beautiful Bangladesh
            </Link>
            {crumbs?.length ? (
              <>
                <span className="hidden h-6 w-px bg-[#e5e7eb] sm:block" />
                <nav className="hidden items-center gap-2 text-[14px] sm:flex" aria-label="Breadcrumb">
                  {crumbs.map((c, i) => (
                    <span key={`${c.label}-${i}`} className="flex items-center gap-2">
                      {i > 0 ? (
                        <img src="/cms/icons/chevron-right.svg" alt="" width={12} height={12} />
                      ) : null}
                      {c.href ? (
                        <Link href={c.href} className="text-[#9ca3af]">
                          {c.label}
                        </Link>
                      ) : (
                        <span className="font-semibold text-[#132110]">{c.label}</span>
                      )}
                    </span>
                  ))}
                </nav>
              </>
            ) : null}
          </>
        )}
      </div>
      {actions ? <div className="flex shrink-0 items-center gap-2 md:gap-3">{actions}</div> : null}
    </header>
  )
}

export function StatusBadge({ status }: { status: 'published' | 'draft' }) {
  const published = status === 'published'
  return (
    <span
      className={
        published
          ? 'rounded bg-[rgba(49,84,42,0.1)] px-2 py-1 text-[12px] font-semibold text-[#31542a]'
          : 'rounded bg-[#f3f4f6] px-2 py-1 text-[12px] font-semibold text-[#4b5563]'
      }
    >
      {published ? 'Published' : 'Draft'}
    </span>
  )
}

export function SectionCard({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <section className="flex w-full flex-col gap-6 rounded-xl bg-white p-6 shadow-[0_4px_6px_rgba(0,0,0,0.03)] md:p-8">
      <header className="flex flex-col gap-1">
        <h2 className="text-[18px] font-bold uppercase text-[#132110]">{title}</h2>
        <div className="h-[3px] w-10 rounded-sm bg-[#31542a]" />
      </header>
      <div className="flex flex-col gap-5">{children}</div>
    </section>
  )
}

export function FieldLabel({ children }: { children: ReactNode }) {
  return <label className="block w-full text-[14px] font-semibold text-[#132110]">{children}</label>
}

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <FieldLabel>{label}</FieldLabel>
      {children}
    </div>
  )
}

export function RepeatList({
  items,
  addLabel,
  onChange,
  onAdd,
  onRemove,
  onMove,
  titlePlaceholder = 'Title',
  subtitlePlaceholder = 'Description',
  subtitleMultiline = false,
}: {
  items: { title: string; subtitle: string }[]
  addLabel: string
  onChange?: (index: number, next: { title: string; subtitle: string }) => void
  onAdd?: () => void
  onRemove?: (index: number) => void
  onMove?: (from: number, to: number) => void
  titlePlaceholder?: string
  subtitlePlaceholder?: string
  subtitleMultiline?: boolean
}) {
  const editable = Boolean(onChange)
  const draggable = editable && Boolean(onMove)
  const [dragIndex, setDragIndex] = useState<number | null>(null)
  const [overIndex, setOverIndex] = useState<number | null>(null)

  function endDrag() {
    setDragIndex(null)
    setOverIndex(null)
  }

  const inputShared =
    'w-full rounded border border-[#e5e7eb] bg-white px-2 py-1.5 outline-none transition-colors focus:border-[#31542a] focus:ring-2 focus:ring-[rgba(49,84,42,0.12)]'

  return (
    <>
      {items.map((item, i) => (
        <div
          key={`row-${i}`}
          onDragOver={
            draggable
              ? (e) => {
                  e.preventDefault()
                  if (overIndex !== i) setOverIndex(i)
                }
              : undefined
          }
          onDrop={
            draggable
              ? () => {
                  if (dragIndex != null && dragIndex !== i) onMove?.(dragIndex, i)
                  endDrag()
                }
              : undefined
          }
          className={`flex items-start gap-3 rounded-lg border bg-[#fafafa] p-3 transition-[opacity,border-color,box-shadow] ${
            dragIndex === i
              ? 'border-[#e5e7eb] opacity-40'
              : overIndex === i && dragIndex != null
                ? 'border-[#31542a] shadow-[0_0_0_1px_#31542a]'
                : 'border-[#e5e7eb]'
          }`}
        >
          <span
            draggable={draggable}
            onDragStart={
              draggable
                ? (e) => {
                    e.dataTransfer.effectAllowed = 'move'
                    setDragIndex(i)
                  }
                : undefined
            }
            onDragEnd={draggable ? endDrag : undefined}
            className={`mt-1 select-none text-[#9ca3af] ${
              draggable ? 'cursor-grab transition-colors hover:text-[#31542a] active:cursor-grabbing' : ''
            }`}
            title={draggable ? 'Drag to reorder' : undefined}
            aria-hidden
          >
            ⋮⋮
          </span>
          <div className="min-w-0 flex-1 space-y-2">
            {editable ? (
              <>
                <input
                  className={`${inputShared} text-[15px] font-semibold`}
                  value={item.title}
                  placeholder={titlePlaceholder}
                  onChange={(e) => onChange?.(i, { ...item, title: e.target.value })}
                />
                {subtitleMultiline ? (
                  <textarea
                    className={`${inputShared} min-h-[72px] text-[13px] text-[#6b7280]`}
                    value={item.subtitle}
                    placeholder={subtitlePlaceholder}
                    onChange={(e) => onChange?.(i, { ...item, subtitle: e.target.value })}
                  />
                ) : (
                  <input
                    className={`${inputShared} text-[13px] text-[#6b7280]`}
                    value={item.subtitle}
                    placeholder={subtitlePlaceholder}
                    onChange={(e) => onChange?.(i, { ...item, subtitle: e.target.value })}
                  />
                )}
              </>
            ) : (
              <>
                <p className="text-[15px] font-semibold">{item.title}</p>
                <p className="text-[13px] text-[#6b7280]">{item.subtitle}</p>
              </>
            )}
          </div>
          <button
            type="button"
            aria-label="Remove"
            className="rounded p-1 text-[#9ca3af] transition-colors hover:bg-[#fef2f2]"
            onClick={() => onRemove?.(i)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/cms/icons/trash.svg" alt="" width={16} height={16} />
          </button>
        </div>
      ))}
      <AddRowButton label={addLabel} onClick={onAdd} />
    </>
  )
}

export function Toast({
  kind,
  children,
  onDismiss,
  autoDismissMs = 3500,
}: {
  kind: 'success' | 'error'
  children: ReactNode
  onDismiss: () => void
  autoDismissMs?: number
}) {
  useEffect(() => {
    if (!autoDismissMs) return
    const t = setTimeout(onDismiss, autoDismissMs)
    return () => clearTimeout(t)
  }, [autoDismissMs, onDismiss])

  return (
    <div
      role="status"
      className={`fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-3 rounded-lg px-4 py-3 text-[14px] font-medium shadow-[0_8px_24px_rgba(0,0,0,0.15)] ${
        kind === 'success' ? 'bg-[#31542a] text-white' : 'bg-[#b91c1c] text-white'
      }`}
    >
      <span className="max-w-[70vw]">{children}</span>
      <button type="button" aria-label="Dismiss" className="opacity-70 hover:opacity-100" onClick={onDismiss}>
        ✕
      </button>
    </div>
  )
}

export function ConfirmDialog({
  open,
  title,
  body,
  confirmLabel = 'Confirm',
  busy = false,
  danger = false,
  onConfirm,
  onCancel,
}: {
  open: boolean
  title: string
  body?: ReactNode
  confirmLabel?: string
  busy?: boolean
  danger?: boolean
  onConfirm: () => void
  onCancel: () => void
}) {
  useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onCancel()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onCancel])

  if (!open) return null
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={onCancel}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        className="w-full max-w-[420px] rounded-xl bg-white p-6 shadow-[0_16px_48px_rgba(0,0,0,0.2)]"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-[17px] font-bold text-[#132110]">{title}</h2>
        {body ? <div className="mt-2 text-[14px] leading-relaxed text-[#4b5563]">{body}</div> : null}
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            className="rounded-lg border border-[#e5e7eb] bg-white px-4 py-2.5 text-[14px] font-semibold text-[#4b5563] transition-colors hover:bg-[#f9fafb]"
            onClick={onCancel}
            disabled={busy}
          >
            Cancel
          </button>
          <button
            type="button"
            className={`rounded-lg px-4 py-2.5 text-[14px] font-semibold text-white transition-opacity disabled:opacity-50 ${
              danger ? 'bg-[#b91c1c] hover:opacity-90' : 'bg-[#31542a] hover:opacity-90'
            }`}
            onClick={onConfirm}
            disabled={busy}
          >
            {busy ? 'Working…' : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}

export function Checkbox({
  checked,
  onChange,
  label,
  indeterminate = false,
}: {
  checked: boolean
  onChange: (v: boolean) => void
  label: string
  indeterminate?: boolean
}) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={indeterminate ? 'mixed' : checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`flex size-[18px] items-center justify-center rounded border-2 transition-colors ${
        checked || indeterminate
          ? 'border-[#31542a] bg-[#31542a] text-white'
          : 'border-[#d1d5db] bg-white hover:border-[#31542a]'
      }`}
    >
      {indeterminate ? (
        <span className="block h-0.5 w-2 rounded bg-white" />
      ) : checked ? (
        <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden>
          <path d="M2 6l3 3 5-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : null}
    </button>
  )
}

export function TextInput({
  value,
  onChange,
  multiline,
  minHeight,
}: {
  value: string
  onChange: (v: string) => void
  multiline?: boolean
  minHeight?: number
}) {
  const shared =
    'w-full rounded-lg border border-[#e5e7eb] bg-[#fafafa] px-3 py-3 text-[15px] text-[#132110] outline-none transition-colors focus:border-[#31542a] focus:bg-white focus:ring-2 focus:ring-[rgba(49,84,42,0.12)]'
  if (multiline) {
    return (
      <textarea
        className={shared}
        style={{ minHeight: minHeight ?? 100 }}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    )
  }
  return (
    <input
      className={`${shared} min-h-[44px]`}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}

export function SelectField({
  value,
  options,
  onChange,
}: {
  value: string
  options: string[]
  onChange: (v: string) => void
}) {
  return (
    <div className="relative">
      <select
        className="min-h-[44px] w-full appearance-none rounded-lg border border-[#e5e7eb] bg-[#fafafa] px-3 py-2.5 pr-10 text-[15px] text-[#132110] outline-none transition-colors focus:border-[#31542a] focus:bg-white focus:ring-2 focus:ring-[rgba(49,84,42,0.12)]"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <img
        src="/cms/icons/chevron-down.svg"
        alt=""
        width={16}
        height={16}
        className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2"
      />
    </div>
  )
}

export function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean
  onChange: (v: boolean) => void
  label: string
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-[14px] font-semibold text-[#132110]">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-10 rounded-full transition-colors ${
          checked ? 'bg-[#31542a]' : 'bg-[#d1d5db]'
        }`}
      >
        <span
          className={`absolute top-0.5 size-5 rounded-full bg-white transition-transform ${
            checked ? 'left-[18px]' : 'left-0.5'
          }`}
        />
      </button>
    </div>
  )
}

export function AddRowButton({ label, onClick }: { label: string; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center justify-center rounded-lg border border-dashed border-[#d1d5db] px-4 py-3 text-[14px] font-semibold text-[#31542a] transition-colors hover:border-[#31542a] hover:bg-[rgba(49,84,42,0.05)]"
    >
      + {label}
    </button>
  )
}
