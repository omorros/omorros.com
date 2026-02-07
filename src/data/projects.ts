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
    reportUrl?: string
    awards?: {
      title: string
      description: string
    }[]
    tables?: {
      title: string
      headers: string[]
      rows: string[][]
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
      problem: 'Food waste is a global challenge, with households often discarding items simply because they forget they exist or when they expire. Traditional inventory apps fail because they demand tedious manual entry, a high-friction process that users rarely sustain. I needed a solution that made tracking effortless while solving the "trust issue" inherent in AI-generated data.',
      solution: 'SnapShelf transforms inventory management into a frictionless experience by leveraging GPT-4o Vision and barcode scanning for instant data entry. I architected a "Trust-First" system where AI acts as a drafter, placing items in a staging area for quick user confirmation, ensuring speed without compromising data integrity. The backend-driven architecture (FastAPI + PostgreSQL) handles complex logic like expiry prediction, keeping the React Native client lightweight and responsive.',
      features: [
        'AI-Powered Ingestion: Integrates GPT-4o Vision to identify food items from photos and OpenFoodFacts for real-time barcode scanning.',
        'Draft-to-Inventory Workflow: A unique intermediate state for AI suggestions, preventing "hallucinations" from polluting trusted inventory data.',
        'Smart Expiry Prediction: Uses historical data and category heuristics to automatically estimate shelf life.',
        'Production-Ready Backend: Built with FastAPI and SQLAlchemy, featuring comprehensive Pytest coverage and JWT security.'
      ]
    }
  },
  {
    title: 'BK-Shoot',
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
        'End-to-End System: Designed the full stack (circuitry, embedded firmware, Bluetooth serial protocol, and an Android app) for data visualization.',
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
    title: 'CNN Architecture Comparison',
    description: 'Comparative study of CNN architectures (Custom, EfficientNetB0, ResNet50) for food image classification.',
    tags: ['Jupyter Notebook', 'Python', 'TensorFlow', 'Deep Learning'],
    link: 'https://github.com/omorros/deep-learning-cnn-comparison',
    slug: 'deep-learning-cnn-comparison',
    caseStudy: {
      problem: 'Food image classification is a challenging computer vision task due to high intra-class variability and subtle inter-class differences. I aimed to determine if modern lightweight architectures (like EfficientNet) could match the performance of heavy industry standards (like ResNet) on a specific domain task, while minimizing computational resources for edge deployment.',
      solution: 'I conducted a rigorous comparative study of three distinct CNN architectures: a custom VGG-style model built from scratch, and transfer learning implementations of EfficientNetB0 and ResNet-50. Using a curated dataset of 120k+ images across 14 classes, I established a standardized training pipeline in TensorFlow to evaluate them on accuracy, parameter efficiency, and training time.',
      features: [
        'Rigorous Data Pipeline: Merged three Kaggle sources with SHA-256 deduplication and stratified splitting to prevent data leakage and ensure validity.',
        'Transfer Learning Efficacy: Proved that pre-trained models outperformed the custom architecture by ~1.8%, with EfficientNetB0 achieving 99.75% accuracy.',
        'Efficiency Analysis: Identified EfficientNetB0 as the optimal deployment choice, matching ResNet-50\'s accuracy while being 5.9x smaller and 35% faster to train.',
        'Imbalance Handling: Implemented class weighting to maintain >0.98 F1 scores even on minority classes (113:1 imbalance ratio).'
      ],
      tables: [
        {
          title: 'Model Performance Comparison',
          headers: ['Model', 'Test Accuracy', 'Parameters', 'Size', 'Training Time'],
          rows: [
            ['Custom CNN', '97.97%', '4.96M', '56.9 MB', '14.8h'],
            ['EfficientNetB0', '99.75%', '4.07M', '40.0 MB', '6.7h'],
            ['ResNet-50', '99.76%', '24.13M', '211.0 MB', '10.3h']
          ]
        },
        {
          title: 'Dataset Specifications',
          headers: ['Property', 'Value'],
          rows: [
            ['Total Images', '120,842 (deduplicated)'],
            ['Classes', '14 (Fruits & Vegetables)'],
            ['Split (Train/Val/Test)', '84,582 / 18,119 / 18,141'],
            ['Resolution', '224×224 RGB']
          ]
        }
      ]
    }
  },
  {
    title: 'Personal Web Portfolio',
    description: 'Modern personal portfolio website (omorros.com) built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.',
    tags: ['TypeScript', 'Next.js', 'Tailwind CSS', 'Framer Motion'],
    link: 'https://github.com/omorros/omorros.com',
    slug: 'personal-web-portfolio',
    caseStudy: {
      problem: 'Traditional scrolling portfolios often feel monotonous and fail to guide the user\'s attention effectively. I wanted to create a distinctive digital presence that would stand out to recruiters while demonstrating mastery of modern frontend performance techniques. The challenge was to build a rich, immersive experience with complex animations that still achieved perfect Lighthouse scores.',
      solution: 'I architected a single-page application with a custom full-page section navigation system. Instead of standard routing, I implemented a state-driven "PageWrapper" component that manages transitions, deep-linking, and input handling across mouse, touch, and keyboard. The visual design features dynamic gradient backgrounds that respond to cursor movement and crossfade smoothly between sections, creating a cohesive, app-like feel.',
      features: [
        'Custom Navigation Engine: Built a debounce-protected event handler system to manage full-page transitions via scroll, swipe, and keyboard inputs.',
        'Performance-First Animation: Leveraged Framer Motion for declarative transitions and GPU-accelerated CSS transforms for background gradients, ensuring 60fps performance.',
        'Interactive Visuals: Implemented a 500px radial glow effect that follows the cursor and adapts its color to match the active section\'s theme.',
        'Optimized Architecture: Achieved 95+ Lighthouse scores by using SVG gradients instead of heavy images and Next.js App Router for optimal bundle splitting.'
      ],
      tables: [
        {
          title: 'Technology Stack',
          headers: ['Category', 'Technology', 'Purpose'],
          rows: [
            ['Framework', 'Next.js 14', 'App Router architecture'],
            ['Language', 'TypeScript', 'Type safety'],
            ['Styling', 'Tailwind CSS', 'Utility-first styling'],
            ['Animation', 'Framer Motion', 'Complex state transitions'],
            ['Deployment', 'Vercel', 'Edge network hosting']
          ]
        },
        {
          title: 'Design System',
          headers: ['Section', 'Primary Color', 'Theme Hex'],
          rows: [
            ['Home', 'Green/Purple', '#27c029 / #8f46db'],
            ['About', 'Magenta', '#9e005d'],
            ['Education', 'Orange', '#ff6b35'],
            ['Skills', 'Burgundy', '#83394c'],
            ['Projects', 'Deep Blue', '#001b70']
          ]
        }
      ]
    }
  },
  {
    title: 'Wikipedia Scraper',
    description: 'High-performance asynchronous web scraper designed to crawl and extract Wikipedia links under strict time constraints.',
    tags: ['Python', 'Asyncio', 'Aiohttp', 'BeautifulSoup'],
    link: 'https://github.com/omorros/wikipedia_scraper',
    slug: 'wikipedia-scraper',
    caseStudy: {
      problem: 'Efficiently crawling large-scale websites requires balancing speed with politeness and resource management. I wanted to build a scraper that could maximize data extraction within a strictly enforced time window, demonstrating how asynchronous programming can drastically outperform traditional blocking I/O approaches.',
      solution: 'I engineered a high-concurrency asynchronous crawler using Python\'s `asyncio` and `aiohttp`. The system spawns 100 concurrent workers that share a global deadline state, ensuring immediate termination exactly when the budget expires. It features a robust URL normalization pipeline to handle protocol-relative links and a set-based deduplication layer to prevent redundant processing, all operating within a non-blocking event loop.',
      features: [
        'Massive Concurrency: Orchestrates 100 concurrent worker tasks to saturate network bandwidth and mask I/O latency.',
        'Strict Time Budgeting: Implemented a global deadline propagation mechanism that cancels all pending tasks exactly at the 20-second mark.',
        'Robust Parsing Pipeline: Uses BeautifulSoup to extract, normalize, and filter links, handling edge cases like root-relative and protocol-relative URLs.',
        'Efficient State Management: Maintains a hash set of visited URLs to guarantee O(1) lookup time for deduplication, preventing infinite loops.'
      ]
    }
  },
  {
    title: 'University Library System',
    description: 'Object-Oriented Java application for managing library resources, users, and loan transactions with file persistence.',
    tags: ['Java', 'OOP', 'JUnit', 'File I/O'],
    link: 'https://github.com/omorros/UniversityLibrarySystem',
    slug: 'university-library-system',
    caseStudy: {
      problem: 'Designing a library management system requires handling complex relationships between diverse entity types (Books, DVDs, Journals) and user roles (Students, Staff, Librarians). The challenge was to create a flexible, maintainable Object-Oriented architecture that could enforce specific business rules, such as loan limits and fines, while persisting state across sessions without a database.',
      solution: 'I developed a Java console application following a lightweight MVC architecture to separate domain logic from the UI. I utilized robust OOP principles, including Inheritance, Polymorphism, and Singleton patterns, to model complex relationships like the Adult-Child guardian dependency. The system implements a custom `DataLoader` for CSV persistence and refines earlier architectural decisions by encapsulating loan logic within the `User` class to ensure consistency.',
      features: [
        'MVC & OOP Architecture: Implemented a Model-View-Controller structure with extensive use of Inheritance (Abstract User/Product) and Composition (Guardian-Child relationships).',
        'Custom Persistence Engine: Built a `DataLoader` to serialize complex object graphs to CSV, decoupling business logic from data storage.',
        'Strict Business Rules: Enforced user-specific constraints (e.g., 10-item limit for Adults, 3 for Children) and complex states like "Suspended" or "Guardian Required" via polymorphism.',
        'Hybrid Testing Strategy: Combined black-box functional testing for user workflows with rigorous JUnit white-box testing for core logic, achieving high reliability.'
      ],
      reportUrl: '/reports/MOD004883_Component2_Report_2270056.pdf',
      screenshots: [
        '/images/university-library-ui.jpg'
      ],
      awards: [
        {
          title: 'Distinction Grade (80%)',
          description: 'Achieved a First-Class mark for software architecture quality, clean code practices, and comprehensive documentation.'
        }
      ],
      tables: [
        {
          title: 'Class Hierarchy',
          headers: ['Base Class', 'Subclasses', 'Key Responsibilities'],
          rows: [
            ['Product (Abstract)', 'Book, CD, DVD, Audiobook', 'Stores metadata (ISBN, Title), manages loan status'],
            ['User (Abstract)', 'Student, ChildUser, AdultUser', 'Manages personal info, active loans, and permissions'],
            ['Loan', 'N/A', 'Links Users to Products, tracks due dates and fines']
          ]
        },
        {
          title: 'Testing Verification',
          headers: ['Test Type', 'Scope', 'Key Scenarios Verified'],
          rows: [
            ['Functional', 'End-to-End User Flows', 'Login, Product Visibility (DVDs hidden for Students), Error Handling'],
            ['Unit (JUnit)', 'Core Business Logic', 'Borrowing Limits (10/5/3), Guardian Assignment, ID Uniqueness'],
            ['Regression', 'Bug Fix Verification', 'Loan state consistency between Controller and User classes']
          ]
        }
      ]
    }
  },
]
