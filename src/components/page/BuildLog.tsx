'use client'

import { motion } from 'framer-motion'
import { projects } from '@/data/projects'
import { SectionHeader } from './SectionHeader'
import { WorkTimeline, type TimelineItem } from '@/components/ui/WorkTimeline'

// Approximate years per project (placeholder until a `year` field is added to projects.ts).
const YEARS: Record<string, string> = {
  snapshelf: '2025',
  'bk-shoot': '2024',
  'deep-learning-cnn-comparison': '2024',
  'wikipedia-scraper': '2023',
  'university-library-system': '2023',
}

const EXCLUDED_SLUGS = ['personal-web-portfolio'] // PRD §11 Q5 - cut

export function BuildLog() {
  const items: TimelineItem[] = projects
    .filter((p) => p.slug && !EXCLUDED_SLUGS.includes(p.slug))
    .map((p) => ({
      id: p.slug!,
      date: YEARS[p.slug!] ?? '-',
      title: p.title,
      subtitle:
        p.description.length > 80
          ? p.description.slice(0, 80) + '...'
          : p.description,
      description: p.description,
      tags: p.tags,
      link: p.link,
    }))
    .sort((a, b) => (b.date || '').localeCompare(a.date || ''))

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="py-12"
    >
      <SectionHeader title="Build Log" caption="Everything I've shipped, dated and tagged." />
      <div className="mt-6">
        <WorkTimeline items={items} />
      </div>
    </motion.section>
  )
}
