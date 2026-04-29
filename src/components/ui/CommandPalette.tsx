'use client'

import { useEffect, useState, useMemo } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Search } from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { id: 'about', label: 'Hero / About', href: '#about' },
  { id: 'work', label: 'Career Path', href: '#work' },
  { id: 'skills', label: 'Tech Stack', href: '#skills' },
  { id: 'articles', label: 'Articles', href: '#articles' },
  { id: 'projects', label: 'Selected Projects', href: '#projects' },
  { id: 'contact', label: 'Contact', href: '#contact' },
]

const EXTERNAL = [
  { id: 'github', label: 'GitHub →', href: 'https://github.com/omorros' },
  { id: 'linkedin', label: 'LinkedIn →', href: 'https://linkedin.com/in/oriolmorros' },
  { id: 'email', label: 'Email Oriol →', href: 'mailto:oriolmorros25@gmail.com' },
]

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [activeIdx, setActiveIdx] = useState(0)

  // ⌘K / Ctrl+K toggle, Esc close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsOpen((p) => !p)
      } else if (e.key === 'Escape') {
        setIsOpen(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const items = useMemo(() => [...NAV_ITEMS, ...EXTERNAL], [])
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return q ? items.filter((i) => i.label.toLowerCase().includes(q)) : items
  }, [query, items])

  // Reset active index on filter change
  useEffect(() => {
    setActiveIdx(0)
  }, [query])

  const choose = (idx: number) => {
    const it = filtered[idx]
    if (!it) return
    if (it.href.startsWith('#')) {
      const el = document.querySelector(it.href)
      el?.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.open(it.href, '_blank', 'noopener,noreferrer')
    }
    setIsOpen(false)
  }

  const onInputKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIdx((p) => Math.min(p + 1, filtered.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIdx((p) => Math.max(p - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      choose(activeIdx)
    }
  }

  return (
    <>
      {/* No floating button - palette opens via ⌘K / Ctrl+K only. */}

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-[60] bg-background/60 backdrop-blur-sm flex items-start justify-center pt-[20vh]"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10, filter: 'blur(8px)' }}
              animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.95, y: -10, filter: 'blur(8px)' }}
              transition={{ duration: 0.28, ease: [0.18, 0.89, 0.32, 1.12] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-[90vw] max-w-[560px] rounded-2xl bg-background border border-border shadow-2xl overflow-hidden"
            >
              {/* Pulsing blue ambient blob inside */}
              <motion.div
                animate={{ opacity: [0.3, 0.6, 0.3], scale: [0.92, 1.08, 0.98] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-accent/10 blur-[100px] pointer-events-none"
              />

              {/* Search input */}
              <div className="relative flex items-center gap-3 px-4 py-3 border-b border-border">
                <Search className="w-4 h-4 text-foreground-faint shrink-0" />
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={onInputKey}
                  placeholder="Jump to a section…"
                  className="flex-1 bg-transparent border-0 outline-none text-foreground placeholder:text-foreground-faint"
                />
                <kbd className="font-mono text-[10px] text-foreground-faint border border-border-soft rounded px-1.5 py-0.5">
                  ESC
                </kbd>
              </div>

              {/* Results */}
              <ul className="max-h-[50vh] overflow-y-auto py-2">
                {filtered.length === 0 ? (
                  <li className="px-4 py-3 text-sm text-foreground-faint">No results.</li>
                ) : (
                  filtered.map((item, idx) => (
                    <li key={item.id}>
                      <button
                        onMouseEnter={() => setActiveIdx(idx)}
                        onClick={() => choose(idx)}
                        className={cn(
                          'w-full text-left px-4 py-2 text-sm flex items-center justify-between transition-colors',
                          idx === activeIdx
                            ? 'bg-accent/10 text-foreground'
                            : 'text-foreground-muted hover:bg-foreground/5'
                        )}
                      >
                        <span>{item.label}</span>
                        {idx === activeIdx && (
                          <span className="font-mono text-[10px] text-foreground-faint">↵</span>
                        )}
                      </button>
                    </li>
                  ))
                )}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
