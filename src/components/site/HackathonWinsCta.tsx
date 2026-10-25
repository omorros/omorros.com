'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import type { HackathonPrize } from '@/data/hackathons'

// The hackathon wins call to action on /projects. The win count is drawn in
// code characters, traced from the site's own font, and types itself in when
// it scrolls into view. A ticker of the actual prizes runs underneath.
// Hovering pauses the ticker and sends a violet ripple through the number.

const W = 92
const H = 128
const CELL_W = 5.75
const CELL_H = 8
const SOLID = '@#%&$8'
const SOFT = '*+=:'
const GLYPHS = '{}[]()<>/\\|=+*;01#%&$@'

type Cell = { x: number; y: number; cover: number; seed: number }
type Ripple = { x: number; y: number; until: number }

// Which cells of the grid the glyph covers, and how much of each.
function traceGlyph(text: string): Cell[] {
  const scale = 4
  const off = document.createElement('canvas')
  off.width = W * scale
  off.height = H * scale
  const o = off.getContext('2d')
  if (!o) return []
  const family = getComputedStyle(document.body).fontFamily
  o.font = `800 ${H * scale}px ${family}`
  const m = o.measureText(text)
  const fit = Math.min(
    (H * scale * 0.96) / (m.actualBoundingBoxAscent + m.actualBoundingBoxDescent),
    (W * scale * 0.96) / (m.actualBoundingBoxLeft + m.actualBoundingBoxRight),
  )
  o.font = `800 ${H * scale * fit}px ${family}`
  const g = o.measureText(text)
  o.fillText(
    text,
    (W * scale - g.actualBoundingBoxLeft - g.actualBoundingBoxRight) / 2 + g.actualBoundingBoxLeft,
    (H * scale - g.actualBoundingBoxAscent - g.actualBoundingBoxDescent) / 2 + g.actualBoundingBoxAscent,
  )
  const px = o.getImageData(0, 0, W * scale, H * scale).data
  const cells: Cell[] = []
  for (let j = 0; j < Math.floor(H / CELL_H); j++) {
    for (let i = 0; i < Math.floor(W / CELL_W); i++) {
      let sum = 0
      let n = 0
      for (let y = Math.floor(j * CELL_H * scale); y < Math.floor((j + 1) * CELL_H * scale); y += 2) {
        for (let x = Math.floor(i * CELL_W * scale); x < Math.floor((i + 1) * CELL_W * scale); x += 2) {
          sum += px[(y * W * scale + x) * 4 + 3]
          n++
        }
      }
      const cover = sum / n / 255
      if (cover > 0.18) {
        cells.push({ x: i * CELL_W + CELL_W / 2, y: j * CELL_H + CELL_H / 2, cover, seed: Math.random() })
      }
    }
  }
  return cells
}

export function HackathonWinsCta({ prizes }: { prizes: readonly HackathonPrize[] }) {
  const wins = prizes.length
  const linkRef = useRef<HTMLAnchorElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const ripple = useRef<Ripple | null>(null)
  const kick = useRef<() => void>(() => {})

  useEffect(() => {
    const link = linkRef.current
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!link || !canvas || !ctx) return
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const dpr = Math.min(2, window.devicePixelRatio || 1)
    canvas.width = Math.round(W * dpr)
    canvas.height = Math.round(H * dpr)
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    let cells: Cell[] = []
    let frame = 0
    let start = 0
    let revealed = false
    let cancelled = false
    let io: IntersectionObserver | null = null

    const draw = (ms: number) => {
      frame = 0
      if (!start) start = ms
      const t = ms / 1000
      const shown = revealed ? 1 : Math.min(1, (ms - start) / 800)
      const r = ripple.current && ms < ripple.current.until ? ripple.current : null
      const ink = getComputedStyle(document.documentElement).getPropertyValue('--gray-900').trim().split(' ').join(',')
      ctx.clearRect(0, 0, W, H)
      ctx.font = '600 8px ui-monospace, SFMono-Regular, Menlo, monospace'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      for (const c of cells) {
        if (c.seed > shown) continue
        const d = r ? Math.hypot(c.x - r.x, c.y - r.y) : 0
        const wave = r ? Math.max(0, Math.sin(d * 0.16 - t * 10)) * Math.exp(-d / 70) : 0
        if (wave > 0.25) {
          ctx.fillStyle = `hsla(${Math.round(262 + wave * 12)},90%,60%,${(0.6 + wave * 0.4).toFixed(2)})`
          ctx.fillText(GLYPHS[Math.floor(c.seed * 97 + t * 12) % GLYPHS.length], c.x, c.y)
        } else {
          const solid = c.cover > 0.6
          ctx.fillStyle = `rgba(${ink},${solid ? 1 : 0.55})`
          const set = solid ? SOLID : SOFT
          ctx.fillText(set[Math.floor(c.seed * set.length)], c.x, c.y)
        }
      }
      if (shown >= 1) revealed = true
      // Keep going only while typing in or rippling.
      if (!revealed || r) frame = requestAnimationFrame(draw)
    }
    kick.current = () => {
      if (!frame && !still && revealed) frame = requestAnimationFrame(draw)
    }

    document.fonts.ready.then(() => {
      if (cancelled) return
      cells = traceGlyph(String(wins))
      const rect = link.getBoundingClientRect()
      const onScreen = rect.top < window.innerHeight && rect.bottom > 0
      if (still || onScreen) {
        revealed = true
        draw(performance.now())
        return
      }
      io = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return
          io?.disconnect()
          frame = requestAnimationFrame(draw)
        },
        { threshold: 0.4 },
      )
      io.observe(link)
    })

    // Redraw in the right ink when night mode flips the palette.
    const theme = new MutationObserver(() => {
      if (revealed && !frame) draw(performance.now())
    })
    theme.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

    return () => {
      cancelled = true
      io?.disconnect()
      theme.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [wins])

  const onMove = (e: React.MouseEvent) => {
    const r = canvasRef.current?.getBoundingClientRect()
    if (!r) return
    // Ripple from the mouse when it is over the number, otherwise from its top.
    const near = e.clientX - r.left < W * 2.2
    ripple.current = {
      x: near ? e.clientX - r.left : W * 0.62,
      y: near ? e.clientY - r.top : H * 0.3,
      until: performance.now() + 1100,
    }
    kick.current()
  }

  return (
    <Link
      ref={linkRef}
      href="/hackathons"
      data-cta="hackathon-wins"
      aria-label={`${wins} hackathon wins in 2026. See them all`}
      onMouseMove={onMove}
      className="group relative block overflow-hidden rounded-lg border border-gray-200 bg-gray-100 pt-7 transition-colors hover:border-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500 md:pt-9"
    >
      <div aria-hidden="true" className="flex items-center gap-5 px-6 md:gap-7 md:px-10">
        <canvas ref={canvasRef} data-nine className="shrink-0" style={{ width: W, height: H }} />
        <span>
          <span className="block text-xl font-semibold text-gray-900 text-balance md:text-2xl">
            hackathon wins in 2026.
          </span>
          <span className="inline-flex items-center mt-2 font-medium text-blue-500">
            See them all
            <ChevronRight className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </span>
      </div>
      <div
        aria-hidden="true"
        className="relative mt-7 border-t border-gray-200 py-4 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]"
      >
        <div data-ticker className="flex w-max animate-ticker group-hover:[animation-play-state:paused] motion-reduce:animate-none">
          {[...prizes, ...prizes].map((p, i) => (
            <span key={i} className="flex items-center whitespace-nowrap text-sm text-gray-600">
              <span className="font-semibold text-gray-900">{p.award}</span>
              <span className="mx-2 text-gray-500">{p.project}</span>
              <span className="mx-5 h-1 w-1 rounded-full bg-gray-400" />
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}
