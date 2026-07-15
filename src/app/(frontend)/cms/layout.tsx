import type { ReactNode } from 'react'

/** CMS shell — auth is enforced per-page so /cms/structure can build without Payload. */
export default function CmsLayout({ children }: { children: ReactNode }) {
  return <div className="min-h-screen bg-[#f5f5f5]">{children}</div>
}
