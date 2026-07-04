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
  photos?: { src: string; caption?: string }[]
  videoUrl?: string
}

export const journal: JournalEntry[] = [
  {
    slug: 'basketball',
    title: 'Basketball',
    tagline: 'Playing as a scholarship athlete while studying in Cambridge.',
    cardImage: '/images/journal/basketball-card.svg',
    body: [
      'I played basketball for as long as I can remember, first back home in Manresa and later in England.',
      'At ARU in Cambridge I played as a basketball scholarship athlete while doing my degree. Training, games, and deadlines all at once taught me more about managing my time than any course did.',
      'I am not playing competitively anymore, but the game is still a big part of who I am.',
    ],
  },
]
