'use client'

import { useEffect, useRef, useState } from 'react'
import { NightField } from '@/components/site/NightField'
import { NIGHT_KEY } from '@/lib/night'

// The easter egg. Clicking the ~/omorros logo three times, or typing
// "night", turns the lights off: the site goes dark and the wave field
// rises behind it. The same again, or Escape, turns them back on. It lasts
// for the tab, so a new visit always starts in light mode.

const CLICK_GAP_MS = 700
let greeted = false

export function NightMode() {
  const [night, setNight] = useState(false)
  const [origin, setOrigin] = useState<{ x: number; y: number } | null>(null)
  const current = useRef(false)

  useEffect(() => {
    const root = document.documentElement
    current.current = root.classList.contains('night')
    setNight(current.current)

    const set = (on: boolean, at: { x: number; y: number } | null = null) => {
      if (on === current.current) return
      current.current = on
      root.classList.add('theme-fade')
      root.classList.toggle('night', on)
      window.setTimeout(() => root.classList.remove('theme-fade'), 700)
      try {
        if (on) sessionStorage.setItem(NIGHT_KEY, '1')
        else sessionStorage.removeItem(NIGHT_KEY)
      } catch {}
      setOrigin(at)
      setNight(on)
    }

    let clicks = 0
    let lastClick = 0
    const onClick = (e: MouseEvent) => {
      const trigger = e.target instanceof Element && e.target.closest('[data-night-trigger]')
      if (!trigger) return
      const now = performance.now()
      clicks = now - lastClick < CLICK_GAP_MS ? clicks + 1 : 1
      lastClick = now
      if (clicks < 3) return
      clicks = 0
      const r = trigger.getBoundingClientRect()
      set(!current.current, { x: r.left + r.width / 2, y: r.top + r.height / 2 })
    }

    let typed = ''
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') return set(false)
      if (e.metaKey || e.ctrlKey || e.altKey || e.key.length !== 1) return
      if (e.target instanceof Element && e.target.closest('input,textarea,select,[contenteditable]')) return
      typed = (typed + e.key.toLowerCase()).slice(-5)
      if (typed === 'night') {
        typed = ''
        set(!current.current)
      }
    }

    document.addEventListener('click', onClick, true)
    window.addEventListener('keydown', onKey)

    if (!greeted) {
      greeted = true
      console.log(
        '%c~/omorros%c\n\nPsst. Click ~/omorros three times, or type night. Escape brings the lights back.\nHiring? hola@omorros.com',
        'font: 600 14px ui-monospace, monospace; color: #8b5cf6',
        'font: 12px ui-monospace, monospace; color: inherit',
      )
    }

    return () => {
      document.removeEventListener('click', onClick, true)
      window.removeEventListener('keydown', onKey)
    }
  }, [])

  return <NightField active={night} origin={origin} />
}
