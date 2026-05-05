import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Trophy,
  FileText,
} from 'lucide-react'
import { projects } from '@/data/projects'

interface PageProps {
  params: { slug: string }
}

export function generateStaticParams() {
  return projects
    .filter((p) => p.slug)
    .map((p) => ({ slug: p.slug! }))
}

export function generateMetadata({ params }: PageProps): Metadata {
  const project = projects.find((p) => p.slug === params.slug)
  if (!project) return {}
  return {
    title: project.title,
    description: project.description,
  }
}

export default function ProjectDetailPage({ params }: PageProps) {
  const project = projects.find((p) => p.slug === params.slug)
  if (!project) notFound()

  const cs = project.caseStudy
  const heroMedia = cs?.thumbnail || cs?.screenshots?.[0]
  const galleryScreens =
    cs?.screenshots?.filter((s) => s !== heroMedia) ?? []

  return (
    <main className="relative max-w-4xl mx-auto px-6 pt-24 md:pt-32 pb-24 z-10">
      <Link
        href="/projects"
        className="inline-flex items-center gap-1.5 mb-10 font-mono text-[11px] uppercase tracking-[0.18em] text-foreground-muted hover:text-foreground transition-colors"
      >
        <ArrowLeft size={12} />
        <span>All projects</span>
      </Link>

      {/* Header */}
      <header className="mb-10">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="px-2.5 py-1 rounded-full bg-background-soft border border-border-soft text-[10px] font-mono uppercase tracking-[0.18em] text-foreground-muted">
            {project.category === 'hackathon' ? 'Hackathon' : 'Personal'}
          </span>
          {project.event && (
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-foreground-faint">
              {project.event}
            </span>
          )}
        </div>

        <h1 className="text-3xl md:text-5xl font-display font-medium text-foreground mb-4 leading-tight tracking-tight">
          {project.title}
        </h1>

        <p className="text-foreground-muted leading-relaxed text-base md:text-lg max-w-2xl mb-6">
          {project.description}
        </p>

        <div className="flex flex-wrap items-center gap-3">
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-border text-xs font-mono uppercase tracking-[0.15em] text-foreground-muted hover:text-foreground hover:border-foreground/40 transition-all active:scale-95"
            >
              <Github size={12} />
              <span>Code</span>
              <ExternalLink size={10} className="opacity-60" />
            </a>
          )}
          {cs?.reportUrl && (
            <a
              href={cs.reportUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-border text-xs font-mono uppercase tracking-[0.15em] text-foreground-muted hover:text-foreground hover:border-foreground/40 transition-all active:scale-95"
            >
              <FileText size={12} />
              <span>Report</span>
            </a>
          )}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-6">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-full bg-background-soft border border-border-soft text-[10px] font-semibold text-foreground-muted tracking-wide"
            >
              {tag}
            </span>
          ))}
        </div>
      </header>

      {/* Awards */}
      {cs?.awards && cs.awards.length > 0 && (
        <section className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-4">
          {cs.awards.map((a) => (
            <div
              key={a.title}
              className="rounded-2xl border border-amber-500/20 bg-amber-500/[0.03] p-5"
            >
              <div className="flex items-start gap-3">
                <div className="shrink-0 w-9 h-9 rounded-full bg-amber-500/15 flex items-center justify-center">
                  <Trophy size={16} className="text-amber-500" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold text-foreground leading-snug mb-1">
                    {a.title}
                  </h3>
                  <p className="text-xs text-foreground-muted leading-relaxed">
                    {a.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Hero media */}
      {(heroMedia || cs?.videoUrl) && (
        <div className="mb-12 rounded-2xl overflow-hidden border border-border bg-background-soft">
          {cs?.videoUrl ? (
            <video
              src={cs.videoUrl}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-auto block"
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={heroMedia!}
              alt={project.title}
              className="w-full h-auto block"
            />
          )}
        </div>
      )}

      {/* Challenge */}
      {cs?.challenge && (
        <Section label="Challenge" body={cs.challenge} />
      )}

      {/* Approach */}
      {cs?.approach && <Section label="Approach" body={cs.approach} />}

      {/* Features */}
      {cs?.features && cs.features.length > 0 && (
        <section className="mb-14">
          <SectionLabel>What it does</SectionLabel>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {cs.features.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border border-border-soft bg-background-soft/40 p-5"
              >
                <h3 className="text-sm font-semibold text-foreground mb-2 leading-snug">
                  {f.title}
                </h3>
                <p className="text-sm text-foreground-muted leading-relaxed">
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Screenshots gallery */}
      {galleryScreens.length > 0 && (
        <section className="mb-14">
          <SectionLabel>Gallery</SectionLabel>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {galleryScreens.map((src) => (
              <div
                key={src}
                className="rounded-2xl overflow-hidden border border-border bg-background-soft"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="" className="w-full h-auto block" />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Tables */}
      {cs?.tables?.map((t) => (
        <section key={t.title} className="mb-14">
          <SectionLabel>{t.title}</SectionLabel>
          <div className="rounded-2xl border border-border-soft overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-background-soft/60 border-b border-border-soft">
                    {t.headers.map((h) => (
                      <th
                        key={h}
                        className="text-left px-4 py-3 font-mono text-[10px] uppercase tracking-[0.15em] text-foreground-muted"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {t.rows.map((row, i) => (
                    <tr
                      key={i}
                      className="border-b border-border-soft last:border-0"
                    >
                      {row.map((cell, j) => (
                        <td
                          key={j}
                          className="px-4 py-3 text-foreground-muted"
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      ))}

      {/* Footer nav */}
      <div className="pt-8 border-t border-border-soft">
        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-foreground-muted hover:text-foreground transition-colors"
        >
          <ArrowLeft size={12} />
          <span>Back to all projects</span>
        </Link>
      </div>
    </main>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-foreground-faint mb-4">
      {children}
    </h2>
  )
}

function Section({ label, body }: { label: string; body: string }) {
  return (
    <section className="mb-12 max-w-2xl">
      <SectionLabel>{label}</SectionLabel>
      <p className="text-base md:text-lg text-foreground leading-relaxed text-pretty">
        {body}
      </p>
    </section>
  )
}
