'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Mail, Linkedin, Github } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { siteConfig } from '@/lib/constants'

export function ContactPage() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className="space-y-8"
    >
      <motion.p
        variants={itemVariants}
        className="text-[rgba(242,242,242,0.8)] leading-8 font-medium"
      >
        I&apos;m always open to discussing new opportunities, interesting
        projects, or just having a chat about technology. Feel free to reach out
        through any of the channels below.
      </motion.p>

      <motion.div variants={itemVariants} className="flex flex-wrap gap-3">
        <Button
          href={`mailto:${siteConfig.links.email}`}
          icon={<Mail size={18} />}
        >
          Email Me
        </Button>
        <Button href={siteConfig.links.linkedin} icon={<Linkedin size={18} />}>
          LinkedIn
        </Button>
        <Button href={siteConfig.links.github} icon={<Github size={18} />}>
          GitHub
        </Button>
      </motion.div>

      <motion.p
        variants={itemVariants}
        className="text-sm text-[rgba(242,242,242,0.5)] pt-8"
      >
        &copy; {new Date().getFullYear()} {siteConfig.name}
      </motion.p>
    </motion.div>
  )
}
