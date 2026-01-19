# Portfolio Website

A minimalist, high-performance personal portfolio website built with modern web technologies. The site features a unique full-page scroll navigation system with smooth transitions, dynamic gradient backgrounds, and an interactive cursor glow effect.

**Live Site:** [omorros.com](https://omorros.com)

---

## Table of Contents

1. [Overview](#overview)
2. [Technology Stack](#technology-stack)
3. [Architecture](#architecture)
4. [Features](#features)
5. [Project Structure](#project-structure)
6. [Design Decisions](#design-decisions)
7. [Performance Optimizations](#performance-optimizations)
8. [Development](#development)
9. [Deployment](#deployment)
10. [License](#license)

---

## Overview

This portfolio was developed as a single-page application with a distinctive navigation paradigm. Rather than traditional scrolling or route-based navigation, the site implements a full-page section system where users navigate between discrete content sections using scroll gestures, touch swipes, or keyboard controls.

The design takes inspiration from modern portfolio sites while maintaining a focus on performance, accessibility, and visual polish.

---

## Technology Stack

| Category | Technology | Purpose |
|----------|------------|---------|
| Framework | Next.js 14 | React framework with App Router |
| Language | TypeScript | Type safety and developer experience |
| Styling | Tailwind CSS | Utility-first CSS framework |
| Animation | Framer Motion | Declarative animations and transitions |
| Icons | Lucide React | Lightweight icon library |
| Font | Inter | Variable font via Google Fonts |
| Analytics | Vercel Analytics | Privacy-friendly analytics |
| Hosting | Vercel | Edge deployment platform |

---

## Architecture

### Navigation System

The core of the application is built around a custom `PageWrapper` component that manages:

```
User Input (scroll/touch/keyboard)
         |
         v
    Event Handler
         |
         v
   Debounce Check (600ms)
         |
         v
   Page State Update
         |
         v
  Framer Motion Transition
         |
         v
   Gradient Crossfade + Content Animation
```

### State Management

The application uses React's built-in state management with `useState` and `useCallback` hooks. No external state management library is required due to the application's focused scope.

Key state variables:
- `currentPage`: Active section index
- `direction`: Navigation direction for animation variants
- `isAnimating`: Lock to prevent rapid navigation
- `mousePos`: Cursor position for glow effect
- `gradientOffset`: Parallax offset for background

### Component Hierarchy

```
RootLayout
└── PageWrapper
    ├── Cursor Glow Layer
    ├── Gradient Background Layer (per page)
    ├── Navigation Header
    │   ├── ProgressDots
    │   └── Navigation Buttons
    └── Page Content
        ├── HomePage
        ├── AboutPage
        ├── ExperiencePage
        ├── SkillsPage
        ├── ProjectsPage
        └── ContactPage
```

---

## Features

### Full-Page Navigation

Users can navigate between sections using multiple input methods:

| Input Method | Action |
|--------------|--------|
| Mouse Wheel | Scroll up/down to change pages |
| Touch Swipe | Swipe up/down on mobile devices |
| Keyboard | Arrow Up/Down, Page Up/Down |
| Click | Navigation buttons in header |

### Dynamic Gradient Backgrounds

Each section features a unique gradient background that:
- Rotates continuously (25-second cycle)
- Responds to mouse movement (parallax effect)
- Crossfades smoothly when changing pages

Gradient color scheme by section:

| Section | Primary Color | Hex Value |
|---------|---------------|-----------|
| Home | Green/Purple | #27c029 / #8f46db |
| About | Magenta | #9e005d |
| Education | Orange | #ff6b35 |
| Skills | Burgundy | #83394c |
| Projects | Deep Blue | #001b70 |
| Contact | Magenta | #9e005d |

### Interactive Cursor Glow

A 500px radial gradient follows the cursor, with:
- Color matching the current section's theme
- 30% opacity with 80px blur
- Smooth color transitions between pages

### Responsive Design

The layout adapts to all screen sizes:

| Breakpoint | Behavior |
|------------|----------|
| Mobile (<768px) | Touch navigation, adjusted spacing |
| Tablet (768-1024px) | Hybrid input support |
| Desktop (>1024px) | Full experience with cursor glow |

---

## Project Structure

```
src/
├── app/
│   ├── globals.css         # Global styles, Tailwind directives
│   ├── layout.tsx          # Root layout, metadata, fonts
│   └── page.tsx            # Main page, section definitions
├── components/
│   ├── PageWrapper.tsx     # Core navigation component
│   ├── ProgressDots.tsx    # Page indicator dots
│   ├── ui/
│   │   └── Button.tsx      # Reusable button component
│   └── pages/
│       ├── HomePage.tsx    # Landing section
│       ├── AboutPage.tsx   # Bio section
│       ├── ExperiencePage.tsx  # Education section
│       ├── SkillsPage.tsx  # Skills grid
│       ├── ProjectsPage.tsx    # Project cards
│       └── ContactPage.tsx # Contact information
├── data/
│   ├── projects.ts         # Project data array
│   └── skills.ts           # Skills list
└── lib/
    └── constants.ts        # Site configuration

public/
├── gradients/              # SVG gradient backgrounds
│   ├── index.svg
│   ├── about.svg
│   ├── experience.svg
│   ├── skills.svg
│   ├── projects.svg
│   └── contact.svg
└── favicon.svg             # Site favicon
```

---

## Design Decisions

### Why Full-Page Scroll Navigation

Traditional scrolling portfolios can feel monotonous. The full-page approach:
- Creates distinct "moments" for each content section
- Allows for dramatic visual transitions
- Provides clear visual hierarchy
- Works naturally on both desktop and mobile

### Why No Client-Side Routing

The single-page architecture was chosen because:
- All content fits naturally in one viewport per section
- Eliminates route transition overhead
- Simplifies state management
- Reduces bundle size

### Animation Timing

All transitions use linear easing for a modern, responsive feel:

| Animation | Duration | Easing |
|-----------|----------|--------|
| Page transition | 250ms | Linear |
| Gradient crossfade | 300ms | Linear |
| Content fade-in | 200ms | Linear |
| Header animation | 150ms | Linear |

### Color Palette

The dark theme was chosen for:
- Reduced eye strain
- Better gradient visibility
- Modern aesthetic
- Contrast with content

```
Background:     #000000
Text Primary:   rgba(242, 242, 242, 0.9)
Text Secondary: rgba(242, 242, 242, 0.6)
Accent:         #90caf9
Borders:        rgba(255, 255, 255, 0.06)
```

---

## Performance Optimizations

### Image Optimization

- SVG gradients instead of raster images
- Next.js Image component with priority loading for first two gradients
- Gradients preloaded to prevent flash on page change

### Animation Performance

- CSS transforms for gradient rotation (GPU accelerated)
- Framer Motion's optimized animation engine
- Debounced scroll handling (600ms) to prevent excessive re-renders

### Bundle Size

- Tree-shaking enabled via Next.js
- Only required Lucide icons imported
- No unnecessary dependencies

### Lighthouse Metrics

Target scores:
- Performance: 95+
- Accessibility: 100
- Best Practices: 100
- SEO: 100

---

## Development

### Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher

### Installation

```bash
git clone https://github.com/omorros/omorros.tech.git
cd omorros.tech
npm install
```

### Development Server

```bash
npm run dev
```

The site will be available at `http://localhost:3000`.

### Build

```bash
npm run build
```

### Lint

```bash
npm run lint
```

---

## Deployment

The site is deployed on Vercel with the following configuration:

- **Framework Preset:** Next.js
- **Build Command:** `npm run build`
- **Output Directory:** `.next`
- **Node.js Version:** 18.x

### Environment Variables

No environment variables are required for basic deployment.

### Domain Configuration

DNS records configured via domain registrar pointing to Vercel's nameservers.

---

## License

This project is open source and available under the MIT License.

---

## Author

**Oriol Morros Vilaseca**

- GitHub: [github.com/omorros](https://github.com/omorros)
- LinkedIn: [linkedin.com/in/oriolmorros](https://linkedin.com/in/oriolmorros)
- Email: oriolmorros25@gmail.com

