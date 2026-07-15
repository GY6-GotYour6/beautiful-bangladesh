import { FigmaStack, hs } from '@/components/landing/FigmaStack'
import { CtaSection } from '@/components/landing/CtaSection'
import { ResponsiveFigmaPage } from '@/components/landing/ResponsiveFigmaPage'
import { DESKTOP_HEADER_CLIP, MOBILE_HEADER_CLIP } from '@/lib/nav-config'

const BASE = '/landing/figma/designs/destination'

const relatedDest = [
  hs('/explore', 'View All', 1280, 80, 80, 40),
  hs('/destinations/chittagong', 'Chittagong', 80, 173, 302, 267),
  hs('/destinations/sylhet', 'Sylhet', 406, 173, 302, 267),
  hs('/destinations/bandarban', 'Bandarban', 732, 173, 302, 267),
  hs('/destinations/coxs-bazar', "Cox's Bazar", 1058, 173, 302, 267),
]

function DestinationDesktop({ title }: { title: string }) {
  return (
    <div
      className="relative w-full overflow-x-clip bg-white"
      data-node-id="466:1479"
      data-destination={title}
    >
      <FigmaStack
        bare
        nodeId="466:1479-body"
        sections={[
          {
            src: `${BASE}/01-header.webp`,
            width: 1440,
            height: 1080,
            nodeId: '466:1480',
            label: `${title} hero`,
            clipTop: DESKTOP_HEADER_CLIP,
          },
          {
            src: `${BASE}/02-details.webp`,
            width: 1440,
            height: 450,
            nodeId: '466:1486',
            label: `About ${title}`,
          },
          {
            src: `${BASE}/03-gallery.webp`,
            width: 1440,
            height: 330,
            nodeId: '466:1532',
            label: `${title} gallery`,
          },
          {
            src: `${BASE}/04-must-try.webp`,
            width: 1440,
            height: 1484,
            nodeId: '466:1538',
            label: `${title} must try`,
          },
          {
            id: 'creator-reels',
            src: `${BASE}/05-reels.webp`,
            width: 1440,
            height: 1097,
            nodeId: '466:1560',
            label: `${title} creator reels`,
          },
          {
            src: `${BASE}/06-highlight.webp`,
            width: 1440,
            height: 649,
            nodeId: '466:1640',
            label: `Highlights of ${title}`,
          },
          {
            src: `${BASE}/07-destinations.webp`,
            width: 1440,
            height: 520,
            nodeId: '466:1718',
            label: 'Top destinations',
            hotspots: relatedDest,
          },
          {
            src: `${BASE}/08-faq.webp`,
            width: 1440,
            height: 693,
            nodeId: '466:1747',
            label: `${title} FAQ`,
          },
        ]}
      />
      <CtaSection />
    </div>
  )
}

function DestinationMobile({ title }: { title: string }) {
  return (
    <FigmaStack
      nodeId="498:2910"
      destination={title}
      sections={[
        {
          src: '/landing/figma/designs/mobile/destination.webp',
          width: 390,
          height: 7473,
          nodeId: '498:2910',
          label: `${title} mobile`,
          clipTop: MOBILE_HEADER_CLIP,
          hotspots: [hs('/explore', 'View All destinations', 310, 5376, 64, 24)],
        },
      ]}
    />
  )
}

/** Destination details — Designs `466:1479` / mobile `498:2910`. */
export function DestinationPage({ title = "Cox's Bazar" }: { title?: string }) {
  return (
    <ResponsiveFigmaPage
      desktop={<DestinationDesktop title={title} />}
      mobile={<DestinationMobile title={title} />}
    />
  )
}
