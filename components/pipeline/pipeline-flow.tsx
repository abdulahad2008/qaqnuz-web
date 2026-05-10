"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useReducedMotion } from "framer-motion";
import {
  Search,
  Tag,
  Database,
  PenLine,
  Shield,
  Star,
  GitMerge,
  Send,
} from "lucide-react";
import { Section, Container, SectionHeader } from "@/components/ui/section";
import { FadeIn } from "@/components/motion/fade-in";

const stages = [
  {
    id: "qualify",
    label: "Qualify",
    icon: Search,
    color: "var(--color-neutral-400)",
    glowColor: "rgba(161,161,170,0.2)",
    rgb: "161,161,170",
    description:
      "Determines whether AI should respond. Filters spam, bot activity, and out-of-scope interactions before spending any LLM tokens.",
    detail: "Score ≥ 0.6 required to advance",
  },
  {
    id: "classify",
    label: "Classify",
    icon: Tag,
    color: "var(--color-ember-300)",
    glowColor: "rgba(255,188,77,0.25)",
    rgb: "255,188,77",
    description:
      "amt-intel detects purchase intent, sentiment, language, and interaction type with fine-grained confidence scoring.",
    detail: "Intent · Sentiment · Language · Priority",
  },
  {
    id: "retrieve",
    label: "Retrieve",
    icon: Database,
    color: "var(--color-ember-400)",
    glowColor: "rgba(255,157,26,0.25)",
    rgb: "255,157,26",
    description:
      "amt-rag performs semantic vector search over your brand knowledge base using pgvector embeddings.",
    detail: "RAG · pgvector · Semantic search",
  },
  {
    id: "compose",
    label: "Compose",
    icon: PenLine,
    color: "var(--color-ember-500)",
    glowColor: "rgba(240,125,0,0.3)",
    rgb: "240,125,0",
    description:
      "LLM provider generates a brand-voice reply grounded in retrieved context and brand persona configuration.",
    detail: "Brand voice · Multilingual · Context-grounded",
  },
  {
    id: "guard",
    label: "Guard",
    icon: Shield,
    color: "var(--color-trust-400)",
    glowColor: "rgba(29,184,161,0.3)",
    rgb: "29,184,161",
    description:
      "amt-guard runs 9 parallel safety checks: PII, price validation, toxicity, duplicates, leak prevention, and more.",
    detail: "9 safety checks · Zero-tolerance on PII",
  },
  {
    id: "evaluate",
    label: "Evaluate",
    icon: Star,
    color: "var(--color-trust-500)",
    glowColor: "rgba(13,158,137,0.3)",
    rgb: "13,158,137",
    description:
      "amt-eval scores response quality 0–100 across coherence, tone match, helpfulness, and accuracy.",
    detail: "Quality score 0–100 · Re-queue on fail",
  },
  {
    id: "trust",
    label: "Trust Gate",
    icon: GitMerge,
    color: "var(--color-trust-300)",
    glowColor: "rgba(79,209,189,0.25)",
    rgb: "79,209,189",
    description:
      "amt-trust applies your brand's trust level (L1–L4) to decide: auto-publish, queue for review, or reject.",
    detail: "L1 Full Review → L4 Full Auto",
  },
  {
    id: "publish",
    label: "Publish",
    icon: Send,
    color: "#4ade80",
    glowColor: "rgba(74,222,128,0.25)",
    rgb: "74,222,128",
    description:
      "amt-comms publishes to Instagram via the official API with full audit trail and pipeline trace.",
    detail: "Instagram API · Full audit trail",
  },
];

export function PipelineFlow() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.85", "center 0.3"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (reduced) return;
    if (latest <= 0) {
      setActiveIdx(null);
      return;
    }
    const idx = Math.min(
      Math.floor(latest * stages.length),
      stages.length - 1
    );
    setActiveIdx(idx);
  });

  const active = activeIdx !== null ? stages[activeIdx] : null;

  return (
    <Section id="pipeline" variant="surface">
      <div ref={sectionRef}>
        <Container>
          <FadeIn>
            <SectionHeader
              overline="The AI Pipeline"
              title={
                <>
                  Eight stages.{" "}
                  <span className="gradient-ember">Zero compromises.</span>
                </>
              }
              description="Every message your brand receives passes through a fully audited AI pipeline before a single word is published. Scroll to walk through each stage."
              center
            />
          </FadeIn>

          {/* Pipeline nodes */}
          <div className="relative mt-4">
            {/* Ember trail — scaleX driven by progress */}
            <div className="absolute top-[2.75rem] left-[3.5rem] right-[3.5rem] h-px bg-[rgba(255,255,255,0.07)] hidden lg:block overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 origin-left"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(240,125,0,0.8), rgba(255,188,77,0.6))",
                  scaleX: reduced ? 1 : scrollYProgress,
                }}
              />
            </div>

            <div className="flex flex-col lg:flex-row gap-2 lg:gap-1 lg:justify-between">
              {stages.map((stage, idx) => {
                const Icon = stage.icon;
                const isActive = activeIdx !== null && idx <= activeIdx;
                const isCurrent = activeIdx === idx;

                return (
                  <button
                    key={stage.id}
                    onClick={() => setActiveIdx(activeIdx === idx ? null : idx)}
                    className="flex lg:flex-col items-center lg:items-center gap-3 lg:gap-0 group focus:outline-none"
                  >
                    {/* Node */}
                    <motion.div
                      animate={
                        reduced
                          ? {}
                          : {
                              scale: isCurrent ? 1.12 : isActive ? 1.04 : 1,
                              boxShadow: isCurrent
                                ? `0 0 28px -4px rgba(${stage.rgb},0.7)`
                                : isActive
                                ? `0 0 16px -4px rgba(${stage.rgb},0.4)`
                                : "none",
                            }
                      }
                      transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
                      className="relative flex-shrink-0 w-14 h-14 lg:w-16 lg:h-16 rounded-2xl border glass flex items-center justify-center z-10 will-change-transform"
                      style={{
                        borderColor: isActive
                          ? `rgba(${stage.rgb},0.5)`
                          : "rgba(255,255,255,0.08)",
                        background: isActive
                          ? `radial-gradient(circle at center, rgba(${stage.rgb},0.15) 0%, rgba(255,255,255,0.04) 100%)`
                          : undefined,
                      }}
                    >
                      <Icon
                        className="h-6 w-6 transition-colors duration-300"
                        style={{
                          color: isActive ? stage.color : "var(--color-neutral-600)",
                        }}
                      />
                      {isCurrent && !reduced && (
                        <span
                          className="absolute inset-0 rounded-2xl border opacity-60 animate-[glow-pulse_1.5s_ease-in-out_infinite]"
                          style={{ borderColor: stage.color }}
                        />
                      )}
                    </motion.div>

                    {/* Label */}
                    <div className="lg:mt-3 text-center min-w-0">
                      <p
                        className="text-xs font-semibold transition-colors duration-300 truncate"
                        style={{
                          color: isActive
                            ? stage.color
                            : "var(--color-neutral-600)",
                        }}
                      >
                        {stage.label}
                      </p>
                      <p className="hidden lg:block text-[10px] text-[var(--color-neutral-700)] mt-0.5">
                        {stage.detail.split("·")[0].trim()}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Detail panel */}
          <AnimatePresence mode="wait">
            {active && (
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.25, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="mt-8 glass rounded-2xl p-6 lg:p-8 flex flex-col lg:flex-row gap-6 items-start"
                style={{ borderColor: `rgba(${active.rgb},0.25)` }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: `rgba(${active.rgb},0.12)` }}
                >
                  <active.icon
                    className="h-6 w-6"
                    style={{ color: active.color }}
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[var(--color-neutral-50)] mb-2">
                    {active.label}
                  </h3>
                  <p className="text-[var(--color-neutral-400)] leading-relaxed mb-3">
                    {active.description}
                  </p>
                  <p className="text-xs font-mono text-[var(--color-neutral-600)]">
                    {active.detail}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Container>
      </div>
    </Section>
  );
}
