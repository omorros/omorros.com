import type { Metadata } from 'next'
import Link from 'next/link'
import { A, Container, Lead, Spacer, Title } from '@/components/site/ui'
import { projects } from '@/data/projects'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Personal projects by Oriol Morros.',
}

// Page structure and classes follow pages/projects.js on samselikoff.com.

const FEATURED = ['snapshelf', 'bk-shoot']
const MORE = [
  'deep-learning-cnn-comparison',
  'personal-web-portfolio',
  'wikipedia-scraper',
  'university-library-system',
]

function bySlug(slug: string) {
  return projects.find((p) => p.slug === slug)
}

function CardImage({ slug }: { slug: string }) {
  const p = bySlug(slug)
  if (!p) return null
  const src =
    p.caseStudy?.cardImage ||
    p.caseStudy?.thumbnail ||
    p.caseStudy?.screenshots?.[0] ||
    '/images/card-placeholder.svg'
  return (
    <Link href={`/projects/${p.slug}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={p.title}
        className="rounded-lg shadow-lg w-full aspect-[16/10] object-cover"
      />
    </Link>
  )
}

function SmallCard({ slug }: { slug: string }) {
  const p = bySlug(slug)
  if (!p) return null
  return (
    <Link
      href={`/projects/${p.slug}`}
      className="flex items-center justify-center h-24 px-4 mt-4 font-medium leading-snug text-center text-gray-600 bg-white rounded shadow hover:text-gray-700"
    >
      <p>{p.title}</p>
    </Link>
  )
}

export default function ProjectsPage() {
  return (
    <main className="pb-8">
      <Container>
        <Spacer size="xl" />

        <Title>Projects</Title>

        <Spacer size="lg" />

        <Lead>
          My favourite personal build is{' '}
          <A href="/projects/snapshelf">SnapShelf</A>, an app that tracks your
          kitchen inventory from photos and barcodes so less food goes to
          waste.
        </Lead>

        <Lead>
          Before that I built <A href="/projects/bk-shoot">BK-Shoot</A>, a
          basketball shot tracker made of Arduino sensors and an Android app,
          tested on about 2,000 real shots.
        </Lead>

        <Lead>
          The rest ranges from deep learning experiments to scrapers and
          university systems. All of them are on{' '}
          <A href={`https://github.com/omorros`}>my GitHub</A>.
        </Lead>

        <div className="md:mt-4">
          <div className="md:flex md:-mx-4">
            {FEATURED.map((slug) => (
              <div key={slug} className="mt-12 md:w-1/2 md:mx-4">
                <CardImage slug={slug} />
              </div>
            ))}
          </div>

          <div className="mt-16 mb-32 md:mt-24">
            <p className="text-2xl font-semibold md:text-2xl">Previous work</p>

            <div className="flex flex-wrap mt-4 -mx-2">
              {MORE.map((slug) => (
                <div key={slug} className="w-full px-2 md:w-1/3">
                  <SmallCard slug={slug} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </main>
  )
}
