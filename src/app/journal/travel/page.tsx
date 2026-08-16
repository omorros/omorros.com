import { Container, Lead, Spacer, Title } from '@/components/site/ui'
import { JsonLd } from '@/components/site/JsonLd'
import { TravelMap } from '@/components/site/TravelMap'
import { createPageMetadata } from '@/lib/metadata'
import { getWebPageJsonLd } from '@/lib/structured-data'

const description =
  'A map of the countries Oriol Morros has lived in and visited.'

export const metadata = createPageMetadata({
  title: 'Traveling',
  description,
  path: '/journal/travel',
})

const travelJsonLd = getWebPageJsonLd({
  name: 'Traveling | Oriol Morros Vilaseca',
  description,
  path: '/journal/travel',
})

export default function TravelPage() {
  return (
    <main className="pb-32">
      <JsonLd data={travelJsonLd} />
      <Container>
        <Spacer size="xl" />

        <Title>Traveling</Title>

        <Spacer size="lg" />

        <Lead>
          A small checklist of the countries I have been to so far. Click one
          for photos and the story.
        </Lead>

        <div className="mt-10">
          <TravelMap />
        </div>
      </Container>
    </main>
  )
}
