import { defineFlow, defineProject } from './schema'

export default defineProject({
  title: 'Basket',
  description: "A five-agent pipeline that tells a brand, with sources, when a change to a product's recipe sets off a spike in complaints online.",
  tags: ['Python', 'Tavily', 'ClickHouse', 'Next.js'],
  link: 'https://github.com/omorros/Basket',
  slug: 'basket',
  lastModified: '2026-10-25',
  category: 'hackathon',
  event: 'Tokens LDN Multi-Agent Hackathon · London 2026',
  year: '2026',
  caseStudy: {
    thumbnail: { src: '/images/basket/demo.jpg', alt: 'Presenting Basket with two teammates to a full room at the Tokens LDN Multi-Agent Hackathon' },
    cardImage: { src: '/images/basket/demo.jpg', alt: 'Presenting Basket with two teammates to a full room at the Tokens LDN Multi-Agent Hackathon' },
    screenshots: [
      { src: '/images/basket/hero.jpg', alt: 'Basket home page with the line Catch a reformulation backlash in week two, not the quarterly review, above a product search box' },
      { src: '/images/basket/pipeline.jpg', alt: 'The agent running its five steps on a product, from finding the recipe change to publishing the alert' },
    ],
    story: {
      insight: 'Catch a recipe backlash in week two, not in the quarterly review.',
      facts: [
        { label: 'Stack', value: 'Python, FastAPI, Tavily, Prometheux, ClickHouse, Next.js' },
      ],
      context: 'When a brand quietly changes a recipe, the people who notice say so quickly, in news stories, forums and reviews. Inside the company the usual signal is sales, and a dip there can take a quarter to show up and be traced back to the change. Basket watches the public side instead. Give it a product name and it finds when the recipe changed, collects the complaints, counts them week by week and publishes a sourced alert when they spike.',
      flow: defineFlow({
        tones: {
          query: { swatch: 'grey' },
          mentions: { swatch: 'blue', label: 'Mentions' },
          date: { swatch: 'green', label: 'Date' },
          complaints: { swatch: 'violet', label: 'Complaints' },
          alert: { swatch: 'amber', label: 'Alert' },
        },
        nodes: [
          { id: 'orch', label: 'Orchestrator', note: 'Takes a product name, runs the agents', detail: 'FastAPI · GET /run', tone: 'query', col: 0, row: 0 },
          { id: 'tavily', label: 'Tavily', note: 'Live search of news and the web', detail: 'advanced depth · dated results', tone: 'mentions', col: 1, row: 0, service: true },
          { id: 'date', label: 'Date finder', note: 'Works out when the recipe changed', detail: 'news from the last 270 days', steps: ['three news searches', 'earliest date kept'], tone: 'date', col: 2, row: 0 },
          { id: 'retrieve', label: 'Retriever', note: 'Collects complaints, one per link', detail: 'news and web · last 180 days', steps: ['news', 'the wider web'], tone: 'mentions', col: 2, row: 1 },
          { id: 'classify', label: 'Classifier', note: 'Sorts each mention by rule', detail: 'Prometheux · Vadalog rules', steps: ['product matched', 'complaint phrase found', 'dated after the change'], live: 'taste complaint', tone: 'complaints', col: 3, row: 1 },
          { id: 'detect', label: 'Spike detector', note: 'Counts complaints week by week', detail: 'ClickHouse · one count per link', steps: ['weekly counts', 'peak against the weeks before'], tone: 'complaints', col: 4, row: 0 },
          { id: 'publish', label: 'Publisher', note: 'A sourced alert, only on a real spike', detail: 'from 1.2× the weekly baseline', live: 'Published alert', tone: 'alert', col: 4, row: 1 },
        ],
        edges: [
          ['orch', 'tavily'],
          ['tavily', 'date'],
          ['tavily', 'retrieve'],
          ['date', 'classify'],
          ['retrieve', 'classify'],
          ['date', 'detect'],
          ['classify', 'detect'],
          ['detect', 'publish', 'alert'],
        ],
        caption: 'Solid boxes are what we built. Dashed ones are outside services.',
      }),
      team: [
        { name: 'Nicole' },
      ],
      decisions: [
        {
          title: 'Prometheux rules decide what counts',
          why: 'Each mention runs through rules on Prometheux. A list of aliases ties every way of naming the product to one variant, complaint phrases mark it as taste, texture, packaging or price, and its date is compared with the recipe change. The dashboard shows every rule that fired beside the quote, with a link to the source, so anyone can see why a mention was counted.',
          tradeoff: 'The rules only know the phrases and product names we gave them, so a complaint worded another way is missed, and each new product needs its aliases written by hand.',
        },
        {
          title: 'A live backlash, not a famous old one',
          why: "We first planned to replay a recipe change from 2016, but Reddit blocked both ways we had of reading old threads, so we could not date the complaints. Tavily's news results come with dates, so we switched to a live case, the backlash over Reese's Peanut Butter Cups from February 2026, and checked that the spike showed up in dated results before building on it.",
          tradeoff: 'The weekly counts rest mostly on news stories, the results with reliable dates, so a backlash has to be big enough to be reported before it shows clearly.',
        },
      ],
    },
    awards: [
      {
        title: 'Best Use of Tavily, 1st place - Tokens LDN Multi-Agent Hackathon 2026',
        prizes: ['Best Use of Tavily, 1st place'],
        description: "First place in the prize for the best use of Tavily's search API.",
      },
    ],
  },
})
