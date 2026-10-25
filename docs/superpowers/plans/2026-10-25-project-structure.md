# Project structure refactor plan

Date: 2026-10-25. Branch: `hackathons-page`.
Source: an independent stress test of the project code (read-only review),
approved by Oriol with the decisions below.

## Why

Adding one project touched 7 files and 13 places, 9 of them silent: hand-kept
page orders, prize list, win count, audit lists, llms.txt and sitemap dates,
keyed by strings nothing checks. They had already drifted (Basket's prize
worded three ways). The diagram tones were TrueVoice's, built into the shared
component. Nothing validated diagrams. "We" was built into the template while
9 of 15 projects are solo. Bugs found: Tailwind classes kept in data files are
stripped from the CSS (BK-Shoot and basketball card framing ignored), the year
prints twice on hackathon pages, 29 screenshots are hotlinked from GitHub,
prev/next follows a hidden third order.

## Decisions

- Structure **B**: one file per project in `src/data/projects/`, an `index.ts`
  that groups them (featured, hackathons, more, unlisted), every list, count
  and order derived from the groups, validation that fails the build.
- Voice: "I" on solo projects, "we" on team projects (derived from `team`).
- Basket's prize reads "Best Use of Tavily, 1st place" everywhere.
- Visible fixes (bugs, local screenshots, prev/next order, alt text): pending
  Oriol's answer; each is its own commit.

## Target layout

```
src/data/projects/
  index.ts        table of contents: imports + groups (the only list); runs validation
  schema.ts       types; defineProject, defineFlow
  validate.ts     pure checks
  derive.ts       selectors: images, badge, prizes, counts, pager, projectHref
  <slug>.ts       one file per project, file name = slug
src/data/hackathons.ts            thin re-export of derived values
src/components/case-study/        page parts (StoryBody, ClassicBody until rollout ends, ...)
src/components/site/flow-diagram/ FlowDiagram and its own types, palette, geometry, CSS
src/app/llms.txt/route.ts         replaces public/llms.txt, derived hackathon line
```

Add a project: new `<slug>.ts` plus two lines in `index.ts`. Remove: delete the
file and those two lines, then the image folder.

## Steps (one commit each; steps 1 to 10 keep pages identical)

0. Safety net: build the current HEAD in a separate worktree on port 3200,
   snapshot every page (scripts stripped), sitemap, llms.txt, robots, OG images.
   After every step: rebuild, diff, run the audit.
1. Split `projects.ts` into one file per project; `index.ts` exports the same
   array in the same order. Zero diff.
2. Groups; derive FEATURED, MORE, HACKATHON_SLUGS; temporary pager order equal
   to today's. Cards take project objects.
3. `prizes` on awards; derive the prize list, win count and hackathon count.
4. Typed `Slug` and `projectHref` for prose links.
5. One selectors module for image and badge choice (today's priorities).
6. Validation and the image check; break one entry on purpose to see it fail.
7. Audit derived by crawling instead of hard-coded paths and counts.
8. FlowDiagram: per-diagram tones (TrueVoice declares today's four),
   `defineFlow`, `useId` marker, safe edge keys, types owned by the component.
9. Split the case study page into components; explicit story or classic body.
10. llms.txt as a route, byte-identical at first.
11. Visible changes, each its own commit: I/we, Basket wording, and the
    approved fixes.
12. Bring the browser checks into the repo; rewrite the skill (replace
    add-project; write-case-study with FEEDBACK.md as its reference). Then
    migrate the projects one file at a time and delete the classic body last.
