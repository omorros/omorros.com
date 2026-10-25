import { A, Container, Lead, Spacer, Title } from '@/components/site/ui'
import { JsonLd } from '@/components/site/JsonLd'
import { HackathonWinsCta } from '@/components/site/HackathonWinsCta'
import { CardImage, SmallCard } from '@/components/site/ProjectCards'
import { HACKATHON_WINS } from '@/data/hackathons'
import { getProjectBySlug } from '@/data/projects'
import { createPageMetadata } from '@/lib/metadata'
import { getCollectionJsonLd } from '@/lib/structured-data'

const description =
  'Personal projects and award-winning hackathon builds by Oriol Morros.'

export const metadata = createPageMetadata({
  title: 'Projects',
  description,
  path: '/projects',
})

// Page structure and classes follow pages/projects.js on samselikoff.com.

// Relevance order, mixing personal and hackathon work. Reorder these
// lists to change what shows up first.
const FEATURED = [
  'truevoice',
  'lantern',
  'wildscan',
  'offbabel',
  'snapshelf',
  'bk-shoot',
]
const MORE = [
  'deep-learning-cnn-comparison',
  'wikipedia-scraper',
  'university-library-system',
]

const projectsJsonLd = getCollectionJsonLd({
  name: 'Projects by Oriol Morros',
  description,
  path: '/projects',
  itemType: 'SoftwareSourceCode',
  items: [...FEATURED, ...MORE].flatMap((slug) => {
    const project = getProjectBySlug(slug)
    if (!project) return []
    return [
      {
        name: project.title,
        description: project.description,
        path: `/projects/${slug}`,
        image:
          project.caseStudy?.thumbnail ??
          project.caseStudy?.cardImage ??
          project.caseStudy?.screenshots?.[0],
      },
    ]
  }),
})

export default function ProjectsPage() {
  return (
    <main className="pb-8">
      <JsonLd data={projectsJsonLd} />
      <Container>
        <Spacer size="xl" />

        <Title>Projects</Title>

        <Spacer size="lg" />

        <Lead>
          I never really stop building. Most of these start as problems from
          my own life, like <A href="/projects/snapshelf">SnapShelf</A>, or
          small automations that make it a little easier. A lot of them I
          build to learn new tools, concepts, and approaches.
        </Lead>

        <Lead>
          Others come from hackathon weekends around London, where I go to
          learn, try new tools, network, and meet new people. Some of them
          ended in wins, and you can see every one on my{' '}
          <A href="/hackathons">hackathons page</A>.
        </Lead>

        <div className="md:mt-4">
          <div className="md:flex md:flex-wrap md:-mx-4">
            {FEATURED.map((slug) => (
              <div key={slug} className="mt-12 md:w-1/2 md:px-4">
                <CardImage slug={slug} />
              </div>
            ))}
          </div>

          <div className="mt-16 md:mt-24">
            <HackathonWinsCta wins={HACKATHON_WINS} />
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
