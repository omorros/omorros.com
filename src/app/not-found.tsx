import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="max-w-2xl mx-auto px-6 pt-16 md:pt-24">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
        Page not found
      </h1>
      <p className="mt-6 max-w-measure text-foreground-muted text-lg">
        This page does not exist.
      </p>
      <Link href="/" className="mt-6 inline-block text-sm text-accent hover:underline">
        Back home
      </Link>
    </main>
  )
}
