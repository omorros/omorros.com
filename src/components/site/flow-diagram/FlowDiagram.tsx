'use client'

import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent } from 'react'
import { connect, depths, type Box } from './geometry'
import { SWATCHES } from './palette'
import type { Flow } from './types'

// A small system diagram in the site's own style. Boxes sit on a grid that
// reads left to right, and phones read the same grid top to bottom. A short
// scene loops through it: packets travel along the lines in the colour of
// what they carry, and each box lights up and shows what it is doing as the
// scene reaches it. A diagram with modes gets a tab per mode: the boxes the
// mode does not use fade, and the scene plays along its path only. Zones
// shade the boxes that share a place, such as one machine. The lit-up and
// faded states are styled in globals.css ([data-flow]).

// Seconds per hop, how long the finished scene holds, and the trail spacing.
const HOP = 0.85
const HOLD = 2
const TRAIL = [0, 0.05, 0.1, 0.15]
// Space between a zone's edge and the boxes inside it.
const ZONE_PAD = 6

type Line = { key: string; from: string; to: string; color: string; d: string }
type Area = Box & { label: string; nodes: readonly string[] }

export function FlowDiagram({ flow }: { flow: Flow }) {
  const { nodes, edges, tones, caption } = flow
  const zones = useMemo(() => flow.zones ?? [], [flow.zones])
  const modes = Object.entries(flow.modes ?? {})
  const boxRef = useRef<HTMLDivElement>(null)
  const elapsed = useRef(0)
  const [mode, setMode] = useState<string | null>(modes[0]?.[0] ?? null)
  const sceneMode = useRef(mode)
  const [lines, setLines] = useState<Line[]>([])
  const [areas, setAreas] = useState<Area[]>([])
  const [size, setSize] = useState({ w: 0, h: 0 })
  const [drawn, setDrawn] = useState(false)
  const uid = useId().replace(/:/g, '')
  const arrowId = `flow-arrow-${uid}`
  const cols = Math.max(...nodes.map((n) => n.col)) + 1
  const rows = Math.max(...nodes.map((n) => n.row)) + 1

  // The boxes the picked mode uses (all of them without modes), and the
  // lines between them.
  const active = useMemo(
    () => new Set(nodes.filter((n) => !mode || !n.modes?.length || n.modes.includes(mode)).map((n) => n.id)),
    [nodes, mode],
  )
  const activeEdges = useMemo(() => edges.filter(([from, to]) => active.has(from) && active.has(to)), [edges, active])

  const toneOf = (id: string) => nodes.find((n) => n.id === id)?.tone
  const colorOf = (tone?: string) => SWATCHES[(tone && tones[tone]?.swatch) || 'grey']
  // The legend lists the tones that travel along this mode's lines, in order, if labelled.
  const legend = Array.from(new Set(activeEdges.map(([from, , tone]) => tone ?? toneOf(from))))
    .flatMap((t) => (t && tones[t]?.label ? [{ label: tones[t].label, color: colorOf(t) }] : []))

  // Measure the boxes, then draw the lines between them and the zones around them.
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
        edges.flatMap(([from, to, tone], i) => {
          const a = rect(from)
          const b = rect(to)
          const color = SWATCHES[(tones[tone ?? toneOf(from) ?? '']?.swatch) || 'grey']
          return a && b ? [{ key: `e${i}`, from, to, color, d: connect(a, b, vertical) }] : []
        }),
      )
      setAreas(
        zones.flatMap((z) => {
          const rs = z.nodes.flatMap((id) => rect(id) ?? [])
          if (rs.length === 0) return []
          const left = Math.min(...rs.map((r) => r.left)) - ZONE_PAD
          const top = Math.min(...rs.map((r) => r.top)) - ZONE_PAD
          const right = Math.max(...rs.map((r) => r.left + r.width)) + ZONE_PAD
          const bottom = Math.max(...rs.map((r) => r.top + r.height)) + ZONE_PAD
          return [{ label: z.label, nodes: z.nodes, left, top, width: right - left, height: bottom - top }]
        }),
      )
    }
    measure()
    // Watch every box too: one growing taller moves its lines without
    // changing the size of the whole diagram.
    const resize = new ResizeObserver(measure)
    resize.observe(box)
    box.querySelectorAll('[data-node]').forEach((el) => resize.observe(el))
    return () => resize.disconnect()
    // toneOf reads nodes, which arrive with edges from the same flow.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodes, edges, tones, zones])

  // The scene: one clock, written straight to the DOM, paused off screen.
  useEffect(() => {
    const box = boxRef.current
    if (!box || lines.length === 0) return
    // A new mode starts its scene from the beginning; re-measuring keeps its place.
    if (sceneMode.current !== mode) {
      sceneMode.current = mode
      elapsed.current = 0
    }
    const depth = depths(
      nodes.filter((n) => active.has(n.id)),
      activeEdges,
    )
    const deepest = Math.max(...Array.from(depth.values()))
    const cycle = deepest * HOP + HOLD
    const boxes = nodes.map((n) => {
      const el = box.querySelector<HTMLElement>(`[data-node="${n.id}"]`)
      const steps = el ? Array.from(el.querySelectorAll<HTMLElement>('[data-step]')) : []
      return { el, steps, on: active.has(n.id), at: (depth.get(n.id) ?? 0) * HOP }
    })
    const packets = lines.map((l) => ({
      path: box.querySelector<SVGPathElement>(`path[data-edge="${l.key}"]`),
      dots: Array.from(box.querySelectorAll<SVGCircleElement>(`circle[data-for="${l.key}"]`)),
      on: active.has(l.from) && active.has(l.to),
      start: (depth.get(l.from) ?? 0) * HOP + 0.1,
      end: (depth.get(l.to) ?? 0) * HOP,
    }))
    const lengths = packets.map((p) => p.path?.getTotalLength() ?? 0)

    const show = (t: number) => {
      for (const b of boxes) {
        if (!b.el) continue
        b.el.dataset.on = b.on && t >= b.at ? '1' : '0'
        b.steps.forEach((s, k) => {
          s.dataset.on = b.on && t >= b.at + 0.3 + k * 0.35 ? '1' : '0'
        })
      }
      packets.forEach((p, i) => {
        p.dots.forEach((dot, k) => {
          const progress = (t - p.start) / (p.end - p.start) - TRAIL[k]
          if (!p.on || !p.path || progress < 0 || progress > 1) {
            dot.style.opacity = '0'
            return
          }
          const pt = p.path.getPointAtLength(progress * lengths[i])
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
    let previous = 0
    const tick = (ms: number) => {
      // The clock lives in a ref, so re-measuring keeps the scene's place.
      if (previous) elapsed.current += Math.min(0.1, (ms - previous) / 1000)
      previous = ms
      show(elapsed.current % cycle)
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
  }, [lines, nodes, active, activeEdges, mode])

  // Arrow keys, Home and End move between tabs, as in any tab list.
  const onTabKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    const i = modes.findIndex(([id]) => id === mode)
    const next = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: modes.length - 1 }[e.key]
    if (next === undefined) return
    e.preventDefault()
    const [id] = modes[(next + modes.length) % modes.length]
    setMode(id)
    document.getElementById(`${uid}-tab-${id}`)?.focus()
  }
  const current = modes.find(([id]) => id === mode)?.[1]
  const liveText = (live: (typeof nodes)[number]['live']) =>
    typeof live === 'string' ? live : mode ? (live as Record<string, string> | undefined)?.[mode] : undefined

  return (
    // Edge to edge on phones, where three columns of boxes need every pixel,
    // and wider than the text column on large screens, like a magazine figure.
    <figure className="-mx-6 sm:mx-0 lg:-mx-28">
      {modes.length > 1 && (
        <div className="mb-4 px-6 sm:px-0">
          <div role="tablist" aria-label="Modes" className="inline-flex flex-wrap gap-1 rounded-full border border-border-soft bg-background-soft p-1">
            {modes.map(([id, m]) => (
              <button
                key={id}
                id={`${uid}-tab-${id}`}
                type="button"
                role="tab"
                aria-selected={id === mode}
                aria-controls={`${uid}-panel`}
                tabIndex={id === mode ? 0 : -1}
                onClick={() => setMode(id)}
                onKeyDown={onTabKey}
                className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
                  id === mode ? 'bg-surface text-foreground shadow-sm' : 'text-foreground-faint hover:text-foreground'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
          {current?.note && <p className="mt-2 text-sm text-foreground-muted">{current.note}</p>}
        </div>
      )}
      <div
        {...(modes.length > 1 ? { id: `${uid}-panel`, role: 'tabpanel', 'aria-labelledby': `${uid}-tab-${mode}` } : {})}
        className="border-y border-border-soft bg-background-soft px-3 py-4 [background-image:radial-gradient(rgb(var(--gray-200))_1px,transparent_1px)] [background-size:14px_14px] sm:rounded-xl sm:border sm:p-6"
      >
        <div
          ref={boxRef}
          data-flow
          className="relative grid gap-x-2 gap-y-8 [grid-template-columns:repeat(var(--rows),minmax(0,1fr))] sm:gap-x-6 sm:gap-y-5 sm:[grid-template-columns:repeat(var(--cols),minmax(0,1fr))]"
          style={{ ['--cols' as string]: cols, ['--rows' as string]: rows }}
        >
          {areas.map((a) => (
            <div
              key={a.label}
              data-zone={a.label}
              data-dim={a.nodes.some((id) => active.has(id)) ? undefined : '1'}
              className="pointer-events-none absolute rounded-xl border border-dashed border-gray-300 bg-gray-200/40"
              style={{ left: a.left, top: a.top, width: a.width, height: a.height }}
            >
              <span className="absolute -top-2 left-3 rounded bg-background-soft px-1.5 font-mono text-[10px] uppercase leading-4 tracking-wide text-foreground-faint">
                {a.label}
              </span>
            </div>
          ))}

          <svg
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 overflow-visible text-gray-300"
            width={size.w}
            height={size.h}
          >
            <defs>
              <marker id={arrowId} viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
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
                markerEnd={`url(#${arrowId})`}
                style={{
                  strokeDasharray: 1,
                  strokeDashoffset: drawn ? 0 : 1,
                  opacity: active.has(l.from) && active.has(l.to) ? 1 : 0.25,
                  transition: drawn
                    ? `stroke-dashoffset 600ms cubic-bezier(0.16, 1, 0.3, 1) ${i * 60}ms, opacity 300ms ease`
                    : undefined,
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
                  style={{ fill: l.color, opacity: 0 }}
                />
              )),
            )}
          </svg>

          {nodes.map((n) => (
            <div
              key={n.id}
              data-node={n.id}
              data-on="0"
              data-dim={active.has(n.id) ? undefined : '1'}
              className={`relative self-center rounded-lg border px-2 py-2.5 hyphens-auto sm:px-3 sm:hyphens-manual [grid-column:var(--r)] [grid-row:var(--c)] sm:[grid-column:var(--c)] sm:[grid-row:var(--r)] ${
                n.service ? 'border-dashed border-gray-300 bg-background' : 'border-gray-300 bg-surface shadow-sm'
              }`}
              style={{ ['--c' as string]: n.col + 1, ['--r' as string]: n.row + 1, ['--tone' as string]: colorOf(n.tone) }}
            >
              <p className="text-[13px] font-medium leading-snug text-foreground sm:text-sm">{n.label}</p>
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
              {liveText(n.live) && (
                <p data-live className="mt-2 font-mono text-[11px] font-medium leading-snug">
                  {liveText(n.live)}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
      <figcaption className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 px-6 text-xs text-foreground-faint sm:px-0">
        <span data-flow-legend className="flex flex-wrap items-center gap-x-4 gap-y-1">
          {legend.map((t) => (
            <span key={t.label} className="inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full" style={{ background: t.color }} />
              {t.label}
            </span>
          ))}
        </span>
        <span>{caption}</span>
      </figcaption>
    </figure>
  )
}
