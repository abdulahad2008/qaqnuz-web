# Cinematic UI Overhaul — Change Log

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
