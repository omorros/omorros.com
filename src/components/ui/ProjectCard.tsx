'use client'

// Ported from syedsubhan.in/components/ui/ProjectCard.tsx
// Adapted to use our CSS-var tokens and to render a gradient placeholder
// when neither videoUrl nor imageUrl is provided (most of our projects don't have media yet).

import { useState } from 'react'
import { motion, useSpring } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'
import { cn, triggerHaptic } from '@/lib/utils'

interface ProjectCardProps {
  title: string
  description: string
  tags: string[]
  link?: string
  githubUrl?: string
  videoUrl?: string
  imageUrl?: string
  index: number
  isDimmed?: boolean
  onHover?: () => void
  onLeave?: () => void
}

export function ProjectCard({
  title,
  description,
  tags,
  link,
  githubUrl,
  videoUrl,
  imageUrl,
  index,
  isDimmed,
  onHover,
  onLeave,
}: ProjectCardProps) {
  const [, setIsHovered] = useState(false)

  const scale = useSpring(1, { stiffness: 300, damping: 20 })
  const y = useSpring(0, { stiffness: 300, damping: 20 })

  const handleMouseEnter = () => {
    setIsHovered(true)
    scale.set(1.02)
    y.set(-5)
    triggerHaptic(5)
    onHover?.()
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    scale.set(1)
    y.set(0)
    onLeave?.()
  }

  // Initials for the gradient-placeholder fallback when no media is provided.
  const initials = title
    .split(/[\s-]+/)
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase()

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
      style={{ scale, y }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        'group relative flex flex-col w-full bg-background rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-black/5 dark:hover:shadow-white/5 transition-all duration-500 will-change-transform h-auto md:h-[420px]',
        isDimmed
          ? 'grayscale opacity-40 blur-[1px] scale-95'
          : 'grayscale-0 opacity-100 blur-0'
      )}
    >
      {/* Hover Glow - neutral, picks up the foreground tone */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
        <div className="absolute inset-[-20%] bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.06)_0%,transparent_50%)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.06)_0%,transparent_50%)]" />
      </div>

      {/* Visual media - top 55% */}
      <div className="relative w-full h-[200px] md:h-[55%] overflow-hidden bg-background-soft">
        {videoUrl ? (
          <video
            src={videoUrl}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageUrl}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          // Fallback: gradient placeholder with initials.
          <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.18),transparent_60%),radial-gradient(circle_at_70%_70%,rgba(120,100,200,0.14),transparent_60%)] dark:bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.25),transparent_60%),radial-gradient(circle_at_70%_70%,rgba(120,100,200,0.18),transparent_60%)]">
            <span className="font-display text-5xl md:text-6xl text-foreground/40 group-hover:text-foreground/60 transition-colors tracking-tight">
              {initials}
            </span>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
      </div>

      {/* Content - bottom 45% */}
      <div className="flex flex-col flex-1 p-5 md:p-6 relative">
        <div className="flex items-start justify-between mb-2 gap-3">
          <h3 className="text-xl md:text-2xl font-bold text-foreground leading-tight tracking-tight">
            {title}
          </h3>

          <div className="flex items-center gap-2 shrink-0">
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${title} - view code`}
                className="p-1.5 rounded-full bg-background-soft text-foreground-muted hover:bg-foreground hover:text-background transition-all duration-300 hover:scale-110 active:scale-95"
                onClick={(e) => {
                  e.stopPropagation()
                  triggerHaptic(5)
                }}
              >
                <Github size={16} />
              </a>
            )}
            {link && link !== githubUrl && (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${title} - view live`}
                className="p-1.5 rounded-full bg-accent text-white hover:opacity-90 shadow-md hover:shadow-lg hover:shadow-accent/30 transition-all duration-300 hover:scale-110 active:scale-95"
                onClick={(e) => {
                  e.stopPropagation()
                  triggerHaptic(10)
                }}
              >
                <ExternalLink size={16} />
              </a>
            )}
          </div>
        </div>

        <p className="text-sm text-foreground-muted leading-relaxed mb-4 line-clamp-3">
          {description}
        </p>

        <div className="mt-auto">
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-full bg-background-soft border border-border-soft text-[10px] font-semibold text-foreground-muted tracking-wide"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
