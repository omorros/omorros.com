'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface Experience {
  title: string
  organization: string
  period: string
  current?: boolean
}

const experiences: Experience[] = [
  {
    title: 'BSc Software Engineering',
    organization: 'Anglia Ruskin University',
    period: 'Sep 2023 - Jun 2026',
    current: true,
  },
]

export function ExperiencePage() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <div ref={ref} className="space-y-4">
      {experiences.map((exp, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{
            delay: index * 0.1,
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="p-5 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] hover:bg-[rgba(255,255,255,0.05)] transition-colors"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-[rgba(242,242,242,0.9)]">
                {exp.title}
              </h3>
              <p className="text-[rgba(242,242,242,0.7)] mt-1">
                {exp.organization}
              </p>
            </div>
            <div className="text-right shrink-0">
              <span className="text-sm text-[rgba(242,242,242,0.6)]">
                {exp.period}
              </span>
              {exp.current && (
                <span className="block mt-1 text-xs text-accent font-medium">
                  Current
                </span>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
