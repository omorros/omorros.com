'use client'

import { motion, useReducedMotion, type HTMLMotionProps } from 'framer-motion'

type RevealOnScrollProps = {
  as?: 'div' | 'section' | 'header' | 'footer' | 'article'
  delay?: number
  y?: number
  duration?: number
  children: React.ReactNode
  className?: string
  id?: string
} & Omit<HTMLMotionProps<'div'>, 'initial' | 'whileInView' | 'transition' | 'viewport' | 'as' | 'ref'>

const DEFAULT_EASE = [0.16, 1, 0.3, 1] as const
const DEFAULT_MARGIN = '-80px'

export function RevealOnScroll({
  as = 'div',
  delay = 0,
  y = 16,
  duration = 0.7,
  children,
  className,
  id,
  ...rest
}: RevealOnScrollProps) {
  const prefersReducedMotion = useReducedMotion()
  const Tag = motion[as] as typeof motion.div

  if (prefersReducedMotion) {
    return (
      <Tag id={id} className={className} {...rest}>
        {children}
      </Tag>
    )
  }

  return (
    <Tag
      id={id}
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: DEFAULT_MARGIN }}
      transition={{ duration, ease: DEFAULT_EASE, delay }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
