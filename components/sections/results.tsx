"use client";

import { motion } from "framer-motion";
import { TrendingUp, Clock, DollarSign, Star } from "lucide-react";
import { Section, Container, SectionHeader } from "@/components/ui/section";
import { FadeIn, FadeInStagger, FadeInChild } from "@/components/motion/fade-in";
import { Badge } from "@/components/ui/badge";

const results = [
  {
    metric: "3×",
    label: "Response rate",
    description:
      "After switching to Qaqnuz, a Tashkent fashion brand tripled their Instagram DM response rate — from 31% to 94% — within the first two weeks of deployment.",
    icon: TrendingUp,
    color: "var(--color-ember-400)",
    bg: "rgba(255,157,26,0.08)",
    category: "Engagement",
  },
  {
    metric: "24/7",
    label: "Always-on coverage",
    description:
      "A cosmetics brand eliminated response delays during off-hours and weekends. AI now handles 78% of inquiries autonomously with no degradation in customer satisfaction.",
    icon: Clock,
    color: "var(--color-trust-400)",
    bg: "rgba(29,184,161,0.08)",
    category: "Operations",
  },
  {
    metric: "60%",
    label: "Lower cost per conversation",
    description:
      "An electronics retailer reduced per-conversation support cost by 60% by automating routine inquiries, price checks, and delivery queries through the AI pipeline.",
    icon: DollarSign,
    color: "#4ade80",
    bg: "rgba(74,222,128,0.08)",
    category: "Cost",
  },
];

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

        <FadeInStagger className="grid md:grid-cols-3 gap-6">
          {results.map((result) => {
            const Icon = result.icon;
            return (
              <FadeInChild key={result.metric}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="surface-card p-8 flex flex-col h-full"
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

                  <div
                    className="text-6xl font-bold leading-none mb-2"
                    style={{ color: result.color }}
                  >
                    {result.metric}
                  </div>
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
              </FadeInChild>
            );
          })}
        </FadeInStagger>
      </Container>
    </Section>
  );
}
