import { defineFlow, defineProject } from './schema'

export default defineProject({
  title: 'OffBabel',
  description: 'An offline tutor on a Reachy Mini robot that helps people practise speaking Spanish or English, or try fingerspelling in British Sign Language.',
  tags: ['Python', 'React', 'Local LLM', 'MediaPipe'],
  link: 'https://github.com/omorros/OffBabel',
  slug: 'offbabel',
  lastModified: '2026-10-25',
  category: 'hackathon',
  event: 'Localhost: On-Device Agent Hackathon · London 2026',
  year: '2026',
  caseStudy: {
    thumbnail: { src: '/images/offbabel/presenting.jpg', alt: 'Presenting OffBabel with a microphone while Bill runs the demo on a laptop, the Reachy Mini robot on a stool beside the projected home screen' },
    cardImage: { src: '/images/offbabel/robot.jpg', alt: 'The Reachy Mini robot between two laptops on a table in the hackathon room' },
    videoUrl: '/images/offbabel/bsl-test.mp4',
    screenshots: [
      { src: '/images/offbabel/home.jpg', alt: 'OffBabel home screen with the line One tool, two communities, a language picker and the Speak and Sign modes' },
      { src: '/images/offbabel/speak.jpg', alt: 'Speak mode in a Spanish greetings lesson, with Reachy thinking of its reply' },
      { src: '/images/offbabel/progress.jpg', alt: 'Progress page with a day streak, speaking and signing mastery, and a phrase that needs review' },
      { src: '/images/offbabel/summary.jpg', alt: 'A practice summary with mastery scores and a phrase to keep practising, ready to save as a PDF' },
    ],
    story: {
      insight: 'Practise speaking or fingerspelling with a tutor that never goes online.',
      facts: [
        { label: 'Stack', value: 'Python, FastAPI, React, Exo, faster-whisper, MediaPipe' },
        { label: 'Platform', value: 'Reachy Mini and one Mac, offline' },
      ],
      context: 'Speaking is hard to practise on your own: it needs someone to answer you and to tell you when you got something wrong. OffBabel puts that partner on a small robot you simply talk to, in Spanish or English, with no screen needed. The same tutor helps people practise British Sign Language fingerspelling in front of a camera. The tutor runs on EXO and everything else runs beside it on the same Mac, with the internet switched off, so a learner\'s mistakes never leave the room.',
      flow: defineFlow({
        modes: {
          speak: { label: 'Speak', note: 'Talk to Reachy in Spanish or English, and the tutor answers out loud.' },
          sign: { label: 'Sign', note: "Fingerspell British Sign Language letters to Reachy's camera." },
        },
        tones: {
          audio: { swatch: 'grey' },
          words: { swatch: 'blue', label: 'Words' },
          hands: { swatch: 'violet', label: 'Hands' },
          progress: { swatch: 'amber', label: 'Progress' },
        },
        nodes: [
          { id: 'mic', label: 'Laptop mic', note: 'Hands-free, no button to hold', detail: '16 kHz · 30 ms blocks', tone: 'audio', col: 0, row: 0, modes: ['speak'] },
          { id: 'listen', label: 'Listener', note: 'Waits for a pause, then transcribes', detail: 'faster-whisper small · int8', live: '"Estoy de Barcelona."', tone: 'words', col: 1, row: 0, modes: ['speak'] },
          { id: 'tutor', label: 'Tutor', note: 'Replies, translates and corrects', detail: 'Gemma 4 E2B · 4-bit', steps: ['reply', 'translation', 'correction'], tone: 'words', col: 2, row: 0, modes: ['speak'] },
          { id: 'check', label: 'Second check', note: 'Reads the sentence again if nothing was corrected', detail: 'same model', live: 'estoy de Barcelona → soy de Barcelona', tone: 'words', col: 2, row: 1, modes: ['speak'] },
          { id: 'robot', label: 'Reachy Mini', note: 'Says the reply out loud', detail: 'macOS voice, played on the robot', live: 'Speaking', tone: 'words', col: 3, row: 0, modes: ['speak'] },
          { id: 'camera', label: "Reachy's camera", note: 'Watches your hands', detail: 'MJPEG over SSH · webcam backup', tone: 'hands', col: 0, row: 2, modes: ['sign'] },
          { id: 'sign', label: 'Sign reader', note: 'Turns hand shape into a letter', detail: 'MediaPipe · 126 numbers · KNN', steps: ['hands found', '12 frames agree'], live: 'Got it', tone: 'hands', col: 1, row: 2, modes: ['sign'] },
          { id: 'memory', label: 'Memory', note: 'Keeps every hit and miss', detail: 'SQLite · Leitner, 5 boxes', live: { speak: 'missed 1x' }, tone: 'progress', col: 3, row: 1 },
          { id: 'progress', label: 'Progress', note: 'What to review, on screen or as a PDF', detail: 'streak · mastery · review sheet', live: { speak: '1 due to review' }, tone: 'progress', col: 4, row: 1 },
        ],
        edges: [
          ['mic', 'listen'],
          ['listen', 'tutor'],
          ['tutor', 'robot'],
          ['tutor', 'check'],
          ['check', 'memory', 'progress'],
          ['camera', 'sign'],
          ['sign', 'memory', 'progress'],
          ['memory', 'progress'],
        ],
        zones: [{ label: 'EXO', nodes: ['tutor', 'check'] }],
        caption: 'Every box runs on one Mac or the robot, offline. The shaded zone runs on EXO.',
      }),
      team: [
        { name: 'Bill', url: 'https://www.linkedin.com/in/ton-hoang-nguyen/' },
      ],
      decisions: [
        {
          title: 'Local models behind a cloud-style API',
          why: 'The tutor talks to Exo through the same OpenAI client a cloud model would use, so moving between Exo, Ollama and the cloud is a one-line change of address. Speech recognition, sign reading and the memory of mistakes run on the Mac too, and if the model cannot be reached, a scripted conversation keeps the lesson going without inventing corrections.',
          tradeoff: 'Exo accepts the request for strict JSON but ignores it, so every reply goes through a parser that strips stray text and repairs broken JSON before the screen can use it.',
        },
        {
          title: 'A second check for mistakes',
          why: 'In one answer the tutor writes its reply, an English translation and any correction. Juggling all three, the small model often let a mistake slip, so when no correction comes back, a separate checker reads the learner\'s last sentence again. It is told to let fillers, false starts and likely transcription slips pass, and to flag only real grammar or word choice mistakes.',
          tradeoff: 'Every turn without a correction costs one more call to the model, and giving the learner the benefit of the doubt means some real mistakes still go unmarked.',
        },
        {
          title: 'Letters from hand shape, not pixels',
          why: 'MediaPipe finds 21 points on each hand. We move both hands to the wrist, scale them to the size of the hand so distance from the camera does not matter, and pass the 126 numbers to a nearest-neighbour classifier. A letter only counts when 12 frames in a row agree, each with enough confidence.',
          tradeoff: 'A new letter needs only fresh recordings, with no neural network to train, but we recorded just four, A, B, G and W, with 60 examples each. It reads those four, not the whole alphabet.',
        },
      ],
    },
    awards: [
      {
        title: 'Cosine and EXO Labs Track Winner - On-Device Agent Hackathon',
        prizes: ['Cosine Track Winner', 'EXO Labs Track Winner'],
        description: 'OffBabel won two of the event\'s tracks, Cosine and EXO Labs.',
      },
    ],
  },
})
