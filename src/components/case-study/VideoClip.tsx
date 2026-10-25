// A muted, looping clip with controls, framed like the other case study media.
export function VideoClip({ src, className }: { src: string; className?: string }) {
  return (
    <div className={`${className ? `${className} ` : ''}rounded-lg overflow-hidden border border-border-soft bg-background-soft`}>
      <video
        src={src}
        autoPlay
        muted
        loop
        playsInline
        controls
        className="w-full h-auto block"
      />
    </div>
  )
}
