import type { ClassicBody as Classic } from '@/data/projects'
import { SectionHeading } from './SectionHeading'

// The older layout: the problem, what I built, what it does. Delete this file
// once every project has a story.
export function ClassicBody({ body }: { body: Classic }) {
  return (
    <>
      {body.challenge && (
        <section className="mt-14">
          <SectionHeading>The problem</SectionHeading>
          <p className="max-w-measure text-foreground-muted">{body.challenge}</p>
        </section>
      )}

      {body.approach && (
        <section className="mt-14">
          <SectionHeading>What I built</SectionHeading>
          <p className="max-w-measure text-foreground-muted">{body.approach}</p>
        </section>
      )}

      {body.features && body.features.length > 0 && (
        <section className="mt-14">
          <SectionHeading>What it does</SectionHeading>
          <ul className="space-y-4">
            {body.features.map((f) => (
              <li key={f.title} className="max-w-measure">
                <span className="font-medium text-foreground">{f.title}.</span>{' '}
                <span className="text-foreground-muted">{f.description}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  )
}
