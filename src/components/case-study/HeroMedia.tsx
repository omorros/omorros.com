import Image from 'next/image'
import type { Project } from '@/data/projects'
import { DemoVideo } from './DemoVideo'
import { VideoClip } from './VideoClip'

// The top of the page: the hero image, otherwise the YouTube demo, otherwise
// the video clip.
export function HeroMedia({ project }: { project: Project }) {
  const cs = project.caseStudy
  if (cs.thumbnail) {
    return (
      <div className="mt-10 rounded-lg overflow-hidden border border-border-soft bg-background-soft">
        <Image
          src={cs.thumbnail}
          alt={project.title}
          width={0}
          height={0}
          priority
          quality={90}
          sizes="(min-width: 672px) 624px, calc(100vw - 48px)"
          className="w-full h-auto block"
        />
      </div>
    )
  }
  if (cs.youtubeId) {
    return (
      <div className="mt-10">
        <DemoVideo project={project} />
      </div>
    )
  }
  if (cs.videoUrl) {
    return <VideoClip src={cs.videoUrl} className="mt-10" />
  }
  return null
}
