import { Container, Lead, Spacer, Title } from '@/components/site/ui'
import { JsonLd } from '@/components/site/JsonLd'
import { BackLink } from '@/components/site/BackLink'
import { CardImage } from '@/components/site/ProjectCards'
import { HACKATHON_COUNT, HACKATHON_WINS } from '@/data/hackathons'
import { hackathonProjects, listItem } from '@/data/projects'
import { createPageMetadata } from '@/lib/metadata'
import { getCollectionJsonLd } from '@/lib/structured-data'

const description = `Hackathon wins by Oriol Morros: ${HACKATHON_WINS} wins at ${HACKATHON_COUNT} hackathons in London, 2026.`

export const metadata = createPageMetadata({
  title: 'Hackathons',
  description,
  path: '/hackathons',
})

const hackathonsJsonLd = getCollectionJsonLd({
  name: 'Hackathon wins by Oriol Morros',
  description,
  path: '/hackathons',
  itemType: 'SoftwareSourceCode',
  items: hackathonProjects.map(listItem),
})

export default function HackathonsPage() {
  return (
    <main className="pb-8">
      <JsonLd data={hackathonsJsonLd} />
      <Container>
        <Spacer size="xl" />

        <div className="mb-6">
          <BackLink fallback="/projects" />
        </div>

        <Title>Hackathons</Title>

        <Spacer size="lg" />

        <Lead>
          {`${HACKATHON_WINS} wins at ${HACKATHON_COUNT} hackathons in London, 2026.`}
        </Lead>

        <div className="mb-32 md:mt-4">
          <div className="md:flex md:flex-wrap md:-mx-4">
            {hackathonProjects.map((project) => (
              <div key={project.slug} className="mt-12 md:w-1/2 md:px-4">
                <CardImage project={project} showCategory={false} allAwards />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </main>
  )
}
