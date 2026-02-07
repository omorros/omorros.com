'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ExternalLink, Maximize2 } from 'lucide-react'
import Image from 'next/image'
import { projects, Project } from '@/data/projects'
import { ProjectModal } from '../ProjectModal'

export function ProjectsPage() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, margin: '-100px' })
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  return (
    <>
      <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project, index) => {
          const hasCaseStudy = !!project.caseStudy

          return (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{
                delay: index * 0.1,
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group block relative overflow-hidden rounded-xl bg-glass border border-glass-border hover:bg-glass-hover hover:border-glass-hover-border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent cursor-pointer"
              onClick={() => {
                if (hasCaseStudy) {
                  setSelectedProject(project)
                } else {
                  window.open(project.link, '_blank', 'noopener,noreferrer')
                }
              }}
              role={hasCaseStudy ? 'button' : 'link'}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  if (hasCaseStudy) {
                    setSelectedProject(project)
                  } else {
                    window.open(project.link, '_blank', 'noopener,noreferrer')
                  }
                }
              }}
            >
              <span className="sr-only">
                {hasCaseStudy ? 'View Case Study' : '(opens in a new tab)'}
              </span>

              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold text-[rgba(242,242,242,0.9)] group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>
                  {hasCaseStudy ? (
                    <Maximize2
                      size={16}
                      className="text-[rgba(242,242,242,0.4)] group-hover:text-accent transition-colors shrink-0 mt-1"
                    />
                  ) : (
                    <ExternalLink
                      size={16}
                      className="text-[rgba(242,242,242,0.4)] group-hover:text-accent transition-colors shrink-0 mt-1"
                    />
                  )}
                </div>

                <p className="text-sm text-foreground-dim mb-4 line-clamp-2">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 text-xs rounded-full bg-accent-glass text-accent/80 border border-accent-glass-border"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </>
  )
}
