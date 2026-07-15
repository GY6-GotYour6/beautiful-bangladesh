'use client'

import Link from 'next/link'
import { useState } from 'react'
import { CtaButton } from './CtaButton'

const FOOD_RANGER_URL =
  'https://www.youtube.com/results?search_query=The+Food+Ranger+Bangladesh'
const BFRS_URL =
  'https://www.youtube.com/results?search_query=Best+Ever+Food+Review+Show+Bangladesh'

const channels = [
  {
    name: 'The Food Ranger',
    href: FOOD_RANGER_URL,
    topVideo: 'Top Video',
    views: '14M Views',
    thumbs: [
      '/landing/youtube/fr-thumb1.png',
      '/landing/youtube/fr-thumb2.png',
      '/landing/youtube/fr-thumb3.png',
      '/landing/youtube/fr-thumb4.png',
    ],
  },
  {
    name: 'The Best Ever Food Review Show',
    href: BFRS_URL,
    topVideo: 'Top Video',
    views: '14M Views',
    thumbs: [
      '/landing/youtube/bfrs-thumb1.png',
      '/landing/youtube/bfrs-thumb2.png',
      '/landing/youtube/bfrs-thumb3.png',
      '/landing/youtube/bfrs-thumb4.png',
    ],
  },
]

/** 2×2 thumbnail grid inside a channel card. */
function ThumbnailGrid({ thumbs, channelHref }: { thumbs: string[]; channelHref: string }) {
  return (
    <div className="flex flex-col gap-[12px] w-full">
      <div className="flex gap-[12px] items-center w-full">
        {thumbs.slice(0, 2).map((src, i) => (
          <Link
            key={i}
            href={channelHref}
            target="_blank"
            rel="noreferrer"
            className="relative aspect-[480/271] flex-1 min-w-0 rounded-[12px] overflow-hidden block group"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt=""
              className="absolute inset-0 size-full max-w-none object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              src={src}
              draggable={false}
            />
          </Link>
        ))}
      </div>
      <div className="flex gap-[12px] items-center w-full">
        {thumbs.slice(2, 4).map((src, i) => (
          <Link
            key={i}
            href={channelHref}
            target="_blank"
            rel="noreferrer"
            className="relative aspect-[480/271] flex-1 min-w-0 rounded-[12px] overflow-hidden block group"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt=""
              className="absolute inset-0 size-full max-w-none object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              src={src}
              draggable={false}
            />
          </Link>
        ))}
      </div>
    </div>
  )
}

/** YouTube Full Lineup section — Figma 466:1414. */
export function YoutubeLineup() {
  const [query, setQuery] = useState('')

  const handleSearch = (e: React.KeyboardEvent) => {
    if (e.key !== 'Enter' || !query.trim()) return
    const q = encodeURIComponent(`${query.trim()} Bangladesh`)
    window.open(`https://www.youtube.com/results?search_query=${q}`, '_blank', 'noreferrer')
  }

  return (
    <section
      className="bg-white flex flex-col gap-[48px] items-center justify-center p-[80px] w-full"
      data-node-id="466:1414"
    >
      {/* Header row: title + search */}
      <div className="flex items-center justify-between w-full max-w-[1280px]" data-node-id="466:1415">
        <div className="flex flex-col gap-[6px] text-[#132110] whitespace-nowrap" data-node-id="466:1416">
          <p className="font-[family-name:var(--font-body)] font-medium text-[32px] tracking-[-0.96px] leading-[normal]">
            The{' '}
            <span className="font-[family-name:var(--font-script)] font-bold text-[#31542a]">Full</span>
            {' Lineup'}
          </p>
          <p className="font-[family-name:var(--font-body)] text-[16px] leading-[1.4] opacity-70">
            Food legends to solo backpackers. Tap any thumbnail to watch on YouTube.
          </p>
        </div>

        {/* Search input */}
        <label className="flex items-center gap-[10px] border border-[#eae7e1] bg-white h-[40px] w-[400px] px-[12px] cursor-text">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/landing/interactive/icons/search.svg" alt="" width={16} height={16} className="pointer-events-none shrink-0" draggable={false} />
          <span className="sr-only">Search a creator or videos</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleSearch}
            placeholder="Search a creator or videos"
            className="h-full min-w-0 flex-1 border-0 bg-transparent text-[17px] leading-none tracking-[-0.51px] text-[#132110] outline-none appearance-none placeholder:text-[#132110]/60 [&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden"
          />
        </label>
      </div>

      {/* Channel cards */}
      <div className="flex flex-col items-start justify-center w-full" data-node-id="466:1424">
        <div className="flex gap-[32px] items-start w-full" data-node-id="466:1425">
          {channels.map((ch) => (
            <div key={ch.name} className="flex flex-1 min-w-0 flex-col gap-[16px] items-start">
              {/* Thumbnail card */}
              <div className="bg-[#faf7f2] border border-[#eae7e1] flex flex-col items-center justify-center overflow-clip p-[12px] rounded-[24px] w-full">
                <ThumbnailGrid thumbs={ch.thumbs} channelHref={ch.href} />
              </div>
              {/* Channel info */}
              <div className="flex flex-col gap-[8px] text-[#132110] w-full">
                <p className="font-[family-name:var(--font-body)] font-medium text-[24px] leading-[normal]">
                  {ch.name}
                </p>
                <div className="flex gap-[4px] items-center font-[family-name:var(--font-body)] text-[16px] whitespace-nowrap">
                  <span className="opacity-70 leading-[1.4]">{ch.topVideo}</span>
                  <span className="opacity-70 text-[10px] list-disc ml-[15px]" role="presentation">•</span>
                  <span className="opacity-70 leading-[1.4]">{ch.views}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Figma 466:1458 — same stamp frontend as Explore More, sm size */}
      <CtaButton size="sm" label="Check Out Reels" />
    </section>
  )
}
