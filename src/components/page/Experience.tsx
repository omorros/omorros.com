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
    company: 'Self-directed',
    role: 'AI Engineering Projects',
    date: '2024 — present',
    location: 'Cambridge, UK',
    logo: null,
    description:
      'Building AI-integrated products end-to-end — retrieval pipelines, agentic systems, evals.',
    bullets: [
      'Shipped SnapShelf — React Native + GPT-4o Vision pantry tracker.',
      'Benchmarked CNN architectures on 120K+ food images, surfaced 5.9× model-size reduction.',
      'Currently building this portfolio as a working RAG-powered AI product.',
    ],
    link: 'https://github.com/omorros',
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
