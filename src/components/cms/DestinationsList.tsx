'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import type { CmsDestinationListItem, CmsStatus } from '@/lib/cms-data'
import { Checkbox, CmsTopBar, ConfirmDialog, StatusBadge, Toast } from './CmsChrome'

const VIEW_KEY = 'bb-cms-view'

export function DestinationsList({ initial }: { initial: CmsDestinationListItem[] }) {
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState<'all' | CmsStatus>('all')
  const [region, setRegion] = useState('all')
  const [view, setView] = useState<'list' | 'grid'>('list')
  const [items, setItems] = useState(initial)
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [confirming, setConfirming] = useState<CmsDestinationListItem[] | null>(null)
  const [deleting, setDeleting] = useState(false)
  const [toast, setToast] = useState<{ kind: 'success' | 'error'; text: string } | null>(null)

  // View pref is client-only; read after mount so server and first client render agree.
  useEffect(() => {
    const stored = localStorage.getItem(VIEW_KEY)
    if (stored === 'grid' || stored === 'list') setView(stored)
  }, [])

  function switchView(v: 'list' | 'grid') {
    setView(v)
    localStorage.setItem(VIEW_KEY, v)
  }

  const regions = useMemo(
    () => ['all', ...Array.from(new Set(items.map((d) => d.region)))],
    [items],
  )

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return items.filter((d) => {
      if (status !== 'all' && d.status !== status) return false
      if (region !== 'all' && d.region !== region) return false
      if (q && !d.name.toLowerCase().includes(q) && !d.region.toLowerCase().includes(q)) return false
      return true
    })
  }, [items, query, status, region])

  const hasFilters = query !== '' || status !== 'all' || region !== 'all'
  const selectedInView = filtered.filter((d) => selected.has(d.slug))
  const allInViewSelected = filtered.length > 0 && selectedInView.length === filtered.length

  function toggleRow(slug: string, on: boolean) {
    setSelected((prev) => {
      const next = new Set(prev)
      if (on) next.add(slug)
      else next.delete(slug)
      return next
    })
  }

  function toggleAll(on: boolean) {
    setSelected(on ? new Set(filtered.map((d) => d.slug)) : new Set())
  }

  async function deleteOne(d: CmsDestinationListItem) {
    let id = d.id
    if (!id) {
      const res = await fetch(
        `/api/destinations?where[slug][equals]=${encodeURIComponent(d.slug)}&limit=1`,
        { credentials: 'include' },
      )
      if (!res.ok) throw new Error(`Lookup failed for ${d.name}`)
      const json = (await res.json()) as { docs?: { id: number | string }[] }
      id = json.docs?.[0]?.id
      if (!id) throw new Error(`${d.name} not found`)
    }
    const del = await fetch(`/api/destinations/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    })
    if (!del.ok) throw new Error(`Delete failed for ${d.name}`)
  }

  async function runDelete(targets: CmsDestinationListItem[]) {
    setDeleting(true)
    try {
      for (const d of targets) await deleteOne(d)
      const gone = new Set(targets.map((d) => d.slug))
      setItems((prev) => prev.filter((d) => !gone.has(d.slug)))
      setSelected((prev) => {
        const next = new Set(prev)
        gone.forEach((s) => next.delete(s))
        return next
      })
      setToast({
        kind: 'success',
        text: targets.length === 1 ? `Deleted “${targets[0].name}”` : `Deleted ${targets.length} destinations`,
      })
    } catch (e) {
      setToast({ kind: 'error', text: e instanceof Error ? e.message : 'Delete failed' })
    } finally {
      setDeleting(false)
      setConfirming(null)
    }
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5] text-[#132110]" data-node-id="479:240">
      <CmsTopBar
        crumbs={[
          { href: '/cms', label: 'CMS' },
          { label: 'Destinations' },
        ]}
        actions={
          <Link
            href="/cms/destinations/new"
            className="rounded-lg bg-[#31542a] px-4 py-2.5 text-[14px] font-semibold text-white transition-opacity hover:opacity-90 md:px-5"
          >
            New Destination
          </Link>
        }
      />

      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-6 px-4 py-8 md:gap-8 md:px-20 md:py-10">
        <div className="flex flex-col gap-6 md:gap-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h1 className="text-[28px] font-bold md:text-[32px]">Destinations</h1>
              <p className="mt-1 text-[14px] text-[#4b5563]">
                Showing {filtered.length} destination{filtered.length === 1 ? '' : 's'}
                {selected.size > 0 ? ` · ${selected.size} selected` : ''}
              </p>
            </div>
            <div className="flex items-center gap-3">
              {selected.size > 0 ? (
                <button
                  type="button"
                  className="rounded-lg bg-[#fef2f2] px-4 py-2.5 text-[14px] font-semibold text-[#b91c1c] transition-colors hover:bg-[#fee2e2]"
                  onClick={() => setConfirming(items.filter((d) => selected.has(d.slug)))}
                >
                  Delete selected ({selected.size})
                </button>
              ) : null}
              <div className="flex rounded-lg bg-[#f3f4f6] p-1">
                <button
                  type="button"
                  aria-label="List view"
                  aria-pressed={view === 'list'}
                  onClick={() => switchView('list')}
                  className={`rounded-md px-3 py-2 transition-colors ${view === 'list' ? 'bg-white shadow-sm' : 'hover:bg-white/60'}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/cms/icons/list.svg" alt="" width={18} height={18} />
                </button>
                <button
                  type="button"
                  aria-label="Grid view"
                  aria-pressed={view === 'grid'}
                  onClick={() => switchView('grid')}
                  className={`rounded-md px-3 py-2 transition-colors ${view === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-white/60'}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/cms/icons/grid.svg" alt="" width={18} height={18} />
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <label className="flex min-h-9 flex-1 items-center gap-3 rounded-lg border border-[#e5e7eb] bg-white px-3 py-2.5 transition-colors focus-within:border-[#31542a] focus-within:ring-2 focus-within:ring-[rgba(49,84,42,0.12)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/cms/icons/search.svg" alt="" width={16} height={16} />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search destinations..."
                className="w-full bg-transparent text-[14px] text-[#132110] outline-none placeholder:text-[#9ca3af]"
              />
              {query ? (
                <button
                  type="button"
                  aria-label="Clear search"
                  className="text-[13px] text-[#9ca3af] hover:text-[#132110]"
                  onClick={() => setQuery('')}
                >
                  ✕
                </button>
              ) : null}
            </label>
            <div className="flex flex-wrap gap-3">
              <FilterSelect
                label="Status"
                value={status}
                onChange={(v) => setStatus(v as 'all' | CmsStatus)}
                options={[
                  { value: 'all', label: 'All' },
                  { value: 'published', label: 'Published' },
                  { value: 'draft', label: 'Draft' },
                ]}
              />
              <FilterSelect
                label="Region"
                value={region}
                onChange={setRegion}
                options={regions.map((r) => ({
                  value: r,
                  label: r === 'all' ? 'All' : r,
                }))}
              />
            </div>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-xl border border-dashed border-[#e5e7eb] bg-white p-10 text-center">
            {hasFilters ? (
              <>
                <p className="text-[15px] text-[#4b5563]">No destinations match your filters.</p>
                <button
                  type="button"
                  className="mt-4 inline-block text-[14px] font-semibold text-[#31542a] underline"
                  onClick={() => {
                    setQuery('')
                    setStatus('all')
                    setRegion('all')
                  }}
                >
                  Clear filters
                </button>
              </>
            ) : (
              <>
                <p className="text-[15px] text-[#4b5563]">No destinations yet.</p>
                <Link
                  href="/cms/destinations/new"
                  className="mt-4 inline-block text-[14px] font-semibold text-[#31542a] underline"
                >
                  Create the first one
                </Link>
                <p className="mt-2 text-[13px] text-[#9ca3af]">
                  Or run <code className="rounded bg-[#f3f4f6] px-1">npx tsx src/seed/destinations.ts</code>
                </p>
              </>
            )}
          </div>
        ) : view === 'list' ? (
          <div className="overflow-hidden rounded-xl border border-[#e5e7eb] bg-white shadow-[0_4px_12px_rgba(0,0,0,0.03)]">
            <div className="hidden items-center gap-5 border-b border-[#e5e7eb] bg-[#fafafa] px-6 py-3 text-[12px] font-bold tracking-wide text-[#9ca3af] uppercase md:flex">
              <span className="w-10">
                <Checkbox
                  label="Select all"
                  checked={allInViewSelected}
                  indeterminate={selectedInView.length > 0 && !allInViewSelected}
                  onChange={toggleAll}
                />
              </span>
              <span className="w-[60px]">Thumb</span>
              <span className="min-w-0 flex-1">Name</span>
              <span className="w-40">Region</span>
              <span className="w-[120px]">Status</span>
              <span className="w-[100px]">Items</span>
              <span className="w-[140px]">Modified</span>
              <span className="w-20 text-right">Actions</span>
            </div>
            {filtered.map((d) => (
              <div
                key={d.slug}
                className={`flex flex-col gap-3 border-b border-[#e5e7eb] px-4 py-4 transition-colors last:border-b-0 md:flex-row md:items-center md:gap-5 md:px-6 ${
                  selected.has(d.slug) ? 'bg-[rgba(49,84,42,0.04)]' : 'bg-white hover:bg-[#fafafa]'
                }`}
              >
                <div className="hidden w-10 md:block">
                  <Checkbox
                    label={`Select ${d.name}`}
                    checked={selected.has(d.slug)}
                    onChange={(on) => toggleRow(d.slug, on)}
                  />
                </div>
                <div className="flex items-center gap-3 md:contents">
                  <div className="w-[60px] shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={d.thumb}
                      alt=""
                      width={48}
                      height={48}
                      loading="lazy"
                      className="size-12 rounded-md object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <Link
                      href={`/cms/destinations/${d.slug}`}
                      className="text-[15px] font-semibold text-[#132110] hover:underline"
                    >
                      {d.name}
                    </Link>
                    <p className="text-[13px] text-[#6b7280] md:hidden">
                      {d.region} · {d.items} items
                    </p>
                  </div>
                </div>
                <span className="hidden w-40 text-[14px] text-[#4b5563] md:block">{d.region}</span>
                <span className="hidden w-[120px] md:block">
                  <StatusBadge status={d.status} />
                </span>
                <span className="hidden w-[100px] text-[14px] text-[#4b5563] md:block">
                  {d.items} items
                </span>
                <span className="hidden w-[140px] text-[14px] text-[#9ca3af] md:block">
                  {d.modified}
                </span>
                <div className="flex items-center justify-between gap-3 md:w-20 md:justify-end">
                  <span className="md:hidden">
                    <StatusBadge status={d.status} />
                  </span>
                  <div className="flex gap-1">
                    <Link
                      href={`/cms/destinations/${d.slug}`}
                      aria-label={`Edit ${d.name}`}
                      className="rounded p-1.5 transition-colors hover:bg-[#f3f4f6]"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/cms/icons/edit.svg" alt="" width={18} height={18} />
                    </Link>
                    <button
                      type="button"
                      aria-label={`Delete ${d.name}`}
                      className="rounded p-1.5 transition-colors hover:bg-[#fef2f2]"
                      onClick={() => setConfirming([d])}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/cms/icons/trash.svg" alt="" width={18} height={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((d) => (
              <Link
                key={d.slug}
                href={`/cms/destinations/${d.slug}`}
                className="group overflow-hidden rounded-xl border border-[#e5e7eb] bg-white shadow-[0_4px_12px_rgba(0,0,0,0.03)] transition-shadow hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)]"
              >
                <div className="overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={d.thumb}
                    alt=""
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="space-y-2 p-4">
                  <div className="flex items-start justify-between gap-2">
                    <h2 className="font-semibold">{d.name}</h2>
                    <StatusBadge status={d.status} />
                  </div>
                  <p className="text-[14px] text-[#4b5563]">
                    {d.region} · {d.items} items
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <ConfirmDialog
        open={confirming !== null}
        danger
        busy={deleting}
        title={
          confirming && confirming.length > 1
            ? `Delete ${confirming.length} destinations?`
            : `Delete “${confirming?.[0]?.name ?? ''}”?`
        }
        body="This permanently removes the destination and its content from the CMS."
        confirmLabel="Delete"
        onConfirm={() => confirming && void runDelete(confirming)}
        onCancel={() => (deleting ? null : setConfirming(null))}
      />

      {toast ? (
        <Toast kind={toast.kind} onDismiss={() => setToast(null)}>
          {toast.text}
        </Toast>
      ) : null}
    </div>
  )
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  options: { value: string; label: string }[]
}) {
  return (
    <label className="flex items-center gap-2 rounded-lg border border-[#e5e7eb] bg-white px-3 py-2.5 text-[14px] transition-colors focus-within:border-[#31542a]">
      <span className="text-[#9ca3af]">{label}:</span>
      <select
        className="appearance-none bg-transparent font-medium text-[#132110] outline-none"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/cms/icons/chevron-down.svg" alt="" width={14} height={14} />
    </label>
  )
}
