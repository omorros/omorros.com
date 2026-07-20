import type { Metadata } from 'next'
import { A, Container, Lead, Spacer, Title } from '@/components/site/ui'
import { siteConfig } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Work',
  description:
    'What Oriol Morros works on: AI agent infrastructure at Eli by Techbible, and the road there.',
}

function Entry({
  when,
  role,
  title,
  images,
  children,
}: {
  when: string
  role?: string
  title: string
  images?: { src: string; alt: string; caption?: string }[]
  children: React.ReactNode
}) {
  return (
    <section className="mt-12 md:mt-16">
      <p className="text-sm text-gray-500">
        {when}
        {role && ` · ${role}`}
      </p>
      <h2 className="mt-1 text-2xl font-semibold text-gray-900">{title}</h2>
      <div className="mt-3 space-y-4 max-w-measure text-lg text-gray-700 md:text-xl">
        {children}
      </div>
      {images && images.length > 0 && (
        <div
          className={
            images.length > 1
              ? 'mt-5 grid grid-cols-2 gap-4 max-w-xl'
              : 'mt-5 max-w-sm'
          }
        >
          {images.map((img) => (
            <figure key={img.src}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.src}
                alt={img.alt}
                className={`w-full rounded-lg border border-gray-200 shadow-sm ${
                  images.length > 1 ? 'aspect-video object-cover object-top' : ''
                }`}
              />
              {img.caption && (
                <figcaption className="mt-1.5 text-sm text-gray-500">
                  {img.caption}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      )}
    </section>
  )
}

export default function WorkPage() {
  return (
    <main className="pb-8">
      <Container>
        <Spacer size="xl" />

        <Title>Work</Title>

        <Spacer size="lg" />

        <Lead>
          I’m a software engineer at Eli by Techbible in London, building
          infrastructure for AI agents.
        </Lead>

        <Entry
          when="2026 – Present"
          role="Software Engineer"
          title="Eli by Techbible"
        >
          <p>
            Building infrastructure for AI agents to manage SaaS and payments.
          </p>
        </Entry>

        <Entry
          when="Apr 2025 – Jun 2026"
          role="Digital Technician"
          title="University of Cambridge"
        >
          <p>
            I diagnosed and fixed hardware, software, and network faults
            across the university’s machines.
          </p>
        </Entry>

        <Entry
          when="Feb – Apr 2026"
          role="Web Developer"
          title="Festival Sant Fruitós"
          images={[
            {
              src: '/images/work/festival-old.jpg',
              alt: 'The old festival website',
              caption: 'Before',
            },
            {
              src: '/images/work/festival-new.jpg',
              alt: 'The rebuilt festival website',
              caption: 'After',
            },
          ]}
        >
          <p>
            I rebuilt the classical music festival’s legacy WordPress site on
            Next.js and TypeScript, cutting its hosting cost from around €173
            to €10 a year. You can visit{' '}
            <A href="https://www.festivalsantfruitos.com/">the site</A>.
          </p>
        </Entry>

        <Entry
          when="Feb – Apr 2026"
          role="Open Source Contributor"
          title="IBM MCP Context Forge"
        >
          <p>
            I have 18 merged pull requests in{' '}
            <A href="https://github.com/IBM/mcp-context-forge">
              MCP Context Forge
            </A>
            , IBM’s open source gateway for the Model Context Protocol, with
            over 4,000 stars on GitHub.
          </p>
          <p className="text-base">
            <A href="https://github.com/omorros/open-source">Case studies</A>
          </p>
        </Entry>

        <Entry when="2023 – 2026" title="BSc Software Engineering, ARU Cambridge">
          <p>
            I finished with First-Class Honours while playing as a{' '}
            <A href="/journal/basketball">basketball scholarship athlete</A>.
          </p>
        </Entry>

        <Entry when="2020 – 2023" title="Social media and e-commerce">
          <p>
            Before software, I grew a TikTok to 1.5M followers and built
            e-commerce businesses with influencers in Spain.{' '}
            <A href="/journal/social-media">The full story</A>.
          </p>
        </Entry>

        <div className="mt-16 mb-32 text-lg text-gray-700">
          <p>
            More detail on{' '}
            <A href={siteConfig.links.linkedin}>LinkedIn</A>.
          </p>
        </div>
      </Container>
    </main>
  )
}
