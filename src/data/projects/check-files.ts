import { existsSync, readdirSync, readFileSync } from 'node:fs'
import path from 'node:path'
import type { Project } from './schema'

// Build-time checks that need the file system, so they run from
// generateStaticParams only: every project file is in a group under its own
// name, and every local file a project points at exists in public/.
export function fileProblems(projects: Project[], root = process.cwd()): string[] {
  return [...unplacedFiles(projects, root), ...missingFiles(projects, root)]
}

// A project file is one with a line starting `export default defineProject(`.
const PROJECT_FILE = /^export default defineProject\(/m

function unplacedFiles(projects: Project[], root: string): string[] {
  const dir = path.join(root, 'src/data/projects')
  const files = readdirSync(dir).filter(
    (f) => f.endsWith('.ts') && PROJECT_FILE.test(readFileSync(path.join(dir, f), 'utf8')),
  )
  const slugs = new Set(projects.map((p) => p.slug))
  return [
    ...files
      .filter((f) => !slugs.has(f.replace(/\.ts$/, '')))
      .map((f) => `${f} defines a project that is in no group; add it to a group in index.ts`),
    ...projects
      .filter((p) => !files.includes(`${p.slug}.ts`))
      .map((p) => `"${p.slug}" has no file called ${p.slug}.ts; name each project file after its slug`),
  ]
}

function missingFiles(projects: Project[], root: string): string[] {
  return projects.flatMap((p) => {
    const cs = p.caseStudy
    const files = [
      cs.thumbnail?.src,
      cs.cardImage?.src,
      cs.cardVideo,
      cs.videoUrl,
      cs.youtubePoster,
      cs.reportUrl,
      ...(cs.screenshots ?? []).map((s) => s.src),
      ...(cs.photos ?? []).map((photo) => photo.src),
    ]
    return files
      .filter((f): f is string => typeof f === 'string' && f.startsWith('/'))
      .filter((f) => !existsSync(path.join(root, 'public', f)))
      .map((f) => `"${p.slug}" points at ${f}, which is not in public/`)
  })
}
