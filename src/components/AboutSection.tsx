'use client'

import { motion } from 'framer-motion'

export function AboutSection() {
  return (
    <motion.section
      className="max-w-2xl mx-auto px-4 py-16 text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-2xl font-semibold text-white mb-6">About</h2>
      <p className="text-white/70 leading-relaxed">
        I&apos;m a Software Engineering student at Anglia Ruskin University in
        Cambridge, passionate about building innovative solutions that make a
        difference. My interests span across AI/ML, IoT, and full-stack
        development. I love tackling challenging problems and turning ideas into
        working products.
      </p>
    </motion.section>
  )
}
