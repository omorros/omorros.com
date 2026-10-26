import { defineFlow, defineProject } from './schema'

export default defineProject({
  title: 'Hamyway City',
  description: 'An AI agent for delivery desks that reads a messy case, works out who owns the decision, and takes one safe next step or hands the case to a person.',
  tags: ['TypeScript', 'Next.js', 'Claude API', 'ElevenLabs'],
  link: 'https://github.com/arvin-shafiei/hamyway-city',
  slug: 'hamyway-city',
  lastModified: '2026-10-25',
  category: 'hackathon',
  event: 'Dwelly Real-World Agents Hackathon · London 2026',
  year: '2026',
  caseStudy: {
    thumbnail: { src: '/images/hamyway-city/team.jpg', alt: "The five Hamyway City teammates on stage, each holding a People's Choice certificate" },
    cardImage: { src: '/images/hamyway-city/team.jpg', alt: "The five Hamyway City teammates on stage, each holding a People's Choice certificate" },
    photos: [
      { src: '/images/hamyway-city/building.jpg', alt: 'Two teammates chatting at a table of laptops during the hackathon' },
      { src: '/images/hamyway-city/winners.jpg', alt: 'The team with their certificates in a wider group photo on stage at the prize giving' },
    ],
    screenshots: [
      { src: '/images/hamyway-city/console-home.jpg', alt: 'The desk console home with case counts, a case that needs a person and live activity' },
      { src: '/images/hamyway-city/case-run-voice.jpg', alt: "A case run with a person's options above the voice strip: a driver's voice note and approve by voice" },
      { src: '/images/hamyway-city/decisions.jpg', alt: 'A decision card: why the agent stopped, what it already did, what it does not know and the options to choose from' },
      { src: '/images/hamyway-city/city-aerial.jpg', alt: 'The 3D city of delivery traffic beside the live cases panel' },
    ],
    story: {
      insight: 'Always acting is dangerous. Always escalating is useless.',
      facts: [
        { label: 'Stack', value: 'TypeScript, Next.js, Claude, TypeSafe Jev, ElevenLabs, three.js' },
        { label: 'Track', value: 'Delivery and Logistics' },
      ],
      context: "A delivery desk sits between the customer, the carrier and the shop, and owns almost none of the decisions: dispatch books, the shop refunds, the carrier investigates. The work is coordination, and it goes wrong in familiar ways: a reply promises a refund nobody approved, takes a side when the scan and the customer disagree, or answers a legal threat that a person should have read. At the hackathon, unseen cases arrived at the code freeze with too little time to answer them by hand. Ours answered all 30 on its own in under two and a half minutes, for $2.42.",
      flow: defineFlow({
        modes: {
          case: { label: 'Written case', note: 'The agent reads a case and acts on it, or stops for a person.' },
          call: { label: 'Live call', note: 'In demo mode the plan can phone someone, and what they say goes back into the case.' },
        },
        tones: {
          case: { swatch: 'grey', label: 'The case' },
          voice: { swatch: 'violet', label: 'Voice' },
          message: { swatch: 'green', label: 'Message' },
          handover: { swatch: 'amber', label: 'Handover' },
        },
        nodes: [
          { id: 'case', label: 'Case folder', note: 'Emails, portal messages, call notes', detail: 'text · PDFs · images · audio', tone: 'case', col: 0, row: 1 },
          { id: 'understand', label: 'Read the case', note: 'Records apart from claims', detail: 'Claude Sonnet 5.5', steps: ['who is who', 'what was promised'], live: 'Found 2 open promises', tone: 'case', col: 1, row: 1 },
          { id: 'jev', label: 'TypeSafe Jev', note: 'Five seats, twelve yes or no questions', detail: 'problem type · clash score', live: 'Problem: safety risk', tone: 'case', col: 2, row: 0, service: true, modes: ['case'] },
          { id: 'plan', label: 'Plan', note: 'Act, ask, hand over, wait or call', detail: 'Claude Opus 5.5', tone: 'message', col: 2, row: 1 },
          { id: 'gate', label: 'Safety gate', note: 'Judges each message on its own', detail: 'send < 0.3 · hold · stop ≥ 0.8', steps: ['hard rules in code', 'risk scored by Claude'], live: 'Safety check passed (risk: low)', tone: 'message', col: 3, row: 1, modes: ['case'] },
          { id: 'outbox', label: 'Sandbox outbox', note: 'Recorded, never called delivered', detail: 'one retry · other channels', live: 'Sent a message to Dispatch', tone: 'message', col: 4, row: 0, modes: ['case'] },
          { id: 'card', label: 'Decision card', note: 'A person decides in one read', detail: 'why it stopped · options', live: 'A person needs to decide', tone: 'handover', col: 4, row: 1, modes: ['case'] },
          { id: 'call', label: 'Desk Caller', note: 'Phones the person the plan named', detail: 'ElevenLabs · WebRTC · their language', live: '[spoken in Spanish]', tone: 'voice', col: 3, row: 2, service: true, modes: ['call'] },
          { id: 'promise', label: 'Promise check', note: 'Every promise, before it is made', detail: 'gate rules, then Jev · 2.5 s', live: "I can't promise that.", tone: 'voice', col: 4, row: 2, modes: ['call'] },
        ],
        edges: [
          ['case', 'understand'],
          ['understand', 'jev'],
          ['understand', 'plan'],
          ['jev', 'plan'],
          ['plan', 'gate'],
          ['gate', 'outbox'],
          ['gate', 'card', 'handover'],
          ['plan', 'call', 'voice'],
          ['call', 'promise'],
        ],
        caption: 'Solid boxes are what we built. Dashed ones are outside services.',
      }),
      team: [
        { name: 'Anson' },
        { name: 'Arvin' },
        { name: 'Min' },
        { name: 'Lu Min' },
      ],
      decisions: [
        {
          title: 'Every message is judged on its own',
          why: 'Hard rules in code come first: no asking for door codes or PINs, no recipient the case never names. Then each message, not the case, gets a risk score for promises, personal details and safety advice. Below 0.3 it is sent, up to 0.8 it waits for a person, above that it is stopped, and a message the check could not score waits too. The thresholds live in the playbook, not in a prompt, so a desk lead can change how careful it is.',
          tradeoff: 'Every case waits for one more Claude call before anything is sent. Jev would have been quicker and cheaper, but its scores were not calibrated against our thresholds, so the check stayed on Claude.',
        },
        {
          title: 'Stopping is an answer',
          why: 'When a person has to decide, the agent stops and writes a decision card: why it stopped, the two or three facts the decision turns on, and what each option would send. Legal, regulator, police or press action always goes to a person, enforced in code. In the last run of our own eval, on 48 cases, it sent nothing in the 5 cases where a person had to decide, and escalated none of the 38 where a message was the answer.',
          tradeoff: 'Each card is work for a person in the middle of a shift, so the agent only stops where the playbook says a person must decide.',
        },
        {
          title: 'Voice goes through the same gate',
          why: 'A driver who cannot type leaves a voice note, and when a call is the right move the agent places one in the browser, in the caller\'s language. What is said becomes a claim in the case, and any promise the voice agent wants to make is checked by the hard rules of the gate and then by Jev within 2.5 seconds, or refused with a fixed sentence. Giving the speech model each case\'s own references and names cut word errors on reference-heavy messages from 22.0% to 5.1%, across 14 messages in three accents.',
          tradeoff: 'The case only runs again after the call ends, which takes 30 to 150 seconds, so during a call the agent works from what it knew before it.',
        },
      ],
    },
    awards: [
      {
        title: 'People\'s Choice - Real-World Agents Hackathon 2026',
        prizes: ["People's Choice"],
        description: 'Voted by the participants and the audience after the demos at Dwelly\'s Real-World Agents Hackathon in London on 10 October 2026.',
      },
    ],
  },
})
