import type { CollectionConfig } from 'payload'
import { isEditor } from '@/access'

const webp = { format: 'webp' as const, options: { quality: 80 } }

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    useAsTitle: 'alt',
  },
  access: {
    read: () => true,
    create: isEditor,
    update: isEditor,
    delete: isEditor,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: {
    mimeTypes: ['image/*'],
    adminThumbnail: 'thumbnail',
    focalPoint: true,
    imageSizes: [
      { name: 'thumbnail', width: 480, formatOptions: webp },
      { name: 'card', width: 800, formatOptions: webp },
      { name: 'hero', width: 1600, formatOptions: webp },
    ],
  },
}
