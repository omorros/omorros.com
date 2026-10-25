import { defineProject } from './schema'

export default defineProject({
  title: 'OffBabel',
  description: 'An offline language tutor that runs on a Reachy Mini robot. You learn by speaking Spanish or English, or by fingerspelling British Sign Language, and it all works without internet.',
  tags: ['Python', 'React', 'Local LLM', 'MediaPipe'],
  link: 'https://github.com/omorros/OffBabel',
  slug: 'offbabel',
  lastModified: '2026-08-16',
  category: 'hackathon',
  event: 'Localhost: On-Device Agent Hackathon · London 2026',
  year: '2026',
  caseStudy: {
    challenge: 'Most apps and schools focus on grammar and writing, not on real conversation. When I moved to England I was fine with grammar and reading, but I still found it hard to speak fluently. That gap is what OffBabel sets out to fix.',
    approach: 'OffBabel runs fully on a Reachy Mini robot with no internet. You can practise by speaking Spanish or English and get feedback, or by fingerspelling British Sign Language to a webcam. It also keeps track of your mistakes and brings them back later so you practise them more.',
    features: [
      { title: 'Works Offline', description: 'The speech, the language model, and the sign reading all run on the device. Nothing is sent to the internet.' },
      { title: 'Two Ways to Learn', description: 'Speak in Spanish or English, or fingerspell British Sign Language to a webcam.' },
      { title: 'Reads Sign Language', description: 'It uses MediaPipe hand tracking and a KNN model to read your BSL fingerspelling as you sign.' },
      { title: 'Remembers Mistakes', description: 'It saves the mistakes you make and brings them back later so you get more practice on the hard ones.' },
    ],
    screenshots: [
      'https://raw.githubusercontent.com/omorros/OffBabel/main/docs/img/home.png',
      'https://raw.githubusercontent.com/omorros/OffBabel/main/docs/img/speak.png',
      'https://raw.githubusercontent.com/omorros/OffBabel/main/docs/img/progress.png',
      'https://raw.githubusercontent.com/omorros/OffBabel/main/docs/img/summary.png',
    ],
    videoUrl: '/images/offbabel/bsl-test.mp4',
    cardImage: '/images/offbabel/robot.jpg',
    photos: [
      { src: '/images/offbabel/robot.jpg' },
      { src: '/images/offbabel/presenting.jpg' },
    ],
    awards: [
      {
        title: 'Cosine and ExoLabs Track Winner - On-Device Agent Hackathon',
        prizes: ['Cosine Track Winner', 'EXO Labs Track Winner'],
        description: 'The event had no overall prize, just tracks. OffBabel won two of them, Cosine and ExoLabs.',
      },
    ],
  },
})
