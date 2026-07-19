export type CmsStatus = 'published' | 'draft'

export type CmsDestinationListItem = {
  id?: number | string
  slug: string
  name: string
  region: string
  status: CmsStatus
  items: number
  modified: string
  thumb: string
}

export type CmsCardItem = { title: string; description: string; embedUrl?: string }

export type CmsDestinationRecord = {
  id?: number | string
  slug: string
  name: string
  region: string
  status: CmsStatus
  featured: boolean
  heroImage: string
  heroImageId?: number | string | null
  heroVideoUrl?: string
  heroTitle: string
  heroSubtitle: string
  location: string
  travelDuration: string
  experienceType: string
  hangoutType: string
  overviewTitle: string
  overviewDescription: string
  sidebarQuote: string
  gallery?: string[]
  galleryIds?: (number | string)[]
  foods: CmsCardItem[]
  subDestinations: CmsCardItem[]
  cultureItems: CmsCardItem[]
  events: { title: string; date: string }[]
  highlightImage?: string
  highlightImageId?: number | string | null
  highlights: { title: string; description: string }[]
  social: { creator: string; platform: string; embedUrl?: string }[]
  related: string[]
  relatedIds?: (number | string)[]
  faqs: { question: string; answer: string }[]
  metaTitle?: string
  metaDescription?: string
}

/** Seed source for Cox's Bazar + list stubs (Payload is source of truth at runtime). */
export const cmsDestinations: CmsDestinationListItem[] = [
  {
    slug: 'coxs-bazar',
    name: "Cox's Bazar",
    region: 'Chittagong',
    status: 'published',
    items: 47,
    modified: 'Jun 12, 2025',
    thumb: '/cms/thumbs/01.jpg',
  },
  {
    slug: 'sundarbans',
    name: 'Sundarbans',
    region: 'Khulna',
    status: 'published',
    items: 32,
    modified: 'Jun 10, 2025',
    thumb: '/cms/thumbs/02.jpg',
  },
  {
    slug: 'bandarban-hills',
    name: 'Bandarban Hills',
    region: 'Chittagong',
    status: 'draft',
    items: 15,
    modified: 'Jun 5, 2025',
    thumb: '/cms/thumbs/03.jpg',
  },
  {
    slug: 'saint-martins-island',
    name: "Saint Martin's Island",
    region: 'Chittagong',
    status: 'published',
    items: 38,
    modified: 'Jun 3, 2025',
    thumb: '/cms/thumbs/04.jpg',
  },
  {
    slug: 'sylhet-tea-gardens',
    name: 'Sylhet Tea Gardens',
    region: 'Sylhet',
    status: 'published',
    items: 28,
    modified: 'May 28, 2025',
    thumb: '/cms/thumbs/05.jpg',
  },
  {
    slug: 'sajek-valley',
    name: 'Sajek Valley',
    region: 'Chittagong',
    status: 'draft',
    items: 12,
    modified: 'May 22, 2025',
    thumb: '/cms/thumbs/06.jpg',
  },
  {
    slug: 'rangamati',
    name: 'Rangamati',
    region: 'Chittagong',
    status: 'published',
    items: 25,
    modified: 'May 18, 2025',
    thumb: '/cms/thumbs/07.jpg',
  },
  {
    slug: 'kuakata',
    name: 'Kuakata',
    region: 'Barishal',
    status: 'draft',
    items: 18,
    modified: 'May 12, 2025',
    thumb: '/cms/thumbs/08.jpg',
  },
]

export const coxRecord: CmsDestinationRecord = {
  slug: 'coxs-bazar',
  name: "Cox's Bazar",
  region: 'Chittagong',
  status: 'published',
  featured: true,
  heroImage: '/cms/thumbs/01.jpg',
  heroTitle: "Cox's Bazar",
  heroSubtitle:
    'Experience worlds largest sea beach where you can experience the calm of sea',
  location: 'Cox Bazar, Bangladesh',
  travelDuration: '9 - 12 Hours',
  experienceType: 'Hill & Beach Loving',
  hangoutType: 'Group/Couple',
  overviewTitle: "The World's Largest Natural Sea Beach",
  overviewDescription:
    "Where endless golden shores meet the Bay of Bengal. From sunrise walks and seafood feasts to dramatic coastal drives and hidden beaches. Cox's Bazar is Bangladesh's most iconic destination and one of South Asia's most unique coastal experiences. The beach stretches roughly 120 km.",
  sidebarQuote:
    'Where endless golden shores meet the Bay of Bengal — a coastline that stays with you.',
  foods: [
    { title: 'Fresh Grilled Seafood', description: 'Caught daily by local fishermen' },
    { title: 'Shutki Maach (Dried Fish)', description: 'A coastal specialty' },
    { title: 'Local Prawn Curry', description: 'Rich and aromatic' },
    { title: 'Fresh Tropical Fruits', description: 'Seasonal market picks' },
  ],
  subDestinations: [
    { title: "Saint Martin's Island", description: "Bangladesh's only coral island" },
    { title: 'Inani Beach', description: 'Dramatic rock formations' },
    { title: 'Himchari Waterfall', description: 'Lush forest trails' },
    { title: 'Maheshkhali Island', description: 'Temples and quiet shores' },
  ],
  cultureItems: [
    { title: 'Rakhaine Cultural Village', description: 'Centuries-old traditions and crafts' },
    { title: "Cox's Bazar Museum", description: 'Local history and coastal heritage' },
    { title: 'Buddhist Temples at Ramu', description: 'Ancient pagodas and monastery grounds' },
  ],
  events: [
    { title: 'Beach Carnival 2025', date: 'Dec 2025' },
    { title: 'Seafood Festival', date: 'Nov 2025' },
    { title: 'Cultural Heritage Week', date: 'Oct 2025' },
  ],
  highlights: [
    { title: 'Fresh Seafood by the Shore', description: 'Caught daily by local fishermen' },
    { title: 'Rakhaine Cultural Village', description: 'Centuries-old traditions and crafts' },
    { title: 'Sunset at Laboni Beach Point', description: 'Golden skies over the Bay of Bengal' },
    { title: 'Buddhist Temples at Ramu', description: 'Ancient pagodas and serene grounds' },
    { title: "World's Longest Sea Beach", description: '120 km of unbroken shoreline' },
    { title: 'Explore Inani Rocky Beach', description: 'Dramatic stone formations meet the sea' },
    { title: "Visit Saint Martin's Island", description: "Bangladesh's only coral island" },
    { title: 'Himchari Waterfall & Hills', description: 'Lush forest trails and cascading falls' },
  ],
  social: [
    {
      creator: 'Nadir On the Go',
      platform: 'YouTube',
      embedUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    },
    {
      creator: 'Rafsan the Chotobhai',
      platform: 'YouTube',
      embedUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    },
    { creator: 'Salahuddin Sumon', platform: 'Instagram', embedUrl: '' },
    { creator: 'Rakib Hussain', platform: 'Facebook', embedUrl: '' },
  ],
  related: ['Bandarban Hills', "Saint Martin's Island", 'Sajek Valley', 'Kuakata'],
  faqs: [
    {
      question: 'How do I get there from Dhaka?',
      answer:
        'Flights to Cox’s Bazar take about 1 hour. Overnight buses and private cars are also common.',
    },
    {
      question: "Is Cox's Bazar safe to travel?",
      answer: 'Yes for typical tourist areas. Use standard travel precautions, especially at night.',
    },
    {
      question: 'What is the best time to visit?',
      answer: 'November to February offers the clearest skies and calmer seas.',
    },
    {
      question: 'Do I need a permit for Saint Martin’s?',
      answer: 'Rules change seasonally — check local ferry operators before you travel.',
    },
    {
      question: 'Where should I stay?',
      answer: 'Laboni and Kolatoli are convenient; Inani is quieter and closer to rocky beaches.',
    },
  ],
  metaTitle: "Cox's Bazar | Beautiful Bangladesh",
  metaDescription:
    "Home to the world's longest natural sea beach, stretching 120 km along the Bay of Bengal.",
}

export function emptyDestinationRecord(): CmsDestinationRecord {
  return {
    slug: '',
    name: '',
    region: 'Chittagong',
    status: 'draft',
    featured: false,
    heroImage: '',
    heroVideoUrl: '',
    heroTitle: '',
    heroSubtitle: '',
    location: '',
    travelDuration: '',
    experienceType: '',
    hangoutType: 'Group/Couple',
    overviewTitle: '',
    overviewDescription: '',
    sidebarQuote: '',
    gallery: [],
    galleryIds: [],
    foods: [],
    subDestinations: [],
    cultureItems: [],
    events: [],
    highlightImage: '',
    highlightImageId: null,
    highlights: [],
    social: [],
    related: [],
    relatedIds: [],
    faqs: [],
  }
}
