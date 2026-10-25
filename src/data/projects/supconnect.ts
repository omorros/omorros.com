import { defineProject } from './schema'

export default defineProject({
  title: 'SupConnect',
  description: 'An AI voice agent that answers buyer calls for secondhand clothing suppliers at any hour, qualifies the deal, and leaves a ready lead for the morning.',
  tags: ['TypeScript', 'Next.js', 'ElevenLabs', 'WebSockets'],
  link: 'https://github.com/omorros/SupConnect',
  slug: 'supconnect',
  lastModified: '2026-08-16',
  category: 'hackathon',
  event: 'Fleek × a16z Hackathon · London 2026',
  year: '2026',
  caseStudy: {
    challenge: 'Secondhand clothing suppliers sell across time zones. When a buyer calls at 3am and nobody picks up, the sale walks to whoever answers first.',
    approach: 'We built a voice agent that picks up every call, answers only from the supplier\'s own catalogue, fills in the deal details live as the buyer talks, and leaves a structured lead in the dashboard by morning. The model does the talking, but deterministic code makes every decision.',
    features: [
      { title: 'Never Misses a Call', description: 'It answers 24/7 in the browser, by voice or text, on the same pipeline.' },
      { title: 'Sticks to the Catalogue', description: 'It only answers from supplier-approved knowledge. If it does not know, it says so instead of inventing a price.' },
      { title: 'The Model Talks, the Code Decides', description: 'Lead status, escalations, and next actions come from a deterministic state machine, never from the LLM.' },
      { title: 'Numbers You Can Trust', description: 'A guardrail rejects any number in the summary that did not come from the catalogue, and falls back to a plain template.' },
    ],
    thumbnail: { src: '/images/supconnect/idle.jpg', alt: "SupConnect's call screen: get a quote while they're still asleep" },
    cardImage: { src: '/images/supconnect/building.jpg', alt: 'Three teammates building SupConnect at a laptop' },
    screenshots: [
      { src: '/images/supconnect/call.jpg', alt: "A buyer's call in progress, transcribed as the voice agent answers" },
      { src: '/images/supconnect/summary.jpg', alt: 'The lead the agent leaves for the morning: what the buyer wants, the budget and the next step' },
    ],
    photos: [
      { src: '/images/supconnect/building.jpg', alt: 'Three teammates building SupConnect at a laptop' },
      { src: '/images/supconnect/venue.jpg', alt: 'The hackathon floor, full of teams at their laptops' },
    ],
  },
})
