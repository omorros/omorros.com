'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { skills } from '@/data/skills'

export function SkillsPage() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, margin: '-50px' })

  return (
    <div ref={ref} className="space-y-8">
      {skills.map((category, categoryIndex) => (
        <div key={category.title} className="space-y-3">
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{
              delay: categoryIndex * 0.1,
              duration: 0.5,
            }}
            className="text-sm font-medium text-foreground-muted"
          >
            {category.title}
          </motion.h3>
          <div className="flex flex-wrap gap-3">
            {category.items.map((skill, index) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{
                  delay: categoryIndex * 0.1 + index * 0.05,
                  duration: 0.4,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="flex-1 min-w-[140px] px-4 py-3 rounded-xl bg-glass-highlight border border-glass-hover text-center text-foreground-muted font-medium hover:bg-accent-glass hover:border-accent-glass-border hover:text-foreground transition-all cursor-default whitespace-nowrap"
              >
                {skill}
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
