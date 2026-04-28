# Portfolio Redesign — Technical Design

| | |
|---|---|
| Owner | Oriol Morros Vilaseca |
| Date | 2026-04-28 |
| Status | Draft v1 — pending review |
| Companion to | `prd.md` (read first) |

This document covers the *how*. Read `prd.md` first for the *what* and *why*. Decisions locked in §11 of the PRD are taken as given here.

---

## 1. Architecture overview

A single Next.js 14 (App Router) app on Vercel. One public route, one internal API route. The corpus is embedded at build time into a static JSON shipped with the bundle; retrieval happens in-process inside the edge function on each chat request. No databases, no external services beyond OpenAI.

```
┌─────────────────────────────────────────────────────────────┐
│  CLIENT (browser)                                           │
│                                                             │
│  /  →  The Page (server-rendered + hydrated)                │
│         └─ AskBlock (callout) → ChatPanel (inline expand)   │
│                                          │                  │
└──────────────────────────────────────────┼──────────────────┘
                                           │ POST /api/chat (SSE)
                                           ▼
┌─────────────────────────────────────────────────────────────┐
│  EDGE FUNCTION  /api/chat                                   │
│                                                             │
│  1. embed(question)  ── OpenAI ─►  query vector             │
│  2. cosine_top_k(embeddings.json, vector, k=5)              │
│  3. build prompt (system + retrieved chunks + history)      │
│  4. OpenAI Responses API (gpt-4.1-mini, tools, structured)  │
│  5. stream SSE back to client                               │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Key non-functional choices:**
- **Edge runtime** for `/api/chat` — lower TTFT, cheaper, geo-distributed.
- **Static `embeddings.json`** (built into the bundle) — zero extra infra, sub-10ms retrieval.
- **No vector DB** — at <200 chunks the in-memory cosine is faster than any network round trip.

---

## 2. Routes & API

| Route | Method | Runtime | Purpose |
|---|---|---|---|
| `/` | GET | Node (RSC) | The Page — server-rendered, full content, JS-optional for read |
| `/api/chat` | POST | Edge | Streaming chat endpoint (SSE); JSON body in, SSE out |

No separate `/cv` or `/chat` route. The chat surfaces *inline* on `/`. Single URL, single experience.

**`/api/chat` contract:**

```ts
// Request
POST /api/chat
{
  messages: Array<{ role: 'user' | 'assistant'; content: string }>
}

// Response: text/event-stream
event: token        data: { delta: string }
event: tool_call    data: { name: string; args: object; id: string }
event: tool_result  data: { id: string; result: object }
event: done         data: { output: StructuredOutput; meta: ResponseMeta }
event: error        data: { code: string; message: string }
```

---

## 3. File / folder layout

Builds on the existing `src/` structure; adds `content/`, `embeddings/`, `evals/`, and a refactored component tree.

```
src/
  app/
    page.tsx                  ← The Page (composes section components)
    layout.tsx                ← root layout, theme provider, fonts
    api/
      chat/
        route.ts              ← edge function (SSE streaming)
  components/
    page/                     ← The Page sections
      Hero.tsx
      AskBlock.tsx            ← "Lazy to scroll?" callout
      SelectedWork.tsx
      BuildLog.tsx
      Hackathons.tsx
      Experience.tsx
      Education.tsx
      ContactNow.tsx
    chat/                     ← Chat UI
      ChatPanel.tsx           ← orchestrator (state + SSE consumer)
      MessageList.tsx
      MessageBubble.tsx
      ToolPill.tsx            ← function-call pill (collapses)
      StatusStrip.tsx         ← model · tools · tokens · TTFT
      InlineProjectCard.tsx   ← rendered when answer references a project
      SourcesPanel.tsx
      SuggestedChips.tsx
    ui/                       ← shared primitives
      Callout.tsx             ← Notion-style callout block
      ToggleBlock.tsx         ← collapsible expandable block
      Tag.tsx                 ← inline mono tag (stack/category)
      ThemeToggle.tsx
      DateLabel.tsx
  data/
    projects.ts               ← keep existing; remove "Personal Web Portfolio"
    experience.ts             ← NEW
    hackathons.ts             ← NEW
    events.ts                 ← NEW
    bio.ts                    ← NEW (about/now content)
  lib/
    chat/
      tools.ts                ← function definitions (get_project, etc.)
      schema.ts               ← strict JSON schema for structured output
      prompt.ts               ← system prompt builder
      retrieval.ts            ← cosine similarity + top-k
      stream.ts               ← SSE helpers
    constants.ts              ← keep existing
  hooks/
    useChat.ts                ← SSE stream consumer hook
    useTheme.ts               ← theme + localStorage
content/                      ← markdown corpus (source of truth for RAG)
  about.md
  now.md
  education.md
  experience.md
  hackathons.md
  events.md
  projects/
    snapshelf.md
    bk-shoot.md
    cnn-comparison.md
    wikipedia-scraper.md
    university-library-system.md
embeddings/
  embeddings.json             ← generated; gitignored or committed (decide in plan.md)
  build-embeddings.ts         ← script: walks content/, embeds, writes JSON
evals/
  cases.json                  ← 15-20 eval cases
  run-evals.ts                ← runner (LLM-as-judge + rule-based)
docs/superpowers/specs/2026-04-27-portfolio-redesign/
  prd.md, design.md, plan.md, README.md
```

---

## 4. The Page — component map

**`page.tsx`** composes sections in order:

```tsx
<Hero />
<AskBlock />              {/* the "Lazy to scroll?" callout */}
<SelectedWork />          {/* 3 lead AI projects */}
<BuildLog />              {/* all projects, dated list */}
<Hackathons />
<Experience />
<Education />
<ContactNow />
```

Each section is server-rendered from data files (`projects.ts`, `experience.ts`, etc.) and hydrated for animations.

**`AskBlock`** is the only client-heavy component on first paint:
- Renders a Notion-style callout (icon + message + input).
- Local state: `query` (input), `panelOpen` (boolean).
- On submit → sets `panelOpen = true`, inserts `<ChatPanel initialQuery={query} />` below.
- On dismiss → unmount panel, restore the callout.

Animations on The Page (Framer Motion):
- Section reveal: `whileInView` fade-up (40px → 0, opacity 0 → 1, 0.5s expo-out, runs once)
- Hover on Build Log rows: subtle bg tint (`bg-foreground/5`)
- Theme toggle: View Transitions API (~30 lines of CSS, no library)

---

## 5. The Chat — component map

```
<ChatPanel>
  <MessageList>
    <MessageBubble role="user">…</MessageBubble>
    <MessageBubble role="assistant">
      <ToolPill /> <ToolPill /> …      {/* render briefly during stream */}
      <streaming markdown body>
      <InlineProjectCard /> …          {/* if answer references projects */}
      <SourcesPanel />                  {/* citations from retrieval */}
    </MessageBubble>
  </MessageList>
  <StatusStrip />                       {/* model · tools · tokens · TTFT */}
  <SuggestedChips />                    {/* shown when conversation empty */}
  <Composer />                          {/* input + submit */}
</ChatPanel>
```

State managed by `useChat()` hook (in `hooks/useChat.ts`):
- `messages: Message[]` — full thread
- `streaming: boolean` — true while assistant is generating
- `currentMeta: ResponseMeta | null` — populated for live status strip
- `send(query: string)` — kicks off SSE request

`useChat` consumes the SSE stream from `/api/chat` and routes events to local state:
- `token` → append to last assistant message
- `tool_call` → push a tool pill, mark in-flight
- `tool_result` → mark pill resolved, transform into `InlineProjectCard` if applicable
- `done` → finalize message, update status strip with final meta
- `error` → user-facing error message bubble

---

## 6. RAG pipeline

### Build-time: `npm run embed`

Script: `embeddings/build-embeddings.ts`

1. Walk `content/**/*.md`.
2. Parse frontmatter (id, title, date, tags) + body markdown.
3. Semantic chunk: split on H2 boundaries; if a section >800 tokens, sub-split on paragraphs to ≤500-token chunks. Aim for chunks 200–500 tokens.
4. Embed each chunk via `openai.embeddings.create({ model: "text-embedding-3-small", input: chunk_text })`.
5. Write `embeddings/embeddings.json`:

```ts
type ChunkRecord = {
  id: string                    // 'projects/snapshelf#0'
  source: string                // 'projects/snapshelf'
  title: string                 // for citation display
  text: string
  embedding: number[]           // 1536-dim
  metadata: {
    kind: 'project' | 'experience' | 'hackathon' | 'event' | 'education' | 'bio'
    date?: string               // ISO if applicable
    tags?: string[]
    projectSlug?: string        // if kind=project
  }
}
type EmbeddingsFile = ChunkRecord[]
```

Cost on full rebuild: ~$0.05. Triggered manually after content changes; not on every build (use a content hash to skip if unchanged).

### Runtime: `lib/chat/retrieval.ts`

```ts
function topK(query: string, k = 5): Promise<ChunkRecord[]>
```

- Embed the query (one OpenAI call).
- Cosine similarity vs all chunks (in-memory; <200 chunks → <5ms).
- Return top-k, sorted by score desc.

`embeddings.json` is loaded once per cold start of the edge function and held in module-scope memory.

---

## 7. Chat flow (sequence)

```
Client                          Edge fn                       OpenAI
──────                          ───────                       ──────
send(messages) ──────────────►
                                embed(last user msg) ──────►  text-embedding-3-small
                                                       ◄──────  vector
                                topK(vector, 5)
                                build prompt:
                                  system + chunks + history
                                openai.responses.create({
                                  model: 'gpt-4.1-mini',
                                  tools: [4 tools],
                                  response_format: jsonSchema,
                                  stream: true
                                }) ─────────────────────────►
                                                       ◄────── stream events
                                                              (deltas, tool calls)
                                map → SSE events ─────►
                                                       ◄────── tool call requested
                                execute tool locally
                                  (in-process; reads data/*.ts)
                                tool result ────────────────►
                                                       ◄────── continued stream
                                                       ◄────── final structured JSON
                                emit `done` SSE event ─►
client renders structured output (title, body, project cards, sources, status)
```

Tools execute **in-process** in the edge function (no extra round trip):

```ts
// lib/chat/tools.ts
const tools = {
  get_project:    (slug: string)            => projects.find(p => p.slug === slug),
  list_projects:  (filter?)                 => projects.filter(...),
  get_experience: (kind)                    => experienceData[kind],
  search_corpus:  (query: string, k = 5)    => topK(query, k)
}
```

When OpenAI's stream emits a `tool_use` event, the edge fn calls the matching function, sends the result back to the model, and continues streaming.

---

## 8. Data shapes

### Structured output schema (strict)

```ts
// lib/chat/schema.ts
const responseSchema = {
  type: 'object',
  properties: {
    title: { type: 'string' },
    body: { type: 'string', description: 'Markdown answer body' },
    referenced_projects: {
      type: 'array',
      items: { type: 'string' }       // project slugs
    },
    stack_used: {
      type: 'array',
      items: { type: 'string' }       // e.g. ['gpt-4.1-mini', 'search_corpus', 'get_project']
    },
    off_corpus: { type: 'boolean' }   // true if model couldn't ground in corpus
  },
  required: ['title', 'body', 'referenced_projects', 'stack_used', 'off_corpus'],
  additionalProperties: false
}
```

### Response meta (for the status strip)

```ts
type ResponseMeta = {
  model: string                       // 'gpt-4.1-mini'
  toolsCalled: string[]               // names of tools invoked
  tokens: { input: number; output: number }
  ttftMs: number                      // time to first token
  totalMs: number
}
```

### Content frontmatter (markdown source)

```yaml
---
id: snapshelf
kind: project
title: SnapShelf
date: 2025-09-15
tags: [TypeScript, React Native, Python, AI]
slug: snapshelf
status: active
---
```

---

## 9. Theme system

Per PRD §11 Q3: **dark default + light/dark toggle, persisted, no system-preference detection.**

```css
/* app/globals.css */
:root[data-theme="dark"] {
  --bg: #0a0a0a;
  --fg: #f2efe8;
  --fg-muted: #7a7a73;
  --rule: #1c1c1c;
  --accent: #...;       /* PRD §11 Q2 — provisional default = soft Notion blue */
}
:root[data-theme="light"] {
  --bg: #fafaf7;
  --fg: #0a0a0a;
  --fg-muted: #6b6b66;
  --rule: #e6e6e2;
  --accent: #...;
}
```

`ThemeToggle.tsx`:
- Reads/writes `localStorage.theme` (`'dark' | 'light'`).
- Sets `data-theme` on `<html>`.
- Default at first paint: `dark` (via `<script>` blocking hydration to avoid flash).
- Toggle uses View Transitions API (`document.startViewTransition`) for the diamond clip-path reveal.

---

## 10. Animations (full inventory)

| Element | Animation | Mechanism |
|---|---|---|
| Section enter | Fade-up 40px → 0, opacity 0 → 1, 0.5s expo-out, once | Framer Motion `whileInView` |
| BuildLog row hover | bg color tint shift, 150ms | Tailwind hover variant |
| Toggle/accordion | Smooth height transition | Framer Motion `AnimatePresence` |
| Theme toggle | Diamond clip-path reveal | View Transitions API (CSS only) |
| AskBlock → ChatPanel expand | Height grow from callout into panel | Framer Motion layout animation |
| Tool pill render | Slide in from left, ~300ms | Framer Motion |
| Tool pill collapse | Fade out + transform into card | Framer Motion layout transition |
| Token stream | Plain insertion, no transition | (none — too noisy otherwise) |

Restraint principle: every animation has a *purpose*. Nothing decorative.

---

## 11. Error handling

| Failure | Behavior |
|---|---|
| OpenAI 429 / 5xx | Edge fn returns SSE `error` event; chat UI shows: "The model's having a moment. Try again?" |
| OpenAI timeout (>30s) | Abort upstream, emit `error` event, client surfaces retry CTA |
| Tool execution error (e.g. unknown slug) | Tool returns `{ error: '...' }`; model sees it and adapts |
| Off-corpus question | Model returns `off_corpus: true`; UI renders graceful refusal: "That's not in the archive — try asking about projects, work, or hackathons." |
| Network drop mid-stream | Client detects via `EventSource.onerror`; surface "Connection dropped" + retry |
| Build-time embedding failure | Script exits non-zero; CI/build fails. Deterministic. |
| Static asset missing (embeddings.json) | Edge fn returns 500 with clear log; should never happen if build passes. |

---

## 12. Testing & evals

**No unit tests for components** — small surface area, types catch most regressions, manual + Lighthouse covers UX.

**Eval suite** (`evals/`) — the senior signal.

```json
// evals/cases.json
[
  {
    "id": "snapshelf-stack",
    "query": "What stack does SnapShelf use?",
    "expectations": [
      { "type": "must_mention", "value": ["GPT-4o", "React Native", "Python"] },
      { "type": "must_call_tool", "value": "get_project" }
    ]
  },
  {
    "id": "off-corpus-personal",
    "query": "What's Oriol's GPA?",
    "expectations": [
      { "type": "off_corpus", "value": true },
      { "type": "must_not_fabricate", "value": ["3.", "4."] }
    ]
  },
  // ... 15-20 total
]
```

Runner (`evals/run-evals.ts`):
- Hits the local `/api/chat` endpoint.
- Validates each expectation (rule-based for must_mention/must_call_tool/off_corpus; LLM-as-judge for nuance).
- Outputs a pass/fail report.
- Fails CI if pass rate <90%.

`npm run evals` is committed in package.json scripts. Eval results feed v2 RAG case-study writeups.

---

## 13. Key decisions

| Decision | Choice | Rationale |
|---|---|---|
| Vector storage | Static `embeddings.json` in bundle | <200 chunks; in-memory cosine is faster than any DB roundtrip; zero infra. |
| API | OpenAI Responses API | Modern endpoint; native tools + structured outputs + streaming + auto prompt caching. |
| Default model | `gpt-4.1-mini` | $0.40/M input — practically free at portfolio scale, smart enough for grounded Q&A. |
| Auto-escalation | None in v1 | YAGNI. Add when evals show a need. |
| Page architecture | Single route, inline chat | Keeps Page primary; chat as accent. No routing complexity. |
| Theme system | CSS variables + `data-theme` | Standard; easy to extend; View Transitions API plays nicely. |
| Streaming | SSE | Native browser support; simpler than WebSockets; matches OpenAI's stream model 1:1. |
| Tool execution | In-process in edge fn | No extra round trip; tools just read static data. |
| Multi-turn history | Bounded to 6 messages | Conserve tokens; works for portfolio Q&A use case. |
| Content storage | Markdown in `content/` | Single source of truth; embeddings derive from it; readable git history. |

---

## 14. Risks & mitigations

| Risk | Likelihood | Mitigation |
|---|---|---|
| Responses API quirks (newer endpoint) | Medium | Wrap calls behind a small adapter; fallback to Chat Completions if needed. |
| Retrieval quality at low chunk count | Medium | If evals show drift, add BM25 hybrid or upgrade to `text-embedding-3-large`. |
| Cost runaway from abuse | Low | IP-based rate limit (Vercel KV: 20 req/min/IP); max output tokens 1500; per-day cap. |
| Hallucination on edge cases | Medium | Strict structured outputs with `off_corpus` flag; system prompt explicitly forbids invention; eval suite catches regressions. |
| Theme flash on initial load | Low | Inline `<script>` in `<head>` reads localStorage and sets `data-theme` before first paint. |

---

## 15. Open implementation questions (deferred to `plan.md`)

1. **`embeddings.json` in git?** Keeping it committed = reproducible builds, no need to embed at deploy. Excluding it = cleaner diffs. *Lean: commit it; the file is ~3MB at this scale.*
2. **Content authoring workflow** — write markdown directly, or autogenerate stubs from existing `projects.ts`? *Lean: bootstrap via script, then hand-edit.*
3. **Logging** — JSON lines to Vercel logs (`console.log`) or to a `/api/log` endpoint that writes elsewhere? *Lean: console.log only in v1.*
4. **Rate limiting infra** — Vercel KV (~$0/month at low usage) or skip entirely until abuse happens? *Lean: skip in v1, add if needed.*
5. **Suggested prompts content** — final wording for the 3-4 chips?
6. **Phasing for plan.md** — what's the right phase breakdown? Suggested:
   - Phase 1: Static Page (no chat). All sections wired from data; theme toggle; deploy preview.
   - Phase 2: Chat MVP — `/api/chat`, RAG pipeline, basic UI, no tools yet.
   - Phase 3: Tools + structured outputs + status strip + project cards.
   - Phase 4: Evals.
   - Phase 5: Polish (View Transitions, animations, edge cases).

---

## 16. Open content/style decisions (still in PRD)

These don't gate `design.md` but need resolution before content authoring:

- **PRD §11 Q2** — accent color (provisional default in CSS: soft Notion blue).
- **PRD §11 Q4** — photo asset + treatment.
- **PRD §11 Q5** — "Personal Web Portfolio" entry in Build Log (taken as **cut** in this design unless overridden).
- **PRD §11 Q6** — soft launch target.
