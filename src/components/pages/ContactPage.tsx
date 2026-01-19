'use client'

import { motion } from 'framer-motion'
import { Mail, Linkedin, Github } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { siteConfig } from '@/lib/constants'

export function ContactPage() {
  return (
    <div className="space-y-8">
      <p className="text-[rgba(242,242,242,0.8)] leading-8 font-medium">
        I&apos;m always open to discussing new opportunities, interesting
        projects, or just having a chat about technology. Feel free to reach out
        through any of the channels below.
      </p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-wrap gap-3"
      >
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
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-sm text-[rgba(242,242,242,0.5)] pt-8"
      >
        &copy; {new Date().getFullYear()} {siteConfig.name}
      </motion.p>
    </div>
  )
}
