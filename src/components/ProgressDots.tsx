'use client'

interface ProgressDotsProps {
  total: number
  current: number
  onDotClick?: (index: number) => void
}

export function ProgressDots({ total, current, onDotClick }: ProgressDotsProps) {
  return (
    <div className="flex items-center gap-0.5" role="tablist" aria-label="Page navigation">
      {Array.from({ length: total }).map((_, idx) => (
        <button
          key={idx}
          onClick={() => onDotClick?.(idx)}
          className="p-2 transition-colors rounded-full group focus:outline-none focus-visible:ring-2 focus-visible:ring-accent hover:bg-white/5"
          aria-label={`Go to section ${idx + 1}`}
          aria-current={idx === current ? 'step' : undefined}
          role="tab"
          aria-selected={idx === current}
        >
          <div 
             className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              idx === current
                ? 'bg-white scale-125'
                : 'bg-white/20 group-hover:bg-white/50'
            }`}
          />
        </button>
      ))}
    </div>
  )
}
