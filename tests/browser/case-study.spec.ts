import { expect, test, type Locator, type Page } from '@playwright/test'
import { glanceFacts, projects, type Story } from '@/data/projects'
import { PHONE, sidewaysScroll } from './helpers'

// Every project page: it shows what the data says, keeps to the writing
// rules, and its diagram fits and plays.

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

// Each mode a visitor can pick and the boxes it uses. A diagram without
// modes is one mode with every box.
function modesOf(story: Story) {
  const boxesIn = (m: string | null) =>
    story.flow.nodes.filter((n) => !m || !n.modes?.length || n.modes.includes(m)).map((n) => n.id)
  const modes = Object.entries(story.flow.modes ?? {})
  return modes.length > 0
    ? modes.map(([id, m]) => ({ id, label: m.label, boxes: boxesIn(id) }))
    : [{ id: null, label: null, boxes: boxesIn(null) }]
}

async function pickMode(page: Page, label: string | null) {
  if (!label) return
  const tab = page.getByRole('tab', { name: label })
  await tab.click()
  await expect(tab).toHaveAttribute('aria-selected', 'true')
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
  // No text runs out of its box: long words wrap inside it.
  const spill = await diagram.locator('[data-node]').evaluateAll((els) =>
    els.flatMap((box) =>
      Array.from(box.querySelectorAll('p, li')).flatMap((t) =>
        t.scrollWidth > t.clientWidth + 1 ? [`${box.getAttribute('data-node')}: "${t.textContent}"`] : [],
      ),
    ),
  )
  expect(spill, 'text spilling out of a box').toEqual([])
  expect(await sidewaysScroll(page)).toBe(0)
}

for (const project of projects) {
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
        if (member.url) await expect(facts.locator(`a[href="${member.url}"]`)).toHaveText(member.name)
        else await expect(facts).toContainText(member.name)
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

    for (const mode of modesOf(story)) {
      const name = mode.label ? ` in the "${mode.label}" mode` : ''

      test(`diagram lights every box in turn${name}, then pauses off screen`, async ({ page }) => {
        await page.goto(path)
        const diagram = page.locator('[data-flow]')
        await diagram.scrollIntoViewIfNeeded()
        await pickMode(page, mode.label)
        await expect(diagram.locator('[data-node][data-dim="1"]')).toHaveCount(story.flow.nodes.length - mode.boxes.length)
        let mostLit = 0
        let moved = false
        let before = await packets(diagram)
        for (let k = 0; k < 16 && !(moved && mostLit === mode.boxes.length); k++) {
          await page.waitForTimeout(400)
          const lit = await diagram.locator('[data-node][data-on="1"]').evaluateAll((els) => els.map((e) => e.getAttribute('data-node')))
          expect(lit.filter((id) => !mode.boxes.includes(id!)), 'boxes lit outside the mode').toEqual([])
          mostLit = Math.max(mostLit, lit.length)
          const now = await packets(diagram)
          if (now && before && now !== before) moved = true
          before = now
        }
        expect(mostLit, 'boxes lit at once, at most').toBe(mode.boxes.length)
        for (const n of story.flow.nodes.filter((n) => mode.boxes.includes(n.id))) {
          const live = diagram.locator(`[data-node="${n.id}"] [data-live]`)
          const expected = typeof n.live === 'string' ? n.live : mode.id ? n.live?.[mode.id] : undefined
          if (expected) await expect(live, `${n.id} shows`).toHaveText(expected)
          else await expect(live, `${n.id} shows nothing`).toHaveCount(0)
        }
        expect(moved, 'packets travel along the lines').toBe(true)

        await page.evaluate(() => window.scrollTo(0, 0))
        await page.waitForTimeout(300)
        const a = await packets(diagram)
        await page.waitForTimeout(700)
        expect(await packets(diagram), 'still while off screen').toBe(a)
      })

      test.describe('with reduced motion', () => {
        test.use({ reducedMotion: 'reduce' })
        test(`diagram shows the finished scene${name}, standing still`, async ({ page }) => {
          await page.goto(path)
          const diagram = page.locator('[data-flow]')
          await diagram.scrollIntoViewIfNeeded()
          await pickMode(page, mode.label)
          await expect(diagram.locator('[data-node][data-on="1"]')).toHaveCount(mode.boxes.length)
          expect(await packets(diagram)).toBe('')
        })
      })
    }

    if (story.flow.modes) {
      test('the mode tabs work with the keyboard', async ({ page }) => {
        await page.goto(path)
        const tabs = page.getByRole('tab')
        const labels = Object.values(story.flow.modes!).map((m) => m.label)
        await expect(tabs).toHaveText(labels)
        await expect(tabs.first()).toHaveAttribute('aria-selected', 'true')
        await tabs.first().focus()
        await page.keyboard.press('ArrowRight')
        await expect(tabs.nth(1)).toHaveAttribute('aria-selected', 'true')
        await expect(tabs.nth(1)).toBeFocused()
      })
    }

    for (const zone of story.flow.zones ?? []) {
      test(`the "${zone.label}" zone is drawn around its boxes`, async ({ page }) => {
        await page.goto(path)
        const diagram = page.locator('[data-flow]')
        await diagram.scrollIntoViewIfNeeded()
        const area = diagram.locator(`[data-zone="${zone.label}"]`)
        await expect(area).toContainText(zone.label)
        const outer = (await area.boundingBox())!
        for (const id of zone.nodes) {
          const b = (await diagram.locator(`[data-node="${id}"]`).boundingBox())!
          const inside = b.x >= outer.x && b.y >= outer.y && b.x + b.width <= outer.x + outer.width + 1 && b.y + b.height <= outer.y + outer.height + 1
          expect(inside, `${id} inside the zone`).toBe(true)
        }
      })
    }
  })
}
