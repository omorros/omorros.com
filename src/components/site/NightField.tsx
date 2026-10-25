'use client'

import { useEffect, useRef } from 'react'

// The night mode background. A field of characters drawn from a small water
// simulation: uniform waves roll across it, the cursor disturbs the surface
// as it moves, and a click drops a bigger splash. Crests glow violet. It only
// runs while night mode is on.

const CELL_W = 11
const CELL_H = 17
const SIM = 9
const RAMP = ' .,:;-=+*#%@'
const DAMPING = 0.982
const STEP_MS = 1000 / 60
const BUSY =
  'a,button,input,textarea,select,label,summary,video,img,picture,svg,iframe,p,h1,h2,h3,h4,h5,h6,li,blockquote,figcaption,pre,code,span,[role=button],[contenteditable]'

const smooth = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)))
  return t * t * (3 - 2 * t)
}

export function NightField({
  active,
  origin,
}: {
  active: boolean
  origin: { x: number; y: number } | null
}) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!active) return
    const canvas = ref.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let w = 0
    let h = 0
    let cols = 0
    let rows = 0
    let sc = 0
    let sr = 0
    let cur = new Float32Array(0)
    let prev = new Float32Array(0)
    let calm = new Float32Array(0)
    let frame = 0
    let lastStep = 0
    let mouse: { x: number; y: number } | null = null

    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1)
      w = window.innerWidth
      h = canvas.getBoundingClientRect().height || window.innerHeight
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.font = '12px ui-monospace, SFMono-Regular, Menlo, monospace'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      cols = Math.ceil(w / CELL_W)
      rows = Math.ceil(h / CELL_H)
      sc = Math.ceil(w / SIM) + 1
      sr = Math.ceil(h / SIM) + 1
      cur = new Float32Array(sc * sr)
      prev = new Float32Array(sc * sr)
      // The text column and the nav strip stay quieter.
      calm = new Float32Array(cols * rows)
      const half = Math.min(410, w / 2 - 16)
      for (let j = 0; j < rows; j++) {
        const row = 0.3 + 0.7 * smooth(70, 120, j * CELL_H)
        for (let i = 0; i < cols; i++) {
          const dx = Math.abs(i * CELL_W + CELL_W / 2 - w / 2)
          calm[j * cols + i] = (0.32 + 0.68 * smooth(half - 20, half + 70, dx)) * row
        }
      }
      render(0)
    }

    // One step of the damped wave equation over the grid.
    const step = () => {
      const next = prev
      for (let j = 1; j < sr - 1; j++) {
        for (let i = 1; i < sc - 1; i++) {
          const k = j * sc + i
          next[k] =
            ((cur[k - 1] + cur[k + 1] + cur[k - sc] + cur[k + sc]) * 0.5 - next[k]) * DAMPING
        }
      }
      prev = cur
      cur = next
    }

    const disturb = (x: number, y: number, amount: number, radius: number) => {
      const ci = Math.round(x / SIM)
      const cj = Math.round(y / SIM)
      for (let dj = -radius; dj <= radius; dj++) {
        for (let di = -radius; di <= radius; di++) {
          const i = ci + di
          const j = cj + dj
          if (i < 1 || j < 1 || i >= sc - 1 || j >= sr - 1) continue
          const fall = Math.exp(-(di * di + dj * dj) / (radius * radius * 0.6 + 0.4))
          cur[j * sc + i] += amount * fall
        }
      }
    }

    const render = (t: number) => {
      ctx.clearRect(0, 0, w, h)
      const buckets = new Map<string, number[]>()
      for (let j = 0; j < rows; j++) {
        const y = j * CELL_H
        for (let i = 0; i < cols; i++) {
          const x = i * CELL_W
          const k = j * cols + i
          // Uniform swell that is always rolling, plus the simulated surface.
          const swell =
            0.22 * Math.sin(x * 0.028 + y * 0.012 - t * 1.1) +
            0.14 * Math.sin(x * 0.017 - y * 0.031 - t * 0.7)
          // Clamp: the last character row can sit past the last sim row.
          const si = Math.min(sc - 1, Math.round((x + CELL_W / 2) / SIM))
          const sj = Math.min(sr - 1, Math.round((y + CELL_H / 2) / SIM))
          const sim = Math.max(-1.4, Math.min(1.4, cur[sj * sc + si]))
          const v = swell + sim
          const level = Math.min(1, Math.max(0, 0.4 + v * 0.45))
          const ch = RAMP[Math.round(level * (RAMP.length - 1))]
          if (ch === ' ') continue
          const lift = Math.min(1, Math.max(0, sim))
          const crest = Math.max(0, v)
          const a = (0.13 + crest * 0.2 + lift * 0.66) * calm[k]
          if (a < 0.03) continue
          // Lavender at rest, violet on crests, blue in troughs.
          const hue = Math.round((v >= 0 ? 255 + Math.min(1, v) * 18 : 255 + Math.max(-1, v) * 35) / 5) * 5
          const sat = Math.round((45 + lift * 50) / 5) * 5
          const light = Math.round((74 - lift * 10) / 2) * 2
          const style = `hsla(${hue},${sat}%,${light}%,${(Math.round(a * 20) / 20).toFixed(2)})`
          let list = buckets.get(style)
          if (!list) buckets.set(style, (list = []))
          list.push(i, j, ch.charCodeAt(0))
        }
      }
      buckets.forEach((list, style) => {
        ctx.fillStyle = style
        for (let k = 0; k < list.length; k += 3)
          ctx.fillText(String.fromCharCode(list[k + 2]), list[k] * CELL_W + CELL_W / 2, list[k + 1] * CELL_H + CELL_H / 2)
      })
    }

    const loop = (ms: number) => {
      let steps = 0
      while (ms - lastStep >= STEP_MS && steps < 3) {
        step()
        lastStep += STEP_MS
        steps++
      }
      if (ms - lastStep > 200) lastStep = ms
      render(ms / 1000)
      frame = requestAnimationFrame(loop)
    }

    const empty = (target: EventTarget | null) =>
      target instanceof Element && !target.closest(BUSY)

    const onMove = (e: MouseEvent) => {
      const p = { x: e.clientX, y: e.clientY }
      if (mouse) {
        const dist = Math.hypot(p.x - mouse.x, p.y - mouse.y)
        const n = Math.max(1, Math.floor(dist / SIM))
        const amount = Math.min(2.4, 0.9 + dist / 45)
        for (let s = 1; s <= n; s++)
          disturb(mouse.x + ((p.x - mouse.x) * s) / n, mouse.y + ((p.y - mouse.y) * s) / n, amount, 2)
      }
      mouse = p
    }
    const onDown = (e: MouseEvent) => {
      if (e.button !== 0 || !empty(e.target)) return
      e.preventDefault()
      disturb(e.clientX, e.clientY, 4.5, 2)
    }
    const onLeave = () => (mouse = null)
    const onTap = (e: PointerEvent) => {
      if (e.pointerType === 'touch' && empty(e.target)) disturb(e.clientX, e.clientY, 4.5, 2)
    }

    resize()
    if (origin) disturb(origin.x, origin.y, 9, 3)
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mousedown', onDown)
    document.documentElement.addEventListener('mouseleave', onLeave)
    window.addEventListener('pointerup', onTap)
    if (!still) {
      lastStep = performance.now()
      frame = requestAnimationFrame(loop)
    }
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      window.removeEventListener('pointerup', onTap)
    }
  }, [active, origin])

  return (
    <canvas
      ref={ref}
      data-night-field
      aria-hidden="true"
      className="fixed inset-x-0 top-0 w-screen h-lvh pointer-events-none -z-10 transition-opacity duration-1000 print:hidden"
      style={{ opacity: active ? 1 : 0 }}
    />
  )
}
