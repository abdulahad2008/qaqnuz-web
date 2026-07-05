"use client";

import { useLayoutEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/navigation";

/*
 * The signature scene: the hero's DM travels through the AI's 7-stage
 * pipeline. Scroll-LINKED via useScroll on a tall section with a sticky
 * viewport — the user always controls speed and can flick past.
 * Stage 5 (index 4) is the guardrail beat: a wrong draft is caught,
 * dissolves into embers, and a corrected reply reforms.
 *
 * Ported from the donor prototype: next-intl copy (pipelineStory) + the
 * dark/logo-orange @theme tokens. Scroll behaviour per the cinematic-scroll
 * skill ("Scroll-Driven Pipeline Sequencing").
 */

type Stage = { title: string; desc: string; detail: string };
type Guardrail = {
  draftLabel: string;
  wrongDraft: string;
  chip: string;
  explain: string;
  fixedLabel: string;
  fixedDraft: string;
  filters: string[];
};

// Scroll-progress point where each stage ignites; the guardrail beat
// (index 4) gets the widest window because it is the hero moment.
const THRESHOLDS = [0.02, 0.12, 0.22, 0.32, 0.42, 0.74, 0.88];

type GuardPhase = "wrong" | "caught" | "fixed";

function guardPhaseAt(p: number): GuardPhase {
  const g = (p - THRESHOLDS[4]) / (THRESHOLDS[5] - THRESHOLDS[4]);
  if (g < 0.35) return "wrong";
  if (g < 0.6) return "caught";
  return "fixed";
}

/* --- shared pieces ------------------------------------------------- */

function IncomingDm() {
  const t = useTranslations("pipelineStory");
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-border bg-secondary px-4 py-3">
      <span
        aria-hidden="true"
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground"
      >
        M
      </span>
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">{t("incomingLabel")}</p>
        <p className="truncate text-sm text-foreground">{t("incomingText")}</p>
      </div>
    </div>
  );
}

/** The guardrail drama card: wrong draft → caught → dissolve → corrected. */
function GuardrailBeat({
  g,
  phase,
  staticMode = false,
}: {
  g: Guardrail;
  phase: GuardPhase;
  staticMode?: boolean;
}) {
  if (staticMode) {
    return (
      <div className="space-y-3">
        <p className="text-xs uppercase tracking-wider text-muted-foreground">{g.draftLabel}</p>
        <p className="rounded-xl border border-danger-500/40 bg-danger-500/10 px-4 py-3 text-sm text-muted-foreground line-through">
          {g.wrongDraft}
        </p>
        <p className="w-fit rounded-full border border-danger-500/50 bg-danger-500/15 px-3 py-1 text-xs font-semibold text-danger-400">
          {g.chip}
        </p>
        <p className="text-xs text-muted-foreground">{g.explain}</p>
        <p className="text-xs uppercase tracking-wider text-muted-foreground">{g.fixedLabel}</p>
        <p className="rounded-xl border border-accent/40 bg-accent/10 px-4 py-3 text-sm text-foreground">
          {g.fixedDraft}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <p className="text-xs uppercase tracking-wider text-muted-foreground">
        {phase === "fixed" ? g.fixedLabel : g.draftLabel}
      </p>

      <div className="relative min-h-28">
        <AnimatePresence mode="wait">
          {phase !== "fixed" ? (
            <motion.p
              key="wrong"
              initial={{ opacity: 0, y: 10 }}
              animate={
                phase === "caught"
                  ? { opacity: 1, y: 0, x: [0, -4, 4, -3, 3, 0] }
                  : { opacity: 1, y: 0 }
              }
              exit={{ opacity: 0, filter: "blur(10px)", scale: 1.06, transition: { duration: 0.5 } }}
              transition={{ duration: 0.4 }}
              className={`rounded-xl border px-4 py-3 text-sm ${
                phase === "caught"
                  ? "border-danger-500/70 bg-danger-500/15 text-foreground"
                  : "border-border bg-secondary text-foreground"
              }`}
            >
              {g.wrongDraft}
            </motion.p>
          ) : (
            <motion.p
              key="fixed"
              initial={{ opacity: 0, filter: "blur(10px)", y: 8 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="ember-glow rounded-xl border border-accent/40 bg-accent/10 px-4 py-3 text-sm text-foreground"
            >
              {g.fixedDraft}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {phase !== "wrong" && (
          <motion.p
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: [1.06, 1] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="w-fit rounded-full border border-danger-500/50 bg-danger-500/15 px-3 py-1 text-xs font-semibold text-danger-400"
          >
            {g.chip}
          </motion.p>
        )}
      </AnimatePresence>
      {phase === "fixed" && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-xs text-muted-foreground"
        >
          {g.explain}
        </motion.p>
      )}

      <div className="flex flex-wrap gap-1.5 pt-1" aria-hidden="true">
        {g.filters.map((f, i) => {
          const flagged = i === 0 && phase !== "wrong"; // price filter fires
          return (
            <span
              key={f}
              className={`rounded-full border px-2 py-0.5 text-[10px] transition-colors duration-300 ${
                flagged
                  ? "border-danger-500/70 bg-danger-500/20 text-danger-400"
                  : "border-border text-muted-foreground"
              }`}
            >
              {f}
            </span>
          );
        })}
      </div>
    </div>
  );
}

/* --- desktop scroll-linked scene ----------------------------------- */

// Rail geometry — a fixed-height column of 7 circles. Real circle-center
// offsets are MEASURED after layout (never assumed from percentages) and feed
// a single MotionValue, so the fill line and the ball can never desync.
const RAIL_H = 500;
// Scroll-progress → circle index. Index 4 repeats across 0.42→0.70 so the ball
// HOLDS at circle 5 during the guardrail beat, then advances to circle 6.
const FILL_INPUT = [0.02, 0.12, 0.22, 0.32, 0.42, 0.7, 0.74, 0.88];
const FILL_STOPS = [0, 1, 2, 3, 4, 4, 5, 6];

function piecewise(x: number, xs: number[], ys: number[]) {
  const n = xs.length;
  if (x <= xs[0]) return ys[0];
  if (x >= xs[n - 1]) return ys[n - 1];
  for (let i = 1; i < n; i++) {
    if (x <= xs[i]) {
      const t = (x - xs[i - 1]) / (xs[i] - xs[i - 1]);
      return ys[i - 1] + t * (ys[i] - ys[i - 1]);
    }
  }
  return ys[n - 1];
}

const defaultCenters = () =>
  Array.from({ length: 7 }, (_, i) => 11 + ((RAIL_H - 22) * i) / 6);

function DesktopPipeline({ stages, g }: { stages: Stage[]; g: Guardrail }) {
  const outerRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const centersRef = useRef<number[]>(defaultCenters());
  const [centers, setCenters] = useState<number[]>(defaultCenters);

  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ["start start", "end end"],
  });

  const [stage, setStage] = useState(0);
  const [guardPhase, setGuardPhase] = useState<GuardPhase>("wrong");

  // Measure real circle-center Y offsets (relative to the rail) after layout
  // and on resize — the single source of geometric truth.
  useLayoutEffect(() => {
    const measure = () => {
      const rail = railRef.current;
      if (!rail) return;
      const railTop = rail.getBoundingClientRect().top;
      const next = numberRefs.current.map((el) => {
        if (!el) return 0;
        const r = el.getBoundingClientRect();
        return r.top - railTop + r.height / 2;
      });
      if (next.length === 7 && next.every((n) => n > 0)) {
        centersRef.current = next;
        setCenters(next);
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // ONE source of truth. fillRaw(px) reads the latest measured centers every
  // frame; the ball's top AND the line's height both derive from its spring,
  // clamped to [circle-1 center, circle-7 center] so nothing overshoots.
  const fillRaw = useTransform(scrollYProgress, (p) => {
    const cs = centersRef.current;
    return piecewise(
      p,
      FILL_INPUT,
      FILL_STOPS.map((idx) => cs[idx])
    );
  });
  const fillSpring = useSpring(fillRaw, { stiffness: 120, damping: 28 });
  const clampFill = (v: number) => {
    const cs = centersRef.current;
    return Math.min(Math.max(v, cs[0]), cs[6]);
  };
  const ballTop = useTransform(fillSpring, clampFill);
  const lineHeight = useTransform(
    fillSpring,
    (v) => clampFill(v) - centersRef.current[0]
  );

  // Circle N lights the instant the (sprung) fill crosses its measured center
  // — the visual hand-off — so `stage` and the visuals share one source.
  useMotionValueEvent(fillSpring, "change", (v) => {
    const cs = centersRef.current;
    let s = 0;
    for (let i = 0; i < cs.length; i++) if (v >= cs[i] - 1) s = i;
    setStage(s);
  });
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    setGuardPhase(guardPhaseAt(p));
  });

  const active = stages[stage];
  const c0 = centers[0];
  const c6 = centers[6];

  return (
    <div ref={outerRef} className="relative hidden md:block" style={{ height: "420vh" }}>
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden px-6">
        <div className="mx-auto grid w-full max-w-5xl grid-cols-[minmax(0,2fr)_minmax(0,3fr)] items-center gap-16">
          {/* rail */}
          <div ref={railRef} className="relative pl-2">
            {/* static track — behind the circles */}
            <div
              aria-hidden="true"
              className="absolute left-[calc(0.5rem+11px)] w-px bg-border"
              style={{ top: c0, height: c6 - c0 }}
            />
            {/* animated fill — same source as the ball, so never desynced */}
            <motion.div
              aria-hidden="true"
              className="absolute left-[calc(0.5rem+11px)] w-px bg-gradient-to-b from-accent via-ember-500 to-ember-700"
              style={{ top: c0, height: lineHeight }}
            />
            {/* traveling ball — sits under the opaque circles for a clean hand-off */}
            <motion.div
              aria-hidden="true"
              data-rail="ball"
              className="absolute left-2 h-[22px] w-[22px] -translate-y-1/2 rounded-full bg-accent"
              style={{ top: ballTop, boxShadow: "0 0 18px hsl(var(--accent) / 0.7)" }}
            />
            <ol className="relative z-10 flex flex-col justify-between" style={{ height: RAIL_H }}>
              {stages.map((s, i) => {
                const lit = i <= stage;
                return (
                  <li key={s.title} className="flex items-center gap-4">
                    <span
                      ref={(el) => {
                        numberRefs.current[i] = el;
                      }}
                      data-rail="circle"
                      className={`flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full border text-[10px] font-bold transition-colors duration-300 ${
                        lit
                          ? "border-accent bg-accent text-accent-foreground"
                          : "border-border bg-background text-muted-foreground"
                      }`}
                    >
                      {i + 1}
                    </span>
                    <span
                      className={`text-sm font-semibold transition-colors duration-300 ${
                        i === stage
                          ? "text-accent"
                          : lit
                            ? "text-foreground"
                            : "text-muted-foreground/60"
                      }`}
                    >
                      {s.title}
                    </span>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* stage detail card */}
          <div className="flex flex-col gap-5">
            <IncomingDm />
            <div className="min-h-[360px] rounded-2xl border border-border bg-secondary p-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={stage}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-accent">
                    {stage + 1} / 7
                  </p>
                  <h3 className="font-display text-2xl text-foreground">{active.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{active.desc}</p>
                  <div className="mt-5">
                    {stage === 4 ? (
                      <GuardrailBeat g={g} phase={guardPhase} />
                    ) : (
                      active.detail && (
                        <p className="w-fit rounded-lg border border-accent/25 bg-accent/5 px-3 py-2 font-mono text-xs text-accent">
                          {active.detail}
                        </p>
                      )
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* --- mobile stepper -------------------------------------------------- */

function MobileGuardrail({ g }: { g: Guardrail }) {
  const ref = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<GuardPhase>("wrong");
  const played = useRef(false);

  return (
    <motion.div
      ref={ref}
      onViewportEnter={() => {
        if (played.current) return;
        played.current = true;
        window.setTimeout(() => setPhase("caught"), 1100);
        window.setTimeout(() => setPhase("fixed"), 2400);
      }}
      viewport={{ margin: "-80px" }}
    >
      <GuardrailBeat g={g} phase={phase} />
    </motion.div>
  );
}

function MobilePipeline({
  stages,
  g,
  always = false,
}: {
  stages: Stage[];
  g: Guardrail;
  always?: boolean;
}) {
  const reduced = useReducedMotion();

  return (
    <div className={`px-5 ${always ? "" : "md:hidden"}`}>
      <div className="mx-auto mb-8 max-w-md">
        <IncomingDm />
      </div>
      <ol className="relative mx-auto max-w-md border-l border-border pl-6">
        {stages.map((s, i) => (
          <motion.li
            key={s.title}
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="relative pb-10 last:pb-0"
          >
            <span
              aria-hidden="true"
              className="absolute -left-[35px] flex h-[22px] w-[22px] items-center justify-center rounded-full border border-accent bg-background text-[10px] font-bold text-accent"
              style={{ boxShadow: "0 0 12px hsl(var(--accent) / 0.4)" }}
            >
              {i + 1}
            </span>
            <h3 className="font-display text-lg text-foreground">{s.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
            <div className="mt-3">
              {i === 4 ? (
                reduced ? (
                  <GuardrailBeat g={g} phase="fixed" staticMode />
                ) : (
                  <MobileGuardrail g={g} />
                )
              ) : (
                s.detail && (
                  <p className="w-fit rounded-lg border border-accent/25 bg-accent/5 px-3 py-2 font-mono text-xs text-accent">
                    {s.detail}
                  </p>
                )
              )}
            </div>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}

/* --- section --------------------------------------------------------- */

export function PipelineStory() {
  const t = useTranslations("pipelineStory");
  const reduced = useReducedMotion();
  const stages = t.raw("stages") as Stage[];
  const g = t.raw("guardrail") as Guardrail;

  return (
    <section id="pipeline" className="relative py-24">
      <div className="mx-auto mb-4 max-w-3xl px-6 text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">
          {t("kicker")}
        </p>
        <h2 className="font-display text-3xl sm:text-5xl">{t("title")}</h2>
        <p className="mt-4 text-muted-foreground">{t("sub")}</p>
        <Link
          href="/product"
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:gap-2 transition-all"
        >
          {t("moreLink")}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Reduced motion on desktop → same calm stepper as mobile */}
      {reduced ? (
        <div className="mt-12">
          <MobilePipeline stages={stages} g={g} always />
        </div>
      ) : (
        <>
          <DesktopPipeline stages={stages} g={g} />
          <div className="mt-12">
            <MobilePipeline stages={stages} g={g} />
          </div>
        </>
      )}
    </section>
  );
}
