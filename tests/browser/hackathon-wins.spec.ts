import { expect, test, type Locator } from '@playwright/test'
import { HACKATHON_PRIZES, HACKATHON_WINS } from '@/data/hackathons'
import { PHONE, sidewaysScroll } from './helpers'

// The wins block on /projects: an ASCII nine that types itself in, a ripple
// on hover, and a ticker of every prize.

// Inked and violet pixels on the nine's canvas.
const ink = (canvas: Locator) =>
  canvas.evaluate((c: HTMLCanvasElement) => {
    const d = c.getContext('2d')!.getImageData(0, 0, c.width, c.height).data
    let any = 0
    let violet = 0
    for (let i = 0; i < d.length; i += 4) {
      if (d[i + 3] <= 40) continue
      any++
      if (d[i + 2] > 180 && d[i] > 90 && d[i + 1] < 120) violet++
    }
    return { any, violet }
  })

test('the intro sends readers to /hackathons', async ({ page }) => {
  await page.goto('/projects')
  await expect(page.locator('main p a[href="/hackathons"]').first()).toBeVisible()
})

test('the block counts every prize and lists them in the ticker', async ({ page }) => {
  await page.goto('/projects')
  const cta = page.locator('a[data-cta="hackathon-wins"]')
  await expect(cta).toHaveAttribute('href', '/hackathons')
  await expect(cta).toHaveAttribute('aria-label', `${HACKATHON_WINS} hackathon wins in 2026. See them all`)
  const ticker = cta.locator('[data-ticker]')
  for (const { award } of HACKATHON_PRIZES) await expect(ticker).toContainText(award)
})

test('the nine types itself in, and hover sends a ripple through it', async ({ page }) => {
  await page.goto('/projects')
  const cta = page.locator('a[data-cta="hackathon-wins"]')
  const nine = cta.locator('canvas[data-nine]')
  const ticker = cta.locator('[data-ticker]')
  await cta.scrollIntoViewIfNeeded()
  await page.waitForTimeout(1300)
  const rest = await ink(nine)
  expect(rest.any, 'inked pixels').toBeGreaterThan(500)
  expect(rest.violet, 'violet pixels at rest').toBe(0)
  await expect(ticker).toHaveCSS('animation-play-state', 'running')

  const box = (await nine.boundingBox())!
  await page.mouse.move(box.x + 20, box.y + 20)
  await page.mouse.move(box.x + 50, box.y + 60, { steps: 5 })
  await page.waitForTimeout(200)
  await expect(ticker, 'hover pauses the ticker').toHaveCSS('animation-play-state', 'paused')
  expect((await ink(nine)).violet, 'violet pixels on hover').toBeGreaterThan(0)

  await page.mouse.move(2, 2)
  await page.waitForTimeout(1800)
  expect((await ink(nine)).violet, 'the ripple settles').toBe(0)
})

test.describe('on a phone with reduced motion', () => {
  test.use({ ...PHONE, reducedMotion: 'reduce' })
  test('the nine is drawn at once and the ticker stands still', async ({ page }) => {
    await page.goto('/projects')
    const cta = page.locator('a[data-cta="hackathon-wins"]')
    await cta.scrollIntoViewIfNeeded()
    await page.waitForTimeout(400)
    expect((await ink(cta.locator('canvas[data-nine]'))).any).toBeGreaterThan(500)
    await expect(cta.locator('[data-ticker]')).toHaveCSS('animation-name', 'none')
    expect(await sidewaysScroll(page)).toBe(0)
  })
})
