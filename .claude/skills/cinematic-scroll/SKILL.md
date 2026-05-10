# Cinematic Scroll Animations — Qaqnuz Design System

## Effect System (7 Layers)

### 1. Video Background
- File: `components/motion/video-background.tsx`
- `<video autoPlay muted loop playsInline>` at absolute inset-0
- Wrapped in `"use client"` component
- Placeholder: `public/video/hero.mp4` (black 1x1 fallback until real asset)
- Fallback: CSS radial gradient identical to previous design

### 2. Film Grain Overlay
- File: `components/motion/film-grain.tsx`
- CSS `@keyframes grain-shift` — `translate` on `:before` pseudo-element via SVG feTurbulence  
- Implemented as `pointer-events-none absolute inset-0` div with CSS only
- Class: `.film-grain` in globals.css
- **Zero JS** — GPU compositor only

### 3. CSS Ember Particles
- Defined in `globals.css` as `@keyframes ember-rise`
- 7 `<span>` elements with `position: absolute`, `animation: ember-rise`
- Staggered delays (0s → 2.1s), durations (5s → 9s)
- **Zero JS per frame** — transform + opacity on compositor thread

### 4. Vignette
- Class: `.vignette` in globals.css
- `radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.7) 100%)`
- `pointer-events-none absolute inset-0`

### 5. Glass Cards
- Class: `.glass` in globals.css
- `backdrop-filter: blur(20px) saturate(160%)`
- `background: rgba(255,255,255,0.04)`
- `border: 1px solid rgba(255,255,255,0.10)`
- Inset top-edge highlight: `box-shadow: inset 0 1px 0 rgba(255,255,255,0.08)`
- Class: `.glass-ember` adds ember-tinted top border

### 6. Scroll-Driven Reveals (useScroll + useTransform)
```tsx
const ref = useRef(null);
const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
const y = useTransform(scrollYProgress, [0, 1], [40, -40]);
const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
```
- Always use `transform` and `opacity` only — no layout props
- `useReducedMotion()` check → disable scroll transforms if true

### 7. Liquid Ember SVG Flame
- File: `components/motion/ember-svg.tsx`
- Animated SVG with `animateMotion` + CSS `filter: blur` pulse
- Used in Hero bottom-center as decorative motif

---

## Pattern Library

### Word-by-Word Blur Reveal
```tsx
const words = text.split(" ");
// stagger each word: delay = index * 0.04s
// initial: { opacity: 0, filter: "blur(8px)" }
// animate: { opacity: 1, filter: "blur(0px)" }
// transition: { duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }
```

### Cursor Tilt Card (±6°, perspective 1000px)
```tsx
const x = useMotionValue(0);
const y = useMotionValue(0);
const rotateX = useTransform(y, [-0.5, 0.5], [6, -6]);
const rotateY = useTransform(x, [-0.5, 0.5], [-6, 6]);
// onMouseMove: normalize cursor to [-0.5, 0.5] relative to element
// style={{ perspective: "1000px", rotateX, rotateY }}
```

### Perspective Scroll Entry (rotateX 8°→0°)
```tsx
const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "start 0.3"] });
const rotateX = useTransform(scrollYProgress, [0, 1], [8, 0]);
const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
// style={{ perspective: "1200px", rotateX, opacity }}
```

### Animated Counter
```tsx
const count = useMotionValue(0);
const inView = useInView(ref, { once: true, margin: "-60px" });
useEffect(() => {
  if (inView) animate(count, target, { duration: 1.6, ease: "easeOut" });
}, [inView]);
const rounded = useTransform(count, (v) => Math.round(v).toLocaleString());
```

### Scroll-Driven Pipeline Sequencing
```tsx
const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start 0.8", "end 0.2"] });
useMotionValueEvent(scrollYProgress, "change", (latest) => {
  const stage = Math.floor(latest * stages.length);
  setActiveStage(Math.min(stage, stages.length - 1));
});
```

### AnimatePresence Height-Auto Accordion
```tsx
<AnimatePresence initial={false}>
  {open && (
    <motion.div
      key="content"
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      style={{ overflow: "hidden" }}
    >
      {children}
    </motion.div>
  )}
</AnimatePresence>
```

---

## Performance Rules
- `transform` and `opacity` only — never animate `height`, `width`, `top`, `left` (exception: height-auto accordion uses clip-path approach)
- CSS-only for particles and grain — zero JS per frame
- `useReducedMotion()` guard on all scroll-driven effects
- `will-change: transform` on glass cards that tilt
- Lazy load below-fold sections via `next/dynamic` with `ssr: false` in a `"use client"` wrapper

## Asset Placeholders
- `public/video/hero.mp4` — black 1-frame MP4 placeholder
- `public/video/dashboard-bg.mp4` — black 1-frame MP4 placeholder
- Real assets: see `ASSETS.md` for Higgsfield/motionsites.ai prompts
