'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface Education {
  title: string
  organization: string
  location: string
  period: string
  description: string
  current?: boolean
}

const education: Education[] = [
  {
    title: 'BSc Software Engineering',
    organization: 'Anglia Ruskin University',
    location: 'Cambridge, UK',
    period: 'Sep 2023 - Jun 2026',
    description: 'Currently in my final year, focusing on software development, AI/ML, and full-stack technologies.',
    current: true,
  },
  {
    title: 'Batxillerat Tecnològic',
    organization: 'Joviat',
    location: 'Manresa, Barcelona',
    period: 'Sep 2021 - Jun 2023',
    description: 'Technology-focused baccalaureate with emphasis on engineering, computer science, physics, and mathematics.',
    current: false,
  },
]

export function ExperiencePage() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, margin: '-100px' })

  return (
    <div ref={ref} className="relative">
      {/* Timeline line */}
      <div className="absolute left-[7px] top-2 bottom-2 w-[2px] bg-[rgba(255,255,255,0.1)]" />

      <div className="space-y-8">
        {education.map((edu, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{
              delay: index * 0.15,
              duration: 0.4,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="relative pl-8"
          >
            {/* Timeline dot */}
            <div
              className={`absolute left-0 top-[6px] w-4 h-4 rounded-full border-2 ${
                edu.current
                  ? 'bg-accent/20 border-accent'
                  : 'bg-[rgba(255,255,255,0.1)] border-[rgba(255,255,255,0.3)]'
              }`}
            >
              {edu.current && (
                <>
                  <div className="absolute inset-[3px] rounded-full bg-accent" />
                  <div className="absolute inset-0 rounded-full bg-accent animate-ping opacity-75" />
                </>
              )}
            </div>

            {/* Content */}
            <div>
              <h3 className="text-lg font-semibold text-[rgba(242,242,242,0.95)]">
                {edu.title}
              </h3>
              <p className="text-[rgba(242,242,242,0.6)] mt-1">
                <span className="text-accent/90">{edu.organization}</span>
                <span className="mx-2">·</span>
                <span>{edu.location}</span>
                <span className="mx-2">·</span>
                <span>{edu.period}</span>
              </p>
              <p className="text-[rgba(242,242,242,0.7)] mt-3 leading-relaxed">
                {edu.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
