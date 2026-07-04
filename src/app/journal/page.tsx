import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { Container, Lead, Spacer, Title } from '@/components/site/ui'
import { journal } from '@/data/journal'

export const metadata: Metadata = {
  title: 'Journal',
  description: 'Stories from Oriol Morros away from the keyboard.',
}

export default function JournalPage() {
  return (
    <main className="pb-8">
      <Container>
        <Spacer size="xl" />

        <Title>Journal</Title>

        <Spacer size="lg" />

        <Lead>
          Stories from away from the keyboard. Basketball, travel, and
          whatever else feels worth telling.
        </Lead>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-12 mt-16 mb-32">
          {journal.map((e) => (
            <Link key={e.slug} href={`/journal/${e.slug}`} className="group block">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={e.cardImage}
                alt={e.title}
                className={`rounded-lg shadow-lg w-full aspect-square object-cover group-hover:shadow-xl transition-shadow ${e.cardImagePos ?? ''}`}
              />
              <div className="mt-3">
                <p className="font-semibold text-gray-900 group-hover:text-blue-500 transition-colors">
                  {e.title}
                  <ChevronRight
                    className="inline w-4 h-4 ml-1 align-[-2px]"
                    aria-hidden="true"
                  />
                </p>
                {e.tagline && (
                  <p className="text-sm text-gray-700">{e.tagline}</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </main>
  )
}
