import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy | Beautiful Bangladesh',
  description: 'How Beautiful Bangladesh handles your information.',
}

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-2xl px-6 py-16 text-[#132110]">
      <p className="text-sm text-[#31542a]/70">
        <Link href="/" className="underline-offset-2 hover:underline">
          Home
        </Link>
      </p>
      <h1 className="mt-4 font-[family-name:var(--font-body)] text-3xl font-semibold tracking-tight text-[#31542a]">
        Privacy Policy
      </h1>
      <p className="mt-6 text-[17px] leading-relaxed text-[#132110]/80">
        Beautiful Bangladesh may collect limited information you choose to share (for example when
        using search or contacting us) to improve the experience. We do not sell personal data. This
        page will be updated as the product grows.
      </p>
    </article>
  )
}
