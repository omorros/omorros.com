# Case study format: feedback log

Running record of Oriol's feedback and the decisions behind the project page
format, so it can become a `write-case-study` skill and be replicated across
every project. Newest entries at the bottom of the log. Add to it every time
Oriol gives feedback on a project page.

Pilot: TrueVoice (`src/data/projects/truevoice.ts`, `caseStudy.story`),
rendered by `src/components/case-study/StoryBody.tsx` and
`src/components/site/flow-diagram/`. Projects without a `story` still use the
old layout (problem, what I built, what it does) until they are migrated.

## The format, as it stands

Order on the page:

1. Meta line, title, then the **insight** as a big line under the title.
   One sentence that carries the whole idea ("Patients minimise. Voices
   don't."). Then the one-line description and the award.
2. **At a glance** strip: event and result (derived from the project's
   `event` and award prizes), then the story's own facts (built in, stack),
   and **Team** with each teammate's name linked (LinkedIn or their own site).
3. Hero image: a real photo, ideally the team with the prize.
4. **Why it matters**: the human or scientific context, plainly.
5. **How it works**: the animated flow diagram (see below).
6. **Decisions we made**: two or three decisions, each with why and an
   honest **Trade-off.** line.
7. **A story moment** from the build, in its own section, when there is a
   real one (TrueVoice: "The last ten minutes").
8. Photos, then product screenshots in the gallery at the bottom.

Optional: **What it isn't**, only for a limit a reader would not assume.
Left out by default (see the rules).

## Rules that came from feedback

- **Team project, not a solo one.** Write "we" throughout. No "My part"
  section, no individual roles, no commit or line counts. Commits are not a
  measure of contribution. Individual parts are for interviews, not the
  page. Teammates are credited by name, linked, in the at a glance strip.
- **Lead with the insight**, not with "The problem". The old Devpost-style
  problem / what I built / what it does reads like a form.
- **Show thinking**: decisions with trade-offs are what hiring managers want.
- **Real stories are welcome.** Dramatic, true moments from the build (the
  call breaking minutes before the deadline, fixed with five minutes left,
  submitted with a minute to spare, then winning because of it) belong on
  the page, told plainly in the team voice.
- **Only verified facts.** Copy comes from the project's verified notes in
  `~/Developer/personal/progress/projects/extracts/` and the repo, or from
  Oriol directly. Drop anything unmeasured or hard-coded (TrueVoice's
  "under a second", backed only by a hard-coded 842 ms, was removed). Word
  unproven premises carefully: say what the code does, not what was never
  tested.
- **No obvious caveats.** Do not add a limits section that states what any
  hackathon build obviously is (a prototype, no login, not validated). It
  reads as padding and pulls the page down. Use "What it isn't" only for a
  limit a reader would genuinely not assume.
- **No new claims about Oriol** ("my best work came out of hackathons" was
  rejected). Keep Oriol's own wording whenever it is given.
- **Copy style**: plain English, short sentences, no em dashes, no AI
  buzzwords, British spelling.

## The diagram archetype (rated 10/10 by Oriol)

Built as our own component, not Mermaid: Mermaid brings a library and a
foreign style. Inspired by a reference video Oriol sent (dark neon pipeline
with colour-coded packets, boxes with inner steps, live state), but kept in
the site's own style: light, greys, rounded boxes, site fonts, night mode.

- **Data driven**: `story.flow.nodes` and `story.flow.edges`.
  - Node: `label`, `note`, optional `detail` (small mono technical label:
    formats, models, limits), `steps` (tick on in turn), `live` (what the box
    shows when the scene reaches it), `tone`, grid `col` and `row`,
    `service` for third-party services.
  - Edge: `[from, to, tone?]`, tone defaults to the source box's tone.
- **Tones carry meaning** and are chosen per project. TrueVoice: grey audio,
  blue words (the link colour), violet voice (the night mode colour), amber
  flag. The legend shows them.
- **Solid boxes are what we built, dashed are outside services.**
- **The scene**: one clock loops the story. Packets with short trails travel
  each hop in their tone; a box lights up in its tone when the scene reaches
  it, steps tick on, live text fades in, then the finished scene holds and
  restarts. Written straight to the DOM, paused off screen.
- **Layout**: a grid read left to right on desktop and top to bottom on
  phones; lines are measured from the real boxes and follow the reading
  direction. On large screens the figure runs wider than the text column.
- **Accessibility**: reduced motion shows the finished scene still.

## Images (from feedback on project cards)

- Card and hero: a real photo, ideally the team with the prize (TrueVoice
  style). Product screenshots go in the gallery at the bottom.
- Keep grids even (two, three or four). Avoid images whose content
  contradicts the product (a fruit photo next to a list of detected items
  that are not in it was removed from SnapShelf).
- Resize to 1600px wide (cover) or 1400px (squares), strip metadata.

## Checks

The pilot's Playwright scripts now live in the repo (`tests/browser/`) and
read the project data, so every project in the story format gets them:
insight, facts at a glance, teammates linked, section names in the right
voice, no "My part", no commit counts, and the diagram (box and line counts,
no overlaps, fits its frame on laptop and phone, the scene lights every box,
packets move, pauses off screen, still under reduced motion). Every page in
the sitemap is also checked for broken images, missing alt text, console
errors and sideways scroll.

## Log

- 2026-10-25: Asked for research on better ways to present projects than
  problem / what I built / what it does. Chose insight first, at a glance,
  diagram, decisions with trade-offs, limits. Piloted on TrueVoice.
- 2026-10-25: Asked for a diagram like Mermaid but customised to the site.
  First version: static boxes and lines with flowing dots.
- 2026-10-25: Sent a reference video; wanted it more elaborate, still in the
  site's style. Added tones, details, steps, live text, the looping scene,
  the legend and the wide figure. Rated the diagram 10/10.
- 2026-10-25: Told the deadline story; added it as "The last ten minutes"
  and made the call decision's trade-off say it nearly cost the submission.
- 2026-10-25: Gave teammates' LinkedIn profiles to credit them.
- 2026-10-25: No commits, no "My part", tell it as the team's project.
  Teammates moved to the top as the Team fact. "Decisions we made", "we" in
  the story, caption says "what we built".
- 2026-10-25: Asked to keep this log so the format becomes a skill and can
  be rolled out to every project.
- 2026-10-25: Remove "What it isn't": no login and prototype status are
  obvious for a hackathon project. Section made optional and dropped from
  TrueVoice.
- 2026-10-25: Code restructured: one file per project, groups in index.ts,
  validation that fails the build, browser checks in the repo. The event and
  result facts are now derived, after TrueVoice's result had drifted into
  three wordings. Basket's prize reads "Best Use of Tavily, 1st place".
  Solo projects say "I", team projects "we".
