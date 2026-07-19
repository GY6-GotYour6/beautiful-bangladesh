'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useRef, useState } from 'react'
import type { CmsCardItem, CmsDestinationRecord } from '@/lib/cms-data'
import { toPayloadData } from '@/lib/destination-dto'
import {
  CmsTopBar,
  ConfirmDialog,
  Field,
  SectionCard,
  SelectField,
  StatusBadge,
  TextInput,
  Toast,
  Toggle,
} from './CmsChrome'
import {
  EmbedLinkBox,
  EmbedRowList,
  FaqAccordion,
  GalleryGrid,
  HighlightRowList,
  ImageDropzone,
  ReadOnlyField,
  RelatedPicker,
  SocialRowList,
  type SocialRow,
} from './CmsEditorControls'

const regions = ['Chittagong', 'Khulna', 'Sylhet', 'Barishal', 'Dhaka', 'Rajshahi', 'Rangpur', 'Mymensingh']

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

type ArrayKey = 'foods' | 'subDestinations' | 'cultureItems' | 'highlights' | 'social' | 'faqs'

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
  const [record, setRecord] = useState(initial)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState<'hero' | 'gallery' | 'highlight' | null>(null)
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

  /** Row-list handlers (change/add/remove/move) for an array field. */
  function listOps<T>(key: ArrayKey, empty: T) {
    const set = (fn: (a: T[]) => T[]) =>
      setRecord((r) => ({ ...r, [key]: fn(r[key] as unknown as T[]) }))
    return {
      onChange: (i: number, next: T) => set((a) => a.map((item, x) => (x === i ? next : item))),
      onAdd: () => set((a) => [...a, empty]),
      onRemove: (i: number) => set((a) => a.filter((_, x) => x !== i)),
      onMove: (from: number, to: number) => set((a) => moveItem(a, from, to)),
    }
  }

  const emptyCard: CmsCardItem = { title: '', description: '', embedUrl: '' }
  const cardRows = (items: CmsCardItem[]) =>
    items.map((f) => ({ title: f.title, embedUrl: f.embedUrl || '' }))
  /** Merge an {title, embedUrl} row edit back into the full card item (description preserved). */
  function cardOps(key: 'foods' | 'subDestinations' | 'cultureItems') {
    const ops = listOps<CmsCardItem>(key, emptyCard)
    return {
      ...ops,
      onChange: (i: number, row: { title: string; embedUrl: string }) =>
        setRecord((r) => ({
          ...r,
          [key]: r[key].map((item, x) =>
            x === i ? { ...item, title: row.title, embedUrl: row.embedUrl } : item,
          ),
        })),
    }
  }

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

  function makeImageUpload(
    kind: 'hero' | 'gallery' | 'highlight',
    apply: (r: CmsDestinationRecord, uploaded: { id: number | string; url: string }) => CmsDestinationRecord,
    altFor: () => string,
  ) {
    return async (file: File | null) => {
      if (!file) return
      setUploading(kind)
      try {
        const uploaded = await uploadMedia(file, altFor())
        setRecord((r) => apply(r, uploaded))
      } catch (e) {
        setToast({ kind: 'error', text: e instanceof Error ? e.message : 'Upload failed' })
      } finally {
        setUploading(null)
      }
    }
  }

  const onHeroFile = makeImageUpload(
    'hero',
    (r, u) => ({ ...r, heroImage: u.url, heroImageId: u.id }),
    () => record.name || 'Hero image',
  )
  const onGalleryFile = makeImageUpload(
    'gallery',
    (r, u) => ({
      ...r,
      gallery: [...(r.gallery || []), u.url],
      galleryIds: [...(r.galleryIds || []), u.id],
    }),
    () => `${record.name || 'Gallery'} photo`,
  )
  const onHighlightFile = makeImageUpload(
    'highlight',
    (r, u) => ({ ...r, highlightImage: u.url, highlightImageId: u.id }),
    () => `${record.name || 'Destination'} highlight`,
  )

  return (
    <div className="min-h-screen bg-[#f5f5f5] text-[#132110]" data-node-id="618:4168">
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
              className="rounded-lg border border-[#e5e7eb] bg-white px-3 py-2.5 text-[14px] font-medium text-[#4b5563] transition-colors hover:bg-[#f9fafb] md:px-4"
              onClick={() => (dirty ? setConfirmDiscard(true) : router.push('/cms'))}
            >
              Discard
            </button>
            <button
              type="button"
              disabled={saving}
              title="Ctrl+S"
              className="rounded-lg border border-[#31542a] bg-white px-3 py-2.5 text-[14px] font-semibold text-[#31542a] transition-colors hover:bg-[rgba(49,84,42,0.06)] disabled:opacity-50 md:px-4"
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

      <div className="mx-auto flex w-full max-w-[800px] flex-col gap-6 px-4 py-8 md:px-0 md:py-10">
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
          <Field label="Hero Background Video">
            <EmbedLinkBox
              value={record.heroVideoUrl || ''}
              onChange={(v) => patch('heroVideoUrl', v)}
            />
          </Field>
          <Field label="Hero Background Image">
            <ImageDropzone
              value={record.heroImage}
              uploading={uploading === 'hero'}
              onFile={(f) => void onHeroFile(f)}
              onRemove={() => setRecord((r) => ({ ...r, heroImage: '', heroImageId: null }))}
            />
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
                options={['Group/Couple', 'Solo', 'Family']}
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

        <SectionCard title="Gallery Images" count={(record.gallery || []).length}>
          <GalleryGrid
            images={record.gallery || []}
            uploading={uploading === 'gallery'}
            onAddFile={(f) => void onGalleryFile(f)}
            onRemove={(i) =>
              setRecord((r) => ({
                ...r,
                gallery: (r.gallery || []).filter((_, idx) => idx !== i),
                galleryIds: (r.galleryIds || []).filter((_, idx) => idx !== i),
              }))
            }
          />
        </SectionCard>

        <SectionCard title="Must Try Food" count={record.foods.length}>
          <EmbedRowList
            addLabel="Add Food Item"
            items={cardRows(record.foods)}
            {...cardOps('foods')}
          />
        </SectionCard>

        <SectionCard title="Go To Destinations" count={record.subDestinations.length}>
          <EmbedRowList
            addLabel="Add Sub-Destination"
            items={cardRows(record.subDestinations)}
            {...cardOps('subDestinations')}
          />
        </SectionCard>

        <SectionCard title="Heritage & Culture" count={record.cultureItems.length}>
          <EmbedRowList
            addLabel="Add Item"
            items={cardRows(record.cultureItems)}
            {...cardOps('cultureItems')}
          />
        </SectionCard>

        <SectionCard title="Social Content" count={record.social.length}>
          <ReadOnlyField label="Section Title" value="Explore the Viral Travel Contents" />
          <SocialRowList
            items={record.social}
            {...listOps<SocialRow>('social', { creator: '', platform: 'YouTube', embedUrl: '' })}
          />
        </SectionCard>

        <SectionCard title="Highlights" count={record.highlights.length}>
          <ReadOnlyField
            label="Section Title"
            value={`Highlights of ${record.name || 'this destination'}`}
          />
          <Field label="Highlight Image">
            <ImageDropzone
              value={record.highlightImage}
              uploading={uploading === 'highlight'}
              onFile={(f) => void onHighlightFile(f)}
              onRemove={() =>
                setRecord((r) => ({ ...r, highlightImage: '', highlightImageId: null }))
              }
            />
          </Field>
          <HighlightRowList
            addLabel="Add Item"
            items={record.highlights}
            {...listOps('highlights', { title: '', description: '' })}
          />
        </SectionCard>

        <SectionCard title="Related Destinations">
          <RelatedPicker
            options={relatable}
            selectedIds={record.relatedIds || []}
            onChange={(ids) =>
              setRecord((r) => ({
                ...r,
                relatedIds: ids,
                related: relatable.filter((x) => ids.includes(x.id)).map((x) => x.name),
              }))
            }
          />
        </SectionCard>

        <SectionCard title="Frequently Asked Questions" count={record.faqs.length}>
          <FaqAccordion
            items={record.faqs}
            {...listOps('faqs', { question: '', answer: '' })}
          />
        </SectionCard>

        <SectionCard title="Final CTA">
          <ReadOnlyField label="CTA Background Image" />
          <ReadOnlyField label="CTA Title" value="BEAUTIFUL BANGLADESH" />
          <ReadOnlyField label="Button Text" value="Explore More Reels" />
          <ReadOnlyField label="Button Link" value="/reels" />
          <p className="text-[12px] text-[#9ca3af]">
            The final CTA is shared across the site and not editable per destination.
          </p>
        </SectionCard>

        <p className="pb-4 text-center text-[13px] text-[#9ca3af]">
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
