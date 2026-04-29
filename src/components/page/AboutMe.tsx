'use client'

import { motion } from 'framer-motion'
import { SectionHeader } from './SectionHeader'

export function AboutMe() {
  return (
    <motion.section
      id="about"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="py-12 scroll-mt-32"
    >
      <SectionHeader title="About Me" caption="The short version." />

      <div className="mt-6 space-y-4 max-w-prose text-[15px] leading-relaxed text-foreground-muted">
        <p>
          I’m Oriol, a software engineering student at{' '}
          <span className="text-foreground">ARU Cambridge</span> focused on AI
          integration. My current obsession is{' '}
          <em className="font-display italic text-accent">building with AI</em>{' '}
          - from RAG pipelines and agent loops to the eval harnesses that keep
          them honest.
        </p>
        <p>
          Before that I was the kid who built basketball-tracking IoT sensors
          out of <span className="text-foreground">€25 of parts</span>. Now I’m
          bringing that same end-to-end-shipping mentality to LLM-powered
          software.
        </p>
        <p>
          I move fast, document obsessively, and care about the gap between{' '}
          <em className="font-display italic">demo</em> and{' '}
          <em className="font-display italic">product</em>.
        </p>
      </div>
    </motion.section>
  )
}
