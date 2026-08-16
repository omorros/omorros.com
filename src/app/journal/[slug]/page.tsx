import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { A, Container, Spacer, Title } from '@/components/site/ui'
import { JsonLd } from '@/components/site/JsonLd'
import { ZoomImage } from '@/components/site/ZoomImage'
import { journal } from '@/data/journal'
import { createPageMetadata } from '@/lib/metadata'
import { getJournalEntryJsonLd } from '@/lib/structured-data'

// Renders [text](url) in journal paragraphs as inline links.
function withLinks(text: string) {
  const parts = text.split(/\[([^\]]+)\]\(([^)]+)\)/g)
  if (parts.length === 1) return text
  const out: React.ReactNode[] = []
  for (let i = 0; i < parts.length; i += 3) {
    if (parts[i]) out.push(parts[i])
    if (parts[i + 1] && parts[i + 2]) {
      out.push(
        <A key={i} href={parts[i + 2]}>
          {parts[i + 1]}
        </A>
      )
    }
  }
  return out
}

interface PageProps {
  params: { slug: string }
}

export function generateStaticParams() {
  return journal.map((e) => ({ slug: e.slug }))
}

export function generateMetadata({ params }: PageProps): Metadata {
  const entry = journal.find((e) => e.slug === params.slug)
  if (!entry) notFound()
  return createPageMetadata({
    title: entry.title,
    description: entry.tagline ?? entry.body[0],
    path: `/journal/${entry.slug}`,
    kind: 'article',
  })
}

export default function JournalEntryPage({ params }: PageProps) {
  const entry = journal.find((e) => e.slug === params.slug)
  if (!entry) notFound()
  const entryJsonLd = getJournalEntryJsonLd(entry)

  return (
    <main className="pb-8">
      <JsonLd data={entryJsonLd} />
      <Container>
        <Spacer size="xl" />

        <Title size="sm">{entry.title}</Title>

        <div className="mt-8 space-y-6 max-w-measure text-lg text-gray-700 md:text-xl">
          {entry.body.map((paragraph, i) => (
            <p key={i}>{withLinks(paragraph)}</p>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-12">
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

        {entry.bodyAfter && entry.bodyAfter.length > 0 && (
          <div className="mt-12 space-y-6 max-w-measure text-lg text-gray-700 md:text-xl">
            {entry.bodyAfter.map((paragraph, i) => (
              <p key={i}>{withLinks(paragraph)}</p>
            ))}
          </div>
        )}

        {entry.photosAfterCaption && entry.photosAfter && (
          <p className="mt-12 -mb-6 text-sm text-gray-700">
            {entry.photosAfterCaption}
          </p>
        )}

        {entry.photosAfter && entry.photosAfter.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-12">
            {entry.photosAfter.map((photo) => (
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

        <div className="pb-32" />
      </Container>
    </main>
  )
}
