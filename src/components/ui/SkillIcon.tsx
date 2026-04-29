'use client'

// Single brand-colored icon with hover opacity reveal.
// Earlier version stacked two <img> tags with grayscale/invert chains, which
// failed for any icon whose default color matched the active theme background
// (e.g. OpenAI's near-black SVG was invisible in dark mode). Switching to
// Iconify's `logos:` namespace gives us full-brand-color SVGs that read on
// both themes; we just modulate opacity for the ghost → vibrant feel.

import { cn } from '@/lib/utils'

interface SkillIconProps {
  name: string
  iconUrl: string
  className?: string
}

export function SkillIcon({ name, iconUrl, className }: SkillIconProps) {
  return (
    <div
      className={cn(
        'group inline-flex items-center gap-2 px-3 py-1.5 mx-1.5 rounded-full',
        'border border-border-soft hover:border-border',
        'bg-background-soft/40 hover:bg-background-soft',
        'transition-all duration-300',
        className
      )}
    >
      <div className="relative w-4 h-4 shrink-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={iconUrl}
          alt={name}
          className="w-full h-full object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300"
        />
      </div>
      <span className="text-xs font-medium text-foreground-muted group-hover:text-foreground whitespace-nowrap transition-colors">
        {name}
      </span>
    </div>
  )
}
