import { defineProject } from './schema'

export default defineProject({
  title: 'BK-Shoot',
  description: 'A 25 euro sensor rig on the basketball hoop that counts your makes and misses in real time, straight to your phone.',
  tags: ['C++', 'IoT', 'Arduino', 'Android'],
  link: 'https://github.com/omorros/bk-shoot',
  slug: 'bk-shoot',
  lastModified: '2026-08-16',
  category: 'personal',
  year: '2021',
  caseStudy: {
    challenge: 'Shot tracking exists for pro teams, but it costs thousands. Amateur players have no way to know their real shooting numbers.',
    approach: 'I combined an infrared sensor and a vibration sensor on an Arduino to tell makes from misses at around 95 percent accuracy, and streamed every shot over Bluetooth to an Android app I built. Tested with 20 players and around 2,000 real shots.',
    features: [
      { title: 'Two Sensors, One Answer', description: 'My C++ code matches the infrared trigger with the vibration spike inside a one second window to call make or miss.' },
      { title: 'Under 25 Euros of Parts', description: 'An Arduino Uno, an infrared sensor, and a vibration module. That is the whole rig.' },
      { title: 'Built End to End', description: 'I designed the circuit, wrote the firmware, defined the Bluetooth protocol, and built the Android app.' },
      { title: 'Tested on a Real Court', description: '20 players and around 2,000 shots, at about 95 percent detection accuracy.' }
    ],
    videoUrl: '/images/bk-shoot/testing.mp4',
    cardImage: '/images/bk-shoot/mounted-board.jpg',
    cardImagePos: 'object-[center_35%]',
    cardVideo: '/images/bk-shoot/card.mp4',
    photos: [
      { src: '/images/bk-shoot/breadboard.jpg' },
      { src: '/images/bk-shoot/mounted-board.jpg' },
    ],
    screenshots: [
      'https://raw.githubusercontent.com/omorros/bk-shoot/main/testing/01_setup_guide.png',
      'https://raw.githubusercontent.com/omorros/bk-shoot/main/hardware/circuit_image.png',
    ],
    awards: [
      {
        title: 'Honourable Mention - 12th Planter de Sondeigs i Experiments',
        description: 'Awarded by UPC, UAB, UB, and Idescat for "combining statistics, Big Data, AI, and programming with sports".'
      },
      {
        title: 'ICFO Young Photonics Congress',
        description: 'Selected to present research on sensor fusion and optical detection to industry experts.'
      }
    ]
  }
})
