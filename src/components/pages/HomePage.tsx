'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Github, Linkedin, Mail, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { siteConfig } from '@/lib/constants'

interface HomePageProps {
  onExplore?: () => void
}

export function HomePage({ onExplore }: HomePageProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  // Parallax fade-out effect as user scrolls away from home
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -50])

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y }}
      className="flex flex-col items-center text-center"
    >
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4"
      >
        {siteConfig.name}
      </motion.h1>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="text-xl md:text-2xl font-semibold text-foreground-muted mb-8"
      >
        {siteConfig.subtitle}
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-wrap justify-center gap-3 mt-4"
      >
        <Button href={siteConfig.links.github} icon={<Github size={18} />}>
          GitHub
        </Button>
        <Button href={siteConfig.links.linkedin} icon={<Linkedin size={18} />}>
          LinkedIn
        </Button>
        <Button
          href={`mailto:${siteConfig.links.email}`}
          icon={<Mail size={18} />}
        >
          Email
        </Button>
      </motion.div>

      {/* Explore button - flow positioned instead of absolute to prevent overlap */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="mt-20 md:mt-32"
      >
        <button
          onClick={onExplore}
          className="flex flex-col items-center gap-3 text-foreground-muted hover:text-foreground transition-colors cursor-pointer group"
        >
          <span className="text-base font-semibold">Explore</span>
          <ChevronDown
            size={24}
            className="animate-bounce-slow group-hover:text-accent"
          />
        </button>
      </motion.div>
    </motion.div>
  )
}
