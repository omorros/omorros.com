'use client'

// Scroll-driven gradient fill: text starts faint and fills with the foreground
// color from left to right as the user scrolls past it. Pattern lives in the
// "TextRevealCard" family (Aceternity UI / shadcn community variants, MIT).

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface ScrollFillTextProps {
  text: string
  className?: string
}

export function ScrollFillText({ text, className }: ScrollFillTextProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'end 0.4'],
  })

  const words = text.split(' ')

  return (
    <div ref={ref} className="py-24 md:py-32">
      <p
        className={
          className ??
          'mx-auto max-w-3xl text-balance text-center font-display text-3xl md:text-5xl leading-tight tracking-tight'
        }
      >
        {words.map((word, i) => {
          const start = i / words.length
          const end = start + 1 / words.length
          return <Word key={i} progress={scrollYProgress} range={[start, end]}>{word}</Word>
        })}
      </p>
    </div>
  )
}

function Word({
  children,
  progress,
  range,
}: {
  children: React.ReactNode
  progress: import('framer-motion').MotionValue<number>
  range: [number, number]
}) {
  const opacity = useTransform(progress, range, [0.18, 1])
  return (
    <motion.span style={{ opacity }} className="mr-[0.25em] inline-block text-foreground">
      {children}
    </motion.span>
  )
}
