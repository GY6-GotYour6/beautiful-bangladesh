import type { Access, FieldAccess } from 'payload'

export type Role = 'admin' | 'editor' | 'viewer'

type UserWithRole = { role?: Role | null }

function userRole(user: unknown): Role | undefined {
  return (user as UserWithRole | null | undefined)?.role ?? undefined
}

/** Full access — admins only. */
export const isAdmin: Access = ({ req }) => userRole(req.user) === 'admin'

/** Content management — admins and editors. */
export const isEditor: Access = ({ req }) => {
  const role = userRole(req.user)
  return role === 'admin' || role === 'editor'
}

/** Any logged-in user (viewer and up). */
export const isLoggedIn: Access = ({ req }) => Boolean(req.user)

/** Logged-in users see everything; the public only sees published docs. */
export const publishedOrLoggedIn: Access = ({ req }) => {
  if (req.user) return true
  return { _status: { equals: 'published' } }
}

export const isAdminField: FieldAccess = ({ req }) => userRole(req.user) === 'admin'
