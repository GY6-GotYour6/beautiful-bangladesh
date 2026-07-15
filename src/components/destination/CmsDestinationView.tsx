import Link from 'next/link'
import type { CmsDestinationRecord } from '@/lib/cms-data'

function youtubeId(url: string): string | null {
  if (!url) return null
  try {
    const u = new URL(url)
    if (u.hostname.includes('youtu.be')) return u.pathname.slice(1) || null
    if (u.searchParams.get('v')) return u.searchParams.get('v')
    const m = u.pathname.match(/\/embed\/([^/]+)/)
    return m?.[1] || null
  } catch {
    return null
  }
}

/** Live CMS-driven destination template (fixed layout, editable content). */
export function CmsDestinationView({ record }: { record: CmsDestinationRecord }) {
  return (
    <article className="w-full bg-white text-[#132110]" data-destination={record.slug}>
      {/* Hero */}
      <section className="relative min-h-[70vh] w-full overflow-hidden bg-[#132110]">
        {record.heroImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={record.heroImage}
            alt={record.heroTitle || record.name}
            className="absolute inset-0 size-full object-cover"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/10" />
        <div className="relative mx-auto flex min-h-[70vh] max-w-[1280px] flex-col justify-end px-6 pb-16 pt-32 md:px-20">
          <p className="text-[14px] font-medium tracking-wide text-[#f8ff98] uppercase">
            {record.region}
          </p>
          <h1 className="mt-2 font-[family-name:var(--font-body)] text-[48px] font-semibold leading-none tracking-[-1.2px] text-white md:text-[72px]">
            {record.heroTitle || record.name}
          </h1>
          {record.heroSubtitle ? (
            <p className="mt-4 max-w-[640px] text-[18px] leading-relaxed text-white/85">
              {record.heroSubtitle}
            </p>
          ) : null}
        </div>
      </section>

      {/* Quick info + overview */}
      <section className="mx-auto grid max-w-[1280px] gap-10 px-6 py-16 md:grid-cols-[1.4fr_1fr] md:px-20">
        <div>
          <h2 className="text-[32px] font-semibold tracking-[-0.8px]">
            {record.overviewTitle || record.name}
          </h2>
          <p className="mt-4 text-[17px] leading-[1.7] text-[#132110]/80 whitespace-pre-wrap">
            {record.overviewDescription}
          </p>
        </div>
        <aside className="flex flex-col gap-6">
          <dl className="grid grid-cols-2 gap-4 rounded-2xl bg-[#faf7f2] p-6">
            {[
              ['Location', record.location],
              ['Travel', record.travelDuration],
              ['Experience', record.experienceType],
              ['Best for', record.hangoutType],
            ].map(([label, value]) => (
              <div key={label}>
                <dt className="text-[12px] font-semibold tracking-wide text-[#132110]/50 uppercase">
                  {label}
                </dt>
                <dd className="mt-1 text-[15px] font-medium">{value || '—'}</dd>
              </div>
            ))}
          </dl>
          {record.sidebarQuote ? (
            <blockquote className="border-l-4 border-[#31542a] pl-4 text-[18px] leading-relaxed text-[#31542a]">
              {record.sidebarQuote}
            </blockquote>
          ) : null}
        </aside>
      </section>

      {/* Gallery */}
      {(record.gallery || []).length > 0 ? (
        <section className="overflow-x-auto px-6 pb-16 md:px-20">
          <div className="mx-auto flex max-w-[1280px] gap-4">
            {record.gallery!.map((src, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={`${src}-${i}`}
                src={src}
                alt=""
                className="h-[280px] w-[420px] shrink-0 rounded-xl object-cover md:h-[330px] md:w-[495px]"
              />
            ))}
          </div>
        </section>
      ) : null}

      {/* Food / spots / culture */}
      <CardGrid title="Must Try Food" items={record.foods} />
      <CardGrid title="Places Nearby" items={record.subDestinations} />
      <CardGrid title="Heritage & Culture" items={record.cultureItems} />

      {/* Events */}
      {record.events.length > 0 ? (
        <section className="mx-auto max-w-[1280px] px-6 py-12 md:px-20">
          <h2 className="text-center text-[32px] font-semibold tracking-[-0.8px]">
            What&apos;s Happening Around
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {record.events.map((e) => (
              <div key={e.title} className="rounded-xl bg-[#faf7f2] p-5">
                <p className="text-[13px] font-semibold text-[#31542a]">{e.date}</p>
                <p className="mt-2 text-[17px] font-semibold">{e.title}</p>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {/* Reels */}
      {record.social.length > 0 ? (
        <section className="bg-[#faf7f2] px-6 py-16 md:px-20">
          <div className="mx-auto max-w-[1280px]">
            <h2 className="text-center text-[32px] font-semibold tracking-[-0.8px]">
              Explore the{' '}
              <span className="font-[family-name:var(--font-script)] font-bold text-[#f4b45a]">
                Viral Travel
              </span>{' '}
              Contents
            </h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {record.social.map((s) => {
                const yt = youtubeId(s.embedUrl || '')
                return (
                  <div key={`${s.creator}-${s.platform}`} className="flex flex-col gap-3">
                    <div className="aspect-[9/14] overflow-hidden rounded-xl bg-[#132110]/10">
                      {yt ? (
                        <iframe
                          title={s.creator}
                          src={`https://www.youtube.com/embed/${yt}`}
                          className="size-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      ) : (
                        <div className="flex size-full items-center justify-center p-4 text-center text-[14px] text-[#132110]/60">
                          {s.platform} · {s.creator}
                        </div>
                      )}
                    </div>
                    <p className="font-[family-name:var(--font-script)] text-[18px] font-bold opacity-80">
                      {s.creator}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      ) : null}

      {/* Highlights */}
      {record.highlights.length > 0 ? (
        <section className="mx-auto max-w-[1280px] px-6 py-16 md:px-20">
          <h2 className="text-center text-[32px] font-semibold tracking-[-0.8px]">
            Highlights of {record.name}
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {record.highlights.map((h) => (
              <div key={h.title} className="rounded-xl border border-[#eae7e1] p-5">
                <p className="text-[17px] font-semibold">{h.title}</p>
                <p className="mt-2 text-[14px] leading-relaxed text-[#132110]/70">
                  {h.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {/* Related */}
      {record.related.length > 0 ? (
        <section className="mx-auto max-w-[1280px] px-6 py-12 md:px-20">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-[32px] font-semibold tracking-[-0.8px]">Top Destinations</h2>
            <Link href="/explore" className="text-[14px] font-semibold text-[#31542a] underline">
              View all
            </Link>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            {record.related.map((name) => (
              <span
                key={name}
                className="rounded-full bg-[#faf7f2] px-4 py-2 text-[14px] font-medium"
              >
                {name}
              </span>
            ))}
          </div>
        </section>
      ) : null}

      {/* FAQ */}
      {record.faqs.length > 0 ? (
        <section className="mx-auto max-w-[800px] px-6 py-16 md:px-20">
          <h2 className="text-center text-[32px] font-semibold tracking-[-0.8px]">
            Frequently Asked Questions
          </h2>
          <div className="mt-8 space-y-3">
            {record.faqs.map((f) => (
              <details
                key={f.question}
                className="group rounded-xl border border-[#eae7e1] bg-white px-5 py-4"
              >
                <summary className="cursor-pointer list-none text-[17px] font-semibold marker:content-none">
                  {f.question}
                </summary>
                <p className="mt-3 text-[15px] leading-relaxed text-[#132110]/75">{f.answer}</p>
              </details>
            ))}
          </div>
        </section>
      ) : null}
    </article>
  )
}

function CardGrid({
  title,
  items,
}: {
  title: string
  items: { title: string; description: string }[]
}) {
  if (!items.length) return null
  return (
    <section className="mx-auto max-w-[1280px] px-6 py-12 md:px-20">
      <h2 className="text-center text-[32px] font-semibold tracking-[-0.8px]">{title}</h2>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <div key={item.title} className="rounded-xl bg-[#faf7f2] p-5">
            <p className="text-[17px] font-semibold">{item.title}</p>
            <p className="mt-2 text-[14px] leading-relaxed text-[#132110]/70">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
