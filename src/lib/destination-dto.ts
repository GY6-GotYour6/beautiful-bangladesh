import type { CmsDestinationListItem, CmsDestinationRecord, CmsStatus } from '@/lib/cms-data'

type MediaSize = 'thumbnail' | 'card' | 'hero'

type MediaLike =
  | {
      url?: string | null
      id?: number | string
      sizes?: Partial<Record<MediaSize, { url?: string | null }>>
    }
  | number
  | string
  | null
  | undefined

/** Prefer the requested webp rendition; fall back to the original upload. */
function mediaUrl(m: MediaLike, size?: MediaSize): string {
  if (!m || typeof m !== 'object') return ''
  const sized = size ? m.sizes?.[size]?.url : undefined
  return sized || m.url || ''
}

function mediaId(m: MediaLike): number | string | null {
  if (!m) return null
  if (typeof m === 'object' && m !== null && 'id' in m && m.id != null) return m.id
  if (typeof m === 'number' || typeof m === 'string') return m
  return null
}

function toCardItem(f: { title?: string; description?: string; embedUrl?: string }) {
  return {
    title: String(f.title || ''),
    description: String(f.description || ''),
    embedUrl: String(f.embedUrl || ''),
  }
}

function countItems(doc: Record<string, unknown>): number {
  const keys = [
    'gallery',
    'foods',
    'subDestinations',
    'cultureItems',
    'events',
    'highlights',
    'reels',
    'faqs',
  ] as const
  return keys.reduce((n, k) => n + (Array.isArray(doc[k]) ? (doc[k] as unknown[]).length : 0), 0)
}

function formatModified(iso?: string | null): string {
  if (!iso) return '—'
  try {
    return new Date(iso).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  } catch {
    return '—'
  }
}

/** Map a Payload destination doc → CMS list row. */
export function toListItem(doc: Record<string, unknown>): CmsDestinationListItem {
  const status = (doc._status as CmsStatus) || 'draft'
  return {
    id: doc.id as number | string | undefined,
    slug: String(doc.slug || ''),
    name: String(doc.name || ''),
    region: String(doc.region || ''),
    status,
    items: countItems(doc),
    modified: formatModified(doc.updatedAt as string | undefined),
    thumb: mediaUrl(doc.heroImage as MediaLike, 'thumbnail') || '/cms/thumbs/01.jpg',
  }
}

/** Map a Payload destination doc → CMS editor record. */
export function toEditorRecord(doc: Record<string, unknown>): CmsDestinationRecord {
  const status = (doc._status as CmsStatus) || 'draft'
  const foods = Array.isArray(doc.foods) ? doc.foods : []
  const subDestinations = Array.isArray(doc.subDestinations) ? doc.subDestinations : []
  const cultureItems = Array.isArray(doc.cultureItems) ? doc.cultureItems : []
  const events = Array.isArray(doc.events) ? doc.events : []
  const highlights = Array.isArray(doc.highlights) ? doc.highlights : []
  const reels = Array.isArray(doc.reels) ? doc.reels : []
  const faqs = Array.isArray(doc.faqs) ? doc.faqs : []
  const gallery = Array.isArray(doc.gallery) ? doc.gallery : []
  const related = Array.isArray(doc.related) ? doc.related : []

  return {
    id: doc.id as number | string | undefined,
    slug: String(doc.slug || ''),
    name: String(doc.name || ''),
    region: String(doc.region || 'Chittagong'),
    status,
    featured: Boolean(doc.featured),
    heroImage: mediaUrl(doc.heroImage as MediaLike, 'hero') || '/cms/thumbs/01.jpg',
    heroImageId: mediaId(doc.heroImage as MediaLike),
    heroVideoUrl: String(doc.heroVideoUrl || ''),
    heroTitle: String(doc.heroTitle || doc.name || ''),
    heroSubtitle: String(doc.heroSubtitle || ''),
    location: String(doc.location || ''),
    travelDuration: String(doc.travelDuration || ''),
    experienceType: String(doc.experienceType || ''),
    hangoutType: String(doc.hangoutType || 'Group/Couple'),
    overviewTitle: String(doc.overviewTitle || ''),
    overviewDescription: String(doc.overviewDescription || ''),
    sidebarQuote: String(doc.sidebarQuote || ''),
    gallery: gallery.map((g: { image?: MediaLike }) => mediaUrl(g?.image, 'card')).filter(Boolean),
    galleryIds: gallery
      .map((g: { image?: MediaLike }) => mediaId(g?.image))
      .filter((id): id is number | string => id != null),
    foods: foods.map(toCardItem),
    subDestinations: subDestinations.map(toCardItem),
    cultureItems: cultureItems.map(toCardItem),
    events: events.map((f: { title?: string; date?: string }) => ({
      title: String(f.title || ''),
      date: String(f.date || ''),
    })),
    highlightImage: mediaUrl(doc.highlightImage as MediaLike, 'card'),
    highlightImageId: mediaId(doc.highlightImage as MediaLike),
    highlights: highlights.map((f: { title?: string; description?: string }) => ({
      title: String(f.title || ''),
      description: String(f.description || ''),
    })),
    social: reels.map((f: { creator?: string; platform?: string; embedUrl?: string }) => ({
      creator: String(f.creator || ''),
      platform: String(f.platform || 'YouTube'),
      embedUrl: String(f.embedUrl || ''),
    })),
    related: related.map((r: { name?: string; slug?: string } | number | string) => {
      if (typeof r === 'object' && r !== null) return String(r.name || r.slug || '')
      return String(r)
    }),
    relatedIds: related
      .map((r: { id?: number | string } | number | string) => {
        if (typeof r === 'object' && r !== null && r.id != null) return r.id
        if (typeof r === 'number' || typeof r === 'string') return r
        return null
      })
      .filter((id): id is number | string => id != null),
    faqs: faqs.map((f: { question?: string; answer?: string }) => ({
      question: String(f.question || ''),
      answer: String(f.answer || ''),
    })),
    metaTitle: String(doc.metaTitle || ''),
    metaDescription: String(doc.metaDescription || ''),
  }
}

/** Editor record → Payload update/create body (safe for client bundles). */
export function toPayloadData(record: CmsDestinationRecord) {
  return {
    name: record.name,
    slug: record.slug,
    region: record.region,
    featured: record.featured,
    heroImage: record.heroImageId || undefined,
    heroVideoUrl: record.heroVideoUrl || '',
    heroTitle: record.heroTitle,
    heroSubtitle: record.heroSubtitle,
    location: record.location,
    travelDuration: record.travelDuration,
    experienceType: record.experienceType,
    hangoutType: record.hangoutType,
    overviewTitle: record.overviewTitle,
    overviewDescription: record.overviewDescription,
    sidebarQuote: record.sidebarQuote,
    gallery: (record.galleryIds || []).map((id) => ({ image: id })),
    foods: record.foods,
    subDestinations: record.subDestinations,
    cultureItems: record.cultureItems,
    events: record.events,
    highlightImage: record.highlightImageId || undefined,
    highlights: record.highlights,
    reels: record.social.map((s) => ({
      creator: s.creator,
      platform: s.platform,
      embedUrl: s.embedUrl || '',
    })),
    related: record.relatedIds || [],
    faqs: record.faqs,
    metaTitle: record.metaTitle || record.heroTitle || record.name,
    metaDescription: record.metaDescription || record.heroSubtitle,
    _status: record.status,
  }
}
