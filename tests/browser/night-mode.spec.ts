import { expect, test, type Page } from '@playwright/test'
import { NIGHT_KEY } from '@/lib/night'
import { PHONE, sidewaysScroll } from './helpers'

// The night mode easter egg: three clicks on the logo, or typing "night",
// turns the lights off and starts the wave field. Escape, the same three
// clicks, or typing "night" again turns them back on.

const isNight = (page: Page) => page.evaluate(() => document.documentElement.classList.contains('night'))
const background = (page: Page) => page.evaluate(() => getComputedStyle(document.documentElement).backgroundColor)
const fieldShown = (page: Page) =>
  page.locator('canvas[data-night-field]').evaluate((c) => getComputedStyle(c).opacity === '1')
const rgb = (css: string) => css.match(/\d+(\.\d+)?/g)!.slice(0, 3).map(Number)

// WCAG relative luminance and contrast ratio.
const luminance = (css: string) => {
  const [r, g, b] = rgb(css).map((c) => {
    const s = c / 255
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}
const contrast = (a: string, b: string) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return (hi + 0.05) / (lo + 0.05)
}

async function clickLogo(page: Page, times: number) {
  for (let i = 0; i < times; i++) await page.locator('[data-night-trigger]').click()
}

test('the console hints at the easter egg', async ({ page }) => {
  const logs: string[] = []
  page.on('console', (m) => logs.push(m.text()))
  await page.goto('/projects', { waitUntil: 'networkidle' })
  expect(logs.some((l) => /type night/i.test(l) && l.includes('hola@omorros.com'))).toBe(true)
})

test('three clicks on the logo turn the lights off, and three more turn them on', async ({ page }) => {
  await page.goto('/projects', { waitUntil: 'networkidle' })
  expect(await isNight(page)).toBe(false)
  expect(await background(page)).toBe('rgb(255, 255, 255)')
  expect(await fieldShown(page)).toBe(false)

  await clickLogo(page, 2)
  expect(await isNight(page), 'two clicks do nothing').toBe(false)
  await clickLogo(page, 1)
  await page.waitForTimeout(1100)
  expect(await isNight(page)).toBe(true)
  expect(luminance(await background(page)), 'dark background').toBeLessThan(0.02)
  expect(await fieldShown(page)).toBe(true)
  await expect(page, 'the logo still goes home').toHaveURL('/')

  const bg = await background(page)
  const colors = await page.evaluate(() =>
    Array.from(document.querySelectorAll('main p, main h1, nav a, header a, footer p'))
      .slice(0, 12)
      .map((el) => getComputedStyle(el).color),
  )
  expect(Math.min(...colors.map((c) => contrast(c, bg))), 'text contrast at night').toBeGreaterThanOrEqual(4.5)

  await page.goto('/hackathons', { waitUntil: 'networkidle' })
  expect(await isNight(page), 'night survives navigation in the same tab').toBe(true)
  await clickLogo(page, 3)
  await page.waitForTimeout(1100)
  expect(await isNight(page)).toBe(false)
  expect(await background(page)).toBe('rgb(255, 255, 255)')
  expect(await fieldShown(page)).toBe(false)
})

test('typing night toggles it, and Escape turns the lights back on', async ({ page }) => {
  await page.goto('/projects', { waitUntil: 'networkidle' })
  await page.keyboard.type('night')
  await expect.poll(() => isNight(page)).toBe(true)
  await page.keyboard.press('Escape')
  await expect.poll(() => isNight(page)).toBe(false)
  await page.keyboard.type('nig')
  await page.keyboard.type('ht')
  await expect.poll(() => isNight(page), 'two bursts still count').toBe(true)
  await page.keyboard.type('night')
  await expect.poll(() => isNight(page)).toBe(false)
})

test.describe('on a phone', () => {
  test.use(PHONE)
  test('a new visit starts light, and a reload at night is dark before paint', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' })
    expect(await isNight(page)).toBe(false)
    await page.evaluate((key) => sessionStorage.setItem(key, '1'), NIGHT_KEY)
    await page.reload({ waitUntil: 'networkidle' })
    expect(await isNight(page)).toBe(true)
    expect(await sidewaysScroll(page)).toBe(0)
  })
})

// The wave field once took the whole page down at one window size.
for (const viewport of [
  { width: 1280, height: 800 },
  { width: 1440, height: 900 },
  { width: 1013, height: 677 },
  { width: 375, height: 760 },
]) {
  test(`the wave field runs at ${viewport.width}x${viewport.height}`, async ({ page }) => {
    const errors: string[] = []
    page.on('pageerror', (e) => errors.push(e.message))
    await page.setViewportSize(viewport)
    await page.goto('/projects', { waitUntil: 'networkidle' })
    await page.keyboard.type('night')
    await page.waitForTimeout(1200)
    expect(await fieldShown(page)).toBe(true)
    expect(errors).toEqual([])
  })
}
