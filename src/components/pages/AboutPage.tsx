'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FileText } from 'lucide-react'
import { useIsMobile } from '@/hooks/useIsMobile'
import { Button } from '@/components/ui/Button'
import { siteConfig } from '@/lib/constants'

export function AboutPage() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, margin: '-100px' })
  const isMobile = useIsMobile()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: isMobile ? 0.08 : 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: isMobile ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: isMobile ? 0.3 : 0.5,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className="space-y-6"
    >
      <motion.p
        variants={itemVariants}
        className="text-foreground-muted leading-8 font-medium"
      >
        I&apos;m a Software Engineering student at Anglia Ruskin University in
        Cambridge, originally from Barcelona. I enjoy building things that are
        actually useful to me, from full-stack apps to IoT devices with sensor
        fusion, and I&apos;m currently diving deeper into AI, software
        engineering, and systems design.
      </motion.p>
      <motion.p
        variants={itemVariants}
        className="text-foreground-muted leading-8 font-medium"
      >
        Outside of code, basketball has been my favourite sport for as long as I
        can remember. I also spend a lot of time at the gym, enjoy cooking, and
        play chess whenever I have some free time.
      </motion.p>
      
      <motion.div variants={itemVariants} className="pt-4">
        <Button href={siteConfig.links.resume} icon={<FileText size={18} />}>
          Download Resume
        </Button>
      </motion.div>
    </motion.div>
  )
}
