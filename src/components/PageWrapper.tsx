'use client'

import { useState, useEffect, useRef, ReactNode } from 'react'
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
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const sectionRefs = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    // Initialize mouse position to center for mobile/initial load
    setMousePos({ x: window.innerWidth / 2, y: window.innerHeight / 2 })
  }, [])

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY })
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = pages.findIndex((p) => p.id === entry.target.id)
            if (index !== -1) {
              setCurrentPage(index)
              if (window.location.hash !== `#${pages[index].id}`) {
                window.history.replaceState(null, '', `#${pages[index].id}`)
              }
            }
          }
        })
      },
      { threshold: 0.4 }
    )

    sectionRefs.current.forEach((section) => {
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [pages])

  const scrollToPage = (index: number) => {
    const section = document.getElementById(pages[index].id)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const goNext = () => {
    if (currentPage < pages.length - 1) scrollToPage(currentPage + 1)
  }

  const goPrev = () => {
    if (currentPage > 0) scrollToPage(currentPage - 1)
  }

  const activePage = pages[currentPage]

  return (
    <div
      className="relative w-full bg-black text-foreground-muted"
      onMouseMove={handleMouseMove}
    >
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div
          className="absolute z-10 transition-opacity duration-300"
          style={{
            left: mousePos.x,
            top: mousePos.y,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div
            className="w-[500px] h-[500px] rounded-full opacity-30 blur-[80px] transition-all duration-500"
            style={{
              background: `radial-gradient(circle, ${activePage?.glowColor || '#8f46db'} 0%, transparent 65%)`,
            }}
          />
        </div>

        {pages.map((p, idx) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: idx === currentPage ? 1 : 0 }}
            transition={{ duration: 1, ease: 'linear' }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Image
              src={p.gradient}
              alt=""
              width={600}
              height={600}
              priority={idx <= 1}
              className="animate-spin-slow opacity-60"
            />
          </motion.div>
        ))}
      </div>

      <div className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-3 pointer-events-none hidden md:block">
        <div className="max-w-4xl mx-auto flex items-center justify-between pointer-events-auto">
          <AnimatePresence>
            {currentPage > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-4 w-full justify-between"
              >
                <ProgressDots
                  total={pages.length}
                  current={currentPage}
                  onDotClick={scrollToPage}
                />
                <div className="flex items-center gap-1">
                  <button
                    onClick={goPrev}
                    className="p-2 hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-accent rounded-md"
                    aria-label="Previous section"
                  >
                    <ChevronUp />
                  </button>
                  <button
                    onClick={goNext}
                    className="p-2 hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-accent rounded-md"
                    aria-label="Next section"
                  >
                    <ChevronDown />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <main className="w-full relative z-10 md:h-screen md:overflow-y-auto md:snap-y md:snap-mandatory md:scroll-smooth md:no-scrollbar">
        {pages.map((p, idx) => (
          <section
            key={p.id}
            id={p.id}
            ref={(el) => {
              if (el) sectionRefs.current[idx] = el
            }}
            className="w-full min-h-[100dvh] md:min-h-0 md:h-screen md:snap-start flex flex-col items-center relative px-6 py-20 md:px-12 md:py-16 md:pt-24"
          >
            <div className="w-full max-w-4xl mx-auto flex flex-col justify-center my-auto">
              {!p.isHome && (
                <div className="mb-6 md:mb-10 mt-4 md:mt-0">
                  <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-2 md:mb-4">
                    <AnimatedWords text={p.title || ''} />
                  </h2>
                  {p.description && (
                    <p className="text-xl text-foreground-dim">
                      <AnimatedWords text={p.description} delay={0.1} />
                    </p>
                  )}
                </div>
              )}

              <div className="w-full relative z-10">{p.content}</div>
            </div>
          </section>
        ))}
      </main>
    </div>
  )
}

function AnimatedWords({ text, delay = 0 }: { text: string; delay?: number }) {
  const words = text.split(' ')

  return (
    <span style={{ display: 'inline-flex', flexWrap: 'wrap', gap: '0.3em' }}>
      {words.map((word, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 10, filter: 'blur(3px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
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
