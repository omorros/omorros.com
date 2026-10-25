import { defineProject } from './schema'

export default defineProject({
  title: 'GASLIT',
  description: 'A security layer that catches attempts to poison an AI agent\'s memory before the agent starts believing them.',
  tags: ['Python', 'FastAPI', 'Next.js', 'MongoDB'],
  link: 'https://github.com/omorros/GASLIT',
  slug: 'gaslit',
  lastModified: '2026-08-16',
  category: 'hackathon',
  event: 'MongoDB Agentic Evolution · London 2026',
  year: '2026',
  caseStudy: {
    challenge: 'You can attack an AI agent by slowly feeding it false memories. Each message looks harmless on its own, so normal guardrails let it through, and the pattern only shows up across the agent\'s memory over time.',
    approach: 'I built a layer that sits between the agent\'s memory database and the model and checks every memory before the agent uses it. Four agents cross check new entries against the rest, verify nothing has been tampered with, and quarantine anything suspicious.',
    features: [
      { title: 'Checks at the Last Moment', description: 'It inspects each memory right when the agent retrieves it, after the attack has already slipped past guardrails that only look at single messages.' },
      { title: 'Four Agents on Guard', description: 'The agents never call each other directly. They coordinate entirely through the same MongoDB database they are protecting.' },
      { title: 'Slow Poison Shows Up as Drift', description: 'It fingerprints the queries that touch each memory, so an attack spread across weeks still stands out statistically.' },
      { title: 'A Human Decides', description: 'The system never acts on its own. Every flag becomes a quarantine report for a person to review.' },
    ],
    thumbnail: { src: '/images/gaslit/landing.jpg', alt: "GASLIT home page: police what they're allowed to believe" },
    screenshots: [
      { src: '/images/gaslit/agents.jpg', alt: 'The five agents GASLIT runs, from the adversary to the forensic auditor' },
      { src: '/images/gaslit/divergence.jpg', alt: 'Same database, same prompt, different outcome: the unprotected agent pays out, the protected one blocks it' },
      { src: '/images/gaslit/console.jpg', alt: 'The operator console running the same attack against an agent without GASLIT and one with it' },
      { src: '/images/gaslit/mongodb-cluster-screenshot.jpg', alt: 'The MongoDB Atlas cluster behind GASLIT' },
    ]
  }
})
