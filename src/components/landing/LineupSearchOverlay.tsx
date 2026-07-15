'use client'

import { useState } from 'react'

/**
 * Full Lineup search — opaque HTML covering the baked Figma bar exactly
 * (artboard 960,96 · 400×40) so empty and typed states are a single clean control.
 */
export function LineupSearchOverlay() {
  const [query, setQuery] = useState('')

  return (
    <label
      className="absolute z-20 flex items-center gap-2.5 border border-[#eae7e1] bg-white px-3"
      style={{ left: 960, top: 96, width: 400, height: 40 }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/landing/interactive/icons/search.svg"
        alt=""
        width={16}
        height={16}
        className="pointer-events-none shrink-0"
        draggable={false}
      />
      <span className="sr-only">Search a creator or videos</span>
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search a creator or videos"
        className="h-full min-w-0 flex-1 border-0 bg-transparent text-[17px] leading-none tracking-[-0.51px] text-[#132110] outline-none appearance-none placeholder:text-[#132110]/60 [&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden"
        onKeyDown={(e) => {
          if (e.key !== 'Enter' || !query.trim()) return
          const q = encodeURIComponent(`${query.trim()} Bangladesh`)
          window.open(`https://www.youtube.com/results?search_query=${q}`, '_blank', 'noreferrer')
        }}
      />
    </label>
  )
}
