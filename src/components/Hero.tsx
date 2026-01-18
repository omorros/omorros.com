'use client'

import { motion } from 'framer-motion'

export function Hero() {
  return (
    <section className="relative min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      {/* Gradient background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-30"
          viewBox="0 0 800 800"
          fill="none"
        >
          <defs>
            <radialGradient
              id="heroGradient"
              cx="50%"
              cy="50%"
              r="50%"
              fx="50%"
              fy="50%"
            >
              <stop offset="0%" stopColor="#90caf9" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#64b5f6" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#0a0a0a" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="400" cy="400" r="400" fill="url(#heroGradient)" />
        </svg>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10"
      >
        <motion.h1
          className="text-4xl md:text-6xl font-bold text-white mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Oriol Morros Vilaseca
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-white/60 mb-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Software Engineer in Cambridge, UK
        </motion.p>

        <motion.p
          className="text-lg text-accent/80"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          AI/ML Enthusiast | ARU Student
        </motion.p>
      </motion.div>
    </section>
  )
}
