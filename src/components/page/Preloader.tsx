'use client'

// Multilingual greeting splash. Ported from syedsubhan.in's Preloader.tsx
// (https://github.com/Subhan-code/My-Portfolio-/blob/main/components/Preloader.tsx)
// - adapted to project tokens, Next.js 14, sessionStorage skip, and self-unmount.

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

const GREETINGS = [
  'Hello',
  'Bonjour',
  'Hola',
  'Olá',
  '你好',
  'こんにちは',
  'Hallo',
  'Salut',
]

const SESSION_KEY = 'preloader-shown'

export function Preloader() {
  // Start hidden; flip on after sessionStorage check so we don't flash on subsequent loads.
  const [mounted, setMounted] = useState(false)
  const [visible, setVisible] = useState(false)
  const [index, setIndex] = useState(0)

  useEffect(() => {
    setMounted(true)
    try {
      if (sessionStorage.getItem(SESSION_KEY) === '1') return
      sessionStorage.setItem(SESSION_KEY, '1')
    } catch {
      // sessionStorage unavailable (SSR / privacy mode) - show preloader anyway.
    }
    setVisible(true)
  }, [])

  // Body scroll lock - scoped to `visible` so cleanup fires the moment we flip off.
  // (The component itself doesn't unmount when visible becomes false - AnimatePresence
  // only unmounts the inner motion.div - so we cannot rely on Preloader's unmount
  // for cleanup. This keyed effect makes the lock release atomically with visible=false.)
  useEffect(() => {
    if (!visible) return
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [visible])

  useEffect(() => {
    if (!visible) return
    if (index >= GREETINGS.length - 1) {
      // Final greeting - hold briefly, then exit.
      const t = setTimeout(() => setVisible(false), 450)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => setIndex((i) => i + 1), index === 0 ? 420 : 220)
    return () => clearTimeout(t)
  }, [index, visible])

  // Hard cap - total cycle ~2.5s - guarantees we never trap the page.
  useEffect(() => {
    if (!visible) return
    const cap = setTimeout(() => setVisible(false), 2500)
    return () => clearTimeout(cap)
  }, [visible])

  if (!mounted) return null

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          initial={{ y: 0 }}
          exit={{
            y: '-100vh',
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.1 },
          }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background text-foreground overflow-visible cursor-wait"
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={GREETINGS[index]}
              initial={{ opacity: 0, y: 8, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -8, filter: 'blur(8px)' }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              className={cn(
                'font-display italic text-5xl md:text-7xl tracking-tight text-foreground',
                GREETINGS[index] === 'こんにちは' && 'not-italic font-bold',
              )}
            >
              {GREETINGS[index]}
            </motion.span>
          </AnimatePresence>

          {/* Curve tail - drips below the splash on exit */}
          <svg
            className="absolute top-full w-full h-[20vh] fill-background pointer-events-none"
            preserveAspectRatio="none"
            viewBox="0 0 100 100"
          >
            <path d="M0 0 Q50 100 100 0 L100 0 L0 0" vectorEffect="non-scaling-stroke" />
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
