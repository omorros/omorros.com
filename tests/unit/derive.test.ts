import assert from 'node:assert/strict'
import { test } from 'node:test'
import { PLACEHOLDER_IMAGE, badge, cardImage, glanceFacts, shareImage } from '../../src/data/projects/derive.ts'
import type { Project, Story } from '../../src/data/projects/schema.ts'

// Which image and badge a project shows when it has some of them but not all.

const shot = { src: '/shot.jpg', alt: 'shot' }
const thumb = { src: '/thumb.jpg', alt: 'thumb' }
const card = { src: '/card.jpg', alt: 'card' }

const project = (caseStudy: object, extra: object = {}) =>
  ({ slug: 'p', title: 'P', caseStudy, ...extra }) as unknown as Project

test('the share image prefers the thumbnail, then the card image, then the first screenshot', () => {
  assert.equal(shareImage(project({ thumbnail: thumb, cardImage: card, screenshots: [shot] })), thumb)
  assert.equal(shareImage(project({ cardImage: card, screenshots: [shot] })), card)
  assert.equal(shareImage(project({ screenshots: [shot] })), shot)
  assert.equal(shareImage(project({})), undefined)
})

test('the card prefers the card image, then the thumbnail, then the first screenshot', () => {
  assert.equal(cardImage(project({ thumbnail: thumb, cardImage: card, screenshots: [shot] })), card)
  assert.equal(cardImage(project({ thumbnail: thumb, screenshots: [shot] })), thumb)
  assert.equal(cardImage(project({ screenshots: [shot] })), shot)
})

test('a card with no images shows the placeholder, described by the title', () => {
  assert.deepEqual(cardImage(project({})), { src: PLACEHOLDER_IMAGE, alt: 'P' })
})

test('the badge is the first award, then the event, then the year', () => {
  const award = { title: 'Overall Winner', description: '' }
  assert.equal(badge(project({ awards: [award] }, { event: 'Hack', year: '2026' })), 'Overall Winner')
  assert.equal(badge(project({}, { event: 'Hack', year: '2026' })), 'Hack')
  assert.equal(badge(project({}, { year: '2026' })), '2026')
})

test("the facts at a glance start with the event and the prizes, then the story's own", () => {
  const story = { facts: [{ label: 'Stack', value: 'Python' }] } as unknown as Story
  const awards = [
    { title: 'Overall Winner', description: '', prizes: ['Overall Winner'] },
    { title: 'Best Use of fal', description: '', prizes: ['Best Use of fal'] },
  ]
  assert.deepEqual(glanceFacts(project({ awards }, { event: 'Voice AI Hack · London 2026' }), story), [
    { label: 'Event', value: 'Voice AI Hack, London' },
    { label: 'Result', value: 'Overall Winner and Best Use of fal' },
    { label: 'Stack', value: 'Python' },
  ])
  assert.deepEqual(glanceFacts(project({}), story), story.facts)
})
