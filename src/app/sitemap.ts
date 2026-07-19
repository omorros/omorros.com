import { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/constants'
import { projects } from '@/data/projects'
import { journal } from '@/data/journal'

export default function sitemap(): MetadataRoute.Sitemap {
  const projectPages = projects
    .filter((p) => p.slug)
    .map((p) => ({
      url: `${siteConfig.url}/projects/${p.slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))

  const journalPages = journal.map((e) => ({
    url: `${siteConfig.url}/journal/${e.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }))

  return [
    {
      url: siteConfig.url,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${siteConfig.url}/projects`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/work`,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${siteConfig.url}/journal`,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    ...projectPages,
    ...journalPages,
  ]
}
