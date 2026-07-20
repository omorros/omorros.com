'use client'

import { useEffect, useState } from 'react'
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from 'react-simple-maps'
import { Minus, Plus, X } from 'lucide-react'
import { countries, type CountryVisit } from '@/data/travel'

const GEO_URL = '/maps/countries-50m.json'

const byName = new Map(countries.map((c) => [c.name, c]))

const FILL = '#3b82f6' // blue-500
const FILL_HOVER = '#2563eb' // blue-600
const FILL_NONE = '#f3f4f6' // gray-100

const WORLD = { coordinates: [10, 40] as [number, number], zoom: 1 }
const EUROPE = { coordinates: [12, 51] as [number, number], zoom: 4.5 }

function flagEmoji(alpha2: string) {
  return String.fromCodePoint(
    ...alpha2
      .toUpperCase()
      .split('')
      .map((c) => 0x1f1e6 + c.charCodeAt(0) - 65)
  )
}

function CountryPopup({
  country,
  onClose,
}: {
  country: CountryVisit
  onClose: () => void
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={country.name}
    >
      <div
        className="w-full max-w-md rounded-xl bg-white shadow-xl p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xl font-semibold text-gray-900">
              {flagEmoji(country.alpha2)} {country.name}
            </p>
            {country.years && (
              <p className="mt-1 text-sm font-medium text-blue-500">
                {country.years}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="rounded-full p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {country.note && (
          <p className="mt-3 text-sm text-gray-700">{country.note}</p>
        )}

        {country.photos && country.photos.length > 0 && (
          <div className="mt-4 grid grid-cols-2 gap-2">
            {country.photos.map((src) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={src}
                src={src}
                alt={country.name}
                className="w-full aspect-[4/3] object-cover rounded-lg"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export function TravelMap() {
  const [selected, setSelected] = useState<CountryVisit | null>(null)
  const [hovered, setHovered] = useState<string | null>(null)
  const [position, setPosition] = useState(WORLD)

  const zoomBy = (factor: number) =>
    setPosition((p) => ({
      ...p,
      zoom: Math.min(12, Math.max(1, p.zoom * factor)),
    }))

  const isEurope = position.zoom > 1

  return (
    <div>
      <div className="relative rounded-lg border border-gray-200 bg-white overflow-hidden">
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{ scale: 140 }}
          width={980}
          height={580}
          className="w-full h-auto"
          aria-label="Map of countries I have been to"
        >
          <ZoomableGroup
            center={position.coordinates}
            zoom={position.zoom}
            minZoom={1}
            maxZoom={12}
            onMoveEnd={({ coordinates, zoom }) =>
              setPosition({ coordinates, zoom })
            }
            // The published types say this receives an SVGElement, but the
            // library actually passes the d3 zoom event — hence the cast.
            filterZoomEvent={
              ((evt: Event) => {
                // A plain scroll or a one-finger swipe over the map should
                // keep scrolling the page; pinch and two-finger pan zoom it.
                if (evt.type === 'wheel') return (evt as WheelEvent).ctrlKey
                if (evt.type.startsWith('touch'))
                  return (evt as TouchEvent).touches.length >= 2
                return true
              }) as unknown as (element: SVGElement) => boolean
            }
          >
            <Geographies geography={GEO_URL}>
              {({ geographies }) =>
                geographies
                  .filter((geo) => geo.properties.name !== 'Antarctica')
                  .map((geo) => {
                    const visit = byName.get(geo.properties.name)
                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        onClick={visit ? () => setSelected(visit) : undefined}
                        onMouseEnter={() =>
                          visit && setHovered(geo.properties.name)
                        }
                        onMouseLeave={() => setHovered(null)}
                        style={{
                          default: {
                            fill: visit ? FILL : FILL_NONE,
                            stroke: '#e5e7eb',
                            strokeWidth: 0.4 / position.zoom,
                            outline: 'none',
                          },
                          hover: {
                            fill: visit ? FILL_HOVER : FILL_NONE,
                            stroke: '#e5e7eb',
                            strokeWidth: 0.4 / position.zoom,
                            outline: 'none',
                            cursor: visit ? 'pointer' : 'default',
                          },
                          pressed: {
                            fill: visit ? FILL_HOVER : FILL_NONE,
                            outline: 'none',
                          },
                        }}
                      />
                    )
                  })
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>

        {hovered && (
          <p className="pointer-events-none absolute bottom-3 left-4 rounded-full bg-gray-900/80 px-3 py-1 text-xs text-white">
            {hovered}
          </p>
        )}

        <div className="absolute top-3 right-3 flex items-center gap-1.5">
          <button
            onClick={() => setPosition(isEurope ? WORLD : EUROPE)}
            className="rounded-full border border-gray-200 bg-white/90 px-3 py-1 text-xs font-medium text-gray-700 hover:text-blue-500 hover:border-blue-300 transition-colors"
          >
            {isEurope ? 'World' : 'Europe'}
          </button>
          <button
            onClick={() => zoomBy(1.5)}
            aria-label="Zoom in"
            className="rounded-full border border-gray-200 bg-white/90 p-1.5 text-gray-700 hover:text-blue-500 hover:border-blue-300 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => zoomBy(1 / 1.5)}
            aria-label="Zoom out"
            className="rounded-full border border-gray-200 bg-white/90 p-1.5 text-gray-700 hover:text-blue-500 hover:border-blue-300 transition-colors"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <p className="mt-3 text-sm text-gray-500">
        <span className="font-medium text-gray-900">{countries.length}</span>{' '}
        countries
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {countries.map((c) => (
          <button
            key={c.name}
            onClick={() => setSelected(c)}
            className="rounded-full border border-gray-200 bg-white px-3 py-1 text-sm text-gray-700 hover:border-blue-300 hover:text-blue-500 transition-colors"
          >
            {flagEmoji(c.alpha2)} {c.name}
          </button>
        ))}
      </div>

      {selected && (
        <CountryPopup country={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  )
}
