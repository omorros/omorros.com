'use client'

import { siteConfig } from '@/lib/constants'

// Derive initials from siteConfig.name (e.g., "Oriol Morros Vilaseca" → "OMV").
// We only want the first two for the brand mark per spec ("OM").
function deriveMark(name: string) {
  const parts = name.trim().split(/\s+/).slice(0, 2)
  return parts.map((p) => p[0]?.toUpperCase()).join('')
}

export function Footer() {
  const mark = deriveMark(siteConfig.name) || 'OM'
  const year = new Date().getFullYear()

  // Static "page visits" stub - wired to a real counter later.
  const visitors = '1,247'

  return (
    <footer className="mt-20 pt-8 pb-10 border-t border-border-soft">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        {/* LEFT */}
        <div className="flex flex-col gap-1.5">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-foreground-faint">
            {mark} · {year}
          </span>
          <span className="font-handwriting text-2xl text-foreground-muted leading-none">
            Made from Cambridge.
          </span>
        </div>

        {/* RIGHT */}
        <div className="flex flex-col md:items-end gap-1.5">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-foreground-faint">
            Page Visits
          </span>
          <span className="font-mono text-sm tabular-nums uppercase tracking-[0.12em] text-foreground">
            {visitors} <span className="text-foreground-faint">visitors</span>
          </span>
        </div>
      </div>
    </footer>
  )
}
