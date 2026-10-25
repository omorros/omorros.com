import type { Page } from '@playwright/test'

export const PHONE = { viewport: { width: 375, height: 760 }, isMobile: true, hasTouch: true }

// Scrolls to the bottom in steps, so lazy images load and on-scroll
// animations start, then back to the top.
export async function scrollThrough(page: Page) {
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 400) {
      window.scrollTo(0, y)
      await new Promise((r) => setTimeout(r, 60))
    }
    window.scrollTo(0, 0)
  })
}

// How far the page scrolls sideways. Zero means it fits the screen.
export function sidewaysScroll(page: Page) {
  return page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
}

// The text of the case study's first line ('Hackathon · Voice AI Hack · London 2026').
export function metaLine(page: Page) {
  return page.locator('main header > p').first().innerText()
}

// Computed object-position for a CSS value such as 'center 35%'.
export function objectPosition(value: string) {
  const keyword: Record<string, string> = { left: '0%', top: '0%', center: '50%', right: '100%', bottom: '100%' }
  const [x, y = 'center'] = value.split(' ')
  return `${keyword[x] ?? x} ${keyword[y] ?? y}`
}
