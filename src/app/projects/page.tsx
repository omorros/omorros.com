'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Trophy } from 'lucide-react'
import { projects, FEATURED_SLUGS, type Project } from '@/data/projects'
import { ProjectCard } from '@/components/ui/ProjectCard'
import { cn } from '@/lib/utils'

type Filter = 'all' | 'personal' | 'hackathon'

const FILTERS: { value: Filter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'personal', label: 'Personal' },
  { value: 'hackathon', label: 'Hackathons' },
]

const featuredRank = (p: Project): number => {
  const idx = (FEATURED_SLUGS as readonly string[]).indexOf(p.slug ?? '')
  return idx === -1 ? Number.POSITIVE_INFINITY : idx
}

const hasAward = (p: Project): boolean =>
  Boolean(p.caseStudy?.awards && p.caseStudy.awards.length > 0)

const sortFeaturedFirst = (list: Project[]): Project[] =>
  [...list].sort((a, b) => featuredRank(a) - featuredRank(b))

export default function ProjectsPage() {
  const [filter, setFilter] = useState<Filter>('all')
  const [hovered, setHovered] = useState<number | null>(null)

  const counts = useMemo(
    () => ({
      all: { total: projects.length, awards: projects.filter(hasAward).length },
      personal: {
        total: projects.filter((p) => p.category === 'personal').length,
        awards: projects.filter((p) => p.category === 'personal' && hasAward(p)).length,
      },
      hackathon: {
        total: projects.filter((p) => p.category === 'hackathon').length,
        awards: projects.filter((p) => p.category === 'hackathon' && hasAward(p)).length,
      },
    }),
    [],
  )

  const filtered = useMemo(() => {
    const list = filter === 'all' ? projects : projects.filter((p) => p.category === filter)
    return sortFeaturedFirst(list)
  }, [filter])

  return (
    <main className="relative max-w-4xl mx-auto px-6 pt-24 md:pt-32 pb-20 z-10">
      <Link
        href="/#projects"
        className="inline-flex items-center gap-1.5 mb-10 font-mono text-[11px] uppercase tracking-[0.18em] text-foreground-muted hover:text-foreground transition-colors"
      >
        <ArrowLeft size={12} />
        <span>Home</span>
      </Link>

      <motion.header
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="mb-10"
      >
        <h1 className="text-3xl md:text-4xl font-display font-medium text-foreground mb-3 leading-tight">
          All projects
        </h1>
        <p className="text-foreground-muted leading-relaxed text-sm md:text-base max-w-xl">
          A growing archive of personal builds and hackathon work — featured projects appear first.
        </p>
      </motion.header>

      <div className="flex flex-wrap items-center gap-2 mb-10">
        {FILTERS.map((f) => {
          const active = filter === f.value
          const c = counts[f.value]
          return (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={cn(
                'inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-[11px] font-mono uppercase tracking-[0.18em] transition-all active:scale-95',
                active
                  ? 'border-foreground bg-foreground text-background'
                  : 'border-border text-foreground-muted hover:text-foreground hover:border-foreground/40',
              )}
            >
              <span>{f.label}</span>
              <span className={cn('text-[10px]', active ? 'opacity-70' : 'opacity-50')}>
                {c.total}
              </span>
              {c.awards > 0 && (
                <span
                  className={cn(
                    'inline-flex items-center gap-0.5 text-[10px]',
                    active ? 'opacity-90' : 'opacity-70',
                  )}
                >
                  <Trophy size={9} className="text-amber-500" />
                  {c.awards}
                </span>
              )}
            </button>
          )
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filtered.map((p, i) => {
          const media = p.caseStudy?.thumbnail || p.caseStudy?.screenshots?.[0]
          const award = p.caseStudy?.awards?.[0]
          return (
            <ProjectCard
              key={p.slug || p.title}
              index={i}
              title={p.title}
              description={p.description}
              tags={p.tags}
              githubUrl={p.link}
              imageUrl={media}
              videoUrl={p.caseStudy?.videoUrl}
              award={award}
              event={p.event}
              year={p.year}
              detailHref={p.slug ? `/projects/${p.slug}` : undefined}
              isDimmed={hovered !== null && hovered !== i}
              onHover={() => setHovered(i)}
              onLeave={() => setHovered(null)}
            />
          )
        })}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-sm text-foreground-muted py-16">Nothing here yet.</p>
      )}
    </main>
  )
}
