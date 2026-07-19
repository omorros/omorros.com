// Personal journal entries. Undated stories, each with its own page at
// /journal/<slug>. Cards on the index are square photos, like the Life
// section. Body text is plain paragraphs written in Oriol's own voice.

export interface JournalEntry {
  slug: string
  title: string
  // One line under the title on the index card and the story page.
  tagline?: string
  // Square photo for the index card.
  cardImage: string
  // Optional Tailwind object-position class for the card crop.
  cardImagePos?: string
  // Story paragraphs, rendered in order.
  body: string[]
  // Optional paragraphs rendered after the photo grid, for stories that
  // continue past the proof/photos.
  bodyAfter?: string[]
  photos?: { src: string; caption?: string }[]
  // Optional second photo grid rendered after bodyAfter, for stories with
  // two chapters (e.g. Manresa photos, then England photos).
  photosAfter?: { src: string; caption?: string }[]
  // Optional single caption line under the photosAfter grid.
  photosAfterCaption?: string
  videoUrl?: string
}

export const journal: JournalEntry[] = [
  {
    slug: 'social-media',
    title: '1.5M Followers',
    tagline: 'Growing a TikTok to 1.5 million followers in months.',
    cardImage: '/images/journal/tiktok/profile.png',
    body: [
      'I started posting on TikTok as @uriisss_ back in 2020. The account really took off between 2022 and 2023, and it was not luck: I studied how the algorithm worked, what made people engage, and treated every video as an experiment, until I understood what it took to go viral almost every time. In a matter of months it grew to 1.5 million followers and almost 40 million likes.',
      'At its peak the numbers stopped feeling real. In my best month, February, my videos got 86 million views in 28 days.',
    ],
    bodyAfter: [
      'In 2023 I stepped away from posting and moved to the other side of the screen. With two business partners, each with experience in a different corner of the social media world, I built e-commerce businesses with influencers in Spain: products that fitted their niche, sold to their audiences, giving them a new source of income beyond brand deals.',
      'Between growing the account and running the businesses, those years taught me more about attention, iteration, and shipping fast than anything else I had done. But the bigger lessons were hard work and consistency, showing up every day when the results were not there yet and not everyone around me supported it.',
      'It also changed me in a way no course could: talking to a camera, to influencers, and to business partners made me a far better communicator than I was before.',
    ],
    photos: [
      {
        src: '/images/journal/tiktok/profile.png',
        caption: 'The account at 1.5M followers and 39.4M likes.',
      },
      {
        src: '/images/journal/tiktok/analytics-feb.png',
        caption: 'My best month: 86 million video views in 28 days.',
      },
    ],
  },
  {
    slug: 'basketball',
    title: 'Basketball',
    tagline: "Seven years in Bàsquet Manresa's academy, then a scholarship in England.",
    cardImage: '/images/journal/basketball/aru-dunk-bench.jpg',
    cardImagePos: 'object-[40%_center]',
    body: [
      'I started playing basketball at school in Manresa when I was a kid, and never really stopped. I ended up joining the youth academy of [Bàsquet Manresa](https://www.basquetmanresa.com), my hometown ACB club, now BAXI Manresa, where I spent seven years.',
      'With the club I competed in the Catalan and Spanish national championships, the Minicopa Endesa, and international tournaments, facing the academies of clubs like Real Madrid, Barça, Bayern Munich, Valencia, and Joventut. I was also selected for the Catalan regional pre-selection squad.',
    ],
    photos: [
      { src: '/images/journal/basketball/manresa-fcb-layup.jpg' },
      { src: '/images/journal/basketball/manresa-jumpshot.jpg' },
    ],
    bodyAfter: [
      'In 2023 I moved to England, and basketball came with me: at ARU in Cambridge I played as a scholarship athlete while doing my degree. Training, games, and deadlines all at once taught me more about managing my time than any course did.',
      'I am not playing competitively anymore, but the game is still a big part of who I am.',
    ],
    photosAfter: [
      { src: '/images/journal/basketball/aru-dunk-1-rise.jpg' },
      { src: '/images/journal/basketball/aru-dunk-2-flush.jpg' },
      { src: '/images/journal/basketball/aru-dunk-rim.jpg' },
      { src: '/images/journal/basketball/aru-dunk-bench.jpg' },
    ],
    photosAfterCaption:
      'A dunk from a university game, frame by frame.',
  },
]
