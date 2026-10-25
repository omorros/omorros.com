import type { Project } from './schema'

// What a project shows in each place, decided once. Pages and cards ask these
// instead of reading caseStudy fields themselves.

export const PLACEHOLDER_IMAGE = '/images/card-placeholder.svg'

// The image that stands for the project: case study hero, share data.
export function heroImage(p: Project) {
  return p.caseStudy?.thumbnail ?? p.caseStudy?.cardImage ?? p.caseStudy?.screenshots?.[0]
}

// The image on its card, which prefers the card photo over the hero.
export function cardImage(p: Project) {
  return (
    p.caseStudy?.cardImage ||
    p.caseStudy?.thumbnail ||
    p.caseStudy?.screenshots?.[0] ||
    PLACEHOLDER_IMAGE
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

// The event's name without its place and year ('Voice AI Hack').
export function eventName(p: Project) {
  return p.event?.split(' \u00b7 ')[0]
}

// One entry in a page's list of projects for search engines.
export function listItem(p: Project) {
  return {
    name: p.title,
    description: p.description,
    path: `/projects/${p.slug}`,
    image: heroImage(p),
  }
}
