import { defineFlow, defineProject } from './schema'

export default defineProject({
  title: 'Wikipedia Scraper',
  description: 'A crawler that collects as many unique Wikipedia links as it can in 20 seconds, with 100 workers sharing one queue.',
  tags: ['Python', 'asyncio', 'aiohttp', 'BeautifulSoup'],
  link: 'https://github.com/omorros/wikipedia_scraper',
  slug: 'wikipedia-scraper',
  lastModified: '2026-10-25',
  category: 'personal',
  year: '2025',
  caseStudy: {
    story: {
      insight: 'A crawler mostly waits, so wait on a hundred pages at once.',
      facts: [
        { label: 'Stack', value: 'Python, asyncio, aiohttp, BeautifulSoup' },
      ],
      context: 'Most of a crawler\'s time goes on waiting: a request goes out, and nothing happens until the server answers. Fetch one page at a time and the program sits idle between answers. Python\'s asyncio lets a single thread keep many requests open and deal with whichever answers first. This crawler gets 20 seconds to collect as many unique Wikipedia links as it can, starting from the language portal at www.wikipedia.org.',
      flow: defineFlow({
        tones: {
          url: { swatch: 'grey', label: 'URLs' },
          page: { swatch: 'blue', label: 'Pages' },
          links: { swatch: 'violet' },
          count: { swatch: 'green', label: 'Count' },
        },
        nodes: [
          { id: 'start', label: 'Start page', note: 'The Wikipedia language portal', detail: 'www.wikipedia.org', tone: 'url', col: 0, row: 0 },
          { id: 'queue', label: 'Shared queue', note: 'Links waiting for a worker', detail: 'asyncio.Queue · no size limit', tone: 'url', col: 1, row: 0 },
          { id: 'workers', label: '100 workers', note: 'One thread, one event loop', detail: 'asyncio tasks', steps: ['take the next URL', 'skip it if seen', 'mark it seen'], tone: 'url', col: 2, row: 0 },
          { id: 'wiki', label: 'Wikipedia', note: 'Sends back the page', detail: 'aiohttp · 3 s timeout', live: '200 · text/html', tone: 'page', col: 3, row: 0, service: true },
          { id: 'filter', label: 'Link filter', note: 'Unseen Wikipedia links go back on the queue', detail: 'BeautifulSoup · html.parser', steps: ['"//" links get https:', 'other sites dropped'], tone: 'links', col: 4, row: 0 },
          { id: 'seen', label: 'Seen set', note: 'Every URL a worker has taken', detail: 'one Python set, shared', tone: 'count', col: 2, row: 1 },
          { id: 'result', label: 'Stop at 20 s', note: 'Each worker checks the clock and returns', detail: 'unique URLs · 10 samples', steps: ['deadline passed', 'count printed'], tone: 'count', col: 4, row: 1 },
        ],
        edges: [
          ['start', 'queue'],
          ['queue', 'workers'],
          ['workers', 'wiki'],
          ['wiki', 'filter'],
          ['workers', 'seen'],
          ['seen', 'result'],
        ],
        caption: 'Solid boxes are what I built. Dashed ones are outside services.',
      }),
      decisions: [
        {
          title: 'A hundred workers on one thread',
          why: 'I used asyncio tasks, not threads: 100 of them share one event loop, one queue and one set of seen URLs, and while one waits on Wikipedia the others carry on. A worker checks the set and adds to it with nothing in between that can pause, so two workers never take the same URL and no lock is needed.',
          tradeoff: 'One thread also does all the parsing: while BeautifulSoup reads one page, every other worker waits for it.',
        },
        {
          title: 'Marked as seen when taken, not when found',
          why: 'A URL goes into the seen set the moment a worker takes it off the queue, before the request goes out. Each URL is fetched once, even when the request fails.',
          tradeoff: 'A link found on many pages before any worker reaches it goes on the queue once per page, so the queue fills with repeats to skip.',
        },
        {
          title: 'A deadline every worker checks',
          why: 'Nothing cancels the workers. Each one checks the clock before it takes a URL, before it sends a request and between the links it queues, and an idle worker looks again every tenth of a second. A 3-second timeout stops one slow page from holding a worker for long.',
          tradeoff: 'A request already in flight at 20 seconds is allowed to finish, so a run can end up to about three seconds late.',
        },
      ],
    },
  },
})
