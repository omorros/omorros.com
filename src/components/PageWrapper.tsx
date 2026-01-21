'use client'

import { useState, useEffect, useCallback, useRef, ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
}

interface PageWrapperProps {
  pages: Page[]
}

export function PageWrapper({ pages }: PageWrapperProps) {
  const [currentPage, setCurrentPage] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [gradientOffset, setGradientOffset] = useState({ x: 0, y: 0 })
  const wrapperRef = useRef<HTMLDivElement>(null)
  const touchStartY = useRef(0)
  const lastScrollTime = useRef(0)

  // Sync state with URL hash on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace('#', '')
      const index = pages.findIndex((p) => p.id === hash)
      if (index > 0) {
        setCurrentPage(index)
      }
    }
  }, [pages])

  // Update URL hash when page changes
  useEffect(() => {
    const page = pages[currentPage]
    if (page && typeof window !== 'undefined') {
      const hash = `#${page.id}`
      if (window.location.hash !== hash) {
        window.history.replaceState(null, '', hash)
      }
    }
  }, [currentPage, pages])

  const goToPage = useCallback(
    (newPage: number) => {
      if (isAnimating) return
      if (newPage < 0 || newPage >= pages.length) return

      setDirection(newPage > currentPage ? 1 : -1)
      setIsAnimating(true)
      setCurrentPage(newPage)
    },
    [currentPage, isAnimating, pages.length]
  )

  const goNext = useCallback(() => {
    if (currentPage < pages.length - 1) {
      goToPage(currentPage + 1)
    }
  }, [currentPage, pages.length, goToPage])

  const goPrev = useCallback(() => {
    if (currentPage > 0) {
      goToPage(currentPage - 1)
    }
  }, [currentPage, goToPage])

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

  const handleWheel = useCallback(
    (e: WheelEvent) => {
      // Check if we are scrolling inside a scrollable element
      let target = e.target as HTMLElement
      while (target && target !== wrapperRef.current) {
        if (target.scrollHeight > target.clientHeight) {
          const isAtTop = target.scrollTop === 0
          const isAtBottom = Math.abs(target.scrollHeight - target.scrollTop - target.clientHeight) < 1

          // If scrolling down and not at bottom, or scrolling up and not at top, let native scroll happen
          if ((e.deltaY > 0 && !isAtBottom) || (e.deltaY < 0 && !isAtTop)) {
            return
          }
        }
        target = target.parentElement as HTMLElement
      }

      e.preventDefault()
      const now = Date.now()
      if (now - lastScrollTime.current < 600) return
      lastScrollTime.current = now

      if (e.deltaY > 0) {
        goNext()
      } else if (e.deltaY < 0) {
        goPrev()
      }
    },
    [goNext, goPrev]
  )

  useEffect(() => {
    const wrapper = wrapperRef.current
    if (wrapper) {
      wrapper.addEventListener('wheel', handleWheel, { passive: false })
      return () => wrapper.removeEventListener('wheel', handleWheel)
    }
  }, [handleWheel])

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    const deltaY = e.changedTouches[0].clientY - touchStartY.current
    const threshold = 50 // Reduced threshold for better responsiveness

    // Check for scrollable ancestors same as wheel
    let target = e.target as HTMLElement
    let isScrollable = false
    while (target && target !== wrapperRef.current) {
      if (target.scrollHeight > target.clientHeight) {
        // If movement is significant inside a scrollable area, we assume user meant to scroll content
        // But we only block page nav if they CAN scroll in that direction
        const isAtTop = target.scrollTop === 0
        const isAtBottom = Math.abs(target.scrollHeight - target.scrollTop - target.clientHeight) < 1

        if (deltaY < 0 && !isAtBottom) isScrollable = true // Swipe up (scroll down)
        if (deltaY > 0 && !isAtTop) isScrollable = true // Swipe down (scroll up)
      }
      target = target.parentElement as HTMLElement
    }

    if (isScrollable) return

    if (Math.abs(deltaY) > threshold) {
      if (deltaY < 0) {
        goNext()
      } else {
        goPrev()
      }
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY })

    // Parallax effect for gradient
    const centerX = window.innerWidth / 2
    const centerY = window.innerHeight / 2
    const deltaX = (e.clientX - centerX) / 25
    const deltaY = (e.clientY - centerY) / 25
    setGradientOffset({ x: deltaX, y: deltaY })
  }

  const pageVariants = {
    enter: (dir: number) => ({
      y: dir > 0 ? '30%' : '-30%',
      opacity: 0,
    }),
    center: {
      y: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      y: dir > 0 ? '-20%' : '20%',
      opacity: 0,
    }),
  }

  const page = pages[currentPage]

  return (
    <div
      ref={wrapperRef}
      className="fixed inset-0 w-full h-full overflow-hidden bg-black"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
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

      {/* Gradient Backgrounds with Crossfade */}
      <div className="fixed inset-0 z-0">
        {pages.map((p, idx) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0 }}
            animate={{
              opacity: idx === currentPage ? 1 : 0,
            }}
            transition={{
              duration: 0.5,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <Image
              src={p.gradient}
              alt=""
              width={600}
              height={600}
              priority={idx <= 1}
              className="animate-spin-slow"
              style={{
                transform: `translate(${gradientOffset.x}px, ${gradientOffset.y}px)`,
                transition: 'transform 0.3s ease-out',
                animationDuration: '25s',
              }}
              draggable={false}
            />
          </motion.div>
        ))}
      </div>

      {/* Navigation Header - Show on non-home pages */}
      <AnimatePresence>
        {!page.isHome && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 left-0 right-0 z-20 px-6 md:px-12 py-6"
          >
            <div className="max-w-4xl mx-auto flex items-center justify-between">
              <ProgressDots
                total={pages.length}
                current={currentPage}
                onDotClick={goToPage}
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
        )}
      </AnimatePresence>

      {/* Page Content */}
      <AnimatePresence
        mode="wait"
        custom={direction}
        onExitComplete={() => setIsAnimating(false)}
      >
        <motion.div
          key={page.id}
          custom={direction}
          variants={pageVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            type: 'tween',
            duration: 0.35,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="absolute inset-0 flex flex-col"
        >
          {/* Page Header for non-home pages */}
          {!page.isHome && page.title && (
            <div className="pt-24 md:pt-28 px-6 md:px-12">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-semibold text-[rgba(242,242,242,0.9)]">
                  <AnimatedWords text={page.title} />
                </h2>
                {page.description && (
                  <p className="mt-4 text-lg text-[rgba(242,242,242,0.6)]">
                    <AnimatedWords text={page.description} delay={0.08} />
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className={`flex-1 px-6 md:px-12 ${page.isHome
              ? 'flex items-center justify-center'
              : 'pt-8 pb-20 overflow-y-auto'
              }`}
          >
            <div className={`max-w-4xl mx-auto w-full ${page.isHome ? '' : 'relative z-10'}`}>
              {page.content}

              {!page.isHome && currentPage < pages.length - 1 && (
                <div className="flex justify-center py-12 opacity-60 hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={goNext}
                    className="flex flex-col items-center gap-2 group"
                    aria-label="Wait, scroll down to next section"
                  >
                    <span className="text-xs font-light tracking-[0.2em] uppercase text-white/50 group-hover:text-white/90 transition-colors">
                      Scroll
                    </span>
                    <ChevronDown
                      size={20}
                      className="text-white/50 group-hover:text-white/90 transition-colors animate-bounce"
                    />
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

// Word-by-word animation component
function AnimatedWords({ text, delay = 0 }: { text: string; delay?: number }) {
  const words = text.split(' ')

  return (
    <span style={{ display: 'inline-flex', flexWrap: 'wrap', gap: '0.3em' }}>
      {words.map((word, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 10, filter: 'blur(3px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{
            duration: 0.25,
            delay: delay + index * 0.04,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{ display: 'inline-block' }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  )
}
