import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { siteConfig } from '@/lib/constants'
import { GitHub, LinkedIn, Mail, CV } from '@/components/site/logos'
import { A, Container, Lead, Spacer, Title } from '@/components/site/ui'

// Layout, spacing and type classes follow the samselikoff.com homepage.

const SOCIAL = [
  { href: siteConfig.links.github, label: 'GitHub', Icon: GitHub },
  { href: siteConfig.links.linkedin, label: 'LinkedIn', Icon: LinkedIn },
  { href: siteConfig.links.resume, label: 'CV', Icon: CV },
  { href: `mailto:${siteConfig.links.email}`, label: 'Email', Icon: Mail },
]

export default function Page() {
  return (
    <main>
      <Container>
        <Spacer size="xl" />

        <Title>Hola!</Title>

        <Spacer size="lg" />

        <Lead>
          I’m Oriol Morros, a software engineer building infrastructure for AI
          agents at Eli by Techbible in London.
        </Lead>
      </Container>

      <div className="mt-6 sm:hidden">
        <HomepageImage />
      </div>

      <Container>
        <div className="flex items-center justify-between mt-5 text-xs font-medium text-gray-700 sm:justify-start smm:justify-center smm:text-sm lg:text-base lg:mt-8">
          {SOCIAL.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.href.startsWith('mailto:') ? undefined : '_blank'}
              rel={
                l.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'
              }
              className="flex items-center hover:text-gray-800 smm:px-4 sm:pl-0 sm:pr-6 lg:pr-8"
            >
              <l.Icon className="h-4 w-4 mr-2" />
              <span>{l.label}</span>
            </a>
          ))}
        </div>

        <div className="hidden mt-12 sm:block">
          <HomepageImage className="rounded-lg" />
        </div>

        <div className="mt-16 md:text-lg lg:flex lg:flex-wrap lg:-mx-4">
          <div className="lg:w-1/2 lg:px-4">
            <Section>
              <SectionTitle link="/projects">Projects</SectionTitle>
              <SectionBody>
                <p>
                  I build things on my own time, like{' '}
                  <A href="/projects/snapshelf">SnapShelf</A> and{' '}
                  <A href="/projects/darkfleet">DarkFleet</A>. You can find all
                  of them <A href="/projects">here</A>.
                </p>
              </SectionBody>
            </Section>
          </div>

          <div className="lg:w-1/2 lg:px-4">
            <Section>
              <SectionTitle link="/hackathons">Hackathons</SectionTitle>
              <SectionBody>
                <p>
                  I compete in hackathons around London, building projects like{' '}
                  <A href="/projects/truevoice">TrueVoice</A> and{' '}
                  <A href="/projects/offbabel">OffBabel</A> in a weekend.
                </p>
              </SectionBody>
            </Section>
          </div>

          <div className="lg:w-1/2 lg:px-4">
            <Section>
              <SectionTitle link="/journal">Journal</SectionTitle>
              <SectionBody>
                <p>
                  Stories from away from the keyboard, like playing basketball
                  as a scholarship athlete while studying.
                </p>
              </SectionBody>
            </Section>
          </div>

          <div className="lg:w-1/2 lg:px-4">
            <Section>
              <SectionTitle>Work</SectionTitle>
              <SectionBody>
                <p>
                  Before Eli I worked at the University of Cambridge and
                  contributed to IBM’s MCP Context Forge open source project.
                </p>
              </SectionBody>
            </Section>
          </div>
        </div>
      </Container>

      <div className="mt-20 md:mt-32 lg:mt-48">
        <Container>
          <Title size="sm">Life</Title>
          <Lead>
            I grew up in Manresa, a small city near Barcelona, and moved to
            England in 2023 to study in Cambridge.
          </Lead>
          <Lead>I currently live in London + absolutely love it here!</Lead>
        </Container>
      </div>

      <div>
        <div className="mx-auto mt-16 xl:max-w-6xl">
          <ImageCard
            src="/images/life/london.jpg"
            title="London"
            date="2026–Present"
          />
          <div className="flex xl:mt-10 xl:-mx-6">
            <div className="w-1/2 xl:px-6">
              <ImageCard
                src="/images/life/cambridge.jpg"
                title="Cambridge"
                date="2023–2026"
                aspect="aspect-square object-[center_60%]"
              />
            </div>
            <div className="w-1/2 xl:px-6">
              <ImageCard
                src="/images/life/manresa.jpg"
                title="Manresa"
                date="2005–2023"
                aspect="aspect-square object-[90%_center]"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16" />
    </main>
  )
}

function HomepageImage({ className = '' }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/images/oriol-market.jpeg"
      alt="Oriol Morros"
      className={`${className} w-full`}
    />
  )
}

function Section({ children }: { children: React.ReactNode }) {
  return <section className="mt-10 md:mt-16 lg:mt-20">{children}</section>
}

function SectionTitle({
  link,
  children,
}: {
  link?: string
  children: React.ReactNode
}) {
  const heading = (
    <h2 className="text-2xl font-semibold text-gray-900 md:text-2xl lg:text-2-5xl">
      {children}
      {link && (
        <ChevronRight
          className="inline w-4 h-4 ml-1 md:w-5 md:h-5 lg:w-6 lg:h-6"
          aria-hidden="true"
        />
      )}
    </h2>
  )

  if (link) {
    return (
      <Link href={link} className="inline-block">
        {heading}
      </Link>
    )
  }
  return heading
}

function SectionBody({ children }: { children: React.ReactNode }) {
  return <div className="mt-2 md:mt-4 lg:mt-6">{children}</div>
}

function ImageCard({
  src,
  title,
  date,
  aspect = 'aspect-[16/9]',
}: {
  src: string
  title: string
  date: string
  aspect?: string
}) {
  return (
    <div className="relative">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className={`object-cover w-full h-full xl:rounded-lg ${aspect}`}
        src={src}
        alt={title}
      />
      <div className="absolute bottom-0 w-full py-2 pl-3 text-white md:pl-4 md:py-4 bg-gradient-to-t from-black-85 xl:bg-none xl:static xl:text-gray-900 xl:px-0">
        <p className="text-sm font-semibold sm:text-base xl:text-lg xl:font-medium">
          {title}
        </p>
        <p className="text-xs sm:text-sm xl:text-gray-700">{date}</p>
      </div>
    </div>
  )
}
