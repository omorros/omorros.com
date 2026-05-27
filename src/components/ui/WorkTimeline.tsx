'use client'

import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { Calendar, Briefcase, ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export type PRCardItem = {
  number: string // e.g. "#3371"
  badge: { label: string; tone: 'red' | 'blue' | 'amber' }
  summary: string
  url: string
}

export type TimelineItem = {
  id: string
  date: string
  title: string
  subtitle?: string
  logo?: string | null
  description?: string
  bullets?: string[]
  prCards?: PRCardItem[]
  prFooter?: { label: string; url: string }
  tags?: string[]
  link?: string
}

const TONE_CLASSES: Record<PRCardItem['badge']['tone'], string> = {
  red: 'bg-red-500/10 text-red-700 dark:text-red-300 border-red-500/20',
  blue: 'bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/20',
  amber: 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/20',
}

interface WorkTimelineProps {
  items: TimelineItem[]
  className?: string
}

function getInitials(title: string): string {
  const words = title.trim().split(/\s+/).filter(Boolean)
  if (words.length === 0) return '·'
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase()
  return (words[0][0] + words[1][0]).toUpperCase()
}

interface RowProps {
  item: TimelineItem
  index: number
}

function TimelineRow({ item, index }: RowProps) {
  const initials = getInitials(item.title)

  const inner = (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative flex gap-4 md:gap-6 pb-8 last:pb-0"
    >
      {/* Dot marker on the rail */}
      <div className="shrink-0 w-12 flex justify-center pt-3 relative z-10">
        <div className="w-2.5 h-2.5 rounded-full bg-foreground/10 border-2 border-background ring-1 ring-foreground/10 group-hover:bg-accent group-hover:ring-accent/30 transition-all duration-500" />
      </div>

      {/* Logo + title + date row */}
      <div className="flex-1 pt-1 min-w-0">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg border border-border bg-background-soft flex items-center justify-center shadow-sm overflow-hidden group-hover:scale-105 transition-transform shrink-0">
            {item.logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={item.logo}
                alt={`${item.title} logo`}
                className="w-full h-full object-contain p-1.5 opacity-90 group-hover:opacity-100"
              />
            ) : (
              <span className="font-mono text-xs uppercase tracking-wider text-foreground-faint">
                {initials}
              </span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-1">
              <h3 className="text-base md:text-lg font-bold text-foreground group-hover:text-accent transition-colors truncate">
                {item.title}
              </h3>
              <div className="flex items-center gap-1.5 text-[10px] md:text-xs font-medium text-foreground-faint bg-background-soft px-2 py-0.5 rounded-full w-fit shrink-0">
                <Calendar size={10} /> {item.date}
              </div>
            </div>
            {item.subtitle && (
              <div className="text-xs md:text-sm font-medium text-foreground-muted flex items-center gap-2 mt-0.5">
                <Briefcase size={12} className="shrink-0" />
                <span className="truncate">{item.subtitle}</span>
              </div>
            )}
          </div>
        </div>

        {/* Grid-rows accordion: collapsed by default, expands on group-hover */}
        <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1.0)]">
          <div className="overflow-hidden">
            <div className="pt-3 ml-12 md:ml-15 space-y-2 text-sm text-foreground-muted">
              {item.description && <p>{item.description}</p>}
              {item.bullets && item.bullets.length > 0 && (
                <ul className="space-y-1.5">
                  {item.bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="shrink-0 mt-1.5 w-1 h-1 rounded-full bg-accent" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}
              {item.prCards && item.prCards.length > 0 && (
                <ul className="space-y-2 pt-1">
                  {item.prCards.map((pr) => (
                    <li key={pr.number}>
                      <a
                        href={pr.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="group/pr flex items-start gap-2.5 rounded-md border border-border-soft p-2.5 hover:border-border hover:bg-foreground/[0.02] transition-colors"
                      >
                        <span
                          className={cn(
                            'shrink-0 px-1.5 py-0.5 rounded border font-mono text-[9.5px] uppercase tracking-[0.12em] font-semibold leading-tight',
                            TONE_CLASSES[pr.badge.tone],
                          )}
                        >
                          {pr.badge.label}
                        </span>
                        <span className="font-mono text-[11px] text-foreground shrink-0 leading-tight pt-[2px]">
                          {pr.number}
                        </span>
                        <span className="flex-1 text-[12.5px] text-foreground-muted leading-snug">
                          {pr.summary}
                        </span>
                        <ArrowUpRight
                          size={12}
                          className="shrink-0 mt-[2px] text-foreground-faint group-hover/pr:text-foreground transition-colors"
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              )}
              {item.prFooter && (
                <a
                  href={item.prFooter.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1 font-mono text-[10.5px] uppercase tracking-[0.18em] text-foreground-muted hover:text-foreground transition-colors pt-1"
                >
                  {item.prFooter.label}
                  <ArrowUpRight size={11} />
                </a>
              )}
              {item.tags && item.tags.length > 0 && (
                <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-foreground-faint pt-2">
                  {item.tags.slice(0, 5).join(' · ')}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )

  if (item.link) {
    return (
      <a
        href={item.link}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        {inner}
      </a>
    )
  }

  return <div>{inner}</div>
}

export function WorkTimeline({ items, className }: WorkTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <div ref={containerRef} className={cn('relative', className)}>
      {/* Track - full grey */}
      <div className="absolute left-[23px] top-4 bottom-0 w-[2px] bg-foreground/5 z-0" />
      {/* Track - fill that animates with scroll progress */}
      <div className="absolute left-[23px] top-4 bottom-0 w-[2px] z-0 overflow-hidden">
        <motion.div
          className="w-full bg-accent origin-top"
          style={{ scaleY, height: '100%' }}
        />
      </div>

      <div className="relative">
        {items.map((item, index) => (
          <TimelineRow key={item.id} item={item} index={index} />
        ))}
      </div>
    </div>
  )
}
