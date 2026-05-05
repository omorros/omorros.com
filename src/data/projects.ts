export interface Project {
  title: string
  description: string
  tags: string[]
  link: string
  slug?: string
  category: 'personal' | 'hackathon'
  event?: string
  caseStudy?: {
    challenge: string
    approach: string
    features?: { title: string; description: string }[]
    screenshots?: string[]
    videoUrl?: string
    thumbnail?: string
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
    title: 'TrueVoice',
    description: 'Clinical voice intelligence platform that flags discrepancies between patient words and vocal biomarkers in real time during medical consultations.',
    tags: ['TypeScript', 'Next.js', 'Python', 'Claude API'],
    link: 'https://github.com/omorros/TrueVoice',
    slug: 'truevoice',
    category: 'hackathon',
    event: 'Voice AI Hack · London 2026',
    caseStudy: {
      challenge: 'Patients routinely minimize symptoms during consultations, leaving clinicians with an incomplete picture. Voice biomarkers carry that signal but sit on a separate diagnostic surface from the live transcript.',
      approach: 'Built a real-time clinical platform fusing medical-grade transcription with three parallel voice biomarker streams (distress, mood/energy, affect), reconciled by a concordance engine that surfaces minimisation flags in under a second.',
      features: [
        { title: 'Concordance Engine', description: 'Matches minimisation phrases against live biomarker evidence to flag word/voice discrepancies in <1s.' },
        { title: 'Three Biomarker Streams', description: 'Parallel distress, mood/energy, and affect signals via Thymia Sentinel.' },
        { title: 'Two Consultation Modes', description: 'Telehealth (separate devices) and in-person (single microphone) with diarized transcription.' },
        { title: 'Evidence Reports', description: 'End-of-consultation summaries synthesised by Claude with cited concordance gaps.' }
      ],
      thumbnail: 'https://raw.githubusercontent.com/omorros/TrueVoice/main/docs/images/landing.png',
      screenshots: [
        'https://raw.githubusercontent.com/omorros/TrueVoice/main/docs/images/dashboard.png',
        'https://raw.githubusercontent.com/omorros/TrueVoice/main/docs/images/telehealth.png',
        'https://raw.githubusercontent.com/omorros/TrueVoice/main/docs/images/report.png'
      ],
      awards: [
        {
          title: 'Overall Winner - Voice AI Hack London 2026',
          description: 'First place across the full event in the Voice & Medical track sponsored by Thymia and Speechmatics.'
        }
      ]
    }
  },
  {
    title: 'WILDSCAN',
    description: 'Autonomous six-agent system that detects wildlife trafficking on regional marketplaces via automated scraping, multilingual code-word matching, vision species ID, and risk scoring.',
    tags: ['Python', 'LangGraph', 'Next.js', 'PostGIS'],
    link: 'https://github.com/omorros/WILDSCAN',
    slug: 'wildscan',
    category: 'hackathon',
    event: 'Unicorn Mafia × Techbible Hack Night · London 2026',
    caseStudy: {
      challenge: 'Wildlife trafficking moves through fragmented regional marketplaces in dozens of languages, faster than human investigators can monitor. Existing tooling stops at translation.',
      approach: 'Built a six-agent LangGraph pipeline running on Bright Data Web MCP, paired with a 500-term coded-language lexicon across 8 languages and deterministic risk scoring against CITES/IUCN classifications.',
      features: [
        { title: '6-Agent LangGraph Pipeline', description: 'Scanner, Triage, Linguist, Image Analyst, Species Classifier, and Risk Scorer running fully autonomously.' },
        { title: 'Multilingual Lexicon', description: '500 coded trafficking terms across 8 languages with fuzzy matching for obfuscated listings.' },
        { title: 'Deterministic Risk Scoring', description: '0-100 scores from 8 weighted signals, correlated against 6,000 historical seizure records.' },
        { title: 'Globe Visualization', description: 'Real-time Mapbox globe plotting detections geographically with on-demand intelligence briefs.' }
      ],
      thumbnail: 'https://raw.githubusercontent.com/omorros/WILDSCAN/main/docs/images/landing.png',
      screenshots: [
        'https://raw.githubusercontent.com/omorros/WILDSCAN/main/docs/images/command-center.png',
        'https://raw.githubusercontent.com/omorros/WILDSCAN/main/docs/images/scan-results.png',
        'https://raw.githubusercontent.com/omorros/WILDSCAN/main/docs/images/detection-detail.png'
      ],
      awards: [
        {
          title: 'Overall Winner - Unicorn Mafia x Techbible Hack Night 2026',
          description: 'Built in 90 minutes; awarded the overall prize at the London hack night (Web MCP Agents track), March 2026.'
        }
      ]
    }
  },
  {
    title: 'DarkFleet',
    description: 'AI-powered maritime surveillance system that consolidates seven data sources to detect illegal fishing vessels via deterministic risk scoring and Claude-generated intelligence briefs.',
    tags: ['Python', 'Claude API', 'PostGIS', 'Mapbox'],
    link: 'https://github.com/omorros/DarkFleet',
    slug: 'darkfleet',
    category: 'hackathon',
    event: 'Claude Hackathon · Imperial College London 2026',
    caseStudy: {
      challenge: 'Illegal fishing fleets hide across fragmented signal sources - AIS dark gaps, RFMO records, sanctions lists, ownership chains. No analyst can correlate them in real time.',
      approach: 'Unified seven open data sources (Global Fishing Watch, WDPA, RFMO registries, OpenSanctions, and more) under a single risk dashboard with 7-signal weighted scoring and a Claude-driven analyst persona for follow-up investigation.',
      features: [
        { title: '7-Signal Risk Engine', description: 'Encounters, AIS dark gaps, RFMO status, loitering, flag changes, ownership opacity, and sanctions matches.' },
        { title: 'Tiered Alerts', description: 'Red ≥80, Amber ≥60, Clear <60 - ranked across the global fleet in real time.' },
        { title: 'Claude as Analyst', description: 'Streaming chat persona answers analyst follow-ups and produces structured vessel assessments.' },
        { title: 'Incident Reports', description: 'Auto-generated PDF briefs synthesising every signal into a single shareable artifact.' }
      ],
      thumbnail: 'https://raw.githubusercontent.com/omorros/DarkFleet/main/docs/screenshots/globe-overview.png',
      screenshots: [
        'https://raw.githubusercontent.com/omorros/DarkFleet/main/docs/screenshots/vessel-detail-red.png',
        'https://raw.githubusercontent.com/omorros/DarkFleet/main/docs/screenshots/vessel-detail-amber.png',
        'https://raw.githubusercontent.com/omorros/DarkFleet/main/docs/screenshots/ai-chat.png',
        'https://raw.githubusercontent.com/omorros/DarkFleet/main/docs/screenshots/incident-report.png'
      ],
      awards: [
        {
          title: '6th of 64 - Claude Hackathon, Imperial College London',
          description: 'Top-10 finish out of 64 teams at the Anthropic-sponsored hackathon at Imperial College London.'
        }
      ]
    }
  },
  {
    title: 'GASLIT',
    description: 'Belief-layer security system that intercepts memory poisoning attacks against AI agents using four coordinated agents, HMAC verification, and adaptive retrieval contracts.',
    tags: ['Python', 'FastAPI', 'Next.js', 'MongoDB'],
    link: 'https://github.com/omorros/GASLIT',
    slug: 'gaslit',
    category: 'hackathon',
    event: 'MongoDB Agentic Evolution · London 2026',
    caseStudy: {
      challenge: 'Memory poisoning attacks bypass traditional kernel sandboxes and LLM guardrails because individual queries appear benign — the malicious pattern only emerges across an agent\'s long-term memory.',
      approach: 'Built a belief-layer interceptor sitting between MongoDB and the LLM context, with four specialized agents coordinating through change streams to detect injection attempts via cohort statistical analysis, HMAC verification, and adaptive retrieval contracts.',
      thumbnail: 'https://raw.githubusercontent.com/omorros/GASLIT/main/docs/screenshots/landing.png',
      screenshots: [
        'https://raw.githubusercontent.com/omorros/GASLIT/main/docs/screenshots/agents.png',
        'https://raw.githubusercontent.com/omorros/GASLIT/main/docs/screenshots/divergence.png',
        'https://raw.githubusercontent.com/omorros/GASLIT/main/docs/screenshots/console.jpg',
        'https://raw.githubusercontent.com/omorros/GASLIT/main/docs/mongodb-cluster-screenshot.png'
      ]
    }
  },
  {
    title: 'Atlas',
    description: 'Real-time treasury control room that reads every transaction, scores every counterparty, and spawns autonomous research agents to brief human decision-makers on complex cases.',
    tags: ['Python', 'FastAPI', 'Next.js', 'Claude API'],
    link: 'https://github.com/omorros/Atlas',
    slug: 'atlas',
    category: 'hackathon',
    event: 'Cursor × Briefcase · London 2026',
    caseStudy: {
      challenge: 'Treasury teams drown in transaction noise while genuine counterparty risk hides in long-tail signals that no single deterministic rule or single LLM pass can catch.',
      approach: 'Built a hybrid pipeline combining deterministic rules with Claude Haiku triage and Claude Sonnet analysis; complex cases auto-spawn a Cursor Cloud Agent to run forensic research and produce a memo for the human reviewer.',
      thumbnail: 'https://raw.githubusercontent.com/omorros/Atlas/main/docs/screenshots/landing.png',
      screenshots: [
        'https://raw.githubusercontent.com/omorros/Atlas/main/docs/screenshots/warroom.png',
        'https://raw.githubusercontent.com/omorros/Atlas/main/docs/screenshots/brief.png',
        'https://raw.githubusercontent.com/omorros/Atlas/main/docs/screenshots/investigation.png',
        'https://raw.githubusercontent.com/omorros/Atlas/main/docs/screenshots/memo.png'
      ]
    }
  },
  {
    title: 'SnapShelf',
    description: 'Mobile grocery tracker with AI-powered item scanning, expiry reminders, and a trust-first workflow to reduce food waste.',
    tags: ['TypeScript', 'React Native', 'Python', 'PostgreSQL'],
    link: 'https://github.com/omorros/SnapShelf',
    slug: 'snapshelf',
    category: 'personal',
    caseStudy: {
      challenge: 'Household food waste is driven by forgotten inventory. Existing tracking apps fail because manual data entry is too tedious to sustain.',
      approach: 'Built a React Native app using GPT-4o Vision and barcode scanning for instant item capture. A draft-to-inventory workflow lets AI suggest entries while users retain control over their data.',
      features: [
        { title: 'AI-Powered Capture', description: 'GPT-4o Vision identifies items from photos; OpenFoodFacts handles barcode lookups.' },
        { title: 'Trust-First Workflow', description: 'AI suggestions land in a staging area for quick user confirmation before entering inventory.' },
        { title: 'Smart Expiry Prediction', description: 'Uses historical data and category heuristics to automatically estimate shelf life.' },
        { title: 'Production Backend', description: 'FastAPI + SQLAlchemy with comprehensive Pytest coverage and JWT security.' }
      ]
    }
  },
  {
    title: 'BK-Shoot',
    description: 'Low-cost IoT device that detects basketball makes/misses in real time using IR + vibration sensor fusion.',
    tags: ['C++', 'IoT', 'Arduino', 'Android'],
    link: 'https://github.com/omorros/bk-shoot',
    slug: 'bk-shoot',
    category: 'personal',
    caseStudy: {
      challenge: 'Basketball analytics rely on expensive proprietary systems, making real-time shooting metrics inaccessible to amateur players.',
      approach: 'Engineered a <€25 IoT device fusing IR and vibration sensors to classify makes, misses, and swishes at ~95% accuracy. Stats stream via Bluetooth to a custom Android app.',
      features: [
        { title: 'Sensor Fusion Algorithm', description: 'Custom C++ algorithm correlates IR triggers and vibration spikes within a 1000ms window.' },
        { title: 'Cost-Effective Hardware', description: 'Built with Arduino Uno, IR sensors, and vibration modules for under €25.' },
        { title: 'Full-Stack System', description: 'Designed circuitry, embedded firmware, Bluetooth protocol, and Android app end-to-end.' },
        { title: 'Field-Validated', description: 'Tested with 20+ participants and ~2,000 shots achieving statistical significance.' }
      ],
      videoUrl: 'https://github.com/user-attachments/assets/b2f04fc3-4c96-47cb-862c-22dc06aca971',
      thumbnail: '/gradients/projects.svg',
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
    description: 'Benchmarked three CNN architectures on 120K+ food images, proving EfficientNetB0 matches ResNet-50 while being 5.9x smaller.',
    tags: ['Jupyter Notebook', 'Python', 'TensorFlow', 'Deep Learning'],
    link: 'https://github.com/omorros/deep-learning-cnn-comparison',
    slug: 'deep-learning-cnn-comparison',
    category: 'personal',
    caseStudy: {
      challenge: 'Determining whether lightweight CNNs can match heavy architectures for domain-specific image classification while minimizing compute cost.',
      approach: 'Benchmarked three CNN architectures on 120K+ food images. EfficientNetB0 matched ResNet-50\'s 99.75% accuracy while being 5.9x smaller and 35% faster to train.',
      features: [
        { title: '120K+ Image Pipeline', description: 'Merged three Kaggle sources with SHA-256 deduplication and stratified splitting.' },
        { title: '99.75% Accuracy', description: 'EfficientNetB0 matched ResNet-50 via transfer learning on domain-specific data.' },
        { title: '5.9x Model Compression', description: 'EfficientNetB0 achieved parity at 40 MB vs ResNet-50\'s 211 MB.' },
        { title: 'Class-Weighted Training', description: 'Maintained >0.98 F1 scores even on minority classes with 113:1 imbalance.' }
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
    description: 'Single-page portfolio with custom full-page navigation, cursor-reactive gradients, and 95+ Lighthouse scores.',
    tags: ['TypeScript', 'Next.js', 'Tailwind CSS', 'Framer Motion'],
    link: 'https://github.com/omorros/omorros.com',
    slug: 'personal-web-portfolio',
    category: 'personal',
    caseStudy: {
      challenge: 'Traditional scrolling portfolios feel generic and fail to guide user attention effectively.',
      approach: 'Built a single-page app with custom full-page navigation, cursor-reactive gradient backgrounds, and GPU-accelerated section transitions. Scores 95+ on all Lighthouse metrics.',
      features: [
        { title: 'Custom Navigation Engine', description: 'Debounce-protected handler manages full-page transitions via scroll, swipe, and keyboard.' },
        { title: '60fps Animations', description: 'Framer Motion transitions and GPU-accelerated CSS transforms for smooth performance.' },
        { title: 'Cursor-Following Glow', description: '500px radial glow follows the cursor and adapts color to the active section theme.' },
        { title: '95+ Lighthouse Scores', description: 'SVG gradients and Next.js App Router for optimal bundle splitting and performance.' }
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
    description: 'Async crawler with 100 concurrent workers, O(1) URL deduplication, and a 20-second global deadline.',
    tags: ['Python', 'Asyncio', 'Aiohttp', 'BeautifulSoup'],
    link: 'https://github.com/omorros/wikipedia_scraper',
    slug: 'wikipedia-scraper',
    category: 'personal',
    caseStudy: {
      challenge: 'Efficiently crawling large-scale websites requires balancing speed with resource management under strict time constraints.',
      approach: 'Built a high-concurrency async crawler with 100 workers, O(1) URL deduplication, and a global 20-second deadline using Python\'s asyncio and aiohttp.',
      features: [
        { title: '100 Concurrent Workers', description: 'Saturates network bandwidth and masks I/O latency with massive parallelism.' },
        { title: '20s Deadline Enforcement', description: 'Global deadline propagation cancels all pending tasks exactly at the time limit.' },
        { title: 'URL Deduplication', description: 'Hash set guarantees O(1) lookup time, preventing redundant processing and infinite loops.' },
        { title: 'Non-Blocking Architecture', description: 'Full async event loop with robust link normalization and protocol handling.' }
      ]
    }
  },
  {
    title: 'University Library System',
    description: 'Java MVC console app with inheritance hierarchies, polymorphic loan rules, and custom CSV persistence.',
    tags: ['Java', 'OOP', 'JUnit', 'File I/O'],
    link: 'https://github.com/omorros/UniversityLibrarySystem',
    slug: 'university-library-system',
    category: 'personal',
    caseStudy: {
      challenge: 'Modelling complex entity relationships and enforcing role-specific business rules with file-based persistence and no database.',
      approach: 'Developed a Java MVC console app using inheritance hierarchies, polymorphic loan rules, and a custom CSV persistence engine.',
      features: [
        { title: 'MVC + OOP Architecture', description: 'Model-View-Controller with abstract base classes and composition patterns.' },
        { title: 'CSV Persistence Engine', description: 'Custom DataLoader serializes complex object graphs, decoupling logic from storage.' },
        { title: 'Role-Based Loan Rules', description: 'Polymorphic constraints enforce per-role limits (10 Adult, 3 Child) and suspension states.' },
        { title: 'JUnit + Functional Tests', description: 'White-box unit tests for core logic combined with end-to-end workflow testing.' }
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
