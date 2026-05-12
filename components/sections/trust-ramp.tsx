"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Eye, Zap, Rocket, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Section, Container, SectionHeader } from "@/components/ui/section";
import { FadeIn } from "@/components/motion/fade-in";

const LEVEL_VISUAL = [
  { icon: Eye,    color: "#a1a1aa", accent: "rgba(161,161,170,0.10)", border: "rgba(161,161,170,0.25)", autoRate: 0   },
  { icon: Shield, color: "#ffbc4d", accent: "rgba(255,188,77,0.10)",  border: "rgba(255,188,77,0.30)",  autoRate: 40  },
  { icon: Zap,    color: "#ff9d1a", accent: "rgba(255,157,26,0.10)",  border: "rgba(255,157,26,0.30)",  autoRate: 80  },
  { icon: Rocket, color: "#1db8a1", accent: "rgba(29,184,161,0.10)",  border: "rgba(29,184,161,0.30)",  autoRate: 98  },
] as const;

export function TrustRamp() {
  const t = useTranslations("trustRamp");
  const rawLevels = t.raw("levels") as Array<{
    level: string;
    name: string;
    description: string;
    features: string[];
  }>;

  const levels = LEVEL_VISUAL.map((vis, i) => ({ ...vis, ...rawLevels[i] }));
  const [selected, setSelected] = useState(0);
  const level = levels[selected];
  const Icon = level.icon;

  return (
    <Section id="trust-ramp">
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
                      borderColor: isSelected ? l.border : "hsl(var(--border))",
                    }}
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 border"
                      style={{
                        background: isSelected ? l.accent : "hsl(var(--secondary))",
                        borderColor: isSelected ? l.border : "hsl(var(--border))",
                      }}
                    >
                      <LIcon className="h-5 w-5" style={{ color: l.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold font-mono" style={{ color: l.color }}>
                          {l.level}
                        </span>
                        <span className="text-sm font-semibold text-foreground">{l.name}</span>
                      </div>
                      <div className="mt-2 h-1.5 rounded-full bg-border overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ background: l.color }}
                          initial={{ width: 0 }}
                          animate={{ width: `${l.autoRate}%` }}
                          transition={{ duration: 0.6, ease: "easeOut" }}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {l.autoRate}% {t("autoPublishLabel")}
                      </p>
                    </div>
                    <ChevronRight
                      className="h-4 w-4 shrink-0 transition-colors"
                      style={{ color: isSelected ? l.color : "hsl(var(--muted-foreground))" }}
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
                style={{ borderColor: level.border }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ background: level.accent }}
                  >
                    <Icon className="h-6 w-6" style={{ color: level.color }} />
                  </div>
                  <div>
                    <p className="text-xs font-bold font-mono" style={{ color: level.color }}>
                      {level.level}
                    </p>
                    <h3 className="text-xl font-semibold text-foreground">{level.name}</h3>
                  </div>
                </div>

                <p className="text-muted-foreground leading-relaxed mb-6">{level.description}</p>

                <ul className="space-y-3">
                  {level.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-3 text-sm">
                      <div
                        className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                        style={{ background: level.color }}
                      />
                      <span className="text-muted-foreground">{feat}</span>
                    </li>
                  ))}
                </ul>

                {/* Auto-publish meter */}
                <div className="mt-8 p-4 rounded-xl bg-secondary border border-border">
                  <div className="flex justify-between text-xs text-muted-foreground mb-2">
                    <span>{t("autoPublishRate")}</span>
                    <span style={{ color: level.color }} className="font-bold">
                      {level.autoRate}%
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-border">
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
