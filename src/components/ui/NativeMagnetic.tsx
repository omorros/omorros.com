'use client'

import { useRef, type ReactNode } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { cn } from '@/lib/utils'

type NativeMagneticProps = {
  children: ReactNode
  className?: string
  /**
   * Multiplier applied to the cursor offset (0–1). 0.2 is subtle, 0.5 strong.
   * Defaults to 0.5 to mirror syedsubhan.in.
   */
  strength?: number
}

/**
 * Wraps its children with a magnetic hover: as the cursor moves over the
 * element, the inner content translates toward the cursor by `strength` of
 * the offset, clamped to ~35% of the element's largest dimension.
 *
 * Pure framer-motion - no GSAP dependency.
 */
export function NativeMagnetic({
  children,
  className,
  strength = 0.5,
}: NativeMagneticProps) {
  const ref = useRef<HTMLDivElement>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 }
  const xs = useSpring(x, springConfig)
  const ys = useSpring(y, springConfig)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = (e.clientX - cx) * strength
    const dy = (e.clientY - cy) * strength
    const max = Math.max(rect.width, rect.height) * 0.35
    const clampedX = Math.abs(dx) > max ? Math.sign(dx) * max : dx
    const clampedY = Math.abs(dy) > max ? Math.sign(dy) * max : dy
    x.set(clampedX)
    y.set(clampedY)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: xs, y: ys }}
      className={cn('inline-block', className)}
    >
      {children}
    </motion.div>
  )
}
