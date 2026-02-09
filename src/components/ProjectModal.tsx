'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, ExternalLink, Trophy, Maximize2, FileText, Play } from 'lucide-react'
import Image from 'next/image'
import { Project } from '@/data/projects'
import { useEffect, useState, useRef } from 'react'
import { createPortal } from 'react-dom'

interface ProjectModalProps {
  project: Project
  onClose: () => void
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [zoomedImage, setZoomedImage] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)

  useEffect(() => {
    setMounted(true)
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  if (!project.caseStudy || !mounted) return null

  const { caseStudy } = project

  return createPortal(
    <>
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8">
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
            {/* 1. Header */}
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
              {/* 2. Awards (social proof first) */}
              {caseStudy.awards && caseStudy.awards.length > 0 && (
                <section className="bg-yellow-500/10 rounded-2xl p-6 md:p-8 border border-yellow-500/20">
                  <div className="flex items-center gap-3 mb-4">
                    <Trophy className="text-yellow-500" size={24} />
                    <h3 className="text-xl font-semibold text-yellow-500">Awards & Recognition</h3>
                  </div>
                  <div className="space-y-3">
                    {caseStudy.awards.map((award, i) => (
                      <div key={i}>
                        <h4 className="font-medium text-white">{award.title}</h4>
                        <p className="text-sm text-white/70">{award.description}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* 3. Video */}
              {caseStudy.videoUrl && (
                <div 
                  className="relative rounded-2xl overflow-hidden border border-white/10 bg-black aspect-video group cursor-pointer"
                  onClick={() => {
                    if (!hasStarted && videoRef.current) {
                      videoRef.current.play()
                    }
                  }}
                >
                  <video
                    ref={videoRef}
                    src={caseStudy.videoUrl}
                    controls={hasStarted}
                    className="w-full h-full object-contain"
                    poster={caseStudy.thumbnail || caseStudy.screenshots?.[0]}
                    onPlay={() => {
                      setIsPlaying(true)
                      setHasStarted(true)
                    }}
                    onPause={() => setIsPlaying(false)}
                  />
                  
                  {/* Play Button Overlay */}
                  {(!isPlaying || !hasStarted) && (
                    <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${hasStarted ? 'pointer-events-none bg-transparent' : 'bg-black/20 hover:bg-black/30'}`}>
                      <div className={`bg-white/10 backdrop-blur-sm p-5 rounded-full border border-white/20 shadow-2xl transition-transform duration-300 ${!hasStarted && 'group-hover:scale-110'}`}>
                        <Play className="w-8 h-8 text-white fill-white opacity-90 ml-1" />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* 4. Challenge + Approach (single card) */}
              <section className="bg-white/5 rounded-2xl p-6 md:p-8 border border-white/10">
                <div className="mb-5">
                  <h4 className="text-xs font-semibold uppercase tracking-widest text-accent mb-2">Challenge</h4>
                  <p className="text-gray-300 leading-relaxed">
                    {caseStudy.challenge}
                  </p>
                </div>
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-widest text-accent mb-2">Approach</h4>
                  <p className="text-gray-300 leading-relaxed">
                    {caseStudy.approach}
                  </p>
                </div>
              </section>

              {/* 5. Key Features */}
              {caseStudy.features && (
                <section>
                  <h3 className="text-xl font-semibold mb-6 text-white">Key Features</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {caseStudy.features.map((feature, i) => (
                      <div key={i} className="bg-white/5 p-4 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                        <h4 className="font-semibold text-accent text-sm mb-1">{feature.title}</h4>
                        <p className="text-gray-400 text-sm">{feature.description}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* 6. Tables */}
              {caseStudy.tables && caseStudy.tables.map((table, i) => (
                <section key={i} className="bg-white/5 rounded-2xl p-6 md:p-8 border border-white/10 overflow-hidden">
                  <h3 className="text-xl font-semibold mb-6 text-white">{table.title}</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-white/10">
                          {table.headers.map((header, j) => (
                            <th key={j} className="py-3 px-4 text-sm font-semibold text-accent uppercase tracking-wider">
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {table.rows.map((row, j) => (
                          <tr key={j} className="hover:bg-white/5 transition-colors">
                            {row.map((cell, k) => (
                              <td key={k} className="py-3 px-4 text-gray-300 text-sm whitespace-nowrap">
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              ))}

              {/* 7. Gallery */}
              {caseStudy.screenshots && caseStudy.screenshots.length > 0 && (
                <section>
                  <h3 className="text-xl font-semibold mb-6 text-white">Gallery</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {caseStudy.screenshots.map((src, i) => (
                      <div
                        key={i}
                        className="rounded-xl overflow-hidden border border-white/10 aspect-video relative bg-black/40 cursor-zoom-in group"
                        onClick={() => setZoomedImage(src)}
                      >
                        <Image
                          src={src}
                          alt={`${project.title} screenshot ${i + 1}`}
                          fill
                          className="object-contain transition-transform duration-300 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 z-10">
                          <Maximize2 className="text-white drop-shadow-md" size={32} />
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* 8. Footer links */}
              <div className="pt-8 border-t border-white/10 flex flex-wrap gap-4">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 rounded-lg bg-accent text-white font-medium hover:bg-accent/90 transition-colors"
                >
                  View Code on GitHub <ExternalLink className="ml-2 h-4 w-4" />
                </a>

                {caseStudy.reportUrl && (
                  <a
                    href={caseStudy.reportUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 rounded-lg bg-white/10 text-white font-medium hover:bg-white/20 transition-colors border border-white/20"
                  >
                    Read Technical Report <FileText className="ml-2 h-4 w-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {zoomedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-black/90 backdrop-blur-xl p-4"
            onClick={() => setZoomedImage(null)}
          >
            <button
              onClick={() => setZoomedImage(null)}
              className="absolute top-4 right-4 p-3 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            >
              <X size={24} />
            </button>
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative w-full h-full max-w-7xl max-h-[90vh] flex items-center justify-center p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-full">
                 <Image
                  src={zoomedImage}
                  alt="Zoomed preview"
                  fill
                  className="object-contain drop-shadow-2xl"
                  sizes="100vw"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>,
    document.body
  )
}
