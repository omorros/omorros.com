import { siteConfig } from '@/lib/constants'

const LINKS = [
  { href: siteConfig.links.github, label: 'GitHub' },
  { href: siteConfig.links.linkedin, label: 'LinkedIn' },
  { href: siteConfig.links.resume, label: 'CV' },
  { href: `mailto:${siteConfig.links.email}`, label: 'Email' },
]

export function Footer() {
  return (
    <footer className="max-w-2xl mx-auto px-6 py-12 mt-24 border-t border-border-soft flex flex-wrap items-center justify-between gap-4">
      <p className="text-sm text-foreground-faint">
        © {new Date().getFullYear()} Oriol Morros
      </p>
      <div className="flex gap-5">
        {LINKS.map((l) => (
          <a
            key={l.label}
            href={l.href}
            target={l.href.startsWith('mailto:') ? undefined : '_blank'}
            rel={l.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
            className="text-sm text-foreground-muted hover:text-foreground transition-colors"
          >
            {l.label}
          </a>
        ))}
      </div>
    </footer>
  )
}
