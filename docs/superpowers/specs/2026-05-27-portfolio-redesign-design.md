# Portfolio Redesign — Editorial Elevation (2026-05-27)

**Goal:** Take the current omorros.com from "well-built portfolio template" to "high-level engineer portfolio" that reads credibly to two audiences in parallel: big-tech / new-grad recruiters and AI/ML startup founders.

**Approach:** Editorial elevation. Keep the existing Next.js 14 / Framer Motion / Tailwind stack and the 6-section structure. Fix the touches that read template-y. Bring in real CV content that's currently missing. Tighten copy and motion.

**Source of truth for content:** `OriolMorrosVilaseca_CV_RGC.pdf` (May 2026). Bullets copied verbatim where possible.

---

## Section 1 — First-load and motion system

### Delete the preloader

- Remove `<Preloader />` from `src/app/page.tsx`.
- Delete `src/components/page/Preloader.tsx`.
- Remove the `preloader-shown` sessionStorage key (cleared by deletion).
- Net effect: page renders immediately, no blocking multilingual splash.

### Hero entrance stagger

Replaces the preloader as the first impression. Rows fade in sequentially:

| Row | Delay (ms) |
|---|---|
| Available pill | 50 |
| Name | 130 |
| Typewriter role | 210 |
| Profile photo | 210 (parallel) |
| Bio | 290 |
| Metric strip | 370 |
| Link row | 450 |

- Duration per row: 0.5s
- Easing: `[0.16, 1, 0.3, 1]`
- y offset: 8px → 0
- Total cycle: ~500ms

### Single RevealOnScroll wrapper

The site currently reimplements `initial / whileInView / transition` in 7 sections. Consolidate:

- Create `src/components/ui/RevealOnScroll.tsx`
- Defaults: `y: 16`, `duration: 0.7`, `ease: [0.16, 1, 0.3, 1]`, `viewport: { once: true, margin: '-80px' }`
- Replace section-level motion props in: `Experience`, `TechStack`, `SelectedWork`, `Education`, `ContactNow`, future Open Source entry.

### Reduced motion

- Detect `prefers-reduced-motion: reduce` via `useReducedMotion` from Framer Motion.
- When set, hero stagger and `RevealOnScroll` skip all y-translation and run `duration: 0` (instant fade-in only).

---

## Section 2 — Hero redesign

### Keep

- Available pill ("Available for new projects").
- Name heading: `Hi, I'm Oriol Morros`.
- Typewriter role rotator with exactly the current three roles: `AI Engineer`, `Software Engineer`, `Full-Stack Developer` (per user preference — kept despite my recommendation to consolidate).
- Profile photo on the right (desktop), top (mobile).

### Change

- **Remove drag behavior** from the profile photo. Replace with subtle hover lift only (`scale: 1.03` on hover, no drag).
- **Bio paragraph** replaced with the user's LinkedIn tagline: `Software Engineer | Building infrastructure for AI agents.`
  - One line, no wrap on desktop where possible.
  - Same `text-foreground-muted` color, slightly larger size for the new tightness (`text-base md:text-lg`).
- **Link row order**: GitHub → LinkedIn → CV → Email. (Currently the same — confirming.)

### Add — metric strip

A single mono-caps line between the bio and the link row:

```
2× HACKATHON WINNER · 18 PRS TO IBM MCP CONTEXT FORGE · PREDICTED 1ST @ ARU CAMBRIDGE
```

- Font: mono, `text-[11px]`, `tracking-[0.18em]`, `uppercase`, `text-foreground-muted`.
- Separator: ` · ` with proper spacing.
- On mobile (<640px): wraps to two lines, dots stay as separators.
- One row stagger entry, no special animation.

### Hero file footprint

- Only `src/components/page/Hero.tsx` changes.
- Photo `drag` props removed.
- Bio paragraph string replaced.
- Metric strip JSX added between bio and link row.

---

## Section 3 — Experience overhaul

### Section header

- Rename `"Career Path"` → `"Experience"`.
- Drop the caption `"Where I've worked."`.

### Four entries (reverse-chronological)

#### 1. Software Engineer — Eli by Techbible
- **Date:** May 2026 – Present
- **Location:** London, UK (Hybrid)
- **Logo:** new asset needed in `/public/eli-logo.{png,jpg,svg}` (user provides)
- **Description (visible above bullets):** Building infrastructure that lets ELI's AI agents act identically across vendor SaaS tools.
- **Bullets (verbatim from CV):**
  - Built a shared connector framework (list users, list seats, get billing, create user, deactivate user, change role, reduce seats, cancel license) so ELI's AI agents behave identically across 12 vendor SaaS tools, whether routed via native API, Nango OAuth, or Okta SCIM.
  - Shipped the native connectors for OpenAI and Anthropic and self-hosted Nango on Render to handle OAuth across Cursor, Jira, Slack, GitHub, Figma, Attio, and Linear, replacing 7 separate OAuth integrations with one.
  - Wired the connector framework end-to-end into the Next.js frontend so the connect, list, and manage flows for all 12 vendors work from the UI, and built the Health Dashboard surfacing per-vendor connection status, last sync time, last action result, and token expiry.
- **Link:** Eli by Techbible URL (user provides if public).

#### 2. Open Source Contributor — IBM MCP Context Forge
- **Date:** Closed range, 2026 — user fills exact months at implementation time.
- **Location:** Remote
- **Logo:** new asset needed in `/public/ibm-mcp-logo.{png,svg}` (use IBM mark or repo logo)
- **Description:** 18 merged PRs to a 3.4k★ MCP gateway/proxy. Production-grade error handling, performance fixes, and security validation.
- **Bullets (PR-card treatment in `WorkTimeline`):**

  Each bullet is a structured PR card with badge + PR number + summary + link:
  - **#3371** — *P1 MUST*: Fixed silent error masking in a multi-worker RPC gateway across session affinity. Propagated JSON-RPC errors directly, mapped non-JSON-RPC bodies to structured errors, added 6 test cases.
  - **#3610** — *Release 1.0.0*: Resolved browser crashes at 20K+ users by replacing eager-load infinite scroll in the Manage Members modal with search-first server-side filtering capped at 50 results. Added SQL injection prevention via parametrised ILIKE.
  - **#3785** — *Security*: Closed a security validation bypass where ToolUpdate lacked the forbidden-pattern check ToolCreate enforced. Added matching `VALIDATION_STRICT` behaviour with parametrised tests across 7 forbidden patterns.
- **Link:** `https://github.com/IBM/mcp-context-forge/pulls?q=is:pr+author:omorros+is:merged` (filtered "View all 18 merged PRs").

#### 3. Web Developer — Festival Sant Fruitós
- **Date:** Feb 2026 – Apr 2026
- **Location:** Barcelona, Spain (Remote)
- **Logo:** existing `/festival-sf-logo.png`.
- **Bullets (verbatim from CV, replaces current bullets):**
  - Migrated the festival's legacy WordPress site to a modern Next.js 16 + TypeScript stack with Tailwind CSS 4 and Framer Motion, cutting annual infrastructure cost by €160/yr (€173 → €10) via static hosting and a cheaper registrar.
  - Built a GitHub Actions CI pipeline running lint, type-checks, and Playwright tests on every PR, plus automated dependency updates via Dependabot, catching regressions before merge across a 3-month build.
- **Link:** `https://www.festivalsantfruitos.com/`

#### 4. Digital Technician — University of Cambridge (consolidated)
- **Date:** Apr – Jun 2025 & Mar – May 2026
- **Location:** Cambridge, UK (On-site)
- **Logo:** existing `/cambridge-logo.jpg`.
- **Bullets (verbatim from CV — consolidates the two current entries into one):**
  - Diagnosed and resolved hardware, software, and network issues across 250+ PCs in high-pressure, zero-downtime environments, rehired for 2026 based on 2025 performance.
  - Performed systematic device imaging, configuration, and deployment for a fleet of loan devices, and delivered first-line IT support across multiple venues under strict time-critical deadlines.

### Data structure changes

`Experience.tsx` and the `WorkTimeline` component need to support:
- Bullets that are either plain strings (current) OR structured PR objects `{ prNumber, badge, summary, url }` for the IBM entry.
- Either extend the `bullets` field to a discriminated union, or add an optional `prCards` field on `TimelineItem`.
- Visual treatment for PR cards: badge pill (color-coded — red for P1 MUST, blue for Release 1.0.0, amber for Security) + monospace PR number + summary text + external-link arrow.

---

## Section 4 — Featured Projects (home)

### Keep

- 4 projects in 2×2 grid: TrueVoice, WILDSCAN, DarkFleet, BK-Shoot.
- `"Selected Projects"` heading with inline rule.
- `"Cooking more..."` shimmer text (per user preference — flagged trade-off, kept).
- `"View all projects"` archive link.

### Change

- **Surface awards visually**: in `ProjectCard`, when `caseStudy.awards[0]` exists, render a laurel-mark + award title near the top of the card content area (currently passed but not visually prominent). Treatment: small `Award` lucide icon + award title in `text-[11px] font-mono uppercase tracking-[0.18em] text-amber-700 dark:text-amber-300`.
- **Soften dim opacity** for non-hovered siblings: current dim is too aggressive (the dimmed cards drop visibility too much). Change opacity from current value to `0.55` (verify in code).

### Files touched

- `src/components/ui/ProjectCard.tsx` (award visibility, dim opacity).
- `src/components/page/SelectedWork.tsx` (no structural change).

---

## Section 5 — /projects page enhancements

### Featured-first sort

When `filter === 'all'`, return the 4 featured-slug projects first, then the remaining by their existing order. When a category filter is active, sort within the category by the same rule.

```ts
const FEATURED_SLUGS = ['truevoice', 'wildscan', 'darkfleet', 'bk-shoot']

const sortFeaturedFirst = (list: Project[]) =>
  [...list].sort((a, b) => {
    const ai = FEATURED_SLUGS.indexOf(a.slug ?? '')
    const bi = FEATURED_SLUGS.indexOf(b.slug ?? '')
    if (ai === -1 && bi === -1) return 0
    if (ai === -1) return 1
    if (bi === -1) return -1
    return ai - bi
  })
```

(Reuse the same `FEATURED_SLUGS` constant from `SelectedWork.tsx` — extract to `src/data/projects.ts` to avoid duplication.)

### Award count in filter pills

Each filter pill shows `count · 🏆 awardCount`:

```
All (11 · 🏆 4)    Personal (6 · 🏆 2)    Hackathons (5 · 🏆 2)
```

Award count = projects in category where `caseStudy?.awards?.length > 0`.

(Use a trophy unicode glyph or `Award` icon from lucide — match what's used on the cards for consistency.)

### Per-card year

Add a small mono year badge to `ProjectCard` (top-right or near tags). Source:
1. If `event` contains a 4-digit year, parse and use it.
2. Otherwise, add an optional `year: number` field to the `Project` interface and fill from CV.

For projects that aren't dated explicitly: BK-Shoot (2024), Wikipedia Scraper (2024), University Library System (2024), Personal Web Portfolio (2025), CNN Architecture Comparison (2025), SnapShelf (2025/2026 — dissertation), GASLIT/Atlas/DarkFleet/WILDSCAN/TrueVoice (2026).

User confirms exact years at implementation time where ambiguous.

---

## Section 6 — Copy, cleanup, and consistency

### Drop section captions

- `Experience.tsx` — remove `caption="Where I've worked."`.
- `TechStack.tsx` — remove `caption="The arsenal for building digital experiences."`.
- `Education.tsx` — remove `caption="Academic background."`.
- Section headers stand alone.

### Add certifications to Education

Insert as a 4th bullet under the ARU entry:

> Certifications: Anthropic MCP Advanced Topics (Mar 2026) · AWS Cloud Foundations (Mar 2026).

### Delete dormant components

Files to remove (verified not imported by `page.tsx`):

- `src/components/page/AboutMe.tsx`
- `src/components/page/Articles.tsx`
- `src/components/page/AskBlock.tsx`
- `src/components/page/BuildLog.tsx`
- `src/components/page/CurrentlyCooking.tsx`
- `src/components/page/Footer.tsx`
- `src/components/page/Hackathons.tsx`
- `src/components/page/NowStatus.tsx`

Verify with grep before deleting. If any are imported by `[slug]/page.tsx` or other pages, hold those back.

Also delete unused data:
- `src/data/articles.ts` (if not used by anything)
- `src/data/hackathons.ts` (if not used by anything)

### Page composition comment

The header comment in `src/app/page.tsx` currently references sections that won't exist:
```
// hero → ask-block → experience (work) → tech-stack (skills) → articles →
// selected-projects → philosophy quote (scroll-fill) → build-log →
// hackathons → education → now → page-visits → contact
```
Replace with the actual flow:
```
// hero → experience → tech-stack → projects → education → contact
```

### Page metadata / siteConfig

- `src/lib/constants.ts` `description`: update to match the new positioning:
  > `Software Engineer building infrastructure for AI agents. Currently at Eli by Techbible (London) and final-year BSc at ARU Cambridge.`
- `subtitle`: keep or update to `Software Engineer in London / Cambridge, UK`.
- Confirm `title` stays `Oriol Morros Vilaseca | Software Engineer`.

---

## Out of scope

- New design system / new color palette / new typography (Approach C territory — user picked B).
- Visual rebrand of the `/projects/[slug]` detail pages (they already work; touching them isn't part of this scope).
- Mobile-specific redesign beyond ensuring all new elements (metric strip, PR cards) wrap correctly.
- Article / blog functionality (no content exists; section deleted).

---

## Open items for the user at implementation time

1. Exact date range for IBM MCP Context Forge OSS contributions.
2. Eli by Techbible logo asset.
3. IBM MCP Context Forge logo asset.
4. Eli by Techbible URL if public (otherwise no link on the card).
5. Year disambiguation for older personal projects (BK-Shoot, Wikipedia Scraper, etc.).

---

## Verification checklist

After implementation, before claiming done:

- [ ] Preloader does not appear on hard reload.
- [ ] Hero stagger plays in ~500ms with smooth easing.
- [ ] Hero photo is no longer draggable.
- [ ] Metric strip is visible on hero, wraps cleanly on mobile.
- [ ] Experience has 4 entries in correct order; Cambridge is one consolidated entry.
- [ ] IBM PR cards link out to the correct PR URLs.
- [ ] Featured projects show award title visibly on TrueVoice, WILDSCAN, BK-Shoot cards.
- [ ] `/projects` page sorts featured-first; filter pill counts include award count.
- [ ] No dormant components imported anywhere (`grep -r "AboutMe\|BuildLog\|Hackathons\|NowStatus\|CurrentlyCooking\|Articles\|AskBlock"` returns nothing in `src/`).
- [ ] All section captions removed.
- [ ] Certifications line on Education.
- [ ] `prefers-reduced-motion` respected (manually test via DevTools).
- [ ] Lint, typecheck, build all pass.
