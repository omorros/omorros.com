'use client'

import { SectionHeader } from './SectionHeader'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'
import { WorkTimeline, type TimelineItem } from '@/components/ui/WorkTimeline'

const EDUCATION: TimelineItem[] = [
  {
    id: 'aru-bsc',
    date: '2023 - May 2026',
    title: 'Anglia Ruskin University',
    subtitle: 'BSc (Hons) Software Engineering · Cambridge',
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
  return (
    <RevealOnScroll as="section" className="pt-12 pb-32">
      <SectionHeader title="Education" />
      <div className="mt-6">
        <WorkTimeline items={EDUCATION} />
      </div>
    </RevealOnScroll>
  )
}
