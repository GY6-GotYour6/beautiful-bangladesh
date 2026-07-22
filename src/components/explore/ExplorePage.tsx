import Link from 'next/link'
import { ResponsiveFigmaPage } from '@/components/landing/ResponsiveFigmaPage'
import { CtaSection } from '@/components/landing/CtaSection'
import { CtaButton } from '@/components/landing/CtaButton'
import { MobileCta } from '@/components/landing/MobileSections'
import { DESKTOP_ARTBOARD, DESKTOP_EXPLORE_OFFSET } from '@/lib/nav-config'
import type { CmsDestinationListItem } from '@/lib/cms-data'

type DestCardProps = {
  name: string
  slug: string
  img: string
}

function DestCard({ name, slug, img }: DestCardProps) {
  return (
    <Link
      href={`/destinations/${slug}`}
      className="group relative min-w-0 flex-1 h-[300px] overflow-clip rounded-[12px] block"
      aria-label={name}
    >
      {img ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={img}
          alt=""
          className="absolute inset-0 size-full max-w-none object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          draggable={false}
        />
      ) : (
        <div className="absolute inset-0 bg-[#2a4a24]" />
      )}
      <div className="absolute inset-0 bg-[rgba(0,0,0,0.34)]" />
      <p
        className="pointer-events-none absolute bottom-[107px] left-0 right-0 translate-y-full text-center
          font-[family-name:var(--font-script)] text-[80px] leading-[1.4] tracking-[-2.4px]
          whitespace-nowrap text-white"
      >
        {name}
      </p>
    </Link>
  )
}

const EXPLORE_TOP = `calc(${DESKTOP_EXPLORE_OFFSET} / ${DESKTOP_ARTBOARD} * 100vw)`

function ExploreCategories({ destinations }: { destinations: CmsDestinationListItem[] }) {
  return (
    <section
      className="bg-white flex flex-col gap-[32px] pb-[40px] px-[40px] w-full"
      style={{ paddingTop: EXPLORE_TOP }}
      data-node-id="466:731"
    >
      <div className="flex flex-col gap-[16px] text-[#132110]" data-node-id="602:364">
        <p
          className="font-[family-name:var(--font-body)] text-[40px] font-medium leading-none
            tracking-[-0.64px] capitalize"
          data-node-id="602:365"
        >
          Find your{' '}
          <span className="font-[family-name:var(--font-script)] font-bold text-[#31542a]">
            perfect
          </span>{' '}
          destination experience
        </p>
        <p
          className="font-[family-name:var(--font-body)] text-[18px] leading-[1.4] opacity-60"
          data-node-id="603:412"
        >
          Where endless golden shores meet the Bay of Bengal. From sunrise walks and seafood feasts
          to dramatic coastal drives and hidden beaches. Where endless golden shores meet the Bay of
          Bengal. From sunrise walks and seafood feasts to dramatic coastal drives and hidden beaches.
        </p>
      </div>

      {destinations.length === 0 ? (
        <p className="text-[#132110] opacity-40 text-[18px]">No destinations published yet.</p>
      ) : (
        <div className="grid grid-cols-2 gap-[16px]">
          {destinations.map((d) => (
            <DestCard key={d.slug} name={d.name} slug={d.slug} img={d.thumb} />
          ))}
        </div>
      )}

      <div className="flex justify-center" data-node-id="602:367">
        <CtaButton size="sm" label="Check Out Reels" />
      </div>
    </section>
  )
}

function ExploreDesktop({ destinations }: { destinations: CmsDestinationListItem[] }) {
  return (
    <div className="relative w-full overflow-x-clip bg-white" data-node-id="466:730">
      <ExploreCategories destinations={destinations} />
      <CtaSection />
    </div>
  )
}

function ExploreMobile({ destinations }: { destinations: CmsDestinationListItem[] }) {
  return (
    <div className="relative w-full overflow-x-clip bg-white" data-node-id="498:3222">
      <section className="flex w-full flex-col gap-[24px] px-[16px] pt-[78px] pb-[40px]">
        <div className="flex flex-col gap-[12px]">
          <h1 className="font-[family-name:var(--font-body)] text-[20px] font-medium tracking-[-0.6px] text-[#132110] capitalize">
            Find your{' '}
            <span className="font-[family-name:var(--font-script)] font-bold text-[#31542a]">
              perfect
            </span>{' '}
            destination experience
          </h1>
          <p className="font-[family-name:var(--font-body)] text-[13px] leading-[1.4] text-[#132110] opacity-60">
            Where endless golden shores meet the Bay of Bengal. From sunrise walks and seafood
            feasts to dramatic coastal drives and hidden beaches.
          </p>
        </div>

        {destinations.length === 0 ? (
          <p className="text-[#132110] opacity-40 text-[13px]">No destinations published yet.</p>
        ) : (
          <div className="grid grid-cols-2 gap-[12px]">
            {destinations.map((d) => (
              <Link
                key={d.slug}
                href={`/destinations/${d.slug}`}
                className="group relative aspect-[171/120] overflow-clip rounded-[12px] block"
                aria-label={d.name}
              >
                {d.thumb ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={d.thumb}
                    alt=""
                    className="absolute inset-0 size-full max-w-none object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    draggable={false}
                  />
                ) : (
                  <div className="absolute inset-0 bg-[#2a4a24]" />
                )}
                <div className="absolute inset-0 bg-[rgba(0,0,0,0.34)]" />
                <p
                  className="pointer-events-none absolute bottom-[35%] left-0 right-0 translate-y-full
                    text-center font-[family-name:var(--font-script)] text-[28px] leading-[1.4]
                    tracking-[-0.84px] whitespace-nowrap text-white"
                >
                  {d.name}
                </p>
              </Link>
            ))}
          </div>
        )}

        <CtaButton size="sm" label="Check Out Reels" className="mt-[8px] self-center" />
      </section>
      <MobileCta />
    </div>
  )
}

type ExplorePageProps = {
  destinations: CmsDestinationListItem[]
}

export function ExplorePage({ destinations }: ExplorePageProps) {
  return (
    <ResponsiveFigmaPage
      desktop={<ExploreDesktop destinations={destinations} />}
      mobile={<ExploreMobile destinations={destinations} />}
    />
  )
}
