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
        I am a Software Engineering student at Anglia Ruskin University in
        Cambridge, passionate about building innovative solutions that make a
        difference.
      </motion.p>
      <motion.p
        variants={itemVariants}
        className="text-foreground-muted leading-8 font-medium"
      >
        My interests span across AI/ML, IoT, and full-stack development. I love
        tackling challenging problems and turning ideas into working products
        that solve real-world problems.
      </motion.p>
      <motion.p
        variants={itemVariants}
        className="text-foreground-muted leading-8 font-medium"
      >
        Originally from Barcelona, I moved to Cambridge to pursue my degree and
        have been exploring the vibrant tech scene ever since.
      </motion.p>
      
      <motion.div variants={itemVariants} className="pt-4">
        <Button href={siteConfig.links.resume} icon={<FileText size={18} />}>
          Download Resume
        </Button>
      </motion.div>
    </motion.div>
  )
}
