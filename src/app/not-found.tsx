import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-black text-center text-white">
      <h2 className="mb-4 text-4xl font-bold">404 - Not Found</h2>
      <p className="mb-8 text-white/60">Could not find request resource</p>
      <Link
        href="/"
        className="rounded-full border border-white/20 px-6 py-2 transition-colors hover:bg-white/10"
      >
        Return Home
      </Link>
    </div>
  )
}
