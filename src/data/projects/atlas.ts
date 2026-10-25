import { defineFlow, defineProject } from './schema'

export default defineProject({
  title: 'Atlas',
  description: "A treasury control room that watches a company's payments and counterparties as they happen and briefs the finance team on the ones that look risky.",
  tags: ['Python', 'FastAPI', 'Next.js', 'Claude API'],
  link: 'https://github.com/omorros/Atlas',
  slug: 'atlas',
  lastModified: '2026-10-25',
  category: 'hackathon',
  event: 'Cursor × Briefcase · London 2026',
  year: '2026',
  caseStudy: {
    thumbnail: { src: '/images/atlas/landing.jpg', alt: 'Atlas landing page: a new cartography of counterparty risk, above a four-stage pipeline from triage to investigation' },
    screenshots: [
      { src: '/images/atlas/brief.jpg', alt: 'An analyst brief on a first payment to Initech Software, open beside the globe' },
      { src: '/images/atlas/memo.jpg', alt: 'The investigation memo on Initech Software: subject, key signals, analysis and five recommended steps' },
    ],
    story: {
      insight: 'Every payment gets read, so a person only has to read the few that matter.',
      facts: [
        { label: 'Stack', value: 'Python, FastAPI, Next.js, Mapbox, Claude, OpenAI' },
      ],
      context: "A company's money moves through banks, vendors and customers, and any of them can turn into a risk: a bank losing staff, a new supplier at a shell address, a payment far larger than usual. A finance team sees far too many transactions to read each one, so the warning signs sit in the noise. Atlas reads all of them, lets plain rules catch the patterns and has Claude write a short brief for a person to act on.",
      flow: defineFlow({
        tones: {
          money: { swatch: 'grey' },
          profile: { swatch: 'violet', label: 'Company profile' },
          signal: { swatch: 'amber', label: 'Risk signal' },
          brief: { swatch: 'blue', label: 'Brief' },
        },
        nodes: [
          { id: 'tx', label: 'Payments', note: 'In and out, as they post', detail: 'simulated company · 3 demo scenarios', tone: 'money', col: 0, row: 0 },
          { id: 'specter', label: 'Specter', note: 'Staff, funding and news per company', detail: 'saved profile if the lookup fails', tone: 'profile', col: 0, row: 2, service: true },
          { id: 'rules', label: 'Rules R1 to R4', note: 'Plain checks every five seconds', detail: 'staff · exposure · new payee · amount', steps: ['R3: first payment', 'R4: unusual amount'], tone: 'signal', col: 1, row: 1 },
          { id: 'triage', label: 'Triage', note: 'Drops what a treasurer can ignore', detail: 'Claude Haiku · keep or drop', tone: 'signal', col: 2, row: 1 },
          { id: 'analyst', label: 'Analyst', note: 'Writes the brief and a confidence', detail: 'Claude Sonnet 4 · past flags by embedding', steps: ['similar flags found', 'brief written'], live: 'Conf 0.82', tone: 'brief', col: 3, row: 1 },
          { id: 'inbox', label: 'Risk inbox', note: 'Briefs beside a live globe', detail: 'WebSocket · Mapbox', live: 'R1, Neobank X: critical', tone: 'brief', col: 4, row: 1 },
          { id: 'memo', label: 'Forensic memo', note: 'A longer memo, when someone asks', detail: 'Claude Sonnet 4 · brief and profile', live: 'memo.md ready', tone: 'brief', col: 4, row: 2 },
        ],
        edges: [
          ['tx', 'rules'],
          ['specter', 'rules'],
          ['rules', 'triage'],
          ['triage', 'analyst'],
          ['analyst', 'inbox'],
          ['inbox', 'memo'],
        ],
        caption: 'Solid boxes are what we built. Dashed ones are outside services.',
      }),
      team: [
        { name: 'Muhammad Usman' },
        { name: 'Naseem' },
        { name: 'Vikkash' },
      ],
      decisions: [
        {
          title: 'Four plain rules before any model',
          why: "Four plain rules run every five seconds: a company that lost a fifth of its staff in 90 days, has not raised money in two years or is in bad news; a bank holding more of the cash than policy allows; a first payment to someone new; a payment over three times that company's 30-day average, or to one under six months old. Only what they flag reaches Claude Haiku, which drops the noise, and only what Haiku keeps reaches Claude Sonnet.",
          tradeoff: 'The models only ever see what a rule caught, so a risk no rule describes never reaches them. And when the triage call fails, the case goes through rather than being lost.',
        },
        {
          title: 'The analyst grades its own brief',
          why: 'Sonnet ends every brief with a confidence and one recommended action, and gets the most similar past flags, found by comparing embeddings of names and addresses. Briefs under 0.5 confidence are dropped, so the inbox holds fewer, firmer calls.',
          tradeoff: "The confidence is the model's own number. Nothing checks it against what really happened, so a brief that is sure and wrong still reaches the inbox.",
        },
        {
          title: 'Atlas recommends, people decide',
          why: 'No part of Atlas can move money. The memo prompt asks for actions an analyst would take, such as pausing new purchase orders or asking for audited accounts, and every brief ends with one recommended action for a person to take.',
          tradeoff: 'Nothing happens to a suspicious payment until someone reads the brief, which is slower than freezing it automatically.',
        },
      ],
    },
  },
})
