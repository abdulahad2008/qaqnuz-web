"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Play, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { VideoBackground } from "@/components/motion/video-background";
import { FilmGrain } from "@/components/motion/film-grain";
import { EmberSVG } from "@/components/motion/ember-svg";

/* CSS-only particles — GPU composited, zero JS per frame */
const PARTICLES = [
  { left: "8%",  delay: "0s",    dur: "6s",   size: "3px" },
  { left: "19%", delay: "1.4s",  dur: "8s",   size: "2px" },
  { left: "33%", delay: "0.7s",  dur: "7s",   size: "4px" },
  { left: "47%", delay: "2.1s",  dur: "5.5s", size: "2px" },
  { left: "62%", delay: "0.3s",  dur: "9s",   size: "3px" },
  { left: "76%", delay: "1.8s",  dur: "6.5s", size: "2px" },
  { left: "89%", delay: "1.0s",  dur: "7.5s", size: "4px" },
];

/* Headline split into words for stagger-blur reveal */
const LINE_ONE = "Instagram automation".split(" ");
const LINE_TWO = "that actually thinks.".split(" ");

function WordBlur({
  words,
  delay = 0,
  className = "",
}: {
  words: string[];
  delay?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={reduced ? false : { opacity: 0, filter: "blur(8px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{
            duration: 0.5,
            delay: delay + i * 0.04,
            ease: [0.21, 0.47, 0.32, 0.98],
          }}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

export function Hero() {
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-16">
      {/* Layer 1 — Video background */}
      <VideoBackground src="/video/hero.mp4" opacity={0.45} />

      {/* Layer 2 — Radial ember glow */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(240,125,0,0.14) 0%, rgba(240,125,0,0.04) 45%, transparent 70%)",
        }}
      />

      {/* Layer 3 — Subtle grid */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.022]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Layer 4 — CSS ember particles */}
      <div aria-hidden className="absolute inset-0 overflow-hidden pointer-events-none">
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className="absolute bottom-0 rounded-full"
            style={{
              left: p.left,
              width: p.size,
              height: p.size,
              background: "rgba(240,125,0,0.75)",
              boxShadow: "0 0 6px 2px rgba(240,125,0,0.4)",
              animation: `ember-rise ${p.dur} ${p.delay} ease-out infinite`,
            }}
          />
        ))}
      </div>

      {/* Layer 5 — Vignette */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none z-[5]"
        style={{
          background: "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.65) 100%)",
        }}
      />

      {/* Layer 6 — Film grain */}
      <FilmGrain opacity={0.028} />

      {/* Content */}
      <div className="relative z-[6] mx-auto max-w-6xl px-6 lg:px-8 py-24 lg:py-32 text-center">
        {/* Eyebrow badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex justify-center mb-8"
        >
          <Badge variant="ember" className="gap-2 text-xs">
            <Zap className="h-3 w-3" />
            AI-native Instagram automation · Built for Uzbekistan
          </Badge>
        </motion.div>

        {/* Headline — word-by-word blur reveal */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.02] tracking-tight mb-6">
          <WordBlur
            words={LINE_ONE}
            delay={0.2}
            className="text-[var(--color-neutral-50)] block"
          />
          <WordBlur
            words={LINE_TWO}
            delay={0.36}
            className="text-display gradient-text-hero block"
          />
        </h1>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="text-lg md:text-xl text-[var(--color-neutral-400)] max-w-2xl mx-auto leading-relaxed mb-10"
        >
          Qaqnuz runs your DMs, comments, and story replies through a 7-stage AI
          pipeline with human oversight at every step. Built for Uzbekistan&apos;s
          top brands.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
        >
          <Button size="xl" asChild className="group">
            <Link href="/book-demo">
              Book a demo
              <ArrowRight className="h-5 w-5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </Button>

          <Dialog open={videoOpen} onOpenChange={setVideoOpen}>
            <DialogTrigger asChild>
              <Button size="xl" variant="secondary" className="group gap-3">
                <div className="relative flex h-6 w-6 items-center justify-center rounded-full border border-[var(--color-ember-400)] group-hover:border-[var(--color-ember-300)]">
                  <Play className="h-3 w-3 text-[var(--color-ember-400)] fill-[var(--color-ember-400)]" />
                </div>
                See it in action
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl p-0 overflow-hidden">
              <DialogHeader className="sr-only">
                <DialogTitle>Qaqnuz product demo</DialogTitle>
              </DialogHeader>
              {/* TODO (Higgsfield): Replace with generated product demo video */}
              <div className="aspect-video bg-[var(--color-bg-elevated)] flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full border-2 border-[var(--color-ember-400)] flex items-center justify-center mx-auto mb-4">
                    <Play className="h-7 w-7 text-[var(--color-ember-400)] fill-[var(--color-ember-400)]" />
                  </div>
                  <p className="text-[var(--color-neutral-400)] text-sm">Demo video — coming soon</p>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </motion.div>

        {/* Social proof numbers */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="grid grid-cols-3 gap-8 max-w-lg mx-auto"
        >
          {[
            { value: "7-stage", label: "AI pipeline" },
            { value: "9-point", label: "safety guardrails" },
            { value: "24/7", label: "autonomous coverage" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-bold gradient-ember">{stat.value}</div>
              <div className="text-xs text-[var(--color-neutral-500)] mt-1 leading-tight">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Layer 7 — Liquid ember SVG flame motif */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none z-[6] opacity-30">
        <EmberSVG width={80} height={120} />
      </div>

      {/* Scroll chevron */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[7] opacity-60"
        style={{ animation: "fade-up 1s 1.4s ease-out both" }}
      >
        <div className="flex flex-col items-center gap-1">
          <div className="w-px h-8 bg-gradient-to-b from-[var(--color-ember-400)] to-transparent" />
          <div
            className="w-1.5 h-1.5 border-r border-b border-[var(--color-ember-400)] rotate-45"
            style={{ animation: "fade-up 0.8s 1.8s ease-out both" }}
          />
        </div>
      </div>
    </section>
  );
}
