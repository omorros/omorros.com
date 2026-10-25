# Hackathons Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a `/hackathons` page with all 7 winning builds, point to it from `/projects` with one call to action, and trim `/projects` to the best wins plus personal work.

**Architecture:** `src/data/projects.ts` stays the single source for every build. A new `src/data/hackathons.ts` holds the ordered list of winning slugs and the hand-kept win count. The card components move out of the projects page into a shared file so both pages render the same cards from their own slug lists.

**Tech Stack:** Next.js 14 App Router, TypeScript, Tailwind CSS. No test runner exists; checks are `npm run lint`, `npm run build`, `npm run audit:metadata` against `npm run start`, plus `curl` assertions.

**Spec:** `docs/superpowers/specs/2026-10-25-hackathons-page-design.md`

## Global Constraints

- No new claims or editorial copy. The `/projects` intro stays exactly as it is.
- Plain brief English, no em dashes anywhere (code comments, copy, commits).
- Case study URLs stay at `/projects/<slug>`.
- Nav stays Projects, Work, Journal.
- Commit messages are one sentence, no em dashes, no AI co-author trailer. Never push.
- Win count is 9, across 7 hackathons, all London 2026.

## Review Focus

1. A visitor who hit the old `/hackathons` 308 redirect: the server must now answer 200 on `/hackathons` (Task 2 curl check). Browsers that cached the old 308 may still redirect for a while; nothing in code fixes that.
2. Phone width (375px): the call to action block and the 7-card grid must not scroll sideways, and the single card on the last row must keep normal width (Task 5 browser check).
3. Basket's restored remote images on `raw.githubusercontent.com` may have moved since August (Task 3 curl check for 200).
4. Unlisted builds (SupConnect, GASLIT, Atlas) must still answer 200 and keep prev and next links (Task 5 curl check).
5. The number 9 must come from the one constant on both pages, and `llms.txt` must agree by hand (Task 2 grep check).

---

### Task 1: Shared cards, win list, and the new `/projects`

**Files:**
- Create: `src/components/site/ProjectCards.tsx`
- Create: `src/data/hackathons.ts`
- Modify: `src/data/projects.ts` (add a lookup helper below the `projects` array)
- Modify: `src/app/projects/page.tsx`

**Interfaces:**
- Produces: `getProjectBySlug(slug: string): Project | undefined` in `src/data/projects.ts`
- Produces: `HACKATHON_WINS = 9` and `HACKATHON_SLUGS: string[]` in `src/data/hackathons.ts`, ordered `['truevoice', 'lantern', 'wildscan', 'offbabel', 'echo', 'hamyway-city', 'basket']`
- Produces: `CardImage({ slug, showCategory = true }: { slug: string; showCategory?: boolean })` and `SmallCard({ slug }: { slug: string })` in `ProjectCards.tsx`, both returning `null` for an unknown slug, exactly as today.

- [ ] **Step 1:** Move `CardImage`, `SmallCard` and `CategoryBadge` from `src/app/projects/page.tsx` into `ProjectCards.tsx` unchanged, swapping `bySlug` for `getProjectBySlug`. `CardImage` renders `CategoryBadge` only when `showCategory` is true.
- [ ] **Step 2:** In `src/app/projects/page.tsx` set `FEATURED = ['truevoice', 'lantern', 'wildscan', 'offbabel', 'snapshelf', 'bk-shoot']` and `MORE = ['deep-learning-cnn-comparison', 'wikipedia-scraper', 'university-library-system']`. The intro `Lead` blocks stay untouched.
- [ ] **Step 3:** Add the call to action between the big cards and "More projects": a `Link` to `/hackathons` in the site's existing grays and blue hover, reading `{HACKATHON_WINS} hackathon wins in 2026.` with a second line `See them all` plus the `ChevronRight` icon the cards already use. Mobile first, full width of the container.
- [ ] **Step 4:** Run `npm run lint && npm run build`. Expected: both pass, `/projects` listed as a static route.
- [ ] **Step 5:** Commit: `git commit -m "Move the project cards into a shared file and add the hackathon wins call to action on the projects page."`

### Task 2: The `/hackathons` page and everything that points to it

**Files:**
- Create: `src/app/hackathons/page.tsx`
- Modify: `next.config.js` (delete the `redirects` block, it only holds `/hackathons` to `/projects`)
- Modify: `src/app/sitemap.ts`, `scripts/audit-metadata.mjs`, `src/app/page.tsx`, `public/llms.txt`

**Interfaces:**
- Consumes: `HACKATHON_WINS`, `HACKATHON_SLUGS`, `CardImage`, `getProjectBySlug` from Task 1.

- [ ] **Step 1: Write the failing check.** Add `'/hackathons'`, `'/projects/basket'` and `'/projects/hamyway-city'` to `EXPECTED_PATHS` in `scripts/audit-metadata.mjs`. Run `npm run build && (npm run start &) && sleep 4 && npm run audit:metadata`. Expected: FAIL naming the missing routes.
- [ ] **Step 2:** Build `src/app/hackathons/page.tsx` on the `/projects` page pattern: `createPageMetadata({ title: 'Hackathons', description, path: '/hackathons' })`, `getCollectionJsonLd` over `HACKATHON_SLUGS`, `Title` "Hackathons", one `Lead` reading `{HACKATHON_WINS} wins at {HACKATHON_SLUGS.length} hackathons in London, 2026.`, then the same two-column grid of `<CardImage slug={slug} showCategory={false} />`. No "More" section.
- [ ] **Step 3:** Delete the `redirects` block in `next.config.js`. Add `{ path: '/hackathons', lastModified: '2026-10-25' }` to `staticPages` in `src/app/sitemap.ts` and bump `/projects` to `'2026-10-25'`.
- [ ] **Step 4:** In the homepage Projects blurb (`src/app/page.tsx`), wrap the words "hackathon winners" in `<A href="/hackathons">`. No other copy change.
- [ ] **Step 5:** In `public/llms.txt`, add Hamyway City (People's Choice, Dwelly Real-World Agents Hackathon) and Basket (Best Use of Tavily Search, 1st place, Tokens LDN Multi-Agent Hackathon) to the hackathon record line, and add a core pages line for `[Hackathons](https://www.omorros.com/hackathons)` stating 9 wins at 7 hackathons in London in 2026.
- [ ] **Step 6:** Tasks 3 and 4 add the two restored and new slugs. Until they land, the audit still fails on those two paths only. Run `curl -s -o /dev/null -w '%{http_code}' localhost:3000/hackathons`. Expected: `200`. Run `grep -c "9 wins" public/llms.txt`. Expected: `1`.
- [ ] **Step 7:** Commit: `git commit -m "Add the hackathons page with every win and drop the old redirect that sent it to projects."`

### Task 3: Restore Basket

**Files:**
- Modify: `src/data/projects.ts` (insert after the Echo entry)
- Restore: `public/images/basket/demo.jpg`, `public/images/basket/chatting.jpg`

- [ ] **Step 1:** `git show 02c82d5^:public/images/basket/demo.jpg > public/images/basket/demo.jpg`, same for `chatting.jpg`. Resize both with `sips -Z 1600` to match the other project photos.
- [ ] **Step 2:** Copy the Basket entry from `git show 02c82d5^:src/data/projects.ts` into the array. Set `lastModified: '2026-10-25'`. Replace its award with title `'1st Place, Best Use of Tavily - Tokens LDN Multi-Agent Hackathon 2026'` and description `'Tavily gave three prizes for the best use of its search API, and Basket took first.'`
- [ ] **Step 3:** For each `raw.githubusercontent.com` URL in the entry, run `curl -s -o /dev/null -w '%{http_code}' <url>`. Expected: `200`. If not, drop that URL rather than point at a dead image.
- [ ] **Step 4:** Run `npm run build`. Expected: pass, `/projects/basket` in the static routes.
- [ ] **Step 5:** Commit: `git commit -m "Bring Basket back with its photos and the Best Use of Tavily prize it actually won."`

### Task 4: Add Hamyway City

**Files:**
- Modify: `src/data/projects.ts` (insert after Basket, keeping hackathons in date order for prev and next)
- Create: `public/images/hamyway-city/` with product screenshots copied from `~/Developer/personal/dwell-belly/docs/media/` (`console-home.png`, `case-run-detail.png`, `decisions.png`, `city-aerial.png`), resized with `sips -Z 1600`.

- [ ] **Step 1:** Write the entry following `.claude/skills/add-project/SKILL.md`: `slug: 'hamyway-city'`, `category: 'hackathon'`, `event: 'Dwelly Real-World Agents Hackathon · London 2026'`, `year: '2026'`, `link: 'https://github.com/arvin-shafiei/dwell-belly'`, `tags: ['TypeScript', 'Next.js', 'Claude API', 'ElevenLabs']`. Team build, so "We built". Challenge, approach and exactly 4 features come only from the dwell-belly `README.md`. One feature covers Oriol's own part, the voice layer (live calls, voice notes, the voice agent), as shown by his commits in that repo.
- [ ] **Step 2:** `thumbnail: '/images/hamyway-city/city-aerial.png'` and the other three as `screenshots`. No `cardImage` yet, so the card falls back to the thumbnail until Oriol's event photos arrive. They then become `cardImage` and `photos`.
- [ ] **Step 3:** Award: title `"People's Choice - Real-World Agents Hackathon 2026"`, description stating only the facts given: the People's Choice track at Dwelly's Real-World Agents Hackathon, London, 10 October 2026.
- [ ] **Step 4:** Run `npm run lint && npm run build`, then restart `npm run start` and run `npm run audit:metadata`. Expected: all pass, including the three paths from Task 2.
- [ ] **Step 5:** Commit: `git commit -m "Add Hamyway City, the People's Choice winner at the Dwelly Real-World Agents Hackathon."`

### Task 5: Verify and final review

- [ ] **Step 1:** Against `npm run start`, `curl` each of `/projects/supconnect`, `/projects/gaslit`, `/projects/atlas`. Expected: `200`, each page still has prev and next links.
- [ ] **Step 2:** Open `/projects`, `/hackathons`, `/projects/hamyway-city` and `/projects/basket` in the browser at 1280px and 375px. Expected: no sideways scroll, every card image loads, the call to action reads as one block, the last single card on `/hackathons` keeps normal width.
- [ ] **Step 3:** One final review of the whole branch against the spec, then one fix wave if it finds anything.
