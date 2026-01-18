'use client'

import { motion } from 'framer-motion'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <motion.footer
      className="py-8 text-center"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <p className="text-white/40 text-sm">
        &copy; {currentYear} Oriol Morros Vilaseca
      </p>
    </motion.footer>
  )
}
