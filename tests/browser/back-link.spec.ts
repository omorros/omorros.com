import { expect, test, type Page } from '@playwright/test'
import { backHref, groups, hackathonProjects } from '@/data/projects'

// Back returns to wherever the visitor was on the site, scroll included.
// Visitors who landed from outside go to the listing the page belongs to.

const back = (page: Page) => page.getByRole('link', { name: /Back/ }).first()

// Back only uses the history once the page has hydrated, so wait for it.
const open = (page: Page, path: string) => page.goto(path, { waitUntil: 'networkidle' })

const personal = groups.featured.find((p) => p.category === 'personal')!
const hackathon = hackathonProjects[hackathonProjects.length - 1]

for (const [start, fallback] of [
  [`/projects/${hackathon.slug}`, backHref(hackathon)],
  [`/projects/${personal.slug}`, backHref(personal)],
  ['/hackathons', '/projects'],
]) {
  test(`landing on ${start} from outside, Back goes to ${fallback}`, async ({ page }) => {
    await open(page, start)
    await back(page).click()
    await expect(page).toHaveURL(fallback)
  })
}

test('from /projects, Back returns to the same place on the list', async ({ page }) => {
  const first = groups.featured[0]
  await open(page, '/projects')
  const card = page.locator(`a[href="/projects/${first.slug}"].group`)
  await card.scrollIntoViewIfNeeded()
  await page.mouse.wheel(0, 300)
  await page.waitForTimeout(300)
  const before = await page.evaluate(() => window.scrollY)
  await card.click()
  await expect(page).toHaveURL(`/projects/${first.slug}`)
  await back(page).click()
  await expect(page).toHaveURL('/projects')
  await page.waitForTimeout(500)
  expect(Math.abs((await page.evaluate(() => window.scrollY)) - before)).toBeLessThan(50)
})

test('from /hackathons, Back returns to /hackathons', async ({ page }) => {
  await open(page, '/hackathons')
  await page.locator(`a[href="/projects/${hackathon.slug}"].group`).click()
  await expect(page).toHaveURL(`/projects/${hackathon.slug}`)
  await back(page).click()
  await expect(page).toHaveURL('/hackathons')
})
