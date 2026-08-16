import { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/constants'
import { projects } from '@/data/projects'
import { journal } from '@/data/journal'

const staticPages = [
  { path: '/', lastModified: '2026-08-16' },
  { path: '/projects', lastModified: '2026-08-16' },
  { path: '/work', lastModified: '2026-08-16' },
  { path: '/open-source', lastModified: '2026-08-16' },
  { path: '/journal', lastModified: '2026-08-16' },
] as const

export default function sitemap(): MetadataRoute.Sitemap {
  const projectPages = projects
    .filter((p) => p.slug)
    .map((p) => ({
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
