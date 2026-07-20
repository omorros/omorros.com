import type { Metadata } from 'next'
import { Container, Lead, Spacer, Title } from '@/components/site/ui'
import { TravelMap } from '@/components/site/TravelMap'

export const metadata: Metadata = {
  title: 'Traveling',
  description: 'A map of the countries Oriol Morros has lived in and visited.',
}

export default function TravelPage() {
  return (
    <main className="pb-32">
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
