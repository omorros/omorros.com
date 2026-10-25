'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { streamlines, toPath } from '@/lib/flow-field'

// The hackathon wins call to action on /projects. A field of flow lines
// draws in as it scrolls into view, the number counts up, and particles
// keep drifting along the lines towards the link. Hover speeds them up.

const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)'
const DRAW_MS = 1100
const FAST = 3.5

type Stage = 'static' | 'armed' | 'drawn'

export function HackathonWinsCta({ wins }: { wins: number }) {
  const linkRef = useRef<HTMLAnchorElement>(null)
  const particleRefs = useRef<(SVGPathElement | null)[]>([])
  const animations = useRef<Animation[]>([])
  const visible = useRef(false)
  const [size, setSize] = useState<{ w: number; h: number } | null>(null)
  const [stage, setStage] = useState<Stage>('static')
  const [count, setCount] = useState(wins)
  const [flowing, setFlowing] = useState(false)
  const [reduced, setReduced] = useState(false)

  const paths = useMemo(
    () => (size ? streamlines(size.w, size.h).map(toPath) : []),
    [size],
  )

  // Measure, and decide whether the entrance still has to play.
  useEffect(() => {
    const el = linkRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    setSize({ w: Math.round(rect.width), h: Math.round(rect.height) })
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setReduced(calm)
    const onScreen = rect.top < window.innerHeight && rect.bottom > 0
    if (calm || onScreen) {
      setStage('drawn')
      if (!calm) setFlowing(true)
    } else {
      setStage('armed')
      setCount(0)
    }

    const resize = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      setSize((s) =>
        s && Math.abs(s.w - width) < 24 && Math.abs(s.h - height) < 24
          ? s
          : { w: Math.round(width), h: Math.round(height) },
      )
    })
    resize.observe(el)
    return () => resize.disconnect()
  }, [])

  // Play the entrance once, when most of the block is on screen.
  useEffect(() => {
    if (stage !== 'armed' || !linkRef.current) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        io.disconnect()
        setStage('drawn')
        const start = performance.now() + 150
        const tick = (now: number) => {
          const t = Math.min(1, Math.max(0, (now - start) / 900))
          setCount(Math.round((1 - Math.pow(1 - t, 4)) * wins))
          if (t < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
        window.setTimeout(() => setFlowing(true), DRAW_MS)
      },
      { threshold: 0.4 },
    )
    io.observe(linkRef.current)
    return () => io.disconnect()
  }, [stage, wins])

  // Particles drift along the lines, and only while the block is visible.
  useEffect(() => {
    if (!flowing || reduced) return
    const running = particleRefs.current
      .filter((p): p is SVGPathElement => p !== null)
      .map((p, i) =>
        p.animate([{ strokeDashoffset: 0 }, { strokeDashoffset: -0.25 }], {
          duration: 2600 + (i % 5) * 320,
          delay: -((i * 173) % 2600),
          iterations: Infinity,
          easing: 'linear',
        }),
      )
    animations.current = running
    if (!visible.current) running.forEach((a) => a.pause())
    return () => running.forEach((a) => a.cancel())
  }, [flowing, reduced, paths])

  useEffect(() => {
    const el = linkRef.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => {
      visible.current = entry.isIntersecting
      animations.current.forEach((a) => (entry.isIntersecting ? a.play() : a.pause()))
    })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // Set directly: updatePlaybackRate waits a few frames, which feels laggy.
  // Changing the rate keeps each particle where it is.
  const setSpeed = (rate: number) =>
    animations.current.forEach((a) => (a.playbackRate = rate))

  const animate = stage === 'drawn' && !reduced

  return (
    <Link
      ref={linkRef}
      href="/hackathons"
      data-cta="hackathon-wins"
      aria-label={`${wins} hackathon wins in 2026. See them all`}
      onMouseEnter={() => setSpeed(FAST)}
      onMouseLeave={() => setSpeed(1)}
      onFocus={() => setSpeed(FAST)}
      onBlur={() => setSpeed(1)}
      className="group relative block overflow-hidden rounded-lg border border-gray-200 bg-gray-100 transition-colors hover:border-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500"
    >
      {size && (
        <svg
          aria-hidden="true"
          viewBox={`0 0 ${size.w} ${size.h}`}
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{
            maskImage:
              'linear-gradient(100deg, rgba(0,0,0,0.15) 10%, rgba(0,0,0,0.55) 40%, #000 78%)',
            WebkitMaskImage:
              'linear-gradient(100deg, rgba(0,0,0,0.15) 10%, rgba(0,0,0,0.55) 40%, #000 78%)',
          }}
        >
          {paths.map((d, i) => (
            <path
              key={`l${i}`}
              data-line
              d={d}
              pathLength={1}
              fill="none"
              strokeWidth={1}
              className="stroke-gray-300 group-hover:stroke-gray-400 group-focus-visible:stroke-gray-400"
              style={{
                strokeDasharray: 1,
                strokeDashoffset: stage === 'armed' ? 1 : 0,
                transition: animate
                  ? `stroke-dashoffset ${DRAW_MS}ms ${EASE} ${(i * 37) % 400}ms, stroke 300ms`
                  : 'stroke 300ms',
              }}
            />
          ))}
          {paths.map((d, i) =>
            i % 2 ? null : (
              <path
                key={`p${i}`}
                ref={(el) => {
                  particleRefs.current[i / 2] = el
                }}
                d={d}
                pathLength={1}
                fill="none"
                strokeWidth={1.6}
                strokeLinecap="round"
                className="stroke-gray-500 group-hover:stroke-blue-500 group-focus-visible:stroke-blue-500"
                style={{
                  strokeDasharray: '0.012 0.238',
                  opacity: flowing && !reduced ? 1 : 0,
                  transition: 'opacity 600ms, stroke 300ms',
                }}
              />
            ),
          )}
        </svg>
      )}

      <div className="relative flex items-center gap-5 px-6 py-8 md:gap-8 md:px-10 md:py-12">
        <span
          data-count
          aria-hidden="true"
          className="text-7xl font-semibold leading-none tracking-tight text-gray-900 tabular-nums md:text-8xl"
        >
          {count}
        </span>
        <span aria-hidden="true">
          <span className="block text-xl font-semibold text-gray-900 text-balance md:text-2xl">
            hackathon wins in 2026.
          </span>
          <span className="inline-flex items-center mt-2 font-medium text-blue-500">
            See them all
            <ChevronRight className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </span>
      </div>
    </Link>
  )
}
