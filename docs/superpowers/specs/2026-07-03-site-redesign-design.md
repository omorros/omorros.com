# omorros.com redesign

Date: 2026-07-03
Branch: `redesign`
Status: approved direction, pending user review of this spec

## Goal

Replace the current effect-heavy single page with a minimal, professional, multi-page site modeled closely on samselikoff.com. It should not read as AI-made. The user wants near-identical visuals to Sam's site as a starting point, then will iterate from feedback.

## Constraints

- Do not copy code from Sam's repo (github.com/samselikoff/samselikoff.com). It has no license, so all rights reserved. Matching design values (font, sizes, spacing, colors) is fine. All components are written fresh in this repo's stack.
- Keep the existing stack: Next.js 14 App Router, TypeScript, Tailwind CSS.
- Keep `src/data/projects.ts` as the untouched source of truth for all 12 projects and case studies.
- All copy in plain brief English. No em dashes. No AI buzzwords. Short sentences.
- Claude does not commit unless needed. If committing: one brief sentence, no co-author line, never push.
- The user merges `redesign` into `main` himself when happy.

## Site map

- `/` home: intro, section blurbs, Life section
- `/projects` all projects, personal and hackathon
- `/projects/[slug]` existing case studies, restyled only
- `/blog` writing page, empty state or one post, MDX wiring later

## Homepage, top to bottom

1. **Intro.** "Hello! I'm Oriol Morros." Two or three sentences: software engineer building infrastructure for AI agents at Eli by Techbible in London. BSc Software Engineering from ARU Cambridge, 2023 to 2026, graduated. Inline text links with small icons: GitHub, LinkedIn, CV, Email.
2. **Projects blurb.** One short paragraph plus 4 strongest projects as a simple linked list (TrueVoice, OffBabel, WILDSCAN, DarkFleet, adjustable during iteration). Hackathon wins stated as plain facts. Link to /projects.
3. **Work blurb.** Compact experience list, one line each with dates: Eli by Techbible, University of Cambridge, IBM MCP Context Forge open source, Festival Sant Fruitós. Education as one line: ARU BSc, graduated 2026 with First Class Honours (confirmed by user). No logos, no timeline graphics, no PR cards.
4. **Blog blurb.** One sentence, link to /blog.
5. **Life.** Replica of Sam's Life section. Heading, short paragraph telling the arc, then three places stacked with years and one photo each:
   - Manresa, 2005 to 2023. Born January 2005, grew up there, left for England in August 2023. The story text says it is a city near Barcelona. The place label is Manresa.
   - Cambridge, 2023 to 2026
   - London, 2026 to present

## Visual system

- **Typography:** Inter via `next/font`, replacing Geist. Big headings with tight letter-spacing, body around 16 to 18px, measure capped near 34em. Exact sizes and letter-spacing values read off the live site and its public tailwind config (values only, not code).
- **Color:** near-white background, gray scale, one sparing accent for links matched to the link color on samselikoff.com. Dark mode kept, toggled by a quiet icon in the nav.
- **Layout:** single centered column around 672 to 768px, generous vertical whitespace, plain bold section headings. Life photos are simple rounded rectangles with captions.
- **Motion:** almost none. Simple color transitions on hover. framer-motion and lenis removed from package.json.

## Components

Delete: AmbientBackground, Typewriter, CommandPalette, SkillsMarquee, StellarBuddy, NumberTicker, ScrollFillText, SocialDock, NativeMagnetic, AvailablePill, PageVisitsBadge, VerifiedBadge, LinkPreview, SmoothScrollProvider, RevealOnScroll, Timeline, DynamicNavigation, WorkTimeline.

Build fresh: top nav (text links), footer, project list item, project case study layout, Life section, theme toggle, blog list page.

Skills and tech stack: no icon wall. Tools appear as plain text tags per project and one sentence in the intro or work section.

## Content the user provides

- Three photos, one per city, casual snapshots preferred. User will upload later. Placeholders used until then, nothing blocks on them.

## Out of scope for the first pass

- MDX blog posts (route and list design only)
- Removing the old site from history (it stays in git history)
- New CV or content beyond restyling and copy rewrite
