'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { cn } from '@/lib/utils'

type StellarBuddyProps = {
  className?: string
  /**
   * Size in px of the circular face. Pupils & travel scale with this.
   * Default 24.
   */
  size?: number
}

/**
 * Tiny circular face with two pupils that track the mouse.
 * Lives inside the DynamicNavigation pill.
 *
 * - Cursor offset relative to the face centre is clamped to a 4px radius.
 * - Eyes blink (scaleY 0) every 3-6s for ~110ms.
 */
export default function StellarBuddy({ className, size = 24 }: StellarBuddyProps) {
  const faceRef = useRef<HTMLDivElement>(null)

  // Raw mouse offsets relative to face centre, clamped to MAX_TRAVEL.
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Spring smoothing so pupils glide rather than jitter.
  const sx = useSpring(x, { stiffness: 350, damping: 28, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 350, damping: 28, mass: 0.4 })

  // Both pupils share the same translation.
  const pupilX = useTransform(sx, (v) => v)
  const pupilY = useTransform(sy, (v) => v)

  const [blink, setBlink] = useState(false)

  useEffect(() => {
    const MAX_TRAVEL = 4 // px
    const handleMove = (e: MouseEvent) => {
      const el = faceRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const dist = Math.hypot(dx, dy)
      if (dist === 0) {
        x.set(0)
        y.set(0)
        return
      }
      const clamped = Math.min(dist, 60) // saturate beyond ~60px from face
      const scale = (clamped / 60) * MAX_TRAVEL
      x.set((dx / dist) * scale)
      y.set((dy / dist) * scale)
    }
    window.addEventListener('mousemove', handleMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMove)
  }, [x, y])

  // Blink loop: random 3–6s gap, 110ms closed.
  useEffect(() => {
    let openTimer: ReturnType<typeof setTimeout>
    let closeTimer: ReturnType<typeof setTimeout>
    const loop = () => {
      const wait = 3000 + Math.random() * 3000
      openTimer = setTimeout(() => {
        setBlink(true)
        closeTimer = setTimeout(() => {
          setBlink(false)
          loop()
        }, 110)
      }, wait)
    }
    loop()
    return () => {
      clearTimeout(openTimer)
      clearTimeout(closeTimer)
    }
  }, [])

  const pupilSize = Math.max(3, Math.round(size / 6)) // ~4px for size 24
  const eyeOffset = Math.round(size * 0.22) // horizontal eye offset from centre

  return (
    <div
      ref={faceRef}
      className={cn(
        'relative shrink-0 rounded-full',
        'shadow-[inset_0_-1px_2px_rgba(0,0,0,0.25),inset_0_1px_1px_rgba(255,255,255,0.15)]',
        className,
      )}
      style={{
        width: size,
        height: size,
        background:
          'radial-gradient(circle at 35% 30%, #fafafa 0%, #cfcfcf 40%, #6f6f6f 90%)',
      }}
      aria-hidden
    >
      {/* Left eye */}
      <span
        className="absolute top-1/2 left-1/2 -translate-y-1/2"
        style={{ transform: `translate(calc(-50% - ${eyeOffset}px), -50%)` }}
      >
        <motion.span
          className="block rounded-full bg-black"
          style={{
            width: pupilSize,
            height: pupilSize,
            x: pupilX,
            y: pupilY,
            scaleY: blink ? 0.05 : 1,
          }}
          transition={{ scaleY: { duration: 0.08 } }}
        />
      </span>
      {/* Right eye */}
      <span
        className="absolute top-1/2 left-1/2 -translate-y-1/2"
        style={{ transform: `translate(calc(-50% + ${eyeOffset}px), -50%)` }}
      >
        <motion.span
          className="block rounded-full bg-black"
          style={{
            width: pupilSize,
            height: pupilSize,
            x: pupilX,
            y: pupilY,
            scaleY: blink ? 0.05 : 1,
          }}
          transition={{ scaleY: { duration: 0.08 } }}
        />
      </span>
    </div>
  )
}
