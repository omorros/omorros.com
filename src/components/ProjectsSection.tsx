'use client'

import { motion } from 'framer-motion'
import { projects } from '@/data/projects'
import { ProjectCard } from './ProjectCard'

export function ProjectsSection() {
  return (
    <section className="max-w-4xl mx-auto px-4 py-16">
      <motion.h2
        className="text-2xl font-semibold text-white mb-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Projects
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} />
        ))}
      </div>
    </section>
  )
}
