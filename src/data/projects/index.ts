// Every project on the site, one file each, named after its slug. To add one:
// create its file, import it below, and put it in exactly one group. To remove
// one: delete the file and its two lines here. A file left out of every group
// fails the build (check-files.ts), and so does bad data (validate.ts).

import type { Project } from './schema'
import { validateProjects } from './validate'
import hamywayCity from './hamyway-city'
import lantern from './lantern'
import echo from './echo'
import basket from './basket'
import offbabel from './offbabel'
import supconnect from './supconnect'
import truevoice from './truevoice'
import wildscan from './wildscan'
import gaslit from './gaslit'
import atlas from './atlas'
import snapshelf from './snapshelf'
import bkShoot from './bk-shoot'
import deepLearningCnnComparison from './deep-learning-cnn-comparison'
import wikipediaScraper from './wikipedia-scraper'
import universityLibrarySystem from './university-library-system'

export type { CaseStudy, ClassicBody, Img, Project, Story } from './schema'
export {
  allAwardsBadge,
  badge,
  cardImage,
  eventName,
  glanceFacts,
  listItem,
  PLACEHOLDER_IMAGE,
  prizes,
  shareImage,
} from './derive'

// The table of contents. The order inside a group is the order on the page.
export const groups = {
  // Big cards on /projects.
  featured: [truevoice, lantern, wildscan, offbabel, snapshelf, bkShoot],
  // Winning builds shown only on /hackathons.
  hackathons: [echo, hamywayCity, basket],
  // Small cards under "More projects" on /projects.
  more: [deepLearningCnnComparison, wikipediaScraper, universityLibrarySystem],
  // Live case study pages with no card anywhere.
  unlisted: [supconnect, gaslit, atlas],
} satisfies Record<string, Project[]>

// Every slug on the site. Linking to a project through projectHref means a
// renamed or removed project fails the type check instead of becoming a 404.
export type Slug = (typeof groups)[keyof typeof groups][number]['slug']

export function projectHref(slug: Slug) {
  return `/projects/${slug}`
}

// /hackathons lists every hackathon build from the first two groups, in order.
export const hackathonProjects = [...groups.featured, ...groups.hackathons].filter(
  (p) => p.category === 'hackathon',
)

// Where Back goes when the visitor did not arrive from the site: the page
// that lists the project, and /projects for unlisted ones.
export function backHref(p: Project) {
  return hackathonProjects.some((h) => h.slug === p.slug) ? '/hackathons' : '/projects'
}

// Every project in group order, which is also the order of the previous and
// next links on case study pages and of the sitemap.
export const projects: Project[] = Object.values(groups).flat()

export function getProjectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug)
}

// The previous and next links at the foot of a case study.
export function pagerFor(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug)
  return {
    prev: i > 0 ? projects[i - 1] : null,
    next: i >= 0 && i < projects.length - 1 ? projects[i + 1] : null,
  }
}

validateProjects(groups, hackathonProjects)
