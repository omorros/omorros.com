'use client'

// Articles section - cards with cursor-tracking thumbnail previews on hover.

import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { SectionHeader } from './SectionHeader'
import { LinkPreview } from '@/components/ui/LinkPreview'
import { articles } from '@/data/articles'

export function Articles() {
  return (
    <motion.section
      id="articles"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="py-12 scroll-mt-32"
    >
      <SectionHeader title="Articles" caption="Notes from the build." />

      <ul className="mt-6 divide-y divide-border-soft">
        {articles.map((a) => (
          <li key={a.slug} className="group">
            <a
              href={a.href}
              target={a.href.startsWith('http') ? '_blank' : undefined}
              rel={a.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="flex items-start justify-between gap-6 py-5 px-3 -mx-3 rounded-md hover:bg-foreground/[0.03] transition-colors"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1.5">
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-foreground-faint">
                    {a.date}
                  </span>
                  <span className="text-foreground-faint">·</span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-foreground-faint">
                    {a.readTime}
                  </span>
                </div>
                <h3 className="text-lg md:text-xl font-display tracking-tight text-foreground group-hover:text-accent transition-colors mb-1">
                  <LinkPreview href={a.href} imageSrc={a.thumbnail}>
                    {a.title}
                  </LinkPreview>
                </h3>
                <p className="text-sm text-foreground-muted leading-relaxed max-w-prose">
                  {a.description}
                </p>
              </div>
              <ArrowUpRight
                size={18}
                className="shrink-0 mt-2 text-foreground-faint group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
              />
            </a>
          </li>
        ))}
      </ul>
    </motion.section>
  )
}
