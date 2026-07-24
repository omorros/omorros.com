import type { Metadata } from 'next'
import Image from 'next/image'
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
          Life away from the keyboard: basketball, social media, and whatever
          else feels worth telling.
        </Lead>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-12 mt-16 mb-32">
          {journal.map((e) => (
            <Link key={e.slug} href={`/journal/${e.slug}`} className="group block">
              <div className="relative overflow-hidden rounded-lg shadow-lg aspect-square group-hover:shadow-xl transition-shadow">
                <Image
                  src={e.cardImage}
                  alt={e.title}
                  fill
                  quality={90}
                  sizes="(min-width: 1024px) 368px, (min-width: 640px) 264px, calc(100vw - 48px)"
                  className={`object-cover ${e.cardImagePos ?? ''}`}
                />
              </div>
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
