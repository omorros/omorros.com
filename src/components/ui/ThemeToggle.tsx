'use client'

// Floating top-right theme toggle.
// Uses the View Transitions API (`document.startViewTransition`) so the swap
// runs through the diamond clip-path keyframes defined in globals.css.

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setIsDark(document.documentElement.classList.contains('dark'))
  }, [])

  const swap = () => {
    const next = !isDark
    setIsDark(next)
    if (next) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  const onClick = () => {
    const doc = document as Document & { startViewTransition?: (cb: () => void) => void }
    if (doc.startViewTransition) {
      doc.startViewTransition(swap)
    } else {
      swap()
    }
  }

  if (!mounted) return null

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="fixed top-6 right-6 z-40 w-11 h-11 flex items-center justify-center rounded-full
                 bg-white/80 dark:bg-[#111]/80 backdrop-blur-md
                 border border-gray-200 dark:border-white/10
                 shadow-sm hover:shadow-md transition-shadow
                 text-gray-800 dark:text-white"
    >
      <AnimatePresence mode="wait">
        {isDark ? (
          <motion.span
            key="moon"
            initial={{ rotate: -90, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            exit={{ rotate: 90, scale: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="absolute inline-flex"
          >
            <Moon size={18} className="fill-current" />
          </motion.span>
        ) : (
          <motion.span
            key="sun"
            initial={{ rotate: -90, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            exit={{ rotate: 90, scale: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="absolute inline-flex"
          >
            <Sun size={18} className="fill-current" />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  )
}
