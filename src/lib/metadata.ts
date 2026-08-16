import type { Metadata } from 'next'
import { siteConfig } from '@/lib/constants'

const socialImageSize = {
  width: 1200,
  height: 630,
}

interface PageMetadataOptions {
  title: string
  description: string
  path: string
  absoluteTitle?: boolean
  kind?: 'article' | 'profile' | 'website'
  image?: string
  imageAlt?: string
}

export function absoluteUrl(path = '/') {
  return new URL(path, siteConfig.url).toString()
}

export function createPageMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
  kind = 'website',
  image = '/opengraph-image',
  imageAlt = `Browser-style portfolio preview for ${siteConfig.name}`,
}: PageMetadataOptions): Metadata {
  const canonical = absoluteUrl(path)
  const socialTitle = absoluteTitle ? title : `${title} | ${siteConfig.name}`
  const socialImage = absoluteUrl(image)
  const sharedOpenGraph = {
    locale: 'en_GB',
    url: canonical,
    title: socialTitle,
    description,
    siteName: siteConfig.name,
    images: [
      {
        url: socialImage,
        ...socialImageSize,
        type: 'image/png',
        alt: imageAlt,
      },
    ],
  }

  const openGraph: Metadata['openGraph'] =
    kind === 'profile'
      ? {
          ...sharedOpenGraph,
          type: 'profile',
          firstName: 'Oriol',
          lastName: 'Morros Vilaseca',
          username: 'omorros',
        }
      : kind === 'article'
        ? {
            ...sharedOpenGraph,
            type: 'article',
            authors: [siteConfig.url],
            section: 'Journal',
          }
        : {
            ...sharedOpenGraph,
            type: 'website',
          }

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph,
    twitter: {
      card: 'summary_large_image',
      title: socialTitle,
      description,
      images: [
        {
          url: socialImage,
          type: 'image/png',
          alt: imageAlt,
        },
      ],
    },
  }
}
