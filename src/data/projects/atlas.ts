import { defineProject } from './schema'

export default defineProject({
  title: 'Atlas',
  description: 'A control room that watches a company\'s payments in real time and sends AI agents to investigate the suspicious ones.',
  tags: ['Python', 'FastAPI', 'Next.js', 'Claude API'],
  link: 'https://github.com/omorros/Atlas',
  slug: 'atlas',
  lastModified: '2026-08-16',
  category: 'hackathon',
  event: 'Cursor × Briefcase · London 2026',
  year: '2026',
  caseStudy: {
    challenge: 'Finance teams see thousands of transactions a day. The genuinely risky ones hide in the noise, and no single rule or model catches them all.',
    approach: 'I built a pipeline where simple rules and a fast model triage every transaction, a stronger model analyses the unclear ones, and the hardest cases spawn a research agent that writes a memo for the human reviewer.',
    features: [
      { title: 'Cheap Checks First', description: 'Simple rules and a fast model handle the flood of transactions, so the expensive model only sees the ones worth a closer look.' },
      { title: 'The Company on a Globe', description: 'Every counterparty is plotted on a live globe with its health status, pulsing as new transactions come in.' },
      { title: 'Agents That Investigate', description: 'The hardest cases spawn a background agent that digs through public records and web sources, then drops a memo for the reviewer.' },
      { title: 'Never Moves the Money', description: 'Atlas only recommends. Every decision ends with a person in finance, not the machine.' },
    ],
    thumbnail: { src: '/images/atlas/landing.jpg', alt: 'Atlas landing page: a new cartography of counterparty risk' },
    screenshots: [
      { src: '/images/atlas/warroom.jpg', alt: 'The control room globe with counterparty risk signals in the side panel' },
      { src: '/images/atlas/brief.jpg', alt: 'An analyst brief on a flagged counterparty, beside the globe' },
      { src: '/images/atlas/investigation.jpg', alt: "A deep investigation running on a counterparty, with the agent's steps and its assessment" },
      { src: '/images/atlas/memo.jpg', alt: 'The investigation memo the agent writes, with key signals, analysis and recommendations' },
    ]
  }
})
