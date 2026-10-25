import assert from 'node:assert/strict'
import { describe, test } from 'node:test'
import { flowProblems, projectProblems, storyProblems } from '../../src/data/projects/validate.ts'
import type { Project, Story } from '../../src/data/projects/schema.ts'

// The checks that run on every build. Each test feeds in one mistake and
// expects the build message that names it.

type Flow = Story['flow']

const box = (id: string, col: number, row: number, tone?: string) => ({ id, label: id, note: '', col, row, tone })
const flow = (nodes: ReturnType<typeof box>[], edges: string[][]) =>
  ({ tones: { t: { swatch: 'grey' } }, nodes, edges, caption: '' }) as unknown as Flow

const story = { flow: flow([box('a', 0, 0), box('b', 1, 0)], [['a', 'b']]), facts: [], decisions: [{}, {}] }

const project = (slug: string, caseStudy: object = {}) =>
  ({
    slug,
    title: slug,
    description: '',
    tags: [],
    link: '',
    lastModified: '2026-10-25',
    category: 'hackathon',
    event: 'Hack · London 2026',
    caseStudy: { story, awards: [{ title: 'Win', description: '', prizes: ['Win'] }], ...caseStudy },
  }) as unknown as Project

const six = ['a', 'b', 'c', 'd', 'e', 'f'].map((slug) => project(slug))
const withSixth = (sixth: Project) => [...six.slice(0, 5), sixth]

function assertProblem(problems: string[], pattern: RegExp) {
  assert.ok(problems.some((p) => pattern.test(p)), `expected a problem matching ${pattern}, got:\n${problems.join('\n')}`)
}

describe('diagrams', () => {
  test('a valid diagram has no problems', () => {
    assert.deepEqual(flowProblems('f', flow([box('a', 0, 0), box('b', 1, 0), box('c', 1, 1)], [['a', 'b'], ['a', 'c']])), [])
  })

  test('a line to a box that does not exist', () => {
    assertProblem(flowProblems('f', flow([box('a', 0, 0), box('b', 1, 0)], [['a', 'bb']])), /ends at "bb", which is not a box/)
  })

  test('two boxes with one id', () => {
    assertProblem(flowProblems('f', flow([box('a', 0, 0), box('a', 1, 0)], [['a', 'a']])), /two boxes have the id "a"/)
  })

  test('two boxes in one cell', () => {
    assertProblem(flowProblems('f', flow([box('a', 0, 0), box('b', 0, 0)], [['a', 'b']])), /share column 0, row 0/)
  })

  test('a line that runs backwards', () => {
    assertProblem(flowProblems('f', flow([box('a', 1, 0), box('b', 0, 0)], [['a', 'b']])), /runs backwards/)
  })

  test('a box with no lines', () => {
    assertProblem(flowProblems('f', flow([box('a', 0, 0), box('b', 1, 0), box('c', 2, 0)], [['a', 'b']])), /"c" is not connected/)
  })

  test('a box outside the grid', () => {
    assertProblem(flowProblems('f', flow([box('a', 0, 0), box('b', 6, 0)], [['a', 'b']])), /column 6/)
  })

  test('the same line twice', () => {
    assertProblem(flowProblems('f', flow([box('a', 0, 0), box('b', 1, 0)], [['a', 'b'], ['a', 'b']])), /listed twice/)
  })

  test('a box tone the diagram does not declare', () => {
    assertProblem(
      flowProblems('f', flow([box('a', 0, 0, 'nope'), box('b', 1, 0)], [['a', 'b']])),
      /uses the tone "nope", which is not declared/,
    )
  })

  test('a line tone the diagram does not declare', () => {
    assertProblem(flowProblems('f', flow([box('a', 0, 0), box('b', 1, 0)], [['a', 'b', 'nope']])), /line a to b uses the tone "nope"/)
  })

  test('a story with one decision', () => {
    const story = { flow: flow([box('a', 0, 0), box('b', 1, 0)], [['a', 'b']]), facts: [], decisions: [{}] } as unknown as Story
    assertProblem(storyProblems('s', story), /1 decisions; use two or three/)
  })

  test('how long it took to build', () => {
    const facts = [{ label: 'Built in', value: 'One day' }]
    const story = { flow: flow([box('a', 0, 0), box('b', 1, 0)], [['a', 'b']]), facts, decisions: [{}, {}] } as unknown as Story
    assertProblem(storyProblems('s', story), /"Built in" is not shown/)
  })

  test('how long it took, however it is capitalised', () => {
    const facts = [{ label: 'Built In', value: 'One day' }]
    const story = { flow: flow([box('a', 0, 0), box('b', 1, 0)], [['a', 'b']]), facts, decisions: [{}, {}] } as unknown as Story
    assertProblem(storyProblems('s', story), /"Built In" is not shown/)
  })

  test('a team with nobody in it', () => {
    const story = { flow: flow([box('a', 0, 0), box('b', 1, 0)], [['a', 'b']]), facts: [], team: [], decisions: [{}, {}] } as unknown as Story
    assertProblem(storyProblems('s', story), /team is empty/)
  })

  test('a story fact the project already gives', () => {
    const facts = [{ label: 'Result', value: 'Overall winner' }]
    const story = { flow: flow([box('a', 0, 0), box('b', 1, 0)], [['a', 'b']]), facts, decisions: [{}, {}] } as unknown as Story
    assertProblem(storyProblems('s', story), /the "Result" fact comes from the project/)
  })
})

describe('projects', () => {
  test('a valid set of groups has no problems', () => {
    assert.deepEqual(projectProblems({ featured: six }, six), [])
  })

  test('a project in two groups', () => {
    assertProblem(projectProblems({ featured: six, more: [six[0]] }, six), /in both "featured" and "more"/)
  })

  test('the wrong number of featured projects', () => {
    assertProblem(projectProblems({ featured: six.slice(0, 5) }, six.slice(0, 5)), /featured has 5 projects/)
  })

  test('a build on /hackathons with no prize', () => {
    const x = project('x', { awards: [] })
    assertProblem(projectProblems({ featured: six, hackathons: [x] }, [...six, x]), /"x" is listed on \/hackathons, which only lists wins, but no award lists prizes/)
  })

  test('a win whose category is personal', () => {
    const solo = { ...project('solo'), category: 'personal' } as Project
    assertProblem(projectProblems({ featured: withSixth(solo) }, six.slice(0, 5)), /"solo" has prizes but its category is "personal"/)
  })

  test('a win in a group that /hackathons does not read', () => {
    const x = project('x')
    assertProblem(projectProblems({ featured: six, more: [x] }, six), /"x" has prizes but is in "more"/)
  })

  test('a personal project in the hackathons group', () => {
    const solo = { ...project('solo', { awards: [] }), category: 'personal' } as Project
    assertProblem(projectProblems({ featured: six, hackathons: [solo] }, six), /"solo" is in the hackathons group but its category is "personal"/)
  })

  test('a hackathon build with no event', () => {
    const x = { ...project('x'), event: undefined } as Project
    assertProblem(projectProblems({ featured: withSixth(x) }, withSixth(x)), /"x" is a hackathon build with no event/)
  })

  test('an event not written as Name · Place Year', () => {
    const x = { ...project('x'), event: 'Hack, London 2026' } as Project
    assertProblem(projectProblems({ featured: withSixth(x) }, withSixth(x)), /event "Hack, London 2026" should read "Name · Place Year"/)
  })

  test('a date that is not YYYY-MM-DD', () => {
    const late = { ...project('late'), lastModified: '25/10/2026' }
    assertProblem(projectProblems({ featured: withSixth(late) }, withSixth(late)), /not a YYYY-MM-DD date/)
  })

  test('a photo grid that cannot be even', () => {
    const one = project('one', { photos: [{ src: '/a.jpg', alt: 'a' }] })
    assertProblem(projectProblems({ featured: withSixth(one) }, withSixth(one)), /1 photos; use two, three or four/)
  })

  test('an image with no description', () => {
    const blank = project('blank', { thumbnail: { src: '/h.jpg', alt: ' ' } })
    assertProblem(projectProblems({ featured: withSixth(blank) }, withSixth(blank)), /\/h\.jpg has no description/)
  })
})
