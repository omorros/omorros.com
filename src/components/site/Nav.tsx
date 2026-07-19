import Link from 'next/link'

// Header structure and classes follow samselikoff.com.
const LINKS = [
  { href: '/projects', label: 'Projects' },
  { href: '/work', label: 'Work' },
  { href: '/journal', label: 'Journal' },
]

export function Nav() {
  return (
    <header className="px-6">
      <div className="pt-4 mx-auto max-w-7xl md:pt-6 xl:pt-8">
        <div className="flex justify-between pb-4 md:pb-0 md:border-b md:border-gray-200 md:justify-start">
          <Link
            href="/"
            className="text-sm font-light tracking-wide uppercase md:text-base lg:text-xl"
          >
            Oriol<span className="font-bold">Morros</span>
          </Link>
          <div className="flex items-center ml-auto">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="pb-4 ml-6 -mb-px text-gray-600 border-b border-transparent xl:pb-6 lg:ml-8 lg:text-base xl:text-lg hover:text-gray-900"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}
