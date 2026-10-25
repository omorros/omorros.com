import { defineFlow, defineProject } from './schema'

export default defineProject({
  title: 'Echo',
  description: 'A hardware recorder that turns a meeting into searchable notes, action items and answers about what was decided.',
  tags: ['Python', 'C++', 'ESP32-S3', 'FastAPI'],
  link: 'https://github.com/omorros/Echo',
  slug: 'echo',
  lastModified: '2026-10-25',
  category: 'hackathon',
  event: 'Superlinked × Alibaba Cloud Qwen Hackathon · London 2026',
  year: '2026',
  caseStudy: {
    thumbnail: { src: '/images/echo/winners.jpg', alt: 'Holding the Echo prizes, a DJI mic and Alibaba Cloud merchandise, beside someone in a Superlinked T-shirt, in front of the Qwen and Alibaba Cloud banners' },
    cardImage: { src: '/images/echo/winners.jpg', alt: 'Holding the Echo prizes, a DJI mic and Alibaba Cloud merchandise, beside someone in a Superlinked T-shirt, in front of the Qwen and Alibaba Cloud banners' },
    youtubeId: 'Gh3SKQ_0ZHw',
    youtubePoster: '/images/echo/demo-poster.jpg',
    photos: [
      { src: '/images/echo/device-screen.jpg', alt: 'The Echo recorder on the hackathon table: a microphone, a button, a dial and a small screen showing IDLE and the Engineering agent' },
      { src: '/images/echo/alibaba-office.jpg', alt: 'The entrance to the Alibaba office in London, where the hackathon ran' },
      { src: '/images/echo/visitor-pass.jpg', alt: 'A visitor pass for the Alibaba office dated 14 August 2026' },
    ],
    screenshots: [
      { src: '/images/echo/dashboard-meetings.jpg', alt: 'The Echo dashboard: a search or ask bar above four meetings, each with a short summary' },
      { src: '/images/echo/dashboard-notes.jpg', alt: 'Notes for a sprint planning meeting: a summary, one decision and three action items, each with the speaker who owns it' },
    ],
    story: {
      insight: 'One button on the table, and every meeting becomes something you can ask about later.',
      facts: [
        { label: 'Stack', value: 'ESP32-S3, Python, FastAPI, React, Superlinked SIE, Qwen' },
      ],
      context: 'A week after a meeting, it is hard to say what was decided and who agreed to do what. Notes catch part of it, in one person\'s notebook. Echo is a small recorder that sits on the table: press its button and the meeting comes back as a transcript split by speaker, with a summary, the decisions and the action items. Later you can ask a question in plain words and get an answer drawn from the past meetings that match it, with those meetings named underneath.',
      flow: defineFlow({
        tones: {
          audio: { swatch: 'grey', label: 'Audio' },
          words: { swatch: 'blue', label: 'Words' },
          notes: { swatch: 'violet', label: 'Notes' },
          answer: { swatch: 'amber', label: 'Answer' },
        },
        nodes: [
          { id: 'device', label: 'Recorder', note: 'A button to record, a dial for the agent', detail: 'ESP32-S3 · 16 kHz mono', live: 'REC 00:42', tone: 'audio', col: 0, row: 0 },
          { id: 'backend', label: 'Backend', note: 'Stores each meeting, routes every step', detail: 'FastAPI · WebSocket · SQLite', steps: ['meeting opened', 'agent from the dial'], tone: 'audio', col: 1, row: 0 },
          { id: 'asr', label: 'Qwen Omni', note: 'Transcribes and splits the speakers', detail: 'Alibaba Cloud · qwen3.5-omni-flash', live: 'Speaker 1: Both bugs are fixed and deployed.', tone: 'words', col: 2, row: 0, service: true },
          { id: 'sie', label: 'Superlinked SIE', note: 'Writes the notes, finds the action items', detail: 'Qwen3.6-27B or Qwen3.5-4B, by agent', steps: ['notes', 'action items', 'embedding'], tone: 'notes', col: 3, row: 0, service: true },
          { id: 'page', label: 'Meeting page', note: 'Summary, decisions and owners', detail: 'React dashboard', live: 'Own the announcement · Speaker 1', tone: 'notes', col: 4, row: 0 },
          { id: 'search', label: 'Search', note: 'Meaning, recency and topics', detail: 'Qwen3 reranker · weights 60/25/15', live: '99% match', tone: 'answer', col: 3, row: 1 },
          { id: 'answer', label: 'Qwen Max', note: 'Answers across meetings', detail: 'Alibaba Cloud · qwen3.8-max', live: 'Sources: Sprint planning, Payments update', tone: 'answer', col: 4, row: 1, service: true },
        ],
        edges: [
          ['device', 'backend'],
          ['backend', 'asr'],
          ['asr', 'sie'],
          ['sie', 'page'],
          ['sie', 'search'],
          ['search', 'answer'],
        ],
        caption: 'Solid boxes are what we built. Dashed ones are outside services.',
      }),
      team: [
        { name: 'Mykyta Yakivets', url: 'https://www.linkedin.com/in/mykyta-yakivets/' },
      ],
      decisions: [
        {
          title: 'The dial picks the agent, the agent picks the model',
          why: 'Seven agents sit on the dial, from General and Standup to Fintech, Interview and Legal. Each brings its own instructions, the things to listen for and the model that writes the notes: Fintech, Interview and Legal get the larger Qwen3.6-27B, the rest the faster Qwen3.5-4B. The choice locks while recording, so a stray turn of the dial cannot change how a meeting is handled.',
          tradeoff: 'The larger model is slower. In the one run we compared, the same recording took 5.4 seconds through Fintech and 2.9 through Engineering, and only Fintech gave every action item an owner.',
        },
        {
          title: 'Superlinked first, Alibaba behind it',
          why: 'Each step, from notes and extraction to embeddings and reranking, is set to run on Superlinked\'s inference engine or on Alibaba Cloud. If a Superlinked call fails, the same step runs again on Alibaba, so an outage slows the demo down instead of stopping it. A routing page shows which model served each call and how long it took.',
          tradeoff: 'Nothing takes over when Alibaba fails, and transcription has no second option at all: Superlinked\'s speech endpoint failed on real audio, so who said what depends on Alibaba alone.',
        },
        {
          title: 'One voice for 25 seconds means ask again',
          why: 'A small microphone in a real room hears one person loudly and another faintly, and the transcriber can give the whole meeting to one speaker. So we raise the volume of the recording before sending it, and if 25 seconds or more still come back as one voice, we ask again with a prompt that says to expect several people and listen for turn-taking.',
          tradeoff: 'A long stretch of one person really talking alone pays for a second transcription, and if the retry still hears one voice, we keep the first answer.',
        },
      ],
    },
    awards: [
      {
        title: 'Track Winner - Superlinked \u00d7 Alibaba Cloud Qwen 2026',
        prizes: ['Track Winner'],
        description: 'Won at Alibaba\'s office in London on 14 August 2026.',
      },
    ],
  },
})
