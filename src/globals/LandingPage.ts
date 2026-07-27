import type { GlobalConfig } from 'payload'
import { isEditor } from '@/access'

export const LandingPageGlobal: GlobalConfig = {
  slug: 'landing-page',
  access: {
    read: () => true,
    update: isEditor,
  },
  hooks: {
    afterChange: [
      async () => {
        try {
          const { revalidatePath } = await import('next/cache')
          revalidatePath('/')
        } catch {
          // Outside Next request context
        }
      },
    ],
  },
  fields: [
    {
      name: 'featuredDestinations',
      type: 'array',
      maxRows: 4,
      fields: [
        { name: 'name', type: 'text', required: true },
        {
          name: 'slug',
          type: 'text',
          required: true,
          admin: { description: 'Destination slug — e.g. coxs-bazar → /destinations/coxs-bazar' },
        },
        {
          name: 'imagePath',
          type: 'text',
          required: true,
          admin: { description: 'Image path — e.g. /landing/destinations/coxs-bazar.webp' },
        },
        { name: 'description', type: 'textarea' },
      ],
    },
    {
      name: 'featuredCreators',
      type: 'array',
      fields: [
        { name: 'name', type: 'text', required: true },
        {
          name: 'imagePath',
          type: 'text',
          required: true,
          admin: { description: 'Image path — e.g. /landing/creators/creator-1.jpg' },
        },
        { name: 'instagramUrl', type: 'text' },
      ],
    },
  ],
}
