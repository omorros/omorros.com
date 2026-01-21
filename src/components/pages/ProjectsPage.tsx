'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import Image from 'next/image'
import { projects } from '@/data/projects'

export function ProjectsPage() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, margin: '-100px' })

  return (
    <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {projects.map((project, index) => (
        <motion.a
          key={project.title}
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{
            delay: index * 0.1,
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="group block relative overflow-hidden rounded-xl bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.2)] transition-all"
        >


          <div className="p-5">
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-lg font-semibold text-[rgba(242,242,242,0.9)] group-hover:text-accent transition-colors">
                {project.title}
              </h3>
              <ExternalLink
                size={16}
                className="text-[rgba(242,242,242,0.4)] group-hover:text-accent transition-colors shrink-0 mt-1"
              />
            </div>

            <p className="text-sm text-[rgba(242,242,242,0.6)] mb-4 line-clamp-2">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 text-xs rounded-full bg-[rgba(144,202,249,0.1)] text-accent/80 border border-[rgba(144,202,249,0.2)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.a>
      ))}
    </div>
  )
}
