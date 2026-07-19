import type { CollectionConfig } from 'payload'
import { isAdmin, isAdminField, isLoggedIn } from '@/access'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: {
    maxLoginAttempts: 5,
    lockTime: 10 * 60 * 1000,
    tokenExpiration: 60 * 60 * 24 * 7,
  },
  access: {
    read: isLoggedIn,
    create: async ({ req }) => {
      // Allow first-user bootstrap; thereafter admins only
      const { totalDocs } = await req.payload.count({
        collection: 'users',
        overrideAccess: true,
      })
      if (totalDocs === 0) return true
      return isAdmin({ req })
    },
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'editor',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
        { label: 'Viewer', value: 'viewer' },
      ],
      access: {
        update: isAdminField,
      },
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
