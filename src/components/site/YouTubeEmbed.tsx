'use client'

import { useState } from 'react'
import { PlayPoster } from '@/components/site/PlayPoster'

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
        <PlayPoster poster={poster} title={title} onPlay={() => setPlaying(true)} />
      )}
    </div>
  )
}
