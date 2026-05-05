'use client'

// Hero / About section - mirrors syedsubhan.in's hero structure exactly.
// Profile pic right (md:order-last) draggable, available pill, name + verified badge,
// typewriter role, bio paragraph. The hero IS the "about" section (id="about").

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Github, Linkedin, FileText, Mail } from 'lucide-react'
import { siteConfig } from '@/lib/constants'
import { Typewriter } from '@/components/ui/Typewriter'
import { AvailablePill } from '@/components/ui/AvailablePill'

const ROLES = [
  'AI Engineer',
  'Software Engineer',
  'Full-Stack Developer',
]

export function Hero() {
  return (
    <section id="about" className="mb-16 scroll-mt-32">
      <div className="flex flex-col md:flex-row justify-between items-start gap-8 md:gap-10">
        {/* Profile pic - top on mobile, right on desktop */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          drag
          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
          dragElastic={0.2}
          whileHover={{ scale: 1.05, cursor: 'grab' }}
          whileDrag={{ cursor: 'grabbing', scale: 1.1 }}
          className="relative shrink-0 w-24 md:w-[180px] md:order-last z-20 touch-none"
        >
          <div className="aspect-square w-full rounded-2xl border border-border p-1 bg-background-soft shadow-xl overflow-hidden pointer-events-none select-none">
            <Image
              src="/oriol.png"
              alt="Oriol Morros"
              width={180}
              height={180}
              className="w-full h-full rounded-xl object-cover object-top pointer-events-none"
              priority
            />
          </div>
        </motion.div>

        {/* Text */}
        <div className="flex-1 flex flex-col justify-between self-stretch">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col h-full"
          >
            <div>
              <div className="mb-4">
                <AvailablePill label="Available for new projects" />
              </div>

              <h1 className="text-3xl md:text-4xl font-display font-medium text-foreground mb-2 leading-tight text-balance">
                Hi, I’m {siteConfig.name.split(' ').slice(0, 2).join(' ')}
              </h1>

              {/* Typewriter role */}
              <div className="mb-2 h-10 md:h-12 flex items-center">
                <Typewriter
                  texts={ROLES}
                  speed="medium"
                  className="text-lg md:text-2xl font-bold text-foreground-faint"
                  cursorClassName="ml-0.5 inline-block h-[1.1em] w-[2px] bg-foreground align-bottom"
                />
              </div>

              <div className="prose prose-gray dark:prose-invert max-w-lg mb-6">
                <p className="text-foreground-muted leading-relaxed text-sm md:text-base text-pretty">
                  Building polished AI-integrated products from{' '}
                  <span className="text-foreground font-medium">Cambridge, UK</span>.
                  Currently a software engineering student combining engineering
                  rigor with shipping discipline.
                </p>
              </div>

              {/* Mono link row */}
              <div className="flex flex-wrap gap-x-5 gap-y-2 font-mono text-[11px] uppercase tracking-[0.18em]">
                {[
                  { href: siteConfig.links.github, label: 'GitHub', Icon: Github },
                  { href: siteConfig.links.linkedin, label: 'LinkedIn', Icon: Linkedin },
                  { href: siteConfig.links.resume, label: 'CV', Icon: FileText },
                  { href: `mailto:${siteConfig.links.email}`, label: 'Email', Icon: Mail },
                ].map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    target={l.href.startsWith('mailto:') ? undefined : '_blank'}
                    rel={l.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                    className="group inline-flex items-center gap-1.5 text-foreground-muted hover:text-foreground transition-colors"
                  >
                    <l.Icon
                      size={12}
                      strokeWidth={2}
                      className="text-foreground-faint group-hover:text-foreground transition-colors"
                      aria-hidden="true"
                    />
                    <span>{l.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
