'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

// Image that opens full screen when clicked. Click anywhere or press
// Escape to close. Both views go through next/image, so the page gets a
// resized AVIF/WebP that fits `sizes` and the full-resolution file is
// only fetched when someone zooms in. Pass the real width and height when
// known so the space is reserved before the image loads.
export function ZoomImage({
  src,
  alt,
  width = 0,
  height = 0,
  sizes = '(min-width: 1024px) 376px, (min-width: 640px) 256px, calc(100vw - 48px)',
  className = '',
}: {
  src: string
  alt: string
  width?: number
  height?: number
  sizes?: string
  className?: string
}) {
  const [open, setOpen] = useState(false)
  const unoptimized = src.endsWith('.svg') || src.endsWith('.gif')

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        quality={90}
        unoptimized={unoptimized}
        className={`${className} cursor-zoom-in`}
        onClick={() => setOpen(true)}
      />
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black-85 p-4 sm:p-8 cursor-zoom-out"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <Image
            src={src}
            alt={alt}
            width={0}
            height={0}
            sizes="100vw"
            quality={90}
            unoptimized={unoptimized}
            className="w-auto h-auto max-w-full max-h-full rounded-lg shadow-2xl"
          />
        </div>
      )}
    </>
  )
}
