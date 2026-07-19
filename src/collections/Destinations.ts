import type { CollectionConfig } from 'payload'
import { isEditor, publishedOrLoggedIn } from '@/access'

const cardFields = [
  { name: 'title', type: 'text' as const, required: true },
  { name: 'description', type: 'textarea' as const },
  {
    name: 'embedUrl',
    type: 'text' as const,
    admin: { description: 'YouTube watch/embed URL' },
  },
  {
    name: 'image',
    type: 'upload' as const,
    relationTo: 'media' as const,
  },
]

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/['']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

async function revalidateDestination(slug?: string | null) {
  try {
    const { revalidatePath } = await import('next/cache')
    if (slug) revalidatePath(`/destinations/${slug}`)
    revalidatePath('/explore')
    revalidatePath('/cms')
  } catch {
    // Outside Next request context (seed / CLI)
  }
}

/** Destination details template — Figma cms-content-structure-v2 (`392:4`). */
export const Destinations: CollectionConfig = {
  slug: 'destinations',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'region', '_status', 'updatedAt'],
  },
  versions: {
    drafts: true,
  },
  access: {
    read: publishedOrLoggedIn,
    create: isEditor,
    update: isEditor,
    delete: isEditor,
  },
  hooks: {
    beforeValidate: [
      ({ data }) => {
        // Normalize slug server-side so API consumers can't create unroutable slugs
        if (data && (data.slug || data.name)) {
          data.slug = slugify(String(data.slug || data.name))
        }
        return data
      },
    ],
    afterChange: [
      async ({ doc, previousDoc }) => {
        await revalidateDestination(doc?.slug)
        if (previousDoc?.slug && previousDoc.slug !== doc?.slug) {
          await revalidateDestination(previousDoc.slug)
        }
      },
    ],
    afterDelete: [
      async ({ doc }) => {
        await revalidateDestination(doc?.slug)
      },
    ],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Basic',
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
            },
            {
              name: 'slug',
              type: 'text',
              required: true,
              unique: true,
              index: true,
              admin: { position: 'sidebar' },
            },
            {
              name: 'region',
              type: 'select',
              required: true,
              index: true,
              options: [
                'Chittagong',
                'Khulna',
                'Sylhet',
                'Barishal',
                'Dhaka',
                'Rajshahi',
                'Rangpur',
                'Mymensingh',
              ],
            },
            {
              name: 'featured',
              type: 'checkbox',
              defaultValue: false,
              index: true,
              admin: { position: 'sidebar' },
            },
            {
              name: 'metaTitle',
              type: 'text',
              admin: { description: 'SEO title override' },
            },
            {
              name: 'metaDescription',
              type: 'textarea',
              admin: { description: 'SEO description' },
            },
          ],
        },
        {
          label: 'Hero',
          fields: [
            {
              name: 'heroImage',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'heroVideoUrl',
              type: 'text',
              admin: { description: 'Hero background video embed URL (YouTube)' },
            },
            {
              name: 'heroTitle',
              type: 'text',
            },
            {
              name: 'heroSubtitle',
              type: 'textarea',
            },
          ],
        },
        {
          label: 'Overview',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'location', type: 'text', admin: { width: '50%' } },
                { name: 'travelDuration', type: 'text', admin: { width: '50%' } },
              ],
            },
            {
              type: 'row',
              fields: [
                { name: 'experienceType', type: 'text', admin: { width: '50%' } },
                {
                  name: 'hangoutType',
                  type: 'select',
                  options: ['Group/Couple', 'Solo', 'Family'],
                  admin: { width: '50%' },
                },
              ],
            },
            { name: 'overviewTitle', type: 'text' },
            { name: 'overviewDescription', type: 'textarea' },
            { name: 'sidebarQuote', type: 'textarea' },
          ],
        },
        {
          label: 'Gallery',
          fields: [
            {
              name: 'gallery',
              type: 'array',
              maxRows: 4,
              labels: { singular: 'Photo', plural: 'Photos' },
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
              ],
            },
          ],
        },
        {
          label: 'Content cards',
          fields: [
            {
              name: 'foods',
              type: 'array',
              labels: { singular: 'Food', plural: 'Foods' },
              fields: cardFields,
            },
            {
              name: 'subDestinations',
              type: 'array',
              labels: { singular: 'Spot', plural: 'Spots' },
              fields: cardFields,
            },
            {
              name: 'cultureItems',
              type: 'array',
              labels: { singular: 'Culture item', plural: 'Culture items' },
              fields: cardFields,
            },
            {
              name: 'events',
              type: 'array',
              maxRows: 4,
              fields: [
                { name: 'title', type: 'text', required: true },
                { name: 'date', type: 'text' },
                { name: 'image', type: 'upload', relationTo: 'media' },
              ],
            },
            {
              name: 'highlightImage',
              type: 'upload',
              relationTo: 'media',
              admin: { description: 'Image shown beside the highlights list' },
            },
            {
              name: 'highlights',
              type: 'array',
              fields: [
                { name: 'title', type: 'text', required: true },
                { name: 'description', type: 'textarea' },
              ],
            },
          ],
        },
        {
          label: 'Reels & related',
          fields: [
            {
              name: 'reels',
              type: 'array',
              fields: [
                { name: 'creator', type: 'text', required: true },
                {
                  name: 'platform',
                  type: 'select',
                  options: ['YouTube', 'Instagram', 'Facebook', 'TikTok'],
                },
                {
                  name: 'embedUrl',
                  type: 'text',
                  admin: { description: 'YouTube watch/embed URL preferred' },
                },
                { name: 'thumbnail', type: 'upload', relationTo: 'media' },
              ],
            },
            {
              name: 'related',
              type: 'relationship',
              relationTo: 'destinations',
              hasMany: true,
              maxDepth: 1,
              admin: {
                description: 'Up to 4 related destinations',
              },
            },
            {
              name: 'faqs',
              type: 'array',
              fields: [
                { name: 'question', type: 'text', required: true },
                { name: 'answer', type: 'textarea', required: true },
              ],
            },
          ],
        },
      ],
    },
  ],
}
