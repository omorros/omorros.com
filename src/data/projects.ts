export interface Project {
  title: string
  description: string
  tags: string[]
  link: string
  slug?: string
  caseStudy?: {
    problem: string
    solution: string
    features?: string[]
    screenshots?: string[]
  }
}


export const projects: Project[] = [
  {
    title: 'SnapShelf',
    description: 'Mobile grocery tracker with fast item scanning, expiry reminders, and recipe recommendations to reduce food waste.',
    tags: ['TypeScript', 'React Native', 'Python', 'PostgreSQL'],
    link: 'https://github.com/omorros/SnapShelf',
    slug: 'snapshelf',
    caseStudy: {
      problem: 'Food waste is a major issue for households, often caused by forgetting what items are in the pantry or when they expire. Existing solutions require tedious manual entry, making them difficult to sustain.',
      solution: 'SnapShelf simplifies inventory management with barcode scanning and receipt parsing. It automatically tracks expiry dates, sends timely reminders, and suggests recipes based on ingredients you already have, making it effortless to reduce waste and save money.',
      features: [
        'Barcode scanning for instant item addition',
        'Receipt parsing to bulk-add groceries',
        'Smart expiry notifications',
        'Recipe suggestions based on available ingredients'
      ]
    }
  },
  {
    title: 'bk-shoot',
    description: 'Low-cost IoT device that detects basketball makes/misses in real time using IR + vibration sensor fusion.',
    tags: ['C++', 'IoT', 'Arduino', 'React Native'],
    link: 'https://github.com/omorros/bk-shoot',
  },
  {
    title: 'deep-learning-cnn-comparison',
    description: 'Comparative study of CNN architectures (Custom, EfficientNetB0, ResNet50) for food image classification.',
    tags: ['Jupyter Notebook', 'Python', 'TensorFlow', 'Deep Learning'],
    link: 'https://github.com/omorros/deep-learning-cnn-comparison',
  },
  {
    title: 'omorros.com',
    description: 'Modern personal portfolio website built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.',
    tags: ['TypeScript', 'Next.js', 'Tailwind CSS', 'Framer Motion'],
    link: 'https://github.com/omorros/omorros.com',
  },
  {
    title: 'AI Response Classifier',
    description: 'ML classifier for Japeto Chat to categorize AI-generated responses, trained on 1,500+ tagged conversations.',
    tags: ['Jupyter Notebook', 'Python', 'NLP', 'ML'],
    link: 'https://github.com/omorros/AI_Response_Classifier_for_Japeto',
  },
  {
    title: 'UniversityLibrarySystem',
    description: 'Library management system with full CRUD operations and admin functionality.',
    tags: ['Java'],
    link: 'https://github.com/omorros/UniversityLibrarySystem',
  },
  {
    title: 'wikipedia_scraper',
    description: 'Web scraping utility for Wikipedia data extraction and analysis.',
    tags: ['Python'],
    link: 'https://github.com/omorros/wikipedia_scraper',
  },
]
