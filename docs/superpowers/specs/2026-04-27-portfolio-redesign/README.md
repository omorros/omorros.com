# Portfolio Redesign

Folder for all docs related to the omorros.com v2 redesign.

## Doc order

1. **`prd.md`** — Product Requirements. What we're building, why, who it's for, what's in/out of scope. Iterated until locked.
2. **`design.md`** — Technical design. Architecture, components, data flow, RAG pipeline, file layout. Written after PRD locks.
3. **`plan.md`** — Phased implementation plan. Written after design locks (via the `writing-plans` skill).
4. **`content/`** — Drafts of new corpus content (hackathons, experience entries, events) before they become source-of-truth markdown.

## Status

- [x] PRD draft (this iteration)
- [ ] PRD locked
- [ ] Design doc
- [ ] Implementation plan
- [ ] Build (on `redesign` branch)
- [ ] Merge to `main` → ship to omorros.com

## Working setup

Build happens on a separate git branch (e.g. `redesign`). Vercel auto-deploys preview URLs per branch. `main` keeps serving the current site at omorros.com until v2 is ready. When v2 ships, merge `redesign` → `main`. No DNS changes.
