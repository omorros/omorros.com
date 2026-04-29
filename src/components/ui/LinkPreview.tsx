'use client'

// Cursor-tracking link preview - when the user hovers the link, a small
// thumbnail follows the cursor at the offset above the text. Pattern follows
// Aceternity UI's LinkPreview (MIT). Pure framer-motion, no external deps.

import { useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion'
import Image from 'next/image'

interface LinkPreviewProps {
  href: string
  imageSrc: string
  width?: number
  height?: number
  children: React.ReactNode
}

export function LinkPreview({
  href,
  imageSrc,
  width = 200,
  height = 125,
  children,
}: LinkPreviewProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLAnchorElement>(null)

  const x = useMotionValue(0)
  const xs = useSpring(x, { stiffness: 100, damping: 15 })

  const onMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const offset = e.clientX - rect.left
    x.set(offset - width / 2)
  }

  return (
    <a
      ref={ref}
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onMouseMove={onMove}
      className="relative inline-block underline decoration-dotted decoration-foreground-faint underline-offset-4 hover:text-accent transition-colors"
    >
      {children}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.6 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              transition: { type: 'spring', stiffness: 260, damping: 20 },
            }}
            exit={{ opacity: 0, y: 10, scale: 0.6 }}
            style={{ x: xs, top: -(height + 14) }}
            className="absolute left-0 z-30 pointer-events-none rounded-lg border border-border bg-background shadow-2xl overflow-hidden"
          >
            <Image
              src={imageSrc}
              alt=""
              width={width}
              height={height}
              className="block object-cover"
              style={{ width, height }}
              priority={false}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </a>
  )
}
