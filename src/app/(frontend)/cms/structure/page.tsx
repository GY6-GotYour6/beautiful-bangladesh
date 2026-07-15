import Link from 'next/link'
import type { Metadata } from 'next'
import { CmsTopBar } from '@/components/cms/CmsChrome'

export const metadata: Metadata = {
  title: 'CMS Content Structure | Beautiful Bangladesh',
}

const sections = [
  {
    id: '01',
    title: 'Navigation',
    fields: [
      ['site_name', "'beautiful Bangladesh'", '1 text string'],
      ['nav_links', 'Home, About, Explore, Destination', '4 links'],
    ],
  },
  {
    id: '02',
    title: 'Hero',
    fields: [
      ['hero_image', '1440 × 1080 px', '1 Hero Image'],
      ['hero_title', "Cox's Bazar", '1 heading'],
      ['hero_subtitle', 'Experience world’s largest sea beach…', '1 string (~80 chars)'],
    ],
  },
  {
    id: '03',
    title: 'Quick Info',
    fields: [
      ['location', 'Cox Bazar, Bangladesh', '1 string'],
      ['travel_duration', '9 - 12 Hours', '1 string'],
      ['experience_type', 'Hill & Beach Loving', '1 string'],
      ['hangout_type', 'Group/Couple', '1 string'],
    ],
  },
  {
    id: '04',
    title: 'Overview',
    fields: [
      ['section_title', "The World's Largest Natural Sea Beach", '1 heading'],
      ['description', 'Where endless golden shores…', '1 rich text'],
      ['sidebar_quote', 'Optional pull quote', '1 string'],
    ],
  },
  {
    id: '05',
    title: 'Gallery',
    fields: [['gallery_photos', '4 photos', '4 Gallery Photos']],
  },
  {
    id: '06',
    title: 'Must Try Food',
    fields: [['food_items', 'Title + description cards', 'up to 4 cards']],
  },
  {
    id: '07',
    title: 'Highlights',
    fields: [['highlights', 'Icon + text rows', '8 Highlights']],
  },
  {
    id: '08',
    title: 'Creator Reels',
    fields: [['reels', 'Creator + embed URL', '12 Reel Thumbnails']],
  },
  {
    id: '09',
    title: 'FAQs',
    fields: [['faqs', 'Question + answer', '5 FAQs']],
  },
]

export default function CmsStructurePage() {
  return (
    <div className="min-h-screen bg-[#f5f5f5] text-[#132110]" data-node-id="392:4">
      <CmsTopBar
        crumbs={[
          { href: '/cms', label: 'CMS' },
          { label: 'Content Structure' },
        ]}
        actions={
          <Link
            href="/cms"
            className="rounded-lg bg-[#31542a] px-4 py-2.5 text-[14px] font-semibold text-white"
          >
            Open Destinations
          </Link>
        }
      />

      <div className="mx-auto max-w-[1000px] px-4 py-10 md:px-6 md:py-14">
        <div className="mb-10 text-center">
          <p className="text-[14px] font-semibold tracking-wide text-[#6b7280] uppercase">
            Content Structure Specification
          </p>
          <h1 className="mt-3 text-[36px] font-bold tracking-[-0.03em] md:text-[48px]">
            CMS Content Structure
          </h1>
          <p className="mt-3 text-[16px] text-[#4b5563]">
            Destination Details Page — Cox&apos;s Bazar
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {[
              '1 Hero Image',
              '4 Gallery Photos',
              '12 Section Cards',
              '8 Highlights',
              '12 Reel Thumbnails',
              '5 FAQs',
            ].map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-[#e5e7eb] bg-white px-3 py-1.5 text-[13px]"
              >
                {chip}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          {sections.map((section) => (
            <section
              key={section.id}
              className="overflow-hidden rounded-xl border border-[#e5e7eb] bg-white shadow-[0_4px_12px_rgba(0,0,0,0.03)]"
            >
              <div className="flex items-center justify-between border-b border-[#e5e7eb] px-6 py-5">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded bg-[#31542a] px-2.5 py-1 text-[11px] font-bold tracking-wide text-white uppercase">
                    Section {section.id} — {section.title}
                  </span>
                  <h2 className="text-[18px] font-semibold">{section.title}</h2>
                </div>
                <span className="text-[13px] text-[#9ca3af]">ID: {section.id}</span>
              </div>
              <div className="grid grid-cols-[1.1fr_2fr_1fr] gap-2 border-b border-[#f3f4f6] bg-[#fafafa] px-6 py-3 text-[11px] font-bold tracking-wide text-[#9ca3af] uppercase">
                <span>Field Name</span>
                <span>Content Data / Example</span>
                <span>Specification</span>
              </div>
              {section.fields.map(([name, example, spec]) => (
                <div
                  key={name}
                  className="grid grid-cols-[1.1fr_2fr_1fr] gap-2 border-b border-[#f3f4f6] px-6 py-4 text-[14px] last:border-b-0"
                >
                  <code className="font-medium text-[#31542a]">{name}</code>
                  <span className="text-[#4b5563]">{example}</span>
                  <span className="text-[#6b7280]">{spec}</span>
                </div>
              ))}
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}
