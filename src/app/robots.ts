import { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/constants'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/*'], // Disallow API routes if any
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  }
}
