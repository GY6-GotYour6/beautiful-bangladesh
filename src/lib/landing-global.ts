import 'server-only'
import { unstable_cache } from 'next/cache'
import { getPayloadClient } from '@/lib/payload'

export type LandingDestination = {
  name: string
  slug: string
  imagePath: string
  description: string
}

export type LandingCreator = {
  name: string
  imagePath: string
  instagramUrl: string
}

export type LandingPageData = {
  featuredDestinations: LandingDestination[]
  /**
   * Destinations that genuinely came from the CMS — never back-filled with
   * defaults. Empty when nothing is published (or on error/timeout), so
   * consumers can render nothing at all. `featuredDestinations` keeps its
   * defaults fallback for the desktop section.
   */
  cmsDestinations: LandingDestination[]
  featuredCreators: LandingCreator[]
}

const DEFAULT_DESTINATIONS: LandingDestination[] = [
  {
    name: 'Cox Bazar',
    slug: '/destinations/coxs-bazar',
    imagePath: '/landing/destinations/coxs-bazar.webp',
    description: "World's longest natural sea beach — 120 km of golden sands along the Bay of Bengal.",
  },
  {
    name: 'Sylhet',
    slug: '/destinations/sylhet',
    imagePath: '/landing/destinations/sylhet.webp',
    description: 'Rolling tea gardens, mystical haors, and the lush highland forests of Bangladesh.',
  },
  {
    name: 'Sundarban',
    slug: '/destinations/sundarbans',
    imagePath: '/landing/destinations/sundarbans.png',
    description: "The world's largest mangrove forest — home to the Royal Bengal Tiger and rare wildlife.",
  },
  {
    name: 'Rangamati',
    slug: '/destinations/rangamati',
    imagePath: '/landing/destinations/rangamati.png',
    description: 'Emerald hills, serene Kaptai Lake, and the rich traditions of the Chittagong Hill Tracts.',
  },
]

const DEFAULT_CREATORS: LandingCreator[] = [
  { name: '', imagePath: '/landing/creators/creator-1.jpg', instagramUrl: '' },
  { name: '', imagePath: '/landing/creators/creator-2.jpg', instagramUrl: '' },
  { name: '', imagePath: '/landing/creators/creator-3.jpg', instagramUrl: '' },
  {
    name: 'Iftekhar Rafsan',
    imagePath: '/landing/creators/creator-4.jpg',
    instagramUrl: 'https://www.instagram.com/thechotobhai/?hl=en',
  },
  { name: '', imagePath: '/landing/creators/creator-5.jpg', instagramUrl: '' },
  { name: '', imagePath: '/landing/creators/creator-6.jpg', instagramUrl: '' },
  { name: '', imagePath: '/landing/creators/creator-7.jpg', instagramUrl: '' },
]

/** How many published destinations the landing sections will show. */
const COLLECTION_LIMIT = 12

/** Hard ceiling on the CMS read. Exceeding it fails the request rather than
 *  resolving to defaults, so a slow database can never be cached as "empty". */
const FETCH_TIMEOUT_MS = 10_000

function toDestination(raw: Record<string, unknown>): LandingDestination {
  return {
    name: String(raw.name ?? ''),
    slug: String(raw.slug ?? ''),
    imagePath: String(raw.imagePath ?? ''),
    description: String(raw.description ?? ''),
  }
}

/** Prefer a card-sized render, fall back to the original upload. */
function mediaUrl(raw: unknown): string {
  if (!raw || typeof raw !== 'object') return ''
  const media = raw as Record<string, unknown>
  const sizes = media.sizes as Record<string, { url?: string } | undefined> | undefined
  return String(sizes?.card?.url ?? sizes?.hero?.url ?? media.url ?? '')
}

/**
 * Published docs from the `destinations` collection, shaped as landing cards.
 * This is what renders when nobody has curated the Landing Page global — the
 * editors add destinations in `/cms/destinations` and expect them on `/`.
 * `featured` docs sort first.
 */
async function fetchCollectionDestinations(
  payload: Awaited<ReturnType<typeof getPayloadClient>>,
): Promise<LandingDestination[]> {
  const res = await payload.find({
    collection: 'destinations',
    where: { _status: { equals: 'published' } },
    // Secondary sort keeps the order stable — Postgres does not guarantee
    // tie order among rows with the same `featured` value.
    sort: ['-featured', 'name'],
    limit: COLLECTION_LIMIT,
    depth: 1,
    overrideAccess: true,
  })

  return res.docs
    .map((doc) => {
      const raw = doc as unknown as Record<string, unknown>
      return {
        name: String(raw.name ?? ''),
        slug: String(raw.slug ?? ''),
        imagePath: mediaUrl(raw.heroImage) || mediaUrl(raw.highlightImage),
        description: String(raw.heroSubtitle ?? raw.overviewDescription ?? raw.metaDescription ?? ''),
      }
    })
    .filter((d) => {
      const ok = Boolean(d.name.trim() && d.slug.trim() && d.imagePath.trim())
      if (!ok) {
        // Silently dropping a published doc looks like "my destination vanished",
        // so say which one and why.
        console.warn(
          `[landing] skipping destination "${d.name || '(unnamed)'}" — missing ${
            !d.name.trim() ? 'name' : !d.slug.trim() ? 'slug' : 'heroImage/highlightImage'
          }`,
        )
      }
      return ok
    })
}

function toCreator(raw: Record<string, unknown>): LandingCreator {
  return {
    name: String(raw.name ?? ''),
    imagePath: String(raw.imagePath ?? ''),
    instagramUrl: String(raw.instagramUrl ?? ''),
  }
}

const DEFAULTS: LandingPageData = {
  featuredDestinations: DEFAULT_DESTINATIONS,
  cmsDestinations: [],
  featuredCreators: DEFAULT_CREATORS,
}

/**
 * Reads the CMS. Throws on failure or timeout — it must NEVER resolve to
 * `DEFAULTS`, because this function's result is what gets cached for an hour.
 * Returning a fallback here is what made Top Destinations disappear: one slow
 * cold read after a publish got stored as `cmsDestinations: []`.
 */
async function fetchLandingPageData(): Promise<LandingPageData> {
  let timer: ReturnType<typeof setTimeout> | undefined
  const timeout = new Promise<never>((_, reject) => {
    timer = setTimeout(
      () => reject(new Error(`landing CMS read exceeded ${FETCH_TIMEOUT_MS}ms`)),
      FETCH_TIMEOUT_MS,
    )
  })

  const fetch = (async () => {
    const payload = await getPayloadClient()
    const doc = await payload.findGlobal({ slug: 'landing-page', overrideAccess: true })
    const raw = doc as unknown as Record<string, unknown>

    const rawDestinations = Array.isArray(raw.featuredDestinations)
      ? (raw.featuredDestinations as Record<string, unknown>[]).map(toDestination)
      : []

    const destinations = rawDestinations.length > 0 ? rawDestinations : DEFAULT_DESTINATIONS

    // Only rows with everything a card needs count as real CMS content —
    // placeholder rows with blank fields must not render.
    const curated = rawDestinations.filter(
      (d) => d.name.trim() && d.slug.trim() && d.imagePath.trim(),
    )

    // The global is a curated override; with nothing curated, fall back to
    // the destinations collection so published docs reach the landing page.
    const cmsDestinations =
      curated.length > 0 ? curated : await fetchCollectionDestinations(payload)

    const rawCreators = Array.isArray(raw.featuredCreators)
      ? (raw.featuredCreators as Record<string, unknown>[]).map(toCreator)
      : []
    // Treat as real CMS content only when at least one creator has an instagram URL.
    // Generic placeholder rows (all empty instagramUrl) fall through to DEFAULT_CREATORS.
    const creators = rawCreators.some((c) => c.instagramUrl.trim())
      ? rawCreators
      : DEFAULT_CREATORS

    return { featuredDestinations: destinations, cmsDestinations, featuredCreators: creators }
  })()

  try {
    return await Promise.race([fetch, timeout])
  } finally {
    clearTimeout(timer)
  }
}

const getCachedLandingPageData = unstable_cache(
  fetchLandingPageData,
  ['landing-page-data'],
  { tags: ['landing-page'], revalidate: 3600 },
)

/**
 * Cached read with two guarantees the plain cache cannot give:
 *
 *  1. A failed read degrades for exactly ONE request. `unstable_cache` does not
 *     store a rejected promise, and the fallback below is applied outside it.
 *  2. An empty result is never trusted from cache. A blank Top Destinations is
 *     almost always a transient read that got frozen for the hour TTL, so we
 *     re-read live before rendering nothing. Costs an extra query only while
 *     the collection genuinely has no published destinations.
 */
export async function getLandingPageData(): Promise<LandingPageData> {
  try {
    const data = await getCachedLandingPageData()
    if (data.cmsDestinations.length > 0) return data
    return await fetchLandingPageData()
  } catch (err) {
    console.error('[landing] CMS read failed, rendering defaults for this request:', err)
    return DEFAULTS
  }
}
