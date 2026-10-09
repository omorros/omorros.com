// Personal journal entries. Undated stories, each with its own page at
// /journal/<slug>. Cards on the index are square photos, like the Life
// section. Body text is plain paragraphs written in Oriol's own voice.

export interface JournalPhoto {
  src: string
  // Pixel size of the file. Photos sharing a row are scaled to the same
  // height from this, and it reserves their space while they load.
  width: number
  height: number
  // Describes the photo for screen readers. Falls back to the caption,
  // then the entry title.
  alt?: string
  caption?: string
  // Takes a row on its own. Use for wide group shots.
  wide?: boolean
}

// A decorative sticker, placed loosely like a sticker on a laptop.
export interface JournalSticker {
  src: string
  width: number
  height: number
  // Rotation in degrees.
  rotate: number
}

// A sticker in the page margin, shown on wide screens only.
export interface JournalMarginSticker extends JournalSticker {
  side: 'left' | 'right'
  // How far down the story it sits, as a percentage of its height.
  top: number
  // Rendered width in pixels.
  size: number
}

export interface JournalEntry {
  slug: string
  title: string
  // Last significant content, structured-data, or link update (YYYY-MM-DD).
  lastModified: string
  // One line under the title on the index card and the story page.
  tagline?: string
  // Square photo for the index card.
  cardImage: string
  // 1200x630 PNG used when the page is shared. Falls back to the site card.
  shareImage?: string
  shareImageAlt?: string
  // Optional Tailwind object-position class for the card crop.
  cardImagePos?: string
  // Story paragraphs, rendered in order.
  body: string[]
  // Optional paragraphs rendered after the photo grid, for stories that
  // continue past the proof/photos.
  bodyAfter?: string[]
  photos?: JournalPhoto[]
  // Optional second photo grid rendered after bodyAfter, for stories with
  // two chapters (e.g. Manresa photos, then England photos).
  photosAfter?: JournalPhoto[]
  // Optional single caption line under the photosAfter grid.
  photosAfterCaption?: string
  // Self-hosted mp4, shown click-to-play right under the title.
  videoUrl?: string
  // One line under the video.
  videoCaption?: string
  // 16:9 poster for the video. Falls back to cardImage.
  videoPoster?: string
  // Sticker next to the title, on every screen size.
  titleSticker?: JournalSticker
  // Stickers scattered down the margins.
  stickers?: JournalMarginSticker[]
}

export const journal: JournalEntry[] = [
  {
    slug: 'eat-hack',
    title: 'EAT HACK',
    lastModified: '2026-10-10',
    tagline:
      "How Gianni and I put on the world's first AI and eating hackathon in three weeks.",
    cardImage: '/images/journal/eat-hack/card.jpg',
    shareImage: '/images/journal/eat-hack/share.png',
    shareImageAlt:
      'Oriol Morros and Gianni Austin at EAT HACK, in front of the Really Good Culture welcome banner',
    videoUrl: '/videos/eat-hack-recap.mp4',
    videoPoster: '/images/journal/eat-hack/video-poster.jpg',
    videoCaption: 'The recap video.',
    body: [
      "On Saturday 3 October 2026, I co-hosted my first hackathon with my friend and colleague [Gianni Austin](https://www.linkedin.com/in/gianni-austin). We ran EAT HACK, the world's first AI and eating hackathon, at [Really Good Culture](https://reallygoodculture.com). 50 people, selected from over 200 applications, came into our London office to build AI for the human side and the future of retail.",
      'It started with a chat over coffee. Gianni works in growth and wanted to do something bigger than LinkedIn, something in person. I had been to [loads of hackathons](/projects) as a builder. Somewhere in that conversation we landed on hosting our own, and we started planning it straight away.',
      'We pitched it to our co-founders, got the budget approved within a few days, and then had three weeks to make it happen. Neither of us could work on it full time. Gianni was working in a growth role part-time, and I was a full-time AI engineer with my own deliveries and deadlines. Those weeks were intense: cold outreach, branding, design, printing, logistics, timings, more than a few late nights, and even more coffee.',
      'We even had to change the format after we had announced it. The original plan gave builders points for trying products and filming reviews, but after feedback and some reflection we realised it was not worth it, so we pivoted. The day ended up with two tracks: Human Truth, on why people choose what they choose, and Retail Futures, on what retail should do next.',
      'And then there was The Shelf. 18 FMCG brands partnered with us: not the big household names, but innovative, unique challenger brands. Together they brought over 1,000 units of product, so everyone could eat and drink all day.',
      'The best part was the synergy with Gianni. He owned the brand partnerships, the proposals, the budget, and procurement. I owned the challenge and the tracks, the sign-ups on Luma, choosing the 50 builders, and every message before, during, and after the event. We came up with the big ideas together and covered for each other wherever it was needed, and that is what made it work.',
      'None of this was just the two of us. Thank you to Sophie Yau and our co-founders, David and Adam, for backing us and the pivot, and to Adam for an amazing presentation. Thank you to Phil, Joana, Ege, Cristian, Mateo, and Sahil for judging, handing out lunch and stickers, and looking after everyone all day. And a huge thank you to [Layla Syed Wilkinson](https://www.linkedin.com/in/laylasyed/), our photographer and videographer, for the incredible photos and video.',
    ],
    // Everyone first, then The Shelf, the day itself, and the team.
    photos: [
      {
        src: '/images/journal/eat-hack/everyone.jpg',
        width: 2400,
        height: 1600,
        wide: true,
        alt: 'Everyone at EAT HACK together in the Really Good Culture office',
      },
      {
        src: '/images/journal/eat-hack/brands.jpg',
        width: 2400,
        height: 1600,
        alt: 'The Meet The Shelf slide with the logos of the 18 partner brands',
      },
      {
        src: '/images/journal/eat-hack/shelf.jpg',
        width: 1800,
        height: 2400,
        alt: 'The Shelf: two shelving units stacked with snacks and drinks from the partner brands',
      },
      {
        src: '/images/journal/eat-hack/cheers.jpg',
        width: 2400,
        height: 1600,
        alt: 'Builders toasting with cans from The Shelf',
      },
      {
        src: '/images/journal/eat-hack/helping-a-team.jpg',
        width: 2400,
        height: 1600,
        alt: 'Oriol helping a team with their build',
      },
      {
        src: '/images/journal/eat-hack/team.jpg',
        width: 2400,
        height: 1600,
        alt: 'Oriol and Gianni with the Really Good Culture team in front of the welcome banner',
      },
      {
        src: '/images/journal/eat-hack/welcome.jpg',
        width: 2400,
        height: 1600,
        alt: 'Oriol, Gianni and Sophie Yau next to the welcome banner and The Shelf',
      },
    ],
    titleSticker: { src: '/images/journal/eat-hack/stickers/eat-hack-window.png', width: 440, height: 391, rotate: 7 },
    // Loose on purpose: uneven spacing, and the sides do not strictly alternate.
    stickers: [
      { src: '/images/journal/eat-hack/stickers/noodles.png', width: 313, height: 440, rotate: -6, side: 'left', top: 5, size: 110 },
      { src: '/images/journal/eat-hack/stickers/accept-cookies.png', width: 396, height: 440, rotate: 8, side: 'right', top: 15, size: 135 },
      { src: '/images/journal/eat-hack/stickers/pizza-box.png', width: 427, height: 440, rotate: -7, side: 'right', top: 40, size: 145 },
      { src: '/images/journal/eat-hack/stickers/git-snack.png', width: 440, height: 319, rotate: 5, side: 'left', top: 52, size: 155 },
      { src: '/images/journal/eat-hack/stickers/eat-hack-type.png', width: 440, height: 278, rotate: -9, side: 'right', top: 73, size: 150 },
    ],
  },
  {
    slug: 'social-media',
    title: '1.5M Followers',
    lastModified: '2026-08-16',
    tagline:
      'How I grew a TikTok to 1.5 million followers, before software.',
    cardImage: '/images/journal/tiktok/profile.png',
    body: [
      'I started posting on [TikTok](https://www.tiktok.com/@uriisss_) as @uriisss_ back in 2020, all of it in Spanish. The account really took off between 2022 and 2023, and it was not luck: I studied how the algorithm worked, what made people engage, and treated every video as an experiment, until I understood what it took to go viral almost every time. In a matter of months it grew to 1.5 million followers and almost 40 million likes.',
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
        width: 828,
        height: 785,
        caption: 'The account at 1.5M followers and 39.4M likes.',
      },
      {
        src: '/images/journal/tiktok/analytics-feb.png',
        width: 853,
        height: 812,
        caption: 'My best month: 86 million video views in 28 days.',
      },
    ],
  },
  {
    slug: 'basketball',
    title: 'Basketball',
    lastModified: '2026-08-16',
    tagline: "Seven years in Bàsquet Manresa's academy, then a scholarship in England.",
    cardImage: '/images/journal/basketball/aru-dunk-bench.jpg',
    cardImagePos: 'object-[40%_center]',
    body: [
      'I started playing basketball at school in Manresa when I was a kid, and never really stopped. I ended up joining the youth academy of [Bàsquet Manresa](https://www.basquetmanresa.com), my hometown ACB club, now BAXI Manresa, where I spent seven years.',
      'With the club I competed in the Catalan and Spanish national championships, the Minicopa Endesa, and international tournaments, facing the academies of clubs like Real Madrid, Barça, Bayern Munich, Valencia, and Joventut. I was also selected for the Catalan regional pre-selection squad.',
    ],
    photos: [
      { src: '/images/journal/basketball/manresa-fcb-layup.jpg', width: 1200, height: 1600 },
      { src: '/images/journal/basketball/manresa-jumpshot.jpg', width: 1200, height: 1600 },
    ],
    bodyAfter: [
      'In 2023 I moved to England, and basketball came with me: I played as a scholarship athlete all through my degree. Training, games, and deadlines all at once taught me more about managing my time than any course did.',
      'I am not playing competitively anymore, but the game is still a big part of who I am.',
    ],
    photosAfter: [
      { src: '/images/journal/basketball/aru-dunk-1-rise.jpg', width: 1600, height: 1067 },
      { src: '/images/journal/basketball/aru-dunk-2-flush.jpg', width: 1600, height: 1067 },
      { src: '/images/journal/basketball/aru-dunk-rim.jpg', width: 1600, height: 1067 },
      { src: '/images/journal/basketball/aru-dunk-bench.jpg', width: 1600, height: 1067 },
    ],
    photosAfterCaption:
      'A dunk from a university game, frame by frame.',
  },
]
