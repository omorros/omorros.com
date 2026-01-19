'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { skills } from '@/data/skills'

export function SkillsPage() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, margin: '-100px' })

  return (
    <div ref={ref} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      {skills.map((skill, index) => (
        <motion.div
          key={skill}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{
            delay: index * 0.03,
            duration: 0.4,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="px-4 py-3 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] text-center text-[rgba(242,242,242,0.8)] font-medium hover:bg-[rgba(144,202,249,0.08)] hover:border-[rgba(144,202,249,0.2)] hover:text-[rgba(242,242,242,0.95)] transition-all cursor-default"
        >
          {skill}
        </motion.div>
      ))}
    </div>
  )
}
