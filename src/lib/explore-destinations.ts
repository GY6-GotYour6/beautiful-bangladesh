/**
 * The destination set shown on the explore page and in the mobile landing
 * scroller. Single source so the two never drift apart.
 */

export type ExploreDestination = {
  name: string
  slug: string
  img: string
  description: string
}

/** CMS slugs are bare (`coxs-bazar`); some hardcoded rows store a full path. */
export function destinationHref(slug: string) {
  return slug.startsWith('/') ? slug : `/destinations/${slug}`
}

export const exploreDestinations: ExploreDestination[] = [
  {
    name: 'Cox Bazar',
    slug: 'coxs-bazar',
    img: '/explore/coxs-bazar.jpg',
    description:
      "Home to the world's longest natural sea beach, Cox's Bazar stretches 120 km along the Bay of Bengal with golden sands and stunning sunsets.",
  },
  {
    name: 'Ratargul',
    slug: 'ratargul',
    img: '/explore/ratargul.jpg',
    description:
      "Bangladesh's only freshwater swamp forest, Ratargul is a mystical green paradise where ancient trees rise from crystal-clear waters year round.",
  },
  {
    name: 'Sajek Valley',
    slug: 'sajek-valley',
    img: '/explore/sajek-valley.jpg',
    description:
      'Known as the Queen of Hills, Sajek Valley sits among the clouds in the Chittagong Hill Tracts offering breathtaking views of rolling green mountains.',
  },
  {
    name: 'Rangamati',
    slug: 'rangamati',
    img: '/explore/rangamati.jpg',
    description:
      "A serene lakeside hill district, Rangamati enchants visitors with Kaptai Lake's emerald waters, tribal culture, and lush forested hillscapes.",
  },
  {
    name: 'Saint Martin',
    slug: 'saint-martin',
    img: '/explore/saint-martin.jpg',
    description:
      "Bangladesh's only coral island, Saint Martin is a tropical gem in the Bay of Bengal with turquoise waters, coral reefs, and pristine beaches.",
  },
  {
    name: 'Sreemangal',
    slug: 'sreemangal',
    img: '/explore/sreemangal.jpg',
    description:
      'The tea capital of Bangladesh, Sreemangal is surrounded by endless rolling tea gardens, rainforests, and is home to the rare Lawachara wildlife.',
  },
]
