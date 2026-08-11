import type { CollectionConfig } from 'payload'
import { isAdmin, isEditor } from '@/access'

/**
 * Messages from the public contact form.
 *
 * Writes come exclusively from `POST /api/contact`, which validates and
 * spam-screens first and then uses `overrideAccess`. `create` is closed here on
 * purpose so Payload's generic REST endpoint (`/api/contact-submissions`)
 * cannot be posted to directly, bypassing those checks.
 */
export const ContactSubmissions: CollectionConfig = {
  slug: 'contact-submissions',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['name', 'email', 'status', 'createdAt'],
    description: 'Messages sent from the contact form on the public site.',
  },
  access: {
    create: () => false,
    read: isEditor,
    update: isEditor,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'new',
      index: true,
      options: [
        { label: 'New', value: 'new' },
        { label: 'Read', value: 'read' },
        { label: 'Replied', value: 'replied' },
        { label: 'Archived', value: 'archived' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      index: true,
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
    },
    {
      name: 'meta',
      type: 'group',
      label: 'Submission details',
      admin: { description: 'Captured automatically — useful for tracing spam.' },
      fields: [
        {
          name: 'sourcePath',
          type: 'text',
          admin: { description: 'Page the form was submitted from' },
        },
        { name: 'userAgent', type: 'text' },
        {
          name: 'ip',
          type: 'text',
          admin: { description: 'From the x-forwarded-for header (Vercel sets this)' },
        },
      ],
    },
  ],
}
