import { expect, test, type Page } from '@playwright/test'
import sitemap from '@/app/sitemap'
import { PHONE, scrollThrough, sidewaysScroll } from './helpers'

// Every page in the sitemap, on a laptop and on a phone: no errors, every
// image loads and is described, and nothing scrolls sideways. New projects
// and journal entries are covered as soon as they are in the sitemap.

const paths = sitemap().map((entry) => new URL(entry.url).pathname)

// Vercel's analytics scripts only exist once deployed.
const ignorable = (text: string) => text.includes('/_vercel/')

async function checkPage(page: Page, path: string) {
  const errors: string[] = []
  page.on('pageerror', (e) => errors.push(e.message))
  page.on('console', (m) => {
    if (m.type() === 'error' && !ignorable(m.text() + (m.location().url ?? ''))) errors.push(m.text())
  })

  // 'load', not 'networkidle': pages with a looping video never go quiet.
  const response = await page.goto(path, { waitUntil: 'load' })
  expect(response?.status(), 'status').toBe(200)
  await expect(page.locator('h1').first()).toBeVisible()
  await scrollThrough(page)
  // Load lazy images too, including ones a phone layout keeps off screen.
  await page.evaluate(() => document.querySelectorAll('img').forEach((i) => (i.loading = 'eager')))
  await page.waitForFunction(() => Array.from(document.querySelectorAll('main img')).every((i) => (i as HTMLImageElement).complete))

  const images = await page.locator('main img').evaluateAll((imgs) =>
    (imgs as HTMLImageElement[]).map((i) => ({
      src: i.currentSrc || i.src,
      broken: i.complete && i.naturalWidth === 0,
      alt: i.getAttribute('alt'),
      // Hidden, or the picture on a control that is already named ('Play ...').
      decorative: Boolean(i.closest('[aria-hidden="true"], button[aria-label], a[aria-label]')),
    })),
  )
  expect(images.filter((i) => i.broken).map((i) => i.src), 'broken images').toEqual([])
  expect(images.filter((i) => !i.decorative && !i.alt?.trim()).map((i) => i.src), 'images with no description').toEqual([])
  expect(await sidewaysScroll(page), 'sideways scroll').toBe(0)
  expect(errors, 'console errors').toEqual([])
}

for (const path of paths) {
  test(`${path} on a laptop`, async ({ page }) => {
    await checkPage(page, path)
  })
}

test.describe('on a phone', () => {
  test.use(PHONE)
  for (const path of paths) {
    test(`${path} on a phone`, async ({ page }) => {
      await checkPage(page, path)
    })
  }
})
