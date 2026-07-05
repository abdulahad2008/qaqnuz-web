"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useReducedMotion } from "framer-motion";
import {
  Tag, Database, PenLine, Shield, Star, GitMerge, Send,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Section, Container, SectionHeader } from "@/components/ui/section";
import { FadeIn } from "@/components/motion/fade-in";

const STAGE_VISUAL = [
  { id: "classify", icon: Tag,      color: "#ffbc4d", rgb: "255,188,77" },
  { id: "retrieve", icon: Database, color: "#ff9d1a", rgb: "255,157,26" },
  { id: "compose",  icon: PenLine,  color: "#f07d00", rgb: "240,125,0" },
  { id: "guard",    icon: Shield,   color: "#1db8a1", rgb: "29,184,161" },
  { id: "evaluate", icon: Star,     color: "#0d9e89", rgb: "13,158,137" },
  { id: "trust",    icon: GitMerge, color: "#4fd1bd", rgb: "79,209,189" },
  { id: "publish",  icon: Send,     color: "#4ade80", rgb: "74,222,128" },
] as const;

export function PipelineFlow() {
  const t = useTranslations("pipeline");
  const rawStages = t.raw("stages") as Array<{ label: string; detail: string; description: string }>;
  const stages = STAGE_VISUAL.map((cfg, i) => ({ ...cfg, ...rawStages[i] }));

  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.85", "center 0.3"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (reduced) return;
    if (latest <= 0) { setActiveIdx(null); return; }
    setActiveIdx(Math.min(Math.floor(latest * stages.length), stages.length - 1));
  });

  const active = activeIdx !== null ? stages[activeIdx] : null;

  return (
    <Section id="pipeline" variant="surface">
      <div ref={sectionRef}>
        <Container>
          <FadeIn>
            <SectionHeader
              overline={t("overline")}
              title={
                <>
                  {t("title")}{" "}
                  <em className="not-italic text-accent">{t("titleEmphasis")}</em>
                </>
              }
              description={t("description")}
              center
            />
          </FadeIn>

          {/* Pipeline nodes */}
          <div className="relative mt-4">
            {/* Progress trail */}
            <div className="absolute top-[2.75rem] left-[3.5rem] right-[3.5rem] h-px bg-border hidden lg:block overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 origin-left"
                style={{
                  background: "linear-gradient(90deg, hsl(var(--accent)), #818cf8)",
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
                    <motion.div
                      animate={
                        reduced ? {} : {
                          scale: isCurrent ? 1.12 : isActive ? 1.04 : 1,
                          boxShadow: isCurrent
                            ? `0 0 28px -4px rgba(${stage.rgb},0.5)`
                            : isActive
                            ? `0 0 16px -4px rgba(${stage.rgb},0.3)`
                            : "none",
                        }
                      }
                      transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
                      className="relative flex-shrink-0 w-14 h-14 lg:w-16 lg:h-16 rounded-2xl border bg-background flex items-center justify-center z-10 will-change-transform"
                      style={{
                        borderColor: isActive
                          ? `rgba(${stage.rgb},0.45)`
                          : "hsl(var(--border))",
                        background: isActive
                          ? `radial-gradient(circle at center, rgba(${stage.rgb},0.12) 0%, hsl(var(--background)) 100%)`
                          : undefined,
                      }}
                    >
                      <Icon
                        className="h-6 w-6 transition-colors duration-300"
                        style={{ color: isActive ? stage.color : "hsl(var(--muted-foreground))" }}
                      />
                      {isCurrent && !reduced && (
                        <span
                          className="absolute inset-0 rounded-2xl border opacity-60 animate-[glow-pulse_1.5s_ease-in-out_infinite]"
                          style={{ borderColor: stage.color }}
                        />
                      )}
                    </motion.div>

                    <div className="lg:mt-3 text-center min-w-0">
                      <p
                        className="text-xs font-semibold transition-colors duration-300 truncate"
                        style={{ color: isActive ? stage.color : "hsl(var(--muted-foreground))" }}
                      >
                        {stage.label}
                      </p>
                      <p className="hidden lg:block text-[10px] text-muted-foreground mt-0.5">
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
                className="mt-8 surface-card p-6 lg:p-8 flex flex-col lg:flex-row gap-6 items-start"
                style={{ borderColor: `rgba(${active.rgb},0.3)` }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: `rgba(${active.rgb},0.10)` }}
                >
                  <active.icon className="h-6 w-6" style={{ color: active.color }} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{active.label}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-3">{active.description}</p>
                  <p className="text-xs font-mono text-muted-foreground/70">{active.detail}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Container>
      </div>
    </Section>
  );
}
