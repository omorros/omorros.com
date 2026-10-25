# Hackathons page

Date: 2026-10-25
Branch: `hackathons-page` (cut from local `main`, carrying its 2 unpushed commits)
Status: approved direction, pending user review of this spec

## Goal

The projects page reads as a hackathon list. Oriol has won more hackathon
prizes than the page shows, and his personal work gets buried. Fix it by
giving the wins their own page and pointing to it from `/projects` with one
call to action, instead of adding more cards to `/projects`.

## Constraints

- No new claims or editorial copy. The `/projects` intro stays exactly as it is.
- Plain brief English, no em dashes, matching the existing voice.
- Case study URLs stay at `/projects/<slug>`. Nothing that is linked or indexed today moves.
- Nav stays Projects, Work, Journal.
- Nothing is pushed and no PR is opened without asking Oriol.

## The record (9 wins at 7 hackathons, all London 2026)

Order is Oriol's ranking, used on `/hackathons`.

| # | Slug | Award | Wins |
|---|---|---|---|
| 1 | `truevoice` | Overall Winner, Voice AI Hack | 1 |
| 2 | `lantern` | Overall Winner and Best Use of fal, {Tech: Europe} x VEED | 2 |
| 3 | `wildscan` | Overall Winner, Unicorn Mafia x Techbible Hack Night | 1 |
| 4 | `offbabel` | Cosine and EXO Labs track wins, Localhost: On-Device Agent Hackathon | 2 |
| 5 | `echo` | Track Winner, Superlinked x Alibaba Cloud Qwen | 1 |
| 6 | `hamyway-city` | People's Choice, Real-World Agents Hackathon (Dwelly), 10 Oct 2026 | 1 |
| 7 | `basket` | Best Use of Tavily Search, 1st place, Tokens LDN Multi-Agent Hackathon | 1 |

The total (9) is a hand-kept constant in one place, used by both pages. It
cannot be derived from `awards` because OffBabel's two track wins are one
award entry.

## `/projects`

- Intro: unchanged.
- Big cards, in order: TrueVoice, Lantern, WILDSCAN, OffBabel, SnapShelf, BK-Shoot.
- Call to action between the big cards and "More projects": a simple block
  reading "9 hackathon wins in 2026." with a "See them all" link to
  `/hackathons`. Styled with the existing site palette, no new visual language.
- More projects: CNN Architecture Comparison, Wikipedia Scraper, University Library System.

## `/hackathons` (new)

- Title "Hackathons" and one factual lead line built from the constant:
  "9 wins at 7 hackathons in London, 2026." Nothing more.
- Seven big cards in the order above. The subtitle shows the award, and the
  "Hackathon" badge is hidden because every card on this page is one.
- No "More hackathons" section.
- Page metadata, collection JSON-LD (same helper as `/projects`), and a
  sitemap entry.

## Leaving the listings

- Echo moves from `/projects` to `/hackathons` only.
- SupConnect, GASLIT and Atlas leave every listing. Their entries and case
  study pages stay live (still in the sitemap and reachable through prev and
  next on case study pages), so nothing breaks. Deleting them outright is a
  one-line follow-up if Oriol wants it.
- DarkFleet stays removed.

## Data changes in `src/data/projects.ts`

- Restore Basket and its photos from `02c82d5^`. Change its award from
  "Track Winner" to "Best Use of Tavily Search, 1st place", which is what it won.
- Add Hamyway City as a hackathon entry (team build, "We built"), repo
  `github.com/arvin-shafiei/dwell-belly`, following the `add-project` skill.
  Copy comes from the repo README and git history, limited to Oriol's verified
  part. Product screenshots come from the repo's `docs/media/` (console home,
  case run, results, decisions, 3D city). Event photos come from Oriol and
  supply the card image. Until they arrive the card uses the existing
  placeholder, and the build does not wait on them.

## Code shape

- Move `CardImage` and `SmallCard` out of `src/app/projects/page.tsx` into
  `src/components/site/ProjectCards.tsx`. `CardImage` gets a prop to hide the
  category badge. Both pages keep their own ordered slug lists, as `/projects`
  does today.

## Facts kept in sync elsewhere

- Homepage Projects blurb: "hackathon winners" becomes a link to `/hackathons`. No copy change.
- `public/llms.txt`: the hackathon record line lists all 7 wins and the
  `/hackathons` page is listed.
- Sitemap `lastModified` bumped for `/projects`.

## Checks

- `npm run lint`, `npm run build`, `npm run audit:metadata`.
- Both pages viewed in the browser at desktop and phone width.

## Out of scope

Other site improvements, nav changes, the "More hackathons" section, and new
case studies for the non-winning hackathons.
