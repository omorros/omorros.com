import type { FlowEdge, FlowNode } from '@/components/site/flow-diagram'
import type { Project, Story } from './schema'

// Checks on the project data that types cannot express. index.ts runs them
// whenever the data loads, so a mistake fails `next dev` and the Vercel build
// instead of shipping. Pure: no file system, so it runs anywhere.

const FEATURED_COUNT = 6
const MAX_COLS = 5
const MAX_ROWS = 3

export function flowProblems(where: string, flow: Story['flow']): string[] {
  const problems: string[] = []
  const nodes: readonly FlowNode[] = flow.nodes
  const edges: readonly FlowEdge[] = flow.edges
  const tones = new Set(Object.keys(flow.tones))
  const byId = new Map<string, FlowNode>()
  const cells = new Set<string>()
  for (const n of nodes) {
    if (byId.has(n.id)) problems.push(`${where}: two boxes have the id "${n.id}"`)
    byId.set(n.id, n)
    const cell = `${n.col},${n.row}`
    if (cells.has(cell)) problems.push(`${where}: two boxes share column ${n.col}, row ${n.row}`)
    cells.add(cell)
    if (n.tone && !tones.has(n.tone)) problems.push(`${where}: "${n.id}" uses the tone "${n.tone}", which is not declared`)
    if (n.col < 0 || n.col >= MAX_COLS) problems.push(`${where}: "${n.id}" is in column ${n.col}; use 0 to ${MAX_COLS - 1}`)
    if (n.row < 0 || n.row >= MAX_ROWS) problems.push(`${where}: "${n.id}" is in row ${n.row}; use 0 to ${MAX_ROWS - 1}`)
  }
  const seen = new Set<string>()
  const linked = new Set<string>()
  for (const [from, to, tone] of edges) {
    if (tone && !tones.has(tone)) problems.push(`${where}: the line ${from} to ${to} uses the tone "${tone}", which is not declared`)
    const a = byId.get(from)
    const b = byId.get(to)
    if (!a) problems.push(`${where}: a line starts at "${from}", which is not a box`)
    if (!b) problems.push(`${where}: a line ends at "${to}", which is not a box`)
    const key = `${from}>${to}`
    if (seen.has(key)) problems.push(`${where}: the line ${from} to ${to} is listed twice`)
    seen.add(key)
    linked.add(from)
    linked.add(to)
    // Lines must run in reading order: to a later column, or down within one.
    if (a && b && !(b.col > a.col || (b.col === a.col && b.row > a.row))) {
      problems.push(`${where}: the line ${from} to ${to} runs backwards; flows read left to right`)
    }
  }
  for (const n of nodes) {
    if (!linked.has(n.id)) problems.push(`${where}: "${n.id}" is not connected to anything`)
  }
  return problems
}

export function storyProblems(where: string, story: Story): string[] {
  const problems = flowProblems(`${where} diagram`, story.flow)
  if (story.decisions.length < 2 || story.decisions.length > 3) {
    problems.push(`${where}: ${story.decisions.length} decisions; use two or three`)
  }
  return problems
}

export function projectProblems(
  groups: Record<string, Project[]>,
  featured: Project[],
  hackathons: Project[],
  everyProject: Project[] = Object.values(groups).flat(),
): string[] {
  const problems: string[] = []
  const placed = new Map<string, string>()
  for (const [group, list] of Object.entries(groups)) {
    for (const p of list) {
      const other = placed.get(p.slug)
      if (other) problems.push(`"${p.slug}" is in both "${other}" and "${group}"; put it in one group`)
      placed.set(p.slug, group)
    }
  }
  for (const p of everyProject) {
    if (!placed.has(p.slug)) problems.push(`"${p.slug}" is imported but not in any group`)
  }
  for (const slug of Array.from(placed.keys())) {
    if (!everyProject.some((p) => p.slug === slug)) problems.push(`"${slug}" is in a group but missing from the project list`)
  }
  if (featured.length !== FEATURED_COUNT) {
    problems.push(`featured has ${featured.length} projects; /projects is laid out for ${FEATURED_COUNT}`)
  }
  for (const p of hackathons) {
    const prizes = (p.caseStudy?.awards ?? []).flatMap((a) => a.prizes ?? [])
    if (prizes.length === 0) problems.push(`"${p.slug}" is in the hackathons group but no award lists prizes`)
  }
  for (const list of Object.values(groups)) {
    for (const p of list) {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(p.lastModified) || Number.isNaN(Date.parse(p.lastModified))) {
        problems.push(`"${p.slug}": lastModified "${p.lastModified}" is not a YYYY-MM-DD date`)
      }
      const photos = p.caseStudy?.photos?.length ?? 0
      if (photos !== 0 && (photos < 2 || photos > 4)) {
        problems.push(`"${p.slug}": ${photos} photos; use two, three or four so the grid stays even`)
      }
      if (p.caseStudy?.story) problems.push(...storyProblems(`"${p.slug}"`, p.caseStudy.story))
    }
  }
  return problems
}

export function validateProjects(
  groups: Record<string, Project[]>,
  featured: Project[],
  hackathons: Project[],
  everyProject?: Project[],
) {
  const problems = projectProblems(groups, featured, hackathons, everyProject)
  if (problems.length > 0) {
    throw new Error(`Project data has ${problems.length} problem(s):\n- ${problems.join('\n- ')}`)
  }
}
