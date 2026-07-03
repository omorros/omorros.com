import { places } from '@/data/life'
import type { Place } from '@/data/life'

function PlaceCard({ place }: { place: Place }) {
  return (
    <figure>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={place.photo}
        alt={place.alt}
        className="w-full rounded-lg object-cover aspect-[3/2] bg-background-soft"
      />
      <figcaption className="mt-2 text-sm text-foreground-muted">
        <span className="font-medium text-foreground">{place.city}</span>
        {' · '}
        {place.years}
      </figcaption>
    </figure>
  )
}

export function Life() {
  const [current, ...earlier] = places
  return (
    <section className="mt-20">
      <h2 className="text-xl font-semibold text-foreground">Life</h2>
      <div className="mt-4 space-y-4 max-w-measure text-foreground-muted">
        <p>
          I grew up in Manresa, a small city near Barcelona. In August 2023 I
          moved to England to study software engineering in Cambridge.
        </p>
        <p>
          In 2026 I moved to London, where I now live and work.
        </p>
      </div>
      <div className="mt-8 space-y-6">
        <PlaceCard place={current} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {earlier.map((p) => (
            <PlaceCard key={p.city} place={p} />
          ))}
        </div>
      </div>
    </section>
  )
}
