import { llmsTxt } from '@/data/llms'

// Built once at deploy time, like the static file it replaces.
export const dynamic = 'force-static'

export function GET() {
  return new Response(llmsTxt(), {
    headers: { 'Content-Type': 'text/plain; charset=UTF-8' },
  })
}
