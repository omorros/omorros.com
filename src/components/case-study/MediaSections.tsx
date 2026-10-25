import { ZoomImage } from '@/components/site/ZoomImage'
import type { Project } from '@/data/projects'
import { DemoVideo } from './DemoVideo'
import { SectionHeading } from './SectionHeading'
import { VideoClip } from './VideoClip'

// Below the body: the demo when it did not lead the page, then event photos,
// then product screenshots in the gallery.
export function MediaSections({ project }: { project: Project }) {
  const cs = project.caseStudy
  const hero = cs.thumbnail
  const galleryScreens = cs.screenshots?.filter((s) => s !== hero) ?? []
  // Three photos go in a row of three; anything else pairs up.
  const photoCols = cs.photos?.length === 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-2'
  const photoSizes =
    cs.photos?.length === 3
      ? '(min-width: 672px) 198px, (min-width: 640px) calc(33vw - 27px), calc(100vw - 48px)'
      : '(min-width: 672px) 304px, (min-width: 640px) calc(50vw - 32px), calc(100vw - 48px)'

  return (
    <>
      {cs.youtubeId && hero && (
        <section className="mt-14">
          <SectionHeading>Demo</SectionHeading>
          <DemoVideo project={project} />
        </section>
      )}

      {cs.videoUrl && hero && (
        <section className="mt-14">
          <SectionHeading>Demo</SectionHeading>
          <VideoClip src={cs.videoUrl} />
        </section>
      )}

      {cs.photos && cs.photos.length > 0 && (
        <section className="mt-14">
          <SectionHeading>Photos</SectionHeading>
          <div className={`grid grid-cols-1 ${photoCols} gap-4`}>
            {cs.photos.map((photo) => (
              <ZoomImage
                key={photo.src}
                src={photo.src}
                alt={project.title}
                sizes={photoSizes}
                className="w-full h-auto block rounded-lg border border-border-soft"
              />
            ))}
          </div>
        </section>
      )}

      {galleryScreens.length > 0 && (
        <section className="mt-14">
          <SectionHeading>Gallery</SectionHeading>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {galleryScreens.map((src) => (
              <div
                key={src}
                className="rounded-lg overflow-hidden border border-border-soft bg-background-soft"
              >
                <ZoomImage
                  src={src}
                  alt={`${project.title} screenshot`}
                  sizes="(min-width: 672px) 304px, (min-width: 640px) calc(50vw - 32px), calc(100vw - 48px)"
                  className="w-full h-auto block"
                />
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  )
}
