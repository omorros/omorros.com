'use client'

import { motion } from 'framer-motion'
import { SectionHeader } from './SectionHeader'
import { WorkTimeline, type TimelineItem } from '@/components/ui/WorkTimeline'

type EducationEntry = {
  institution: string
  degree: string
  date: string
  location: string
  logo: string | null
  description: string
  bullets: string[]
  tags?: string[]
  link?: string
}

const EDUCATION: EducationEntry[] = [
  {
    institution: 'Anglia Ruskin University',
    degree: 'BSc (Hons) Software Engineering · Cambridge',
    date: '2023 - May 2026',
    location: 'Cambridge, UK · On-site',
    logo: '/aru-logo.jpg',
    description: 'Final-year BSc, expected May 2026.',
    bullets: [
      'Predicted First-Class Honours (1st).',
      'Basketball scholarship athlete.',
      'Dissertation "Comparative Evaluation of CV Pipelines for Food Recognition": benchmarked fine-tuned YOLOv8s, a YOLO + EfficientNetB0 hybrid, and GPT-5.2 across a 14-class produce task, 4 image conditions, and 1,440 inferences. Winning pipeline integrated into a full-stack app.',
    ],
    tags: [
      'Machine Learning',
      'Advanced OOP',
      'Algorithms & Data Structures',
      'Cloud Computing',
      'Database Design',
      'Digital Security',
      'HCI',
    ],
  },
]

export function Education() {
  const items: TimelineItem[] = EDUCATION.map((e, i) => ({
    id: `${e.institution}-${i}`,
    date: e.date,
    title: e.institution,
    subtitle: e.degree,
    logo: e.logo,
    description: e.description,
    bullets: e.bullets,
    tags: e.tags,
    link: e.link,
  }))

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="pt-12 pb-32"
    >
      <SectionHeader title="Education" caption="Academic background." />
      <div className="mt-6">
        <WorkTimeline items={items} />
      </div>
    </motion.section>
  )
}
