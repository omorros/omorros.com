'use client'

import { motion } from 'framer-motion'
import { Code2, BookOpen, MapPin } from 'lucide-react'
import { SectionHeader } from './SectionHeader'

export function NowStatus() {
  return (
    <motion.section
      id="now"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="py-12 scroll-mt-32"
    >
      <SectionHeader title="What I'm Up To" caption="Live status." />

      <div className="mt-6 bg-background-soft border border-border rounded-2xl p-5 md:p-6 space-y-3.5">
        <div className="flex items-center gap-3 text-sm text-foreground-muted">
          <span className="relative flex items-center justify-center shrink-0 w-4 h-4">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse relative z-10" />
            <span className="absolute inset-0 m-1 rounded-full bg-emerald-500 animate-ping opacity-30" />
          </span>
          <span>
            Currently building this site as a working AI product (RAG + agents)
          </span>
        </div>

        <div className="flex items-center gap-3 text-sm text-foreground-muted">
          <Code2 className="w-4 h-4 text-foreground-faint shrink-0" />
          <span>Shipping SnapShelf v2 - vision-LLM pantry tracker</span>
        </div>

        <div className="flex items-center gap-3 text-sm text-foreground-muted">
          <BookOpen className="w-4 h-4 text-foreground-faint shrink-0" />
          <span>Studying for finals at ARU Cambridge</span>
        </div>

        <div className="flex items-center gap-3 text-sm text-foreground-muted">
          <MapPin className="w-4 h-4 text-foreground-faint shrink-0" />
          <span>
            Based in Cambridge, UK <span className="text-foreground-faint">·</span> Open to remote
          </span>
        </div>
      </div>
    </motion.section>
  )
}
