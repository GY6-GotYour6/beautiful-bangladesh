import type { ReactNode } from 'react'
import { requireCmsUser } from '@/lib/cms-auth'

/** Auth-gated CMS shell — hides public chrome via SiteHeader pathname check. */
export default async function CmsLayout({ children }: { children: ReactNode }) {
  await requireCmsUser()
  return <div className="min-h-screen bg-[#f5f5f5]">{children}</div>
}
