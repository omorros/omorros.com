import Image from 'next/image'

// Poster with a play button, shared by every click-to-play video. Nothing
// heavier than the poster loads until someone shows intent: `onWarm` fires
// on hover, focus, or the start of a tap, just before the click.
export function PlayPoster({
  poster,
  title,
  onPlay,
  onWarm,
}: {
  poster: string
  title: string
  onPlay: () => void
  onWarm?: () => void
}) {
  return (
    <button
      type="button"
      onClick={onPlay}
      onPointerEnter={onWarm}
      onPointerDown={onWarm}
      onFocus={onWarm}
      aria-label={`Play ${title}`}
      className="group absolute inset-0 w-full h-full cursor-pointer"
    >
      <Image
        src={poster}
        alt=""
        fill
        quality={90}
        sizes="(min-width: 1024px) 768px, (min-width: 640px) 528px, 100vw"
        unoptimized={poster.endsWith('.svg')}
        className="object-cover"
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
  )
}
