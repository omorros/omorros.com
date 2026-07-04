import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { Container, Spacer, Title } from '@/components/site/ui'
import { ZoomImage } from '@/components/site/ZoomImage'
import { journal } from '@/data/journal'

interface PageProps {
  params: { slug: string }
}

export function generateStaticParams() {
  return journal.map((e) => ({ slug: e.slug }))
}

export function generateMetadata({ params }: PageProps): Metadata {
  const entry = journal.find((e) => e.slug === params.slug)
  if (!entry) return {}
  return {
    title: entry.title,
    description: entry.tagline ?? entry.body[0],
  }
}

export default function JournalEntryPage({ params }: PageProps) {
  const entry = journal.find((e) => e.slug === params.slug)
  if (!entry) notFound()

  return (
    <main className="pb-8">
      <Container>
        <Spacer size="xl" />

        <Title size="sm">{entry.title}</Title>

        <div className="mt-8 space-y-6 max-w-measure text-lg text-gray-700 md:text-xl">
          {entry.body.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        {entry.videoUrl && (
          <div className="mt-12 rounded-lg overflow-hidden shadow-lg">
            <video
              src={entry.videoUrl}
              autoPlay
              muted
              loop
              playsInline
              controls
              className="w-full h-auto block"
            />
          </div>
        )}

        {entry.photos && entry.photos.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-12 mb-32">
            {entry.photos.map((photo) => (
              <figure key={photo.src}>
                <ZoomImage
                  src={photo.src}
                  alt={photo.caption ?? entry.title}
                  className="w-full h-auto block rounded-lg shadow-lg"
                />
                {photo.caption && (
                  <figcaption className="mt-2 text-sm text-gray-700">
                    {photo.caption}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        )}

        {!entry.photos?.length && <div className="mb-32" />}
      </Container>
    </main>
  )
}
