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
    thumbnail: 'https://raw.githubusercontent.com/omorros/Atlas/main/docs/screenshots/landing.png',
    screenshots: [
      'https://raw.githubusercontent.com/omorros/Atlas/main/docs/screenshots/warroom.png',
      'https://raw.githubusercontent.com/omorros/Atlas/main/docs/screenshots/brief.png',
      'https://raw.githubusercontent.com/omorros/Atlas/main/docs/screenshots/investigation.png',
      'https://raw.githubusercontent.com/omorros/Atlas/main/docs/screenshots/memo.png'
    ]
  }
})
