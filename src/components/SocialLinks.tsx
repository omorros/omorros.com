'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Mail } from 'lucide-react'
import { siteConfig } from '@/lib/constants'
import { Button } from './ui/Button'

const socialLinks = [
  {
    name: 'GitHub',
    href: siteConfig.links.github,
    icon: Github,
  },
  {
    name: 'LinkedIn',
    href: siteConfig.links.linkedin,
    icon: Linkedin,
  },
  {
    name: 'Email',
    href: `mailto:${siteConfig.links.email}`,
    icon: Mail,
  },
]

export function SocialLinks() {
  return (
    <motion.div
      className="flex flex-wrap justify-center gap-4 px-4 py-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      {socialLinks.map((link) => (
        <Button key={link.name} href={link.href} variant="secondary">
          <link.icon size={18} />
          {link.name}
        </Button>
      ))}
    </motion.div>
  )
}
