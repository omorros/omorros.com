import { defineFlow, defineProject } from './schema'

export default defineProject({
  title: 'BK-Shoot',
  description: 'A sensor box for the basketball hoop that counts every make and miss and shows your shooting stats live on your phone.',
  tags: ['Arduino', 'C++', 'Android', 'Bluetooth'],
  link: 'https://github.com/omorros/bk-shoot',
  slug: 'bk-shoot',
  lastModified: '2026-10-25',
  category: 'personal',
  year: '2021',
  caseStudy: {
    videoUrl: '/images/bk-shoot/testing.mp4',
    cardImage: { src: '/images/bk-shoot/mounted-board.jpg', alt: 'The BK-Shoot electronics fixed to a board: an Arduino, a Bluetooth module, an infrared sensor and a breadboard' },
    cardFocus: 'center 35%',
    cardVideo: '/images/bk-shoot/card.mp4',
    photos: [
      { src: '/images/bk-shoot/breadboard.jpg', alt: 'An early breadboard prototype with its RGB LED glowing purple next to the Arduino and the Bluetooth module' },
      { src: '/images/bk-shoot/mounted-board.jpg', alt: 'The BK-Shoot electronics fixed to a board: an Arduino, a Bluetooth module, an infrared sensor and a breadboard' },
    ],
    screenshots: [
      { src: '/images/bk-shoot/01_setup_guide.jpg', alt: 'Seven photos of fitting BK-Shoot: the box of electronics, reaching up to the hoop, and the sensors fixed behind the rim' },
      { src: '/images/bk-shoot/circuit_image.jpg', alt: 'Circuit drawing: an Arduino Uno wired to a Bluetooth module, a proximity sensor, a vibration sensor, an RGB LED and a battery' },
    ],
    story: {
      insight: 'A hoop that knows a make from a miss.',
      facts: [
        { label: 'Stack', value: 'Arduino, C++, Bluetooth, MIT App Inventor, Android' },
      ],
      context: 'Shooting practice runs on two numbers: how many shots you took and how many went in. On your own, or with one friend, nobody keeps that count for long. I built BK-Shoot at 15, during the pandemic, as my secondary school research project: a box on the hoop that tells a make from a miss and sends every shot to a phone, so the numbers are there while you are still shooting.',
      flow: defineFlow({
        tones: {
          signal: { swatch: 'grey', label: 'Sensor signal' },
          shot: { swatch: 'blue', label: 'Make or miss' },
          session: { swatch: 'green', label: 'Session' },
        },
        nodes: [
          { id: 'prox', label: 'Proximity sensor', note: 'Watches the ball at the hoop', detail: 'infrared', tone: 'signal', col: 0, row: 0 },
          { id: 'vib', label: 'Vibration sensor', note: 'Feels the ball hit the rim', detail: 'impact threshold', tone: 'signal', col: 0, row: 2 },
          { id: 'arduino', label: 'Arduino', note: 'Reads both, calls make or miss', detail: 'C++ · short time window', steps: ['both sensors read', 'shot called'], tone: 'shot', col: 1, row: 1 },
          { id: 'bt', label: 'Bluetooth', note: 'One digit per shot', detail: 'HC-05 · 2 basket, 1 miss', tone: 'shot', col: 2, row: 1 },
          { id: 'app', label: 'Phone app', note: 'Counts every shot live', detail: 'MIT App Inventor · Android', steps: ['player and shot type', 'baskets and misses', 'success rate'], live: 'Baskets: 13 · Misses: 14', tone: 'shot', col: 3, row: 1 },
          { id: 'history', label: 'Session history', note: 'Saved by player, date and shot type', detail: 'on the phone · CSV export', live: 'Training lasted: 01:06', tone: 'session', col: 4, row: 1 },
        ],
        edges: [
          ['prox', 'arduino'],
          ['vib', 'arduino'],
          ['arduino', 'bt'],
          ['bt', 'app'],
          ['app', 'history', 'session'],
        ],
        caption: 'Every box is something I built or wired up myself.',
      }),
      decisions: [
        {
          title: 'Two sensors, read together',
          why: 'A proximity sensor watches the ball at the hoop and a vibration sensor feels it hit the rim. A ball can shake the rim and stay out, and a clean shot can drop through without touching it, so one sensor alone is not enough to count both makes and misses. The Arduino reads both inside a short time window and calls the shot.',
          tradeoff: 'It only works as well as it is fitted. Both sensors have to sit just right on each hoop, and the time window and both thresholds have to be tuned to it.',
        },
        {
          title: 'The hoop decides, the phone counts',
          why: 'The Arduino makes the call and sends a single digit over Bluetooth: 2 for a basket, 1 for a miss. The app only adds them up and shows baskets, misses, total shots, shots per minute, the success rate and a timer while you play.',
          tradeoff: 'The phone never sees the raw sensor readings, so a wrong call cannot be checked or corrected afterwards.',
        },
        {
          title: 'Every session saved with the player',
          why: 'Before a workout the app asks who is shooting, from a profile with age, height, weight, sex and dominant hand, and which shot: free throw, two or three. Each session is saved with its totals and times, can be sorted by player, date or shot type, and can be shared as comma-separated text for a spreadsheet.',
          tradeoff: 'Everything lives on one phone. Getting the numbers anywhere else means exporting them by hand.',
        },
      ],
    },
    awards: [
      {
        title: 'Honourable Mention - 12th Planter de Sondeigs i Experiments',
        description: 'Menció 4 in the 3rd and 4th ESO category on 28 May 2021, shared with Alejandro Nuñez Navarro, "for combining statistics, Big Data, artificial intelligence and programming with sport".',
      },
      {
        title: 'Young Photonics Congress - ICFO 2021',
        description: 'Took part with BK-Shoot on 12 April 2021 and received the congress diploma.',
      },
    ],
  },
})
