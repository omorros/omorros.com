'use client'

import { useRef } from 'react'
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion'
import { Home, Briefcase, Layers, BookOpen, FolderGit2, Mail } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

const ITEMS = [
  { id: 'home', label: 'Top', icon: Home, href: '#about' },
  { id: 'work', label: 'Career Path', icon: Briefcase, href: '#work' },
  { id: 'skills', label: 'Tech Stack', icon: Layers, href: '#skills' },
  { id: 'articles', label: 'Articles', icon: BookOpen, href: '#articles' },
  { id: 'projects', label: 'Projects', icon: FolderGit2, href: '#projects' },
  { id: 'contact', label: 'Contact', icon: Mail, href: '#contact' },
]

export function AppleDock() {
  const mouseX = useMotionValue(Infinity)

  return (
    <motion.div
      initial={{ y: 150, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 250, damping: 25, delay: 0.4 }}
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 hidden md:flex items-end h-16 gap-2 px-4 pb-3 rounded-2xl
                 bg-white/80 dark:bg-[#111]/80 backdrop-blur-md border border-gray-200 dark:border-white/10 shadow-lg"
    >
      {ITEMS.map((item) => (
        <DockItem key={item.id} mouseX={mouseX} {...item} />
      ))}
    </motion.div>
  )
}

function DockItem({
  mouseX,
  label,
  icon: Icon,
  href,
}: {
  mouseX: MotionValue<number>
  label: string
  icon: LucideIcon
  href: string
}) {
  const ref = useRef<HTMLAnchorElement>(null)

  // Distance from cursor to centre of this icon
  const distance = useTransform(mouseX, (v) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 }
    return v - bounds.x - bounds.width / 2
  })

  // Map distance to scale: 1 (no proximity) → 1.7 (cursor centred)
  const widthSync = useTransform(distance, [-150, 0, 150], [40, 68, 40])
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 })

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ width }}
      className="aspect-square flex items-center justify-center rounded-xl bg-foreground/5 hover:bg-foreground/10 text-foreground transition-colors group relative"
      aria-label={label}
    >
      <Icon className="w-1/2 h-1/2 text-foreground" />
      {/* Tooltip above on hover */}
      <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap bg-foreground text-background text-[11px] px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity font-mono uppercase tracking-wider">
        {label}
      </span>
    </motion.a>
  )
}
