'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

// Set when the visitor moves between pages inside the site, so Back can
// use the browser history instead of a fixed page.
let cameFromSite = false

// Lives in the root layout and notices client-side page changes.
export function NavigationTracker() {
  const pathname = usePathname()
  const first = useRef(pathname)
  useEffect(() => {
    if (pathname !== first.current) cameFromSite = true
  }, [pathname])
  return null
}

function arrivedFromSite() {
  if (cameFromSite) return true
  try {
    return new URL(document.referrer).origin === window.location.origin
  } catch {
    return false
  }
}

// Goes back to wherever the visitor came from on the site, keeping their
// scroll position. Visitors who landed from outside go to `fallback`.
export function BackLink({ fallback }: { fallback: string }) {
  const router = useRouter()
  return (
    <Link
      href={fallback}
      onClick={(e) => {
        if (arrivedFromSite() && window.history.length > 1) {
          e.preventDefault()
          router.back()
        }
      }}
      className="inline-block text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
    >
      <span aria-hidden="true">&larr; </span>Back
    </Link>
  )
}
