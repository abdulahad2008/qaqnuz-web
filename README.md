# Qaqnuz Marketing Website

Marketing site for [Qaqnuz](https://qaqnuz.uz) — AI-native Instagram automation platform for Uzbekistan's top brands.

Built with Next.js 16 (App Router), React 19, Tailwind CSS v4, Framer Motion, and next-intl.

---

## Setup

### Requirements
- Node.js 22+
- pnpm 11+

### Install and run

```bash
cd qaqnuz-web
pnpm install
cp .env.example .env.local
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) — it redirects to `/uz` (default locale).

### Build

```bash
pnpm build
pnpm start
```

---

## Project Structure

```
qaqnuz-web/
├── app/
│   ├── [locale]/           # Locale-based routing (uz, ru, en)
│   │   ├── page.tsx        # Home — all sections
│   │   ├── product/        # AI pipeline deep dive
│   │   ├── pricing/        # Tier comparison table
│   │   ├── case-studies/   # Index + 2 detail pages
│   │   ├── security/       # Compliance, PII, opt-out, audit
│   │   ├── docs/           # Stub → docs.qaqnuz.uz
│   │   ├── book-demo/      # Demo request form
│   │   └── layout.tsx      # Locale layout with Nav
│   ├── globals.css         # Tailwind v4 design tokens
│   └── layout.tsx          # Root layout (Inter + Instrument Serif)
├── components/
│   ├── sections/           # Nav, Hero, LogoStrip, TrustRamp, Guardrails,
│   │                       # MultiBrand, Results, BuiltForUzbekistan,
│   │                       # PricingTeaser, FAQ, FinalCTA, Footer
│   ├── pipeline/           # Animated 8-stage pipeline flow
│   ├── dashboard-preview/  # Mission Control 6-panel tab switcher
│   ├── motion/             # FadeIn, FadeInStagger, FadeInChild wrappers
│   └── ui/                 # Button, Card, Badge, Accordion, Tabs, Dialog, Section
├── lib/
│   ├── utils.ts            # cn() helper
│   ├── routing.ts          # next-intl locale config
│   ├── request.ts          # next-intl server config
│   └── i18n.ts             # Locale types
├── messages/
│   ├── en.json             # Full English copy
│   ├── uz.json             # Uzbek — partial (TODO: complete)
│   └── ru.json             # Russian — partial (TODO: complete)
├── public/
│   ├── motion/             # motionsites.ai generated assets (empty — see below)
│   ├── video/              # Higgsfield generated video clips (empty — see below)
│   └── brand/              # Favicons, logo SVGs
├── proxy.ts                # next-intl routing proxy (Next.js 16)
└── .env.example            # Environment variable template
```

---

## Design Tokens

All tokens are defined in `app/globals.css` under `@theme`:

| Token | Value | Usage |
|-------|-------|-------|
| `--color-bg-base` | `#0e0e0f` | Page background |
| `--color-ember-*` | `#f07d00` range | Primary/CTA accent (phoenix flame) |
| `--color-trust-*` | `#0d9e89` range | Safety/trust sections |
| `--color-neutral-*` | `#fafafa`–`#18181b` | Text & surfaces |
| `--font-display` | Instrument Serif | Hero headings |
| `--font-sans` | Inter | Body |

---

## i18n

- Default locale: `uz` (redirected to from `/`)
- Supported: `uz`, `ru`, `en`
- Routing: `next-intl` with `defineRouting` in `lib/routing.ts`
- Message files: `messages/{locale}.json`

**TODO:** Complete `uz.json` and `ru.json` — all keys are defined in `en.json`. 
The component-level copy is currently hardcoded in English; wire to `useTranslations()` after translating.

---

## Motion Assets — Generation Instructions

### Hero background animation

**Tool:** motionsites.ai

**Prompt to use:**
```
Generate a looping hero animation for a dark SaaS marketing site.
Background: #0e0e0f (deep charcoal). Slowly drifting ember/amber particles
(color: rgba(240, 125, 0, 0.7)) rising upward. Occasional subtle wing-shaped
light streaks suggesting phoenix feathers — not literal, abstract.
No text. 16:9 aspect ratio. 30fps. Seamless 6-second loop.
Output: WebM + MP4 fallback.
```

**Placement:** Save as `public/motion/hero-loop.webm` and `public/motion/hero-loop.mp4`.

**Integration:** Replace `<HeroBg>` in `components/sections/hero.tsx` with:
```tsx
<video
  autoPlay muted loop playsInline
  className="absolute inset-0 w-full h-full object-cover opacity-60 pointer-events-none"
  poster="/motion/hero-poster.jpg"
>
  <source src="/motion/hero-loop.webm" type="video/webm" />
  <source src="/motion/hero-loop.mp4" type="video/mp4" />
</video>
```

---

### Pipeline flow visualization

**Tool:** motionsites.ai

**Prompt to use:**
```
Generate a horizontal animated data flow visualization for a SaaS pipeline.
Show 8 connected nodes with pulsing connections between them.
Color scheme: leftmost nodes neutral gray → center nodes ember/amber →
rightmost nodes teal/trust. Background transparent. 16:9, 30fps, loop.
Nodes should pulse in sequence left to right, suggesting data flow.
```

**Placement:** `public/motion/pipeline-flow.webm` + `.mp4`

---

### Phoenix brand intro (Higgsfield)

**Tool:** Higgsfield

**Prompt to use:**
```
6-second cinematic loop. Abstract phoenix-themed visual:
a bird of flame rising from ember particles against a near-black background.
Not literal — impressionistic, premium, modern. Color palette:
deep charcoal (#0e0e0f), ember amber (#f07d00), warm orange highlights.
Shot style: extreme close-up of wing texture made of flame. 16:9, 24fps.
No text, no UI, no faces.
```

**Placement:** `public/video/brand-intro.webm` + `.mp4`

---

### Dashboard cinematic (Higgsfield)

**Tool:** Higgsfield

**Prompt to use:**
```
6-second cinematic B-roll: operator at a dual-monitor workstation in
a modern office, dark mode dashboard visible on screens, amber accent colors.
Shallow depth of field, bokeh background. Shot from slightly above and to the
side. Mood: focused, professional, in control. No faces visible (back/side only).
```

**Placement:** `public/video/dashboard-mood.webm` + `.mp4`

---

## Deployment — Vercel

1. Connect the `qaqnuz-web` directory to a Vercel project.
2. Set environment variables from `.env.example`.
3. Set custom domain: `qaqnuz.uz` with Vercel DNS.
4. The build command is `pnpm build`; output directory is `.next`.

```bash
# Manual deploy via Vercel CLI
npx vercel --prod
```

**Domain configuration:**
- `qaqnuz.uz` → production
- `www.qaqnuz.uz` → redirect to apex
- Locale subpaths auto-handled by next-intl: `/uz/`, `/ru/`, `/en/`

---

## TODO Before Launch

- [ ] Replace placeholder brand logos in `LogoStrip` with real SVGs
- [ ] Complete `uz.json` and `ru.json` translations
- [ ] Generate and place hero animation (`public/motion/hero-loop.*`)
- [ ] Generate and place phoenix brand video (`public/video/brand-intro.*`)
- [ ] Generate and place dashboard mood shot (`public/video/dashboard-mood.*`)
- [ ] Wire demo form in `/book-demo` to Cal.com or Calendly
- [ ] Replace case study placeholder content with real brand stories
- [ ] Add favicon and OG image to `public/brand/`
- [ ] Wire language switcher in Footer and Nav to actual locale routing
- [ ] Set up PostHog or similar analytics
- [ ] Run Lighthouse audit, fix until ≥95 on `/`
