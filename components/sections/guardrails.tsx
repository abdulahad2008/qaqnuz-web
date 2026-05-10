"use client";

import { motion } from "framer-motion";
import {
  UserX,
  DollarSign,
  Flame,
  Copy,
  Lock,
  Users,
  Compass,
  AlignLeft,
  Scale,
} from "lucide-react";
import { Section, Container, SectionHeader } from "@/components/ui/section";
import { FadeIn, FadeInStagger, FadeInChild } from "@/components/motion/fade-in";

const guardrails = [
  {
    icon: UserX,
    title: "PII Detection",
    description:
      "Automatically detects and redacts personal information — phone numbers, addresses, national IDs — before any response is composed or published.",
    color: "var(--color-trust-400)",
    bg: "rgba(29,184,161,0.1)",
  },
  {
    icon: DollarSign,
    title: "Price Validation",
    description:
      "Cross-references quoted prices against your live product catalog. Prevents AI from promising incorrect discounts or out-of-date pricing.",
    color: "var(--color-ember-300)",
    bg: "rgba(255,188,77,0.1)",
  },
  {
    icon: Flame,
    title: "Toxicity Filter",
    description:
      "Multi-lingual toxicity detection (Uzbek + Russian + English). Ensures AI responses remain professional even when customers don't.",
    color: "#f87171",
    bg: "rgba(248,113,113,0.1)",
  },
  {
    icon: Copy,
    title: "Duplicate Detection",
    description:
      "Identifies repeated messages and near-duplicate responses to prevent spam, reply loops, and the uncanny feeling of talking to a broken bot.",
    color: "var(--color-ember-400)",
    bg: "rgba(255,157,26,0.1)",
  },
  {
    icon: Lock,
    title: "Leak Prevention",
    description:
      "Stops the AI from disclosing internal pricing strategies, supplier details, unreleased products, or any information flagged as confidential.",
    color: "var(--color-trust-300)",
    bg: "rgba(79,209,189,0.1)",
  },
  {
    icon: Users,
    title: "Competitor Mention",
    description:
      "Detects references to competitor brands and either deflects gracefully or escalates to a human — no accidental competitor endorsements.",
    color: "#c084fc",
    bg: "rgba(192,132,252,0.1)",
  },
  {
    icon: Compass,
    title: "Off-Topic Guard",
    description:
      "Keeps the AI on-brand and on-topic. Rejects responses that drift outside your configured business scope, preventing hallucinations from leaking through.",
    color: "var(--color-ember-500)",
    bg: "rgba(240,125,0,0.1)",
  },
  {
    icon: AlignLeft,
    title: "Length Validation",
    description:
      "Enforces configurable character limits. No response that's too terse to be useful, and no wall-of-text that kills the conversation.",
    color: "var(--color-neutral-400)",
    bg: "rgba(161,161,170,0.1)",
  },
  {
    icon: Scale,
    title: "Compliance Check",
    description:
      "Flags responses that could expose the brand to regulatory issues — false advertising claims, unverifiable guarantees, or legally sensitive language.",
    color: "var(--color-trust-500)",
    bg: "rgba(13,158,137,0.1)",
  },
];

export function Guardrails() {
  return (
    <Section id="guardrails" variant="surface">
      <Container>
        <FadeIn>
          <SectionHeader
            overline="Safety First"
            title={
              <>
                9 guardrails.{" "}
                <span className="gradient-ember">Every response.</span>
              </>
            }
            description="Before any AI reply reaches your customer, it must pass nine parallel safety checks. All nine. Every time. There are no exceptions — the guardrails run even in full-auto mode."
            center
          />
        </FadeIn>

        <FadeInStagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {guardrails.map((guardrail, idx) => {
            const Icon = guardrail.icon;
            return (
              <FadeInChild key={guardrail.title}>
                <motion.div
                  whileHover={{ y: -4, scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                  className="surface-card p-5 h-full group cursor-default"
                  style={{
                    borderColor: "rgba(255,255,255,0.06)",
                  }}
                  onHoverStart={(e) => {
                    const el = e.target as HTMLElement;
                    el.closest?.(".surface-card")?.setAttribute(
                      "style",
                      `border-color: ${guardrail.color}30; box-shadow: 0 0 24px -6px ${guardrail.bg}`
                    );
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300"
                      style={{ background: guardrail.bg }}
                    >
                      <Icon className="h-4.5 w-4.5" style={{ color: guardrail.color }} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <h3 className="text-sm font-semibold text-[var(--color-neutral-100)]">
                          {guardrail.title}
                        </h3>
                        <span
                          className="text-[10px] font-bold font-mono opacity-60"
                          style={{ color: guardrail.color }}
                        >
                          G{idx + 1}
                        </span>
                      </div>
                      <p className="text-xs text-[var(--color-neutral-500)] leading-relaxed">
                        {guardrail.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </FadeInChild>
            );
          })}
        </FadeInStagger>

        {/* Bottom note */}
        <FadeIn delay={0.3}>
          <div className="mt-12 text-center">
            <p className="text-sm text-[var(--color-neutral-500)]">
              All 9 checks run in parallel via{" "}
              <span className="font-mono text-[var(--color-neutral-400)]">amt-guard</span>
              {" "}— adding zero latency to the pipeline.
            </p>
          </div>
        </FadeIn>
      </Container>
    </Section>
  );
}
