'use client'

import { motion } from 'framer-motion'
import { SectionHeader } from './SectionHeader'
import { hackathons } from '@/data/hackathons'

export function Hackathons() {
  return (
    <motion.section
      id="hackathons"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="py-12 scroll-mt-32"
    >
      <SectionHeader title="Hackathons" caption="36-hour builds and what they taught me." />
      <ul className="mt-6 -mx-3">
        {hackathons.map((h, i) => (
          <li
            key={i}
            className="flex flex-col gap-1 px-3 py-3 rounded-md hover:bg-foreground/[0.03] transition-colors"
          >
            <div className="flex items-baseline gap-4">
              <span className="font-mono text-[11px] tabular-nums text-foreground-faint w-10 shrink-0">
                {h.year}
              </span>
              <span className="text-[15px] text-foreground tracking-tight">
                {h.event}{' '}
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-foreground-faint ml-2">
                  {h.location}
                </span>
              </span>
            </div>
            <div className="flex items-baseline gap-4">
              <span className="w-10 shrink-0" />
              <span className="text-[13px] text-foreground-muted leading-snug max-w-prose">
                {h.built}
              </span>
            </div>
            {h.placement && (
              <div className="flex items-baseline gap-4">
                <span className="w-10 shrink-0" />
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
                  - {h.placement}
                </span>
              </div>
            )}
          </li>
        ))}
      </ul>
    </motion.section>
  )
}
