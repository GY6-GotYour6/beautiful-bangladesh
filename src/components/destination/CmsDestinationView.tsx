import Link from 'next/link'
import type { CmsCardItem, CmsDestinationRecord } from '@/lib/cms-data'
import { CtaSection } from '@/components/landing/CtaSection'
import { MobileCta } from '@/components/landing/MobileSections'
import { ResponsiveFigmaPage } from '@/components/landing/ResponsiveFigmaPage'
import {
  DESKTOP_ARTBOARD,
  DESKTOP_HERO_HEIGHT,
  DESKTOP_HERO_OFFSET,
  DESKTOP_PAGE_INSET,
  MOBILE_HEADER_CLIP,
} from '@/lib/nav-config'

const A = DESKTOP_ARTBOARD
const vw = (px: number) => `calc(${px} / ${A} * 100vw)`

// Handles: watch?v=, youtu.be/, /embed/, /shorts/, /v/
const YT_REGEX =
  /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([A-Za-z0-9_-]{11})/

function youtubeId(url: string): string | null {
  if (!url) return null
  if (/^[A-Za-z0-9_-]{11}$/.test(url.trim())) return url.trim()
  const m = url.match(YT_REGEX)
  return m?.[1] ?? null
}

function youtubeWatchUrl(embedUrl: string): string | null {
  const id = youtubeId(embedUrl)
  return id ? `https://www.youtube.com/watch?v=${id}` : null
}

const LEFT_HL_ICONS = [
  '/icons/dest/fish.svg',
  '/icons/dest/villa.svg',
  '/icons/dest/sunset.svg',
  '/icons/dest/temple.svg',
]
const RIGHT_HL_ICONS = [
  '/icons/dest/beach.svg',
  '/icons/dest/boat.svg',
  '/icons/dest/island.svg',
  '/icons/dest/mountain.svg',
]

const QUICK_INFO_ICONS = [
  '/icons/dest/location.svg',
  '/icons/dest/clock.svg',
  '/icons/dest/beach-02.svg',
  '/icons/dest/user-group.svg',
]

// ──────────────────────────────────────────────────────────────────────────────
// DESKTOP SECTIONS
// ──────────────────────────────────────────────────────────────────────────────

function DesktopHero({ record }: { record: CmsDestinationRecord }) {
  return (
    <section
      className="w-full bg-white"
      style={{
        paddingLeft: `${DESKTOP_PAGE_INSET}px`,
        paddingRight: `${DESKTOP_PAGE_INSET}px`,
        paddingTop: vw(DESKTOP_HERO_OFFSET),
      }}
    >
      <div className="relative w-full" style={{ height: vw(DESKTOP_HERO_HEIGHT) }}>
        {record.heroImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={record.heroImage}
            alt={record.heroTitle || record.name}
            className="absolute inset-0 size-full rounded-[40px_40px_0_0] object-cover"
            draggable={false}
          />
        ) : (
          <div className="absolute inset-0 rounded-[40px_40px_0_0] bg-[#132110]" />
        )}
        <div className="pointer-events-none absolute inset-0 rounded-[40px_40px_0_0] bg-gradient-to-b from-black/45 via-black/10 to-black/35" />

        {/* Title — top left */}
        <div className="absolute left-[60px] top-[100px] max-w-[580px]">
          <h1 className="font-[family-name:var(--font-body)] text-[64px] font-medium leading-[1.05] tracking-[-1.5px] text-white">
            {record.heroTitle || record.name}
          </h1>
        </div>

        {/* Subtitle — bottom right */}
        {record.heroSubtitle && (
          <div className="absolute bottom-[120px] right-[60px] max-w-[280px]">
            <p className="font-[family-name:var(--font-body)] text-[18px] leading-[1.5] text-white/90">
              {record.heroSubtitle}
            </p>
          </div>
        )}

        {/* Wave — white arch at bottom, extends below hero container */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 71"
          fill="white"
          preserveAspectRatio="none"
          className="absolute left-0 w-full"
          style={{ bottom: '-36px', height: '71px' }}
          aria-hidden
        >
          <path d="M-100 35 Q720 5 1540 35 L1540 71 L-100 71 Z" />
        </svg>
      </div>
    </section>
  )
}

function DesktopDetails({ record }: { record: CmsDestinationRecord }) {
  const quickInfo = [
    { icon: QUICK_INFO_ICONS[0], label: 'Location', value: record.location },
    { icon: QUICK_INFO_ICONS[1], label: 'Travel Duration', value: record.travelDuration },
    { icon: QUICK_INFO_ICONS[2], label: 'Experience Type', value: record.experienceType },
    { icon: QUICK_INFO_ICONS[3], label: 'Hangout Type', value: record.hangoutType },
  ]
  return (
    <section className="w-full bg-white px-[80px] py-[64px]">
      <div className="flex gap-[64px]">
        {/* Quick facts */}
        <div className="flex w-[300px] shrink-0 flex-col gap-[32px]">
          {quickInfo.map(({ icon, label, value }) => (
            <div key={label} className="flex flex-col gap-[6px]">
              <div className="flex items-center gap-[8px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={icon} alt="" width={20} height={20} className="shrink-0" draggable={false} />
                <span className="text-[12px] font-semibold uppercase tracking-[0.6px] text-[#132110]/50">
                  {label}
                </span>
              </div>
              <p className="text-[16px] font-medium text-[#132110]">{value || '—'}</p>
            </div>
          ))}
        </div>

        {/* Vertical divider */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/icons/dest/divider-v.svg"
          alt=""
          className="h-auto shrink-0 self-stretch"
          style={{ width: '1px' }}
          draggable={false}
        />

        {/* Overview */}
        <div className="flex flex-1 flex-col gap-[24px]">
          <h2 className="font-[family-name:var(--font-body)] text-[40px] font-medium leading-[1.1] tracking-[-0.8px] text-[#132110]">
            {record.overviewTitle || record.name}
          </h2>
          <p className="whitespace-pre-wrap text-[17px] leading-[1.65] text-[#132110]/75">
            {record.overviewDescription}
          </p>
          {record.sidebarQuote && (
            <blockquote className="mt-[8px] border-l-[3px] border-[#31542a] pl-[20px] text-[18px] font-medium italic leading-[1.5] text-[#31542a]">
              {record.sidebarQuote}
            </blockquote>
          )}
        </div>
      </div>
    </section>
  )
}

function DesktopGallery({ record }: { record: CmsDestinationRecord }) {
  if (!record.gallery?.length) return null
  return (
    <section className="w-full bg-white px-[80px] pb-[80px]">
      <div className="no-scrollbar flex gap-[16px] overflow-x-auto">
        {record.gallery.map((src, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={i}
            src={src}
            alt=""
            className="h-[330px] w-[495px] shrink-0 rounded-[12px] object-cover"
            draggable={false}
          />
        ))}
      </div>
    </section>
  )
}

function DesktopCardRow({ title, items }: { title: string; items: CmsCardItem[] }) {
  if (!items.length) return null
  return (
    <div className="flex flex-col gap-[24px]">
      <h2 className="font-[family-name:var(--font-body)] text-[28px] font-medium tracking-[-0.5px] text-[#132110]">
        {title}
      </h2>
      <div className="no-scrollbar flex gap-[16px] overflow-x-auto pb-[4px]">
        {items.map((item, i) => (
          <div
            key={i}
            className="relative h-[300px] w-[442px] shrink-0 overflow-hidden rounded-[12px]"
          >
            {item.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={item.image}
                alt=""
                className="absolute inset-0 size-full object-cover"
                draggable={false}
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-[#1e3a1a] to-[#2d5a27]" />
            )}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-[20px]">
              <p className="text-[17px] font-semibold text-white">{item.title}</p>
              {item.description && (
                <p className="mt-[4px] text-[13px] leading-[1.4] text-white/80">{item.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function DesktopMustTry({ record }: { record: CmsDestinationRecord }) {
  const hasAny = record.foods.length || record.subDestinations.length || record.cultureItems.length
  if (!hasAny) return null
  return (
    <section className="w-full bg-[#faf7f2] px-[80px] py-[80px]">
      <div className="flex flex-col gap-[64px]">
        {record.foods.length > 0 && (
          <DesktopCardRow title="Must Try Food" items={record.foods} />
        )}
        {record.subDestinations.length > 0 && (
          <DesktopCardRow title="Go To Destinations" items={record.subDestinations} />
        )}
        {record.cultureItems.length > 0 && (
          <DesktopCardRow title="Heritage &amp; Culture" items={record.cultureItems} />
        )}
      </div>
    </section>
  )
}

function DesktopReels({ record }: { record: CmsDestinationRecord }) {
  if (!record.social.length) return null
  const row1 = record.social.slice(0, 6)
  const row2 = record.social.slice(6, 12)

  return (
    <section className="w-full bg-white px-[80px] py-[80px]">
      <h2 className="mb-[48px] text-center font-[family-name:var(--font-body)] text-[40px] font-medium leading-none tracking-[-0.8px] text-[#132110]">
        Explore the{' '}
        <span className="font-[family-name:var(--font-script)] font-bold text-[#f4b45a]">
          Viral Travel
        </span>{' '}
        Contents
      </h2>
      <div className="flex flex-col gap-[24px]">
        {[row1, row2].map(
          (row, ri) =>
            row.length > 0 && (
              <div key={ri} className="relative">
                <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-[80px] bg-gradient-to-r from-white to-transparent" />
                <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-[80px] bg-gradient-to-l from-white to-transparent" />
                <div className="no-scrollbar flex gap-[32px] overflow-x-auto pb-[4px]">
                  {row.map((s, i) => {
                    const ytId = youtubeId(s.embedUrl || '')
                    // Prefer CMS-uploaded thumbnail, fall back to YouTube auto-thumb
                    const thumb =
                      s.thumbnail ||
                      (ytId ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg` : null)
                    const href = youtubeWatchUrl(s.embedUrl || '') ?? s.embedUrl ?? undefined
                    return (
                      <a
                        key={i}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex w-[240px] shrink-0 flex-col gap-[12px] no-underline"
                      >
                        <div className="relative h-[350px] w-[240px] overflow-hidden rounded-[12px] bg-[#1e3a1a]">
                          {thumb ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={thumb}
                              alt={s.creator}
                              className="absolute inset-0 size-full object-cover"
                              draggable={false}
                            />
                          ) : (
                            <div className="flex size-full items-center justify-center bg-gradient-to-br from-[#1e3a1a] to-[#2d5a27]">
                              <span className="text-[12px] text-white/40">{s.platform}</span>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-[8px] py-[1px]">
                          <div className="flex size-[20px] shrink-0 items-center justify-center rounded-full bg-[#31542a] text-[10px] font-bold text-white">
                            {s.creator.charAt(0).toUpperCase()}
                          </div>
                          <p className="truncate text-[18px] opacity-80 text-[#132110]">
                            {s.creator}
                          </p>
                        </div>
                      </a>
                    )
                  })}
                </div>
              </div>
            ),
        )}
      </div>
    </section>
  )
}

function HlDivider() {
  return (
    <div className="relative h-0 w-full shrink-0">
      <div className="absolute inset-x-0" style={{ top: '-1px', bottom: '-1px' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/icons/dest/divider-h.svg" alt="" className="block size-full max-w-none" draggable={false} />
      </div>
    </div>
  )
}

function HlColumn({
  items,
  icons,
  flex,
}: {
  items: { title: string; description: string }[]
  icons: string[]
  flex?: boolean
}) {
  return (
    <div
      className={`flex h-[412px] flex-col gap-[24px] items-start justify-center ${flex ? 'flex-[1_0_0] min-w-0' : 'shrink-0'}`}
    >
      {items.flatMap((h, i) => {
        const row = (
          <div key={`item-${i}`} className="flex items-center gap-[12px] w-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={icons[i % icons.length]}
              alt=""
              width={24}
              height={24}
              className="shrink-0"
              draggable={false}
            />
            <p className="flex-1 text-[16px] leading-[1.4] text-[#39260b]">
              {h.title}
              {h.description ? `  ${h.description}` : ''}
            </p>
          </div>
        )
        return i < items.length - 1 ? [row, <HlDivider key={`div-${i}`} />] : [row]
      })}
    </div>
  )
}

function DesktopHighlights({ record }: { record: CmsDestinationRecord }) {
  if (!record.highlights.length) return null
  const left = record.highlights.slice(0, 4)
  const right = record.highlights.slice(4, 8)

  return (
    <section className="w-full bg-[#faf7f2] p-[80px]">
      <div className="flex flex-[1_0_0] items-end justify-center gap-[64px]">
        {/* Left highlights */}
        <HlColumn items={left} icons={LEFT_HL_ICONS} />

        {/* Center — title + highlight image */}
        <div className="flex w-[500px] shrink-0 flex-col gap-[32px] items-center">
          <h2 className="text-center text-[32px] leading-none tracking-[-0.96px] text-[#39260b] whitespace-nowrap">
            <span className="font-medium">Highlights of</span>{' '}
            <span className="font-[family-name:var(--font-script)] font-bold">
              {record.name}
            </span>
          </h2>
          {record.highlightImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={record.highlightImage}
              alt={record.name}
              className="h-[412px] w-full rounded-[12px] object-cover"
              draggable={false}
            />
          ) : (
            <div className="h-[412px] w-full rounded-[12px] bg-gradient-to-br from-[#1e3a1a] to-[#2d5a27]" />
          )}
        </div>

        {/* Right highlights */}
        {right.length > 0 && <HlColumn items={right} icons={RIGHT_HL_ICONS} flex />}
        {right.length === 0 && <div className="flex-[1_0_0]" />}
      </div>
    </section>
  )
}


function DesktopRelated({ record }: { record: CmsDestinationRecord }) {
  if (!record.related.length) return null
  return (
    <section className="w-full bg-white px-[80px] py-[80px]">
      <div className="mb-[40px] flex items-end justify-between">
        <h2 className="font-[family-name:var(--font-body)] text-[40px] font-medium tracking-[-0.8px] text-[#132110]">
          Top Destinations
        </h2>
        <Link
          href="/explore"
          className="text-[14px] font-semibold text-[#31542a] underline underline-offset-2"
        >
          View All
        </Link>
      </div>
      <div className="flex gap-[20px]">
        {record.related.slice(0, 4).map((name, i) => (
          <div
            key={i}
            className="relative h-[300px] flex-1 overflow-hidden rounded-[16px] bg-gradient-to-br from-[#1e3a1a] to-[#2d5a27]"
          >
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <p className="absolute bottom-[20px] left-[20px] right-[20px] font-[family-name:var(--font-script)] text-[24px] font-bold text-white">
              {name}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

function DesktopFaq({ record }: { record: CmsDestinationRecord }) {
  if (!record.faqs.length) return null
  return (
    <section className="w-full bg-white p-[80px]">
      <div className="flex items-end gap-[120px] w-full">
        {/* Left side */}
        <div className="flex w-[454px] shrink-0 flex-col gap-[32px]">
          <div className="flex flex-col gap-[12px]">
            <p className="text-[32px] leading-none tracking-[-0.96px] text-[#132110] whitespace-nowrap">
              <span>Frequently </span>
              <span className="font-[family-name:var(--font-script)] font-bold text-[#31542a]">Asked</span>
              <span> Questions</span>
            </p>
            <p className="text-[16px] leading-[1.4] text-[#132110]/70">
              Everything you need to know before you go.
            </p>
          </div>
          {record.highlightImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={record.highlightImage}
              alt=""
              className="h-[400px] w-full rounded-[12px] object-cover"
              draggable={false}
            />
          ) : (
            <div className="h-[400px] w-full rounded-[12px] bg-gradient-to-br from-[#1e3a1a] to-[#2d5a27]" />
          )}
        </div>

        {/* FAQ items */}
        <div className="flex flex-[1_0_0] flex-col gap-[32px] min-w-0">
          {record.faqs.map((f, i) => (
            <details
              key={i}
              open={i === 0}
              className={`group w-full ${i > 0 ? 'border-t-2 border-[#31542a] pt-[12px]' : ''}`}
            >
              <summary className="flex cursor-pointer list-none items-start justify-between gap-[12px] marker:content-none">
                <div className="flex flex-[1_0_0] flex-col gap-[8px] min-w-0 not-italic text-[#132110]">
                  <p className="text-[20px] font-medium leading-normal w-full">{f.question}</p>
                  {/* Answer — only visible when open (first item default-open) */}
                  <p className="hidden group-open:block text-[16px] leading-[1.4] opacity-60">{f.answer}</p>
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/icons/dest/chevron-right.svg"
                  alt=""
                  width={i === 0 ? 24 : 20}
                  height={i === 0 ? 24 : 20}
                  className="mt-[2px] shrink-0 rotate-90 transition-transform duration-200 group-open:-rotate-90"
                  draggable={false}
                />
              </summary>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

function DesktopDestination({ record }: { record: CmsDestinationRecord }) {
  return (
    <div className="w-full bg-white">
      <DesktopHero record={record} />
      <DesktopDetails record={record} />
      <DesktopGallery record={record} />
      <DesktopMustTry record={record} />
      <DesktopReels record={record} />
      <DesktopHighlights record={record} />
      <DesktopRelated record={record} />
      <DesktopFaq record={record} />
      <CtaSection />
    </div>
  )
}

// ──────────────────────────────────────────────────────────────────────────────
// MOBILE SECTIONS
// ──────────────────────────────────────────────────────────────────────────────

function MobileHero({ record }: { record: CmsDestinationRecord }) {
  return (
    <section
      className="w-full bg-[#faf7f2] px-[8px]"
      style={{ paddingTop: `${MOBILE_HEADER_CLIP + 6}px` }}
    >
      <div
        className="relative w-full overflow-hidden rounded-[24px]"
        style={{ height: 'calc(484 / 390 * 100vw)' }}
      >
        {record.heroImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={record.heroImage}
            alt={record.heroTitle || record.name}
            className="absolute inset-0 size-full object-cover"
            draggable={false}
          />
        ) : (
          <div className="absolute inset-0 bg-[#132110]" />
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/45 via-black/10 to-black/35" />
        <div className="absolute left-[20px] top-[36px]">
          <h1 className="font-[family-name:var(--font-body)] text-[34px] font-medium leading-[1.05] tracking-[-0.8px] text-white">
            {record.heroTitle || record.name}
          </h1>
        </div>
        {record.heroSubtitle && (
          <div className="absolute bottom-[24px] right-[20px] max-w-[200px]">
            <p className="text-[13px] leading-[1.4] text-white/85">{record.heroSubtitle}</p>
          </div>
        )}
      </div>
    </section>
  )
}

function MobileDetails({ record }: { record: CmsDestinationRecord }) {
  const quickInfo = [
    { icon: QUICK_INFO_ICONS[0], label: 'Location', value: record.location },
    { icon: QUICK_INFO_ICONS[1], label: 'Travel Duration', value: record.travelDuration },
    { icon: QUICK_INFO_ICONS[2], label: 'Experience', value: record.experienceType },
    { icon: QUICK_INFO_ICONS[3], label: 'Hangout Type', value: record.hangoutType },
  ]
  return (
    <section className="w-full bg-white px-[20px] py-[28px]">
      <div className="mb-[20px] grid grid-cols-2 gap-[16px]">
        {quickInfo.map(({ icon, label, value }) => (
          <div key={label} className="flex flex-col gap-[4px]">
            <div className="flex items-center gap-[6px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={icon} alt="" width={16} height={16} className="shrink-0" draggable={false} />
              <span className="text-[11px] font-semibold uppercase tracking-[0.4px] text-[#132110]/50">
                {label}
              </span>
            </div>
            <p className="text-[14px] font-medium text-[#132110]">{value || '—'}</p>
          </div>
        ))}
      </div>
      {record.overviewTitle && (
        <h2 className="mb-[10px] text-[20px] font-medium tracking-[-0.4px] text-[#132110]">
          {record.overviewTitle}
        </h2>
      )}
      <p className="text-[14px] leading-[1.65] text-[#132110]/75">{record.overviewDescription}</p>
      {record.sidebarQuote && (
        <blockquote className="mt-[16px] border-l-[3px] border-[#31542a] pl-[14px] text-[14px] italic leading-[1.5] text-[#31542a]">
          {record.sidebarQuote}
        </blockquote>
      )}
    </section>
  )
}

function MobileGallery({ record }: { record: CmsDestinationRecord }) {
  if (!record.gallery?.length) return null
  return (
    <section className="w-full bg-white pb-[28px]">
      <div className="no-scrollbar flex gap-[10px] overflow-x-auto px-[20px]">
        {record.gallery.map((src, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={i}
            src={src}
            alt=""
            className="h-[160px] w-[240px] shrink-0 rounded-[10px] object-cover"
            draggable={false}
          />
        ))}
      </div>
    </section>
  )
}

function MobileCardRow({ title, items }: { title: string; items: CmsCardItem[] }) {
  if (!items.length) return null
  return (
    <div className="flex flex-col gap-[14px]">
      <h2 className="px-[20px] text-[18px] font-medium tracking-[-0.3px] text-[#132110]">{title}</h2>
      <div className="no-scrollbar flex gap-[12px] overflow-x-auto px-[20px] pb-[4px]">
        {items.map((item, i) => (
          <div
            key={i}
            className="relative h-[200px] w-[260px] shrink-0 overflow-hidden rounded-[10px]"
          >
            {item.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={item.image}
                alt=""
                className="absolute inset-0 size-full object-cover"
                draggable={false}
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-[#1e3a1a] to-[#2d5a27]" />
            )}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-[14px]">
              <p className="text-[15px] font-semibold text-white">{item.title}</p>
              {item.description && (
                <p className="mt-[2px] text-[12px] leading-[1.4] text-white/80">{item.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function MobileMustTry({ record }: { record: CmsDestinationRecord }) {
  const hasAny = record.foods.length || record.subDestinations.length || record.cultureItems.length
  if (!hasAny) return null
  return (
    <section className="w-full bg-[#faf7f2] py-[28px]">
      <div className="flex flex-col gap-[32px]">
        {record.foods.length > 0 && <MobileCardRow title="Must Try Food" items={record.foods} />}
        {record.subDestinations.length > 0 && (
          <MobileCardRow title="Go To Destinations" items={record.subDestinations} />
        )}
        {record.cultureItems.length > 0 && (
          <MobileCardRow title="Heritage &amp; Culture" items={record.cultureItems} />
        )}
      </div>
    </section>
  )
}

function MobileReels({ record }: { record: CmsDestinationRecord }) {
  if (!record.social.length) return null
  return (
    <section className="w-full bg-white py-[28px]">
      <h2 className="mb-[20px] px-[20px] text-[20px] font-medium tracking-[-0.4px] text-[#132110]">
        Explore the{' '}
        <span className="font-[family-name:var(--font-script)] font-bold text-[#f4b45a]">
          Viral Travel
        </span>{' '}
        Contents
      </h2>
      <div className="no-scrollbar flex gap-[12px] overflow-x-auto px-[20px] pb-[4px]">
        {record.social.map((s, i) => {
          const ytId = youtubeId(s.embedUrl || '')
          const thumb =
            s.thumbnail ||
            (ytId ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg` : null)
          const href = youtubeWatchUrl(s.embedUrl || '') ?? s.embedUrl ?? undefined
          return (
            <a
              key={i}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-[140px] shrink-0 flex-col gap-[8px] no-underline"
            >
              <div className="relative h-[200px] w-[140px] overflow-hidden rounded-[10px] bg-[#1e3a1a]">
                {thumb ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={thumb}
                    alt={s.creator}
                    className="absolute inset-0 size-full object-cover"
                    draggable={false}
                  />
                ) : (
                  <div className="flex size-full items-center justify-center bg-gradient-to-br from-[#1e3a1a] to-[#2d5a27]">
                    <span className="text-[11px] text-white/40">{s.platform}</span>
                  </div>
                )}
              </div>
              <p className="truncate text-[12px] font-medium text-[#132110]">{s.creator}</p>
            </a>
          )
        })}
      </div>
    </section>
  )
}

function MobileHighlights({ record }: { record: CmsDestinationRecord }) {
  if (!record.highlights.length) return null
  return (
    <section className="w-full bg-[#faf7f2] px-[20px] py-[28px]">
      <h2 className="mb-[20px] text-[20px] font-medium tracking-[-0.4px] text-[#132110]">
        Highlights of{' '}
        <span className="font-[family-name:var(--font-script)] font-bold text-[#31542a]">
          {record.name}
        </span>
      </h2>
      {record.highlightImage && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={record.highlightImage}
          alt={record.name}
          className="mb-[20px] h-[200px] w-full rounded-[12px] object-cover"
          draggable={false}
        />
      )}
      <div className="flex flex-col">
        {record.highlights.map((h, i) => (
          <div key={i}>
            <div className="flex flex-col gap-[4px]">
              <p className="text-[15px] font-semibold text-[#132110]">{h.title}</p>
              <p className="text-[13px] leading-[1.5] text-[#132110]/70">{h.description}</p>
            </div>
            {i < record.highlights.length - 1 && (
              <div className="my-[14px] h-[1px] w-full bg-[#e8e4de]" />
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

function MobileRelated({ record }: { record: CmsDestinationRecord }) {
  if (!record.related.length) return null
  return (
    <section className="w-full bg-white px-[20px] py-[28px]">
      <div className="mb-[16px] flex items-center justify-between">
        <h2 className="text-[20px] font-medium tracking-[-0.4px] text-[#132110]">
          Top Destinations
        </h2>
        <Link href="/explore" className="text-[13px] font-semibold text-[#31542a] underline">
          View All
        </Link>
      </div>
      <div className="no-scrollbar flex gap-[12px] overflow-x-auto pb-[4px]">
        {record.related.slice(0, 4).map((name, i) => (
          <div
            key={i}
            className="relative h-[160px] w-[200px] shrink-0 overflow-hidden rounded-[12px] bg-gradient-to-br from-[#1e3a1a] to-[#2d5a27]"
          >
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <p className="absolute bottom-[12px] left-[12px] right-[12px] font-[family-name:var(--font-script)] text-[18px] font-bold text-white">
              {name}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

function MobileFaq({ record }: { record: CmsDestinationRecord }) {
  if (!record.faqs.length) return null
  return (
    <section className="w-full bg-white px-[20px] py-[28px]">
      <h2 className="mb-[20px] text-[20px] font-medium tracking-[-0.4px] text-[#132110]">
        Frequently Asked Questions
      </h2>
      <div className="flex flex-col gap-[8px]">
        {record.faqs.map((f, i) => (
          <details
            key={i}
            className="group rounded-[10px] border border-[#e8e4de] bg-white"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-[12px] px-[16px] py-[14px] marker:content-none">
              <span className="text-[14px] font-semibold text-[#132110]">{f.question}</span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/icons/dest/chevron-right.svg"
                alt=""
                width={18}
                height={18}
                className="shrink-0 rotate-90 transition-transform duration-200 group-open:-rotate-90"
                draggable={false}
              />
            </summary>
            <div className="border-t border-[#e8e4de] px-[16px] py-[14px]">
              <p className="text-[13px] leading-[1.65] text-[#132110]/75">{f.answer}</p>
            </div>
          </details>
        ))}
      </div>
    </section>
  )
}

function MobileDestination({ record }: { record: CmsDestinationRecord }) {
  return (
    <div className="w-full bg-white">
      <MobileHero record={record} />
      <MobileDetails record={record} />
      <MobileGallery record={record} />
      <MobileMustTry record={record} />
      <MobileReels record={record} />
      <MobileHighlights record={record} />
      <MobileRelated record={record} />
      <MobileFaq record={record} />
      <MobileCta />
    </div>
  )
}

// ──────────────────────────────────────────────────────────────────────────────
// EXPORT
// ──────────────────────────────────────────────────────────────────────────────

export function CmsDestinationView({ record }: { record: CmsDestinationRecord }) {
  return (
    <ResponsiveFigmaPage
      desktop={<DesktopDestination record={record} />}
      mobile={<MobileDestination record={record} />}
    />
  )
}
