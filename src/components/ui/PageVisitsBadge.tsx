'use client'

// "You are the Nth visitor" pill that lives ABOVE the contact section.
// Subhan's uses LiquidMetalButton (paper-design shader) + NumberFlow + a real
// /api/visitors endpoint. We approximate the look with a yellow/gold ring on a
// dark-soft fill, and increment a localStorage counter per browser to make the
// number feel alive. Stub for now - swap to a real endpoint later.

import { useEffect, useState } from 'react'

const STORAGE_KEY = 'visitor-count'
const SEED = 1246

function getOrdinalSuffix(n: number) {
  const s = ['th', 'st', 'nd', 'rd']
  const v = n % 100
  return s[(v - 20) % 10] || s[v] || s[0]
}

export function PageVisitsBadge() {
  const [visits, setVisits] = useState<number | null>(null)

  useEffect(() => {
    try {
      const stored = parseInt(localStorage.getItem(STORAGE_KEY) || `${SEED}`, 10)
      const next = stored + 1
      localStorage.setItem(STORAGE_KEY, String(next))
      // small mount delay so the number "lands"
      const t = setTimeout(() => setVisits(next), 120)
      return () => clearTimeout(t)
    } catch {
      setVisits(SEED + 1)
    }
  }, [])

  return (
    <div className="flex justify-center my-12">
      <div className="relative inline-flex items-center px-5 py-2.5 rounded-full border-2 border-amber-400/70 bg-background-soft text-sm shadow-[0_0_24px_rgba(251,191,36,0.18)]">
        {/* faint pulsing inner glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-full bg-amber-400/[0.04] animate-pulse"
        />
        {visits === null ? (
          <span className="text-foreground-muted animate-pulse">Fetching signal…</span>
        ) : (
          <span className="text-foreground-muted">
            You are the{' '}
            <span className="mx-0.5 font-bold text-foreground tabular-nums">
              {visits.toLocaleString()}
            </span>
            <sup className="text-foreground-faint ml-0.5">{getOrdinalSuffix(visits)}</sup>{' '}
            visitor
          </span>
        )}
      </div>
    </div>
  )
}
