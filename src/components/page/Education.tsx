'use client'

import { motion } from 'framer-motion'
import { SectionHeader } from './SectionHeader'

const ENTRIES = [
  {
    year: '2023–26',
    degree: 'BSc Software Engineering',
    institution: 'Anglia Ruskin University · Cambridge',
    note: 'First-class trajectory · Distinction in OOP modules.',
  },
]

export function Education() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="py-12"
    >
      <SectionHeader title="Education" caption="Academic background." />
      <ul className="mt-6 -mx-3">
        {ENTRIES.map((e, i) => (
          <li key={i} className="flex flex-col gap-1 px-3 py-3">
            <div className="flex items-baseline gap-4">
              <span className="font-mono text-[11px] tabular-nums text-foreground-faint w-12 shrink-0">
                {e.year}
              </span>
              <span className="text-[15px] text-foreground tracking-tight">
                {e.degree}
              </span>
            </div>
            <div className="flex items-baseline gap-4">
              <span className="w-12 shrink-0" />
              <span className="text-[13px] text-foreground-muted">
                {e.institution}
              </span>
            </div>
            <div className="flex items-baseline gap-4">
              <span className="w-12 shrink-0" />
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-foreground-faint">
                {e.note}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </motion.section>
  )
}
