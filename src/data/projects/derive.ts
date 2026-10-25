import type { Img, Project, Story } from './schema'

// Values a project shows in more than one place, decided once: its card
// image, badge, prizes, facts at a glance and share data. The case study's
// hero and media sections read caseStudy directly (components/case-study).

export const PLACEHOLDER_IMAGE = '/images/card-placeholder.svg'

// The image that stands for the project in search results and share data.
export function shareImage(p: Project): Img | undefined {
  return p.caseStudy.thumbnail ?? p.caseStudy.cardImage ?? p.caseStudy.screenshots?.[0]
}

// The image on its card, which prefers the card photo over the hero.
export function cardImage(p: Project): Img {
  return (
    p.caseStudy.cardImage ??
    p.caseStudy.thumbnail ??
    p.caseStudy.screenshots?.[0] ?? { src: PLACEHOLDER_IMAGE, alt: p.title }
  )
}

// The line under a card's title and on its share image: its first award,
// otherwise its event, otherwise its year.
export function badge(p: Project) {
  return p.caseStudy?.awards?.[0]?.title ?? p.event ?? p.year
}

// Every award on one line, for builds that won more than one prize.
export function allAwardsBadge(p: Project) {
  const awards = p.caseStudy?.awards ?? []
  return awards.length > 0 ? awards.map((a) => a.title).join(' · ') : badge(p)
}

// Every prize the project won, across its awards.
export function prizes(p: Project) {
  return (p.caseStudy.awards ?? []).flatMap((a) => a.prizes ?? [])
}

// The event's name without its place and year ('Voice AI Hack').
export function eventName(p: Project) {
  return p.event?.split(' \u00b7 ')[0]
}

// The event's name and place, without the year ('Voice AI Hack, London').
export function eventAndPlace(p: Project) {
  if (!p.event) return undefined
  const [name, where] = p.event.split(' \u00b7 ')
  return `${name}, ${where.replace(/\s*\d{4}$/, '')}`
}

// The at a glance strip: the event and what it won come from the project, so
// they never disagree with the badge; the rest is the story's own facts.
export function glanceFacts(p: Project, story: Story) {
  const won = prizes(p)
  const where = eventAndPlace(p)
  return [
    ...(where ? [{ label: 'Event', value: where }] : []),
    ...(won.length > 0 ? [{ label: 'Result', value: won.join(' and ') }] : []),
    ...story.facts,
  ]
}

// One entry in a page's list of projects for search engines.
export function listItem(p: Project) {
  return {
    name: p.title,
    description: p.description,
    path: `/projects/${p.slug}`,
    image: shareImage(p)?.src,
  }
}
