import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import './globals.css'
import { siteConfig } from '@/lib/constants'
import { Nav } from '@/components/site/Nav'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
})

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: siteConfig.name,
  alternateName: 'Oriol Morros',
  url: siteConfig.url,
  description: siteConfig.description,
  sameAs: [siteConfig.links.github, siteConfig.links.linkedin],
  jobTitle: 'Software Engineer',
  worksFor: {
    '@type': 'Organization',
    name: 'Eli by Techbible',
  },
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'Anglia Ruskin University',
  },
  birthPlace: {
    '@type': 'Place',
    name: 'Manresa, Spain',
  },
  knowsAbout: [
    'AI agents',
    'Software engineering',
    'TypeScript',
    'Python',
    'Next.js',
  ],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'London',
    addressCountry: 'UK',
  },
}

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    'Software Engineer',
    'AI Engineer',
    'Developer',
    'London',
    'AI',
    'Machine Learning',
    'Full Stack',
    'Oriol Morros',
    'React',
    'Next.js',
    'TypeScript',
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: siteConfig.title,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: ['/opengraph-image'],
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
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans text-base antialiased text-gray-800 bg-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Nav />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
