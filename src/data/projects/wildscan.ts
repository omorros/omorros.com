import { defineProject } from './schema'

export default defineProject({
  title: 'WILDSCAN',
  description: 'AI agents that scan online marketplaces for wildlife trafficking, decoding the coded language sellers hide behind in eight languages.',
  tags: ['Python', 'LangGraph', 'Next.js', 'PostGIS'],
  link: 'https://github.com/omorros/WILDSCAN',
  slug: 'wildscan',
  lastModified: '2026-08-16',
  category: 'hackathon',
  event: 'Unicorn Mafia × Techbible Hack Night · London 2026',
  year: '2026',
  caseStudy: {
    challenge: 'Wildlife traffickers sell openly on regional marketplaces, hiding behind coded words in dozens of languages. Human investigators cannot keep up with the volume.',
    approach: 'I built a pipeline of six agents that scrapes listings, spots coded terms from a 500 word lexicon in eight languages, identifies the species from photos, and scores every listing against records of real seizures.',
    features: [
      { title: 'Six Agents, One Hunt', description: 'A scanner, a triage agent, a linguist, an image analyst, a species classifier, and a risk scorer run the whole pipeline on their own, built with LangGraph.' },
      { title: 'Speaks the Sellers\' Code', description: 'It knows 500 coded trafficking terms across eight languages, and still catches them when sellers misspell them on purpose.' },
      { title: 'Scores You Can Check', description: 'Every listing gets a 0-100 risk score from eight weighted signals, checked against 6,000 records of real seizures.' },
      { title: 'A Live Globe', description: 'Every detection lands on a Mapbox globe in real time, with an intelligence brief one click away.' }
    ],
    thumbnail: { src: '/images/wildscan/landing.jpg', alt: 'WILDSCAN landing page for its multi-agent wildlife trafficking detection network' },
    screenshots: [
      { src: '/images/wildscan/command-center.jpg', alt: 'WILDSCAN command centre with a globe, ready to scan a region' },
      { src: '/images/wildscan/scan-results.jpg', alt: 'Scan results over Southeast Asia with flagged listings pinned on the map' },
      { src: '/images/wildscan/detection-detail.jpg', alt: 'A flagged ivory listing with its risk score of 81 and the signals behind it' },
    ],
    awards: [
      {
        title: 'Overall Winner - Unicorn Mafia x Techbible Hack Night 2026',
        prizes: ['Overall Winner'],
        description: 'Built in 90 minutes; awarded the overall prize at the London hack night (Web MCP Agents track), March 2026.'
      }
    ]
  }
})
