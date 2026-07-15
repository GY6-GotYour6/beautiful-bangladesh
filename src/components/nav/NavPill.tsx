'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { getActiveNavLabel, navLinks, type NavLabel } from '@/lib/nav-config'

function linkClass(active: boolean) {
  const base =
    'relative shrink-0 whitespace-nowrap font-[family-name:var(--font-ui)] text-[16px] leading-[1.4] tracking-[-0.48px] not-italic outline-none transition-colors focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f8ff98]'
  if (active) {
    return `${base} font-medium text-[#f8ff98]`
  }
  return `${base} font-normal text-white hover:text-[#f8ff98]/85`
}

/** Desktop nav pill — Designs `428:407`. */
export function NavPill() {
  const pathname = usePathname()
  const active = getActiveNavLabel(pathname)

  return (
    <nav
      className="relative flex h-[48px] shrink-0 content-stretch items-center rounded-[58px] bg-[#31542a] px-[24px]"
      data-node-id="428:407"
      aria-label="Primary"
    >
      <div
        className="relative flex shrink-0 content-stretch items-center gap-[36px]"
        data-node-id="428:408"
      >
        {navLinks.map((link) => {
          const isActive = active === link.label
          return (
            <Link
              key={link.label}
              href={link.href}
              className={linkClass(isActive)}
              aria-current={isActive ? 'page' : undefined}
              data-nav-label={link.label as NavLabel}
            >
              {link.label}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
