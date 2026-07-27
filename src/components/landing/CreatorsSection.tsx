const A = 1440
const vw = (px: number) => `calc(${px} / ${A} * 100vw)`

const DEFAULT_CREATOR_HEIGHTS = [250, 280, 300, 340, 300, 280, 250]

const DEFAULT_CREATORS = [
  { src: '/landing/creators/creator-1.jpg', h: 250, name: '', instagramUrl: '' },
  { src: '/landing/creators/creator-2.jpg', h: 280, name: '', instagramUrl: '' },
  { src: '/landing/creators/creator-3.jpg', h: 300, name: '', instagramUrl: '' },
  { src: '/landing/creators/creator-4.jpg', h: 340, highlight: true, name: 'Rafsan the chotobhai', instagramUrl: 'https://www.instagram.com/rafsanthechotobhai' },
  { src: '/landing/creators/creator-5.jpg', h: 300, name: '', instagramUrl: '' },
  { src: '/landing/creators/creator-6.jpg', h: 280, name: '', instagramUrl: '' },
  { src: '/landing/creators/creator-7.jpg', h: 250, name: '', instagramUrl: '' },
]

function getHeight(index: number, total: number): number {
  const center = Math.floor(total / 2)
  const dist = Math.abs(index - center)
  const heights = DEFAULT_CREATOR_HEIGHTS
  const maxDist = Math.floor(heights.length / 2)
  const heightIdx = Math.min(dist, maxDist)
  return heights[maxDist - heightIdx] ?? 250
}

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <rect x="1" y="1" width="14" height="14" rx="4" stroke="#132110" strokeWidth="1.4" />
      <circle cx="8" cy="8" r="3.5" stroke="#132110" strokeWidth="1.4" />
      <circle cx="11.5" cy="4.5" r="0.8" fill="#132110" />
    </svg>
  )
}

export function CreatorsSection({
  creators: cmsCreators,
}: {
  creators?: { name: string; imagePath: string; instagramUrl: string }[]
}) {
  const creators =
    cmsCreators && cmsCreators.length > 0
      ? cmsCreators.map((c, i, arr) => ({
          src: c.imagePath,
          h: getHeight(i, arr.length),
          highlight: i === Math.floor(arr.length / 2),
          name: c.name,
          instagramUrl: c.instagramUrl,
        }))
      : DEFAULT_CREATORS

  const highlighted = creators.find((c) => c.highlight)

  return (
    <section
      className="flex w-full flex-col items-center bg-[#fffae7]"
      style={{
        height: '100dvh',
        overflow: 'clip',
        scrollSnapAlign: 'start',
        scrollSnapStop: 'always',
        padding: vw(80),
        gap: vw(48),
      }}
      data-node-id="701:1926"
    >
      {/* Title */}
      <h2
        className="font-medium text-[#132110]"
        style={{ fontSize: vw(40), letterSpacing: vw(-1.2), lineHeight: 'normal' }}
      >
        Bangladeshi Creators You Should Watch
      </h2>

      {/* Cards + label */}
      <div className="flex flex-col items-center" style={{ gap: vw(12) }}>
        {/* Card row — bottom aligned */}
        <div className="flex items-end" style={{ gap: vw(12) }}>
          {creators.map((c, i) => (
            <div
              key={i}
              className="relative shrink-0 overflow-hidden rounded-[12px]"
              style={{
                width: vw(250),
                height: vw(c.h),
                background: c.highlight ? '#f4df92' : '#d4d4d4',
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={c.src}
                alt=""
                className="absolute inset-0 size-full max-w-none object-cover"
                draggable={false}
              />
            </div>
          ))}
        </div>

        {/* Highlighted creator label */}
        {highlighted && (highlighted.name || highlighted.instagramUrl) && (
          <div className="flex flex-col items-center" style={{ gap: vw(4) }}>
            {highlighted.name && (
              <p
                className="font-medium capitalize text-[#132110]"
                style={{ fontSize: vw(18), letterSpacing: vw(-0.54), lineHeight: 'normal' }}
              >
                {highlighted.name}
              </p>
            )}
            {highlighted.instagramUrl && (
              <div className="flex items-center justify-center" style={{ gap: vw(4) }}>
                <InstagramIcon />
                <p
                  className="text-[#132110] opacity-60"
                  style={{ fontSize: vw(14), lineHeight: 'normal' }}
                >
                  @{highlighted.instagramUrl.replace(/^https?:\/\/(www\.)?instagram\.com\/?/, '').replace(/\/$/, '')}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
