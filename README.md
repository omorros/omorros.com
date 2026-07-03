# omorros.com

Personal website of Oriol Morros. Minimal multi-page design modeled on samselikoff.com.

**Live site:** [omorros.com](https://omorros.com)

## Stack

Next.js 14 (App Router), TypeScript, Tailwind CSS, Inter via next/font. Deployed on Vercel.

## Structure

```
src/
├── app/
│   ├── page.tsx                  # Homepage: hello, sections, life
│   ├── projects/page.tsx         # Personal projects
│   ├── projects/[slug]/page.tsx  # Case study pages (all projects)
│   ├── hackathons/page.tsx       # Hackathon projects
│   ├── layout.tsx                # Metadata, fonts, header mount
│   └── globals.css               # Tailwind directives, base styles
├── components/site/
│   ├── Nav.tsx                   # Header with logotype and nav links
│   ├── ui.tsx                    # Container, Title, Lead, Spacer, A
│   └── logos.tsx                 # Solid social icons
├── data/
│   └── projects.ts               # All project and case study content
└── lib/
    └── constants.ts              # Site config: name, links, description
```

## Images

Everything lives under `public/images/`, one folder per purpose:

```
public/
├── images/
│   ├── oriol.jpeg                # Homepage photo
│   ├── card-placeholder.svg      # Fallback card image
│   ├── life/                     # Life section photos (London, Cambridge, Manresa)
│   ├── offbabel/                 # OffBabel case study media (photos, demo video)
│   ├── bk-shoot/                 # BK-Shoot media
│   └── university-library/       # University Library media
└── reports/                      # PDF reports linked from case studies
```

Convention: each project's media goes in `public/images/<project-slug>/`. Project data in `src/data/projects.ts` points at these paths. `cardImage` is the personal photo shown on the projects and hackathons cards, `thumbnail` is the app screenshot used as the case study hero, `photos` are event photos with captions, `videoUrl` is a demo clip.

## Development

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
npm run lint
```

## Design reference

Typography, spacing, and layout follow samselikoff.com. The type scale and letter-spacing formula live in `tailwind.config.ts`. Page primitives (Container, Title, Lead, Spacer, A) live in `src/components/site/ui.tsx`.
