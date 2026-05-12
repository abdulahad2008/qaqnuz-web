"use client";

import { useRef, useState } from "react";
import {
  motion, AnimatePresence, useScroll, useTransform, useReducedMotion,
} from "framer-motion";
import {
  MessageSquare, Building2, Activity, ListChecks, BarChart3, TrendingUp,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Section, Container, SectionHeader } from "@/components/ui/section";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { FadeIn } from "@/components/motion/fade-in";

type PanelTranslation = {
  label: string;
  description: string;
  stats: { label: string; value: string }[];
};

const PANEL_VISUAL = [
  { id: "inbox",    icon: MessageSquare, accentRgb: "99,102,241"  },
  { id: "brands",   icon: Building2,     accentRgb: "29,184,161"  },
  { id: "monitor",  icon: Activity,      accentRgb: "192,132,252" },
  { id: "queue",    icon: ListChecks,    accentRgb: "240,125,0"   },
  { id: "analytics",icon: BarChart3,     accentRgb: "13,158,137"  },
  { id: "metrics",  icon: TrendingUp,    accentRgb: "255,188,77"  },
] as const;

const CHART_HEIGHTS: Record<string, number[]> = {};
PANEL_VISUAL.forEach((p) => {
  CHART_HEIGHTS[p.id] = Array.from({ length: 18 }, (_, i) =>
    20 + Math.sin(i * 0.8) * 30 + ((i * 37 + 13) % 20)
  );
});

function MockPanel({
  panel,
  allIcons,
}: {
  panel: (typeof PANEL_VISUAL)[number] & PanelTranslation;
  allIcons: typeof PANEL_VISUAL;
}) {
  const Icon = panel.icon;
  const chartHeights = CHART_HEIGHTS[panel.id];
  return (
    <div
      className="relative w-full aspect-[16/9] rounded-xl overflow-hidden border border-[rgba(0,0,0,0.08)]"
      style={{ background: "#f8f9fc" }}
    >
      <div className="absolute inset-0 flex flex-col">
        {/* Browser chrome */}
        <div className="flex items-center gap-2 px-4 h-9 border-b border-border bg-white/80 backdrop-blur-sm">
          <div className="w-2 h-2 rounded-full bg-rose-400/70" />
          <div className="w-2 h-2 rounded-full bg-amber-400/70" />
          <div className="w-2 h-2 rounded-full bg-emerald-400/70" />
          <div className="flex-1" />
          <div
            className="text-[10px] font-mono px-2 py-0.5 rounded border"
            style={{
              color: `rgba(${panel.accentRgb},0.9)`,
              background: `rgba(${panel.accentRgb},0.06)`,
              borderColor: `rgba(${panel.accentRgb},0.2)`,
            }}
          >
            Mission Control · {panel.label}
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <div className="w-14 border-r border-border flex flex-col items-center py-3 gap-3 bg-secondary/60">
            {allIcons.map((p) => {
              const PIcon = p.icon;
              const isActive = p.id === panel.id;
              return (
                <div
                  key={p.id}
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: isActive ? `rgba(${panel.accentRgb},0.12)` : "transparent" }}
                >
                  <PIcon
                    className="h-3.5 w-3.5"
                    style={{
                      color: isActive
                        ? `rgba(${panel.accentRgb},1)`
                        : "hsl(var(--muted-foreground))",
                    }}
                  />
                </div>
              );
            })}
          </div>

          {/* Main content */}
          <div className="flex-1 p-4 flex flex-col gap-3 bg-background/80">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon
                  className="h-4 w-4"
                  style={{ color: `rgba(${panel.accentRgb},1)` }}
                />
                <span
                  className="text-xs font-semibold"
                  style={{ color: `rgba(${panel.accentRgb},1)` }}
                >
                  {panel.label}
                </span>
              </div>
              <div className="flex gap-2">
                {panel.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="px-2 py-1 rounded text-[9px] font-mono border border-border"
                    style={{ color: "hsl(var(--muted-foreground))" }}
                  >
                    {stat.label}:{" "}
                    <span style={{ color: `rgba(${panel.accentRgb},1)` }}>{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex-1 flex flex-col gap-1.5">
              {Array.from({ length: 7 }).map((_, i) => (
                <div
                  key={i}
                  className="h-6 rounded-md bg-secondary"
                  style={{ width: `${90 - i * 5}%`, opacity: 1 - i * 0.08 }}
                />
              ))}
            </div>

            <div className="h-20 rounded-lg bg-secondary border border-border flex items-end px-3 pb-3 gap-1">
              {chartHeights.map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-sm"
                  style={{
                    height: `${h}%`,
                    background: `rgba(${panel.accentRgb},${(0.3 + i * 0.025).toFixed(2)})`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function DashboardPreview() {
  const t = useTranslations("dashboard");
  const rawPanels = t.raw("panels") as PanelTranslation[];
  const panels = PANEL_VISUAL.map((vis, i) => ({ ...vis, ...rawPanels[i] }));

  const [activePanel, setActivePanel] = useState("inbox");
  const sectionRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.9", "start 0.3"],
  });

  const rotateX = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [8, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const translateY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [40, 0]);

  return (
    <Section id="mission-control">
      <Container size="lg">
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

        <div ref={sectionRef}>
          <FadeIn delay={0.1}>
            <Tabs value={activePanel} onValueChange={setActivePanel}>
              <div className="flex justify-center mb-6">
                <TabsList className="flex-wrap gap-1 h-auto">
                  {panels.map((panel) => {
                    const Icon = panel.icon;
                    return (
                      <TabsTrigger key={panel.id} value={panel.id} className="gap-2">
                        <Icon className="h-3.5 w-3.5" />
                        {panel.label}
                      </TabsTrigger>
                    );
                  })}
                </TabsList>
              </div>

              <motion.div
                style={{ perspective: "1200px", rotateX, opacity, translateY }}
                className="will-change-transform"
              >
                {panels.map((panel) => (
                  <TabsContent key={panel.id} value={panel.id}>
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={panel.id}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <div className="surface-card p-1 overflow-hidden">
                          <MockPanel panel={panel} allIcons={PANEL_VISUAL} />
                        </div>

                        <div className="mt-5 flex flex-col sm:flex-row sm:items-center gap-4">
                          <div className="flex-1">
                            <h3 className="text-base font-semibold text-foreground mb-1">
                              {panel.label}
                            </h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {panel.description}
                            </p>
                          </div>
                          <div className="flex gap-3 shrink-0">
                            {panel.stats.map((stat) => (
                              <div key={stat.label} className="text-center">
                                <div
                                  className="text-lg font-bold"
                                  style={{ color: `rgba(${panel.accentRgb},1)` }}
                                >
                                  {stat.value}
                                </div>
                                <div className="text-[10px] text-muted-foreground mt-0.5">
                                  {stat.label}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </TabsContent>
                ))}
              </motion.div>
            </Tabs>
          </FadeIn>
        </div>
      </Container>
    </Section>
  );
}
