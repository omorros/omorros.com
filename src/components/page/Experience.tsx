'use client'

import { SectionHeader } from './SectionHeader'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'
import { WorkTimeline, type TimelineItem } from '@/components/ui/WorkTimeline'

const EXPERIENCE: TimelineItem[] = [
  {
    id: 'eli-2026',
    date: 'May 2026 - present',
    title: 'Eli by Techbible',
    subtitle: 'Software Engineer · London, UK · Hybrid',
    logo: '/techbible-logo.jpg',
    description:
      "Building infrastructure that lets ELI's AI agents act identically across vendor SaaS tools.",
    bullets: [
      'Built a shared connector framework (list users, list seats, get billing, create user, deactivate user, change role, reduce seats, cancel license) so ELI\'s AI agents behave identically across 12 vendor SaaS tools, whether routed via native API, Nango OAuth, or Okta SCIM.',
      'Shipped the native connectors for OpenAI and Anthropic and self-hosted Nango on Render to handle OAuth across Cursor, Jira, Slack, GitHub, Figma, Attio, and Linear, replacing 7 separate OAuth integrations with one.',
      'Wired the connector framework end-to-end into the Next.js frontend so the connect, list, and manage flows for all 12 vendors work from the UI, and built the Health Dashboard surfacing per-vendor connection status, last sync time, last action result, and token expiry.',
    ],
  },
  {
    id: 'cambridge-2025-2026',
    date: 'Apr - Jun 2025 & Mar 2026 - present',
    title: 'University of Cambridge',
    subtitle: 'Digital Technician · Cambridge, UK · On-site',
    logo: '/cambridge-logo.jpg',
    description:
      'Multi-venue IT infrastructure support across the University. Rehired for the current 2026 stint based on 2025 performance.',
    bullets: [
      'Diagnosed and resolved hardware, software, and network issues across 250+ PCs in high-pressure, zero-downtime environments, rehired for 2026 based on 2025 performance.',
      'Performed systematic device imaging, configuration, and deployment for a fleet of loan devices, and delivered first-line IT support across multiple venues under strict time-critical deadlines.',
    ],
  },
  {
    id: 'festival-sf-2026',
    date: 'Feb 2026 - Apr 2026',
    title: 'Festival Sant Fruitós',
    subtitle: 'Web Developer · Barcelona, Spain · Remote',
    logo: '/festival-sf-logo.png',
    description:
      'Migrated the festival website end-to-end onto a modern Next.js stack with full CI.',
    bullets: [
      'Migrated the festival\'s legacy WordPress site to a modern Next.js 16 + TypeScript stack with Tailwind CSS 4 and Framer Motion, cutting annual infrastructure cost by €160/yr (€173 → €10) via static hosting and a cheaper registrar.',
      'Built a GitHub Actions CI pipeline running lint, type-checks, and Playwright tests on every PR, plus automated dependency updates via Dependabot, catching regressions before merge across a 3-month build.',
    ],
    link: 'https://www.festivalsantfruitos.com/',
  },
  {
    id: 'ibm-mcp-context-forge-2026',
    date: 'Feb 2026 - Apr 2026',
    title: 'IBM MCP Context Forge',
    subtitle: 'Open Source Contributor · 18 merged PRs · 3.4k★',
    logo: '/ibm-logo.png',
    description:
      'Production fixes to a widely-used MCP gateway/proxy: error handling, performance under load, and security validation.',
    prCards: [
      {
        number: '#3371',
        badge: { label: 'P1 MUST', tone: 'red' },
        summary:
          'Fixed silent error masking in a multi-worker RPC gateway across session affinity. Propagated JSON-RPC errors, mapped non-JSON-RPC bodies to structured errors, added 6 test cases.',
        url: 'https://github.com/IBM/mcp-context-forge/pull/3371',
      },
      {
        number: '#3610',
        badge: { label: 'Release 1.0.0', tone: 'blue' },
        summary:
          'Resolved browser crashes at 20K+ users by replacing eager-load infinite scroll with search-first server-side filtering. Added SQL injection prevention via parametrised ILIKE.',
        url: 'https://github.com/IBM/mcp-context-forge/pull/3610',
      },
      {
        number: '#3785',
        badge: { label: 'Security', tone: 'amber' },
        summary:
          'Closed a security validation bypass where ToolUpdate lacked the forbidden-pattern check ToolCreate enforced. Added VALIDATION_STRICT behaviour with parametrised tests across 7 patterns.',
        url: 'https://github.com/IBM/mcp-context-forge/pull/3785',
      },
    ],
    prFooter: {
      label: 'View all 18 merged PRs',
      url: 'https://github.com/IBM/mcp-context-forge/pulls?q=is%3Apr+author%3Aomorros+is%3Amerged',
    },
  },
]

export function Experience() {
  return (
    <RevealOnScroll as="section" className="py-12">
      <SectionHeader title="Experience" />
      <div className="mt-6">
        <WorkTimeline items={EXPERIENCE} />
      </div>
    </RevealOnScroll>
  )
}
