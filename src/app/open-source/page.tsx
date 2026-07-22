import type { Metadata } from 'next'
import { A, Container, Lead, Spacer, Title } from '@/components/site/ui'

export const metadata: Metadata = {
  title: 'Open Source',
  description:
    "Oriol Morros's open source work: 18 merged pull requests in IBM's MCP Context Forge.",
}

export default function OpenSourcePage() {
  return (
    <main className="pb-32">
      <Container>
        <Spacer size="xl" />

        <Title size="sm">Open Source</Title>

        <Spacer size="lg" />

        <Lead>
          I have 18 merged pull requests in{' '}
          <A href="https://github.com/IBM/mcp-context-forge">
            MCP Context Forge
          </A>
          , IBM&apos;s open source gateway for the Model Context Protocol, with
          over 4,000 stars on GitHub.
        </Lead>

        <Lead>
          I&apos;m writing up the case studies for this page. Until then, they
          live on <A href="https://github.com/omorros/open-source">GitHub</A>.
        </Lead>
      </Container>
    </main>
  )
}
