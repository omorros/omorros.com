import { defineFlow, defineProject } from './schema'

export default defineProject({
  title: 'WILDSCAN',
  description: 'A tool that screens online marketplace listings for wildlife trafficking and gives each one a risk score investigators can trace point by point.',
  tags: ['Python', 'LangGraph', 'Next.js', 'PostGIS'],
  link: 'https://github.com/omorros/WILDSCAN',
  slug: 'wildscan',
  lastModified: '2026-10-25',
  category: 'hackathon',
  event: 'Unicorn Mafia × Techbible Hack Night · London 2026',
  year: '2026',
  caseStudy: {
    thumbnail: { src: '/images/wildscan/landing.jpg', alt: 'WILDSCAN landing page for its multi-agent wildlife trafficking detection network' },
    screenshots: [
      { src: '/images/wildscan/scan-results.jpg', alt: 'The WILDSCAN command centre after a scan of Thailand, with scored listings pinned across a map of Southeast Asia' },
      { src: '/images/wildscan/command-center.jpg', alt: 'The WILDSCAN command centre before a scan, with a map of Southeast Asia and a Scan Thailand button' },
      { src: '/images/wildscan/detection-detail.jpg', alt: 'A Thai listing titled genuine ivory, open beside the map with a score of 81, a red alert, and a bar for each signal behind it' },
    ],
    story: {
      insight: 'Protected wildlife is listed openly online, in words a simple search misses.',
      facts: [
        { label: 'Stack', value: 'Python, LangGraph, PostGIS, Next.js, GPT-4o, Claude' },
      ],
      context: 'Elephant ivory and tiger parts are protected by CITES, the treaty that controls the international wildlife trade, yet listings for them still turn up on ordinary online marketplaces. When we searched Facebook Marketplace in Thailand for ivory, tiger fang and turtle shell, in Thai and English, it returned 98 listings, one of them titled, in Thai, "genuine ivory". The listings are written in local languages and the words that matter are not always the obvious ones, so reading them one by one does not scale. WILDSCAN reads each listing and its photos, checks the species against the treaty and past seizures, and shows where every point of its score came from.',
      flow: defineFlow({
        tones: {
          listing: { swatch: 'grey', label: 'Listing' },
          words: { swatch: 'blue', label: 'Words' },
          photo: { swatch: 'violet', label: 'Photo' },
          risk: { swatch: 'amber', label: 'Risk' },
        },
        nodes: [
          { id: 'scrape', label: 'Bright Data', note: 'Fetches the marketplace pages', detail: 'Web MCP · scrape_as_html', tone: 'listing', col: 0, row: 0, service: true },
          { id: 'triage', label: 'Triage', note: 'Keeps code words and risky categories', detail: 'string match · no model', steps: ['word list checked', 'category checked'], tone: 'listing', col: 1, row: 0 },
          { id: 'linguist', label: 'Linguist', note: 'Translates it and finds code words', detail: 'GPT-4o · Claude when unsure', steps: ['translated', 'code word matched'], live: '"Genuine ivory"', tone: 'words', col: 2, row: 0 },
          { id: 'vision', label: 'Image analyst', note: 'Looks for wildlife products in the photos', detail: 'GPT-4o Vision · up to 3 photos', live: 'Two tusks on stands', tone: 'photo', col: 2, row: 1 },
          { id: 'species', label: 'Species check', note: 'Looks up the treaty and past seizures', detail: '53 species · 80 seizures', steps: ['species matched', 'words and photo agree'], live: 'Legal trade: no', tone: 'risk', col: 3, row: 0 },
          { id: 'score', label: 'Risk score', note: 'Adds up the points', detail: 'no model · red from 80', live: '81 RED ALERT', tone: 'risk', col: 4, row: 0 },
          { id: 'brief', label: 'Intel brief', note: 'For red and amber alerts', detail: 'Claude Sonnet · with chat', steps: ['summary', 'evidence', 'recommended actions'], tone: 'risk', col: 4, row: 1 },
        ],
        edges: [
          ['scrape', 'triage'],
          ['triage', 'linguist', 'words'],
          ['triage', 'vision', 'photo'],
          ['linguist', 'species'],
          ['vision', 'species'],
          ['species', 'score'],
          ['score', 'brief'],
        ],
        caption: 'Solid boxes are what we built. Dashed ones are outside services.',
      }),
      team: [
        { name: 'Joan Torres Gordo', url: 'https://www.linkedin.com/in/joan-torres-gordo-274887272/' },
      ],
      decisions: [
        {
          title: 'Protection status from our own tables',
          why: 'The CITES appendix, the IUCN status and the seizure history all come from tables we built: 53 species, with their IUCN status checked against the Red List, and 80 seizures, each linked to its source. The species check is a database lookup, so whether a species is protected never depends on what a model remembers.',
          tradeoff: 'The tables are a snapshot. A species outside our 53 scores nothing for the treaty, however clearly the listing names it.',
        },
        {
          title: 'A word list first, Claude only when unsure',
          why: 'Each listing is matched against a list of code words: exact words, disguised spellings and near matches, with words that cancel a match, such as museum next to ivory, and words that must appear alongside it. Claude is asked only when the best match is uncertain, or when a listing in a risky category matches nothing. GPT-4o translates every listing for the investigator.',
          tradeoff: 'A list only knows the words someone wrote down. Ours has about a hundred, in five languages, so a seller using a new word is caught only if Claude spots it or the photo gives it away.',
        },
        {
          title: 'Every point can be traced',
          why: 'The score is plain arithmetic: points for the code word, the CITES appendix, the IUCN status, past seizures, the place and the photo, plus five when the words and the photo point to the same species. For the "genuine ivory" listing, GPT-4o saw two tusks on stands: 12 points for the photo and 5 for agreeing with the words, for 81 in total, a red alert. The investigator sees each signal as its own bar.',
          tradeoff: 'The weights are our own judgement. With no labelled listings to test them on, we cannot say how many of the alerts are right.',
        },
      ],
    },
    awards: [
      {
        title: 'Overall Winner - Unicorn Mafia \u00d7 Techbible Hack Night 2026',
        prizes: ['Overall Winner'],
        description: 'Entered on the Web MCP Agents track, sponsored by Bright Data, at the hack night in London in March 2026.',
      },
    ],
  },
})
