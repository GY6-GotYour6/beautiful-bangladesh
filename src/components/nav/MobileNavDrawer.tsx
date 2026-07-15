'use client'

import Link from 'next/link'
import { useCallback, useEffect, useId, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { getActiveNavLabel, navLinks } from '@/lib/nav-config'

type Props = {
  open: boolean
  onClose: () => void
  panelId: string
}

/** Engineering-derived drawer — no Figma open state. */
export function MobileNavDrawer({ open, onClose, panelId }: Props) {
  const pathname = usePathname()
  const active = getActiveNavLabel(pathname)
  const panelRef = useRef<HTMLDivElement>(null)
  const titleId = useId()

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    },
    [onClose],
  )

  useEffect(() => {
    if (!open) return
    document.addEventListener('keydown', onKeyDown)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    panelRef.current?.querySelector<HTMLElement>('a')?.focus()
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = prev
    }
  }, [open, onKeyDown])

  if (!open) return null

  return (
    <>
      <button
        type="button"
        className="fixed inset-0 z-40 bg-black/30"
        aria-label="Close menu"
        onClick={onClose}
      />
      <div
        ref={panelRef}
        id={panelId}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="fixed z-50 flex w-[min(358px,calc(100vw-32px))] flex-col gap-[14px] rounded-[24px] bg-[#31542a] p-5 text-white"
        style={{
          top: `calc(${68}px * var(--nav-mobile-scale, 1) + 8px)`,
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        <p id={titleId} className="sr-only">
          Site navigation
        </p>
        {navLinks.map((link) => {
          const isActive = active === link.label
          return (
            <Link
              key={link.label}
              href={link.href}
              onClick={onClose}
              className={`font-[family-name:var(--font-ui)] text-[16px] leading-[1.4] outline-none focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f8ff98] ${
                isActive ? 'font-medium text-[#f8ff98]' : 'font-normal text-white'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              {link.label}
            </Link>
          )
        })}
      </div>
    </>
  )
}
