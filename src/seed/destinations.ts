/**
 * Seed admin user + Cox's Bazar (+ stub destinations).
 * Usage: npx tsx src/seed/destinations.ts
 */
import 'dotenv/config'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { getPayload } from 'payload'
import config from '../payload.config'
import { cmsDestinations, coxRecord } from '../lib/cms-data'
import type { Destination } from '@/payload-types'

type DestinationSeedData = Omit<Destination, 'id' | 'createdAt' | 'updatedAt'>

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '../..')

async function ensureAdmin(payload: Awaited<ReturnType<typeof getPayload>>) {
  const existing = await payload.find({
    collection: 'users',
    limit: 1,
    overrideAccess: true,
  })
  if (existing.totalDocs > 0) {
    console.log('Admin user already exists')
    return
  }
  await payload.create({
    collection: 'users',
    data: {
      email: 'admin@beautifulbangladesh.com',
      password: 'changeme123',
      role: 'admin',
    },
    overrideAccess: true,
  })
  console.log('Created admin@beautifulbangladesh.com / changeme123')
}

async function uploadLocal(
  payload: Awaited<ReturnType<typeof getPayload>>,
  relativePath: string,
  alt: string,
) {
  const absolute = path.join(root, 'public', relativePath.replace(/^\//, ''))
  if (!fs.existsSync(absolute)) {
    console.warn('Missing file', absolute)
    return null
  }
  const media = await payload.create({
    collection: 'media',
    data: { alt },
    filePath: absolute,
    overrideAccess: true,
  })
  return media.id
}

async function upsertDestination(
  payload: Awaited<ReturnType<typeof getPayload>>,
  data: DestinationSeedData,
) {
  const slug = data.slug
  const isDraft = data._status !== 'published'
  const found = await payload.find({
    collection: 'destinations',
    where: { slug: { equals: slug } },
    limit: 1,
    draft: true,
    overrideAccess: true,
  })
  if (found.docs[0]) {
    if (isDraft) {
      await payload.update({
        collection: 'destinations',
        id: found.docs[0].id,
        data,
        draft: true,
        overrideAccess: true,
      })
    } else {
      await payload.update({
        collection: 'destinations',
        id: found.docs[0].id,
        data,
        overrideAccess: true,
      })
    }
    console.log('Updated', slug)
  } else if (isDraft) {
    await payload.create({
      collection: 'destinations',
      data,
      draft: true,
      overrideAccess: true,
    })
    console.log('Created', slug)
  } else {
    await payload.create({
      collection: 'destinations',
      data,
      overrideAccess: true,
    })
    console.log('Created', slug)
  }
}

async function main() {
  const payload = await getPayload({ config })
  await ensureAdmin(payload)

  const heroId = await uploadLocal(payload, 'cms/thumbs/01.jpg', "Cox's Bazar hero")
  const galleryIds: (number | string)[] = []
  for (const thumb of ['02.jpg', '03.jpg', '04.jpg', '05.jpg']) {
    const id = await uploadLocal(payload, `cms/thumbs/${thumb}`, `Gallery ${thumb}`)
    if (id) galleryIds.push(id)
  }

  await upsertDestination(payload, {
    name: coxRecord.name,
    slug: coxRecord.slug,
    region: coxRecord.region,
    featured: true,
    heroImage: heroId || undefined,
    heroTitle: coxRecord.heroTitle,
    heroSubtitle: coxRecord.heroSubtitle,
    location: coxRecord.location,
    travelDuration: coxRecord.travelDuration,
    experienceType: coxRecord.experienceType,
    hangoutType: coxRecord.hangoutType,
    overviewTitle: coxRecord.overviewTitle,
    overviewDescription: coxRecord.overviewDescription,
    sidebarQuote: coxRecord.sidebarQuote,
    gallery: galleryIds.slice(0, 4).map((image) => ({ image })),
    foods: coxRecord.foods,
    subDestinations: coxRecord.subDestinations,
    cultureItems: coxRecord.cultureItems,
    events: coxRecord.events,
    highlights: coxRecord.highlights,
    reels: coxRecord.social.map((s) => ({
      creator: s.creator,
      platform: s.platform,
      embedUrl: s.embedUrl || '',
    })),
    faqs: coxRecord.faqs,
    metaTitle: coxRecord.metaTitle,
    metaDescription: coxRecord.metaDescription,
    _status: 'published',
  } as DestinationSeedData)

  for (const stub of cmsDestinations) {
    if (stub.slug === 'coxs-bazar') continue
    const thumb = await uploadLocal(payload, stub.thumb, stub.name)
    await upsertDestination(payload, {
      name: stub.name,
      slug: stub.slug,
      region: stub.region,
      featured: stub.status === 'published',
      heroImage: thumb || undefined,
      heroTitle: stub.name,
      heroSubtitle: `Discover ${stub.name}`,
      location: `${stub.name}, Bangladesh`,
      travelDuration: '—',
      experienceType: 'Nature',
      hangoutType: 'Group/Couple',
      overviewTitle: stub.name,
      overviewDescription: `Explore ${stub.name} — content coming soon.`,
      sidebarQuote: '',
      foods: [],
      subDestinations: [],
      cultureItems: [],
      events: [],
      highlights: [],
      reels: [],
      faqs: [],
      _status: stub.status,
    } as DestinationSeedData)
  }

  // Wire related destinations for Cox after stubs exist
  const relatedSlugs = ['bandarban-hills', 'saint-martins-island', 'sajek-valley', 'kuakata']
  const relatedIds: number[] = []
  for (const s of relatedSlugs) {
    const found = await payload.find({
      collection: 'destinations',
      where: { slug: { equals: s } },
      limit: 1,
      draft: true,
      overrideAccess: true,
    })
    if (found.docs[0]) relatedIds.push(found.docs[0].id)
  }
  const cox = await payload.find({
    collection: 'destinations',
    where: { slug: { equals: 'coxs-bazar' } },
    limit: 1,
    draft: true,
    overrideAccess: true,
  })
  if (cox.docs[0] && relatedIds.length) {
    await payload.update({
      collection: 'destinations',
      id: cox.docs[0].id,
      data: { related: relatedIds },
      overrideAccess: true,
    })
    console.log('Linked related destinations on coxs-bazar')
  }

  console.log('Seed complete')
  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
