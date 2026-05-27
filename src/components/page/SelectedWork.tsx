'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { projects, FEATURED_SLUGS } from '@/data/projects'
import { ProjectCard } from '@/components/ui/ProjectCard'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'

export function SelectedWork() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)

  const featured = FEATURED_SLUGS.map((slug) =>
    projects.find((p) => p.slug === slug),
  ).filter(Boolean) as typeof projects

  return (
    <RevealOnScroll as="section" className="mb-16">
      <h2 className="text-2xl font-display text-foreground mb-8 flex items-center gap-3">
        Selected Projects
        <div className="h-px flex-1 bg-border-soft" />
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {featured.map((p, i) => {
          const media = p.caseStudy?.thumbnail || p.caseStudy?.screenshots?.[0]
          const award = p.caseStudy?.awards?.[0]
          return (
            <ProjectCard
              key={p.slug}
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
              isDimmed={hoveredProject !== null && hoveredProject !== i}
              onHover={() => setHoveredProject(i)}
              onLeave={() => setHoveredProject(null)}
            />
          )
        })}
      </div>

      {/* Cooking more - shimmer text */}
      <div className="mt-12 flex justify-center">
        <p className="text-sm font-mono font-medium animate-shimmer bg-[linear-gradient(110deg,#939393,45%,#1e1e1e,55%,#939393)] dark:bg-[linear-gradient(110deg,#939393,45%,#e5e5e5,55%,#939393)] bg-[length:200%_100%] bg-clip-text text-transparent">
          Cooking more...
        </p>
      </div>

      <div className="mt-4 flex justify-center">
        <Link
          href="/projects"
          className="group flex items-center gap-2 px-6 py-2 rounded-full border border-border text-sm text-foreground-muted hover:bg-foreground/5 transition-colors active:scale-95"
        >
          View all projects
          <ArrowUpRight
            size={14}
            className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
          />
        </Link>
      </div>
    </RevealOnScroll>
  )
}
