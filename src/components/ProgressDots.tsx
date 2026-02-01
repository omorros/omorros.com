'use client'

interface ProgressDotsProps {
  total: number
  current: number
  onDotClick?: (index: number) => void
}

export function ProgressDots({ total, current, onDotClick }: ProgressDotsProps) {
  return (
    <div className="flex items-center gap-1" role="tablist" aria-label="Page navigation">
      {Array.from({ length: total }).map((_, idx) => (
        <button
          key={idx}
          onClick={() => onDotClick?.(idx)}
          className="p-3 group focus:outline-none"
          aria-label={`Go to section ${idx + 1}`}
          aria-current={idx === current ? 'step' : undefined}
          role="tab"
          aria-selected={idx === current}
        >
          <div 
             className={`w-2 h-2 rounded-full transition-all duration-300 ${
              idx === current
                ? 'bg-foreground-muted scale-125'
                : 'bg-white/20 group-hover:bg-white/40'
            }`}
          />
        </button>
      ))}
    </div>
  )
}
