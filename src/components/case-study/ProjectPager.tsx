import Link from 'next/link'
import type { Project } from '@/data/projects'

// The previous and next links at the foot of a case study.
export function ProjectPager({ prev, next }: { prev: Project | null; next: Project | null }) {
  return (
    <nav
      className="mt-16 pt-8 border-t border-border-soft flex justify-between gap-4 text-sm"
      aria-label="Project navigation"
    >
      {prev ? (
        <Link
          href={`/projects/${prev.slug}`}
          className="text-accent hover:underline"
        >
          ← {prev.title}
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link
          href={`/projects/${next.slug}`}
          className="text-accent hover:underline text-right"
        >
          {next.title} →
        </Link>
      ) : (
        <span />
      )}
    </nav>
  )
}
