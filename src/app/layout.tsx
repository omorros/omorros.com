import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import './globals.css'
import { siteConfig } from '@/lib/constants'
import { getSiteJsonLd } from '@/lib/structured-data'
import { JsonLd } from '@/components/site/JsonLd'
import { Nav } from '@/components/site/Nav'
import { Footer } from '@/components/site/Footer'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
})

const siteJsonLd = getSiteJsonLd()

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en-GB" className={inter.variable}>
      <head>
        <link rel="describedby" href={`${siteConfig.url}/llms.txt`} />
      </head>
      <body className="font-sans text-base antialiased text-gray-800 bg-white">
        <JsonLd data={siteJsonLd} />
        <Nav />
        {children}
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
