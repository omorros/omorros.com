'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Mail, Linkedin, Github } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { ContactForm } from '@/components/ContactForm'
import { siteConfig } from '@/lib/constants'

export function ContactPage() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, margin: '-100px' })

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
      className="max-w-xl mx-auto space-y-12"
    >
      <div className="space-y-8 text-center">
        <motion.p
          variants={itemVariants}
          className="text-foreground-muted leading-8 font-medium"
        >
          I&apos;m always open to discussing new opportunities, interesting
          projects, or just having a chat about technology.
        </motion.p>

        <motion.div variants={itemVariants}>
          <ContactForm />
        </motion.div>
      </div>

      <motion.div variants={itemVariants} className="flex flex-col items-center gap-6 pt-4 border-t border-glass-border">
        <p className="text-sm text-foreground-dim uppercase tracking-wider font-semibold">Or connect via</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button href={siteConfig.links.linkedin} icon={<Linkedin size={18} />}>
            LinkedIn
          </Button>
          <Button href={siteConfig.links.github} icon={<Github size={18} />}>
            GitHub
          </Button>
          <Button
            href={`mailto:${siteConfig.links.email}`}
            icon={<Mail size={18} />}
          >
            Email
          </Button>
        </div>
      </motion.div>

      <motion.p
        variants={itemVariants}
        className="text-sm text-foreground-faint text-center pt-8"
      >
        &copy; {new Date().getFullYear()} {siteConfig.name}
      </motion.p>
    </motion.div>
  )
}
