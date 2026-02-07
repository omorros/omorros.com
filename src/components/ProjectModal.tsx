'use client'

import { motion } from 'framer-motion'
import { X, ExternalLink } from 'lucide-react'
import { Project } from '@/data/projects'
import { useEffect } from 'react'

interface ProjectModalProps {
  project: Project
  onClose: () => void
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  if (!project.caseStudy) return null

  const { caseStudy } = project

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl z-10 custom-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="sticky top-4 right-4 float-right ml-4 mb-4 p-2 text-white/50 hover:text-white bg-black/20 hover:bg-black/40 rounded-full transition-colors z-20 backdrop-blur-md"
        >
          <X size={24} />
        </button>

        <div className="p-8 md:p-12 clear-both">
          <header className="mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
              {project.title}
            </h2>
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 text-sm rounded-full bg-accent-glass text-accent border border-accent-glass-border">
                  {tag}
                </span>
              ))}
            </div>
            <p className="text-lg text-foreground-dim leading-relaxed">
              {project.description}
            </p>
          </header>

          <div className="space-y-10">
            <section className="bg-white/5 rounded-2xl p-6 md:p-8 border border-white/10">
              <h3 className="text-xl font-semibold mb-4 text-accent">The Problem</h3>
              <p className="text-gray-300 leading-relaxed">
                {caseStudy.problem}
              </p>
            </section>

            <section className="bg-white/5 rounded-2xl p-6 md:p-8 border border-white/10">
              <h3 className="text-xl font-semibold mb-4 text-accent">The Solution</h3>
              <p className="text-gray-300 leading-relaxed">
                {caseStudy.solution}
              </p>
            </section>

            {caseStudy.features && (
              <section>
                <h3 className="text-xl font-semibold mb-6 text-white">Key Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {caseStudy.features.map((feature, i) => (
                    <div key={i} className="bg-white/5 p-4 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                      <p className="text-gray-300 text-sm">{feature}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <div className="pt-8 border-t border-white/10">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 rounded-lg bg-accent text-white font-medium hover:bg-accent/90 transition-colors"
              >
                View Code on GitHub <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
