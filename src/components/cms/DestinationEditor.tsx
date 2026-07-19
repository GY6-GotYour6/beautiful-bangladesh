'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useRef, useState } from 'react'
import type { CmsDestinationRecord } from '@/lib/cms-data'
import { toPayloadData } from '@/lib/destination-dto'
import {
  AddRowButton,
  CmsTopBar,
  ConfirmDialog,
  Field,
  RepeatList,
  SectionCard,
  SelectField,
  StatusBadge,
  TextInput,
  Toast,
  Toggle,
} from './CmsChrome'

const regions = ['Chittagong', 'Khulna', 'Sylhet', 'Barishal', 'Dhaka', 'Rajshahi', 'Rangpur', 'Mymensingh']
const hangouts = ['Group/Couple', 'Solo', 'Family']

function slugify(name: string) {
  return name
    .toLowerCase()
    .replace(/['']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

function moveItem<T>(arr: T[], from: number, to: number): T[] {
  const next = [...arr]
  const [item] = next.splice(from, 1)
  next.splice(to, 0, item)
  return next
}

type Row = { title: string; subtitle: string }
type ListKey = 'foods' | 'subDestinations' | 'cultureItems' | 'events' | 'highlights' | 'social' | 'faqs'

export function DestinationEditor({
  initial,
  isNew = false,
  relatable = [],
}: {
  initial: CmsDestinationRecord
  isNew?: boolean
  relatable?: { id: number | string; name: string }[]
}) {
  const router = useRouter()
  const fileRef = useRef<HTMLInputElement>(null)
  const galleryRef = useRef<HTMLInputElement>(null)
  const [record, setRecord] = useState(initial)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState<'hero' | 'gallery' | null>(null)
  const [toast, setToast] = useState<{ kind: 'success' | 'error'; text: string } | null>(null)
  const [confirmDiscard, setConfirmDiscard] = useState(false)
  const published = record.status === 'published'

  const savedJson = useRef(JSON.stringify(initial))
  const dirty = useMemo(() => JSON.stringify(record) !== savedJson.current, [record])

  useEffect(() => {
    if (!dirty) return
    function warn(e: BeforeUnloadEvent) {
      e.preventDefault()
    }
    window.addEventListener('beforeunload', warn)
    return () => window.removeEventListener('beforeunload', warn)
  }, [dirty])

  const saveRef = useRef<(status: 'draft' | 'published') => void>(() => {})
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 's') {
        e.preventDefault()
        saveRef.current('draft')
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  function patch<K extends keyof CmsDestinationRecord>(key: K, value: CmsDestinationRecord[K]) {
    setRecord((r) => {
      const next = { ...r, [key]: value }
      if (key === 'name' && isNew && !r.id) {
        next.slug = slugify(String(value))
        next.heroTitle = String(value)
      }
      return next
    })
  }

  /** RepeatList props for a record list, mapped through {title, subtitle} rows. */
  function listProps<T>(
    key: ListKey,
    toRow: (item: T) => Row,
    fromRow: (row: Row) => T,
    empty: T,
  ) {
    const arr = record[key] as unknown as T[]
    const set = (fn: (a: T[]) => T[]) =>
      setRecord((r) => ({ ...r, [key]: fn(r[key] as unknown as T[]) }))
    return {
      items: arr.map(toRow),
      onChange: (i: number, next: Row) =>
        set((a) => a.map((item, x) => (x === i ? fromRow(next) : item))),
      onAdd: () => set((a) => [...a, empty]),
      onRemove: (i: number) => set((a) => a.filter((_, x) => x !== i)),
      onMove: (from: number, to: number) => set((a) => moveItem(a, from, to)),
    }
  }

  const titleDesc = (item: { title: string; description: string }): Row => ({
    title: item.title,
    subtitle: item.description,
  })
  const fromTitleDesc = (row: Row) => ({ title: row.title, description: row.subtitle })

  async function uploadMedia(file: File, alt: string) {
    const body = new FormData()
    body.append('file', file)
    body.append('alt', alt)
    const res = await fetch('/api/media', { method: 'POST', body, credentials: 'include' })
    if (!res.ok) {
      const text = await res.text()
      throw new Error(text || 'Upload failed')
    }
    const json = (await res.json()) as { doc?: { id: number | string; url?: string }; id?: number | string; url?: string }
    const doc = json.doc || json
    return { id: doc.id!, url: doc.url || '' }
  }

  async function save(status: 'draft' | 'published') {
    if (saving) return
    setSaving(true)
    setToast(null)
    try {
      if (!record.name.trim()) throw new Error('Destination name is required')
      const slug = record.slug || slugify(record.name)
      if (!slug) throw new Error('Slug is required')

      const payloadBody = toPayloadData({ ...record, slug, status })
      const isCreate = isNew || !record.id

      const res = await fetch(isCreate ? '/api/destinations' : `/api/destinations/${record.id}`, {
        method: isCreate ? 'POST' : 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payloadBody),
      })

      if (!res.ok) {
        const text = await res.text()
        throw new Error(text || 'Save failed')
      }

      const json = (await res.json()) as { doc?: { id: number | string; slug?: string }; id?: number | string; slug?: string }
      const doc = json.doc || json
      const next = { ...record, id: doc.id, slug: doc.slug || slug, status }
      savedJson.current = JSON.stringify(next)
      setRecord(next)
      setToast({ kind: 'success', text: status === 'published' ? 'Published' : 'Draft saved' })
      router.refresh()
      if (isCreate && doc.slug) {
        router.replace(`/cms/destinations/${doc.slug}`)
      }
    } catch (e) {
      setToast({ kind: 'error', text: e instanceof Error ? e.message : 'Save failed' })
    } finally {
      setSaving(false)
    }
  }
  saveRef.current = (status) => void save(status)

  async function onHeroFile(file: File | null) {
    if (!file) return
    setUploading('hero')
    try {
      const uploaded = await uploadMedia(file, record.name || 'Hero image')
      setRecord((r) => ({ ...r, heroImage: uploaded.url, heroImageId: uploaded.id }))
    } catch (e) {
      setToast({ kind: 'error', text: e instanceof Error ? e.message : 'Upload failed' })
    } finally {
      setUploading(null)
    }
  }

  async function onGalleryFile(file: File | null) {
    if (!file) return
    setUploading('gallery')
    try {
      const uploaded = await uploadMedia(file, `${record.name || 'Gallery'} photo`)
      setRecord((r) => ({
        ...r,
        gallery: [...(r.gallery || []), uploaded.url],
        galleryIds: [...(r.galleryIds || []), uploaded.id],
      }))
    } catch (e) {
      setToast({ kind: 'error', text: e instanceof Error ? e.message : 'Upload failed' })
    } finally {
      setUploading(null)
    }
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5] text-[#132110]" data-node-id="474:1539">
      <CmsTopBar
        backHref="/cms"
        title={
          <>
            <h1 className="truncate text-[16px] font-semibold md:text-[18px]">
              {record.name || 'New Destination'}
            </h1>
            <StatusBadge status={record.status} />
            {dirty ? (
              <span className="flex items-center gap-1.5 text-[12px] font-medium text-[#b45309]">
                <span className="size-1.5 rounded-full bg-[#f59e0b]" />
                Unsaved
              </span>
            ) : null}
          </>
        }
        actions={
          <>
            <button
              type="button"
              className="rounded-lg border border-[#e5e7eb] bg-white px-3 py-2.5 text-[14px] font-semibold text-[#4b5563] transition-colors hover:bg-[#f9fafb] md:px-4"
              onClick={() => (dirty ? setConfirmDiscard(true) : router.push('/cms'))}
            >
              Discard
            </button>
            <button
              type="button"
              disabled={saving}
              title="Ctrl+S"
              className="rounded-lg border border-[#e5e7eb] bg-white px-3 py-2.5 text-[14px] font-semibold text-[#132110] transition-colors hover:bg-[#f9fafb] disabled:opacity-50 md:px-4"
              onClick={() => void save('draft')}
            >
              {saving ? 'Saving…' : 'Save Draft'}
            </button>
            <button
              type="button"
              disabled={saving}
              className="rounded-lg bg-[#31542a] px-3 py-2.5 text-[14px] font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50 md:px-5"
              onClick={() => void save('published')}
            >
              {saving ? 'Saving…' : published ? 'Update Item' : 'Publish'}
            </button>
          </>
        }
      />

      <div className="mx-auto flex w-full max-w-[800px] flex-col gap-6 px-4 py-8 md:px-0 md:py-14">
        <SectionCard title="Basic Information">
          <Field label="Destination Name">
            <TextInput value={record.name} onChange={(v) => patch('name', v)} />
          </Field>
          <Field label="Slug">
            <TextInput value={record.slug} onChange={(v) => patch('slug', slugify(v))} />
          </Field>
          <Field label="Region/Division">
            <SelectField value={record.region} options={regions} onChange={(v) => patch('region', v)} />
          </Field>
          <Toggle
            label="Status"
            checked={published}
            onChange={(v) => patch('status', v ? 'published' : 'draft')}
          />
          <Toggle label="Featured" checked={record.featured} onChange={(v) => patch('featured', v)} />
        </SectionCard>

        <SectionCard title="Hero Section">
          <Field label="Hero Background Image">
            <div
              className="flex h-[240px] flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed border-[#e5e7eb] bg-[#f9fafb] p-6 transition-colors"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault()
                void onHeroFile(e.dataTransfer.files?.[0] || null)
              }}
            >
              {record.heroImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={record.heroImage}
                  alt=""
                  className="h-[100px] w-[160px] rounded-lg object-cover"
                />
              ) : (
                <p className="text-[13px] text-[#9ca3af]">Drop an image here or use the buttons below</p>
              )}
              <div className="flex gap-3">
                <button
                  type="button"
                  disabled={uploading === 'hero'}
                  className="rounded-md border border-[#e5e7eb] bg-white px-3 py-2 text-[13px] font-semibold transition-colors hover:bg-[#f9fafb] disabled:opacity-50"
                  onClick={() => fileRef.current?.click()}
                >
                  {uploading === 'hero' ? 'Uploading…' : record.heroImage ? 'Replace Image' : 'Upload Image'}
                </button>
                {record.heroImage ? (
                  <button
                    type="button"
                    className="rounded-md bg-[#fef2f2] px-3 py-2 text-[13px] font-semibold text-[#ef4444] transition-colors hover:bg-[#fee2e2]"
                    onClick={() =>
                      setRecord((r) => ({ ...r, heroImage: '', heroImageId: null }))
                    }
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
                onChange={(e) => void onHeroFile(e.target.files?.[0] || null)}
              />
            </div>
          </Field>
          <Field label="Hero Title">
            <TextInput value={record.heroTitle} onChange={(v) => patch('heroTitle', v)} />
          </Field>
          <Field label="Hero Subtitle">
            <TextInput
              value={record.heroSubtitle}
              onChange={(v) => patch('heroSubtitle', v)}
              multiline
            />
          </Field>
        </SectionCard>

        <SectionCard title="Quick Info">
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Location">
              <TextInput value={record.location} onChange={(v) => patch('location', v)} />
            </Field>
            <Field label="Travel Duration">
              <TextInput value={record.travelDuration} onChange={(v) => patch('travelDuration', v)} />
            </Field>
            <Field label="Experience Type">
              <TextInput value={record.experienceType} onChange={(v) => patch('experienceType', v)} />
            </Field>
            <Field label="Hangout Type">
              <SelectField
                value={record.hangoutType}
                options={hangouts}
                onChange={(v) => patch('hangoutType', v)}
              />
            </Field>
          </div>
        </SectionCard>

        <SectionCard title="Overview">
          <Field label="Section Title">
            <TextInput value={record.overviewTitle} onChange={(v) => patch('overviewTitle', v)} />
          </Field>
          <Field label="Description">
            <TextInput
              value={record.overviewDescription}
              onChange={(v) => patch('overviewDescription', v)}
              multiline
              minHeight={160}
            />
          </Field>
          <Field label="Sidebar Quote">
            <TextInput
              value={record.sidebarQuote}
              onChange={(v) => patch('sidebarQuote', v)}
              multiline
            />
          </Field>
        </SectionCard>

        <SectionCard title="Photo Gallery">
          <div
            className="grid grid-cols-2 gap-3 md:grid-cols-4"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault()
              void onGalleryFile(e.dataTransfer.files?.[0] || null)
            }}
          >
            {(record.gallery || []).map((src, i) => (
              <div key={`${src}-${i}`} className="group relative aspect-[4/3] overflow-hidden rounded-lg">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="" className="size-full object-cover" />
                <button
                  type="button"
                  className="absolute top-1 right-1 rounded bg-white/90 px-2 py-0.5 text-[11px] font-semibold opacity-0 transition-opacity group-hover:opacity-100"
                  onClick={() =>
                    setRecord((r) => ({
                      ...r,
                      gallery: (r.gallery || []).filter((_, idx) => idx !== i),
                      galleryIds: (r.galleryIds || []).filter((_, idx) => idx !== i),
                    }))
                  }
                >
                  Remove
                </button>
              </div>
            ))}
            {(record.gallery || []).length < 4
              ? Array.from({ length: 4 - (record.gallery || []).length }).map((_, i) => (
                  <div
                    key={`empty-${i}`}
                    className="aspect-[4/3] rounded-lg border border-dashed border-[#e5e7eb] bg-[#f9fafb]"
                  />
                ))
              : null}
          </div>
          <AddRowButton
            label={uploading === 'gallery' ? 'Uploading…' : 'Add Gallery Photo'}
            onClick={() => uploading !== 'gallery' && galleryRef.current?.click()}
          />
          <input
            ref={galleryRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => void onGalleryFile(e.target.files?.[0] || null)}
          />
        </SectionCard>

        <SectionCard title="Must Try Food">
          <RepeatList
            addLabel="Add Food Item"
            {...listProps('foods', titleDesc, fromTitleDesc, { title: 'New food', description: '' })}
          />
        </SectionCard>

        <SectionCard title="Sub Destinations Nearby">
          <RepeatList
            addLabel="Add Sub-Destination"
            {...listProps('subDestinations', titleDesc, fromTitleDesc, {
              title: 'New spot',
              description: '',
            })}
          />
        </SectionCard>

        <SectionCard title="Heritage & Culture">
          <RepeatList
            addLabel="Add Item"
            {...listProps('cultureItems', titleDesc, fromTitleDesc, {
              title: 'New item',
              description: '',
            })}
          />
        </SectionCard>

        <SectionCard title="What's Happening Around">
          <RepeatList
            addLabel="Add Item"
            subtitlePlaceholder="Date"
            {...listProps<{ title: string; date: string }>(
              'events',
              (i) => ({ title: i.title, subtitle: i.date }),
              (row) => ({ title: row.title, date: row.subtitle }),
              { title: 'New event', date: '' },
            )}
          />
        </SectionCard>

        <SectionCard title="Highlights of Destination">
          <RepeatList
            addLabel="Add Item"
            {...listProps('highlights', titleDesc, fromTitleDesc, {
              title: 'New highlight',
              description: '',
            })}
          />
        </SectionCard>

        <SectionCard title="Viral Travel Contents">
          <RepeatList
            addLabel="Add Social Content"
            titlePlaceholder="Creator"
            subtitlePlaceholder="Platform · URL"
            {...listProps<{ creator: string; platform: string; embedUrl?: string }>(
              'social',
              (i) => ({
                title: i.creator,
                subtitle: i.embedUrl ? `${i.platform} · ${i.embedUrl}` : i.platform,
              }),
              (row) => {
                const [platform, ...rest] = row.subtitle.split('·').map((s) => s.trim())
                return {
                  creator: row.title,
                  platform: platform || 'YouTube',
                  embedUrl: rest.join(' · '),
                }
              },
              { creator: 'Creator', platform: 'YouTube', embedUrl: '' },
            )}
          />
        </SectionCard>

        <SectionCard title="Related Destinations">
          {relatable.length === 0 ? (
            <p className="text-[13px] text-[#9ca3af]">No other destinations to link yet.</p>
          ) : (
            <>
              <div className="flex flex-wrap gap-2">
                {relatable.map((d) => {
                  const on = (record.relatedIds || []).includes(d.id)
                  const full = (record.relatedIds || []).length >= 4
                  return (
                    <button
                      key={d.id}
                      type="button"
                      aria-pressed={on}
                      disabled={!on && full}
                      className={`rounded-full border px-3 py-1.5 text-[13px] transition-colors disabled:opacity-40 ${
                        on
                          ? 'border-[#31542a] bg-[#31542a] text-white'
                          : 'border-[#e5e7eb] bg-[#fafafa] hover:border-[#31542a]'
                      }`}
                      onClick={() =>
                        setRecord((r) => {
                          const ids = r.relatedIds || []
                          const nextIds = on ? ids.filter((id) => id !== d.id) : [...ids, d.id]
                          const names = relatable
                            .filter((x) => nextIds.includes(x.id))
                            .map((x) => x.name)
                          return { ...r, relatedIds: nextIds, related: names }
                        })
                      }
                    >
                      {on ? '✓ ' : ''}
                      {d.name}
                    </button>
                  )
                })}
              </div>
              <p className="text-[13px] text-[#9ca3af]">
                Pick up to 4. {(record.relatedIds || []).length}/4 selected.
              </p>
            </>
          )}
        </SectionCard>

        <SectionCard title="Frequently Asked Questions">
          <RepeatList
            addLabel="Add FAQ"
            titlePlaceholder="Question"
            subtitlePlaceholder="Answer"
            subtitleMultiline
            {...listProps<{ question: string; answer: string }>(
              'faqs',
              (i) => ({ title: i.question, subtitle: i.answer }),
              (row) => ({ question: row.title, answer: row.subtitle }),
              { question: 'New question?', answer: '' },
            )}
          />
        </SectionCard>

        <p className="pb-10 text-center text-[13px] text-[#9ca3af]">
          Saves to Payload ·{' '}
          {record.slug ? (
            <Link href={`/destinations/${record.slug}`} className="underline">
              View public page
            </Link>
          ) : (
            'publish to view public page'
          )}
        </p>
      </div>

      <ConfirmDialog
        open={confirmDiscard}
        danger
        title="Discard unsaved changes?"
        body="Your edits since the last save will be lost."
        confirmLabel="Discard"
        onConfirm={() => router.push('/cms')}
        onCancel={() => setConfirmDiscard(false)}
      />

      {toast ? (
        <Toast kind={toast.kind} autoDismissMs={toast.kind === 'error' ? 6000 : 3500} onDismiss={() => setToast(null)}>
          {toast.text}
        </Toast>
      ) : null}
    </div>
  )
}
