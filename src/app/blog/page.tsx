import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Writing by Oriol Morros on software and AI.',
}

export default function BlogPage() {
  return (
    <main className="max-w-2xl mx-auto px-6 pt-16 md:pt-24">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
        Blog
      </h1>
      <p className="mt-6 max-w-measure text-foreground-muted text-lg">
        I’m starting to write about software, AI, and what I’m building.
        Nothing published yet. Check back soon.
      </p>
    </main>
  )
}
