import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { A, Container, Lead, Spacer, Title } from '@/components/site/ui'
import { projects } from '@/data/projects'

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Personal projects and hackathon builds by Oriol Morros, including four hackathon wins around London.',
}

// Page structure and classes follow pages/projects.js on samselikoff.com.

// Relevance order, mixing personal and hackathon work. Reorder these
// lists to change what shows up first.
const FEATURED = [
  'truevoice',
  'offbabel',
  'wildscan',
  'basket',
  'snapshelf',
  'bk-shoot',
]
const MORE = [
  'darkfleet',
  'gaslit',
  'atlas',
  'deep-learning-cnn-comparison',
  'wikipedia-scraper',
  'university-library-system',
]

function bySlug(slug: string) {
  return projects.find((p) => p.slug === slug)
}

function CategoryBadge({ category }: { category: 'personal' | 'hackathon' }) {
  return (
    <span className="inline-block rounded-full bg-gray-100 px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide text-gray-500">
      {category === 'hackathon' ? 'Hackathon' : 'Personal'}
    </span>
  )
}

function CardImage({ slug }: { slug: string }) {
  const p = bySlug(slug)
  if (!p) return null
  const src =
    p.caseStudy?.cardImage ||
    p.caseStudy?.thumbnail ||
    p.caseStudy?.screenshots?.[0] ||
    '/images/card-placeholder.svg'
  const subtitle =
    p.caseStudy?.awards?.[0]?.title ?? p.event ?? (p.year ? p.year : undefined)
  const mediaClass = `rounded-lg shadow-lg w-full aspect-[16/10] object-cover group-hover:shadow-xl transition-shadow ${p.caseStudy?.cardImagePos ?? ''}`
  return (
    <Link href={`/projects/${p.slug}`} className="group block">
      {p.caseStudy?.cardVideo ? (
        <video
          src={p.caseStudy.cardVideo}
          poster={p.caseStudy?.cardImage}
          autoPlay
          muted
          loop
          playsInline
          className={mediaClass}
        />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={p.title} className={mediaClass} />
      )}
      <div className="mt-3">
        <p className="font-semibold text-gray-900 group-hover:text-blue-500 transition-colors">
          {p.title}
          <ChevronRight
            className="inline w-4 h-4 ml-1 align-[-2px]"
            aria-hidden="true"
          />
        </p>
        <p className="mt-1 text-sm text-gray-700">{p.description}</p>
        <p className="mt-2 flex items-center gap-2 text-sm text-gray-500">
          <CategoryBadge category={p.category} />
          {subtitle && <span>{subtitle}</span>}
        </p>
      </div>
    </Link>
  )
}

function SmallCard({ slug }: { slug: string }) {
  const p = bySlug(slug)
  if (!p) return null
  const subtitle = p.caseStudy?.awards?.[0]?.title ?? p.event ?? p.year
  return (
    <Link
      href={`/projects/${p.slug}`}
      className="flex flex-col items-center justify-center h-24 px-4 mt-4 leading-snug text-center bg-white rounded shadow group"
    >
      <p className="font-medium text-gray-600 group-hover:text-gray-700">
        {p.title}
      </p>
      {subtitle && (
        <p className="mt-1 text-xs text-gray-500 line-clamp-2">{subtitle}</p>
      )}
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
          I never really stop building. Most of these start as problems from
          my own life, like <A href="/projects/snapshelf">SnapShelf</A>, and
          automations that make it a little easier.
        </Lead>

        <Lead>
          The rest come from hackathon weekends around London, where I go to
          learn, try new tools, and meet people. A few ended in wins. All of
          them are on <A href={`https://github.com/omorros`}>my GitHub</A>.
        </Lead>

        <div className="md:mt-4">
          <div className="md:flex md:flex-wrap md:-mx-4">
            {FEATURED.map((slug) => (
              <div key={slug} className="mt-12 md:w-1/2 md:px-4">
                <CardImage slug={slug} />
              </div>
            ))}
          </div>

          <div className="mt-16 mb-32 md:mt-24">
            <p className="text-2xl font-semibold md:text-2xl">More projects</p>

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
