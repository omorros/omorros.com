import { A, Container, Lead, Spacer, Title } from '@/components/site/ui'
import { JsonLd } from '@/components/site/JsonLd'
import { HackathonWinsCta } from '@/components/site/HackathonWinsCta'
import { CardImage, SmallCard } from '@/components/site/ProjectCards'
import { HACKATHON_PRIZES } from '@/data/hackathons'
import { groups, listItem, projectHref } from '@/data/projects'
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

const projectsJsonLd = getCollectionJsonLd({
  name: 'Projects by Oriol Morros',
  description,
  path: '/projects',
  itemType: 'SoftwareSourceCode',
  items: [...groups.featured, ...groups.more].map(listItem),
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
          my own life, like <A href={projectHref('snapshelf')}>SnapShelf</A>, or
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
            {groups.featured.map((project) => (
              <div key={project.slug} className="mt-12 md:w-1/2 md:px-4">
                <CardImage project={project} />
              </div>
            ))}
          </div>

          <div className="mt-16 md:mt-24">
            <HackathonWinsCta prizes={HACKATHON_PRIZES} />
          </div>

          <div className="mt-16 mb-32 md:mt-24">
            <p className="text-2xl font-semibold md:text-2xl">More projects</p>

            <div className="flex flex-wrap mt-4 -mx-2">
              {groups.more.map((project) => (
                <div key={project.slug} className="w-full px-2 md:w-1/3">
                  <SmallCard project={project} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </main>
  )
}
