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
      screenshots: [
        'https://raw.githubusercontent.com/omorros/OffBabel/main/docs/img/home.png',
        'https://raw.githubusercontent.com/omorros/OffBabel/main/docs/img/speak.png',
        'https://raw.githubusercontent.com/omorros/OffBabel/main/docs/img/progress.png',
        'https://raw.githubusercontent.com/omorros/OffBabel/main/docs/img/summary.png',
      ],
      videoUrl: '/images/offbabel/bsl-test.mp4',
      cardImage: '/images/offbabel/robot.jpg',
      photos: [
        { src: '/images/offbabel/robot.jpg' },
        { src: '/images/offbabel/presenting.jpg' },
      ],
      awards: [
        {
          title: 'Cosine and ExoLabs Track Winner - On-Device Agent Hackathon',
          description: 'The event had no overall prize, just tracks. OffBabel won two of them, Cosine and ExoLabs.',
        },
      ],
    },
  },
  {
    title: 'SupConnect',
    description: 'An AI voice agent that answers buyer calls for secondhand clothing suppliers at any hour, qualifies the deal, and leaves a ready lead for the morning.',
    tags: ['TypeScript', 'Next.js', 'ElevenLabs', 'WebSockets'],
    link: 'https://github.com/omorros/SupConnect',
    slug: 'supconnect',
    category: 'hackathon',
    event: 'Fleek × a16z Hackathon · London 2026',
    year: '2026',
    caseStudy: {
      challenge: 'Secondhand clothing suppliers sell across time zones. When a buyer calls at 3am and nobody picks up, the sale walks to whoever answers first.',
      approach: 'We built a voice agent that picks up every call, answers only from the supplier\'s own catalogue, fills in the deal details live as the buyer talks, and leaves a structured lead in the dashboard by morning. The model does the talking, but deterministic code makes every decision.',
      features: [
        { title: 'Never Misses a Call', description: 'It answers 24/7 in the browser, by voice or text, on the same pipeline.' },
        { title: 'Sticks to the Catalogue', description: 'It only answers from supplier-approved knowledge. If it does not know, it says so instead of inventing a price.' },
        { title: 'The Model Talks, the Code Decides', description: 'Lead status, escalations, and next actions come from a deterministic state machine, never from the LLM.' },
        { title: 'Numbers You Can Trust', description: 'A guardrail rejects any number in the summary that did not come from the catalogue, and falls back to a plain template.' },
      ],
      thumbnail: 'https://raw.githubusercontent.com/omorros/SupConnect/main/docs/img/idle.png',
      cardImage: '/images/supconnect/building.jpg',
      screenshots: [
        'https://raw.githubusercontent.com/omorros/SupConnect/main/docs/img/call.png',
        'https://raw.githubusercontent.com/omorros/SupConnect/main/docs/img/summary.png',
      ],
      photos: [
        { src: '/images/supconnect/building.jpg' },
        { src: '/images/supconnect/venue.jpg' },
      ],
    },
  },
  {
    title: 'TrueVoice',
    description: 'A platform that listens during medical consultations and flags when a patient sounds worse than their words say.',
    tags: ['TypeScript', 'Next.js', 'Python', 'Claude API'],
    link: 'https://github.com/omorros/TrueVoice',
    slug: 'truevoice',
    category: 'hackathon',
    event: 'Voice AI Hack · London 2026',
    year: '2026',
    caseStudy: {
      challenge: 'Patients often play down their symptoms when talking to a doctor. The signs are there in their voice, but the doctor has no way to catch them during the conversation.',
      approach: 'I built a platform that transcribes the consultation while reading three signals from the patient\'s voice: distress, mood, and emotion. When the words and the voice do not match, it flags it to the clinician in under a second.',
      features: [
        { title: 'Catches the Mismatch', description: 'It compares what the patient says with how their voice sounds, and flags the gap to the clinician in under a second.' },
        { title: 'Three Voice Signals', description: 'Distress, mood, and emotion are read from the voice in parallel, using Thymia\'s Sentinel models.' },
        { title: 'Works in Any Consultation', description: 'Telehealth with separate devices or in person with one microphone, and the transcript keeps track of who is speaking.' },
        { title: 'Reports With Evidence', description: 'At the end, Claude writes a summary that points to every moment where the words and the voice did not match.' }
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
        { src: '/images/truevoice/team-check.jpg' },
        { src: '/images/truevoice/credits.jpg' },
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
    description: 'A team of five AI agents that watches the web for complaints when a product quietly changes its recipe, so brands find out in weeks instead of months.',
    tags: ['Python', 'FastAPI', 'Next.js', 'ClickHouse'],
    link: 'https://github.com/omorros/Basket',
    slug: 'basket',
    category: 'hackathon',
    event: 'Tokens LDN Multi-Agent Hackathon · London 2026',
    year: '2026',
    caseStudy: {
      challenge: 'When a brand quietly changes a recipe, the backlash lands on the web within days but only shows up in sales data months later. By the time a category manager sees it in a quarterly review, the damage is done.',
      approach: 'I built a pipeline of five agents. Give it a product name and it finds when the recipe changed, pulls complaints from news and the web, classifies them with rules you can trace, counts them week by week, and publishes an alert with sources the moment complaints spike.',
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
        { src: '/images/basket/demo.jpg' },
        { src: '/images/basket/chatting.jpg' },
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
    description: 'AI agents that scan online marketplaces for wildlife trafficking, decoding the coded language sellers hide behind in eight languages.',
    tags: ['Python', 'LangGraph', 'Next.js', 'PostGIS'],
    link: 'https://github.com/omorros/WILDSCAN',
    slug: 'wildscan',
    category: 'hackathon',
    event: 'Unicorn Mafia × Techbible Hack Night · London 2026',
    year: '2026',
    caseStudy: {
      challenge: 'Wildlife traffickers sell openly on regional marketplaces, hiding behind coded words in dozens of languages. Human investigators cannot keep up with the volume.',
      approach: 'I built a pipeline of six agents that scrapes listings, spots coded terms from a 500 word lexicon in eight languages, identifies the species from photos, and scores every listing against records of real seizures.',
      features: [
        { title: 'Six Agents, One Hunt', description: 'A scanner, a triage agent, a linguist, an image analyst, a species classifier, and a risk scorer run the whole pipeline on their own, built with LangGraph.' },
        { title: 'Speaks the Sellers\' Code', description: 'It knows 500 coded trafficking terms across eight languages, and still catches them when sellers misspell them on purpose.' },
        { title: 'Scores You Can Check', description: 'Every listing gets a 0-100 risk score from eight weighted signals, checked against 6,000 records of real seizures.' },
        { title: 'A Live Globe', description: 'Every detection lands on a Mapbox globe in real time, with an intelligence brief one click away.' }
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
    description: 'A dashboard that tracks fishing vessels across seven public data sources and flags the ones most likely to be fishing illegally.',
    tags: ['Python', 'Claude API', 'PostGIS', 'Mapbox'],
    link: 'https://github.com/omorros/DarkFleet',
    slug: 'darkfleet',
    category: 'hackathon',
    event: 'Claude Hackathon · Imperial College London 2026',
    year: '2026',
    caseStudy: {
      challenge: 'Illegal fishing is a 23 billion dollar business, and the fleets hide by spreading their tracks across separate data sources: switched off transponders, changed flags, opaque owners. No analyst can cross check all of it in real time.',
      approach: 'I pulled seven open data sources into one dashboard that scores every vessel on seven risk signals and ranks the global fleet. An analyst can then ask Claude follow up questions about any ship and get a full report.',
      features: [
        { title: 'Seven Risk Signals', description: 'Encounters at sea, gaps in the tracking signal, flag changes, opaque owners, loitering, licence status, and sanctions, all scored together.' },
        { title: 'Ranked Alerts', description: 'Every vessel comes out red, amber, or clear, ranked across the global fleet in real time.' },
        { title: 'Ask Claude About Any Ship', description: 'An analyst can ask follow-up questions about any vessel and get a structured assessment back.' },
        { title: 'One-Click Reports', description: 'Everything it knows about a vessel turns into a PDF brief you can share.' }
      ],
      thumbnail: 'https://raw.githubusercontent.com/omorros/DarkFleet/main/docs/screenshots/globe-overview.png',
      cardImage: '/images/darkfleet/selfie.jpg',
      cardImagePos: 'object-[center_55%]',
      photos: [
        { src: '/images/darkfleet/selfie.jpg' },
        { src: '/images/darkfleet/claude-sign.jpg' },
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
    description: 'A security layer that catches attempts to poison an AI agent\'s memory before the agent starts believing them.',
    tags: ['Python', 'FastAPI', 'Next.js', 'MongoDB'],
    link: 'https://github.com/omorros/GASLIT',
    slug: 'gaslit',
    category: 'hackathon',
    event: 'MongoDB Agentic Evolution · London 2026',
    year: '2026',
    caseStudy: {
      challenge: 'You can attack an AI agent by slowly feeding it false memories. Each message looks harmless on its own, so normal guardrails let it through, and the pattern only shows up across the agent\'s memory over time.',
      approach: 'I built a layer that sits between the agent\'s memory database and the model and checks every memory before the agent uses it. Four agents cross check new entries against the rest, verify nothing has been tampered with, and quarantine anything suspicious.',
      features: [
        { title: 'Checks at the Last Moment', description: 'It inspects each memory right when the agent retrieves it, after the attack has already slipped past guardrails that only look at single messages.' },
        { title: 'Four Agents on Guard', description: 'The agents never call each other directly. They coordinate entirely through the same MongoDB database they are protecting.' },
        { title: 'Slow Poison Shows Up as Drift', description: 'It fingerprints the queries that touch each memory, so an attack spread across weeks still stands out statistically.' },
        { title: 'A Human Decides', description: 'The system never acts on its own. Every flag becomes a quarantine report for a person to review.' },
      ],
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
    description: 'A control room that watches a company\'s payments in real time and sends AI agents to investigate the suspicious ones.',
    tags: ['Python', 'FastAPI', 'Next.js', 'Claude API'],
    link: 'https://github.com/omorros/Atlas',
    slug: 'atlas',
    category: 'hackathon',
    event: 'Cursor × Briefcase · London 2026',
    year: '2026',
    caseStudy: {
      challenge: 'Finance teams see thousands of transactions a day. The genuinely risky ones hide in the noise, and no single rule or model catches them all.',
      approach: 'I built a pipeline where simple rules and a fast model triage every transaction, a stronger model analyses the unclear ones, and the hardest cases spawn a research agent that writes a memo for the human reviewer.',
      features: [
        { title: 'Cheap Checks First', description: 'Simple rules and a fast model handle the flood of transactions, so the expensive model only sees the ones worth a closer look.' },
        { title: 'The Company on a Globe', description: 'Every counterparty is plotted on a live globe with its health status, pulsing as new transactions come in.' },
        { title: 'Agents That Investigate', description: 'The hardest cases spawn a background agent that digs through public records and web sources, then drops a memo for the reviewer.' },
        { title: 'Never Moves the Money', description: 'Atlas only recommends. Every decision ends with a person in finance, not the machine.' },
      ],
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
    description: 'An app that tracks the food in your kitchen from photos and barcodes, and reminds you before it expires.',
    tags: ['TypeScript', 'React Native', 'Python', 'PostgreSQL'],
    link: 'https://github.com/omorros/SnapShelf',
    slug: 'snapshelf',
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
      ]
    }
  },
  {
    title: 'BK-Shoot',
    description: 'A 25 euro sensor rig on the basketball hoop that counts your makes and misses in real time, straight to your phone.',
    tags: ['C++', 'IoT', 'Arduino', 'Android'],
    link: 'https://github.com/omorros/bk-shoot',
    slug: 'bk-shoot',
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
  },
  {
    title: 'CNN Architecture Comparison',
    description: 'Three neural networks compared on 120,000 food photos, showing a small model can match a big one at the same accuracy while being six times smaller.',
    tags: ['Jupyter Notebook', 'Python', 'TensorFlow', 'Deep Learning'],
    link: 'https://github.com/omorros/food-cv-exp1-cnn-comparison',
    slug: 'deep-learning-cnn-comparison',
    category: 'personal',
    year: '2026',
    caseStudy: {
      challenge: 'Bigger models usually win, but they cost more to train and run. I wanted to know how much model you actually need for one specific job, recognising food.',
      approach: 'I trained three architectures on 120,000 food images and compared them. The small one matched the big one at 99.75 percent accuracy while being six times smaller and a third faster to train.',
      features: [
        { title: '120,000 Images, Cleaned', description: 'I merged three Kaggle datasets, removed every duplicate by hashing the files, and split what was left carefully by class.' },
        { title: '99.75 Percent Accuracy', description: 'EfficientNetB0 matched ResNet-50 once both were fine-tuned on the food images.' },
        { title: 'Six Times Smaller', description: 'The winning model is 40 MB against ResNet-50\'s 211 MB, at the same accuracy.' },
        { title: 'Fair to the Rare Classes', description: 'Even classes with 113 times fewer images kept F1 scores above 0.98, thanks to class weighting.' }
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
    description: 'A crawler that reads as much of Wikipedia as it can in 20 seconds, with 100 workers running in parallel.',
    tags: ['Python', 'Asyncio', 'Aiohttp', 'BeautifulSoup'],
    link: 'https://github.com/omorros/wikipedia_scraper',
    slug: 'wikipedia-scraper',
    category: 'personal',
    year: '2025',
    caseStudy: {
      challenge: 'Crawling a big site fast means keeping a hundred connections busy without ever fetching the same page twice, and stopping exactly on a deadline.',
      approach: 'I wrote an async crawler where 100 workers share one queue and one set of seen URLs, and a global deadline cancels everything at exactly 20 seconds.',
      features: [
        { title: '100 Workers at Once', description: 'A hundred connections stay busy at the same time, so the crawler never sits waiting on a single page.' },
        { title: 'Stops on the Dot', description: 'A global deadline cancels every pending task at exactly 20 seconds.' },
        { title: 'Never Fetches Twice', description: 'One shared set of seen URLs means no page downloads twice and no loop runs forever.' },
        { title: 'One Event Loop, No Threads', description: 'Everything is async, with careful link cleanup so odd URLs do not crash a worker.' }
      ]
    }
  },
  {
    title: 'University Library System',
    description: 'A university library system built in Java, with different borrowing rules for each type of user and no database behind it.',
    tags: ['Java', 'OOP', 'JUnit', 'File I/O'],
    link: 'https://github.com/omorros/UniversityLibrarySystem',
    slug: 'university-library-system',
    category: 'personal',
    year: '2025',
    caseStudy: {
      challenge: 'The module asked for a full library system with different rules for each type of user, students, children, and adults, built without a database.',
      approach: 'I designed it as a Java MVC app where books and users share common base classes, borrowing limits are enforced per role, and everything saves to CSV files through a loader I wrote myself.',
      features: [
        { title: 'Classic MVC Design', description: 'Books and users share abstract base classes, and every screen talks to the model through a controller.' },
        { title: 'Different Rules Per Role', description: 'Adults can borrow ten items, children three, and the system enforces it, suspensions included.' },
        { title: 'No Database Needed', description: 'Everything saves to CSV files through a loader I wrote myself.' },
        { title: 'Properly Tested', description: 'JUnit tests cover the core logic, and end-to-end tests walk the full user flows.' }
      ],
      reportUrl: '/reports/university-library-report.pdf',
      screenshots: [
        '/images/university-library/ui.jpg'
      ],
      awards: [
        {
          title: 'Distinction Grade (80%)',
          description: 'Marked at 80 percent, a First-Class grade, for the architecture, the clean code, and the documentation.'
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
