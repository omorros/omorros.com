import assert from 'node:assert/strict'
import { mkdirSync, mkdtempSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { test } from 'node:test'
import { fileProblems } from '../../src/data/projects/check-files.ts'
import type { Project } from '../../src/data/projects/schema.ts'

// The build check that looks at files: every project file is in a group, and
// every image a project points at is in public/. Runs on a scratch folder
// laid out like the repo.

function site(projectFiles: Record<string, string>, publicFiles: string[] = []) {
  const root = mkdtempSync(path.join(tmpdir(), 'omorros-files-'))
  const dir = path.join(root, 'src/data/projects')
  mkdirSync(dir, { recursive: true })
  for (const [name, body] of Object.entries(projectFiles)) writeFileSync(path.join(dir, name), body)
  for (const file of publicFiles) {
    mkdirSync(path.dirname(path.join(root, 'public', file)), { recursive: true })
    writeFileSync(path.join(root, 'public', file), '')
  }
  return root
}

const project = (slug: string, caseStudy: object = {}) => ({ slug, caseStudy }) as unknown as Project
const projectFile = 'export default defineProject({})\n'
const helperFile = 'export function defineProject() {}\n'
// A helper that only mentions the call, like the check itself.
const checkerFile = "const isProject = (text) => text.includes('export default defineProject({')\n"

test('every project file in a group, every image present: no problems', () => {
  const root = site({ 'a.ts': projectFile, 'schema.ts': helperFile, 'check.ts': checkerFile }, ['/images/a/cover.jpg'])
  assert.deepEqual(fileProblems([project('a', { thumbnail: { src: '/images/a/cover.jpg', alt: 'a' } })], root), [])
})

test('a project file left out of every group', () => {
  const root = site({ 'a.ts': projectFile, 'stray.ts': projectFile })
  assert.deepEqual(fileProblems([project('a')], root), [
    'stray.ts defines a project that is in no group; add it to a group in index.ts',
  ])
})

test('a project whose slug is not its file name', () => {
  const root = site({ 'a.ts': projectFile })
  assert.deepEqual(fileProblems([project('b')], root), [
    'a.ts defines a project that is in no group; add it to a group in index.ts',
    '"b" has no file called b.ts; name each project file after its slug',
  ])
})

test('an image that is not in public/', () => {
  const root = site({ 'a.ts': projectFile })
  assert.deepEqual(fileProblems([project('a', { screenshots: [{ src: '/images/a/gone.jpg', alt: 'x' }] })], root), [
    '"a" points at /images/a/gone.jpg, which is not in public/',
  ])
})
