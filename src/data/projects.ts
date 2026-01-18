export interface Project {
  title: string
  description: string
  tags: string[]
  link: string
}

export const projects: Project[] = [
  {
    title: 'bk-shoot',
    description: 'IoT basketball shot detector using IR + vibration sensors',
    tags: ['C++', 'IoT', 'Arduino'],
    link: 'https://github.com/omorros/bk-shoot',
  },
  {
    title: 'SnapShelf',
    description: 'Grocery inventory mobile app with expiry tracking',
    tags: ['TypeScript', 'React Native'],
    link: 'https://github.com/omorros/SnapShelf',
  },
  {
    title: 'AI Response Classifier',
    description: 'ML chatbot classifier trained on 1,500+ conversations',
    tags: ['Python', 'NLP', 'ML'],
    link: 'https://github.com/omorros/ai-response-classifier',
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
    tags: ['Java', 'MySQL'],
    link: 'https://github.com/omorros/UniversityLibrarySystem',
  },
]
