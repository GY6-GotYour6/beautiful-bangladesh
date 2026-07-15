import Link from 'next/link'

const SIZE = {
  sm: {
    label: 'Check Out Reels',
    className: 'h-10 gap-2 px-4 text-[16px]',
    chevron: 16,
  },
  lg: {
    label: 'Explore More Reels',
    className: 'h-14 gap-2.5 px-5 text-[20px]',
    chevron: 20,
  },
} as const

export type CtaButtonSize = keyof typeof SIZE

type Props = {
  href?: string
  label?: string
  size?: CtaButtonSize
  className?: string
}

/**
 * Site CTA — lime fill, green type, pill shape (matches nav language).
 * Hover inverts to green + lime.
 */
export function CtaButton({
  href = '/#creator-reels',
  label,
  size = 'lg',
  className = '',
}: Props) {
  const s = SIZE[size]
  const text = label ?? s.label

  return (
    <Link
      href={href}
      aria-label={text}
      className={[
        'cta-btn inline-flex shrink-0 items-center justify-center rounded-full',
        'bg-[#f8ff98] font-[family-name:var(--font-body)] font-medium leading-none text-[#31542a]',
        'outline-none',
        s.className,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <span className="whitespace-nowrap">{text}</span>
      <svg
        width={s.chevron}
        height={s.chevron}
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden
        className="shrink-0"
      >
        <path
          d="M6 3.5L10.5 8L6 12.5"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Link>
  )
}
