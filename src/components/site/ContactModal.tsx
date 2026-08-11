'use client'

import { useCallback, useEffect, useId, useRef, useState, type FormEvent } from 'react'
import { createPortal } from 'react-dom'

const GREEN = '#31542a'
const LIME = '#f8ff98'

type Props = {
  open: boolean
  onClose: () => void
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <path
        d="M4 4l10 10M14 4L4 14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

function Field({
  id,
  name,
  label,
  type = 'text',
  rows,
  disabled,
}: {
  id: string
  /** Stable form key. `id` comes from useId() (":r1:") and is useless as a name. */
  name: string
  label: string
  type?: string
  rows?: number
  disabled?: boolean
}) {
  const base =
    'w-full rounded-[12px] border bg-white/5 px-[14px] py-[11px] font-[family-name:var(--font-ui)] text-[15px] leading-[1.4] text-white outline-none transition-colors placeholder:text-white/35 focus:bg-white/10'

  return (
    <label htmlFor={id} className="flex flex-col gap-[6px]">
      <span className="font-[family-name:var(--font-ui)] text-[13px] font-medium tracking-[0.02em] text-[#f8ff98]">
        {label}
      </span>
      {rows ? (
        <textarea
          id={id}
          name={name}
          rows={rows}
          required
          disabled={disabled}
          className={`${base} resize-none`}
          style={{ borderColor: 'rgba(248,255,152,0.28)' }}
          onFocus={(e) => (e.currentTarget.style.borderColor = LIME)}
          onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(248,255,152,0.28)')}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          required
          disabled={disabled}
          className={base}
          style={{ borderColor: 'rgba(248,255,152,0.28)' }}
          onFocus={(e) => (e.currentTarget.style.borderColor = LIME)}
          onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(248,255,152,0.28)')}
        />
      )}
    </label>
  )
}

/**
 * Contact popup — brand green panel with lime accents, matching the CTA and
 * nav button language. Shared by the desktop hero nav and the mobile hero.
 *
 * Submits to `POST /api/contact`, which stores the message as a
 * `contact-submissions` doc readable in /cms. No email is sent yet.
 */
export function ContactModal({ open, onClose }: Props) {
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  /** When the form became visible — used to reject implausibly fast submits. */
  const openedAt = useRef(0)
  // Starts false so SSR and first client render agree; the portal target only
  // exists after mount.
  const [mounted, setMounted] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const titleId = useId()
  const nameId = useId()
  const emailId = useId()
  const messageId = useId()
  const honeypotId = useId()

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
    panelRef.current?.querySelector<HTMLElement>('input, textarea, button')?.focus()
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = prev
    }
  }, [open, onKeyDown])

  // Reset back to the form the next time it opens.
  useEffect(() => {
    if (open) {
      openedAt.current = Date.now()
      return
    }
    // Resets the success view on close. The modal returns null at that point,
    // so the extra render is not observable and there is no cascade.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSent(false)
    setError(null)
  }, [open])

  // Deliberate mount guard: this modal portals into document.body, which only
  // exists on the client. Rendering it during SSR/first paint causes a
  // hydration mismatch, so the flag must flip after mount, not during render.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), [])

  if (!open || !mounted) return null

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (sending) return

    const form = new FormData(e.currentTarget)
    setSending(true)
    setError(null)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.get('name'),
          email: form.get('email'),
          message: form.get('message'),
          company: form.get('company'), // honeypot — humans never fill this
          elapsedMs: Date.now() - openedAt.current,
          sourcePath: window.location.pathname,
        }),
      })

      if (!res.ok) {
        const json = (await res.json().catch(() => null)) as { error?: string } | null
        throw new Error(json?.error || 'Could not send your message. Please try again.')
      }

      setSent(true)
    } catch (err) {
      // Keep the filled-in form mounted so nothing typed is lost on failure.
      setError(err instanceof Error ? err.message : 'Could not send your message.')
    } finally {
      setSending(false)
    }
  }

  // Portalled to body: the desktop hero nav is a transformed, overflow-hidden
  // pill, which would otherwise become the containing block and clip this.
  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-[16px]">
      <button
        type="button"
        aria-label="Close contact form"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-[#132110]/60 backdrop-blur-[2px]"
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative flex w-[min(560px,100%)] max-h-[calc(100dvh-32px)] flex-col overflow-y-auto rounded-[24px] px-[24px] py-[28px] shadow-[0_24px_60px_rgba(0,0,0,0.35)] sm:px-[36px] sm:py-[36px]"
        style={{ backgroundColor: GREEN }}
      >
        {/* Lime hairline echoing the button border language */}
        <div
          className="pointer-events-none absolute inset-0 rounded-[24px]"
          style={{ border: `1.5px solid rgba(248,255,152,0.35)` }}
          aria-hidden
        />

        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-[18px] top-[18px] flex size-[32px] items-center justify-center rounded-full text-[#f8ff98] transition-colors hover:bg-[#f8ff98] hover:text-[#31542a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f8ff98]"
        >
          <CloseIcon />
        </button>

        {sent ? (
          <div className="flex flex-col items-center gap-[10px] py-[28px] text-center">
            <div
              className="flex size-[52px] items-center justify-center rounded-full"
              style={{ backgroundColor: LIME, color: GREEN }}
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M5 12.5l4.5 4.5L19 7.5"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h2
              id={titleId}
              className="font-[family-name:var(--font-body)] text-[26px] font-medium text-white"
            >
              Message sent
            </h2>
            <p className="font-[family-name:var(--font-ui)] text-[15px] leading-[1.5] text-white/75">
              Thanks for reaching out — we&rsquo;ll get back to you shortly.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-[10px] inline-flex h-[44px] items-center justify-center rounded-full px-[24px] font-[family-name:var(--font-body)] text-[16px] font-medium transition-opacity hover:opacity-85"
              style={{ backgroundColor: LIME, color: GREEN }}
            >
              Done
            </button>
          </div>
        ) : (
          <>
            <h2
              id={titleId}
              className="font-[family-name:var(--font-body)] text-[28px] leading-[1.15] font-medium text-white sm:text-[32px]"
            >
              Get in{' '}
              <span className="font-[family-name:var(--font-script)] font-bold text-[#f8ff98]">
                touch
              </span>
            </h2>
            <p className="mt-[6px] font-[family-name:var(--font-ui)] text-[14px] leading-[1.5] text-white/70">
              Planning a trip or working on something together? Send us a note.
            </p>

            <form onSubmit={handleSubmit} className="mt-[22px] flex flex-col gap-[14px]">
              <Field id={nameId} name="name" label="Name" disabled={sending} />
              <Field id={emailId} name="email" label="Email" type="email" disabled={sending} />
              <Field id={messageId} name="message" label="Message" rows={4} disabled={sending} />

              {/* Honeypot. Hidden from sight and from assistive tech, and skipped
                  in the tab order — only a bot ever fills it in. */}
              <div className="absolute left-[-9999px]" aria-hidden="true">
                <label htmlFor={honeypotId}>Company</label>
                <input
                  id={honeypotId}
                  name="company"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              {error ? (
                <p
                  role="alert"
                  className="rounded-[10px] px-[12px] py-[9px] font-[family-name:var(--font-ui)] text-[14px] leading-[1.45] text-white"
                  style={{ backgroundColor: 'rgba(255,120,110,0.18)', border: '1px solid rgba(255,150,140,0.5)' }}
                >
                  {error}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={sending}
                className="mt-[6px] inline-flex h-[48px] items-center justify-center gap-[8px] rounded-full font-[family-name:var(--font-body)] text-[17px] font-medium transition-opacity hover:opacity-85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f8ff98] disabled:cursor-not-allowed disabled:opacity-60"
                style={{ backgroundColor: LIME, color: GREEN }}
              >
                {sending ? 'Sending…' : 'Send message'}
                {sending ? null : (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                    <path
                      d="M6 3.5L10.5 8L6 12.5"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>,
    document.body,
  )
}
