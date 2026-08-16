import type { JournalEntry } from '@/data/journal'
import type { Project } from '@/data/projects'
import { siteConfig } from '@/lib/constants'
import { absoluteUrl } from '@/lib/metadata'

export type JsonLdObject = Record<string, unknown>

const homeUrl = absoluteUrl('/')
const websiteId = `${homeUrl}#website`
const personId = `${homeUrl}#person`

const websiteReference = { '@id': websiteId }
const personReference = { '@id': personId }

function absoluteAssetUrl(src?: string) {
  if (!src) return undefined
  return src.startsWith('http://') || src.startsWith('https://')
    ? src
    : absoluteUrl(src)
}

export function getSiteJsonLd(): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': websiteId,
        url: homeUrl,
        name: siteConfig.name,
        description: siteConfig.description,
        inLanguage: 'en-GB',
        publisher: personReference,
      },
      {
        '@type': 'Person',
        '@id': personId,
        name: siteConfig.name,
        alternateName: 'Oriol Morros',
        url: homeUrl,
        image: absoluteUrl('/images/oriol-home.jpg'),
        description: siteConfig.description,
        sameAs: [
          siteConfig.links.github,
          siteConfig.links.linkedin,
          'https://www.tiktok.com/@uriisss_',
        ],
        jobTitle: 'Software Engineer',
        email: siteConfig.links.email,
        worksFor: {
          '@type': 'Organization',
          name: 'Eli by Techbible',
        },
        alumniOf: {
          '@type': 'CollegeOrUniversity',
          name: 'Anglia Ruskin University',
        },
        hasCredential: {
          '@type': 'EducationalOccupationalCredential',
          name: 'BSc (Hons) Software Engineering, First-Class Honours',
          credentialCategory: "Bachelor's degree",
          recognizedBy: {
            '@type': 'CollegeOrUniversity',
            name: 'Anglia Ruskin University',
          },
        },
        knowsAbout: [
          'AI agents',
          'Software engineering',
          'TypeScript',
          'Python',
          'Next.js',
        ],
        homeLocation: {
          '@type': 'Place',
          name: 'London, United Kingdom',
        },
      },
    ],
  }
}

export function getHomeJsonLd(): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': `${homeUrl}#webpage`,
    url: homeUrl,
    name: siteConfig.title,
    description: siteConfig.description,
    inLanguage: 'en-GB',
    isPartOf: websiteReference,
    mainEntity: personReference,
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: absoluteUrl('/images/oriol-home.jpg'),
    },
  }
}

interface CollectionItem {
  name: string
  path: string
  description?: string
  image?: string
}

interface CollectionJsonLdOptions {
  name: string
  description: string
  path: string
  items: CollectionItem[]
  itemType: 'BlogPosting' | 'SoftwareSourceCode'
}

export function getCollectionJsonLd({
  name,
  description,
  path,
  items,
  itemType,
}: CollectionJsonLdOptions): JsonLdObject {
  const pageUrl = absoluteUrl(path)
  const pageId = `${pageUrl}#webpage`
  const listId = `${pageUrl}#item-list`

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': pageId,
        url: pageUrl,
        name,
        description,
        inLanguage: 'en-GB',
        isPartOf: websiteReference,
        mainEntity: { '@id': listId },
      },
      {
        '@type': 'ItemList',
        '@id': listId,
        name,
        numberOfItems: items.length,
        itemListElement: items.map((item, index) => {
          const itemUrl = absoluteUrl(item.path)
          const image = absoluteAssetUrl(item.image)
          const itemId = `${itemUrl}#${
            itemType === 'SoftwareSourceCode' ? 'software' : 'article'
          }`
          return {
            '@type': 'ListItem',
            position: index + 1,
            item: {
              '@type': itemType,
              '@id': itemId,
              url: itemUrl,
              ...(itemType === 'BlogPosting'
                ? { headline: item.name }
                : { name: item.name }),
              ...(item.description
                ? { description: item.description }
                : {}),
              ...(image ? { image } : {}),
            },
          }
        }),
      },
    ],
  }
}

export function getWebPageJsonLd({
  name,
  description,
  path,
}: {
  name: string
  description: string
  path: string
}): JsonLdObject {
  const pageUrl = absoluteUrl(path)

  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${pageUrl}#webpage`,
    url: pageUrl,
    name,
    description,
    inLanguage: 'en-GB',
    isPartOf: websiteReference,
    about: personReference,
  }
}

export function getProjectJsonLd(project: Project): JsonLdObject {
  if (!project.slug) {
    throw new Error('Project structured data requires a slug')
  }

  const pageUrl = absoluteUrl(`/projects/${project.slug}`)
  const pageId = `${pageUrl}#webpage`
  const projectId = `${pageUrl}#software`
  const image = absoluteAssetUrl(
    project.caseStudy?.thumbnail ??
      project.caseStudy?.cardImage ??
      project.caseStudy?.screenshots?.[0]
  )
  const awards = project.caseStudy?.awards?.map((award) => award.title) ?? []

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': pageId,
        url: pageUrl,
        name: project.title,
        description: project.description,
        inLanguage: 'en-GB',
        isPartOf: websiteReference,
        mainEntity: { '@id': projectId },
        ...(image
          ? {
              primaryImageOfPage: {
                '@type': 'ImageObject',
                url: image,
              },
            }
          : {}),
      },
      {
        '@type': 'SoftwareSourceCode',
        '@id': projectId,
        url: pageUrl,
        name: project.title,
        description: project.description,
        codeRepository: project.link,
        keywords: project.tags,
        author: personReference,
        mainEntityOfPage: { '@id': pageId },
        ...(image ? { image } : {}),
        ...(awards.length > 0 ? { award: awards } : {}),
      },
    ],
  }
}

export function getJournalEntryJsonLd(entry: JournalEntry): JsonLdObject {
  const pageUrl = absoluteUrl(`/journal/${entry.slug}`)
  const pageId = `${pageUrl}#webpage`
  const articleId = `${pageUrl}#article`
  const description = entry.tagline ?? entry.body[0]
  const image = absoluteAssetUrl(entry.cardImage)

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': pageId,
        url: pageUrl,
        name: entry.title,
        description,
        inLanguage: 'en-GB',
        isPartOf: websiteReference,
        mainEntity: { '@id': articleId },
        ...(image
          ? {
              primaryImageOfPage: {
                '@type': 'ImageObject',
                url: image,
              },
            }
          : {}),
      },
      {
        '@type': 'BlogPosting',
        '@id': articleId,
        url: pageUrl,
        headline: entry.title,
        description,
        ...(image ? { image } : {}),
        author: personReference,
        inLanguage: 'en-GB',
        isPartOf: { '@id': `${absoluteUrl('/journal')}#webpage` },
        mainEntityOfPage: { '@id': pageId },
      },
    ],
  }
}
