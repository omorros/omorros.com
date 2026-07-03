import Link from 'next/link'
import { ThemeToggle } from './ThemeToggle'

const LINKS = [
  { href: '/projects', label: 'Projects' },
  { href: '/blog', label: 'Blog' },
]

export function Nav() {
  return (
    <header className="max-w-2xl mx-auto px-6 pt-8 flex items-center justify-between">
      <Link
        href="/"
        className="text-sm font-semibold text-foreground hover:text-accent transition-colors"
      >
        Oriol Morros
      </Link>
      <nav className="flex items-center gap-6">
        {LINKS.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="text-sm text-foreground-muted hover:text-foreground transition-colors"
          >
            {l.label}
          </Link>
        ))}
        <ThemeToggle />
      </nav>
    </header>
  )
}
