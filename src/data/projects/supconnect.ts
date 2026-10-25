import { defineFlow, defineProject } from './schema'

export default defineProject({
  title: 'SupConnect',
  description: 'A voice agent that answers buyer calls for secondhand clothing suppliers at any hour and leaves them a qualified lead for the morning.',
  tags: ['TypeScript', 'Next.js', 'ElevenLabs', 'WebSockets'],
  link: 'https://github.com/omorros/SupConnect',
  slug: 'supconnect',
  lastModified: '2026-10-25',
  category: 'hackathon',
  event: 'Fleek × a16z Hackathon · London 2026',
  year: '2026',
  caseStudy: {
    thumbnail: { src: '/images/supconnect/building.jpg', alt: 'Three of the SupConnect team working at a laptop during the hackathon' },
    cardImage: { src: '/images/supconnect/building.jpg', alt: 'Three of the SupConnect team working at a laptop during the hackathon' },
    screenshots: [
      { src: '/images/supconnect/call.jpg', alt: 'A call in progress: the transcript, a catalogue lookup, and the deal details ticking off underneath as the buyer gives them' },
      { src: '/images/supconnect/summary.jpg', alt: 'The lead card after the call: the buyer, the deal details, a short brief, the next action and the discount ask flagged for the supplier' },
    ],
    story: {
      insight: 'The agent qualifies. The supplier closes.',
      facts: [
        { label: 'Stack', value: 'TypeScript, Next.js, ElevenLabs, Fastify, WebSockets, OpenAI' },
      ],
      context: 'Secondhand clothing is sold in bulk by suppliers in Pakistan, India and Dubai to buyers in Europe and the US. Buyers call when it suits them, often while the supplier is asleep or busy sorting stock, and a call nobody answers is a sale that goes to someone else. SupConnect picks up, finds out what the buyer wants and leaves the supplier a lead to act on in the morning. Discounts and special terms stay with the supplier.',
      flow: defineFlow({
        tones: {
          audio: { swatch: 'grey' },
          words: { swatch: 'blue', label: 'The call' },
          deal: { swatch: 'violet', label: 'The deal' },
          flag: { swatch: 'amber', label: 'Escalation' },
        },
        nodes: [
          { id: 'buyer', label: "Buyer's call", note: 'From the browser, by voice', detail: 'WebRTC', tone: 'audio', col: 0, row: 1 },
          { id: 'agent', label: 'Voice agent', note: 'Holds the conversation', detail: 'ElevenLabs Agents', live: '"Maybe 200 pieces, Grade A."', tone: 'words', col: 1, row: 1, service: true },
          { id: 'server', label: 'Session server', note: 'Gets every turn as text', detail: 'Fastify · WebSocket', tone: 'words', col: 2, row: 1 },
          { id: 'core', label: 'Qualifier', note: 'Fills in the deal from each turn', detail: '8 fields · state machine', steps: ['field captured', 'next question chosen'], live: 'Quantity: 200 pieces', tone: 'deal', col: 3, row: 0 },
          { id: 'rules', label: 'Escalation rules', note: 'Flags what only the supplier decides', detail: 'discount · payment · complaint · human', live: 'Escalated: discount request', tone: 'flag', col: 3, row: 2 },
          { id: 'summary', label: 'Summary agent', note: 'Writes the brief from the record', detail: 'OpenAI · template fallback', steps: ['numbers checked'], tone: 'deal', col: 4, row: 1 },
          { id: 'card', label: 'Lead card', note: 'What the supplier wakes up to', detail: 'status · fields · next action', live: 'Human handoff', tone: 'deal', col: 4, row: 2 },
        ],
        edges: [
          ['buyer', 'agent'],
          ['agent', 'server'],
          ['server', 'core'],
          ['server', 'rules'],
          ['core', 'summary'],
          ['rules', 'summary'],
          ['summary', 'card'],
        ],
        caption: 'Solid boxes are what we built. Dashed ones are outside services.',
      }),
      team: [
        { name: 'Bill', url: 'https://www.linkedin.com/in/ton-hoang-nguyen/' },
        { name: 'Indigo Luksch', url: 'https://www.linkedin.com/in/indigo-luksch-85925b234/' },
        { name: 'Hiresh Bremanand' },
      ],
      decisions: [
        {
          title: 'A state machine owns the deal',
          why: 'The voice agent only holds the conversation. Every turn of the call goes to our server, where plain code pulls out the eight deal fields, a state machine sets the lead\'s status and four rules decide when the supplier has to step in. The model never sets a status or decides an escalation.',
          tradeoff: 'Patterns only catch what they were written for. A quantity said as "a couple of hundred" or a deadline like "end of summer" stays empty until the buyer puts it another way.',
        },
        {
          title: 'The summary can only use numbers it was given',
          why: 'After the call, an OpenAI model writes a short brief from the finished lead record. Every number in it is checked against the record and the call itself. If the model writes one that appears in neither, the brief is thrown away and a plain template takes its place, so the card always renders, even with no model at all.',
          tradeoff: 'The check only reads numbers written as digits.',
        },
        {
          title: 'One screen, because the supplier is asleep',
          why: 'Buyer and supplier are never online at the same time, so there is no dashboard and no live monitoring. There is one screen: a call button, the call, then the lead card the supplier finds in the morning with the deal, a brief and the next action.',
          tradeoff: 'The supplier cannot step into a call that is going wrong. Anything urgent waits for the card, flagged on it.',
        },
      ],
    },
  },
})
