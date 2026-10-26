import { expect, test } from '@playwright/test'
import { groups, projects } from '@/data/projects'

// What search engines and AI assistants read: llms.txt, the sitemap and each
// project's structured data. All of it comes from the project files, so a
// new or edited project shows up without anyone touching these.

const listed = [...groups.featured, ...groups.hackathons, ...groups.more]

test('llms.txt lists every project with a card, with its link and description', async ({ request }) => {
  const text = await (await request.get('/llms.txt')).text()
  for (const p of listed) {
    expect(text, p.title).toContain(`[${p.title}](https://www.omorros.com/projects/${p.slug}): ${p.description.replace(/\.$/, '')}`)
  }
})

test('the sitemap dates each listing page by its newest project', async ({ request }) => {
  const xml = await (await request.get('/sitemap.xml')).text()
  const dateOf = (path: string) =>
    xml.match(new RegExp(`<loc>https://www.omorros.com${path}</loc>\\s*<lastmod>([^<]+)</lastmod>`))?.[1].slice(0, 10)
  const newest = (list: typeof projects) => list.map((p) => p.lastModified).sort().at(-1)!
  expect(dateOf('/projects')! >= newest([...groups.featured, ...groups.more])).toBe(true)
  expect(dateOf('/hackathons')! >= newest(groups.hackathons)).toBe(true)
})

for (const project of projects) {
  test(`${project.title}: structured data carries the story`, async ({ page }) => {
    await page.goto(`/projects/${project.slug}`, { waitUntil: 'domcontentloaded' })
    const blocks = await page.locator('script[type="application/ld+json"]').allTextContents()
    const graph = blocks.flatMap((b) => JSON.parse(b)['@graph'] ?? [])
    const code = graph.find((n: { '@type': string }) => n['@type'] === 'SoftwareSourceCode')
    const webPage = graph.find((n: { '@type': string }) => n['@type'] === 'WebPage')
    expect(code.abstract).toBe(project.caseStudy.story.insight)
    expect(webPage.dateModified).toBe(project.lastModified)
    const team = project.caseStudy.story.team ?? []
    expect((code.contributor ?? []).map((c: { name: string }) => c.name)).toEqual(team.map((m) => m.name))
  })
}
