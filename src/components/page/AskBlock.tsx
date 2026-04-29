'use client'

// "Lazy to scroll? Ask me anything." - the chat affordance.
// Magic UI Border Beam telegraphs interactivity. Chat wires up in Phase 2.

import { motion } from 'framer-motion'
import { useState } from 'react'
import { BorderBeam } from '@/components/ui/BorderBeam'

const SUGGESTED = [
  'What AI projects has Oriol shipped?',
  'Show me his strongest work.',
  'What stack does he use?',
  'Why hire him?',
]

export function AskBlock() {
  const [query, setQuery] = useState('')

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="my-10"
    >
      <div className="relative overflow-hidden rounded-xl border border-border bg-background-soft/60 backdrop-blur-sm p-5 md:p-6">
        <BorderBeam size={180} duration={14} borderWidth={1.25} colorFrom="#3b82f6" colorTo="#bfdbfe" />

        <div className="flex items-start gap-3.5">
          <span aria-hidden className="font-display text-2xl leading-none text-accent mt-0.5">
            ❝
          </span>
          <div className="flex-1">
            <div className="text-[15px] text-foreground">
              Lazy to scroll?{' '}
              <em className="font-display italic text-accent">Ask me anything.</em>
            </div>
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-foreground-faint mt-1">
              Trained on this archive · cites its sources
            </div>

            {/* Input */}
            <div className="relative mt-4 flex items-center gap-2.5 rounded-lg border border-border bg-background px-3.5 py-2.5">
              <span className="font-mono text-xs text-foreground-faint">›</span>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type your question…"
                className="flex-1 bg-transparent border-0 outline-none text-[14px] placeholder:text-foreground-faint"
              />
              <kbd className="font-mono text-[10px] uppercase tracking-wider text-foreground-faint border border-border-soft rounded px-1.5 py-0.5 leading-none">
                ↵
              </kbd>
            </div>

            {/* Suggested chips */}
            <div className="mt-3.5 flex flex-wrap gap-1.5">
              {SUGGESTED.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setQuery(s)}
                  className="group font-mono text-[10px] uppercase tracking-[0.14em] text-foreground-muted hover:text-foreground border border-border-soft hover:border-border rounded-full px-2.5 py-1 transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
