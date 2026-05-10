"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Play, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

/* ─────────────────────────────────────────────────────────────
   Hero background: abstract ember particle field
   TODO (motionsites.ai): Replace <HeroBg> with the generated
   motion component. Prompt:
   "Generate a looping hero animation: dark #0e0e0f background
   with slowly drifting ember/amber particles (rgba 240,125,0)
   rising upward, occasional subtle wing-shaped light streaks
   suggesting phoenix feathers. 16:9, 30fps, seamless loop."
───────────────────────────────────────────────────────────── */
/* Pure-CSS particles — zero JS animation overhead on the main thread */
const PARTICLES = [
  { left: "10%", delay: "0s",    dur: "6s"  },
  { left: "22%", delay: "1.4s",  dur: "8s"  },
  { left: "35%", delay: "0.7s",  dur: "7s"  },
  { left: "48%", delay: "2.1s",  dur: "5s"  },
  { left: "61%", delay: "0.3s",  dur: "9s"  },
  { left: "74%", delay: "1.8s",  dur: "6s"  },
  { left: "87%", delay: "1.0s",  dur: "7.5s"},
];

function HeroBg() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {/* Radial glow — ember core */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] rounded-full"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(240,125,0,0.12) 0%, rgba(240,125,0,0.04) 40%, transparent 70%)",
        }}
      />
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
      {/* CSS-only ember particles — GPU composited, no JS per frame */}
      {PARTICLES.map((p, i) => (
        <span
          key={i}
          className="absolute bottom-0 w-1 h-1 rounded-full"
          style={{
            left: p.left,
            background: "rgba(240,125,0,0.7)",
            animation: `ember-rise ${p.dur} ${p.delay} ease-out infinite`,
          }}
        />
      ))}
    </div>
  );
}

export function Hero() {
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-16">
      <HeroBg />

      <div className="relative mx-auto max-w-6xl px-6 lg:px-8 py-24 lg:py-32 text-center">
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

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.02] tracking-tight mb-6"
        >
          <span className="text-[var(--color-neutral-50)]">Instagram automation</span>
          <br />
          <span className="text-display gradient-text-hero">
            that actually thinks.
          </span>
        </motion.h1>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
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
          transition={{ duration: 0.5, delay: 0.5 }}
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
              {/* TODO (Higgsfield): Replace with generated product demo video
                  Prompt: "60-second cinematic screen-capture walkthrough of an
                  AI-powered Instagram DM automation dashboard. Dark mode UI,
                  amber accent colors. Show: incoming DM → AI pipeline stages
                  → composed reply → human approval → published." */}
              <div className="aspect-video bg-[var(--color-bg-elevated)] flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full border-2 border-[var(--color-ember-400)] flex items-center justify-center mx-auto mb-4">
                    <Play className="h-7 w-7 text-[var(--color-ember-400)] fill-[var(--color-ember-400)]" />
                  </div>
                  <p className="text-[var(--color-neutral-400)] text-sm">
                    Demo video — coming soon
                  </p>
                  <p className="text-[var(--color-neutral-600)] text-xs mt-1">
                    TODO: Replace with Higgsfield-generated product demo
                  </p>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </motion.div>

        {/* Social proof numbers */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
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

      {/* Scroll indicator — CSS animation only */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-60"
           style={{ animation: "fade-up 1s 1.2s ease-out both" }}>
        <div className="w-px h-8 bg-gradient-to-b from-[var(--color-ember-400)] to-transparent" />
      </div>
    </section>
  );
}
