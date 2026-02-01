'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  href?: string
  onClick?: () => void
  icon?: ReactNode
  className?: string
}

export function Button({
  children,
  href,
  onClick,
  icon,
  className = '',
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center gap-2 px-5 py-2.5 rounded-[1.5rem] text-sm font-medium transition-all duration-250 bg-transparent border border-glass-border text-foreground-muted hover:bg-accent-glass hover:border-accent-glass-strong hover:text-foreground'

  const Component = href ? motion.a : motion.button

  const isExternal = href?.startsWith('http');

  return (
    <Component
      href={href}
      onClick={onClick}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className={`${baseStyles} ${className} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {icon && <span className="text-foreground-muted">{icon}</span>}
      {children}
      {isExternal && <span className="sr-only">(opens in a new tab)</span>}
    </Component>
  )
}
