import { existsSync } from 'node:fs'
import path from 'node:path'
import type { Project } from './schema'

// Build-time check that every local file a project points at exists in
// public/. Uses the file system, so it runs from generateStaticParams only.
export function missingFiles(projects: Project[]): string[] {
  return projects.flatMap((p) => {
    const cs = p.caseStudy
    const files = [
      cs?.thumbnail,
      cs?.cardImage,
      cs?.cardVideo,
      cs?.videoUrl,
      cs?.youtubePoster,
      cs?.reportUrl,
      ...(cs?.screenshots ?? []),
      ...(cs?.photos ?? []).map((photo) => photo.src),
    ]
    return files
      .filter((f): f is string => typeof f === 'string' && f.startsWith('/'))
      .filter((f) => !existsSync(path.join(process.cwd(), 'public', f)))
      .map((f) => `"${p.slug}" points at ${f}, which is not in public/`)
  })
}
