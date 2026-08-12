'use client'

import Link from 'next/link'
import { useCallback, useEffect, useId, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { getActiveNavLabel, navLinks } from '@/lib/nav-config'

type Props = {
  open: boolean
  onClose: () => void
  panelId: string
  /** Opens the contact modal — owned by `MobileSiteHeader` so it survives this drawer closing. */
  onContact: () => void
}

/** Engineering-derived drawer — no Figma open state. */
export function MobileNavDrawer({ open, onClose, panelId, onContact }: Props) {
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
        className="pointer-events-auto fixed inset-0 z-40 bg-black/30"
        aria-label="Close menu"
        onClick={onClose}
      />
      <div
        ref={panelRef}
        id={panelId}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="pointer-events-auto fixed z-50 flex w-[min(358px,calc(100vw-32px))] flex-col gap-[14px] rounded-[24px] bg-[#31542a] p-5 text-white"
        style={{
          top: 62,
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

        {/* Same button language as the desktop hero nav — lime fill, green
            border and type — sized for the 390 artboard. */}
        <button
          type="button"
          onClick={() => {
            onClose()
            onContact()
          }}
          className="mt-[2px] flex h-[38px] w-fit shrink-0 cursor-pointer items-center gap-[6px] rounded-full border-2 border-[#31542a] bg-[#f8ff98] px-[14px] font-[family-name:var(--font-body)] text-[14px] leading-[1.4] font-medium text-[#31542a] transition-opacity hover:opacity-80"
        >
          Contact Us
          <svg width={14} height={14} viewBox="0 0 16 16" fill="none" aria-hidden>
            <path
              d="M6 3l5 5-5 5"
              stroke="#31542a"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </>
  )
}
