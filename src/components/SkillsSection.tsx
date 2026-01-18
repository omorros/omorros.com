'use client'

import { motion } from 'framer-motion'
import { skills } from '@/data/skills'

export function SkillsSection() {
  return (
    <section className="max-w-3xl mx-auto px-4 py-16">
      <motion.h2
        className="text-2xl font-semibold text-white mb-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Skills
      </motion.h2>

      <motion.div
        className="flex flex-wrap justify-center gap-3"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
      >
        {skills.map((skill, index) => (
          <motion.span
            key={skill}
            className="px-4 py-2 rounded-full bg-white/[0.05] text-white/70 border border-white/[0.08] text-sm hover:bg-white/[0.08] hover:text-white transition-all cursor-default"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.03 }}
            whileHover={{ scale: 1.05 }}
          >
            {skill}
          </motion.span>
        ))}
      </motion.div>
    </section>
  )
}
