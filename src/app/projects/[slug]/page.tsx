import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { projects } from '@/data/projects'
import { ZoomImage } from '@/components/site/ZoomImage'

interface PageProps {
  params: { slug: string }
}

export function generateStaticParams() {
  return projects.filter((p) => p.slug).map((p) => ({ slug: p.slug! }))
}

export function generateMetadata({ params }: PageProps): Metadata {
  const project = projects.find((p) => p.slug === params.slug)
  if (!project) return {}
  return {
    title: project.title,
    description: project.description,
  }
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xl font-semibold text-foreground mb-4">{children}</h2>
  )
}

export default function ProjectDetailPage({ params }: PageProps) {
  const project = projects.find((p) => p.slug === params.slug)
  if (!project) notFound()

  const cs = project.caseStudy
  // Hero is the thumbnail when set; with no thumbnail the demo video leads.
  const heroMedia = cs?.thumbnail
  const galleryScreens = cs?.screenshots?.filter((s) => s !== heroMedia) ?? []

  const slugged = projects.filter((p) => p.slug)
  const idx = slugged.findIndex((p) => p.slug === project.slug)
  const prev = idx > 0 ? slugged[idx - 1] : null
  const next = idx >= 0 && idx < slugged.length - 1 ? slugged[idx + 1] : null

  const metaLine = [
    project.category === 'hackathon' ? 'Hackathon' : 'Personal project',
    project.year,
    project.event,
  ]
    .filter(Boolean)
    .join(' · ')

  return (
    <main className="max-w-2xl mx-auto px-6 pt-16 md:pt-24">
      <header>
        <p className="text-sm text-foreground-faint">{metaLine}</p>
        <h1 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-foreground">
          {project.title}
        </h1>
        <p className="mt-4 max-w-measure text-foreground-muted text-lg">
          {project.description}
        </p>

        {cs?.awards && cs.awards.length > 0 && (
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
          {cs?.reportUrl && (
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

        <p className="mt-4 text-xs text-foreground-faint">
          {project.tags.join(' · ')}
        </p>
      </header>

      {heroMedia ? (
        <div className="mt-10 rounded-lg overflow-hidden border border-border-soft bg-background-soft">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={heroMedia} alt={project.title} className="w-full h-auto block" />
        </div>
      ) : cs?.videoUrl ? (
        <div className="mt-10 rounded-lg overflow-hidden border border-border-soft bg-background-soft">
          <video
            src={cs.videoUrl}
            autoPlay
            muted
            loop
            playsInline
            controls
            className="w-full h-auto block"
          />
        </div>
      ) : null}

      {cs?.challenge && (
        <section className="mt-14">
          <SectionHeading>The problem</SectionHeading>
          <p className="max-w-measure text-foreground-muted">{cs.challenge}</p>
        </section>
      )}

      {cs?.approach && (
        <section className="mt-14">
          <SectionHeading>What I built</SectionHeading>
          <p className="max-w-measure text-foreground-muted">{cs.approach}</p>
        </section>
      )}

      {cs?.features && cs.features.length > 0 && (
        <section className="mt-14">
          <SectionHeading>What it does</SectionHeading>
          <ul className="space-y-4">
            {cs.features.map((f) => (
              <li key={f.title} className="max-w-measure">
                <span className="font-medium text-foreground">{f.title}.</span>{' '}
                <span className="text-foreground-muted">{f.description}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {cs?.videoUrl && heroMedia && (
        <section className="mt-14">
          <SectionHeading>Demo</SectionHeading>
          <div className="rounded-lg overflow-hidden border border-border-soft bg-background-soft">
            <video
              src={cs.videoUrl}
              autoPlay
              muted
              loop
              playsInline
              controls
              className="w-full h-auto block"
            />
          </div>
        </section>
      )}

      {cs?.photos && cs.photos.length > 0 && (
        <section className="mt-14">
          <SectionHeading>Photos</SectionHeading>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {cs.photos.map((photo) => (
              <ZoomImage
                key={photo.src}
                src={photo.src}
                alt={project.title}
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
                  className="w-full h-auto block"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {cs?.tables?.map((t) => (
        <section key={t.title} className="mt-14">
          <SectionHeading>{t.title}</SectionHeading>
          <div className="overflow-x-auto rounded-lg border border-border-soft">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border-soft bg-background-soft">
                  {t.headers.map((h) => (
                    <th
                      key={h}
                      className="text-left px-4 py-3 font-medium text-foreground"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {t.rows.map((row, i) => (
                  <tr key={i} className="border-b border-border-soft last:border-0">
                    {row.map((cell, j) => (
                      <td key={j} className="px-4 py-3 text-foreground-muted">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ))}

      {project.link && (
        <section className="mt-14">
          <p className="max-w-measure text-foreground-muted">
            The full engineering is on{' '}
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              GitHub
            </a>
            .
          </p>
        </section>
      )}

      <nav
        className="mt-16 pt-8 border-t border-border-soft flex justify-between gap-4 text-sm"
        aria-label="Project navigation"
      >
        {prev ? (
          <Link
            href={`/projects/${prev.slug}`}
            className="text-accent hover:underline"
          >
            ← {prev.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/projects/${next.slug}`}
            className="text-accent hover:underline text-right"
          >
            {next.title} →
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </main>
  )
}
