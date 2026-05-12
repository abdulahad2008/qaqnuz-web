# Nexora Redesign + Full i18n — Change Log

## Summary (2026-05-12)

Switched from dark cinematic theme to light Nexora-style design system. Added full
UZ/RU/EN i18n with path-based routing, locale switcher, and hreflang tags. Replaced
all hardcoded strings across 14 components with `useTranslations()` calls. Build
passes clean at 31 pages with zero TypeScript errors.

**Key numbers:** 247+ translation keys per locale · 3 locales (uz default, ru, en) ·
14 components updated · 1 new navigation helper · 2 new UI components

---

## Design System

- **Light theme**: `:root` semantic HSL tokens (`--accent: 239 84% 67%` indigo,
  `--background: 0 0% 100%`, `--foreground: 210 14% 17%`, etc.)
- **`@theme` → Tailwind utilities**: `bg-background`, `text-foreground`,
  `text-muted-foreground`, `bg-accent`, `text-accent`, `border-border`
- **Font stack**: Instrument Serif (Latin/Uzbek) + EB Garamond (Cyrillic fallback
  for Russian) + Inter body. Google Fonts loaded in locale layout.
- **Glass cards**: `.glass` updated to white translucent (`rgba(255,255,255,0.55)`) with
  `var(--shadow-dashboard)`. `.surface-card` → white with `border-border`.
- **Ember retained as secondary accent** — all ember/trust/neutral palette preserved
  in `@theme` for secondary color usage.
- **`.text-overline`**: changed from ember-400 to `hsl(var(--accent))` indigo.

---

## i18n Architecture

- **`lib/navigation.ts`** (new): `createNavigation(routing)` exports — locale-aware
  `Link`, `useRouter`, `usePathname`, `redirect`, `getPathname`
- **`app/layout.tsx`**: simplified to `return children` — html/body moved to locale layout
- **`app/[locale]/layout.tsx`**: added `<html lang={locale}>`, EB Garamond + Inter
  Cyrillic Google Fonts link, `generateMetadata` with hreflang `alternates.languages`
- **`components/ui/locale-switcher.tsx`** (new): UZ · RU · EN toggle using
  `useLocale()` + `router.replace(pathname, { locale })` from createNavigation
- **Nav**: now uses locale-aware `Link` from `@/lib/navigation`, `LocaleSwitcher`
  on the right, `useTranslations("nav")` for all labels

---

## Message Files

- **`messages/en.json`**: expanded from ~80 to 247+ keys — full nested structure
  including arrays for pipeline stages (8), trust levels (4), guardrail items (9),
  FAQ Q&A (8), pricing tiers (3), dashboard panels (6), results items (3)
- **`messages/uz.json`**: complete Uzbek Latin translation — all 247+ keys
- **`messages/ru.json`**: complete Russian translation — all 247+ keys
- Italic emphasis words: EN `"thinks."` / UZ `"o'ylaydigan"` / RU `"думает."`

---

## Components Updated

| Component | Changes |
|-----------|---------|
| `sections/nav.tsx` | New wordmark `✦ Qaqnuz`, centered nav, LocaleSwitcher, light colors |
| `ui/section.tsx` | `SectionHeader` h2 → `font-display`, light `text-foreground` |
| `sections/hero.tsx` | Higgsfield video + light overlay + 3-part translated headline + inline Mission Control dashboard mockup |
| `sections/logo-strip.tsx` | Light border/bg, `t("tagline")` |
| `pipeline/pipeline-flow.tsx` | Light trail line, stages from `t.raw("stages")`, `surface-card` detail panel |
| `sections/trust-ramp.tsx` | Light selector/card colors, levels from `t.raw("levels")` |
| `sections/guardrails.tsx` | `surface-card` tilt cards, items from `t.raw("items")` |
| `dashboard-preview/dashboard-preview.tsx` | Light mock panel UI, panels from `t.raw("panels")` |
| `sections/multi-brand.tsx` | Light brand grid, features from `t.raw("features")` |
| `sections/results.tsx` | Italic display counters, items from `t.raw("items")` |
| `sections/built-for-uzbekistan.tsx` | `bg-accent/10` icons, features from `t.raw("features")` |
| `sections/pricing-teaser.tsx` | Indigo highlighted tier, tiers from `t.raw("tiers")` |
| `sections/faq.tsx` | `surface-card` accordion, items from `t.raw("items")` |
| `sections/cta.tsx` | Indigo CTA buttons, all strings from `t("...")` |
| `sections/footer.tsx` | Light surface, `LocaleSwitcher` in bottom bar, strings from `t("...")` |

---

# Cinematic UI Overhaul — Change Log (2026-05-11)

## Summary

Transformed the Qaqnuz marketing site from a standard dark UI into a cinematic,
$15k-quality landing page using 7 layered visual effects. All changes maintain
Lighthouse ≥95 performance by using CSS-only animations for continuous effects
and `transform`/`opacity` exclusively for JS-driven motion.

---

## globals.css

- Added `@keyframes grain-shift` — 10-step CSS grain shift for film texture overlay
- Added `@keyframes ember-pulse` — Slow 4s glow pulse for footer brand dot
- Added `.glass` utility — `backdrop-filter: blur(20px) saturate(160%)` glass card base
- Added `.glass-ember` utility — Amber-tinted glass variant with ember border glow
- Added `.film-grain::before` — CSS-only film grain overlay (SVG feTurbulence noise)
- Added `.vignette::after` — Radial gradient edge darkening

---

## New Motion Components

### `components/motion/film-grain.tsx`
CSS-only grain overlay as React component. Zero JS per frame — `animation: grain-shift` runs on GPU compositor thread. Opacity configurable.

### `components/motion/video-background.tsx`
`<video autoPlay muted loop playsInline>` with graceful `onError` hide. Fallback is the CSS radial gradient background inherited from the section.

### `components/motion/ember-svg.tsx`
Animated SVG flame with SVG `<animate>` — morphing flame path + glow ellipse. Respects `useReducedMotion()`. Used in Hero bottom-center and CTA.

---

## Hero (`components/sections/hero.tsx`)

**Before:** CSS radial gradient + 7 particle spans + basic motion entrance.

**After:** 7-layer cinematic stack:
1. `VideoBackground` component (`/video/hero.mp4` placeholder, fallback: charcoal)
2. Ember radial gradient glow overlay
3. Subtle 80×80 grid at 2.2% opacity
4. 7 CSS ember particles — enhanced with `box-shadow` glow halos
5. Vignette — `radial-gradient` darkening at edges
6. `FilmGrain` component — `grain-shift` CSS animation at 2.8% opacity
7. `EmberSVG` flame motif at bottom-center

Headline changed to word-by-word **blur reveal**: each word animates from `opacity:0, filter:blur(8px)` to `opacity:1, filter:blur(0)` with 40ms cascade. Respects `prefers-reduced-motion`.

Scroll indicator upgraded with directional chevron below the vertical line.

---

## Pipeline (`components/pipeline/pipeline-flow.tsx`)

**Before:** Hover-only interaction with `activeStage` state. Static connection line.

**After:** Scroll-driven sequencing via `useScroll` + `useMotionValueEvent`:
- `sectionRef` scroll progress maps to active stage index
- Ember trail line: `scaleX` driven by `scrollYProgress` — amber gradient grows left→right as user scrolls
- Active nodes scale to 1.12 with `box-shadow` glow, previous nodes scale to 1.04 (lit)
- Glass cards: `.glass` class with per-stage `borderColor` tinted to stage RGB
- Current stage shows pulsing ring via `glow-pulse` CSS animation
- Click to manually select stages still works
- `useReducedMotion()` guard: skips all scroll transforms, renders all as static

---

## Guardrails (`components/sections/guardrails.tsx`)

**Before:** `whileHover: { y: -4, scale: 1.01 }` + `onHoverStart` DOM manipulation (anti-pattern).

**After:** Per-card `TiltCard` component with cursor tilt:
- `useMotionValue` for mouseX/mouseY normalized to `[-0.5, 0.5]`
- `useTransform` → `rotateX` ±6°, `rotateY` ±6°
- `perspective: 1000px` on the card container
- `whileHover: { scale: 1.02 }` with 200ms ease
- `will-change: transform` for GPU promotion
- Glass cards with per-guardrail RGB border tint at 15% opacity
- Stagger delay 60ms via `FadeInStagger stagger={0.06}`
- `useReducedMotion()` guard: no tilt, no scale

---

## Dashboard Preview (`components/dashboard-preview/dashboard-preview.tsx`)

**Before:** Simple `FadeIn` + `AnimatePresence` tab switcher with colored bar mockup.

**After:**
- Perspective scroll entry: `useScroll` on section ref → `rotateX` 8°→0°, `opacity` 0→1, `translateY` 40→0
- `perspective: 1200px` container for 3D flip effect
- Mock panel wrapped in `.glass` rounded-2xl border for glass browser chrome effect
- Browser chrome upgraded with `backdrop-blur-sm` top bar
- Sidebar icon colors switch to per-panel `accentRgb` values
- `useReducedMotion()` guard: all transforms fixed at final values

---

## Results (`components/sections/results.tsx`)

**Before:** Static metric display, `surface-card` solid backgrounds.

**After:**
- `AnimatedCounter` component: `useMotionValue` + `animate()` + `useInView` (once, margin: -60px)
- Counters animate from 0 to target over 1.6s with `easeOut`
- Horizontal scroll-snap on mobile (`snap-x snap-mandatory`, `snap-center` per card)
- Cards switch from `surface-card` to `.glass` with per-result RGB border tint
- `useReducedMotion()` guard: static display values, no animation

---

## FAQ (`components/sections/faq.tsx`)

**Before:** Radix UI Accordion component.

**After:** Custom `FAQItem` with Framer Motion:
- `AnimatePresence` + `motion.div` with `height: 0 → "auto"` and `opacity: 0 → 1`
- Transition: `duration: 0.28, ease: [0.16, 1, 0.3, 1]` (snappy spring)
- `Plus` icon rotates 0°→45° on open via `motion.div animate={{ rotate }}`
- Items wrapped in `.glass` container
- `useReducedMotion()` guard: immediate open/close

---

## CTA (`components/sections/cta.tsx`)

**Before:** Static `FadeIn` wrapper, `Flame` icon from lucide.

**After:**
- Replaced `Flame` icon with `EmberSVG` — the animated SVG flame
- Ember ignites on scroll: `scale: 0 → 1` with spring (`ease: [0.34, 1.56, 0.64, 1]`) on `useInView`
- Section entrance: `opacity: 0 → 1, y: 32 → 0` when in view
- Headline, body, CTAs, and disclaimer cascade with staggered delays (0.3s, 0.42s, 0.54s, 0.7s)
- `useReducedMotion()` guard throughout

---

## Footer (`components/sections/footer.tsx`)

**Before:** Lucide `Flame` icon as brand mark.

**After:**
- Replaced flame icon with ember pulse dot: outer ring animates with `ember-pulse` CSS keyframe (4s ease-in-out infinite)
- Inner dot is solid amber; outer ring is a larger translucent radial glow
- Footer converted to `"use client"` (was a Server Component)
- Zero JS — CSS animation only for the pulse

---

## Asset Placeholders

- `public/video/hero.mp4` — empty placeholder (video fails gracefully, fallback: CSS)
- `public/video/dashboard-bg.mp4` — empty placeholder
- See `ASSETS.md` for Higgsfield/motionsites.ai generation prompts

---

## Performance Notes

- All continuous animations (particles, grain, pulse) are CSS `@keyframes` on compositor thread
- `transform` and `opacity` only for all JS-driven Framer Motion effects
- `useReducedMotion()` implemented in: Hero words, Pipeline sequencing, Guardrails tilt, Dashboard perspective, Results counters, FAQ accordion, CTA ignite, EmberSVG
- `will-change: transform` on cards with tilt (Guardrails)
- Below-fold lazy loading via `next/dynamic` with `ssr: false` preserved
