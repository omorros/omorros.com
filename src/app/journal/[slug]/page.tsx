import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import { A, Container, Spacer, Title } from '@/components/site/ui'
import { JsonLd } from '@/components/site/JsonLd'
import { VideoEmbed } from '@/components/site/VideoEmbed'
import { ZoomImage } from '@/components/site/ZoomImage'
import {
  journal,
  type JournalMarginSticker,
  type JournalPhoto,
} from '@/data/journal'
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

// Wide photos take a row on their own and the rest pair up. In a pair, each
// photo's width follows its aspect ratio, so both end up the same height.
function PhotoGrid({ photos, alt }: { photos: JournalPhoto[]; alt: string }) {
  const rows: JournalPhoto[][] = []
  for (const photo of photos) {
    const last = rows[rows.length - 1]
    if (!photo.wide && last?.length === 1 && !last[0].wide) last.push(photo)
    else rows.push([photo])
  }

  return (
    <div className="mt-12 space-y-4">
      {rows.map((row) => {
        const total = row.reduce((sum, p) => sum + p.width / p.height, 0)
        return (
          <div key={row[0].src} className="flex flex-col gap-4 sm:flex-row">
            {row.map((photo) => {
              const ratio = photo.width / photo.height
              const share = ratio / total
              return (
                <figure
                  key={photo.src}
                  className="min-w-0 sm:[flex:var(--ratio)_1_0%]"
                  style={{ '--ratio': ratio } as React.CSSProperties}
                >
                  <ZoomImage
                    src={photo.src}
                    alt={photo.alt ?? photo.caption ?? alt}
                    width={photo.width}
                    height={photo.height}
                    sizes={`(min-width: 1024px) ${Math.round(768 * share)}px, (min-width: 640px) ${Math.round(528 * share)}px, calc(100vw - 48px)`}
                    className="w-full h-auto block rounded-lg shadow-lg"
                  />
                  {photo.caption && (
                    <figcaption className="mt-2 text-sm text-gray-700">
                      {photo.caption}
                    </figcaption>
                  )}
                </figure>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}

// Decorative sticker in the page margin. Only shown where the margins are
// wide enough to hold it without touching the text.
function MarginSticker({ sticker }: { sticker: JournalMarginSticker }) {
  return (
    <Image
      src={sticker.src}
      alt=""
      aria-hidden
      width={sticker.width}
      height={sticker.height}
      sizes={`${sticker.size}px`}
      className={`pointer-events-none absolute hidden select-none drop-shadow-md xl:block ${
        sticker.side === 'left' ? 'right-full mr-12' : 'left-full ml-12'
      }`}
      style={{
        top: `${sticker.top}%`,
        width: sticker.size,
        height: 'auto',
        transform: `rotate(${sticker.rotate}deg)`,
      }}
    />
  )
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
    ...(entry.shareImage && {
      image: entry.shareImage,
      imageAlt: entry.shareImageAlt ?? entry.title,
    }),
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

        <div className="relative">
          {entry.stickers?.map((sticker) => (
            <MarginSticker key={sticker.src} sticker={sticker} />
          ))}

          <div className="flex items-center justify-between gap-6">
            <Title size="sm">{entry.title}</Title>
            {entry.titleSticker && (
              <Image
                src={entry.titleSticker.src}
                alt=""
                aria-hidden
                priority
                width={entry.titleSticker.width}
                height={entry.titleSticker.height}
                sizes="(min-width: 768px) 128px, 88px"
                className="pointer-events-none w-[88px] shrink-0 select-none drop-shadow-md md:w-32"
                style={{ transform: `rotate(${entry.titleSticker.rotate}deg)` }}
              />
            )}
          </div>

          {entry.videoUrl && (
            <figure className="mt-8">
              <VideoEmbed
                src={entry.videoUrl}
                poster={entry.videoPoster ?? entry.cardImage}
                title={`${entry.title} video`}
                frame="shadow-lg"
              />
              {entry.videoCaption && (
                <figcaption className="mt-2 text-sm text-gray-700">
                  {entry.videoCaption}
                </figcaption>
              )}
            </figure>
          )}

          <div className={`${entry.videoUrl ? 'mt-12' : 'mt-8'} space-y-6 max-w-measure text-lg text-gray-700 md:text-xl`}>
            {entry.body.map((paragraph, i) => (
              <p key={i}>{withLinks(paragraph)}</p>
            ))}
          </div>

          {entry.photos && entry.photos.length > 0 && (
            <PhotoGrid photos={entry.photos} alt={entry.title} />
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
            <PhotoGrid photos={entry.photosAfter} alt={entry.title} />
          )}
        </div>

        <div className="pb-32" />
      </Container>
    </main>
  )
}
