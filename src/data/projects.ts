export interface Project {
  title: string
  description: string
  tags: string[]
  link: string
}


export const projects: Project[] = [
  {
    title: 'bk-shoot',
    description: 'IoT basketball shot detector using IR + vibration sensors, paired with an Android app',
    tags: ['C++', 'IoT', 'Arduino'],
    link: 'https://github.com/omorros/bk-shoot',
  },
  {
    title: 'SnapShelf',
    description: 'Mobile grocery tracker with fast item scanning, expiry reminders, and recipe recommendations',
    tags: ['TypeScript', 'Python', 'React Native'],
    link: 'https://github.com/omorros/SnapShelf',
  },
  {
    title: 'AI Response Classifier',
    description: 'ML classifier for AI-generated responses built for Japeto',
    tags: ['Python', 'NLP', 'ML'],
    link: 'https://github.com/omorros/AI_Response_Classifier_for_Japeto',
  },
  {
    title: 'wikipedia_scraper',
    description: 'Web scraping utility for Wikipedia data extraction',
    tags: ['Python'],
    link: 'https://github.com/omorros/wikipedia_scraper',
  },
  {
    title: 'UniversityLibrarySystem',
    description: 'Library management system with full CRUD operations',
    tags: ['Java'],
    link: 'https://github.com/omorros/UniversityLibrarySystem',
  },
]
