"use client";

import { useRef, useEffect } from "react";
import {
  motion, useInView, useMotionValue, useTransform, animate, useReducedMotion,
} from "framer-motion";
import { TrendingUp, Clock, DollarSign } from "lucide-react";
import { useTranslations } from "next-intl";
import { Section, Container, SectionHeader } from "@/components/ui/section";
import { FadeIn } from "@/components/motion/fade-in";

const RESULT_VISUAL = [
  { icon: TrendingUp, color: "#ff9d1a", rgb: "255,157,26", bg: "rgba(255,157,26,0.08)",
    numericTarget: 3,  numericSuffix: "×" },
  { icon: Clock,      color: "#1db8a1", rgb: "29,184,161", bg: "rgba(29,184,161,0.08)",
    numericTarget: null as null, numericSuffix: "" },
  { icon: DollarSign, color: "#4ade80", rgb: "74,222,128", bg: "rgba(74,222,128,0.08)",
    numericTarget: 60, numericSuffix: "%" },
] as const;

function AnimatedCounter({
  target,
  suffix = "",
  color,
  staticValue,
}: {
  target: number | null;
  suffix?: string;
  color: string;
  staticValue: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const count = useMotionValue(0);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const rounded = useTransform(count, (v) => Math.round(v).toString());

  useEffect(() => {
    if (!inView || target === null || reduced) return;
    const controls = animate(count, target, { duration: 1.6, ease: "easeOut" });
    return () => controls.stop();
  }, [inView, target, reduced, count]);

  if (target === null || reduced) {
    return (
      <div className="text-6xl font-display italic leading-none mb-2" style={{ color }}>
        {staticValue}
      </div>
    );
  }

  return (
    <div ref={ref} className="text-6xl font-display italic leading-none mb-2" style={{ color }}>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </div>
  );
}

export function Results() {
  const t = useTranslations("results");
  const rawItems = t.raw("items") as Array<{
    metric: string;
    label: string;
    description: string;
    category: string;
  }>;
  const items = RESULT_VISUAL.map((vis, i) => ({ ...vis, ...rawItems[i] }));

  return (
    <Section id="results" variant="surface">
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
            description={t("disclaimer")}
            center
          />
        </FadeIn>

        <div className="mt-12 flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 md:grid md:grid-cols-3 md:overflow-x-visible md:snap-none md:pb-0 scrollbar-none">
          {items.map((result, i) => {
            const Icon = result.icon;
            return (
              <FadeIn key={result.label} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="surface-card p-8 flex flex-col h-full shrink-0 w-[85vw] md:w-auto snap-center"
                  style={{ borderColor: `rgba(${result.rgb},0.25)` }}
                >
                  <span
                    className="self-start mb-5 rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide"
                    style={{ color: result.color, borderColor: `rgba(${result.rgb},0.3)`, background: result.bg }}
                  >
                    {result.category}
                  </span>

                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: result.bg }}
                  >
                    <Icon className="h-6 w-6" style={{ color: result.color }} />
                  </div>

                  <AnimatedCounter
                    target={result.numericTarget ?? null}
                    suffix={result.numericSuffix}
                    color={result.color}
                    staticValue={result.metric}
                  />

                  <div className="text-lg font-semibold text-foreground mb-3">{result.label}</div>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                    {result.description}
                  </p>

                  <div className="mt-5 pt-5 border-t border-border">
                    <p className="text-[10px] text-muted-foreground italic">{t("exampleNote")}</p>
                  </div>
                </motion.div>
              </FadeIn>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
