import { YouTubeEmbed } from '@/components/site/YouTubeEmbed'
import type { Project } from '@/data/projects'

// The project's YouTube demo, or nothing when it has none.
export function DemoVideo({ project }: { project: Project }) {
  const cs = project.caseStudy
  if (!cs.youtubeId) return null
  return (
    <YouTubeEmbed
      id={cs.youtubeId}
      poster={cs.youtubePoster ?? '/images/card-placeholder.svg'}
      title={`${project.title} demo`}
    />
  )
}
