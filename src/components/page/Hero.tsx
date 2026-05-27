'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { Github, Linkedin, FileText, Mail } from 'lucide-react'
import { siteConfig } from '@/lib/constants'
import { Typewriter } from '@/components/ui/Typewriter'
import { AvailablePill } from '@/components/ui/AvailablePill'

const ROLES = ['AI Engineer', 'Software Engineer', 'Full-Stack Developer']

const EASE = [0.16, 1, 0.3, 1] as const

// Staggered entrance timing. Each row appears `delayMs` after page mount.
const STAGGER = {
  pill: 0.05,
  name: 0.13,
  role: 0.21,
  photo: 0.21,
  bio: 0.29,
  links: 0.37,
} as const

export function Hero() {
  const reduce = useReducedMotion()

  const rowAnim = (delay: number) =>
    reduce
      ? undefined
      : {
          initial: { opacity: 0, y: 8 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, ease: EASE, delay },
        }

  const photoAnim = reduce
    ? undefined
    : {
        initial: { opacity: 0, scale: 0.96 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0.5, ease: EASE, delay: STAGGER.photo },
      }

  return (
    <section id="about" className="mb-16 scroll-mt-32">
      <div className="flex flex-col md:flex-row justify-between items-start gap-8 md:gap-10">
        {/* Profile pic - top on mobile, right on desktop */}
        <motion.div
          {...(photoAnim ?? {})}
          whileHover={reduce ? undefined : { scale: 1.03 }}
          className="relative shrink-0 w-24 md:w-[180px] md:order-last z-20"
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

        {/* Text column */}
        <div className="flex-1 flex flex-col justify-between self-stretch">
          <div className="flex flex-col h-full">
            <motion.div {...(rowAnim(STAGGER.pill) ?? {})} className="mb-4">
              <AvailablePill label="Available for new projects" />
            </motion.div>

            <motion.h1
              {...(rowAnim(STAGGER.name) ?? {})}
              className="text-3xl md:text-4xl font-display font-medium text-foreground mb-2 leading-tight text-balance"
            >
              Hi, I’m {siteConfig.name.split(' ').slice(0, 2).join(' ')}
            </motion.h1>

            <motion.div
              {...(rowAnim(STAGGER.role) ?? {})}
              className="mb-2 h-10 md:h-12 flex items-center"
            >
              <Typewriter
                texts={ROLES}
                speed="medium"
                className="text-lg md:text-2xl font-bold text-foreground-faint"
                cursorClassName="ml-0.5 inline-block h-[1.1em] w-[2px] bg-foreground align-bottom"
              />
            </motion.div>

            <motion.p
              {...(rowAnim(STAGGER.bio) ?? {})}
              className="text-foreground-muted leading-relaxed text-sm md:text-base text-pretty mb-6 max-w-lg"
            >
              Software Engineer{' '}
              <span className="text-foreground-faint">|</span>{' '}
              <span className="text-foreground font-medium">
                Building infrastructure for AI agents.
              </span>
            </motion.p>

            {/* Mono link row */}
            <motion.div
              {...(rowAnim(STAGGER.links) ?? {})}
              className="flex flex-wrap gap-x-5 gap-y-2 font-mono text-[11px] uppercase tracking-[0.18em]"
            >
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
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
