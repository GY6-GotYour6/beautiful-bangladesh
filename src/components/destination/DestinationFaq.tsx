'use client'

import { useState } from 'react'

/** Scale artboard px with viewport width, like the baked Figma sections. */
const vw = (px: number) => `calc(${px} / 1440 * 100vw)`

type QA = { q: string; a: string }

/** Placeholder Q&A until FAQ content is CMS-driven. */
function faqsFor(title: string): QA[] {
  return [
    {
      q: `Is ${title} safe to travel?`,
      a: `Yes, ${title} is generally safe for tourists. The local community is welcoming and tourist areas are well-monitored. It is advisable to keep your belongings secure and avoid isolated areas after dark, as you would in any travel destination.`,
    },
    {
      q: `Can I find hotels easily in ${title}?`,
      a: `Absolutely. ${title} offers stays for every budget — from simple guesthouses to full-service resorts. Booking ahead is recommended during the peak season from November to February, especially on weekends and public holidays.`,
    },
    {
      q: `What is the best time to visit ${title}?`,
      a: `The dry winter months from November to February are ideal, with cooler temperatures and clear skies. The monsoon season (June to September) brings lush green scenery but heavy rain can disrupt travel plans.`,
    },
    {
      q: `What are the must-visit places in ${title}?`,
      a: `Popular highlights include the main viewpoints, local markets, and nearby natural attractions. Plan at least two to three days to cover the essentials at a relaxed pace — local guides can help you discover lesser-known spots.`,
    },
    {
      q: `How do I get to ${title} from Dhaka?`,
      a: `Regular buses and domestic flights connect Dhaka with the region. Buses take longer but are budget-friendly, while flights get you there in under an hour. From the nearest hub, local transport covers the final stretch.`,
    },
  ]
}

function FaqItem({ item, open, onToggle }: { item: QA; open: boolean; onToggle: () => void }) {
  return (
    <div className="w-full">
      <button
        type="button"
        aria-expanded={open}
        onClick={onToggle}
        className="flex w-full items-center justify-between text-left"
        style={{ gap: vw(24), paddingBlock: vw(20) }}
      >
        <span
          className="font-[family-name:var(--font-body)] font-medium text-[#132110]"
          style={{ fontSize: vw(20) }}
        >
          {item.q}
        </span>
        <span
          className={`flex shrink-0 items-center justify-center border transition-colors ${
            open
              ? 'border-[#31542a] bg-[#31542a] text-white'
              : 'border-[#132110]/25 text-[#132110]'
          }`}
          style={{ width: vw(26), height: vw(26) }}
          aria-hidden
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            className={`transition-transform ${open ? 'rotate-90' : ''}`}
            style={{ width: vw(13), height: vw(13) }}
          >
            <path
              d="M4.5 2.5L8 6l-3.5 3.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>
      {open && (
        <p
          className="font-[family-name:var(--font-body)] text-[#132110]/50"
          style={{
            fontSize: vw(16),
            lineHeight: 1.5,
            maxWidth: vw(660),
            paddingBottom: vw(20),
          }}
        >
          {item.a}
        </p>
      )}
    </div>
  )
}

/** FAQ accordion — replaces baked Figma `466:1747`; placeholder content for now. */
export function DestinationFaq({ title }: { title: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const faqs = faqsFor(title)

  return (
    <section
      className="flex w-full bg-white"
      style={{ paddingInline: vw(80), paddingBlock: vw(80), gap: vw(115) }}
      data-node-id="466:1747"
      aria-label="Frequently asked questions"
    >
      {/* Left: heading + photo */}
      <div className="flex shrink-0 flex-col" style={{ width: vw(455), gap: vw(16) }}>
        <h2
          className="font-[family-name:var(--font-body)] font-medium text-[#132110]"
          style={{ fontSize: vw(32), letterSpacing: vw(-0.96) }}
        >
          Frequently{' '}
          <span className="font-[family-name:var(--font-script)] font-bold text-[#31542a]">
            Asked
          </span>{' '}
          Questions
        </h2>
        <p
          className="font-[family-name:var(--font-body)] text-[#132110]/60"
          style={{ fontSize: vw(14), lineHeight: 1.4 }}
        >
          A bustling port city between the sea and hills, the commercial capital of Bangladesh.
        </p>
        <div
          className="relative w-full overflow-hidden"
          style={{ marginTop: vw(16), height: vw(403), borderRadius: vw(24) }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/landing/destinations/faq-coxs-bazar.webp"
            alt={title}
            className="absolute inset-0 size-full object-cover"
            draggable={false}
          />
        </div>
      </div>

      {/* Right: accordion — top-padded so the first question's text lines up
          with the top of the photo (photo top = 132 from content top, minus
          the row's own 20 block padding) */}
      <div
        className="flex min-w-0 flex-1 flex-col divide-y-2 divide-[#31542a] self-start"
        style={{ paddingTop: vw(112) }}
      >
        {faqs.map((item, i) => (
          <FaqItem
            key={item.q}
            item={item}
            open={openIndex === i}
            onToggle={() => setOpenIndex(openIndex === i ? null : i)}
          />
        ))}
      </div>
    </section>
  )
}
