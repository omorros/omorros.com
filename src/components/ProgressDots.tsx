'use client'

interface ProgressDotsProps {
  total: number
  current: number
}

export function ProgressDots({ total, current }: ProgressDotsProps) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: total }).map((_, idx) => (
        <div
          key={idx}
          className={`w-2 h-2 rounded-full transition-all duration-300 ${
            idx === current
              ? 'bg-[rgba(242,242,242,0.8)] scale-110'
              : 'bg-[rgba(242,242,242,0.2)]'
          }`}
        />
      ))}
    </div>
  )
}
