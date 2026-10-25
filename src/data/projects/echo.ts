import { defineProject } from './schema'

export default defineProject({
  title: 'Echo',
  description: 'A hardware recorder that turns a meeting into searchable notes, action items and answers about what was decided.',
  tags: ['Python', 'C++', 'ESP32-S3', 'FastAPI'],
  link: 'https://github.com/omorros/Echo',
  slug: 'echo',
  lastModified: '2026-08-29',
  category: 'hackathon',
  event: 'Superlinked \u00d7 Alibaba Cloud Qwen Hackathon \u00b7 London 2026',
  year: '2026',
  caseStudy: {
    challenge: 'Meetings disappear. Someone takes half a page of notes, the decisions stay in one person\'s head, and a week later nobody can say what was agreed or who is meant to be doing it.',
    approach: 'We built a recorder you press once: an ESP32-S3 board streams the audio to a backend that separates the speakers, writes the notes, pulls out the action items and makes every past meeting searchable. A dial on the device picks the kind of meeting, and that choice decides which model writes the notes.',
    features: [
      { title: 'One Button, One Dial', description: 'Press the button to start recording, turn the dial to say what kind of meeting it is, and the little screen tells you it is listening.' },
      { title: 'Knows Who Said What', description: 'The audio comes back split by speaker, so the notes can say who agreed to what instead of just what was said.' },
      { title: 'Searches Every Meeting', description: 'Ask what was decided about something and it looks back through everything you have recorded, not only the last call.' },
      { title: 'Two Clouds, One Job', description: 'Each step goes to whichever provider does it best, Superlinked or Alibaba Cloud Qwen, and either one takes over when the other fails.' }
    ],
    thumbnail: '/images/echo/device.jpg',
    cardImage: '/images/echo/winners.jpg',
    youtubeId: 'Gh3SKQ_0ZHw',
    youtubePoster: '/images/echo/demo-poster.jpg',
    photos: [
      { src: '/images/echo/winners.jpg' },
      { src: '/images/echo/alibaba-office.jpg' },
      { src: '/images/echo/visitor-pass.jpg' },
    ],
    awards: [
      {
        title: 'Track Winner - Superlinked x Alibaba Cloud Qwen 2026',
        prizes: ['Track Winner'],
        description: 'Only 25 people were selected for the day, which ran at the Alibaba Cloud offices in London.'
      }
    ]
  }
})
