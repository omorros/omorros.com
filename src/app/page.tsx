import Link from 'next/link'
import { Github, Linkedin, FileText, Mail } from 'lucide-react'
import { siteConfig } from '@/lib/constants'
import { projects } from '@/data/projects'
import { Life } from '@/components/site/Life'

const FEATURED = ['truevoice', 'offbabel', 'wildscan', 'darkfleet']

const SOCIAL = [
  { href: siteConfig.links.github, label: 'GitHub', Icon: Github },
  { href: siteConfig.links.linkedin, label: 'LinkedIn', Icon: Linkedin },
  { href: siteConfig.links.resume, label: 'CV', Icon: FileText },
  { href: `mailto:${siteConfig.links.email}`, label: 'Email', Icon: Mail },
]

const WORK = [
  {
    place: 'Eli by Techbible',
    role: 'Software engineer, infrastructure for AI agents',
    dates: '2026 to now',
  },
  {
    place: 'University of Cambridge',
    role: 'Digital technician',
    dates: '2025 to 2026',
  },
  {
    place: 'IBM MCP Context Forge',
    role: 'Open source contributor, 18 merged PRs',
    dates: '2026',
  },
  {
    place: 'Festival Sant Fruitós',
    role: 'Web developer',
    dates: '2026',
  },
]

export default function Page() {
  const featured = FEATURED.map((slug) =>
    projects.find((p) => p.slug === slug),
  ).filter((p): p is NonNullable<typeof p> => Boolean(p))

  return (
    <main className="max-w-2xl mx-auto px-6 pt-16 md:pt-24">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
        Hello!
      </h1>

      <div className="mt-6 space-y-4 max-w-measure text-foreground-muted text-lg">
        <p>
          I’m Oriol Morros, a software engineer in London. I build
          infrastructure for AI agents at Eli by Techbible.
        </p>
        <p>
          I studied software engineering at ARU in Cambridge and graduated
          with First Class Honours in 2026.
        </p>
      </div>

      <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
        {SOCIAL.map((l) => (
          <a
            key={l.label}
            href={l.href}
            target={l.href.startsWith('mailto:') ? undefined : '_blank'}
            rel={l.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
            className="inline-flex items-center gap-1.5 text-sm text-foreground-muted hover:text-foreground transition-colors"
          >
            <l.Icon size={14} aria-hidden="true" />
            <span>{l.label}</span>
          </a>
        ))}
      </div>

      <section className="mt-20">
        <h2 className="text-xl font-semibold text-foreground">Projects</h2>
        <p className="mt-4 max-w-measure text-foreground-muted">
          I build things at hackathons and on my own time. Some recent ones:
        </p>
        <ul className="mt-6 space-y-5">
          {featured.map((p) => {
            const award = p.caseStudy?.awards?.[0]
            return (
              <li key={p.slug}>
                <Link
                  href={`/projects/${p.slug}`}
                  className="font-medium text-foreground hover:text-accent transition-colors"
                >
                  {p.title}
                </Link>
                {award && (
                  <p className="text-sm text-accent mt-0.5">{award.title}</p>
                )}
                <p className="mt-1 text-sm text-foreground-muted max-w-measure">
                  {p.description}
                </p>
              </li>
            )
          })}
        </ul>
        <Link
          href="/projects"
          className="mt-6 inline-block text-sm text-accent hover:underline"
        >
          All projects
        </Link>
      </section>

      <section className="mt-20">
        <h2 className="text-xl font-semibold text-foreground">Work</h2>
        <ul className="mt-6 space-y-4">
          {WORK.map((w) => (
            <li key={w.place} className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-x-4">
              <div>
                <span className="font-medium text-foreground">{w.place}</span>
                <span className="text-foreground-muted"> · {w.role}</span>
              </div>
              <span className="text-sm text-foreground-faint shrink-0">
                {w.dates}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-foreground-muted max-w-measure">
          BSc Software Engineering, ARU Cambridge, First Class Honours, 2023
          to 2026. I mostly work with TypeScript, Next.js, and Python.
        </p>
      </section>

      <section className="mt-20">
        <h2 className="text-xl font-semibold text-foreground">Blog</h2>
        <p className="mt-4 max-w-measure text-foreground-muted">
          I’m starting to write about software, AI, and what I’m building.
        </p>
        <Link
          href="/blog"
          className="mt-4 inline-block text-sm text-accent hover:underline"
        >
          Read the blog
        </Link>
      </section>

      <Life />
    </main>
  )
}

