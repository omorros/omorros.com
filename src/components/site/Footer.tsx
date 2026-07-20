import { GitHub, LinkedIn, Mail } from '@/components/site/logos'
import { siteConfig } from '@/lib/constants'

export function Footer() {
  return (
    <footer className="border-t border-gray-200">
      <div className="max-w-xl px-6 mx-auto lg:max-w-3xl lg:px-0 py-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-sm text-gray-500">
        <p>© {new Date().getFullYear()} Oriol Morros</p>
        <div className="flex items-center gap-5">
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hover:text-gray-800 transition-colors"
          >
            <GitHub className="h-4 w-4" />
          </a>
          <a
            href={siteConfig.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hover:text-gray-800 transition-colors"
          >
            <LinkedIn className="h-4 w-4" />
          </a>
          <a
            href={`mailto:${siteConfig.links.email}`}
            aria-label="Email"
            className="hover:text-gray-800 transition-colors"
          >
            <Mail className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  )
}
