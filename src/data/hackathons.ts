// Winning builds in Oriol's order. Each slug is an entry in projects.ts.
export const HACKATHON_SLUGS = [
  'truevoice',
  'lantern',
  'wildscan',
  'offbabel',
  'echo',
  'hamyway-city',
  'basket',
]

// One entry per prize, in the same order. Lantern and OffBabel each won two.
export const HACKATHON_PRIZES = [
  { award: 'Overall Winner', project: 'TrueVoice' },
  { award: 'Overall Winner', project: 'Lantern' },
  { award: 'Best Use of fal', project: 'Lantern' },
  { award: 'Overall Winner', project: 'WILDSCAN' },
  { award: 'Cosine Track Winner', project: 'OffBabel' },
  { award: 'EXO Labs Track Winner', project: 'OffBabel' },
  { award: 'Track Winner', project: 'Echo' },
  { award: "People's Choice", project: 'Hamyway City' },
  { award: 'Best Use of Tavily, 1st Place', project: 'Basket' },
]

export type HackathonPrize = (typeof HACKATHON_PRIZES)[number]

export const HACKATHON_WINS = HACKATHON_PRIZES.length
