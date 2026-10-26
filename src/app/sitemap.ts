import { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/constants'
import { groups, hackathonProjects, projects, type Project } from '@/data/projects'
import { journal } from '@/data/journal'

// The newest of a page's own date and the projects it lists, so adding or
// editing a project also dates the page that shows its card.
function newest(pageDate: string, list: Project[]) {
  return [pageDate, ...list.map((p) => p.lastModified)].sort().at(-1)!
}

const staticPages = [
  { path: '/', lastModified: '2026-10-25' },
  { path: '/projects', lastModified: newest('2026-10-25', [...groups.featured, ...groups.more]) },
  { path: '/hackathons', lastModified: newest('2026-10-25', hackathonProjects) },
  { path: '/work', lastModified: '2026-10-11' },
  { path: '/open-source', lastModified: '2026-08-16' },
  { path: '/journal', lastModified: '2026-10-10' },
] as const

export default function sitemap(): MetadataRoute.Sitemap {
  const projectPages = projects.map((p) => ({
    url: `${siteConfig.url}/projects/${p.slug}`,
    lastModified: p.lastModified,
  }))

  const journalPages = journal.map((e) => ({
    url: `${siteConfig.url}/journal/${e.slug}`,
    lastModified: e.lastModified,
  }))

  return [
    ...staticPages.map(({ path, lastModified }) => ({
      url: new URL(path, `${siteConfig.url}/`).toString(),
      lastModified,
    })),
    ...projectPages,
    ...journalPages,
  ]
}
