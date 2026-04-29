// Status pill: emerald dot with pulse + ping ring.
// Pattern lifted from syedsubhan.in's PortfolioHome — emerald reads as universal "open".

interface AvailablePillProps {
  label?: string
}

export function AvailablePill({
  label = 'Available for opportunities',
}: AvailablePillProps) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/5 border border-emerald-500/15 backdrop-blur-sm transition-all hover:bg-emerald-500/10">
      <div className="relative flex items-center justify-center">
        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse relative z-10" />
        <div className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-30" />
      </div>
      <span className="text-xs font-medium text-emerald-400 tracking-wide">
        {label}
      </span>
    </div>
  )
}
