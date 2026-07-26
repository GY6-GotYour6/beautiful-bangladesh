const A = 1440
const vw = (px: number) => `calc(${px} / ${A} * 100vw)`

const creators = [
  { src: '/landing/creators/creator-1.jpg', h: 250 },
  { src: '/landing/creators/creator-2.jpg', h: 280 },
  { src: '/landing/creators/creator-3.jpg', h: 300 },
  { src: '/landing/creators/creator-4.jpg', h: 340, highlight: true },
  { src: '/landing/creators/creator-5.jpg', h: 300 },
  { src: '/landing/creators/creator-6.jpg', h: 280 },
  { src: '/landing/creators/creator-7.jpg', h: 250 },
]

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <rect x="1" y="1" width="14" height="14" rx="4" stroke="#132110" strokeWidth="1.4" />
      <circle cx="8" cy="8" r="3.5" stroke="#132110" strokeWidth="1.4" />
      <circle cx="11.5" cy="4.5" r="0.8" fill="#132110" />
    </svg>
  )
}

export function CreatorsSection() {
  return (
    <section
      className="flex w-full flex-col items-center bg-[#fffae7]"
      style={{
        height: '100dvh',
        overflow: 'clip',
        scrollSnapAlign: 'start',
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

        {/* Highlighted creator label (center = creator-4 = Rafsan) */}
        <div className="flex flex-col items-center" style={{ gap: vw(4) }}>
          <p
            className="font-medium capitalize text-[#132110]"
            style={{ fontSize: vw(18), letterSpacing: vw(-0.54), lineHeight: 'normal' }}
          >
            Rafsan the chotobhai
          </p>
          <div className="flex items-center justify-center" style={{ gap: vw(4) }}>
            <InstagramIcon />
            <p
              className="text-[#132110] opacity-60"
              style={{ fontSize: vw(14), lineHeight: 'normal' }}
            >
              @rafsanthechotobhai
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
