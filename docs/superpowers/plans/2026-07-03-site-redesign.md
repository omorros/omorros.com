# Site Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild omorros.com as a minimal multi-page site visually modeled on samselikoff.com, on the `redesign` branch.

**Architecture:** Keep the Next.js 14 App Router + TypeScript + Tailwind stack and `src/data/projects.ts` as the data source. Replace the effect-heavy single page with four routes (home, projects, project detail, blog) built from a small set of fresh components in `src/components/site/`. Delete all old effect components and their dependencies at the end.

**Tech Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS 3, next/font (Inter), lucide-react for the few icons.

## Global Constraints

- Spec: `docs/superpowers/specs/2026-07-03-site-redesign-design.md`. Read it before starting.
- Never copy code from github.com/samselikoff/samselikoff.com. It has no license. Matching design values (sizes, colors, spacing) is fine.
- All copy: plain brief English, short sentences, no em dashes anywhere (copy, code comments, commits), no AI buzzwords.
- Commits: one brief sentence, no Co-Authored-By or AI attribution, never push.
- `src/data/projects.ts` is not modified by any task. It also has uncommitted user edits; never revert or reformat it.
- `src/app/projects/[slug]/page.tsx` has uncommitted user edits; Task 6 rewrites it deliberately, that is expected.
- There is no test framework in this repo and we are not adding one (static content site). Each task verifies with `npm run build`; Task 9 checks rendered output.
- Life facts: Manresa 2005 to 2023 (born January 2005, left August 2023), Cambridge 2023 to 2026, London 2026 to now. Degree: BSc Software Engineering, ARU Cambridge, First Class Honours, confirmed.
- Photos are placeholders (local SVGs) until the user uploads real ones.

---

### Task 1: Design foundation (fonts, colors, layout shell)

**Files:**
- Modify: `src/app/globals.css` (full rewrite)
- Modify: `tailwind.config.ts` (trim fonts, add measure)
- Modify: `src/app/layout.tsx` (Inter only, light default, updated metadata)
- Modify: `src/lib/constants.ts` (updated description and subtitle)

**Interfaces:**
- Consumes: nothing.
- Produces: CSS vars (`--background`, `--foreground`, `--foreground-muted`, `--foreground-faint`, `--border`, `--border-soft`, `--accent`) mapped to Tailwind classes `bg-background`, `text-foreground`, `text-foreground-muted`, `text-foreground-faint`, `border-border`, `border-border-soft`, `text-accent`. `font-sans` = Inter. `max-w-measure` = 34em. Later tasks style with these only.

- [ ] **Step 1: Rewrite `src/app/globals.css`**

Replace the whole file with:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Light-first gray palette in the style of samselikoff.com.
   CSS vars as rgb triplets so Tailwind alpha modifiers work. */

:root {
  --background: 255 255 255;
  --background-soft: 249 250 251;   /* gray-50 */
  --foreground: 17 24 39;           /* gray-900 */
  --foreground-muted: 75 85 99;     /* gray-600 */
  --foreground-faint: 107 114 128;  /* gray-500 */
  --border: 229 231 235;            /* gray-200 */
  --border-soft: 243 244 246;       /* gray-100 */
  --accent: 37 99 235;              /* blue-600 */
}

.dark {
  --background: 24 24 27;           /* zinc-900 */
  --background-soft: 39 39 42;      /* zinc-800 */
  --foreground: 244 244 245;        /* zinc-100 */
  --foreground-muted: 161 161 170;  /* zinc-400 */
  --foreground-faint: 113 113 122;  /* zinc-500 */
  --border: 63 63 70;               /* zinc-700 */
  --border-soft: 39 39 42;          /* zinc-800 */
  --accent: 96 165 250;             /* blue-400 */
}

* { box-sizing: border-box; }
html, body { margin: 0; padding: 0; }

html {
  background: rgb(var(--background));
  color-scheme: light;
}
html.dark { color-scheme: dark; }

body {
  background: rgb(var(--background));
  color: rgb(var(--foreground));
  font-size: 17px;
  line-height: 1.6;
  letter-spacing: -0.011em;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}

a { color: inherit; text-decoration: none; }

::selection {
  background: rgb(var(--accent) / 0.2);
  color: rgb(var(--foreground));
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

Deleted on purpose: Playfair heading rule, view transition diamond animation, shimmer keyframes, custom scrollbar, body color transition.

- [ ] **Step 2: Trim `tailwind.config.ts`**

Replace the `fontFamily` and add `maxWidth` inside `theme.extend` so the file becomes:

```ts
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: 'rgb(var(--background) / <alpha-value>)',
          soft: 'rgb(var(--background-soft) / <alpha-value>)',
        },
        foreground: {
          DEFAULT: 'rgb(var(--foreground) / <alpha-value>)',
          muted: 'rgb(var(--foreground-muted) / <alpha-value>)',
          faint: 'rgb(var(--foreground-faint) / <alpha-value>)',
        },
        border: {
          DEFAULT: 'rgb(var(--border) / <alpha-value>)',
          soft: 'rgb(var(--border-soft) / <alpha-value>)',
        },
        accent: {
          DEFAULT: 'rgb(var(--accent) / <alpha-value>)',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        measure: '34em',
      },
    },
  },
  plugins: [],
}
export default config
```

Note: `font-display`, `font-mono`, `font-handwriting` classes stop existing. Old components still use them; that is fine, Tailwind just will not generate them and old pages look plainer until they are deleted.

- [ ] **Step 3: Rewrite `src/app/layout.tsx`**

Keep metadata, JSON-LD, Analytics and SpeedInsights. Load only Inter. Default theme becomes light. Replace the whole file with:

```tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import './globals.css'
import { siteConfig } from '@/lib/constants'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
})

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  sameAs: [siteConfig.links.github, siteConfig.links.linkedin],
  jobTitle: 'Software Engineer',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'London',
    addressCountry: 'UK',
  },
}

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    'Software Engineer',
    'AI Engineer',
    'Developer',
    'London',
    'AI',
    'Machine Learning',
    'Full Stack',
    'Oriol Morros',
    'React',
    'Next.js',
    'TypeScript',
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: siteConfig.title,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: ['/opengraph-image'],
    creator: '@omorros',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

// Apply saved theme before paint. Default is light.
const themeInitScript = `(function(){try{if(localStorage.getItem('theme')==='dark'){document.documentElement.classList.add('dark')}}catch(e){}})();`

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="font-sans antialiased bg-background text-foreground">
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
```

Note: `SmoothScrollProvider` import is gone. The Nav and Footer are added to this file in Task 2.

- [ ] **Step 4: Update `src/lib/constants.ts`**

Replace the whole file with:

```ts
export const siteConfig = {
  name: 'Oriol Morros Vilaseca',
  subtitle: 'Software Engineer · London, UK',
  title: 'Oriol Morros Vilaseca | Software Engineer',
  description:
    'Software engineer in London. I build infrastructure for AI agents at Eli by Techbible. BSc Software Engineering from ARU Cambridge, First Class Honours.',
  url: 'https://omorros.com',
  links: {
    github: 'https://github.com/omorros',
    linkedin: 'https://linkedin.com/in/oriolmorros',
    email: 'oriolmorros25@gmail.com',
    resume: '/resume.pdf',
  },
}
```

- [ ] **Step 5: Verify build**

Run: `npm run build`
Expected: build succeeds. Old pages still compile because old components still exist.

- [ ] **Step 6: Commit**

```bash
git add src/app/globals.css tailwind.config.ts src/app/layout.tsx src/lib/constants.ts
git commit -m "Add minimal design foundation"
```

---

### Task 2: Nav, ThemeToggle, Footer

**Files:**
- Create: `src/components/site/Nav.tsx`
- Create: `src/components/site/ThemeToggle.tsx`
- Create: `src/components/site/Footer.tsx`
- Modify: `src/app/layout.tsx` (mount Nav and Footer)

**Interfaces:**
- Consumes: `siteConfig` from `@/lib/constants`, Tailwind tokens from Task 1.
- Produces: `<Nav />` and `<Footer />` server components mounted in the root layout on every page. Pages must NOT render their own nav or back links.

- [ ] **Step 1: Create `src/components/site/ThemeToggle.tsx`**

```tsx
'use client'

import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'

export function ThemeToggle() {
  const [dark, setDark] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setDark(document.documentElement.classList.contains('dark'))
    setMounted(true)
  }, [])

  function toggle() {
    const next = !dark
    setDark(next)
    document.documentElement.classList.toggle('dark', next)
    try {
      localStorage.setItem('theme', next ? 'dark' : 'light')
    } catch {}
  }

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="text-foreground-muted hover:text-foreground transition-colors"
    >
      {mounted && dark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  )
}
```

- [ ] **Step 2: Create `src/components/site/Nav.tsx`**

```tsx
import Link from 'next/link'
import { ThemeToggle } from './ThemeToggle'

const LINKS = [
  { href: '/projects', label: 'Projects' },
  { href: '/blog', label: 'Blog' },
]

export function Nav() {
  return (
    <header className="max-w-2xl mx-auto px-6 pt-8 flex items-center justify-between">
      <Link
        href="/"
        className="text-sm font-semibold text-foreground hover:text-accent transition-colors"
      >
        Oriol Morros
      </Link>
      <nav className="flex items-center gap-6">
        {LINKS.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="text-sm text-foreground-muted hover:text-foreground transition-colors"
          >
            {l.label}
          </Link>
        ))}
        <ThemeToggle />
      </nav>
    </header>
  )
}
```

- [ ] **Step 3: Create `src/components/site/Footer.tsx`**

```tsx
import { siteConfig } from '@/lib/constants'

const LINKS = [
  { href: siteConfig.links.github, label: 'GitHub' },
  { href: siteConfig.links.linkedin, label: 'LinkedIn' },
  { href: siteConfig.links.resume, label: 'CV' },
  { href: `mailto:${siteConfig.links.email}`, label: 'Email' },
]

export function Footer() {
  return (
    <footer className="max-w-2xl mx-auto px-6 py-12 mt-24 border-t border-border-soft flex flex-wrap items-center justify-between gap-4">
      <p className="text-sm text-foreground-faint">
        © {new Date().getFullYear()} Oriol Morros
      </p>
      <div className="flex gap-5">
        {LINKS.map((l) => (
          <a
            key={l.label}
            href={l.href}
            target={l.href.startsWith('mailto:') ? undefined : '_blank'}
            rel={l.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
            className="text-sm text-foreground-muted hover:text-foreground transition-colors"
          >
            {l.label}
          </a>
        ))}
      </div>
    </footer>
  )
}
```

- [ ] **Step 4: Mount in `src/app/layout.tsx`**

Add imports:

```tsx
import { Nav } from '@/components/site/Nav'
import { Footer } from '@/components/site/Footer'
```

Change the body content from `{children}` to:

```tsx
        <Nav />
        {children}
        <Footer />
```

(keeping the two scripts above and Analytics/SpeedInsights below).

- [ ] **Step 5: Verify build**

Run: `npm run build`
Expected: success. Every route now has the new header and footer.

- [ ] **Step 6: Commit**

```bash
git add src/components/site src/app/layout.tsx
git commit -m "Add nav, theme toggle and footer"
```

---

### Task 3: Life section (data, placeholder photos, component)

**Files:**
- Create: `src/data/life.ts`
- Create: `public/life/london.svg`, `public/life/cambridge.svg`, `public/life/manresa.svg`
- Create: `src/components/site/Life.tsx`

**Interfaces:**
- Consumes: Tailwind tokens from Task 1.
- Produces: `Life` server component (no props) exported from `@/components/site/Life`, and `places: Place[]` with `interface Place { city: string; years: string; photo: string; alt: string }` from `@/data/life`. Task 4 renders `<Life />` at the bottom of the homepage.

- [ ] **Step 1: Create `src/data/life.ts`**

Most recent city first, like Sam's site.

```ts
export interface Place {
  city: string
  years: string
  photo: string
  alt: string
}

// Swap the .svg placeholders for real photos when the user uploads them.
export const places: Place[] = [
  {
    city: 'London',
    years: '2026 to now',
    photo: '/life/london.svg',
    alt: 'London',
  },
  {
    city: 'Cambridge',
    years: '2023 to 2026',
    photo: '/life/cambridge.svg',
    alt: 'Cambridge',
  },
  {
    city: 'Manresa',
    years: '2005 to 2023',
    photo: '/life/manresa.svg',
    alt: 'Manresa, near Barcelona',
  },
]
```

- [ ] **Step 2: Create the three placeholder SVGs**

`public/life/london.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675" viewBox="0 0 1200 675"><rect width="1200" height="675" fill="#e4e4e7"/><text x="600" y="345" font-family="sans-serif" font-size="40" fill="#71717a" text-anchor="middle">London photo coming soon</text></svg>
```

`public/life/cambridge.svg`: same but text `Cambridge photo coming soon`.
`public/life/manresa.svg`: same but text `Manresa photo coming soon`.

- [ ] **Step 3: Create `src/components/site/Life.tsx`**

Layout copies Sam's: intro paragraph, then the current city full width, then the two earlier cities side by side.

```tsx
import { places } from '@/data/life'
import type { Place } from '@/data/life'

function PlaceCard({ place }: { place: Place }) {
  return (
    <figure>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={place.photo}
        alt={place.alt}
        className="w-full rounded-lg object-cover aspect-[3/2] bg-background-soft"
      />
      <figcaption className="mt-2 text-sm text-foreground-muted">
        <span className="font-medium text-foreground">{place.city}</span>
        {' · '}
        {place.years}
      </figcaption>
    </figure>
  )
}

export function Life() {
  const [current, ...earlier] = places
  return (
    <section className="mt-20">
      <h2 className="text-xl font-semibold text-foreground">Life</h2>
      <div className="mt-4 space-y-4 max-w-measure text-foreground-muted">
        <p>
          I grew up in Manresa, a small city near Barcelona. In August 2023 I
          moved to England to study software engineering in Cambridge.
        </p>
        <p>
          In 2026 I moved to London, where I now live and work.
        </p>
      </div>
      <div className="mt-8 space-y-6">
        <PlaceCard place={current} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {earlier.map((p) => (
            <PlaceCard key={p.city} place={p} />
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Verify build**

Run: `npm run build`
Expected: success (component is not mounted yet, this checks types and compile).

- [ ] **Step 5: Commit**

```bash
git add src/data/life.ts public/life src/components/site/Life.tsx
git commit -m "Add life section with placeholder photos"
```

---

### Task 4: Homepage rewrite

**Files:**
- Modify: `src/app/page.tsx` (full rewrite)

**Interfaces:**
- Consumes: `<Life />` from Task 3, `siteConfig`, `projects` from `@/data/projects` (fields: `title`, `slug`, `description`, `caseStudy.awards`).
- Produces: the `/` route. Old imports (Hero, Experience, TechStack, SelectedWork, Education, ContactNow, AmbientBackground, DynamicNavigation, Timeline, ThemeToggle old, CommandPalette) become unreferenced from this route, enabling Task 8 cleanup.

- [ ] **Step 1: Rewrite `src/app/page.tsx`**

```tsx
import Link from 'next/link'
import { Github, Linkedin, FileText, Mail } from 'lucide-react'
import { siteConfig } from '@/lib/constants'
import { projects } from '@/data/projects'
import { Life } from '@/components/site/Life'

const FEATURED = ['truevoice', 'offbabel', 'wildscan', 'darkfleet']

const SOCIAL = [
  { href: siteConfig.links.github, label: 'GitHub', Icon: Github },
  { href: siteConfig.links.linkedin, label: 'LinkedIn', Icon: Linkedin },
  { href: siteConfig.links.resume, label: 'CV', Icon: FileText },
  { href: `mailto:${siteConfig.links.email}`, label: 'Email', Icon: Mail },
]

const WORK = [
  {
    place: 'Eli by Techbible',
    role: 'Software engineer, infrastructure for AI agents',
    dates: '2026 to now',
  },
  {
    place: 'University of Cambridge',
    role: 'Digital technician',
    dates: '2025 to 2026',
  },
  {
    place: 'IBM MCP Context Forge',
    role: 'Open source contributor, 18 merged PRs',
    dates: '2026',
  },
  {
    place: 'Festival Sant Fruitós',
    role: 'Web developer',
    dates: '2026',
  },
]

export default function Page() {
  const featured = FEATURED.map((slug) =>
    projects.find((p) => p.slug === slug),
  ).filter((p): p is NonNullable<typeof p> => Boolean(p))

  return (
    <main className="max-w-2xl mx-auto px-6 pt-16 md:pt-24">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
        Hello!
      </h1>

      <div className="mt-6 space-y-4 max-w-measure text-foreground-muted text-lg">
        <p>
          I’m Oriol Morros, a software engineer in London. I build
          infrastructure for AI agents at Eli by Techbible.
        </p>
        <p>
          I studied software engineering at ARU in Cambridge and graduated
          with First Class Honours in 2026.
        </p>
      </div>

      <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
        {SOCIAL.map((l) => (
          <a
            key={l.label}
            href={l.href}
            target={l.href.startsWith('mailto:') ? undefined : '_blank'}
            rel={l.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
            className="inline-flex items-center gap-1.5 text-sm text-foreground-muted hover:text-foreground transition-colors"
          >
            <l.Icon size={14} aria-hidden="true" />
            <span>{l.label}</span>
          </a>
        ))}
      </div>

      <section className="mt-20">
        <h2 className="text-xl font-semibold text-foreground">Projects</h2>
        <p className="mt-4 max-w-measure text-foreground-muted">
          I build things at hackathons and on my own time. Some recent ones:
        </p>
        <ul className="mt-6 space-y-5">
          {featured.map((p) => {
            const award = p.caseStudy?.awards?.[0]
            return (
              <li key={p.slug}>
                <Link
                  href={`/projects/${p.slug}`}
                  className="font-medium text-foreground hover:text-accent transition-colors"
                >
                  {p.title}
                </Link>
                {award && (
                  <p className="text-sm text-accent mt-0.5">{award.title}</p>
                )}
                <p className="mt-1 text-sm text-foreground-muted max-w-measure">
                  {p.description}
                </p>
              </li>
            )
          })}
        </ul>
        <Link
          href="/projects"
          className="mt-6 inline-block text-sm text-accent hover:underline"
        >
          All projects
        </Link>
      </section>

      <section className="mt-20">
        <h2 className="text-xl font-semibold text-foreground">Work</h2>
        <ul className="mt-6 space-y-4">
          {WORK.map((w) => (
            <li key={w.place} className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-x-4">
              <div>
                <span className="font-medium text-foreground">{w.place}</span>
                <span className="text-foreground-muted"> · {w.role}</span>
              </div>
              <span className="text-sm text-foreground-faint shrink-0">
                {w.dates}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-foreground-muted max-w-measure">
          BSc Software Engineering, ARU Cambridge, First Class Honours, 2023
          to 2026. I mostly work with TypeScript, Next.js, and Python.
        </p>
      </section>

      <section className="mt-20">
        <h2 className="text-xl font-semibold text-foreground">Blog</h2>
        <p className="mt-4 max-w-measure text-foreground-muted">
          I’m starting to write about software, AI, and what I’m building.
        </p>
        <Link
          href="/blog"
          className="mt-4 inline-block text-sm text-accent hover:underline"
        >
          Read the blog
        </Link>
      </section>

      <Life />
    </main>
  )
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: success.

- [ ] **Step 3: Visual check**

Run: `npm run dev` in the background, open http://localhost:3000. Confirm: Hello heading, intro, social row, Projects with 4 items and award lines, Work list, Blog blurb, Life with 3 placeholder images. No leftover nav effects.

- [ ] **Step 4: Commit**

```bash
git add src/app/page.tsx
git commit -m "Rewrite homepage"
```

---

### Task 5: Projects index rewrite

**Files:**
- Create: `src/components/site/ProjectItem.tsx`
- Modify: `src/app/projects/page.tsx` (full rewrite)

**Interfaces:**
- Consumes: `projects`, `FEATURED_SLUGS`, type `Project` from `@/data/projects`.
- Produces: `ProjectItem({ project }: { project: Project })` list item component, reused nowhere else for now. `/projects` becomes a server component (no `useState`, no framer-motion).

- [ ] **Step 1: Create `src/components/site/ProjectItem.tsx`**

```tsx
import Link from 'next/link'
import type { Project } from '@/data/projects'

export function ProjectItem({ project }: { project: Project }) {
  const award = project.caseStudy?.awards?.[0]
  const meta = [project.year, ...project.tags].filter(Boolean).join(' · ')

  return (
    <li>
      {project.slug ? (
        <Link
          href={`/projects/${project.slug}`}
          className="font-medium text-foreground hover:text-accent transition-colors"
        >
          {project.title}
        </Link>
      ) : (
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-foreground hover:text-accent transition-colors"
        >
          {project.title}
        </a>
      )}
      {award && <p className="text-sm text-accent mt-0.5">{award.title}</p>}
      <p className="mt-1 text-sm text-foreground-muted max-w-measure">
        {project.description}
      </p>
      {meta && <p className="mt-1 text-xs text-foreground-faint">{meta}</p>}
    </li>
  )
}
```

- [ ] **Step 2: Rewrite `src/app/projects/page.tsx`**

Grouped, not filtered. Hackathons first (they carry the wins), then personal. Featured order inside each group.

```tsx
import type { Metadata } from 'next'
import { projects, FEATURED_SLUGS, type Project } from '@/data/projects'
import { ProjectItem } from '@/components/site/ProjectItem'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Personal projects and hackathon builds by Oriol Morros.',
}

const featuredRank = (p: Project): number => {
  const idx = (FEATURED_SLUGS as readonly string[]).indexOf(p.slug ?? '')
  return idx === -1 ? Number.POSITIVE_INFINITY : idx
}

const byFeatured = (a: Project, b: Project) => featuredRank(a) - featuredRank(b)

export default function ProjectsPage() {
  const hackathon = projects
    .filter((p) => p.category === 'hackathon')
    .sort(byFeatured)
  const personal = projects
    .filter((p) => p.category === 'personal')
    .sort(byFeatured)

  return (
    <main className="max-w-2xl mx-auto px-6 pt-16 md:pt-24">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
        Projects
      </h1>
      <p className="mt-6 max-w-measure text-foreground-muted text-lg">
        Things I have built at hackathons and on my own time.
      </p>

      <section className="mt-16">
        <h2 className="text-xl font-semibold text-foreground">Hackathons</h2>
        <ul className="mt-6 space-y-8">
          {hackathon.map((p) => (
            <ProjectItem key={p.slug ?? p.title} project={p} />
          ))}
        </ul>
      </section>

      <section className="mt-16">
        <h2 className="text-xl font-semibold text-foreground">Personal</h2>
        <ul className="mt-6 space-y-8">
          {personal.map((p) => (
            <ProjectItem key={p.slug ?? p.title} project={p} />
          ))}
        </ul>
      </section>
    </main>
  )
}
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: success. `/projects` is now static (no client bundle for it beyond the shared layout).

- [ ] **Step 4: Commit**

```bash
git add src/components/site/ProjectItem.tsx src/app/projects/page.tsx
git commit -m "Rewrite projects page"
```

---

### Task 6: Case study restyle

**Files:**
- Modify: `src/app/projects/[slug]/page.tsx` (full rewrite; this file has uncommitted user edits and rewriting it is intended)

**Interfaces:**
- Consumes: `projects` from `@/data/projects` including `caseStudy` fields (`challenge`, `approach`, `features`, `screenshots`, `photos`, `videoUrl`, `thumbnail`, `reportUrl`, `awards`, `tables`).
- Produces: `/projects/[slug]` route with identical content sections, minimal styling. Keeps `generateStaticParams` and `generateMetadata` exactly as they are today.

- [ ] **Step 1: Rewrite `src/app/projects/[slug]/page.tsx`**

Same content sections as today (header, awards, hero media, challenge, approach, features, gallery, photos, tables, prev/next), restyled: no mono uppercase labels, no pill buttons, no amber award cards. Full file:

```tsx
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { projects } from '@/data/projects'

interface PageProps {
  params: { slug: string }
}

export function generateStaticParams() {
  return projects.filter((p) => p.slug).map((p) => ({ slug: p.slug! }))
}

export function generateMetadata({ params }: PageProps): Metadata {
  const project = projects.find((p) => p.slug === params.slug)
  if (!project) return {}
  return {
    title: project.title,
    description: project.description,
  }
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xl font-semibold text-foreground mb-4">{children}</h2>
  )
}

export default function ProjectDetailPage({ params }: PageProps) {
  const project = projects.find((p) => p.slug === params.slug)
  if (!project) notFound()

  const cs = project.caseStudy
  const heroMedia = cs?.thumbnail || cs?.screenshots?.[0]
  const galleryScreens = cs?.screenshots?.filter((s) => s !== heroMedia) ?? []

  const slugged = projects.filter((p) => p.slug)
  const idx = slugged.findIndex((p) => p.slug === project.slug)
  const prev = idx > 0 ? slugged[idx - 1] : null
  const next = idx >= 0 && idx < slugged.length - 1 ? slugged[idx + 1] : null

  const metaLine = [
    project.category === 'hackathon' ? 'Hackathon' : 'Personal project',
    project.year,
    project.event,
  ]
    .filter(Boolean)
    .join(' · ')

  return (
    <main className="max-w-2xl mx-auto px-6 pt-16 md:pt-24">
      <header>
        <p className="text-sm text-foreground-faint">{metaLine}</p>
        <h1 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-foreground">
          {project.title}
        </h1>
        <p className="mt-4 max-w-measure text-foreground-muted text-lg">
          {project.description}
        </p>

        {cs?.awards && cs.awards.length > 0 && (
          <ul className="mt-4 space-y-1">
            {cs.awards.map((a) => (
              <li key={a.title} className="text-sm text-accent">
                {a.title}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm">
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              View code on GitHub
            </a>
          )}
          {cs?.reportUrl && (
            <a
              href={cs.reportUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              Read the report
            </a>
          )}
        </div>

        <p className="mt-4 text-xs text-foreground-faint">
          {project.tags.join(' · ')}
        </p>
      </header>

      {(heroMedia || cs?.videoUrl) && (
        <div className="mt-10 rounded-lg overflow-hidden border border-border-soft bg-background-soft">
          {cs?.videoUrl ? (
            <video
              src={cs.videoUrl}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-auto block"
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={heroMedia!} alt={project.title} className="w-full h-auto block" />
          )}
        </div>
      )}

      {cs?.challenge && (
        <section className="mt-14">
          <SectionHeading>Challenge</SectionHeading>
          <p className="max-w-measure text-foreground-muted">{cs.challenge}</p>
        </section>
      )}

      {cs?.approach && (
        <section className="mt-14">
          <SectionHeading>Approach</SectionHeading>
          <p className="max-w-measure text-foreground-muted">{cs.approach}</p>
        </section>
      )}

      {cs?.features && cs.features.length > 0 && (
        <section className="mt-14">
          <SectionHeading>What it does</SectionHeading>
          <ul className="space-y-4">
            {cs.features.map((f) => (
              <li key={f.title} className="max-w-measure">
                <span className="font-medium text-foreground">{f.title}.</span>{' '}
                <span className="text-foreground-muted">{f.description}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {galleryScreens.length > 0 && (
        <section className="mt-14">
          <SectionHeading>Gallery</SectionHeading>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {galleryScreens.map((src) => (
              <div
                key={src}
                className="rounded-lg overflow-hidden border border-border-soft bg-background-soft"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="" className="w-full h-auto block" />
              </div>
            ))}
          </div>
        </section>
      )}

      {cs?.photos && cs.photos.length > 0 && (
        <section className="mt-14">
          <SectionHeading>Photos</SectionHeading>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {cs.photos.map((photo) => (
              <figure key={photo.src}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photo.src}
                  alt={photo.caption ?? ''}
                  className="w-full h-auto block rounded-lg border border-border-soft"
                />
                {photo.caption && (
                  <figcaption className="mt-2 text-sm text-foreground-muted">
                    {photo.caption}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        </section>
      )}

      {cs?.tables?.map((t) => (
        <section key={t.title} className="mt-14">
          <SectionHeading>{t.title}</SectionHeading>
          <div className="overflow-x-auto rounded-lg border border-border-soft">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border-soft bg-background-soft">
                  {t.headers.map((h) => (
                    <th
                      key={h}
                      className="text-left px-4 py-3 font-medium text-foreground"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {t.rows.map((row, i) => (
                  <tr key={i} className="border-b border-border-soft last:border-0">
                    {row.map((cell, j) => (
                      <td key={j} className="px-4 py-3 text-foreground-muted">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ))}

      <nav
        className="mt-16 pt-8 border-t border-border-soft flex justify-between gap-4 text-sm"
        aria-label="Project navigation"
      >
        {prev ? (
          <Link
            href={`/projects/${prev.slug}`}
            className="text-accent hover:underline"
          >
            ← {prev.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/projects/${next.slug}`}
            className="text-accent hover:underline text-right"
          >
            {next.title} →
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </main>
  )
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: success, all project slugs prerendered.

- [ ] **Step 3: Commit**

```bash
git add "src/app/projects/[slug]/page.tsx"
git commit -m "Restyle project case studies"
```

---

### Task 7: Blog page, not-found, sitemap

**Files:**
- Create: `src/app/blog/page.tsx`
- Modify: `src/app/not-found.tsx` (full rewrite, it may reference old components)
- Modify: `src/app/sitemap.ts` (add /blog entry, follow the file's existing pattern)

**Interfaces:**
- Consumes: Tailwind tokens.
- Produces: `/blog` route (linked from Nav and homepage). Simple empty state, ready to become an MDX list later.

- [ ] **Step 1: Create `src/app/blog/page.tsx`**

```tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Writing by Oriol Morros on software and AI.',
}

export default function BlogPage() {
  return (
    <main className="max-w-2xl mx-auto px-6 pt-16 md:pt-24">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
        Blog
      </h1>
      <p className="mt-6 max-w-measure text-foreground-muted text-lg">
        I’m starting to write about software, AI, and what I’m building.
        Nothing published yet. Check back soon.
      </p>
    </main>
  )
}
```

- [ ] **Step 2: Rewrite `src/app/not-found.tsx`**

```tsx
import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="max-w-2xl mx-auto px-6 pt-16 md:pt-24">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
        Page not found
      </h1>
      <p className="mt-6 max-w-measure text-foreground-muted text-lg">
        This page does not exist.
      </p>
      <Link href="/" className="mt-6 inline-block text-sm text-accent hover:underline">
        Back home
      </Link>
    </main>
  )
}
```

- [ ] **Step 3: Rewrite `src/app/sitemap.ts` to list all routes**

The current file only lists the homepage. Replace it with:

```ts
import { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/constants'
import { projects } from '@/data/projects'

export default function sitemap(): MetadataRoute.Sitemap {
  const projectPages = projects
    .filter((p) => p.slug)
    .map((p) => ({
      url: `${siteConfig.url}/projects/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))

  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${siteConfig.url}/projects`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/blog`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    ...projectPages,
  ]
}
```

- [ ] **Step 4: Verify build**

Run: `npm run build`
Expected: success, `/blog` in the route list.

- [ ] **Step 5: Commit**

```bash
git add src/app/blog/page.tsx src/app/not-found.tsx src/app/sitemap.ts
git commit -m "Add blog page and simplify not found"
```

---

### Task 8: Delete old components and dependencies

**Files:**
- Delete: `src/components/nav/` (StellarBuddy.tsx, Timeline.tsx, DynamicNavigation.tsx)
- Delete: `src/components/page/` (SectionHeader.tsx, SelectedWork.tsx, TechStack.tsx, ContactNow.tsx, Hero.tsx, Education.tsx, Experience.tsx)
- Delete: `src/components/ui/` (AmbientBackground.tsx, AvailablePill.tsx, Button.tsx, CommandPalette.tsx, LinkPreview.tsx, NativeMagnetic.tsx, NumberTicker.tsx, PageVisitsBadge.tsx, ProjectCard.tsx, RevealOnScroll.tsx, ScrollFillText.tsx, SkillIcon.tsx, SkillsMarquee.tsx, SmoothScrollProvider.tsx, SocialDock.tsx, ThemeToggle.tsx, Typewriter.tsx, VerifiedBadge.tsx, WorkTimeline.tsx)
- Delete: `src/hooks/useIsMobile.ts`, `src/data/skills.ts`
- Modify: `package.json` (remove framer-motion, lenis, geist)

**Interfaces:**
- Consumes: nothing. Requires Tasks 4 to 7 done so no route imports these files.
- Produces: a clean tree. `src/lib/utils.ts` (cn) stays even if unused for now.

- [ ] **Step 1: Verify nothing still references the old components**

Run:

```bash
grep -rn "components/nav\|components/page\|components/ui\|useIsMobile\|data/skills\|framer-motion\|lenis\|geist" src --include="*.tsx" --include="*.ts" | grep -v "components/site"
```

Expected: no hits outside the files being deleted. If a hit appears in a kept file (for example `opengraph-image.tsx`), fix that file first: replace the usage with plain code in the spirit of Tasks 4 to 7, then re-run the grep.

- [ ] **Step 2: Delete the files**

```bash
git rm -r src/components/nav src/components/page
git rm src/components/ui/AmbientBackground.tsx src/components/ui/AvailablePill.tsx src/components/ui/Button.tsx src/components/ui/CommandPalette.tsx src/components/ui/LinkPreview.tsx src/components/ui/NativeMagnetic.tsx src/components/ui/NumberTicker.tsx src/components/ui/PageVisitsBadge.tsx src/components/ui/ProjectCard.tsx src/components/ui/RevealOnScroll.tsx src/components/ui/ScrollFillText.tsx src/components/ui/SkillIcon.tsx src/components/ui/SkillsMarquee.tsx src/components/ui/SmoothScrollProvider.tsx src/components/ui/SocialDock.tsx src/components/ui/ThemeToggle.tsx src/components/ui/Typewriter.tsx src/components/ui/VerifiedBadge.tsx src/components/ui/WorkTimeline.tsx
git rm src/hooks/useIsMobile.ts src/data/skills.ts
```

If `src/components/ui/` is empty afterwards, remove the directory too.

- [ ] **Step 3: Remove unused dependencies**

In `package.json` remove these three lines from dependencies:

```json
    "framer-motion": "^11.0.0",
    "geist": "^1.7.0",
    "lenis": "^1.3.23",
```

Then run: `npm install`
Expected: lockfile updates, no errors. Keep `clsx`, `tailwind-merge` (lib/utils uses them), `lucide-react` (icons), analytics packages.

- [ ] **Step 4: Verify build and lint**

Run: `npm run build && npm run lint`
Expected: both pass with zero references to deleted modules.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "Remove old components and unused dependencies"
```

---

### Task 9: Full verification and copy pass

**Files:**
- Possibly modify: any copy string written in Tasks 4 to 7.

**Interfaces:**
- Consumes: everything above.
- Produces: a verified redesign ready for user review on the dev server.

- [ ] **Step 1: Verify every route renders the expected content**

Start the production server:

```bash
npm run build && npm run start
```

Then check (PowerShell):

```powershell
(Invoke-WebRequest http://localhost:3000).Content -match 'Hello!'
(Invoke-WebRequest http://localhost:3000).Content -match 'Manresa'
(Invoke-WebRequest http://localhost:3000/projects).Content -match 'Hackathons'
(Invoke-WebRequest http://localhost:3000/projects/truevoice).Content -match 'TrueVoice'
(Invoke-WebRequest http://localhost:3000/blog).Content -match 'Blog'
```

Expected: all True. Stop the server after.

- [ ] **Step 2: Copy scan**

Search all new/modified files for banned patterns:

```bash
grep -rn "—" src/app src/components/site src/data/life.ts
```

Expected: no hits (the middot separator `·` is allowed, the em dash `—` is not). Also reread every user-facing sentence once: short, plain, no buzzwords.

- [ ] **Step 3: Visual pass against samselikoff.com**

Run `npm run dev`, compare side by side with https://samselikoff.com: heading sizes, spacing rhythm, link styling, Life section layout. Adjust Tailwind classes where clearly off. This is a judgment step; keep diffs small.

- [ ] **Step 4: Commit any fixes**

```bash
git add -A
git commit -m "Polish copy and spacing"
```

- [ ] **Step 5: Hand to user**

Leave the dev server running and tell the user the redesign is ready to review at http://localhost:3000. Remind them: photos are placeholders, they merge to main when happy.
