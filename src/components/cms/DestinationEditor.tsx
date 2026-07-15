'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'
import type { CmsDestinationRecord } from '@/lib/cms-data'
import { toPayloadData } from '@/lib/destination-dto'
import {
  AddRowButton,
  CmsTopBar,
  Field,
  RepeatList,
  SectionCard,
  SelectField,
  StatusBadge,
  TextInput,
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

export function DestinationEditor({
  initial,
  isNew = false,
}: {
  initial: CmsDestinationRecord
  isNew?: boolean
}) {
  const router = useRouter()
  const fileRef = useRef<HTMLInputElement>(null)
  const galleryRef = useRef<HTMLInputElement>(null)
  const [record, setRecord] = useState(initial)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const published = record.status === 'published'

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
    setSaving(true)
    setError(null)
    setMessage(null)
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
      setRecord((r) => ({ ...r, id: doc.id, slug: doc.slug || slug, status }))
      setMessage(status === 'published' ? 'Published' : 'Draft saved')
      router.refresh()
      if (isCreate && doc.slug) {
        router.replace(`/cms/destinations/${doc.slug}`)
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Save failed')
    } finally {
      setSaving(false)
    }
  }

  async function onHeroFile(file: File | null) {
    if (!file) return
    try {
      const uploaded = await uploadMedia(file, record.name || 'Hero image')
      setRecord((r) => ({ ...r, heroImage: uploaded.url, heroImageId: uploaded.id }))
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Upload failed')
    }
  }

  async function onGalleryFile(file: File | null) {
    if (!file) return
    try {
      const uploaded = await uploadMedia(file, `${record.name || 'Gallery'} photo`)
      setRecord((r) => ({
        ...r,
        gallery: [...(r.gallery || []), uploaded.url],
        galleryIds: [...(r.galleryIds || []), uploaded.id],
      }))
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Upload failed')
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
          </>
        }
        actions={
          <>
            <Link
              href="/cms"
              className="rounded-lg border border-[#e5e7eb] bg-white px-3 py-2.5 text-[14px] font-semibold text-[#4b5563] md:px-4"
            >
              Discard
            </Link>
            <button
              type="button"
              disabled={saving}
              className="rounded-lg border border-[#e5e7eb] bg-white px-3 py-2.5 text-[14px] font-semibold text-[#132110] disabled:opacity-50 md:px-4"
              onClick={() => void save('draft')}
            >
              Save Draft
            </button>
            <button
              type="button"
              disabled={saving}
              className="rounded-lg bg-[#31542a] px-3 py-2.5 text-[14px] font-semibold text-white disabled:opacity-50 md:px-5"
              onClick={() => void save('published')}
            >
              Update Item
            </button>
          </>
        }
      />

      <div className="mx-auto flex w-full max-w-[800px] flex-col gap-6 px-4 py-8 md:px-0 md:py-14">
        {message ? (
          <p className="rounded-lg bg-[rgba(49,84,42,0.1)] px-4 py-3 text-[14px] font-medium text-[#31542a]">
            {message}
          </p>
        ) : null}
        {error ? (
          <p className="rounded-lg bg-[#fef2f2] px-4 py-3 text-[14px] font-medium text-[#b91c1c]">
            {error}
          </p>
        ) : null}

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
            <div className="flex h-[240px] flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed border-[#e5e7eb] bg-[#f9fafb] p-6">
              {record.heroImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={record.heroImage}
                  alt=""
                  className="h-[100px] w-[160px] rounded-lg object-cover"
                />
              ) : (
                <p className="text-[13px] text-[#9ca3af]">No image yet</p>
              )}
              <div className="flex gap-3">
                <button
                  type="button"
                  className="rounded-md border border-[#e5e7eb] bg-white px-3 py-2 text-[13px] font-semibold"
                  onClick={() => fileRef.current?.click()}
                >
                  Replace Image
                </button>
                <button
                  type="button"
                  className="rounded-md bg-[#fef2f2] px-3 py-2 text-[13px] font-semibold text-[#ef4444]"
                  onClick={() =>
                    setRecord((r) => ({ ...r, heroImage: '', heroImageId: null }))
                  }
                >
                  Remove
                </button>
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
            <div className="overflow-hidden rounded-lg border border-[#e5e7eb]">
              <textarea
                className="min-h-[160px] w-full bg-[#fafafa] p-4 text-[15px] leading-relaxed text-[#132110] outline-none"
                value={record.overviewDescription}
                onChange={(e) => patch('overviewDescription', e.target.value)}
              />
            </div>
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
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {(record.gallery || []).map((src, i) => (
              <div key={`${src}-${i}`} className="relative aspect-[4/3] overflow-hidden rounded-lg">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="" className="size-full object-cover" />
                <button
                  type="button"
                  className="absolute top-1 right-1 rounded bg-white/90 px-2 py-0.5 text-[11px] font-semibold"
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
            label="Add Gallery Photo"
            onClick={() => galleryRef.current?.click()}
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
            items={record.foods.map((i) => ({ title: i.title, subtitle: i.description }))}
            addLabel="Add Food Item"
            onChange={(index, next) =>
              setRecord((r) => {
                const foods = [...r.foods]
                foods[index] = { title: next.title, description: next.subtitle }
                return { ...r, foods }
              })
            }
            onAdd={() =>
              setRecord((r) => ({
                ...r,
                foods: [...r.foods, { title: 'New food', description: '' }],
              }))
            }
            onRemove={(index) =>
              setRecord((r) => ({ ...r, foods: r.foods.filter((_, i) => i !== index) }))
            }
          />
        </SectionCard>

        <SectionCard title="Sub Destinations Nearby">
          <RepeatList
            items={record.subDestinations.map((i) => ({ title: i.title, subtitle: i.description }))}
            addLabel="Add Sub-Destination"
            onChange={(index, next) =>
              setRecord((r) => {
                const subDestinations = [...r.subDestinations]
                subDestinations[index] = { title: next.title, description: next.subtitle }
                return { ...r, subDestinations }
              })
            }
            onAdd={() =>
              setRecord((r) => ({
                ...r,
                subDestinations: [...r.subDestinations, { title: 'New spot', description: '' }],
              }))
            }
            onRemove={(index) =>
              setRecord((r) => ({
                ...r,
                subDestinations: r.subDestinations.filter((_, i) => i !== index),
              }))
            }
          />
        </SectionCard>

        <SectionCard title="Heritage & Culture">
          <RepeatList
            items={record.cultureItems.map((i) => ({ title: i.title, subtitle: i.description }))}
            addLabel="Add Item"
            onChange={(index, next) =>
              setRecord((r) => {
                const cultureItems = [...r.cultureItems]
                cultureItems[index] = { title: next.title, description: next.subtitle }
                return { ...r, cultureItems }
              })
            }
            onAdd={() =>
              setRecord((r) => ({
                ...r,
                cultureItems: [...r.cultureItems, { title: 'New item', description: '' }],
              }))
            }
            onRemove={(index) =>
              setRecord((r) => ({
                ...r,
                cultureItems: r.cultureItems.filter((_, i) => i !== index),
              }))
            }
          />
        </SectionCard>

        <SectionCard title="What's Happening Around">
          <RepeatList
            items={record.events.map((i) => ({ title: i.title, subtitle: i.date }))}
            addLabel="Add Item"
            subtitlePlaceholder="Date"
            onChange={(index, next) =>
              setRecord((r) => {
                const events = [...r.events]
                events[index] = { title: next.title, date: next.subtitle }
                return { ...r, events }
              })
            }
            onAdd={() =>
              setRecord((r) => ({
                ...r,
                events: [...r.events, { title: 'New event', date: '' }],
              }))
            }
            onRemove={(index) =>
              setRecord((r) => ({ ...r, events: r.events.filter((_, i) => i !== index) }))
            }
          />
        </SectionCard>

        <SectionCard title="Highlights of Destination">
          <RepeatList
            items={record.highlights.map((i) => ({ title: i.title, subtitle: i.description }))}
            addLabel="Add Item"
            onChange={(index, next) =>
              setRecord((r) => {
                const highlights = [...r.highlights]
                highlights[index] = { title: next.title, description: next.subtitle }
                return { ...r, highlights }
              })
            }
            onAdd={() =>
              setRecord((r) => ({
                ...r,
                highlights: [...r.highlights, { title: 'New highlight', description: '' }],
              }))
            }
            onRemove={(index) =>
              setRecord((r) => ({
                ...r,
                highlights: r.highlights.filter((_, i) => i !== index),
              }))
            }
          />
        </SectionCard>

        <SectionCard title="Viral Travel Contents">
          <RepeatList
            items={record.social.map((i) => ({
              title: i.creator,
              subtitle: i.embedUrl ? `${i.platform} · ${i.embedUrl}` : i.platform,
            }))}
            addLabel="Add Social Content"
            titlePlaceholder="Creator"
            subtitlePlaceholder="Platform · URL"
            onChange={(index, next) =>
              setRecord((r) => {
                const social = [...r.social]
                const [platform, ...rest] = next.subtitle.split('·').map((s) => s.trim())
                social[index] = {
                  creator: next.title,
                  platform: platform || 'YouTube',
                  embedUrl: rest.join(' · '),
                }
                return { ...r, social }
              })
            }
            onAdd={() =>
              setRecord((r) => ({
                ...r,
                social: [...r.social, { creator: 'Creator', platform: 'YouTube', embedUrl: '' }],
              }))
            }
            onRemove={(index) =>
              setRecord((r) => ({ ...r, social: r.social.filter((_, i) => i !== index) }))
            }
          />
        </SectionCard>

        <SectionCard title="Related Destinations">
          <div className="flex flex-wrap gap-2">
            {record.related.map((name) => (
              <span
                key={name}
                className="rounded-full border border-[#e5e7eb] bg-[#fafafa] px-3 py-1.5 text-[13px]"
              >
                {name}
              </span>
            ))}
          </div>
          <p className="text-[13px] text-[#9ca3af]">
            Link related destinations from Payload Admin → Destinations → Related, or seed stubs.
          </p>
        </SectionCard>

        <SectionCard title="Frequently Asked Questions">
          {record.faqs.map((item, i) => (
            <div
              key={`faq-${i}`}
              className="space-y-2 rounded-lg border border-[#e5e7eb] bg-[#fafafa] p-4"
            >
              <TextInput
                value={item.question}
                onChange={(v) =>
                  setRecord((r) => {
                    const faqs = [...r.faqs]
                    faqs[i] = { ...faqs[i], question: v }
                    return { ...r, faqs }
                  })
                }
              />
              <TextInput
                value={item.answer}
                multiline
                onChange={(v) =>
                  setRecord((r) => {
                    const faqs = [...r.faqs]
                    faqs[i] = { ...faqs[i], answer: v }
                    return { ...r, faqs }
                  })
                }
              />
              <button
                type="button"
                className="text-[13px] font-semibold text-[#b91c1c]"
                onClick={() =>
                  setRecord((r) => ({ ...r, faqs: r.faqs.filter((_, idx) => idx !== i) }))
                }
              >
                Remove FAQ
              </button>
            </div>
          ))}
          <AddRowButton
            label="Add FAQ"
            onClick={() =>
              setRecord((r) => ({
                ...r,
                faqs: [...r.faqs, { question: 'New question?', answer: '' }],
              }))
            }
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
    </div>
  )
}
