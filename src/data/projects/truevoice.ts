import { defineFlow, defineProject } from './schema'

export default defineProject({
  title: 'TrueVoice',
  description: 'A platform that listens during medical consultations and flags when a patient sounds worse than their words say.',
  tags: ['TypeScript', 'Next.js', 'Python', 'Claude API'],
  link: 'https://github.com/omorros/TrueVoice',
  slug: 'truevoice',
  lastModified: '2026-10-25',
  category: 'hackathon',
  event: 'Voice AI Hack · London 2026',
  year: '2026',
  caseStudy: {
    thumbnail: { src: '/images/truevoice/team-check.jpg', alt: "The TrueVoice team holding the £1,500 Voice AI Hack winner's cheque" },
    cardImage: { src: '/images/truevoice/team-check.jpg', alt: "The TrueVoice team holding the £1,500 Voice AI Hack winner's cheque" },
    screenshots: [
      { src: '/images/truevoice/landing.jpg', alt: "TrueVoice landing page with the line Patients minimize. Voices don't." },
      { src: '/images/truevoice/dashboard.jpg', alt: 'Live consultation dashboard with the transcript, the voice signals and the flagged gaps' },
      { src: '/images/truevoice/telehealth.jpg', alt: "Telehealth view with the patient's live video beside the transcript and voice signals" },
      { src: '/images/truevoice/report.jpg', alt: "End of consultation report listing two gaps between the patient's words and their fatigue scores" },
    ],
    photos: [
      { src: '/images/truevoice/presenting.jpg', alt: 'The TrueVoice team presenting to the room at Voice AI Hack' },
      { src: '/images/truevoice/credits.jpg', alt: "The winner's cheque on the floor next to a card for prize credits" },
    ],
    story: {
      insight: "Patients minimise. Voices don't.",
      facts: [
        { label: 'Built in', value: 'One day' },
        { label: 'Stack', value: 'Python, FastAPI, WebRTC, Next.js, Claude' },
      ],
      context: 'People often tell their doctor they are fine when they are not. The words go in the notes, but the strain in their voice is easy to miss in a short appointment. TrueVoice listens to both while the consultation happens, and points out the moments where they disagree.',
      flow: defineFlow({
        tones: {
          audio: { swatch: 'grey' },
          words: { swatch: 'blue', label: 'Words' },
          voice: { swatch: 'violet', label: 'Voice' },
          flag: { swatch: 'amber', label: 'Flag' },
        },
        nodes: [
          { id: 'mic', label: "Patient's mic", note: 'Captured once, used twice', detail: '16 kHz · 40 ms frames', tone: 'audio', col: 0, row: 1 },
          { id: 'api', label: 'Backend', note: 'Sends every frame two ways', detail: 'FastAPI · WebSockets', tone: 'audio', col: 1, row: 1 },
          { id: 'stt', label: 'Speechmatics', note: 'Live medical transcript', detail: 'diarised · medical', live: '"I\'m fine, honestly."', tone: 'words', col: 2, row: 0, service: true },
          { id: 'voice', label: 'Thymia', note: 'Signals in the voice', detail: 'Helios · Apollo · Psyche', live: 'distress: high', tone: 'voice', col: 2, row: 2, service: true },
          { id: 'match', label: 'Mismatch check', note: 'Both within a minute', steps: ['phrase matched', 'voice over threshold'], tone: 'flag', col: 3, row: 1 },
          { id: 'gp', label: "Doctor's screen", note: 'A live flag with a note', detail: 'Claude Haiku · 2 s limit', live: 'Says fine, sounds distressed', tone: 'flag', col: 4, row: 1 },
          { id: 'report', label: 'Report', note: 'When the doctor asks', detail: 'Claude Sonnet', live: 'Summary ready', tone: 'flag', col: 4, row: 2 },
        ],
        edges: [
          ['mic', 'api'],
          ['api', 'stt', 'words'],
          ['api', 'voice', 'voice'],
          ['stt', 'match'],
          ['voice', 'match'],
          ['match', 'gp'],
          ['gp', 'report'],
        ],
        caption: 'Solid boxes are what we built. Dashed ones are outside services.',
      }),
      team: [
        { name: 'Joan Torres Gordo', url: 'https://www.linkedin.com/in/joan-torres-gordo-274887272/' },
        { name: 'Indigo Luksch', url: 'https://www.linkedin.com/in/indigo-luksch-85925b234/' },
      ],
      decisions: [
        {
          title: 'Our own call, not a video app',
          why: 'Each browser captures its microphone once and uses it twice: one copy goes into a peer-to-peer video call, the other goes straight to the voice analysis as clean 16 kHz audio from the speaker\'s own device.',
          tradeoff: 'We had to build the call ourselves, including the signalling and a relay server so it connects through home routers. It cost us a lot of time, and very nearly the submission.',
        },
        {
          title: 'Rules raise the flag, the model only words it',
          why: 'A flag fires only when a phrase like "I\'m fine" turns up and a voice signal crosses its threshold within the same minute. Claude only writes the one-line note, with a two-second limit and a plain sentence to fall back on.',
          tradeoff: 'Easy to explain and test, but a fixed list of 23 English phrases misses anything said another way.',
        },
        {
          title: 'A fast model live, a stronger one after',
          why: 'Claude Haiku writes the notes during the appointment, where a slow note is a useless one. Claude Sonnet writes the summary only when the doctor asks for it.',
          tradeoff: 'The live notes stay short and plain, and the depth goes into the report.',
        },
      ],
      moment: {
        title: 'The last ten minutes',
        text: 'Minutes before the deadline, the video call stopped working. We spent the rest of the time fixing it and got it connecting again with about five minutes left. We still had not recorded the demo, so we recorded it from the script we had ready, uploaded it, and submitted with about a minute to spare. We won overall, and the call we nearly lost was a big part of why.',
      },
    },
    awards: [
      {
        title: 'Overall Winner - Voice AI Hack London 2026',
        prizes: ['Overall Winner'],
        description: 'First place across the full event in the Voice & Medical track sponsored by Thymia and Speechmatics.'
      }
    ]
  }
})
