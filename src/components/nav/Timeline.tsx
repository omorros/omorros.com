'use client'

// Left side rail - ported from syedsubhan.in/components/Timeline.tsx.
// xl-only (hidden below 1280px). Vertical row of dots that scale dock-style on
// hover; the active section is detected via a scroll-position closest-to-top
// algorithm (more deterministic than IntersectionObserver, no flicker).

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface TimelineSection {
  id: string
  title: string
}

const SECTIONS: TimelineSection[] = [
  { id: 'about', title: 'About' },
  { id: 'work', title: 'Career Path' },
  { id: 'skills', title: 'Tech Stack' },
  { id: 'projects', title: 'Projects' },
  { id: 'education', title: 'Education' },
  { id: 'contact', title: 'Contact' },
]

const SCROLL_OFFSET = 140 // approx. position of the floating top-nav

export function Timeline() {
  const [activeId, setActiveId] = useState<string | null>(SECTIONS[0].id)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  useEffect(() => {
    let raf = 0

    const update = () => {
      raf = 0

      // At-bottom guard: if the document can't scroll any further, force the
      // last section active. (Short final sections - Contact, Footer - often
      // can't get their header above the SCROLL_OFFSET line before the page
      // runs out, so the closest-to-top algorithm below would otherwise miss.)
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 4
      if (atBottom && SECTIONS.length > 0) {
        const last = SECTIONS[SECTIONS.length - 1].id
        setActiveId((prev) => (prev === last ? prev : last))
        return
      }

      // Pick the section whose top is closest to (just below) the offset line.
      let bestId: string | null = null
      let bestDelta = Number.POSITIVE_INFINITY

      for (const s of SECTIONS) {
        const el = document.getElementById(s.id)
        if (!el) continue
        const rect = el.getBoundingClientRect()
        const top = rect.top
        if (top <= SCROLL_OFFSET) {
          const delta = SCROLL_OFFSET - top
          if (delta < bestDelta) {
            bestDelta = delta
            bestId = s.id
          }
        }
      }

      // Fallback: if nothing has scrolled past the line yet, use the first section.
      if (bestId === null) bestId = SECTIONS[0].id
      setActiveId((prev) => (prev === bestId ? prev : bestId))
    }

    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      if (raf) cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const handleClick = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    const top = el.getBoundingClientRect().top + window.pageYOffset - 120
    window.scrollTo({ top, behavior: 'smooth' })
  }

  // Dock-style proximity scaling: hovered dot is full-size, neighbors shrink by distance.
  const calculateScale = (index: number) => {
    if (hoveredIndex === null) return 0.4
    const distance = Math.abs(index - hoveredIndex)
    return Math.max(1 - distance * 0.2, 0.4)
  }

  return (
    <div className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-center w-24">
      <div className="flex flex-col gap-0.5">
        {SECTIONS.map((s, i) => {
          const isSelected = activeId === s.id
          return (
            <button
              key={s.id}
              type="button"
              aria-label={`Jump to ${s.title}`}
              className="relative inline-flex items-center justify-start py-1"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => handleClick(s.id)}
            >
              <div className="w-8 flex justify-center">
                <motion.div
                  className={`h-1.5 rounded-full origin-center transition-colors duration-300 ${
                    isSelected ? 'bg-foreground' : 'bg-foreground/20'
                  }`}
                  animate={{
                    scale: calculateScale(i),
                    width: isSelected ? 32 : 16,
                  }}
                  initial={{ scale: 0.4, width: 16 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                />
              </div>

              <AnimatePresence>
                {(hoveredIndex === i || isSelected) && (
                  <motion.span
                    key="tooltip"
                    className={`absolute left-10 text-[11px] font-medium whitespace-nowrap bg-background-soft px-2 py-1 rounded-md shadow-lg border border-border-soft z-50 ${
                      isSelected ? 'text-foreground' : 'text-foreground-muted'
                    }`}
                    initial={{ opacity: 0, x: -5, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -5, scale: 0.9 }}
                    transition={{ duration: 0.15 }}
                  >
                    {s.title}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          )
        })}
      </div>
    </div>
  )
}
