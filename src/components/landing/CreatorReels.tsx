import { FigmaFrame } from './FigmaFrame'

/** Creator reel card data — Figma 466:1298 */
const ROW1 = [
  { id: 'nadir', name: 'Nadir On the Go' },
  { id: 'tawhid', name: 'Tawhid Afridi' },
  { id: 'rafsan', name: 'Rafsan the chotobhai' },
  { id: 'solo', name: 'Solo Traveller' },
  { id: 'salahuddin', name: 'Salahuddin Sumon' },
  { id: 'rakib', name: 'Rakib Hussain' },
] as const

const ROW2 = [
  { id: 'dipu', name: 'Dipu Backpacker' },
  { id: 'anirban', name: 'Anirban Kaisar' },
  { id: 'nihab', name: 'Nihab Rahaman' },
  { id: 'shishir', name: 'Shishir Deb' },
  { id: 'emdadul', name: 'Emdadul Haque' },
  { id: 'owahid', name: 'Owahid Nil' },
] as const

/** Single reel card with photo + avatar + creator name. */
function ReelCard({ id, name }: { id: string; name: string }) {
  return (
    <div className="relative flex w-[240px] shrink-0 flex-col gap-[12px] items-start">
      <div className="relative h-[350px] w-full shrink-0 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          className="pointer-events-none absolute inset-0 size-full max-w-none object-cover"
          src={`/landing/reels/${id}.png`}
          draggable={false}
        />
      </div>
      <div className="relative flex shrink-0 items-center gap-[8px] py-[1.153px]">
        <div className="relative size-[20px] shrink-0 overflow-hidden rounded-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            className="absolute inset-0 block size-full max-w-none"
            src={`/landing/reels/avatar-${id}.png`}
            draggable={false}
          />
        </div>
        <p className="whitespace-nowrap font-[family-name:var(--font-script)] text-[20px] font-bold leading-[normal] tracking-[-0.6px] text-[#132110] opacity-80">
          {name}
        </p>
      </div>
    </div>
  )
}

/**
 * Horizontal reel row — Figma cards start at x=-80 so edges clip;
 * white edge fades match section bg.
 */
function ReelRow({ creators }: { creators: readonly { id: string; name: string }[] }) {
  return (
    <div className="relative flex w-full shrink-0 items-center justify-center gap-[32px] overflow-clip">
      {creators.map((c) => (
        <ReelCard key={c.id} {...c} />
      ))}
      {/* Right fade — white (section bg), not cream */}
      <div
        className="pointer-events-none absolute top-1/2 right-[-50px] h-[386px] w-[210px] -translate-y-1/2 bg-gradient-to-r from-transparent to-white to-[91%]"
        aria-hidden
      />
      {/* Left fade */}
      <div
        className="pointer-events-none absolute top-0 left-[-30px] flex h-[387px] w-[190px] items-center justify-center"
        aria-hidden
      >
        <div className="flex-none -scale-y-100 rotate-180">
          <div className="h-[387px] w-[190px] bg-gradient-to-r from-transparent to-white to-[91%]" />
        </div>
      </div>
    </div>
  )
}

/** Creator Reels — Figma `466:1298` (1440×1097). */
export function CreatorReels() {
  return (
    <FigmaFrame
      id="creator-reels"
      width={1440}
      height={1097}
      className="bg-white"
      data-node-id="466:1298"
      aria-label="Explore the Viral Travel Contents"
    >
      <div className="relative flex size-full flex-col items-center gap-[48px] bg-white py-[80px]">
        <p
          className="whitespace-nowrap font-[family-name:var(--font-body)] text-[40px] font-medium leading-[normal] tracking-[-1.2px] text-[#132110]"
          data-node-id="466:1299"
        >
          Explore the{' '}
          <span className="font-[family-name:var(--font-script)] font-bold text-[#f4b45a]">
            Viral Travel
          </span>
          {' Contents'}
        </p>

        <ReelRow creators={ROW1} />
        <ReelRow creators={ROW2} />
      </div>
    </FigmaFrame>
  )
}
