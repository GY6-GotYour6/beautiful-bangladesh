import Link from 'next/link'
import type { ReactNode } from 'react'

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
  titlePlaceholder = 'Title',
  subtitlePlaceholder = 'Description',
}: {
  items: { title: string; subtitle: string }[]
  addLabel: string
  onChange?: (index: number, next: { title: string; subtitle: string }) => void
  onAdd?: () => void
  onRemove?: (index: number) => void
  titlePlaceholder?: string
  subtitlePlaceholder?: string
}) {
  const editable = Boolean(onChange)
  return (
    <>
      {items.map((item, i) => (
        <div
          key={`row-${i}`}
          className="flex items-start gap-3 rounded-lg border border-[#e5e7eb] bg-[#fafafa] p-3"
        >
          <span className="mt-1 text-[#9ca3af]" aria-hidden>
            ⋮⋮
          </span>
          <div className="min-w-0 flex-1 space-y-2">
            {editable ? (
              <>
                <input
                  className="w-full rounded border border-[#e5e7eb] bg-white px-2 py-1.5 text-[15px] font-semibold outline-none focus:border-[#31542a]"
                  value={item.title}
                  placeholder={titlePlaceholder}
                  onChange={(e) => onChange?.(i, { ...item, title: e.target.value })}
                />
                <input
                  className="w-full rounded border border-[#e5e7eb] bg-white px-2 py-1.5 text-[13px] text-[#6b7280] outline-none focus:border-[#31542a]"
                  value={item.subtitle}
                  placeholder={subtitlePlaceholder}
                  onChange={(e) => onChange?.(i, { ...item, subtitle: e.target.value })}
                />
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
            className="text-[#9ca3af]"
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
    'w-full rounded-lg border border-[#e5e7eb] bg-[#fafafa] px-3 py-3 text-[15px] text-[#132110] outline-none focus:border-[#31542a]'
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
        className="min-h-[44px] w-full appearance-none rounded-lg border border-[#e5e7eb] bg-[#fafafa] px-3 py-2.5 pr-10 text-[15px] text-[#132110] outline-none focus:border-[#31542a]"
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
      className="flex w-full items-center justify-center rounded-lg border border-dashed border-[#d1d5db] px-4 py-3 text-[14px] font-semibold text-[#31542a] hover:bg-[#f9fafb]"
    >
      + {label}
    </button>
  )
}
