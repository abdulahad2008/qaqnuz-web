"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Tag,
  Database,
  PenLine,
  Shield,
  Star,
  GitMerge,
  Send,
  ChevronRight,
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
    description: "Determines whether AI should respond. Filters spam, bot activity, and out-of-scope interactions before spending any LLM tokens.",
    detail: "Score ≥ 0.6 required to advance",
  },
  {
    id: "classify",
    label: "Classify",
    icon: Tag,
    color: "var(--color-ember-300)",
    glowColor: "rgba(255,188,77,0.25)",
    description: "amt-intel detects purchase intent, sentiment, language, and interaction type (DM / comment / story mention) with fine-grained confidence scoring.",
    detail: "Intent · Sentiment · Language · Priority",
  },
  {
    id: "retrieve",
    label: "Retrieve",
    icon: Database,
    color: "var(--color-ember-400)",
    glowColor: "rgba(255,157,26,0.25)",
    description: "amt-rag performs semantic vector search over your brand knowledge base (product catalog, FAQs, policies) using pgvector embeddings.",
    detail: "RAG · pgvector · Semantic search",
  },
  {
    id: "compose",
    label: "Compose",
    icon: PenLine,
    color: "var(--color-ember-500)",
    glowColor: "rgba(240,125,0,0.3)",
    description: "LLM provider (OpenRouter / Anthropic / OpenAI) generates a brand-voice reply grounded in retrieved context and brand persona configuration.",
    detail: "Brand voice · Multilingual · Context-grounded",
  },
  {
    id: "guard",
    label: "Guard",
    icon: Shield,
    color: "var(--color-trust-400)",
    glowColor: "rgba(29,184,161,0.3)",
    description: "amt-guard runs 9 parallel safety checks: PII detection, price validation, toxicity filtering, duplicate detection, data leak prevention, competitor mention, off-topic, length, and compliance.",
    detail: "9 safety checks · Zero-tolerance on PII",
  },
  {
    id: "evaluate",
    label: "Evaluate",
    icon: Star,
    color: "var(--color-trust-500)",
    glowColor: "rgba(13,158,137,0.3)",
    description: "amt-eval scores response quality 0–100 across coherence, tone match, helpfulness, and factual accuracy. Scores below threshold are re-queued.",
    detail: "Quality score 0–100 · Re-queue on fail",
  },
  {
    id: "trust",
    label: "Trust Gate",
    icon: GitMerge,
    color: "var(--color-trust-300)",
    glowColor: "rgba(79,209,189,0.25)",
    description: "amt-trust applies your brand's current trust level (L1–L4) to decide: auto-publish, queue for review, or reject. Advances autonomy based on historical approval patterns.",
    detail: "L1 Full Review → L4 Full Auto",
  },
  {
    id: "publish",
    label: "Publish",
    icon: Send,
    color: "#4ade80",
    glowColor: "rgba(74,222,128,0.25)",
    description: "amt-comms publishes to Instagram via the official API with full audit trail. Every published response is logged with pipeline trace, quality score, and operator attribution.",
    detail: "Instagram API · Full audit trail",
  },
];

export function PipelineFlow() {
  const [activeStage, setActiveStage] = useState<string | null>(null);
  const active = stages.find((s) => s.id === activeStage);

  return (
    <Section id="pipeline" variant="surface">
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
            description="Every message your brand receives passes through a fully audited AI pipeline before a single word is published. Hover any stage to explore."
            center
          />
        </FadeIn>

        {/* Pipeline nodes */}
        <div className="relative mt-4">
          {/* Connection line */}
          <div className="absolute top-[2.75rem] left-[calc(50%_-_50vw_+_5%)] right-[calc(50%_-_50vw_+_5%)] lg:left-[3.5rem] lg:right-[3.5rem] h-px bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.1)] to-transparent hidden lg:block" />

          <div className="flex flex-col lg:flex-row gap-2 lg:gap-1 lg:justify-between">
            {stages.map((stage, idx) => {
              const Icon = stage.icon;
              const isActive = activeStage === stage.id;
              return (
                <div
                  key={stage.id}
                  className="flex lg:flex-col items-center lg:items-center gap-3 lg:gap-0 cursor-pointer group"
                  onClick={() =>
                    setActiveStage((prev) => (prev === stage.id ? null : stage.id))
                  }
                  onMouseEnter={() => setActiveStage(stage.id)}
                  onMouseLeave={() => setActiveStage(null)}
                >
                  {/* Step number + connector (mobile) */}
                  {idx < stages.length - 1 && (
                    <ChevronRight
                      className="h-3 w-3 text-[var(--color-neutral-700)] lg:hidden shrink-0"
                    />
                  )}

                  {/* Node */}
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.97 }}
                    className="relative flex-shrink-0 w-14 h-14 lg:w-16 lg:h-16 rounded-2xl border transition-all duration-300 flex items-center justify-center z-10"
                    style={{
                      background: isActive
                        ? `radial-gradient(circle at center, ${stage.glowColor} 0%, var(--color-bg-elevated) 100%)`
                        : "var(--color-bg-elevated)",
                      borderColor: isActive
                        ? stage.color
                        : "rgba(255,255,255,0.08)",
                      boxShadow: isActive ? `0 0 24px -4px ${stage.glowColor}` : "none",
                    }}
                  >
                    <Icon
                      className="h-6 w-6 transition-colors duration-300"
                      style={{ color: isActive ? stage.color : "var(--color-neutral-500)" }}
                    />
                    {/* Active indicator — CSS only, no JS animation loop */}
                    {isActive && (
                      <span
                        className="absolute inset-0 rounded-2xl border opacity-60"
                        style={{ borderColor: stage.color }}
                      />
                    )}
                  </motion.div>

                  {/* Label */}
                  <div className="lg:mt-3 text-center min-w-0">
                    <p
                      className="text-xs font-semibold transition-colors duration-200 truncate"
                      style={{
                        color: isActive ? stage.color : "var(--color-neutral-400)",
                      }}
                    >
                      {stage.label}
                    </p>
                    <p className="hidden lg:block text-[10px] text-[var(--color-neutral-600)] mt-0.5">
                      {stage.detail.split("·")[0].trim()}
                    </p>
                  </div>
                </div>
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
              transition={{ duration: 0.25 }}
              className="mt-8 surface-card p-6 lg:p-8 flex flex-col lg:flex-row gap-6 items-start"
              style={{
                borderColor: `rgba(${active.color
                  .replace("var(--color-ember-300)", "255,188,77")
                  .replace("var(--color-ember-400)", "255,157,26")
                  .replace("var(--color-ember-500)", "240,125,0")
                  .replace("var(--color-trust-300)", "79,209,189")
                  .replace("var(--color-trust-400)", "29,184,161")
                  .replace("var(--color-trust-500)", "13,158,137")
                  .replace("var(--color-neutral-400)", "161,161,170")}, 0.25)`,
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: `${active.glowColor}` }}
              >
                <active.icon className="h-6 w-6" style={{ color: active.color }} />
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
    </Section>
  );
}
