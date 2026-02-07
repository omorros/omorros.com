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
    videoUrl?: string
    awards?: {
      title: string
      description: string
    }[]
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
    tags: ['C++', 'IoT', 'Arduino', 'Android'],
    link: 'https://github.com/omorros/bk-shoot',
    slug: 'bk-shoot',
    caseStudy: {
      problem: 'Basketball training often relies on subjective feedback or expensive proprietary systems (ShotTracker, Noah), making analytics inaccessible to amateur players. I wanted to democratize sports technology by building a low-cost, portable solution that could provide real-time shooting metrics without requiring permanent installation or expensive cameras.',
      solution: 'I engineered "bk-shoot", a <€25 IoT device that fuses data from an IR sensor (ball detection) and a vibration sensor (rim impact) to distinguish between "swishes," "off-rim makes," and "misses" with ~95% accuracy. The system transmits data via Bluetooth to a custom Android app, where I implemented a statistics engine to visualize field goal percentage and shot distribution in real time.',
      features: [
        'Sensor Fusion Algorithm: Developed a custom C++ algorithm that correlates IR triggers and vibration spikes within a 1000ms window to classify shot outcomes.',
        'Cost-Effective Hardware: Built using Arduino Uno, E18-D80NK IR sensors, and SW-420 vibration modules, proving that high-accuracy tracking doesn\'t require high-end hardware.',
        'End-to-End System: Designed the full stack—circuitry, embedded firmware, Bluetooth serial protocol, and an Android app for data visualization.',
        'Validated Reliability: Field-tested with 20+ participants and ~2,000 shots, achieving statistical significance.'
      ],
      videoUrl: 'https://github.com/user-attachments/assets/b2f04fc3-4c96-47cb-862c-22dc06aca971',
      screenshots: [
        'https://raw.githubusercontent.com/omorros/bk-shoot/master/hardware/circuit_image.png',
        'https://raw.githubusercontent.com/omorros/bk-shoot/master/testing/01_setup_guide.png'
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
