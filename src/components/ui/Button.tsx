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
    'inline-flex items-center gap-2 px-5 py-2.5 rounded-[1.5rem] text-sm font-medium transition-all duration-250 bg-transparent border border-[rgba(242,242,242,0.15)] text-[rgba(242,242,242,0.8)] hover:bg-[rgba(144,202,249,0.08)] hover:border-[rgba(144,202,249,0.3)] hover:text-[rgba(242,242,242,0.95)]'

  const Component = href ? motion.a : motion.button

  return (
    <Component
      href={href}
      onClick={onClick}
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      className={`${baseStyles} ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {icon && <span className="text-[rgba(242,242,242,0.8)]">{icon}</span>}
      {children}
    </Component>
  )
}
