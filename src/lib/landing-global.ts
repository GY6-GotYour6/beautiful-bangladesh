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

function toDestination(raw: Record<string, unknown>): LandingDestination {
  return {
    name: String(raw.name ?? ''),
    slug: String(raw.slug ?? ''),
    imagePath: String(raw.imagePath ?? ''),
    description: String(raw.description ?? ''),
  }
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

async function fetchLandingPageData(): Promise<LandingPageData> {
  const timeout = new Promise<LandingPageData>((resolve) =>
    setTimeout(() => resolve(DEFAULTS), 3000),
  )

  const fetch = (async () => {
    try {
      const payload = await getPayloadClient()
      const doc = await payload.findGlobal({ slug: 'landing-page', overrideAccess: true })
      const raw = doc as unknown as Record<string, unknown>

      const rawDestinations = Array.isArray(raw.featuredDestinations)
        ? (raw.featuredDestinations as Record<string, unknown>[]).map(toDestination)
        : []

      const destinations = rawDestinations.length > 0 ? rawDestinations : DEFAULT_DESTINATIONS

      // Only rows with everything a card needs count as real CMS content —
      // placeholder rows with blank fields must not render.
      const cmsDestinations = rawDestinations.filter(
        (d) => d.name.trim() && d.slug.trim() && d.imagePath.trim(),
      )

      const rawCreators = Array.isArray(raw.featuredCreators)
        ? (raw.featuredCreators as Record<string, unknown>[]).map(toCreator)
        : []
      // Treat as real CMS content only when at least one creator has an instagram URL.
      // Generic placeholder rows (all empty instagramUrl) fall through to DEFAULT_CREATORS.
      const creators =
        rawCreators.some((c) => c.instagramUrl.trim())
          ? rawCreators
          : DEFAULT_CREATORS

      return { featuredDestinations: destinations, cmsDestinations, featuredCreators: creators }
    } catch {
      return DEFAULTS
    }
  })()

  return Promise.race([fetch, timeout])
}

export const getLandingPageData = unstable_cache(
  fetchLandingPageData,
  ['landing-page-data'],
  { tags: ['landing-page'], revalidate: 3600 },
)
