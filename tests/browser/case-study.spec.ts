import { expect, test, type Locator, type Page } from '@playwright/test'
import { glanceFacts, projects, type Project, type Story } from '@/data/projects'
import { PHONE, sidewaysScroll } from './helpers'

// Every project written in the story format: the page shows what the data
// says, keeps to the writing rules, and its diagram fits and plays.

const storyProjects = projects.filter((p): p is Project & { caseStudy: { story: Story } } => Boolean(p.caseStudy.story))

const overlap = (a: DOMRect, b: DOMRect) =>
  !(a.right <= b.left || b.right <= a.left || a.bottom <= b.top || b.bottom <= a.top)

async function boxes(diagram: Locator) {
  return diagram.locator('[data-node]').evaluateAll((els) => els.map((e) => e.getBoundingClientRect().toJSON() as DOMRect))
}

// Where the moving packets are right now, as one string.
function packets(diagram: Locator) {
  return diagram.locator('circle[data-packet="head"]').evaluateAll((cs) =>
    cs
      .filter((c) => (c as SVGElement).style.opacity !== '0')
      .map((c) => `${c.getAttribute('cx')},${c.getAttribute('cy')}`)
      .join(' '),
  )
}

async function expectDiagramFits(page: Page, story: Story) {
  const diagram = page.locator('[data-flow]')
  await diagram.scrollIntoViewIfNeeded()
  await expect(diagram.locator('[data-node]')).toHaveCount(story.flow.nodes.length)
  await expect(diagram.locator('path[data-edge]')).toHaveCount(story.flow.edges.length)
  const nodes = await boxes(diagram)
  const frame = (await diagram.boundingBox())!
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) expect(overlap(nodes[i], nodes[j]), `boxes ${i} and ${j} overlap`).toBe(false)
    expect(nodes[i].left >= frame.x - 1 && nodes[i].right <= frame.x + frame.width + 1, `box ${i} sticks out`).toBe(true)
  }
  expect(await sidewaysScroll(page)).toBe(0)
}

for (const project of storyProjects) {
  const story = project.caseStudy.story
  const path = `/projects/${project.slug}`

  test.describe(project.title, () => {
    test('opens with the insight and the facts at a glance', async ({ page }) => {
      await page.goto(path)
      const header = page.locator('main header')
      await expect(header.locator('h1')).toHaveText(project.title)
      await expect(header).toContainText(story.insight)
      const facts = header.locator('dl')
      for (const f of glanceFacts(project, story)) {
        await expect(facts.locator('dt', { hasText: f.label })).toHaveCount(1)
        await expect(facts).toContainText(f.value)
      }
      for (const member of story.team ?? []) {
        await expect(facts.locator(`a[href="${member.url}"]`)).toHaveText(member.name)
      }
    })

    test('has the story sections, in the right voice', async ({ page }) => {
      await page.goto(path)
      const headings = await page.locator('main h2').allInnerTexts()
      const decisions = story.team ? 'Decisions we made' : 'Decisions I made'
      const expected = ['Why it matters', 'How it works', decisions, story.moment?.title].filter(Boolean)
      expect(headings).toEqual(expect.arrayContaining(expected))
      for (const d of story.decisions) await expect(page.locator('main ol')).toContainText(d.title)
    })

    test('keeps to the writing rules', async ({ page }) => {
      await page.goto(path)
      const text = await page.locator('main').innerText()
      const headings = await page.locator('main h2').allInnerTexts()
      expect(headings, 'no "My part" section: the project is told as a whole').not.toContain('My part')
      expect(text, 'no commit counts').not.toMatch(/\d+\s+commits?\b/i)
      if (story.team) expect(text, 'a team build speaks as "we"').not.toMatch(/\bI (built|wrote|made|spent|designed)\b/)
    })

    test('diagram fits on a laptop', async ({ page }) => {
      await page.goto(path)
      await expectDiagramFits(page, story)
    })

    test.describe('on a phone', () => {
      test.use(PHONE)
      test('diagram fits on a phone', async ({ page }) => {
        await page.goto(path)
        await expectDiagramFits(page, story)
      })
    })

    test('diagram lights every box in turn, then pauses off screen', async ({ page }) => {
      await page.goto(path)
      const diagram = page.locator('[data-flow]')
      await diagram.scrollIntoViewIfNeeded()
      let mostLit = 0
      let moved = false
      let before = await packets(diagram)
      for (let k = 0; k < 16 && !(moved && mostLit === story.flow.nodes.length); k++) {
        await page.waitForTimeout(400)
        mostLit = Math.max(mostLit, await diagram.locator('[data-node][data-on="1"]').count())
        const now = await packets(diagram)
        if (now && before && now !== before) moved = true
        before = now
      }
      expect(mostLit, 'boxes lit at once, at most').toBe(story.flow.nodes.length)
      expect(moved, 'packets travel along the lines').toBe(true)

      await page.evaluate(() => window.scrollTo(0, 0))
      await page.waitForTimeout(300)
      const a = await packets(diagram)
      await page.waitForTimeout(700)
      expect(await packets(diagram), 'still while off screen').toBe(a)
    })

    test.describe('with reduced motion', () => {
      test.use({ reducedMotion: 'reduce' })
      test('diagram shows the finished scene, standing still', async ({ page }) => {
        await page.goto(path)
        const diagram = page.locator('[data-flow]')
        await diagram.scrollIntoViewIfNeeded()
        await expect(diagram.locator('[data-node][data-on="1"]')).toHaveCount(story.flow.nodes.length)
        expect(await packets(diagram)).toBe('')
      })
    })
  })
}
