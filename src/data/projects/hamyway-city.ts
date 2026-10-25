import { defineProject } from './schema'

export default defineProject({
  title: 'Hamyway City',
  description: 'An AI delivery desk that reads a messy complaint thread and sends one safe message, asks a question, or hands the case to a person.',
  tags: ['TypeScript', 'Next.js', 'Claude API', 'ElevenLabs'],
  link: 'https://github.com/arvin-shafiei/hamyway-city',
  slug: 'hamyway-city',
  lastModified: '2026-10-25',
  category: 'hackathon',
  event: 'Dwelly Real-World Agents Hackathon \u00b7 London 2026',
  year: '2026',
  caseStudy: {
    challenge: 'A delivery desk sits between the customer, the carrier and the shop, and owns almost none of the decisions. Things go wrong when a reply promises a refund nobody approved, or takes a side when the scan and the customer disagree.',
    approach: 'We built an agent that reads a delivery problem the way a coordinator would, works out who owns the decision, and takes one next step: a message to the right team, a question, nothing at all, or a handover to a person. I built the voice side: voice notes from drivers, and calls the agent can make from the console.',
    features: [
      { title: 'Knows When to Stop', description: 'It can send one message, ask a question, do nothing, or hand the case to a person. In the last scored run it passed 46 of 48 cases without breaking a single never-do rule.' },
      { title: 'No Promises It Cannot Keep', description: 'Every message it wants to send is checked first for refunds, delivery times or safety answers the desk has no right to give.' },
      { title: 'Calls in Your Language', description: 'A driver who cannot type can leave a voice note. When a call is the right move, the agent rings the person in the browser, answers in their language and checks any promise before it says it.' },
      { title: 'Hears the Order Numbers', description: 'I feed each case\'s own order numbers and names to the speech model, which cut word errors on those messages from 22 percent to 5.' }
    ],
    thumbnail: '/images/hamyway-city/team.jpg',
    cardImage: '/images/hamyway-city/team.jpg',
    screenshots: [
      '/images/hamyway-city/console-home.jpg',
      '/images/hamyway-city/case-run-voice.jpg',
      '/images/hamyway-city/decisions.jpg',
      '/images/hamyway-city/city-aerial.jpg'
    ],
    photos: [
      { src: '/images/hamyway-city/building.jpg' },
      { src: '/images/hamyway-city/winners.jpg' },
    ],
    awards: [
      {
        title: 'People\'s Choice - Real-World Agents Hackathon 2026',
        prizes: ["People's Choice"],
        description: 'Won the People\'s Choice prize at Dwelly\'s Real-World Agents Hackathon in London on 10 October 2026. We entered in the Delivery and Logistics track.'
      }
    ]
  }
})
