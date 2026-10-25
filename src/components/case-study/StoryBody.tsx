import { FlowDiagram } from '@/components/site/flow-diagram'
import type { Story } from '@/data/projects'
import { SectionHeading } from './SectionHeading'

// The story: why it matters, how it works, the decisions, a moment
// from the build, and limits only when a reader would not assume them.
// Team builds speak as "we", solo builds as "I".
export function StoryBody({ story }: { story: Story }) {
  return (
    <>
      <section className="mt-14">
        <SectionHeading>Why it matters</SectionHeading>
        <p className="max-w-measure text-foreground-muted">{story.context}</p>
      </section>

      <section className="mt-14">
        <SectionHeading>How it works</SectionHeading>
        <FlowDiagram flow={story.flow} />
      </section>

      <section className="mt-14">
        <SectionHeading>{story.team ? 'Decisions we made' : 'Decisions I made'}</SectionHeading>
        <ol className="space-y-7">
          {story.decisions.map((d) => (
            <li key={d.title} className="max-w-measure">
              <p className="font-medium text-foreground">{d.title}</p>
              <p className="mt-1 text-foreground-muted">{d.why}</p>
              <p className="mt-2 text-sm text-foreground-faint">
                <span className="font-medium text-foreground-muted">Trade-off.</span>{' '}
                {d.tradeoff}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {story.moment && (
        <section className="mt-14">
          <SectionHeading>{story.moment.title}</SectionHeading>
          <p className="max-w-measure text-foreground-muted">{story.moment.text}</p>
        </section>
      )}

      {story.limits && (
        <section className="mt-14">
          <SectionHeading>What it isn&apos;t</SectionHeading>
          <p className="max-w-measure text-foreground-muted">{story.limits}</p>
        </section>
      )}
    </>
  )
}
