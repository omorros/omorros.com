'use client'

// Inline social icon dock. Magnifies hovered item (68px), neighbours grow
// slightly (60px), rest stay at 56px.

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Github, Linkedin, Mail } from 'lucide-react'
import { siteConfig } from '@/lib/constants'
import { triggerHaptic } from '@/lib/utils'

const SOCIALS = [
  { id: 'linkedin', icon: Linkedin, label: 'LinkedIn', href: siteConfig.links.linkedin },
  { id: 'email', icon: Mail, label: 'Email', href: `mailto:${siteConfig.links.email}` },
  { id: 'github', icon: Github, label: 'GitHub', href: siteConfig.links.github },
] as const

export function SocialDock() {
  const [hovered, setHovered] = useState<number | null>(null)

  const getWidth = (i: number) => {
    if (hovered === null) return 56
    const d = Math.abs(hovered - i)
    if (d === 0) return 68
    if (d === 1) return 60
    return 56
  }

  return (
    <div className="flex justify-center items-end h-[70px] pb-2">
      <ul className="flex items-end gap-2 list-none m-0 p-0">
        {SOCIALS.map((s, i) => {
          const Icon = s.icon
          return (
            <li
              key={s.id}
              className="relative flex items-center justify-center transition-all duration-300"
              style={{ width: `${getWidth(i)}px` }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => triggerHaptic(10)}
            >
              <AnimatePresence>
                {hovered === i && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.8, x: '-50%' }}
                    animate={{ opacity: 1, y: 0, scale: 1, x: '-50%' }}
                    exit={{ opacity: 0, y: 5, scale: 0.9, x: '-50%' }}
                    transition={{ duration: 0.15 }}
                    className="absolute -top-10 left-1/2 px-2.5 py-1 bg-foreground text-background text-[10px] font-medium rounded-md whitespace-nowrap z-20 shadow-lg hidden md:block"
                  >
                    {s.label}
                  </motion.div>
                )}
              </AnimatePresence>
              <a
                href={s.href}
                target={s.href.startsWith('http') ? '_blank' : undefined}
                rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                aria-label={s.label}
                className="w-full aspect-square rounded-2xl bg-background-soft border border-border flex items-center justify-center text-foreground hover:bg-foreground hover:text-background transition-colors duration-300 active:scale-95"
              >
                <Icon size={20} />
              </a>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
