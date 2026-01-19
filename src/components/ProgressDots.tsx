'use client'

interface ProgressDotsProps {
  total: number
  current: number
  onDotClick?: (index: number) => void
}

export function ProgressDots({ total, current, onDotClick }: ProgressDotsProps) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: total }).map((_, idx) => (
        <button
          key={idx}
          onClick={() => onDotClick?.(idx)}
          className={`w-2 h-2 rounded-full transition-all duration-300 ${
            idx === current
              ? 'bg-[rgba(242,242,242,0.8)] scale-110'
              : 'bg-[rgba(242,242,242,0.2)] hover:bg-[rgba(242,242,242,0.4)]'
          } ${onDotClick ? 'cursor-pointer' : ''}`}
          aria-label={`Go to section ${idx + 1}`}
        />
      ))}
    </div>
  )
}
