import type { Metadata } from 'next'
import { projects, FEATURED_SLUGS, type Project } from '@/data/projects'
import { ProjectItem } from '@/components/site/ProjectItem'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Personal projects and hackathon builds by Oriol Morros.',
}

const featuredRank = (p: Project): number => {
  const idx = (FEATURED_SLUGS as readonly string[]).indexOf(p.slug ?? '')
  return idx === -1 ? Number.POSITIVE_INFINITY : idx
}

const byFeatured = (a: Project, b: Project) => featuredRank(a) - featuredRank(b)

export default function ProjectsPage() {
  const hackathon = projects
    .filter((p) => p.category === 'hackathon')
    .sort(byFeatured)
  const personal = projects
    .filter((p) => p.category === 'personal')
    .sort(byFeatured)

  return (
    <main className="max-w-2xl mx-auto px-6 pt-16 md:pt-24">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
        Projects
      </h1>
      <p className="mt-6 max-w-measure text-foreground-muted text-lg">
        Things I have built at hackathons and on my own time.
      </p>

      <section className="mt-16">
        <h2 className="text-xl font-semibold text-foreground">Hackathons</h2>
        <ul className="mt-6 space-y-8">
          {hackathon.map((p) => (
            <ProjectItem key={p.slug ?? p.title} project={p} />
          ))}
        </ul>
      </section>

      <section className="mt-16">
        <h2 className="text-xl font-semibold text-foreground">Personal</h2>
        <ul className="mt-6 space-y-8">
          {personal.map((p) => (
            <ProjectItem key={p.slug ?? p.title} project={p} />
          ))}
        </ul>
      </section>
    </main>
  )
}
