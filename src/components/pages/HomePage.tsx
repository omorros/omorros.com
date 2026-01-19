'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { siteConfig } from '@/lib/constants'

interface HomePageProps {
  onExplore?: () => void
}

export function HomePage({ onExplore }: HomePageProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-4xl md:text-5xl lg:text-6xl font-bold text-[rgba(242,242,242,0.95)] mb-4"
      >
        {siteConfig.name}
      </motion.h1>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-xl md:text-2xl font-semibold text-[rgba(242,242,242,0.7)] mb-8"
      >
        {siteConfig.subtitle}
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
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

      {/* Explore button at bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="absolute bottom-16 left-1/2 -translate-x-1/2"
      >
        <button
          onClick={onExplore}
          className="flex flex-col items-center gap-3 text-[rgba(242,242,242,0.8)] hover:text-[rgba(242,242,242,1)] transition-colors cursor-pointer group"
        >
          <span className="text-base font-semibold">Explore</span>
          <ChevronDown
            size={24}
            className="animate-bounce-slow group-hover:text-accent"
          />
        </button>
      </motion.div>
    </div>
  )
}
