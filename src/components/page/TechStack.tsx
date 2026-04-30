'use client'

// Tech Stack section - SectionHeader + two-row velocity-reactive marquee.
// Top row: languages + essential tools. Bottom row: frameworks & libraries.

import { motion } from 'framer-motion'
import { SectionHeader } from './SectionHeader'
import { SkillsMarquee } from '@/components/ui/SkillsMarquee'
import { techStackTopRow, techStackBottomRow } from '@/data/skills'

export function TechStack() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="py-12"
    >
      <SectionHeader
        title="Tech Stack"
        caption="The arsenal for building digital experiences."
      />
      <div className="w-full -mx-6 md:-mx-0 overflow-hidden mt-6">
        <SkillsMarquee topRow={techStackTopRow} bottomRow={techStackBottomRow} />
      </div>
    </motion.section>
  )
}
