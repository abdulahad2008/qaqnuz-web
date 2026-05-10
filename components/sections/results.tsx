"use client";

import { useRef, useEffect } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
  useReducedMotion,
} from "framer-motion";
import { TrendingUp, Clock, DollarSign } from "lucide-react";
import { Section, Container, SectionHeader } from "@/components/ui/section";
import { FadeIn } from "@/components/motion/fade-in";
import { Badge } from "@/components/ui/badge";

const results = [
  {
    metric: "3×",
    numericTarget: 3,
    numericSuffix: "×",
    label: "Response rate",
    description:
      "After switching to Qaqnuz, a Tashkent fashion brand tripled their Instagram DM response rate — from 31% to 94% — within the first two weeks of deployment.",
    icon: TrendingUp,
    color: "var(--color-ember-400)",
    rgb: "255,157,26",
    bg: "rgba(255,157,26,0.08)",
    category: "Engagement",
    decimals: 0,
  },
  {
    metric: "24/7",
    numericTarget: null,
    label: "Always-on coverage",
    description:
      "A cosmetics brand eliminated response delays during off-hours and weekends. AI now handles 78% of inquiries autonomously with no degradation in customer satisfaction.",
    icon: Clock,
    color: "var(--color-trust-400)",
    rgb: "29,184,161",
    bg: "rgba(29,184,161,0.08)",
    category: "Operations",
    decimals: 0,
  },
  {
    metric: "60%",
    numericTarget: 60,
    numericSuffix: "%",
    label: "Lower cost per conversation",
    description:
      "An electronics retailer reduced per-conversation support cost by 60% by automating routine inquiries, price checks, and delivery queries through the AI pipeline.",
    icon: DollarSign,
    color: "#4ade80",
    rgb: "74,222,128",
    bg: "rgba(74,222,128,0.08)",
    category: "Cost",
    decimals: 0,
  },
];

function AnimatedCounter({
  target,
  suffix = "",
  color,
  staticValue,
  decimals = 0,
}: {
  target: number | null;
  suffix?: string;
  color: string;
  staticValue: string;
  decimals?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const count = useMotionValue(0);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const rounded = useTransform(count, (v) =>
    decimals > 0 ? v.toFixed(decimals) : Math.round(v).toString()
  );

  useEffect(() => {
    if (!inView || target === null || reduced) return;
    const controls = animate(count, target, {
      duration: 1.6,
      ease: "easeOut",
    });
    return () => controls.stop();
  }, [inView, target, reduced, count]);

  if (target === null || reduced) {
    return (
      <div className="text-6xl font-bold leading-none mb-2" style={{ color }}>
        {staticValue}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className="text-6xl font-bold leading-none mb-2"
      style={{ color }}
    >
      <motion.span>{rounded}</motion.span>
      {suffix}
    </div>
  );
}

export function Results() {
  return (
    <Section id="results" variant="surface">
      <Container>
        <FadeIn>
          <SectionHeader
            overline="Example Results"
            title={
              <>
                What brands achieve{" "}
                <span className="gradient-ember">with Qaqnuz.</span>
              </>
            }
            description="These are illustrative examples based on typical outcomes. Your results will depend on brand size, message volume, and configuration."
            center
          />
        </FadeIn>

        {/* Horizontal scroll-snap on mobile, grid on desktop */}
        <div className="mt-12 flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 md:grid md:grid-cols-3 md:overflow-x-visible md:snap-none md:pb-0 scrollbar-none">
          {results.map((result, i) => {
            const Icon = result.icon;
            return (
              <FadeIn key={result.label} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="glass rounded-2xl p-8 flex flex-col h-full shrink-0 w-[85vw] md:w-auto snap-center"
                  style={{ borderColor: `rgba(${result.rgb},0.18)` }}
                >
                  <Badge variant="ember" className="self-start mb-5 text-[10px]">
                    {result.category}
                  </Badge>

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
                    decimals={result.decimals}
                  />

                  <div className="text-lg font-semibold text-[var(--color-neutral-100)] mb-3">
                    {result.label}
                  </div>
                  <p className="text-sm text-[var(--color-neutral-400)] leading-relaxed flex-1">
                    {result.description}
                  </p>

                  <div className="mt-5 pt-5 border-t border-[rgba(255,255,255,0.06)]">
                    <p className="text-[10px] text-[var(--color-neutral-600)] italic">
                      Example result — individual outcomes will vary.
                    </p>
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
