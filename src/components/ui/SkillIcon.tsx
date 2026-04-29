'use client'

// Naked-icon style: no pill chrome, just an icon + label floating in the
// marquee, desaturated by default and brightening on hover. Color logos from
// Iconify's `logos:` namespace are filtered to grayscale so they read as a
// uniform muted set, then drop the filter on hover for a "wake-up" reveal.

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
        'group inline-flex items-center gap-2.5 px-5 py-2',
        'transition-all duration-300',
        className,
      )}
    >
      <div className="relative w-5 h-5 shrink-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={iconUrl}
          alt={name}
          className="w-full h-full object-contain grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
        />
      </div>
      <span className="text-base font-medium text-foreground/40 group-hover:text-foreground whitespace-nowrap transition-colors duration-300">
        {name}
      </span>
    </div>
  )
}
