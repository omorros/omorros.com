import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { getProjectBySlug } from '@/data/projects'

// Cards shared by the projects and hackathons pages.

function CategoryBadge({ category }: { category: 'personal' | 'hackathon' }) {
  return (
    <span className="inline-block rounded-full bg-gray-100 px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide text-gray-500">
      {category === 'hackathon' ? 'Hackathon' : 'Personal'}
    </span>
  )
}

export function CardImage({
  slug,
  showCategory = true,
  allAwards = false,
}: {
  slug: string
  showCategory?: boolean
  // Lists every award instead of the first, for builds with two prizes.
  allAwards?: boolean
}) {
  const p = getProjectBySlug(slug)
  if (!p) return null
  const src =
    p.caseStudy?.cardImage ||
    p.caseStudy?.thumbnail ||
    p.caseStudy?.screenshots?.[0] ||
    '/images/card-placeholder.svg'
  const awards = p.caseStudy?.awards ?? []
  const subtitle =
    (allAwards && awards.length > 0
      ? awards.map((a) => a.title).join(' \u00b7 ')
      : awards[0]?.title) ??
    p.event ??
    (p.year ? p.year : undefined)
  return (
    <Link href={`/projects/${p.slug}`} className="group block">
      {p.caseStudy?.cardVideo ? (
        <video
          src={p.caseStudy.cardVideo}
          poster={p.caseStudy?.cardImage}
          autoPlay
          muted
          loop
          playsInline
          className={`rounded-lg shadow-lg w-full aspect-[16/10] object-cover group-hover:shadow-xl transition-shadow ${p.caseStudy?.cardImagePos ?? ''}`}
        />
      ) : (
        <div className="relative overflow-hidden rounded-lg shadow-lg aspect-[16/10] group-hover:shadow-xl transition-shadow">
          <Image
            src={src}
            alt={p.title}
            fill
            quality={90}
            sizes="(min-width: 1024px) 368px, (min-width: 768px) 248px, calc(100vw - 48px)"
            unoptimized={src.endsWith('.svg')}
            className={`object-cover ${p.caseStudy?.cardImagePos ?? ''}`}
          />
        </div>
      )}
      <div className="mt-3">
        <p className="font-semibold text-gray-900 group-hover:text-blue-500 transition-colors">
          {p.title}
          <ChevronRight
            className="inline w-4 h-4 ml-1 align-[-2px]"
            aria-hidden="true"
          />
        </p>
        <p className="mt-1 text-sm text-gray-700">{p.description}</p>
        <p className="mt-2 flex items-center gap-2 text-sm text-gray-500">
          {showCategory && <CategoryBadge category={p.category} />}
          {subtitle && <span>{subtitle}</span>}
        </p>
      </div>
    </Link>
  )
}

export function SmallCard({ slug }: { slug: string }) {
  const p = getProjectBySlug(slug)
  if (!p) return null
  const subtitle = p.caseStudy?.awards?.[0]?.title ?? p.event ?? p.year
  return (
    <Link
      href={`/projects/${p.slug}`}
      className="flex flex-col items-center justify-center h-24 px-4 mt-4 leading-snug text-center bg-white rounded shadow group"
    >
      <p className="font-medium text-gray-600 group-hover:text-gray-700">
        {p.title}
      </p>
      {subtitle && (
        <p className="mt-1 text-xs text-gray-500 line-clamp-2">{subtitle}</p>
      )}
    </Link>
  )
}
