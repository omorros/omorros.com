'use client'

// Tech Stack section - SectionHeader + two-row velocity-reactive marquee of
// skill icons. Skill data is hardcoded here for now; will move to a data file
// when the list grows.

import { motion } from 'framer-motion'
import { SectionHeader } from './SectionHeader'
import { SkillsMarquee } from '@/components/ui/SkillsMarquee'

// Iconify `logos:` namespace - full-brand-color SVGs that render correctly
// in both light and dark themes (no invert filter chain required).
const SKILLS = [
  { name: 'TypeScript', iconUrl: 'https://api.iconify.design/logos:typescript-icon.svg' },
  { name: 'Next.js', iconUrl: 'https://api.iconify.design/logos:nextjs-icon.svg' },
  { name: 'React', iconUrl: 'https://api.iconify.design/logos:react.svg' },
  { name: 'Python', iconUrl: 'https://api.iconify.design/logos:python.svg' },
  { name: 'OpenAI', iconUrl: 'https://api.iconify.design/logos:openai-icon.svg' },
  { name: 'PostgreSQL', iconUrl: 'https://api.iconify.design/logos:postgresql.svg' },
  { name: 'Tailwind CSS', iconUrl: 'https://api.iconify.design/logos:tailwindcss-icon.svg' },
  { name: 'Framer Motion', iconUrl: 'https://api.iconify.design/logos:framer.svg' },
  { name: 'TensorFlow', iconUrl: 'https://api.iconify.design/logos:tensorflow.svg' },
  { name: 'Vercel', iconUrl: 'https://api.iconify.design/logos:vercel-icon.svg' },
  { name: 'Git', iconUrl: 'https://api.iconify.design/logos:git-icon.svg' },
  { name: 'Docker', iconUrl: 'https://api.iconify.design/logos:docker-icon.svg' },
  { name: 'Java', iconUrl: 'https://api.iconify.design/logos:java.svg' },
  { name: 'C++', iconUrl: 'https://api.iconify.design/logos:c-plusplus.svg' },
]

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
        <SkillsMarquee skills={SKILLS} />
      </div>
    </motion.section>
  )
}
