'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import type { CmsDestinationListItem, CmsStatus } from '@/lib/cms-data'
import { CmsTopBar, StatusBadge } from './CmsChrome'

export function DestinationsList({ initial }: { initial: CmsDestinationListItem[] }) {
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState<'all' | CmsStatus>('all')
  const [region, setRegion] = useState('all')
  const [view, setView] = useState<'list' | 'grid'>('list')
  const [items, setItems] = useState(initial)
  const [deleting, setDeleting] = useState<string | null>(null)

  const regions = useMemo(
    () => ['all', ...Array.from(new Set(items.map((d) => d.region)))],
    [items],
  )

  const filtered = items.filter((d) => {
    if (status !== 'all' && d.status !== status) return false
    if (region !== 'all' && d.region !== region) return false
    if (query && !d.name.toLowerCase().includes(query.toLowerCase())) return false
    return true
  })

  async function deleteBySlug(slug: string) {
    if (!confirm(`Delete destination “${slug}”?`)) return
    setDeleting(slug)
    try {
      const res = await fetch(`/api/destinations?where[slug][equals]=${encodeURIComponent(slug)}&limit=1`, {
        credentials: 'include',
      })
      if (!res.ok) throw new Error('Lookup failed')
      const json = (await res.json()) as { docs?: { id: number | string }[] }
      const id = json.docs?.[0]?.id
      if (!id) throw new Error('Not found')
      const del = await fetch(`/api/destinations/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      })
      if (!del.ok) throw new Error('Delete failed')
      setItems((prev) => prev.filter((d) => d.slug !== slug))
    } catch (e) {
      alert(e instanceof Error ? e.message : 'Delete failed')
    } finally {
      setDeleting(null)
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
            className="rounded-lg bg-[#31542a] px-4 py-2.5 text-[14px] font-semibold text-white md:px-5"
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
              </p>
            </div>
            <div className="flex rounded-lg bg-[#f3f4f6] p-1">
              <button
                type="button"
                aria-label="List view"
                onClick={() => setView('list')}
                className={`rounded-md px-3 py-2 ${view === 'list' ? 'bg-white shadow-sm' : ''}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/cms/icons/list.svg" alt="" width={18} height={18} />
              </button>
              <button
                type="button"
                aria-label="Grid view"
                onClick={() => setView('grid')}
                className={`rounded-md px-3 py-2 ${view === 'grid' ? 'bg-white shadow-sm' : ''}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/cms/icons/grid.svg" alt="" width={18} height={18} />
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <label className="flex min-h-9 flex-1 items-center gap-3 rounded-lg border border-[#e5e7eb] bg-white px-3 py-2.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/cms/icons/search.svg" alt="" width={16} height={16} />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search destinations..."
                className="w-full bg-transparent text-[14px] text-[#132110] outline-none placeholder:text-[#9ca3af]"
              />
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
          </div>
        ) : view === 'list' ? (
          <div className="overflow-hidden rounded-xl border border-[#e5e7eb] bg-white shadow-[0_4px_12px_rgba(0,0,0,0.03)]">
            <div className="hidden gap-5 border-b border-[#e5e7eb] bg-[#fafafa] px-6 py-3 text-[12px] font-bold tracking-wide text-[#9ca3af] uppercase md:flex">
              <span className="w-10" />
              <span className="w-[60px]">Thumb</span>
              <span className="min-w-0 flex-1">Name</span>
              <span className="w-40">Region</span>
              <span className="w-[120px]">Status</span>
              <span className="w-[100px]">Items</span>
              <span className="w-[140px]">Modified</span>
              <span className="w-20 text-right">Actions</span>
            </div>
            {filtered.map((d, i) => (
              <div
                key={d.slug}
                className={`flex flex-col gap-3 border-b border-[#e5e7eb] px-4 py-4 last:border-b-0 md:flex-row md:items-center md:gap-5 md:px-6 ${
                  i === 0 ? 'bg-[rgba(49,84,42,0.04)]' : 'bg-white'
                }`}
              >
                <div className="hidden w-10 md:block">
                  <span className="block size-[18px] rounded border-2 border-[#e5e7eb] bg-white" />
                </div>
                <div className="flex items-center gap-3 md:contents">
                  <div className="w-[60px] shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={d.thumb}
                      alt=""
                      width={48}
                      height={48}
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
                  <div className="flex gap-3">
                    <Link href={`/cms/destinations/${d.slug}`} aria-label={`Edit ${d.name}`}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/cms/icons/edit.svg" alt="" width={18} height={18} />
                    </Link>
                    <button
                      type="button"
                      aria-label={`Delete ${d.name}`}
                      disabled={deleting === d.slug}
                      onClick={() => void deleteBySlug(d.slug)}
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
                className="overflow-hidden rounded-xl border border-[#e5e7eb] bg-white shadow-[0_4px_12px_rgba(0,0,0,0.03)]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={d.thumb} alt="" className="aspect-[4/3] w-full object-cover" />
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
    <label className="flex items-center gap-2 rounded-lg border border-[#e5e7eb] bg-white px-3 py-2.5 text-[14px]">
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
