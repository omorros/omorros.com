import type { Metadata } from 'next'
import Link from 'next/link'
import { A, Container, Lead, Spacer, Title } from '@/components/site/ui'
import { projects } from '@/data/projects'

export const metadata: Metadata = {
  title: 'Hackathons',
  description: 'Hackathon projects and wins by Oriol Morros.',
}

// Page structure and classes follow pages/projects.js on samselikoff.com.

const FEATURED = ['truevoice', 'offbabel', 'wildscan', 'darkfleet']
const MORE = ['gaslit', 'atlas']

function bySlug(slug: string) {
  return projects.find((p) => p.slug === slug)
}

function CardImage({ slug }: { slug: string }) {
  const p = bySlug(slug)
  if (!p) return null
  const src =
    p.caseStudy?.cardImage ||
    p.caseStudy?.thumbnail ||
    p.caseStudy?.screenshots?.[0]
  return (
    <Link href={`/projects/${p.slug}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={p.title}
        className={`rounded-lg shadow-lg w-full aspect-[16/10] object-cover ${p.caseStudy?.cardImagePos ?? ''}`}
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

export default function HackathonsPage() {
  return (
    <main className="pb-8">
      <Container>
        <Spacer size="xl" />

        <Title>Hackathons</Title>

        <Spacer size="lg" />

        <Lead>
          I spend a lot of weekends at hackathons around London, building a
          working product in a day or two.
        </Lead>

        <Lead>
          Two of them ended in wins: <A href="/projects/truevoice">TrueVoice</A>{' '}
          took first place at Voice AI Hack London 2026, and{' '}
          <A href="/projects/offbabel">OffBabel</A> won the Cosine track at the
          On-Device Agent Hackathon.
        </Lead>

        <Lead>
          <A href="/projects/wildscan">WILDSCAN</A> won the Unicorn Mafia and
          Techbible hack night, and <A href="/projects/darkfleet">DarkFleet</A>{' '}
          placed 6th of 64 teams at the Claude Hackathon at Imperial College.
        </Lead>

        <div className="md:mt-4">
          <div className="md:flex md:-mx-4">
            <div className="mt-12 md:w-1/2 md:mx-4">
              <CardImage slug={FEATURED[0]} />
            </div>
            <div className="mt-12 md:w-1/2 md:mx-4">
              <CardImage slug={FEATURED[1]} />
            </div>
          </div>
          <div className="md:flex md:-mx-4">
            <div className="mt-12 md:w-1/2 md:mx-4">
              <CardImage slug={FEATURED[2]} />
            </div>
            <div className="mt-12 md:w-1/2 md:mx-4">
              <CardImage slug={FEATURED[3]} />
            </div>
          </div>

          <div className="mt-16 mb-32 md:mt-24">
            <p className="text-2xl font-semibold md:text-2xl">
              More hackathons
            </p>

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
