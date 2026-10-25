import { expect, test } from '@playwright/test'
import { journal } from '@/data/journal'
import { backHref, groups, hackathonProjects, pagerFor, projects } from '@/data/projects'
import { metaLine, objectPosition } from './helpers'

// What every project page and card takes from the data: the meta line, where
// Back goes, the previous and next links, and how cards crop their photos.

for (const project of projects) {
  test(`${project.title}: meta line, Back and the pager follow the data`, async ({ page }) => {
    await page.goto(`/projects/${project.slug}`, { waitUntil: 'domcontentloaded' })

    const meta = await metaLine(page)
    expect(meta).toMatch(project.category === 'hackathon' ? /^Hackathon/ : /^Personal project/)
    expect(meta, 'the year shows once').not.toMatch(/(\d{4}).*\1/)

    await expect(page.locator('main header a', { hasText: 'Back' })).toHaveAttribute('href', backHref(project))

    const pager = page.getByRole('navigation', { name: 'Project navigation' })
    const { prev, next } = pagerFor(project.slug)
    const hrefs = await pager.locator('a').evaluateAll((as) => as.map((a) => a.getAttribute('href')))
    expect(hrefs).toEqual([prev, next].filter(Boolean).map((p) => `/projects/${p!.slug}`))
  })
}

// Cards appear on /projects (featured) and /hackathons (wins).
const listedOn = (slug: string) =>
  groups.featured.some((p) => p.slug === slug) ? '/projects' : hackathonProjects.some((p) => p.slug === slug) ? '/hackathons' : null

const framed = [
  ...projects.flatMap((p) => {
    const where = listedOn(p.slug)
    return p.caseStudy.cardFocus && where ? [{ name: p.title, where, href: `/projects/${p.slug}`, focus: p.caseStudy.cardFocus }] : []
  }),
  ...journal.flatMap((e) => (e.cardFocus ? [{ name: e.title, where: '/journal', href: `/journal/${e.slug}`, focus: e.cardFocus }] : [])),
]

for (const card of framed) {
  test(`${card.name}: card crops its photo at ${card.focus}`, async ({ page }) => {
    await page.goto(card.where, { waitUntil: 'domcontentloaded' })
    const media = page.locator(`a[href="${card.href}"]`).locator('img, video').first()
    await expect(media).toHaveCSS('object-position', objectPosition(card.focus))
  })
}
