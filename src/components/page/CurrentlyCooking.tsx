'use client'

// Shimmer-gradient banner - verbatim from syedsubhan.in's "Cooking more..."
// (PortfolioHome.tsx line ~397). The `animate-shimmer` keyframes live in globals.css.

import { motion } from 'framer-motion'

export function CurrentlyCooking() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="py-10"
    >
      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-border-soft" />
        <span className="text-sm font-mono font-medium animate-shimmer bg-[linear-gradient(110deg,#939393,45%,#1e1e1e,55%,#939393)] dark:bg-[linear-gradient(110deg,#939393,45%,#e5e5e5,55%,#939393)] bg-[length:200%_100%] bg-clip-text text-transparent">
          Cooking more...
        </span>
        <div className="h-px flex-1 bg-border-soft" />
      </div>
    </motion.section>
  )
}
