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

// Facts the at a glance strip already takes from the project (derive.ts).
const DERIVED_FACTS = ['Event', 'Result']

export function storyProblems(where: string, story: Story): string[] {
  const problems = flowProblems(`${where} diagram`, story.flow)
  if (story.decisions.length < 2 || story.decisions.length > 3) {
    problems.push(`${where}: ${story.decisions.length} decisions; use two or three`)
  }
  for (const f of story.facts) {
    if (DERIVED_FACTS.includes(f.label)) {
      problems.push(`${where}: the "${f.label}" fact comes from the project's event and prizes; remove it from facts`)
    }
  }
  return problems
}

const prizesOf = (p: Project) => (p.caseStudy.awards ?? []).flatMap((a) => a.prizes ?? [])

// 'Voice AI Hack · London 2026': the header prints it as the meta line and
// /hackathons counts distinct events, so every build writes it the same way.
const EVENT = /^[^·]+ · [^·]+ \d{4}$/

// `hackathons` is the derived list /hackathons shows (index.ts).
export function projectProblems(groups: Record<string, Project[]>, hackathons: Project[]): string[] {
  const problems: string[] = []
  const placed = new Map<string, string>()
  for (const [group, list] of Object.entries(groups)) {
    for (const p of list) {
      const other = placed.get(p.slug)
      if (other) problems.push(`"${p.slug}" is in both "${other}" and "${group}"; put it in one group`)
      placed.set(p.slug, group)
    }
  }
  const featured = groups.featured ?? []
  if (featured.length !== FEATURED_COUNT) {
    problems.push(`featured has ${featured.length} projects; /projects is laid out for ${FEATURED_COUNT}`)
  }
  for (const p of groups.hackathons ?? []) {
    if (p.category !== 'hackathon') {
      problems.push(`"${p.slug}" is in the hackathons group but its category is "${p.category}"`)
    }
  }
  for (const p of hackathons) {
    if (prizesOf(p).length === 0) {
      problems.push(`"${p.slug}" is listed on /hackathons, which only lists wins, but no award lists prizes`)
    }
  }
  for (const p of Object.values(groups).flat()) {
    if (prizesOf(p).length > 0 && p.category !== 'hackathon') {
      problems.push(`"${p.slug}" has prizes but its category is "${p.category}"; wins are hackathon builds`)
    } else if (prizesOf(p).length > 0 && !hackathons.some((h) => h.slug === p.slug)) {
      problems.push(`"${p.slug}" has prizes but is in "${placed.get(p.slug)}"; put wins in featured or hackathons so /hackathons counts them`)
    }
    if (p.category === 'hackathon' && !p.event) problems.push(`"${p.slug}" is a hackathon build with no event`)
    if (p.event && !EVENT.test(p.event)) problems.push(`"${p.slug}": event "${p.event}" should read "Name · Place Year"`)
    if (!/^\d{4}-\d{2}-\d{2}$/.test(p.lastModified) || Number.isNaN(Date.parse(p.lastModified))) {
      problems.push(`"${p.slug}": lastModified "${p.lastModified}" is not a YYYY-MM-DD date`)
    }
    const cs = p.caseStudy
    for (const image of [cs.thumbnail, cs.cardImage, ...(cs.screenshots ?? []), ...(cs.photos ?? [])]) {
      if (image && !image.alt.trim()) problems.push(`"${p.slug}": ${image.src} has no description (alt)`)
    }
    const photos = cs.photos?.length ?? 0
    if (photos !== 0 && (photos < 2 || photos > 4)) {
      problems.push(`"${p.slug}": ${photos} photos; use two, three or four so the grid stays even`)
    }
    if (cs.story) problems.push(...storyProblems(`"${p.slug}"`, cs.story))
  }
  return problems
}

export function validateProjects(groups: Record<string, Project[]>, hackathons: Project[]) {
  const problems = projectProblems(groups, hackathons)
  if (problems.length > 0) {
    throw new Error(`Project data has ${problems.length} problem(s):\n- ${problems.join('\n- ')}`)
  }
}
