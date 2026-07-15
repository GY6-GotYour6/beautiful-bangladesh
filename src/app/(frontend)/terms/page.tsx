import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Service | Beautiful Bangladesh',
  description: 'Terms for using Beautiful Bangladesh.',
}

export default function TermsPage() {
  return (
    <article className="mx-auto max-w-2xl px-6 py-16 text-[#132110]">
      <p className="text-sm text-[#31542a]/70">
        <Link href="/" className="underline-offset-2 hover:underline">
          Home
        </Link>
      </p>
      <h1 className="mt-4 font-[family-name:var(--font-body)] text-3xl font-semibold tracking-tight text-[#31542a]">
        Terms of Service
      </h1>
      <p className="mt-6 text-[17px] leading-relaxed text-[#132110]/80">
        By using Beautiful Bangladesh you agree to use the site lawfully and respectfully. Destination
        and creator content is provided for inspiration; always verify travel details before you go.
        These terms may be updated as the product grows.
      </p>
    </article>
  )
}
