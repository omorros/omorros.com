import Link from 'next/link'
import type { Project } from '@/data/projects'

export function ProjectItem({ project }: { project: Project }) {
  const award = project.caseStudy?.awards?.[0]
  const meta = [project.year, ...project.tags].filter(Boolean).join(' · ')

  return (
    <li>
      {project.slug ? (
        <Link
          href={`/projects/${project.slug}`}
          className="font-medium text-foreground hover:text-accent transition-colors"
        >
          {project.title}
        </Link>
      ) : (
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-foreground hover:text-accent transition-colors"
        >
          {project.title}
        </a>
      )}
      {award && <p className="text-sm text-accent mt-0.5">{award.title}</p>}
      <p className="mt-1 text-sm text-foreground-muted max-w-measure">
        {project.description}
      </p>
      {meta && <p className="mt-1 text-xs text-foreground-faint">{meta}</p>}
    </li>
  )
}
