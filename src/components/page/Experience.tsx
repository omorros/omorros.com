'use client'

import { motion } from 'framer-motion'
import { SectionHeader } from './SectionHeader'
import { WorkTimeline, type TimelineItem } from '@/components/ui/WorkTimeline'

type ExperienceEntry = {
  company: string
  role: string
  date: string
  location: string
  logo: string | null
  description: string
  bullets: string[]
  link?: string
}

const EXPERIENCE: ExperienceEntry[] = [
  {
    company: 'University of Cambridge',
    role: 'Digital Technician',
    date: 'Mar 2026 - present',
    location: 'Cambridge, UK · On-site',
    logo: '/cambridge-logo.jpg',
    description:
      'Rehired based on previous 2025 performance. Continued delivering multi-venue IT infrastructure support, ensuring 100% system availability during peak operational periods.',
    bullets: [
      'Multi-venue IT infrastructure support across university sites.',
      '100% system availability sustained through peak operational periods.',
      'IT Hardware Support · Computer Hardware Troubleshooting.',
    ],
  },
  {
    company: 'Festival Sant Fruitós',
    role: 'Web Developer',
    date: 'Feb 2026 - Apr 2026',
    location: 'Catalonia, Spain · Remote',
    logo: '/festival-sf-logo.png',
    description:
      'Redesigned and engineered the website for the XXXII International Classical Music Festival end-to-end, replacing a legacy WordPress template with a modern static-export Next.js + TypeScript app. Shipped with a full CI pipeline that gates merges on cross-browser end-to-end tests.',
    bullets: [
      'Next.js 16 + React 19 + TypeScript (strict) + Tailwind 4 CSS-first.',
      'JSON-driven content model - future editions update without code changes.',
      'GitHub Actions CI: lint, typecheck, build, Playwright e2e on Chromium + WebKit.',
      'Static export, JSON-LD, PWA, accessibility-first with reduced-motion support.',
    ],
    link: 'https://www.festivalsantfruitos.com/',
  },
  {
    company: 'University of Cambridge',
    role: 'Digital Technician',
    date: 'Apr 2025 - Jun 2025',
    location: 'Cambridge, UK · On-site',
    logo: '/cambridge-logo.jpg',
    description:
      'Diagnosed and resolved hardware, software, and network issues across 250+ PCs in high-pressure, zero-downtime environments. Performed systematic device imaging, configuration, and deployment for fleet of devices.',
    bullets: [
      'Diagnosed hardware, software, and network issues across 250+ PCs.',
      'Zero-downtime environments under high operational pressure.',
      'Systematic device imaging, configuration, and fleet deployment.',
    ],
  },
]

export function Experience() {
  const items: TimelineItem[] = EXPERIENCE.map((e, i) => ({
    id: `${e.company}-${i}`,
    date: e.date,
    title: e.company,
    subtitle: e.role,
    logo: e.logo,
    description: e.description,
    bullets: e.bullets,
    link: e.link,
  }))

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="py-12"
    >
      <SectionHeader title="Career Path" caption="Where I've worked." />
      <div className="mt-6">
        <WorkTimeline items={items} />
      </div>
    </motion.section>
  )
}
