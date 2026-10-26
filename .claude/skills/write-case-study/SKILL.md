---
name: write-case-study
description: Use when writing or rewriting a project page on omorros.com (src/data/projects/<slug>.ts), or when Oriol gives feedback on a project page or its diagram.
---

# Writing a case study

Every project page tells one project as a story: an insight, why it matters,
an animated diagram of how it works, the decisions and what they cost, and a
true moment from the build. TrueVoice (`src/data/projects/truevoice.ts`) is
the reference; read it before writing. Every fact on the page has a source.
Oriol approves the draft before anything is committed.

`FEEDBACK.md` in this folder is the history: each rule here came from Oriol's
feedback, and its Log says why. Read it when a rule seems odd.

## 1. Facts first, copy second

Sources, most trusted first:

1. Oriol, in the conversation.
2. Verified notes: `~/Developer/personal/progress/projects/extracts/` (`hackathon-facts.md`, `projects-facts-2.md`).
3. The project's repo: README, docs, code. Clone it into the scratchpad if it is not on the machine (`git clone git@github.com:omorros/<Repo>.git`).
4. The current page. Its copy is unverified: check every claim, number and award line against 1 to 3 before keeping it.

Build a fact sheet before writing: each fact with its source (`file:line` or
"Oriol said"). No source, no fact. Drop unmeasured numbers, hard-coded demo
values and claims that rest on someone else's study, or say only what the
code does.

Collect what the sources cannot answer as questions for Oriol (step 6).
Always ask for, unless already given:

- Each teammate's name as Oriol wants it shown, and a link (LinkedIn or their own site). A team build always lists its team, because `team` is what makes the page say "we": list the names from the notes, leave `url` out until Oriol gives the link, and never use a GitHub profile as a stand-in.
- A true moment from the build, when the notes have none.
- Which photo shows the team with the prize, and product screenshots when the project has none.

## 2. The page, field by field

| Field | Shows as | Write it as |
|---|---|---|
| `description` | Under the title, on cards, in search | One sentence: what it does and for whom, readable by a recruiter. Never starts with the stack. |
| `story.insight` | Big line under the title | One sentence that carries the whole idea ("Patients minimise. Voices don't."). |
| `event`, `awards[].prizes` | Event and Result at a glance | Derived. Event reads `Name · Place Year`. Never add Event or Result to `facts` (the build fails). |
| `story.facts` | The rest of at a glance | Stack (five or six items), plus another fact only when it helps (Dataset, Platform). Never Built in: build time ranges from a day to months of evenings (the build fails). |
| `story.team` | Team at a glance | `{ name, url? }` per teammate. Leave it out for a solo build. It switches the page to "we". |
| `story.context` | Why it matters | Three or four sentences of human or scientific context. |
| `story.flow` | How it works | Section 4. |
| `story.decisions` | Decisions we made / I made | Two or three. `why` says what was done and why; `tradeoff` says honestly what it cost. |
| `story.moment` | Its own section | Only a true story from Oriol or the notes. None: leave it out and ask. |
| `story.limits` | What it isn't | Almost never: only a limit a reader would not assume. |
| `awards` | Under the description | `title`, plain `description`, exact prize names in `prizes` (they feed the ticker and the win count). Verified like everything else. |

## 3. Voice

- Team build: "we" throughout. Solo build: "I".
- The project belongs to the team: no "My part", no individual roles, no commit or line counts.
- No obvious caveats. A hackathon build being a prototype with no login goes without saying.
- No new claims about Oriol. Keep Oriol's own words when given.
- Plain English, short sentences, British spelling. No em dashes. No buzzwords (comprehensive, robust, seamless, leverages) and no Title-Case Compound Names.

## 4. The diagram

Import `defineFlow` with `defineProject` from `./schema`.

- Five to eight boxes on a grid of at most 5 columns by 3 rows, read left to right. Lines go to a later column, or down within one. Phones turn the rows into columns about 100px wide, so prefer two rows, and keep every word in a box short enough to fit (the browser checks fail on text that spills out). A non-breaking space keeps a number with its unit (`2\u00a0s`).
- Solid boxes are what the team built. `service: true` (dashed) marks outside services.
- Each box: `label` (what it is), `note` (what it does, one line), `detail` (small mono line: formats, models, limits), `steps` (two or three that tick on), `live` (what the box puts out when the scene reaches it, as the product really shows it: a transcript line, a score, a status the screen displays).
- `tones`: three or four kinds of thing that travel (TrueVoice: audio, words, voice, flag). Label the ones a reader must tell apart; they become the legend, which lists only tones that travel along a line. Swatches: grey, blue, violet, amber, green, rose.
- Modes: when a visitor picks between paths that really differ in the code (TrueVoice telehealth or in person, OffBabel speak or sign), declare `modes` (label and a one-line note, in tab order) and list on each box the modes it belongs to; boxes that list none are shared. The diagram gets a tab per mode, fades what the mode does not use and plays only its path. Two stages of one pipeline, or chains that always run together, are not modes. A shared box whose example output differs by mode gives `live` per mode (`{ speak: 'missed 1x' }`).
- Zones: `zones: [{ label: 'EXO', nodes: [...] }]` shades boxes that share a place, such as what runs on one machine. The boxes must fill a rectangle of cells on their own.
- Caption: "Solid boxes are what we built. Dashed ones are outside services." ("I" for solo.) With no dashed box, say so instead ("Every box is something I built.").

## 5. Images

- `thumbnail` (hero) and `cardImage`: a real photo, ideally the team with the prize. Open every photo before choosing.
- `photos`: two, three or four event photos, not repeating the hero; a single extra photo is left out, since it cannot make a grid. `screenshots`: product shots for the gallery at the bottom.
- Local files only, in `public/images/<slug>/`, resized: `sips --resampleWidth 1600 -s format jpeg -s formatOptions 80 in.png --out out.jpg` (keep the original when that makes it bigger). Strip location data from phone photos. A file the page no longer uses is deleted: the build fails on leftovers.
- Every image gets its own `alt` that describes what is in the picture.
- `cardFocus` (a CSS object-position such as `'center 35%'`) when the card crop cuts a face.
- Leave out any image that contradicts the product.

## 6. Check, look, report

`next build` shares `.next` with `npm run dev`: in a checkout where the dev
server runs, build in a git worktree instead.

1. `npx tsc --noEmit` and `npm test`.
2. `npm run build`: runs validation and the file checks. Fix every message.
3. `npm run test:browser`: every story page gets the case study checks.
4. Look at the page yourself, at 1280 and 375 wide (Playwright screenshots). The tests prove the diagram fits; only looking shows whether it reads well and whether the card crop works.

Then report to Oriol and wait: insight, facts, decisions and moment as
written; the fact sheet; what was dropped from the old page and why; the
questions. Commit only after Oriol approves: one sentence, no em dashes, no
AI attribution.

## 7. Log feedback

Every piece of feedback Oriol gives on a page goes in `FEEDBACK.md`: a dated
Log line, and a rule in its rules section (and here) when it applies to
every page.

## Common mistakes

| Mistake | Instead |
|---|---|
| Keeping the old page's copy because it was already live | Verify it like new copy; drop what has no source |
| A teammate linked to their GitHub profile | The name alone until Oriol gives a LinkedIn or site |
| `live: 'ADDRESS heard'`, written to fill the box | An output the product really shows |
| Trusting a green test run | Look at both screenshots |
| A moment written from thin evidence | Leave it out and ask Oriol |
| Leaving `team` out of a team build while the links are missing | List the names without `url`; the page would otherwise say "I" |
| A "What it isn't" section by default | Only for a limit nobody would assume |
