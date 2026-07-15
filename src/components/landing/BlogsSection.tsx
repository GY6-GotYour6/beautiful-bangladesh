import Link from 'next/link'
import { FigmaFrame } from './FigmaFrame'

const CARDS = [
  {
    href: '/explore',
    frame: '/landing/blogs/frame-yellow.svg',
    photo: '/landing/blogs/river.png',
    photoH: 309,
    photoW: 316,
    photoTop: 20.6,
    cardH: 418.432,
    cardW: 357,
    title: '10 Scenic River Trips to Take in Bangladesh',
    desc: 'Everything you need to know before planning your perfect riverside adventure in Bangladesh.',
    textColor: '#5c3600',
    textLeft: 19.01,
    textBottom: 16.83,
    titleSize: 18,
    descSize: 14,
  },
  {
    href: '/destinations/sajek',
    frame: '/landing/blogs/frame-green.svg',
    photo: '/landing/blogs/swing.png',
    photoH: 309,
    photoW: 316,
    photoTop: 20.17,
    cardH: 418,
    cardW: 357,
    title: '10 Must-See Spots to Visit in Rangamati',
    desc: "Everything you need to know before visiting for the Bangladesh's most stunning lake destination.",
    textColor: '#6d5600',
    textLeft: 20.01,
    textBottom: 16.83,
    titleSize: 18,
    descSize: 14,
  },
  {
    href: '/destinations/bandarban',
    frame: '/landing/blogs/frame-teal.svg',
    photo: '/landing/blogs/rangamati-hills.png',
    photoH: 342,
    photoW: 359,
    photoTop: 21.17,
    cardH: 464,
    cardW: 400,
    title: 'Top 10 Hidden Gems of the Rangamati Hills',
    desc: "Everything you need to know before heading to the first of  Bangladesh's most scenic hill district destination.",
    textColor: '#132110',
    textLeft: 20,
    textBottom: 24.11,
    titleSize: 20.384,
    descSize: 15.288,
    centerCard: true,
  },
  {
    href: '/explore',
    frame: '/landing/blogs/frame-blue.svg',
    photo: '/landing/blogs/padma.png',
    photoH: 309,
    photoW: 316,
    photoTop: 20.6,
    cardH: 418.432,
    cardW: 357,
    title: '10 Best Hour Spots on Padma River',
    desc: 'Everything you need to know before capturing the most most beautiful sunsets over Bangladeshi rivers.',
    textColor: '#003a42',
    textLeft: 20,
    textBottom: 16.83,
    titleSize: 18,
    descSize: 14,
  },
  {
    href: '/destinations/chittagong',
    frame: '/landing/blogs/frame-pink.svg',
    photo: '/landing/blogs/fishing.png',
    photoH: 309,
    photoW: 316,
    photoTop: 20.17,
    cardH: 418,
    cardW: 357,
    title: '10 Amazing Fishing Villages to Visit in BD',
    desc: "Everything you need to know before visiting for the Bangladesh's most authentic rural experience.",
    textColor: '#440000',
    textLeft: 20.01,
    textBottom: 16.83,
    titleSize: 18,
    descSize: 14,
  },
] as const

function BlogCard({
  href,
  frame,
  photo,
  photoH,
  photoW,
  photoTop,
  cardH,
  cardW,
  title,
  desc,
  textColor,
  textLeft,
  textBottom,
  titleSize,
  descSize,
  centerCard,
}: (typeof CARDS)[number] & { centerCard?: boolean }) {
  return (
    <Link
      href={href}
      className="relative block shrink-0 group"
      style={{ width: cardW, height: cardH }}
    >
      {/* Stamp body (opaque) — behind photo */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt=""
        className="absolute inset-0 block max-w-none size-full pointer-events-none"
        src={frame}
        draggable={false}
      />

      {/* Photo sits in the stamp window, above the colored body */}
      <div
        className="absolute z-[1] overflow-hidden"
        style={{
          width: photoW,
          height: photoH,
          top: photoTop,
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        {centerCard ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt=""
              className="pointer-events-none absolute left-0 top-[-30.33%] h-[272.64%] w-full max-w-none transition-transform duration-300 group-hover:scale-[1.04]"
              src={photo}
              draggable={false}
            />
            <div className="absolute inset-0 bg-[rgba(0,0,0,0.2)]" />
          </>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            alt=""
            className="absolute inset-0 size-full max-w-none object-cover transition-transform duration-300 group-hover:scale-[1.04]"
            src={photo}
            draggable={false}
          />
        )}
      </div>

      {/* Caption */}
      <div
        className="absolute z-[2] flex flex-col gap-[4px] items-start justify-center pr-[9.2px] leading-[normal]"
        style={{
          bottom: textBottom,
          left: textLeft,
          color: textColor,
          width: centerCard ? undefined : photoW,
        }}
      >
        <p
          className="font-[family-name:var(--font-body)] font-medium whitespace-nowrap text-center"
          style={{ fontSize: titleSize }}
        >
          {title}
        </p>
        <p
          className="font-[family-name:var(--font-body)] opacity-60 w-full"
          style={{
            fontSize: descSize,
            lineHeight: centerCard ? 1.4 : undefined,
            letterSpacing: centerCard ? '-0.4586px' : undefined,
          }}
        >
          {desc}
        </p>
      </div>
    </Link>
  )
}

/** Blogs / Locations section — Figma `466:1378` (1440×1028). */
export function BlogsSection() {
  const [left1, left2, center, right1, right2] = CARDS

  return (
    <FigmaFrame
      width={1440}
      height={1028}
      data-node-id="466:1378"
      aria-label="Explore Locations with Diversity"
    >
      <div className="relative size-full flex flex-col gap-[32px] items-center justify-center p-[80px]">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[#f5efe5]" />
          <div
            className="absolute inset-0 mix-blend-overlay opacity-60"
            style={{
              backgroundImage: 'url(/landing/blogs/pattern.png)',
              backgroundSize: '204.8px 204.8px',
              backgroundPosition: 'top left',
            }}
          />
        </div>

        <p
          className="pointer-events-none absolute z-[1] left-1/2 top-[98.6px] w-[300px] -translate-x-1/2 text-center font-[family-name:var(--font-body)] text-[40px] font-medium leading-[normal] tracking-[-1.2px] text-[#39260b]"
          data-node-id="466:1413"
        >
          {'Explore '}
          <span className="font-[family-name:var(--font-script)] font-bold">Locations</span>
          {' with Diversity'}
        </p>

        <div className="relative z-[1] flex gap-[32px] items-center shrink-0" data-node-id="466:1379">
          <div className="flex flex-col gap-[32px] items-start shrink-0">
            <BlogCard {...left1} />
            <BlogCard {...left2} />
          </div>
          <BlogCard {...center} />
          <div className="flex flex-col gap-[32px] items-start shrink-0">
            <BlogCard {...right1} />
            <BlogCard {...right2} />
          </div>
        </div>

        <div
          className="pointer-events-none absolute bottom-[0.83px] left-1/2 z-[1] h-[267px] w-[200px] -translate-x-1/2"
          aria-hidden
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            className="absolute inset-0 size-full max-w-none object-cover"
            src="/landing/blogs/bd-flag.png"
            draggable={false}
          />
        </div>
      </div>
    </FigmaFrame>
  )
}
