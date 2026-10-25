// Types for project data. Each project lives in its own file next to this one
// and is registered in index.ts.

import type { Flow } from '@/components/site/flow-diagram'

export interface Project {
  title: string
  description: string
  tags: string[]
  link: string
  slug: string
  // Last significant content, structured-data, or link update (YYYY-MM-DD).
  lastModified: string
  category: 'personal' | 'hackathon'
  event?: string
  year?: string
  caseStudy: CaseStudy
}

// What every case study can show around its body: media, awards, tables.
export interface CaseStudyMedia {
  screenshots?: string[]
  photos?: { src: string; caption?: string }[]
  videoUrl?: string
  // YouTube demo. Leads the page when there is no thumbnail,
  // otherwise it lands in its own Demo section.
  youtubeId?: string
  // Local poster frame, so nothing loads from YouTube until play.
  youtubePoster?: string
  thumbnail?: string
  // Personal photo shown on the projects cards.
  // Falls back to thumbnail when not set.
  cardImage?: string
  // Optional Tailwind object-position class to frame the card crop,
  // e.g. 'object-[center_60%]'. Defaults to center.
  cardImagePos?: string
  // Optional short muted clip that loops on the card instead of a
  // static image. cardImage doubles as its poster frame.
  cardVideo?: string
  reportUrl?: string
  awards?: {
    title: string
    description: string
    // Hackathon prizes this award counts as, in the short form the prize
    // ticker shows. One award can hold two (OffBabel won two tracks).
    prizes?: string[]
  }[]
  tables?: {
    title: string
    headers: string[]
    rows: string[][]
  }[]
}

// The older layout: the problem, what I built, what it does. Projects move to
// a story one at a time, and this goes once none are left.
export interface ClassicBody {
  challenge: string
  approach: string
  features?: { title: string; description: string }[]
  story?: never
}

// The newer layout, told as a story.
export interface StoryBody {
  story: Story
  challenge?: never
  approach?: never
  features?: never
}

// A case study has its media plus exactly one body.
export type CaseStudy = CaseStudyMedia & (ClassicBody | StoryBody)

export interface Story {
  // One line that carries the whole idea.
  insight: string
  facts: { label: string; value: string }[]
  context: string
  flow: Flow
  // Teammates, credited by name with a link at the top. Projects are told as
  // the team's work: no individual roles or commit counts.
  team?: { name: string; url: string }[]
  decisions: { title: string; why: string; tradeoff: string }[]
  // A short story from the build, told in its own section.
  moment?: { title: string; text: string }
  // Only for limits a reader would not assume. Hackathon builds being
  // prototypes without logins goes without saying.
  limits?: string
}

// Gives a project file full type checking where it is written, and keeps its
// slug as a literal so links to it can be checked (see Slug in index.ts).
export function defineProject<const S extends string>(
  project: Project & { slug: S },
): Project & { slug: S } {
  return project
}
