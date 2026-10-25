import { BackLink } from '@/components/site/BackLink'
import { backHref, glanceFacts, type Project } from '@/data/projects'

// Back link, meta line, title, the story's insight, awards, links, then the
// at a glance strip.
export function CaseStudyHeader({ project }: { project: Project }) {
  const cs = project.caseStudy
  const story = cs.story
  // The event already carries its place and year ('Voice AI Hack · London
  // 2026'), so the year only shows on its own when there is no event.
  const metaLine = [
    project.category === 'hackathon' ? 'Hackathon' : 'Personal project',
    project.event ?? project.year,
  ]
    .filter(Boolean)
    .join(' · ')

  return (
    <header>
      <div className="mb-8">
        <BackLink fallback={backHref(project)} />
      </div>
      <p className="text-sm text-foreground-faint">{metaLine}</p>
      <h1 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-foreground">
        {project.title}
      </h1>
      <p className="mt-3 text-2xl font-semibold tracking-tight text-foreground text-balance md:text-3xl">
        {story.insight}
      </p>
      <p className="mt-4 max-w-measure text-foreground-muted text-lg">
        {project.description}
      </p>

      {cs.awards && cs.awards.length > 0 && (
        <ul className="mt-4 space-y-2">
          {cs.awards.map((a) => (
            <li key={a.title} className="max-w-measure">
              <p className="text-sm text-accent">{a.title}</p>
              {a.description && (
                <p className="text-sm text-foreground-muted">{a.description}</p>
              )}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm">
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            View code on GitHub
          </a>
        )}
        {cs.reportUrl && (
          <a
            href={cs.reportUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            Read the report
          </a>
        )}
      </div>

      <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-border-soft pt-6 sm:grid-cols-3">
        {glanceFacts(project, story).map((f) => (
          <div key={f.label}>
            <dt className="text-xs text-foreground-faint">{f.label}</dt>
            <dd className="mt-0.5 text-sm font-medium text-foreground">{f.value}</dd>
          </div>
        ))}
        {story.team && story.team.length > 0 && (
          <div>
            <dt className="text-xs text-foreground-faint">Team</dt>
            <dd className="mt-0.5 text-sm font-medium text-foreground">
              {story.team.map((m, i) => (
                <span key={m.name}>
                  {i > 0 && (i === story.team!.length - 1 ? ' and ' : ', ')}
                  {m.url ? (
                    <a href={m.url} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                      {m.name}
                    </a>
                  ) : (
                    m.name
                  )}
                </span>
              ))}
            </dd>
          </div>
        )}
      </dl>
    </header>
  )
}
