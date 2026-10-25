import { defineProject } from './schema'

export default defineProject({
  title: 'SnapShelf',
  description: 'An app that tracks the food in your kitchen from photos and barcodes, and reminds you before it expires.',
  tags: ['TypeScript', 'React Native', 'Python', 'PostgreSQL'],
  link: 'https://github.com/omorros/SnapShelf',
  slug: 'snapshelf',
  lastModified: '2026-10-25',
  category: 'personal',
  year: '2026',
  caseStudy: {
    challenge: 'Most food waste at home happens because you forget what you have. Tracking apps fail because typing everything in is too much work to keep up.',
    approach: 'I built a mobile app where you photograph or scan your groceries and AI fills in the rest. Its suggestions land in a review list first, so you confirm with one tap and stay in control of your inventory.',
    features: [
      { title: 'Point and Shoot', description: 'GPT-4o Vision names the food in your photo, and barcodes get looked up on OpenFoodFacts.' },
      { title: 'You Confirm Everything', description: 'The AI\'s suggestions land in a review list first, so nothing enters your inventory without a one-tap yes from you.' },
      { title: 'Guesses the Expiry', description: 'It estimates how long each item lasts from its category and what it has seen before, then reminds you in time.' },
      { title: 'A Real Backend', description: 'FastAPI and PostgreSQL behind the app, with proper tests and JWT login.' }
    ],
    thumbnail: { src: '/images/snapshelf/cover.jpg', alt: 'SnapShelf, a food inventory app, showing the pantry list sorted by expiry' },
    cardImage: { src: '/images/snapshelf/cover.jpg', alt: 'SnapShelf, a food inventory app, showing the pantry list sorted by expiry' },
    screenshots: [
      { src: '/images/snapshelf/inventory.jpg', alt: 'SnapShelf inventory sorted by expiry, with expired and expiring-soon counts' },
      { src: '/images/snapshelf/scan.jpg', alt: 'A kitchen counter photo and the items SnapShelf detected in it, each waiting for confirmation' },
      { src: '/images/snapshelf/recipes.jpg', alt: 'Recipe ideas that use the chicken, spinach and tomatoes expiring in the next three days' },
      { src: '/images/snapshelf/recipe-detail.jpg', alt: 'A suggested recipe with each ingredient flagged by how many days it has left' },
    ],
  }
})
