import Link from 'next/link'

type Props = {
  href: string
  label: string
  /** 'desktop' = 169px, 'mobile' = 162px — matches Figma spec */
  size?: 'desktop' | 'mobile'
  className?: string
}

/** Lime-yellow pill CTA — Figma `428:429` (desktop) / `428:155` (mobile). */
export function PrimaryButton({ href, label, size = 'desktop', className }: Props) {
  return (
    <Link
      href={href}
      className={[
        'inline-flex h-10 items-center justify-center gap-[10px] rounded-full bg-[#f8ff98] px-3',
        'font-[family-name:var(--font-ui)] text-[16px] leading-[1.4] text-[#31542a]',
        'transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#31542a]',
        size === 'desktop' ? 'w-[169px]' : 'w-[162px]',
        className ?? '',
      ].join(' ')}
    >
      {label}
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M6 3l5 5-5 5" stroke="#31542a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </Link>
  )
}
