# Portfolio Redesign — Product Requirements

| | |
|---|---|
| Owner | Oriol Morros Vilaseca |
| Date | 2026-04-27 (last updated 2026-04-28) |
| Status | Draft v2 — pending review |
| Timeline | No deadline. Current omorros.com remains live as placeholder until v2 ships. |

---

## 1. Overview

A new personal portfolio framed around **two complementary experiences**:

1. **The Page** — a clean, Notion-style scrollable portfolio with all of Oriol's info: projects, work, hackathons, events, education. **This is the primary surface** — what most visitors will land on and read top-to-bottom.
2. **The Chat** — an LLM-powered conversational interface trained exclusively on Oriol's work, surfaced as an inline accent near the top of The Page (*"Lazy to scroll? Ask me anything."*). For visitors who want a faster path to specific information, the chat returns grounded answers with structured project cards. **Optional, not a gate.**

**Positioning:** *"A clean portfolio that's also a working AI product."* The chat is a tasteful AI-engineer flex without dominating the experience — visible enough to signal capability, ignorable enough that the work speaks for itself.

This differentiates from:
- **Typical SWE/student portfolios** → animated CVs with no AI dimension.
- **atishay.site** (the original inspiration) → makes chat the entire entry point. Stronger but riskier; gates skim-readers behind a chat input. Our framing trusts the reader to choose their path.

---

## 2. Goals

- **Primary:** Convince an AI/ML/SWE recruiter or engineer in <60 seconds that Oriol ships modern AI products.
- Surface AI-integration work (SnapShelf with GPT-4o Vision, CNN benchmark) within the first scroll or first chat exchange.
- Add **hackathons** and **events** as first-class content sections (currently absent).
- Keep static content skim-friendly for users who don't want to chat.
- Function as a launchpad for future case studies (the redesign itself, the v2 RAG migration if/when, etc.).

## 3. Non-goals

- Not a creative-coder showpiece. No WebGL playgrounds, custom cursors, page-snap nav, or 6-color gradient theming.
- Not a generic AI chatbot — model only knows about Oriol; off-corpus questions are gracefully refused.
- No blog/writing system in v1 (can be added later as a corpus extension).
- No analytics dashboard, admin UI, or auth (single-user content).
- No mobile app or PWA.

## 4. Audience

- AI/ML/SWE engineers reviewing the portfolio before an interview.
- Hiring managers and recruiters at engineering-led companies.
- Fellow students and community peers.
- (Tertiary) Oriol himself, when iterating on case studies.

---

## 5. Core experiences

### 5A. The Page (primary surface)

Notion-style scrollable portfolio. Sections in order:

1. **Hero** — name, photo, one-line intro, 4 social links (GitHub / LinkedIn / CV / Email)
2. **"Lazy to scroll?" affordance** — inline chat-entry block (*"Lazy to scroll? Ask me anything."*) that expands inline into the chat panel on submit. See §5B for the chat experience itself; see §11 Q1 for the affordance design options.
3. **Selected Work** — 3 lead AI-flavored projects, rich case studies (lead with capability + metric, not stack)
4. **Build Log** — every project, dated list (date · title · one-liner · stack tags)
5. **Hackathons** — dated list (date · event · what built · placement)
6. **Experience** — dated list (date · role · 1–2 measurable bullets)
7. **Education** — compressed (3–4 lines)
8. **Now / Contact** — what Oriol's currently building + contact links

**Aesthetic:** Notion-style restraint with thoughtful animations.
- Generous whitespace, comfortable line-height, thin gray dividers between sections
- Notion-style callout/toggle blocks for inline meta and expandable details
- Subtle hover states on row-style content (background tint shift)
- Section reveals on scroll (intersection observer + subtle fade-up)
- Smooth height transitions on toggle/accordion blocks
- View Transitions API for theme switch
- Inter for body + display; JetBrains Mono for inline meta tags
- Color and theme — see §11 Q2 + Q3

### 5B. The Chat (inline accent)

Surfaced from The Page via the "Lazy to scroll?" block. Once activated, the chat panel expands **inline** (user stays on the same page; can keep chatting or scroll past it).

User flow:

1. User types a question (or clicks one of 3–4 suggested-prompt chips inside the block).
2. Answer streams token-by-token.
3. **Visible tool calls** — when the model calls a function (`get_project("snapshelf")`, etc.), it renders briefly as a small mono pill (e.g. `→ get_project("snapshelf") · 124ms ✓`), then collapses into a structured card built from the project's existing case-study data.
4. **Status strip** below the chat shows live machinery: model · tools used · tokens · TTFT.
5. Sources panel — references to the corpus chunks used.
6. User can continue the conversation (multi-turn) or dismiss / scroll past to read The Page normally.

---

## 6. Feature inventory

Priority: **M** = must-have for v1 launch, **S** = should-have, **C** = could-have / parking lot.

### The Page
| | Feature |
|---|---|
| M | Hero with photo (treatment — see open questions) |
| M | "Lazy to scroll?" inline chat affordance (design — see open questions) |
| M | Selected Work section (3 lead projects, rich case studies) |
| M | Build Log section (all projects, dated) |
| M | Hackathons section |
| M | Experience section |
| M | Education section |
| M | Contact / Now block |
| M | Notion-style typographic restraint (thin dividers, callouts, inline tags, generous whitespace) |
| M | Section reveals on scroll (intersection observer + subtle fade-up) |
| S | Smooth toggle/accordion blocks for expandable case-study details |
| S | View Transitions API on theme toggle |
| S | Floating `Press /` shortcut hint (engineer-flavored polish) |
| C | Print stylesheet (proper PDF export when user prints) |

### The Chat
| | Feature |
|---|---|
| M | Streaming SSE answers |
| M | Visible function-tool calls (rendered as collapsible pills) |
| M | Strict structured outputs (JSON schema enforced) |
| M | Custom RAG over personal corpus (build-time embedding → static `embeddings.json` → in-memory cosine retrieval at edge) |
| M | Status strip (model · tools · tokens · TTFT) |
| M | Suggested prompt chips |
| M | Off-corpus refusal behavior |
| M | Inline structured project cards in answers (reuses `projects.ts` data) |
| S | Multi-turn (follow-up questions in the same panel) |
| S | Eval suite (15–20 questions, LLM-as-judge or rule-based, committed to repo) |
| S | Citation links from prose to source files |
| C | Voice input |
| C | Streaming "thinking" tokens |
| C | Image upload / multi-modal |

### Cross-cutting
| | Feature |
|---|---|
| M | Theme toggle (default — see §11 Q3) |
| M | Responsive (mobile + desktop) |
| M | Accessibility: keyboard nav, focus states, semantic HTML |
| M | Lighthouse ≥95 (Performance, Accessibility, Best Practices) |
| S | Keyboard shortcut to focus the chat affordance from anywhere on The Page |

---

## 7. Tech stack

- **Framework:** Next.js 14 (App Router), TypeScript
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion (sparingly — for section reveals, toggle expansions, chat streaming)
- **AI:** OpenAI Responses API
  - Default model: `gpt-4.1-mini`
  - Auto-escalate to `gpt-4.1` on low-confidence outputs
  - Embeddings: `text-embedding-3-small`
- **RAG:** Custom — markdown corpus → semantic chunker → build-time embedding → static `embeddings.json` → in-memory cosine retrieval at edge function
- **Hosting:** Vercel (Edge Functions for chat endpoint)
- **Fonts:** Inter (body + display, weight range 400–600), JetBrains Mono (meta + inline tags). Notion-flavored typographic restraint — no editorial serif accents.
- **Color:** Notion-style palette — near-black on near-white (or inverted in dark mode). Single subtle accent for active/hover states. Default theme — see §11 Q3. Specific accent — see §11 Q2.

---

## 8. The corpus (data inventory)

Content embedded into the RAG:

| Source | Status | Notes |
|---|---|---|
| Project case studies | Exists | In `src/data/projects.ts` — exported to markdown for embedding |
| Bio / about | Partial | Exists on current site; rewrite for AI-eng angle |
| Education | Exists | Compress to 3–4 lines |
| Work experience | **Missing** | Need to write content |
| Hackathons | **Missing** | Need to write content |
| Events / talks | **Missing** | Need to write content |

Corpus rebuilt and re-embedded as part of the build pipeline. Embedding cost on full rebuild: **~$0.05**.

---

## 9. Constraints

- Current site at omorros.com remains live during redesign. New build lives on `redesign` branch with Vercel preview URL.
- No DNS swap when shipping — merge `redesign` → `main` on the same Vercel project.
- The Page server-renders; the Chat is JS-required (acceptable, since it's optional).
- Single-user, no auth, no user data storage.
- **Cost cap:** $2k OpenAI credit available. Per-query cost target <$0.01. At GPT-4.1-mini rates, ~$0.003/query expected.

---

## 10. Success criteria

- Chat correctly grounds answers in corpus 100% of the time (no fabrication; off-corpus → graceful refusal).
- Eval suite ≥90% pass rate before launch.
- Lighthouse ≥95 on Performance, Accessibility, Best Practices.
- TTFT (time to first token) <500ms on chat queries from CDN-warm regions.
- Chat answers render at least one structured card when the question references a known project.
- Site ships on `omorros.com` as a clean replacement (no half-built sections).

---

## 11. Open questions / decisions to lock before design doc

1. **"Lazy to scroll?" affordance design** — **LOCKED: (A)**. Notion-style callout block with tinted bg, icon, and embedded input. On submit, expands inline into a streaming chat panel. **(C)** (floating `Press /` hint) deferred to v1.1 polish.
2. **Accent color** — used only on hover/active states. Options: muted blue (Notion-native), electric blue (sharper), off-yellow (warmer), strict grayscale (most restrained). Single choice; can change later.
3. **Default theme** — **LOCKED: dark default with light/dark toggle**. User-set theme persists in localStorage. No system-preference detection — first-time visitors land on dark; can switch to light via the toggle.
4. **Photo** — does Oriol have a usable shot, or does one need to be taken? Preferred treatment: clean rectangular crop, grayscale → hover reveals color (or stay grayscale).
5. **Personal Web Portfolio entry** in Build Log — cut (recommended, the new site speaks for itself), or keep with a "v1 archive" tag?
6. **Soft launch target** — is there *any* internal deadline, or genuinely open-ended?

---

## 12. Out of scope (parking lot for v2/v3)

- Blog / writing as a separate corpus
- Multi-modal chat (image upload)
- `search_writing` tool (depends on having writing)
- Print stylesheet for The Page
- Voice input
- Embedded live AI demo on a project card (e.g. SnapShelf scan-in-browser)
- pgvector or production-grade vector storage (current scale doesn't warrant it)
- Migrating retrieval from in-memory cosine to a hosted vector DB (the "v2 RAG case study" project)
