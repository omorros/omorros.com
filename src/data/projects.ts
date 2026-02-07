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
      problem: 'Food waste is a global challenge, with households often discarding items simply because they forget they exist or when they expire. Traditional inventory apps fail because they demand tedious manual entry—a high-friction process that users rarely sustain. I needed a solution that made tracking effortless while solving the "trust issue" inherent in AI-generated data.',
      solution: 'SnapShelf transforms inventory management into a frictionless experience by leveraging GPT-4o Vision and barcode scanning for instant data entry. I architected a "Trust-First" system where AI acts as a drafter, placing items in a staging area for quick user confirmation—ensuring speed without compromising data integrity. The backend-driven architecture (FastAPI + PostgreSQL) handles complex logic like expiry prediction, keeping the React Native client lightweight and responsive.',
      features: [
        'AI-Powered Ingestion: Integrates GPT-4o Vision to identify food items from photos and OpenFoodFacts for real-time barcode scanning.',
        'Draft-to-Inventory Workflow: A unique intermediate state for AI suggestions, preventing "hallucinations" from polluting trusted inventory data.',
        'Smart Expiry Prediction: Uses historical data and category heuristics to automatically estimate shelf life.',
        'Production-Ready Backend: Built with FastAPI and SQLAlchemy, featuring comprehensive Pytest coverage and JWT security.'
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
