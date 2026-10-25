import { defineProject } from './schema'

export default defineProject({
  title: 'Wikipedia Scraper',
  description: 'A crawler that reads as much of Wikipedia as it can in 20 seconds, with 100 workers running in parallel.',
  tags: ['Python', 'Asyncio', 'Aiohttp', 'BeautifulSoup'],
  link: 'https://github.com/omorros/wikipedia_scraper',
  slug: 'wikipedia-scraper',
  lastModified: '2026-08-16',
  category: 'personal',
  year: '2025',
  caseStudy: {
    challenge: 'Crawling a big site fast means keeping a hundred connections busy without ever fetching the same page twice, and stopping exactly on a deadline.',
    approach: 'I wrote an async crawler where 100 workers share one queue and one set of seen URLs, and a global deadline cancels everything at exactly 20 seconds.',
    features: [
      { title: '100 Workers at Once', description: 'A hundred connections stay busy at the same time, so the crawler never sits waiting on a single page.' },
      { title: 'Stops on the Dot', description: 'A global deadline cancels every pending task at exactly 20 seconds.' },
      { title: 'Never Fetches Twice', description: 'One shared set of seen URLs means no page downloads twice and no loop runs forever.' },
      { title: 'One Event Loop, No Threads', description: 'Everything is async, with careful link cleanup so odd URLs do not crash a worker.' }
    ]
  }
})
