"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Eye, Zap, Rocket, ChevronRight } from "lucide-react";
import { Section, Container, SectionHeader } from "@/components/ui/section";
import { FadeIn } from "@/components/motion/fade-in";

const levels = [
  {
    level: "L1",
    name: "Full Review",
    icon: Eye,
    color: "var(--color-neutral-400)",
    accent: "rgba(161,161,170,0.15)",
    border: "rgba(161,161,170,0.25)",
    autoRate: 0,
    description:
      "Every AI-composed reply sits in the approval queue. Your operator reviews and edits before anything reaches the customer. Zero risk — ideal for brand onboarding.",
    features: [
      "100% human approval required",
      "Full edit capability before publish",
      "No LLM responses published without sign-off",
      "Ideal for first 7–14 days",
    ],
  },
  {
    level: "L2",
    name: "Guided Auto",
    icon: Shield,
    color: "var(--color-ember-300)",
    accent: "rgba(255,188,77,0.12)",
    border: "rgba(255,188,77,0.25)",
    autoRate: 40,
    description:
      "High-confidence, low-risk replies (FAQs, hours, location queries) publish automatically. Anything with purchase intent, pricing, or complaint signals queues for review.",
    features: [
      "≈40% auto-publish rate",
      "Purchase-intent replies always reviewed",
      "Pricing & complaint messages → queue",
      "Unlocks after 50+ approved replies",
    ],
  },
  {
    level: "L3",
    name: "Smart Auto",
    icon: Zap,
    color: "var(--color-ember-400)",
    accent: "rgba(255,157,26,0.12)",
    border: "rgba(255,157,26,0.3)",
    autoRate: 80,
    description:
      "The AI handles most interactions autonomously, including sales conversations. Only escalations and edge cases route to your team. Full guardrails remain active.",
    features: [
      "≈80% auto-publish rate",
      "Sales conversations automated",
      "Escalations & edge cases → human",
      "Unlocks after 200+ approved replies",
    ],
  },
  {
    level: "L4",
    name: "Full Auto",
    icon: Rocket,
    color: "var(--color-trust-400)",
    accent: "rgba(29,184,161,0.12)",
    border: "rgba(29,184,161,0.3)",
    autoRate: 98,
    description:
      "Near-complete autonomy for established brands. The AI runs your DMs 24/7. Human oversight is available on-demand, not in the critical path. 9-point guardrails never sleep.",
    features: [
      "≈98% auto-publish rate",
      "24/7 autonomous operation",
      "Human always one click away",
      "Unlocks after sustained quality scores",
    ],
  },
];

export function TrustRamp() {
  const [selected, setSelected] = useState(0);
  const level = levels[selected];
  const Icon = level.icon;

  return (
    <Section id="trust-ramp">
      <Container>
        <FadeIn>
          <SectionHeader
            overline="Trust Ramp"
            title={
              <>
                Start careful.{" "}
                <span className="gradient-ember">Scale confident.</span>
              </>
            }
            description="Qaqnuz grows into autonomy alongside your brand. The trust ramp means you're never forced to give up control — you earn it, level by level."
          />
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Level selector */}
          <FadeIn direction="left" delay={0.1}>
            <div className="flex flex-col gap-3">
              {levels.map((l, idx) => {
                const LIcon = l.icon;
                const isSelected = idx === selected;
                return (
                  <motion.button
                    key={l.level}
                    onClick={() => setSelected(idx)}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.99 }}
                    className="flex items-center gap-4 p-4 rounded-xl border text-left transition-all duration-200"
                    style={{
                      background: isSelected ? l.accent : "transparent",
                      borderColor: isSelected ? l.border : "rgba(255,255,255,0.07)",
                    }}
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                      style={{
                        background: isSelected ? l.accent : "var(--color-bg-elevated)",
                        border: `1px solid ${isSelected ? l.border : "rgba(255,255,255,0.08)"}`,
                      }}
                    >
                      <LIcon className="h-5 w-5" style={{ color: l.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span
                          className="text-xs font-bold font-mono"
                          style={{ color: l.color }}
                        >
                          {l.level}
                        </span>
                        <span className="text-sm font-semibold text-[var(--color-neutral-100)]">
                          {l.name}
                        </span>
                      </div>
                      <div className="mt-2 h-1.5 rounded-full bg-[var(--color-bg-overlay)] overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ background: l.color }}
                          initial={{ width: 0 }}
                          animate={{ width: `${l.autoRate}%` }}
                          transition={{ duration: 0.6, ease: "easeOut" }}
                        />
                      </div>
                      <p className="text-xs text-[var(--color-neutral-500)] mt-1">
                        {l.autoRate}% auto-publish
                      </p>
                    </div>
                    <ChevronRight
                      className="h-4 w-4 shrink-0 transition-colors"
                      style={{ color: isSelected ? l.color : "var(--color-neutral-700)" }}
                    />
                  </motion.button>
                );
              })}
            </div>
          </FadeIn>

          {/* Detail card */}
          <FadeIn direction="right" delay={0.15}>
            <AnimatePresence mode="wait">
              <motion.div
                key={selected}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.3 }}
                className="surface-card p-8"
                style={{
                  borderColor: level.border,
                  boxShadow: `0 0 40px -12px ${level.accent}`,
                }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ background: level.accent }}
                  >
                    <Icon className="h-6 w-6" style={{ color: level.color }} />
                  </div>
                  <div>
                    <p
                      className="text-xs font-bold font-mono"
                      style={{ color: level.color }}
                    >
                      {level.level}
                    </p>
                    <h3 className="text-xl font-bold text-[var(--color-neutral-50)]">
                      {level.name}
                    </h3>
                  </div>
                </div>

                <p className="text-[var(--color-neutral-400)] leading-relaxed mb-6">
                  {level.description}
                </p>

                <ul className="space-y-3">
                  {level.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-3 text-sm">
                      <div
                        className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                        style={{ background: level.color }}
                      />
                      <span className="text-[var(--color-neutral-300)]">{feat}</span>
                    </li>
                  ))}
                </ul>

                {/* Auto-publish meter */}
                <div className="mt-8 p-4 rounded-xl bg-[var(--color-bg-elevated)] border border-[rgba(255,255,255,0.06)]">
                  <div className="flex justify-between text-xs text-[var(--color-neutral-500)] mb-2">
                    <span>Auto-publish rate</span>
                    <span style={{ color: level.color }} className="font-bold">
                      {level.autoRate}%
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-[var(--color-bg-overlay)]">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: level.color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${level.autoRate}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </FadeIn>
        </div>
      </Container>
    </Section>
  );
}
