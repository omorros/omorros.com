'use client'

import { siteConfig } from '@/lib/constants'
import { SocialDock } from '@/components/ui/SocialDock'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'
import { triggerHaptic } from '@/lib/utils'

export function ContactNow() {
  const year = new Date().getFullYear()

  return (
    <RevealOnScroll
      as="section"
      id="contact"
      className="mb-0 scroll-mt-32 pb-0"
    >
      <div className="flex flex-col items-center text-center">
        {/* Socials label pill */}
        <div className="mb-6">
          <span className="px-3 py-1.5 rounded-full border border-border bg-background-soft text-[10px] font-bold tracking-widest text-foreground-muted uppercase">
            Socials
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-display text-foreground mb-10">
          Get in touch.
        </h2>

        {/* Social icon dock */}
        <div className="relative z-10 mb-8">
          <SocialDock />
        </div>

        {/* Footer */}
        <div className="mt-0 mb-0 w-full">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 w-full border-t border-border-soft pt-6 pb-12">
            <p className="text-sm font-medium text-foreground-muted order-2 md:order-1">
              Built by{' '}
              <button
                type="button"
                onClick={() => triggerHaptic(10)}
                className="font-semibold text-foreground hover:text-accent transition-colors"
              >
                {siteConfig.name.split(' ').slice(0, 2).join(' ')}
              </button>
            </p>
            <p className="text-sm text-foreground-faint font-medium order-1 md:order-2">
              © {year}
            </p>
          </div>
        </div>
      </div>
    </RevealOnScroll>
  )
}
