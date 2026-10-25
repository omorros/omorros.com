import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import {
  CaseStudyHeader,
  ClassicBody,
  DataTables,
  HeroMedia,
  MediaSections,
  ProjectPager,
  StoryBody,
} from '@/components/case-study'
import { JsonLd } from '@/components/site/JsonLd'
import { getProjectBySlug, pagerFor, projects } from '@/data/projects'
import { missingFiles } from '@/data/projects/check-files'
import { createPageMetadata } from '@/lib/metadata'
import { getProjectJsonLd } from '@/lib/structured-data'

interface PageProps {
  params: { slug: string }
}

export function generateStaticParams() {
  const missing = missingFiles(projects)
  if (missing.length > 0) throw new Error(`Missing project files:\n- ${missing.join('\n- ')}`)
  return projects.map((p) => ({ slug: p.slug }))
}

export function generateMetadata({ params }: PageProps): Metadata {
  const project = getProjectBySlug(params.slug)
  if (!project) notFound()
  return createPageMetadata({
    title: project.title,
    description: project.description,
    path: `/projects/${project.slug}`,
    image: `/projects/${project.slug}/opengraph-image`,
    imageAlt: `Browser-style project preview for ${project.title} by Oriol Morros`,
  })
}

export default function ProjectDetailPage({ params }: PageProps) {
  const project = getProjectBySlug(params.slug)
  if (!project) notFound()
  const cs = project.caseStudy
  const { prev, next } = pagerFor(project.slug)

  return (
    <main className="max-w-2xl mx-auto px-6 pt-16 md:pt-24">
      <JsonLd data={getProjectJsonLd(project)} />
      <CaseStudyHeader project={project} />
      <HeroMedia project={project} />
      {cs.story ? <StoryBody story={cs.story} /> : <ClassicBody body={cs} />}
      <MediaSections project={project} />
      {cs.tables && <DataTables tables={cs.tables} />}

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

      <ProjectPager prev={prev} next={next} />
    </main>
  )
}
