---
name: add-project
description: Use when Oriol built or won something new and wants it on omorros.com, or when a project should be removed, renamed, or moved between /projects, /hackathons and the unlisted pages.
---

# Adding a project

Each project is one file, `src/data/projects/<slug>.ts`, named after its
slug. `src/data/projects/index.ts` puts it in a group, and the group decides
where it shows. Everything else is derived from the files and groups: the
card lists, the prize ticker and win count on /projects, the hackathon count,
/hackathons, the previous and next links, the sitemap entry, llms.txt, the
share image. Mistakes fail the build with a message that says what to fix.

## Where things live

| File | Holds |
|---|---|
| `src/data/projects/<slug>.ts` | The project: `export default defineProject({ ... })` |
| `src/data/projects/index.ts` | Imports and `groups`, the only list of projects |
| `src/data/projects/schema.ts` | Types, `defineProject`, `defineFlow` |
| `src/data/projects/derive.ts` | Card image, badge, prizes, facts at a glance, share image |
| `src/data/projects/validate.ts`, `check-files.ts` | The build checks |
| `public/images/<slug>/` | The project's images |
| `tests/unit/`, `tests/browser/` | `npm test`, `npm run test:browser` |

## Groups

| Group | Shows as | Rules |
|---|---|---|
| `featured` | Big cards on /projects | Exactly six. Adding one means moving one to `more` or `hackathons`: Oriol's call. |
| `hackathons` | Cards on /hackathons only | Wins: category `hackathon` with prizes. |
| `more` | Small cards on /projects | No prizes. |
| `unlisted` | A page with no card | No prizes. |

/hackathons lists every win from `featured` then `hackathons`, in that order.
Every win must be in one of those two groups, so the counts include it.

## Steps

1. **Ask Oriol** for what is missing: the repo URL; the event as `Name · Place Year`, or none for a personal project; the result and the exact prize names; solo or team, with each teammate's name as Oriol wants it shown and a link; the photos; which group.
2. **Create `<slug>.ts`** with the shape of `truevoice.ts`: title, description, tags (about four stack keywords), link, slug, `lastModified` (today, `YYYY-MM-DD`), category, event, year, caseStudy.
3. **Write the page.** REQUIRED SUB-SKILL: use write-case-study. It covers the copy, the diagram, the images and the checks.
4. **Add it to `index.ts`**: one import, one entry in its group. The order inside a group is the order on the page.
5. **Bump the listing dates** in `src/app/sitemap.ts` (`/projects`, `/hackathons`) when the project shows on them.
6. **Link to it from copy** with `projectHref('<slug>')`, so a typo fails the type check.
7. **Check** as write-case-study says, then open `/projects/<slug>/opengraph-image` and confirm the badge text fits.
8. **Report and wait** for Oriol's approval, then commit: one sentence, no em dashes, no AI attribution. Never push or open a PR without asking.

## Removing or moving

- Remove: delete the file, its two lines in `index.ts`, and `public/images/<slug>/`. Fix any `projectHref` the type check flags.
- Move: change its group in `index.ts`. To rename a slug, rename the file and the image folder too.

## The build already catches

A file in no group, a file not named after its slug, a missing image, an
unused file in the project's image folder, an image with no alt, a win outside `featured` and `hackathons`, a win marked
`personal`, a /hackathons card with no prize, an event not written
`Name · Place Year`, Event or Result typed into facts, a featured count other
than six, an odd photo grid, and diagram mistakes (a line to a missing box, a
backwards line, a loose box, two boxes in one cell, an undeclared tone). Read
the message and fix the data; never loosen a check to get past it.
