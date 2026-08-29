'use client'

import { useState } from 'react'

// Click-to-play YouTube. The poster is a local image, so nothing is
// requested from YouTube until someone actually presses play.
export function YouTubeEmbed({
  id,
  poster,
  title,
}: {
  id: string
  poster: string
  title: string
}) {
  const [playing, setPlaying] = useState(false)

  return (
    <div className="relative w-full aspect-video overflow-hidden rounded-lg border border-border-soft bg-background-soft">
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 w-full h-full border-0"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`Play ${title}`}
          className="group absolute inset-0 w-full h-full cursor-pointer"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={poster}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          <span className="absolute inset-0 bg-black/15 transition-colors group-hover:bg-black/5" />
          <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-lg transition-transform group-hover:scale-105">
            <svg
              viewBox="0 0 24 24"
              className="ml-1 h-7 w-7 fill-gray-900"
              aria-hidden="true"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </button>
      )}
    </div>
  )
}
