# Qaqnuz Home — Change Log

## Stage 2 — Polish pass: pipeline rail · phone demos · hero ambient (2026-07-05)

Three precision workstreams on the home page. `pnpm build` + `pnpm lint` clean
(new/edited files lint-clean); all 3 locales key-parity verified; Lighthouse
`/uz` still **Perf 95 · A11y 95** (ambient added zero regression — CLS 0.065,
TBT 0 ms). Grep proof (component code): **zero raw hex, zero palette classes**
in `pipeline-story.tsx`, `channels-section.tsx`, `hero.tsx`, `hero-ambient.tsx`.

### WS1 — Pipeline rail (`components/pipeline/pipeline-story.tsx`)
Root cause → fix:
- **Marker overshoot** — `markerTop` mapped 0–100 % of the *padded container*, so
  the ball landed ~27 px past circle-7 (and above circle-1). → Ball `top` is now a
  **measured px offset**, clamped to `[circle-1 center, circle-7 center]`.
- **Uneven mapping** — 16.7 % steps assumed circle centers were evenly spread
  across the container; they're only even within the `<ol>`. → Centers are
  **measured per-circle** (refs + `useLayoutEffect`, recomputed on resize).
- **Line/ball desync** — the line used a linear `scaleY` while the ball used a
  piecewise map with the guardrail plateau. → **One** MotionValue (`fillRaw` →
  `useSpring` 120/28) drives **both** the fill height and the ball top; they
  cannot diverge. Spring output is clamped, so it never overshoots circle-7.
- **Line through the digits** — lit circles were translucent (`bg-accent/20`). →
  Lit circles are **opaque** solid accent discs; the line sits behind the `z-10`
  `<ol>` and terminates at circle-7's center. `stage` now derives from the sprung
  fill crossing measured centers (shared source → true hand-off).
- **Verification** — Playwright asserts the ball's center is within 2 px of the
  target circle: **p0.02 → circle-1 Δ0.00 px, p1.0 → circle-7 Δ0.11 px (PASS)**;
  p0.5 correctly holds at circle-5 (guardrail). Screenshots at 5 scroll positions.

### WS2 — Channels phone demos (`components/sections/channels-section.tsx`)
Root cause: a static sketch with hardcoded UZ/RU strings in JSX and raw palette
(`bg-blue-500`, `gray-*`, `#1a1a1a`, `#7c3aed`, `#e11d48`), the "Chat s
kompaniyey" typo, and an "8 bosqichli" count contradicting the 7-stage
hero/pipeline.
- Shared modern **PhoneShell** (Dynamic Island, thin bezel, screen reflection).
- **DM**: timed sequence — customer bubble → typing dots → spring AI reply →
  "✦ AI · 0.94" chip + "✓✓ read" receipt → lead-captured toast. Restarts on tab
  re-select. **Comments**: staggered blur-in, AI "verified" chip, heart pulse +
  like tick. **Story**: filling progress bar (~5 s), slide-up mention, typewriter
  AI reply, stamp. All pause offscreen (`onViewportEnter/Leave`), render a static
  final state under `prefers-reduced-motion`, `aria-hidden` internals, keyboard-
  native tabs.
- Copy → `messages.channels.screens` (uz canonical + ru/en); avatar letters
  derived from handles; typo fixed ("hozir onlayn"); **count 8 → 7** in channels
  (uz/ru/en). `product-ui.css` gained social-surface tokens (IG gradient, bezel,
  story bg, heart). Tokens-only; grep-clean.
- **Flagged, not silently changed:** the broader 8-vs-7 inconsistency in
  `/product`, `/pricing`, and the FAQ — those copies *enumerate 8 named steps*
  (qualify→…→publish) and live on out-of-scope pages, so forcing "7" would break
  the enumeration. Needs an owner decision on whether the product is 7- or 8-stage.

### WS3 — Hero ambient (`components/motion/hero-ambient.tsx`, `hero.tsx`)
Owner decision on the Stage-2 flag: **keep the dark hero** (CLAUDE.md marketing
shell is dark) and add the ambient, rather than inverting to near-white (which
would also force the fixed nav + headline to flip colours on scroll).
- `HeroAmbient`: 4 large, very soft radial **clouds** in the logo-orange family
  (accent + ember peach + faint gold) drifting slowly (38–60 s, different paths).
  Compositor-only (`@keyframes drift-*`, transform/scale), token colours,
  `will-change:transform`, **paused offscreen** (IntersectionObserver), collapsed
  to a **static single frame** under `prefers-reduced-motion`.
- Removed the flat static radial; kept EmberCanvas (subtler) + grain over it.
- **Removed the hero badge** (owner: "do not write anything").
- Replaced the active `<video src="/video/hero.mp4">` (empty placeholder → benign
  416) with a **commented slot** wired to `/motion/hero-loop.webm|mp4` (Appendix A
  attributes) — 416 gone, drop-in ready.
- Fold verified at **1440×900 and 1280×800**: nav + headline + sub + CTAs + top of
  the inbox preview all visible; preview clipped by the fold. Mobile (390) holds.

---

## Stage 1 — Home: Pipeline + InboxDemo transplant · dark logo-orange shell (2026-07-05)

Transplanted the two strongest sections of the rejected prototype (7-stage AI
**Pipeline** scroll story + live **InboxDemo**) into the production home page,
rebuilt the **Hero** to the original motionsites spec, and re-based the whole
marketing shell on the **logo orange** (`#ff6b33`) over a warm near-black
(`#0e0e0f`) — the phoenix identity. Routes, locales, and other pages are
untouched. Build green; all three locales render clean; Lighthouse `/uz`
**Perf 95 · A11y 95**.

### Tokens & shell (Phase 1)
- `app/globals.css`: marketing shell is now **canonical dark** (warm near-black
  base, warm cream text). Replaced the ember scale with the **logo-orange family**
  (`--color-ember-500: #ff6b33`) and pointed `--accent` at it (`hsl 16 100% 60%`).
  Killed leftover Nexora **indigo** (`::selection`, `.gradient-accent`, hero radial).
  Added `danger`/`warning`/`success` status tokens for the guardrail/escalation beats.
- `app/product-ui.css` (**new**): a `.product-ui`-scoped **light/blue** token layer
  (`#1a5cff`, white surfaces, channel badges) mirroring `design/tokens.css` +
  `themes.css`, so the product window never bleeds into the marketing shell.
- `theme-provider`: defaults to **dark** (was `light` — violated the constitution).
- Assets: copied `qaqnuz-300x300.svg` + hi-res logo → `public/brand/`; wired OG/twitter image.

### Hero (Phase 2) — rebuilt to Appendix A
- `components/sections/hero.tsx`: badge → serif headline with one **italic
  orange** word → sub → pill CTA + ghost **play** button → frosted-glass compact
  **FLOW-7 inbox preview** (light `.product-ui` window) clipped by the 100vh fold.
- Ported `EmberCanvas` (`components/motion/ember-canvas.tsx`) as the **living
  background** — `hero.mp4` shipped as an empty 0-byte placeholder, so the spec's
  "port EmberCanvas if the hero is flat" applied. IntersectionObserver-paused,
  reduced-motion-safe. The `<video>` slot stays wired for the future asset
  (its empty placeholder yields a benign dev-only 416, handled by `onError`).
- Dropped the Nexora CloudFront video URL and the indigo radial.

### Pipeline (Phase 2b) — `components/pipeline/pipeline-story.tsx`
- Ported the donor's 7-stage scroll story: scroll-linked sticky rail (desktop) +
  viewport-triggered stepper (mobile) + the guardrail beat (wrong→caught→fixed).
- Migrated `useLang()` → `useTranslations` and `useReducedMotionSafe` →
  `useReducedMotion`; restyled donor cream/gold/flame/ink → dark `@theme` tokens.
  Glows derive from `hsl(var(--accent)/…)`. New **`pipelineStory`** message
  namespace (uz/ru/en) — kept separate from `pipeline`, which `/product` still uses.
  Adds a "Batafsil →" link to `/product`.

### InboxDemo (Phase 3) — `components/sections/inbox-demo.tsx`
- Ported the donor's 4-industry scripted demo and **restyled the product UI to the
  Pencil FLOW-7 mockups** (`qaqnuz-inbox-mockup.png`) using `.product-ui` tokens:
  top bar (brand pill, ⌘K search, SLA, avatar), icon nav rail w/ Inbox badge,
  conversation list with **filter + tag chips** (ESKALATSIYA / AI YOPDI / PLAYBOOK +
  scores), thread with **journey chips** + the **amber escalation card**
  (Qabul qilish / AI'ga qaytarish), **AI/Men/TAKEOVER** composer + quick actions,
  and the full **AI TAHLILI** panel (Niyat bar, His-tuyg'u, Layer Moslik checklist,
  TAVSIYALAR HIGH/MEDIUM/INFO, Lid holati 92%). New enriched **`inbox`** namespace
  (uz/ru/en). Window is `aria-hidden`; industry tabs stay keyboard-navigable.

### Judgment ports + pruning (Phases 4–5)
- **Ported:** EmberCanvas (above). **Skipped w/ reason:** StatBar/CountUp (Results
  already animates counters), Integrations (ChannelsSection covers it), Ignite
  (fade-in exists), SmoothScroll/Lenis (avoids a dep + sticky-scroll risk),
  FinalCta (target `cta.tsx` already ships a rich CTA).
- **Removed** unused `sections/multi-brand.tsx` (also clears its pre-existing
  missing-`{count}` runtime error) + `sections/logo-strip.tsx`. **Kept**
  `dashboard-preview` (still used by `/product`).
- Home order now: `Hero → Channels → Pipeline → InboxDemo → TrustRamp →
  Guardrails → Results → Uzbekistan → Pricing → FAQ → CTA → Footer`.

### Verification (Phase 6)
- `pnpm build` clean (57 pages, 0 TS errors). New/edited files are **lint-clean**;
  the 44 remaining lint problems are **pre-existing** in untouched, out-of-scope
  files (dashboard/*, theme-toggle, …).
- Screenshots at uz/ru/en × {1440, 768, 390}; reduced-motion confirms static
  fallbacks (pipeline stepper, embers off). Zero raw hex in component code; all
  user copy via `messages`.
- Lighthouse `/uz` (desktop): **Perf 95 · A11y 95**. Remaining contrast items are
  the brand-mandated white-on-orange CTA (an inherent property of logo orange) and
  the decorative product-window channel-badge micro-labels — accepted constraints.

---

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
