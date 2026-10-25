import { defineProject } from './schema'

export default defineProject({
  title: 'Basket',
  description: 'A team of five AI agents that watches the web for complaints when a product quietly changes its recipe, so brands find out in weeks instead of months.',
  tags: ['Python', 'FastAPI', 'Next.js', 'ClickHouse'],
  link: 'https://github.com/omorros/Basket',
  slug: 'basket',
  lastModified: '2026-10-25',
  category: 'hackathon',
  event: 'Tokens LDN Multi-Agent Hackathon · London 2026',
  year: '2026',
  caseStudy: {
    challenge: 'When a brand quietly changes a recipe, the backlash lands on the web within days but only shows up in sales data months later. By the time a category manager sees it in a quarterly review, the damage is done.',
    approach: 'I built a pipeline of five agents. Give it a product name and it finds when the recipe changed, pulls complaints from news and the web, classifies them with rules you can trace, counts them week by week, and publishes an alert with sources the moment complaints spike.',
    features: [
      { title: 'Five-Agent Pipeline', description: 'A date finder, a retriever, a classifier, an aggregator, and a publisher, each with one job, coordinated by an orchestrator.' },
      { title: 'Finds the Turning Point', description: 'ClickHouse rolls complaints up by week and flags the inflection where a spike starts.' },
      { title: 'Every Claim Has a Source', description: 'Complaints are classified with traceable rules and every published alert links back to the original mentions.' },
      { title: 'Survives Demo Day', description: 'Local fallbacks kick in if any external service goes down, so the pipeline keeps running.' },
    ],
    thumbnail: 'https://raw.githubusercontent.com/omorros/Basket/main/docs/hero.png',
    cardImage: '/images/basket/demo.jpg',
    screenshots: [
      'https://raw.githubusercontent.com/omorros/Basket/main/docs/pipeline.png',
    ],
    photos: [
      { src: '/images/basket/demo.jpg' },
      { src: '/images/basket/chatting.jpg' },
    ],
    awards: [
      {
        title: 'Best Use of Tavily, 1st place - Tokens LDN Multi-Agent Hackathon 2026',
        prizes: ['Best Use of Tavily, 1st place'],
        description: 'Tavily gave three prizes for the best use of its search API, and Basket took first.',
      },
    ],
  },
})
