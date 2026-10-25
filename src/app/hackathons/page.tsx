import { Container, Lead, Spacer, Title } from '@/components/site/ui'
import { JsonLd } from '@/components/site/JsonLd'
import { BackLink } from '@/components/site/BackLink'
import { CardImage } from '@/components/site/ProjectCards'
import { HACKATHON_SLUGS, HACKATHON_WINS } from '@/data/hackathons'
import { getProjectBySlug } from '@/data/projects'
import { createPageMetadata } from '@/lib/metadata'
import { getCollectionJsonLd } from '@/lib/structured-data'

const description = `Hackathon wins by Oriol Morros: ${HACKATHON_WINS} wins at ${HACKATHON_SLUGS.length} hackathons in London, 2026.`

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
  items: HACKATHON_SLUGS.flatMap((slug) => {
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
          {`${HACKATHON_WINS} wins at ${HACKATHON_SLUGS.length} hackathons in London, 2026.`}
        </Lead>

        <div className="mb-32 md:mt-4">
          <div className="md:flex md:flex-wrap md:-mx-4">
            {HACKATHON_SLUGS.map((slug) => (
              <div key={slug} className="mt-12 md:w-1/2 md:px-4">
                <CardImage slug={slug} showCategory={false} allAwards />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </main>
  )
}
