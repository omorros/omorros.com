'use client'

// Ported pattern from syedsubhan.in's NativeTypewriter:
// types each character with a blur-morph entrance, holds for ~2s, deletes, cycles.

import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const SPEED_MAP = { slow: 100, medium: 50, fast: 30 } as const

interface TypewriterProps {
  texts: string[]
  speed?: keyof typeof SPEED_MAP
  className?: string
  cursorClassName?: string
}

export function Typewriter({
  texts,
  speed = 'medium',
  className,
  cursorClassName,
}: TypewriterProps) {
  const [textIndex, setTextIndex] = useState(0)
  const [displayedText, setDisplayedText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const reduce = useReducedMotion()

  useEffect(() => {
    if (reduce) {
      setDisplayedText(texts[textIndex])
      return
    }
    const target = texts[textIndex]
    const tick = SPEED_MAP[speed]

    if (!isDeleting && displayedText !== target) {
      const t = setTimeout(
        () => setDisplayedText(target.slice(0, displayedText.length + 1)),
        tick
      )
      return () => clearTimeout(t)
    }
    if (!isDeleting && displayedText === target) {
      const t = setTimeout(() => setIsDeleting(true), 2000)
      return () => clearTimeout(t)
    }
    if (isDeleting && displayedText !== '') {
      const t = setTimeout(
        () => setDisplayedText(target.slice(0, displayedText.length - 1)),
        tick / 2
      )
      return () => clearTimeout(t)
    }
    if (isDeleting && displayedText === '') {
      setIsDeleting(false)
      setTextIndex((textIndex + 1) % texts.length)
    }
  }, [displayedText, isDeleting, textIndex, texts, speed, reduce])

  return (
    <span className={className}>
      {displayedText.split('').map((char, i) => (
        <motion.span
          key={`${textIndex}-${i}`}
          initial={{ opacity: 0, filter: 'blur(2px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.1 }}
        >
          {char}
        </motion.span>
      ))}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'linear',
        }}
        className={
          cursorClassName ??
          'ml-0.5 inline-block h-[1.1em] w-[2px] bg-accent align-bottom'
        }
        aria-hidden="true"
      />
    </span>
  )
}
