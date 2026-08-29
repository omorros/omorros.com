import { A, Container, Lead, Spacer, Title } from '@/components/site/ui'
import { JsonLd } from '@/components/site/JsonLd'
import { siteConfig } from '@/lib/constants'
import { createPageMetadata } from '@/lib/metadata'
import { getWebPageJsonLd } from '@/lib/structured-data'

const description =
  'What Oriol Morros works on: full-stack engineering at Really Good Culture, and the road there.'

export const revalidate = 3600

export const metadata = createPageMetadata({
  title: 'Work',
  description,
  path: '/work',
})

const workJsonLd = getWebPageJsonLd({
  name: 'Work | Oriol Morros Vilaseca',
  description,
  path: '/work',
})

interface TenurePeriod {
  start: string
  end?: string
}

function monthIndex(value: string) {
  const match = /^(\d{4})-(0[1-9]|1[0-2])$/.exec(value)

  if (!match) {
    throw new Error(`Invalid tenure month: ${value}`)
  }

  return Number(match[1]) * 12 + Number(match[2]) - 1
}

function currentLondonMonthIndex() {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/London',
    year: 'numeric',
    month: '2-digit',
  }).formatToParts(new Date())
  const year = Number(parts.find((part) => part.type === 'year')?.value)
  const month = Number(parts.find((part) => part.type === 'month')?.value)

  return year * 12 + month - 1
}

function formatTenure(periods: TenurePeriod[], currentMonth: number) {
  const totalMonths = periods.reduce((total, period) => {
    const firstMonth = monthIndex(period.start)
    const lastMonth = period.end ? monthIndex(period.end) : currentMonth

    if (lastMonth < firstMonth) {
      throw new Error(`Tenure ends before it starts: ${period.start}`)
    }

    return total + lastMonth - firstMonth + 1
  }, 0)
  const years = Math.floor(totalMonths / 12)
  const months = totalMonths % 12
  const parts: string[] = []

  if (years) parts.push(`${years} ${years === 1 ? 'year' : 'years'}`)
  if (months) parts.push(`${months} ${months === 1 ? 'month' : 'months'}`)

  return parts.join(' ')
}

function Entry({
  when,
  role,
  duration,
  title,
  children,
}: {
  when: string
  role?: string
  duration?: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="mt-12 md:mt-16">
      <p className="text-sm text-gray-500">
        {when}
        {role && ` · ${role}`}
        {duration && ` · ${duration}`}
      </p>
      <h2 className="mt-1 text-2xl font-semibold text-gray-900">{title}</h2>
      <div className="mt-3 space-y-4 max-w-measure text-lg text-gray-700 md:text-xl">
        {children}
      </div>
    </section>
  )
}

export default function WorkPage() {
  const currentMonth = currentLondonMonthIndex()

  return (
    <main className="pb-8">
      <JsonLd data={workJsonLd} />
      <Container>
        <Spacer size="xl" />

        <Title>Work</Title>

        <Spacer size="lg" />

        <Lead>
          I’m a full stack engineer at Really Good Culture in London.
        </Lead>

        <Entry
          when="Jul 2026 – Present"
          role="Full Stack Engineer"
          duration={formatTenure([{ start: '2026-07' }], currentMonth)}
          title="Really Good Culture"
        >
          <p>Building predictive retail intelligence tools across the full stack.</p>
        </Entry>

        <Entry
          when="May 2026 – Aug 2026"
          role="Software Engineer"
          duration={formatTenure(
            [{ start: '2026-05', end: '2026-08' }],
            currentMonth,
          )}
          title="Eli by Techbible"
        >
          <p>
            Built infrastructure for AI agents to manage SaaS and payments.
          </p>
        </Entry>

        <Entry
          when="Apr 2025 – Jun 2026"
          role="Digital Technician"
          duration={formatTenure(
            [{ start: '2025-04', end: '2026-06' }],
            currentMonth,
          )}
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
          duration={formatTenure(
            [{ start: '2026-02', end: '2026-04' }],
            currentMonth,
          )}
          title="Festival Sant Fruitós"
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
          duration={formatTenure(
            [{ start: '2026-02', end: '2026-04' }],
            currentMonth,
          )}
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
            <A href="/open-source">Case studies</A>
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
