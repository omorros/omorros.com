'use client'

import { useState, useEffect, useRef, useCallback, ReactNode } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent, useInView, MotionValue } from 'framer-motion'
import { ChevronUp, ChevronDown } from 'lucide-react'
import { ProgressDots } from './ProgressDots'
import Image from 'next/image'

interface Page {
  id: string
  title?: string
  description?: string
  gradient: string
  glowColor: string
  content: ReactNode
  isHome?: boolean
  compact?: boolean // For content-light sections
}

interface PageWrapperProps {
  pages: Page[]
}

export function PageWrapper({ pages }: PageWrapperProps) {
  const [currentPage, setCurrentPage] = useState(0)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [gradientOffset, setGradientOffset] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  const sectionRefs = useRef<(HTMLElement | null)[]>([])

  const { scrollYProgress } = useScroll({
    container: containerRef,
  })

  // Track current section based on scroll position
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const sectionIndex = Math.round(latest * (pages.length - 1))
    if (sectionIndex !== currentPage) {
      setCurrentPage(sectionIndex)
    }
  })

  // Parallax effect for gradient Y position
  const gradientY = useTransform(scrollYProgress, [0, 1], [0, -150])

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY })

    // Parallax effect for gradient
    const centerX = window.innerWidth / 2
    const centerY = window.innerHeight / 2
    const deltaX = (e.clientX - centerX) / 25
    const deltaY = (e.clientY - centerY) / 25
    setGradientOffset({ x: deltaX, y: deltaY })
  }

  const scrollToSection = useCallback((index: number) => {
    sectionRefs.current[index]?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  const goNext = useCallback(() => {
    if (currentPage < pages.length - 1) {
      scrollToSection(currentPage + 1)
    }
  }, [currentPage, pages.length, scrollToSection])

  const goPrev = useCallback(() => {
    if (currentPage > 0) {
      scrollToSection(currentPage - 1)
    }
  }, [currentPage, scrollToSection])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.repeat) return
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault()
        goNext()
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault()
        goPrev()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [goNext, goPrev])

  const page = pages[currentPage]

  return (
    <div
      ref={containerRef}
      className="h-screen overflow-y-auto overflow-x-hidden bg-black"
      onMouseMove={handleMouseMove}
    >
      {/* Cursor Glow Effect */}
      <div
        className="pointer-events-none fixed z-50 transition-opacity duration-300"
        style={{
          left: mousePos.x,
          top: mousePos.y,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div
          className="w-[500px] h-[500px] rounded-full opacity-30 blur-[80px] transition-all duration-500"
          style={{
            background: `radial-gradient(circle, ${page.glowColor} 0%, transparent 65%)`,
          }}
        />
      </div>

      {/* Gradient Backgrounds with Scroll-linked Opacity */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {pages.map((p, idx) => (
          <GradientLayer
            key={p.id}
            gradient={p.gradient}
            index={idx}
            totalPages={pages.length}
            scrollYProgress={scrollYProgress}
            gradientY={gradientY}
            gradientOffset={gradientOffset}
          />
        ))}
      </div>

      {/* Navigation Header - Fixed */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: currentPage > 0 ? 1 : 0, y: currentPage > 0 ? 0 : -20 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-20 px-6 md:px-12 py-6"
        style={{ pointerEvents: currentPage > 0 ? 'auto' : 'none' }}
      >
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <ProgressDots
            total={pages.length}
            current={currentPage}
            onDotClick={scrollToSection}
          />
          <div className="flex items-center gap-1">
            {currentPage > 0 && (
              <button
                onClick={goPrev}
                className="p-2 text-white/60 hover:text-white/90 transition-colors duration-200"
                aria-label="Previous page"
              >
                <ChevronUp size={20} />
              </button>
            )}
            {currentPage < pages.length - 1 && (
              <button
                onClick={goNext}
                className="p-2 text-white/60 hover:text-white/90 transition-colors duration-200"
                aria-label="Next page"
              >
                <ChevronDown size={20} />
              </button>
            )}
          </div>
        </div>
      </motion.div>

      {/* All Sections Stacked Vertically */}
      {pages.map((p, idx) => (
        <section
          key={p.id}
          id={p.id}
          ref={(el) => { sectionRefs.current[idx] = el }}
          className={`scroll-section flex flex-col relative ${
            p.isHome ? 'min-h-screen' : p.compact ? 'min-h-[75vh]' : 'min-h-screen'
          }`}
        >
          {/* Page Header for non-home pages */}
          {!p.isHome && p.title && (
            <SectionHeader title={p.title} description={p.description} />
          )}

          {/* Main Content */}
          <div
            className={`flex-1 px-6 md:px-12 ${
              p.isHome
                ? 'flex items-center justify-center'
                : 'pt-8 pb-20'
            }`}
          >
            <div className={`max-w-4xl mx-auto w-full ${p.isHome ? '' : 'relative z-10'}`}>
              {p.content}
            </div>
          </div>
        </section>
      ))}
    </div>
  )
}

// Gradient layer component with proper hook usage
interface GradientLayerProps {
  gradient: string
  index: number
  totalPages: number
  scrollYProgress: MotionValue<number>
  gradientY: MotionValue<number>
  gradientOffset: { x: number; y: number }
}

function GradientLayer({
  gradient,
  index,
  totalPages,
  scrollYProgress,
  gradientY,
  gradientOffset,
}: GradientLayerProps) {
  const sectionProgress = 1 / (totalPages - 1)

  // Calculate opacity based on section position
  const opacity = useTransform(scrollYProgress, (value) => {
    if (index === 0) {
      // First gradient: full opacity at 0, fades out
      return Math.max(0, 1 - value / (sectionProgress * 0.5))
    }
    if (index === totalPages - 1) {
      // Last gradient: fades in near end
      const start = 1 - sectionProgress * 0.5
      return Math.max(0, Math.min(1, (value - start) / (sectionProgress * 0.5)))
    }
    // Middle gradients: fade in and out around their section
    const peak = index * sectionProgress
    const distance = Math.abs(value - peak)
    const fadeRange = sectionProgress * 0.6
    return Math.max(0, 1 - distance / fadeRange)
  })

  return (
    <motion.div
      style={{ opacity, y: gradientY }}
      className="absolute inset-0 flex items-center justify-center"
    >
      <Image
        src={gradient}
        alt=""
        width={600}
        height={600}
        priority={index <= 1}
        className="animate-spin-slow"
        style={{
          transform: `translate(${gradientOffset.x}px, ${gradientOffset.y}px)`,
          transition: 'transform 0.3s ease-out',
          animationDuration: '25s',
        }}
        draggable={false}
      />
    </motion.div>
  )
}

// Word-by-word animation component
function AnimatedWords({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  const words = text.split(' ')

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: delay,
      },
    },
  }

  const wordVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      filter: 'blur(4px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  }

  return (
    <motion.span
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={className}
      style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3em' }}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={wordVariants}
          style={{ display: 'inline-block' }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  )
}

// Section header with word-by-word scroll-reveal animation
function SectionHeader({ title, description }: { title: string; description?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  const descriptionWords = description?.split(' ') || []

  return (
    <div
      ref={ref}
      className="pt-24 md:pt-28 px-6 md:px-12"
    >
      <div className="max-w-4xl mx-auto">
        {isInView && (
          <>
            <h2 className="text-2xl font-semibold text-[rgba(242,242,242,0.9)]">
              <AnimatedWords text={title} />
            </h2>
            {description && (
              <motion.p
                className="mt-4 text-lg text-[rgba(242,242,242,0.6)] flex flex-wrap gap-[0.3em]"
              >
                {descriptionWords.map((word, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: 0.3 + index * 0.05,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    style={{ display: 'inline-block' }}
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.p>
            )}
          </>
        )}
      </div>
    </div>
  )
}
