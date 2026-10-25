'use client'

import { useEffect, useRef, useState } from 'react'
import type { FlowEdge, FlowNode, FlowTone } from '@/data/projects'

// A small system diagram in the site's own style. Steps sit on a grid that
// reads left to right, and phones read the same grid top to bottom. A short
// scene loops through it: packets travel along the connections in the colour
// of what they carry, and each box lights up and shows what it is doing as
// the scene reaches it.

const TONES: Record<FlowTone, { color: string; label: string }> = {
  audio: { color: 'rgb(var(--gray-500))', label: 'Audio' },
  words: { color: '#3b82f6', label: 'Words' },
  voice: { color: '#8b5cf6', label: 'Voice' },
  flag: { color: '#f59e0b', label: 'Flag' },
}

// Seconds per hop, how long the finished scene holds, and the trail spacing.
const HOP = 0.85
const HOLD = 2
const TRAIL = [0, 0.05, 0.1, 0.15]

type Box = { left: number; top: number; width: number; height: number }
type Line = { key: string; from: string; to: string; tone: FlowTone; d: string }

// Lines follow the reading direction: left to right on wide screens, top to
// bottom on phones. Boxes side by side in that direction connect across.
function connect(a: Box, b: Box, vertical: boolean): string {
  const dx = b.left + b.width / 2 - (a.left + a.width / 2)
  const dy = b.top + b.height / 2 - (a.top + a.height / 2)
  const across = vertical ? Math.abs(dy) < 8 : Math.abs(dx) >= 8
  if (across) {
    const sx = a.left + a.width
    const sy = a.top + a.height / 2
    const ex = b.left - 6
    const ey = b.top + b.height / 2
    const k = (ex - sx) / 2
    return `M${sx} ${sy} C${sx + k} ${sy} ${ex - k} ${ey} ${ex} ${ey}`
  }
  const sx = a.left + a.width / 2
  const sy = a.top + a.height
  const ex = b.left + b.width / 2
  const ey = b.top - 6
  const k = (ey - sy) / 2
  return `M${sx} ${sy} C${sx} ${sy + k} ${ex} ${ey - k} ${ex} ${ey}`
}

// How many hops each box sits from the start, by its longest way in.
function depths(nodes: FlowNode[], edges: FlowEdge[]) {
  const depth = new Map(nodes.map((n) => [n.id, 0]))
  for (let pass = 0; pass < nodes.length; pass++) {
    for (const [from, to] of edges) {
      depth.set(to, Math.max(depth.get(to) ?? 0, (depth.get(from) ?? 0) + 1))
    }
  }
  return depth
}

export function FlowDiagram({
  nodes,
  edges,
  caption,
}: {
  nodes: FlowNode[]
  edges: FlowEdge[]
  caption: string
}) {
  const boxRef = useRef<HTMLDivElement>(null)
  const [lines, setLines] = useState<Line[]>([])
  const [size, setSize] = useState({ w: 0, h: 0 })
  const [drawn, setDrawn] = useState(false)
  const cols = Math.max(...nodes.map((n) => n.col)) + 1
  const rows = Math.max(...nodes.map((n) => n.row)) + 1
  const toneOf = (id: string) => nodes.find((n) => n.id === id)?.tone ?? 'audio'
  const used = Array.from(new Set(edges.map(([from, , tone]) => tone ?? toneOf(from))))

  // Measure the boxes and draw the lines between them.
  useEffect(() => {
    const box = boxRef.current
    if (!box) return
    const measure = () => {
      const vertical = !window.matchMedia('(min-width: 640px)').matches
      // Layout positions, not screen positions, so animation never bends lines.
      const rect = (id: string): Box | undefined => {
        const el = box.querySelector<HTMLElement>(`[data-node="${id}"]`)
        return el ? { left: el.offsetLeft, top: el.offsetTop, width: el.offsetWidth, height: el.offsetHeight } : undefined
      }
      setSize({ w: box.offsetWidth, h: box.offsetHeight })
      setLines(
        edges.flatMap(([from, to, tone]) => {
          const a = rect(from)
          const b = rect(to)
          const t = tone ?? nodes.find((n) => n.id === from)?.tone ?? 'audio'
          return a && b ? [{ key: `${from}-${to}`, from, to, tone: t, d: connect(a, b, vertical) }] : []
        }),
      )
    }
    measure()
    const resize = new ResizeObserver(measure)
    resize.observe(box)
    return () => resize.disconnect()
  }, [nodes, edges])

  // The scene: one clock, written straight to the DOM, paused off screen.
  useEffect(() => {
    const box = boxRef.current
    if (!box || lines.length === 0) return
    const depth = depths(nodes, edges)
    const deepest = Math.max(...Array.from(depth.values()))
    const cycle = deepest * HOP + HOLD
    const nodeEls = new Map(
      nodes.map((n) => [n.id, box.querySelector<HTMLElement>(`[data-node="${n.id}"]`)]),
    )
    const paths = lines.map((l) => box.querySelector<SVGPathElement>(`path[data-edge="${l.key}"]`))
    const dots = lines.map((l) => Array.from(box.querySelectorAll<SVGCircleElement>(`circle[data-for="${l.key}"]`)))
    const lengths = paths.map((p) => p?.getTotalLength() ?? 0)

    const show = (t: number) => {
      for (const n of nodes) {
        const el = nodeEls.get(n.id)
        if (!el) continue
        const at = (depth.get(n.id) ?? 0) * HOP
        el.dataset.on = t >= at ? '1' : '0'
        el.querySelectorAll<HTMLElement>('[data-step]').forEach((s, k) => {
          s.dataset.on = t >= at + 0.3 + k * 0.35 ? '1' : '0'
        })
      }
      lines.forEach((l, i) => {
        const start = (depth.get(l.from) ?? 0) * HOP + 0.1
        const end = (depth.get(l.to) ?? 0) * HOP
        const path = paths[i]
        dots[i].forEach((dot, k) => {
          const p = (t - start) / (end - start) - TRAIL[k]
          if (!path || p < 0 || p > 1) {
            dot.style.opacity = '0'
            return
          }
          const pt = path.getPointAtLength(p * lengths[i])
          dot.setAttribute('cx', pt.x.toFixed(1))
          dot.setAttribute('cy', pt.y.toFixed(1))
          dot.style.opacity = String(1 - k * 0.25)
        })
      })
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDrawn(true)
      show(cycle)
      return
    }

    let frame = 0
    let elapsed = 0
    let previous = 0
    const tick = (ms: number) => {
      if (previous) elapsed += Math.min(0.1, (ms - previous) / 1000)
      previous = ms
      show(elapsed % cycle)
      frame = requestAnimationFrame(tick)
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDrawn(true)
          if (!frame) {
            previous = 0
            frame = requestAnimationFrame(tick)
          }
        } else {
          cancelAnimationFrame(frame)
          frame = 0
        }
      },
      { threshold: 0.3 },
    )
    io.observe(box)
    return () => {
      io.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [lines, nodes, edges])

  return (
    // Wider than the text column on large screens, like a magazine figure.
    <figure className="lg:-mx-28">
      <div className="rounded-xl border border-border-soft bg-background-soft p-4 [background-image:radial-gradient(rgb(var(--gray-200))_1px,transparent_1px)] [background-size:14px_14px] sm:p-6">
        <div
          ref={boxRef}
          data-flow
          className="relative grid gap-x-3 gap-y-8 [grid-template-columns:repeat(var(--rows),minmax(0,1fr))] sm:gap-x-6 sm:gap-y-5 sm:[grid-template-columns:repeat(var(--cols),minmax(0,1fr))]"
          style={{ ['--cols' as string]: cols, ['--rows' as string]: rows }}
        >
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 overflow-visible text-gray-300"
            width={size.w}
            height={size.h}
          >
            <defs>
              <marker id="flow-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                <path d="M1 1 L7 4 L1 7" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </marker>
            </defs>
            {lines.map((l, i) => (
              <path
                key={l.key}
                data-edge={l.key}
                d={l.d}
                pathLength={1}
                fill="none"
                stroke="currentColor"
                strokeWidth={1.25}
                markerEnd="url(#flow-arrow)"
                style={{
                  strokeDasharray: 1,
                  strokeDashoffset: drawn ? 0 : 1,
                  transition: drawn ? `stroke-dashoffset 600ms cubic-bezier(0.16, 1, 0.3, 1) ${i * 60}ms` : undefined,
                }}
              />
            ))}
            {lines.map((l) =>
              TRAIL.map((_, k) => (
                <circle
                  key={`${l.key}-${k}`}
                  data-for={l.key}
                  data-packet={k === 0 ? 'head' : 'trail'}
                  r={3.2 - k * 0.6}
                  fill={TONES[l.tone].color}
                  style={{ opacity: 0 }}
                />
              )),
            )}
          </svg>

          {nodes.map((n) => (
            <div
              key={n.id}
              data-node={n.id}
              data-on="0"
              className={`relative self-center rounded-lg border px-3 py-2.5 [grid-column:var(--r)] [grid-row:var(--c)] sm:[grid-column:var(--c)] sm:[grid-row:var(--r)] ${
                n.service ? 'border-dashed border-gray-300 bg-background' : 'border-gray-300 bg-surface shadow-sm'
              }`}
              style={{ ['--c' as string]: n.col + 1, ['--r' as string]: n.row + 1, ['--tone' as string]: TONES[n.tone ?? 'audio'].color }}
            >
              <p className="text-sm font-medium leading-snug text-foreground">{n.label}</p>
              <p className="mt-0.5 text-xs leading-snug text-foreground-faint">{n.note}</p>
              {n.detail && <p className="mt-1.5 font-mono text-[10px] leading-snug text-foreground-faint">{n.detail}</p>}
              {n.steps && (
                <ul className="mt-2 space-y-1">
                  {n.steps.map((s) => (
                    <li key={s} data-step data-on="0" className="flex items-center gap-1.5 font-mono text-[10px] leading-snug text-foreground-faint">
                      <span data-dot className="h-1.5 w-1.5 shrink-0 rounded-full bg-gray-300" />
                      {s}
                    </li>
                  ))}
                </ul>
              )}
              {n.live && (
                <p data-live className="mt-2 font-mono text-[11px] font-medium leading-snug">
                  {n.live}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
      <figcaption className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-foreground-faint">
        <span data-flow-legend className="flex flex-wrap items-center gap-x-4 gap-y-1">
          {used
            .filter((t) => t !== 'audio')
            .map((t) => (
              <span key={t} className="inline-flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full" style={{ background: TONES[t].color }} />
                {TONES[t].label}
              </span>
            ))}
        </span>
        <span>{caption}</span>
      </figcaption>
    </figure>
  )
}
