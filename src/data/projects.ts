export interface Project {
  title: string
  description: string
  tags: string[]
  link: string
  slug?: string
  category: 'personal' | 'hackathon'
  event?: string
  year?: string
  caseStudy?: {
    challenge: string
    approach: string
    features?: { title: string; description: string }[]
    screenshots?: string[]
    photos?: { src: string; caption?: string }[]
    videoUrl?: string
    thumbnail?: string
    // Personal photo shown on the projects cards.
    // Falls back to thumbnail when not set.
    cardImage?: string
    // Optional Tailwind object-position class to frame the card crop,
    // e.g. 'object-[center_60%]'. Defaults to center.
    cardImagePos?: string
    // Optional short muted clip that loops on the card instead of a
    // static image. cardImage doubles as its poster frame.
    cardVideo?: string
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
    title: 'OffBabel',
    description: 'An offline language tutor that runs on a Reachy Mini robot. You learn by speaking Spanish or English, or by fingerspelling British Sign Language, and it all works without internet.',
    tags: ['Python', 'React', 'Local LLM', 'MediaPipe'],
    link: 'https://github.com/omorros/OffBabel',
    slug: 'offbabel',
    category: 'hackathon',
    event: 'Localhost: On-Device Agent Hackathon · London 2026',
    year: '2026',
    caseStudy: {
      challenge: 'Most apps and schools focus on grammar and writing, not on real conversation. When I moved to England I was fine with grammar and reading, but I still found it hard to speak fluently. That gap is what OffBabel sets out to fix.',
      approach: 'OffBabel runs fully on a Reachy Mini robot with no internet. You can practise by speaking Spanish or English and get feedback, or by fingerspelling British Sign Language to a webcam. It also keeps track of your mistakes and brings them back later so you practise them more.',
      features: [
        { title: 'Works Offline', description: 'The speech, the language model, and the sign reading all run on the device. Nothing is sent to the internet.' },
        { title: 'Two Ways to Learn', description: 'Speak in Spanish or English, or fingerspell British Sign Language to a webcam.' },
        { title: 'Reads Sign Language', description: 'It uses MediaPipe hand tracking and a KNN model to read your BSL fingerspelling as you sign.' },
        { title: 'Remembers Mistakes', description: 'It saves the mistakes you make and brings them back later so you get more practice on the hard ones.' },
      ],
      thumbnail: '/images/offbabel/presenting.png',
      screenshots: [
        'https://raw.githubusercontent.com/omorros/OffBabel/main/docs/img/home.png',
        'https://raw.githubusercontent.com/omorros/OffBabel/main/docs/img/speak.png',
        'https://raw.githubusercontent.com/omorros/OffBabel/main/docs/img/progress.png',
        'https://raw.githubusercontent.com/omorros/OffBabel/main/docs/img/summary.png',
      ],
      videoUrl: '/images/offbabel/bsl-test.mp4',
      cardImage: '/images/offbabel/robot.jpg',
      photos: [
        {
          src: '/images/offbabel/robot.jpg',
          caption: 'The Reachy Mini running OffBabel between our two laptops, with the hackathon in full swing behind it.',
        },
      ],
      awards: [
        {
          title: 'Cosine and ExoLabs Track Winner - On-Device Agent Hackathon',
          description: 'The event had no overall prize, just tracks. OffBabel won two of them, Cosine and ExoLabs, with the second announced at the last minute.',
        },
      ],
    },
  },
  {
    title: 'TrueVoice',
    description: 'Clinical voice intelligence platform that flags discrepancies between patient words and vocal biomarkers in real time during medical consultations.',
    tags: ['TypeScript', 'Next.js', 'Python', 'Claude API'],
    link: 'https://github.com/omorros/TrueVoice',
    slug: 'truevoice',
    category: 'hackathon',
    event: 'Voice AI Hack · London 2026',
    year: '2026',
    caseStudy: {
      challenge: 'Patients routinely minimize symptoms during consultations, leaving clinicians with an incomplete picture. Voice biomarkers carry that signal but sit on a separate diagnostic surface from the live transcript.',
      approach: 'Built a real-time clinical platform fusing medical-grade transcription with three parallel voice biomarker streams (distress, mood/energy, affect), reconciled by a concordance engine that surfaces minimisation flags in under a second.',
      features: [
        { title: 'Concordance Engine', description: 'Matches minimisation phrases against live biomarker evidence to flag word/voice discrepancies in <1s.' },
        { title: 'Three Biomarker Streams', description: 'Parallel distress, mood/energy, and affect signals via Thymia Sentinel.' },
        { title: 'Two Consultation Modes', description: 'Telehealth (separate devices) and in-person (single microphone) with diarized transcription.' },
        { title: 'Evidence Reports', description: 'End-of-consultation summaries synthesised by Claude with cited concordance gaps.' }
      ],
      thumbnail: '/images/truevoice/presenting.jpg',
      cardImage: '/images/truevoice/team-check.jpg',
      screenshots: [
        'https://raw.githubusercontent.com/omorros/TrueVoice/main/docs/images/landing.png',
        'https://raw.githubusercontent.com/omorros/TrueVoice/main/docs/images/dashboard.png',
        'https://raw.githubusercontent.com/omorros/TrueVoice/main/docs/images/telehealth.png',
        'https://raw.githubusercontent.com/omorros/TrueVoice/main/docs/images/report.png'
      ],
      photos: [
        {
          src: '/images/truevoice/team-check.jpg',
          caption: 'Holding the winner cheque after taking first place.',
        },
        {
          src: '/images/truevoice/credits.jpg',
          caption: 'The Speechmatics golden ticket, another 1,000 pounds in credits on top of the cheque.',
        },
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
    title: 'Basket',
    description: 'A team of five AI agents that spots product reformulations by watching complaints on the web, so brands find out in weeks instead of waiting for quarterly sales data.',
    tags: ['Python', 'FastAPI', 'Next.js', 'ClickHouse'],
    link: 'https://github.com/omorros/Basket',
    slug: 'basket',
    category: 'hackathon',
    event: 'Tokens LDN Multi-Agent Hackathon · London 2026',
    year: '2026',
    caseStudy: {
      challenge: 'When a brand quietly changes a recipe, the backlash lands on the web within days but only shows up in sales data months later. By the time a category manager sees it in a quarterly review, the damage is done.',
      approach: 'Basket is a pipeline of five agents run by a FastAPI orchestrator. Give it a product name and it finds the reformulation date, pulls complaints from news and the web, classifies them with traceable rules, rolls them up week by week in ClickHouse, and publishes a sourced alert the moment complaints spike.',
      features: [
        { title: 'Five-Agent Pipeline', description: 'A date finder, a retriever, a classifier, an aggregator, and a publisher, each with one job, coordinated by an orchestrator.' },
        { title: 'Finds the Turning Point', description: 'ClickHouse rolls complaints up by week and flags the inflection where a spike starts.' },
        { title: 'Every Claim Has a Source', description: 'Complaints are classified with traceable rules and every published alert links back to the original mentions.' },
        { title: 'Survives Demo Day', description: 'Local fallbacks kick in if any external service goes down, so the pipeline keeps running.' },
      ],
      thumbnail: 'https://raw.githubusercontent.com/omorros/Basket/main/docs/hero.png',
      cardImage: '/images/basket/demo.jpg',
      screenshots: [
        'https://raw.githubusercontent.com/omorros/Basket/main/docs/pipeline.png',
      ],
      photos: [
        {
          src: '/images/basket/demo.jpg',
          caption: 'Running the live demo in front of everyone at the Tokens LDN Multi-Agent Hackathon.',
        },
        {
          src: '/images/basket/chatting.jpg',
          caption: 'Talking builds with another hacker between sessions.',
        },
      ],
      awards: [
        {
          title: 'Track Winner - Tokens LDN Multi-Agent Hackathon 2026',
          description: 'First place on our track at the Tokens LDN Multi-Agent Hackathon in London, 2026.',
        },
      ],
    },
  },
  {
    title: 'WILDSCAN',
    description: 'Autonomous six-agent system that detects wildlife trafficking on regional marketplaces via automated scraping, multilingual code-word matching, vision species ID, and risk scoring.',
    tags: ['Python', 'LangGraph', 'Next.js', 'PostGIS'],
    link: 'https://github.com/omorros/WILDSCAN',
    slug: 'wildscan',
    category: 'hackathon',
    event: 'Unicorn Mafia × Techbible Hack Night · London 2026',
    year: '2026',
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
    year: '2026',
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
      cardImage: '/images/darkfleet/selfie.jpg',
      cardImagePos: 'object-[center_55%]',
      photos: [
        {
          src: '/images/darkfleet/selfie.jpg',
          caption: 'Hacking away with DarkFleet running on the laptop at Imperial College.',
        },
        {
          src: '/images/darkfleet/claude-sign.jpg',
          caption: 'With the Claude banner and the thinking caps we got for placing 6th of 64 teams.',
        },
      ],
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
    year: '2026',
    caseStudy: {
      challenge: 'Memory poisoning attacks bypass traditional kernel sandboxes and LLM guardrails because individual queries appear benign. The malicious pattern only emerges across an agent\'s long-term memory.',
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
    year: '2026',
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
    year: '2026',
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
    year: '2021',
    caseStudy: {
      challenge: 'Basketball analytics rely on expensive proprietary systems, making real-time shooting metrics inaccessible to amateur players.',
      approach: 'Engineered a <€25 IoT device fusing IR and vibration sensors to classify makes, misses, and swishes at ~95% accuracy. Stats stream via Bluetooth to a custom Android app.',
      features: [
        { title: 'Sensor Fusion Algorithm', description: 'Custom C++ algorithm correlates IR triggers and vibration spikes within a 1000ms window.' },
        { title: 'Cost-Effective Hardware', description: 'Built with Arduino Uno, IR sensors, and vibration modules for under €25.' },
        { title: 'Full-Stack System', description: 'Designed circuitry, embedded firmware, Bluetooth protocol, and Android app end-to-end.' },
        { title: 'Field-Validated', description: 'Tested with 20+ participants and ~2,000 shots achieving statistical significance.' }
      ],
      videoUrl: '/images/bk-shoot/testing.mp4',
      cardImage: '/images/bk-shoot/card.jpg',
      cardVideo: '/images/bk-shoot/card.mp4',
      photos: [
        {
          src: '/images/bk-shoot/breadboard.jpg',
          caption: 'First prototype on the breadboard, testing the sensors and LEDs late at night.',
        },
        {
          src: '/images/bk-shoot/mounted-board.jpg',
          caption: 'Everything wired and glued onto the board: Arduino, IR sensor, and the Bluetooth module.',
        },
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
  },
  {
    title: 'CNN Architecture Comparison',
    description: 'Benchmarked three CNN architectures on 120K+ food images, proving EfficientNetB0 matches ResNet-50 while being 5.9x smaller.',
    tags: ['Jupyter Notebook', 'Python', 'TensorFlow', 'Deep Learning'],
    link: 'https://github.com/omorros/deep-learning-cnn-comparison',
    slug: 'deep-learning-cnn-comparison',
    category: 'personal',
    year: '2026',
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
    title: 'Wikipedia Scraper',
    description: 'Async crawler with 100 concurrent workers, O(1) URL deduplication, and a 20-second global deadline.',
    tags: ['Python', 'Asyncio', 'Aiohttp', 'BeautifulSoup'],
    link: 'https://github.com/omorros/wikipedia_scraper',
    slug: 'wikipedia-scraper',
    category: 'personal',
    year: '2025',
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
    year: '2025',
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
        '/images/university-library/ui.jpg'
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
