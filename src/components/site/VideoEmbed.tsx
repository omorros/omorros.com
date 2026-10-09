'use client'

import { useEffect, useRef, useState } from 'react'
import { PlayPoster } from '@/components/site/PlayPoster'

// Click-to-play self-hosted video, styled like YouTubeEmbed. Nothing is
// downloaded on page load. Hovering or touching the poster starts buffering,
// so by the time the click lands the first seconds are usually ready.
export function VideoEmbed({
  src,
  poster,
  title,
  frame = 'border border-border-soft',
}: {
  src: string
  poster: string
  title: string
  // Outer treatment, so the player can match the photos around it.
  frame?: string
}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [warm, setWarm] = useState(false)
  const [playing, setPlaying] = useState(false)

  // Start buffering on the first sign of intent. Skipped once playing,
  // since play() loads the file itself and a load() would interrupt it.
  useEffect(() => {
    const video = videoRef.current
    if (warm && !playing && video && video.readyState === 0) video.load()
  }, [warm, playing])

  const play = () => {
    setWarm(true)
    setPlaying(true)
    videoRef.current?.play()
  }

  return (
    <div className={`relative w-full aspect-video overflow-hidden rounded-lg bg-background-soft ${frame}`}>
      <video
        ref={videoRef}
        src={src}
        title={title}
        preload={warm ? 'auto' : 'none'}
        controls={playing}
        playsInline
        className="absolute inset-0 w-full h-full bg-black"
      />
      {!playing && (
        <PlayPoster
          poster={poster}
          title={title}
          onPlay={play}
          onWarm={() => setWarm(true)}
        />
      )}
    </div>
  )
}
