"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  Building2,
  Activity,
  ListChecks,
  BarChart3,
  TrendingUp,
} from "lucide-react";
import { Section, Container, SectionHeader } from "@/components/ui/section";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { FadeIn } from "@/components/motion/fade-in";
import { Badge } from "@/components/ui/badge";

/* ─────────────────────────────────────────────────────────────
   TODO (Higgsfield): Replace each panel's placeholder with a
   cinematic screenshot or animation of the actual Mission Control
   dashboard panel. Prompt base:
   "Dark-mode SaaS dashboard screenshot, charcoal #141416 background,
   amber accent colors, clean Inter typography. Panel: [panel name].
   Shot at 2x resolution, slight depth-of-field blur on edges."
───────────────────────────────────────────────────────────── */

const panels = [
  {
    id: "inbox",
    label: "Inbox",
    icon: MessageSquare,
    description: "Unified 3-tab conversation view across DMs, Comments, and Story mentions. Each thread shows pipeline status, trust level, and response queue.",
    mockColor: "#1a1a2e",
    accent: "var(--color-ember-400)",
    stats: [
      { label: "DMs", value: "247" },
      { label: "Comments", value: "1.2k" },
      { label: "Stories", value: "89" },
    ],
  },
  {
    id: "brands",
    label: "Brands",
    icon: Building2,
    description: "11-tab brand profile editor: identity, voice, products, campaigns, payments, delivery, FAQs, guardrails, escalation, hours, and compliance settings.",
    mockColor: "#1a2e1a",
    accent: "var(--color-trust-400)",
    stats: [
      { label: "Brands", value: "12" },
      { label: "Profiles", value: "11 tabs" },
      { label: "Active", value: "9" },
    ],
  },
  {
    id: "monitor",
    label: "Monitor",
    icon: Activity,
    description: "Real-time pipeline health metrics. Service status for all 7 AMT microservices, queue depth, error rates, and LLM latency — all in one view.",
    mockColor: "#1a1a2e",
    accent: "#c084fc",
    stats: [
      { label: "Services", value: "7/7" },
      { label: "Queue", value: "Live" },
      { label: "Uptime", value: "99.9%" },
    ],
  },
  {
    id: "queue",
    label: "Queue",
    icon: ListChecks,
    description: "Proactive action approval queue. Review, edit, approve, or reject AI-generated responses. One-click publish or send back for recomposition.",
    mockColor: "#2e1a1a",
    accent: "var(--color-ember-500)",
    stats: [
      { label: "Pending", value: "14" },
      { label: "Approved/hr", value: "38" },
      { label: "Avg review", value: "12s" },
    ],
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: BarChart3,
    description: "Interactive charts: response volume, sentiment trends, pipeline funnel, cost per conversation, and per-brand LLM spend breakdown.",
    mockColor: "#1a2e2e",
    accent: "var(--color-trust-500)",
    stats: [
      { label: "Cost/conv", value: "$0.04" },
      { label: "Sentiment", value: "+87%" },
      { label: "Response rate", value: "98%" },
    ],
  },
  {
    id: "metrics",
    label: "Metrics",
    icon: TrendingUp,
    description: "Conversation volumes and status tracking. Daily/weekly/monthly breakdowns, trust level distribution, and operator performance scorecards.",
    mockColor: "#1e1a2e",
    accent: "var(--color-ember-300)",
    stats: [
      { label: "Total convs", value: "18.4k" },
      { label: "Auto rate", value: "76%" },
      { label: "CSAT", value: "4.8/5" },
    ],
  },
];

/* Stable chart heights — computed once per panel id, never on re-render */
const CHART_HEIGHTS: Record<string, number[]> = {};
panels.forEach((p) => {
  CHART_HEIGHTS[p.id] = Array.from({ length: 18 }, (_, i) =>
    20 + Math.sin(i * 0.8) * 30 + ((i * 37 + 13) % 20)
  );
});

function MockPanel({ panel }: { panel: (typeof panels)[0] }) {
  const Icon = panel.icon;
  const chartHeights = CHART_HEIGHTS[panel.id];
  return (
    <div
      className="relative w-full aspect-[16/9] rounded-xl overflow-hidden border border-[rgba(255,255,255,0.08)]"
      style={{ background: panel.mockColor }}
    >
      {/* Simulated dashboard chrome */}
      <div className="absolute inset-0 flex flex-col">
        {/* Top bar */}
        <div className="flex items-center gap-2 px-4 h-9 border-b border-[rgba(255,255,255,0.06)] bg-[rgba(0,0,0,0.2)]">
          <div className="w-2 h-2 rounded-full bg-red-500/60" />
          <div className="w-2 h-2 rounded-full bg-yellow-500/60" />
          <div className="w-2 h-2 rounded-full bg-green-500/60" />
          <div className="flex-1" />
          <div
            className="text-[10px] font-mono px-2 py-0.5 rounded"
            style={{ color: panel.accent, background: `${panel.accent}20` }}
          >
            Mission Control · {panel.label}
          </div>
        </div>

        {/* Content area */}
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <div className="w-14 border-r border-[rgba(255,255,255,0.05)] flex flex-col items-center py-3 gap-3">
            {panels.map((p) => {
              const PIcon = p.icon;
              const isActive = p.id === panel.id;
              return (
                <div
                  key={p.id}
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{
                    background: isActive ? `${panel.accent}25` : "transparent",
                  }}
                >
                  <PIcon
                    className="h-3.5 w-3.5"
                    style={{
                      color: isActive ? panel.accent : "rgba(255,255,255,0.2)",
                    }}
                  />
                </div>
              );
            })}
          </div>

          {/* Main content placeholder */}
          <div className="flex-1 p-4 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon className="h-4 w-4" style={{ color: panel.accent }} />
                <span
                  className="text-xs font-semibold"
                  style={{ color: panel.accent }}
                >
                  {panel.label}
                </span>
              </div>
              <div className="flex gap-2">
                {panel.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="px-2 py-1 rounded text-[9px] font-mono border border-[rgba(255,255,255,0.08)]"
                    style={{ color: "rgba(255,255,255,0.5)" }}
                  >
                    {stat.label}: <span style={{ color: panel.accent }}>{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Simulated content rows */}
            <div className="flex-1 flex flex-col gap-1.5">
              {Array.from({ length: 7 }).map((_, i) => (
                <div
                  key={i}
                  className="h-6 rounded-md"
                  style={{
                    background: `rgba(255,255,255,${0.04 - i * 0.003})`,
                    width: `${90 - i * 5}%`,
                  }}
                />
              ))}
            </div>

            {/* Simulated chart or list */}
            <div className="h-20 rounded-lg bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)] flex items-end px-3 pb-3 gap-1">
              {chartHeights.map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-sm"
                  style={{
                    height: `${h}%`,
                    background: `${panel.accent}${Math.round(40 + i * 3).toString(16).padStart(2, "0")}`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* TODO overlay */}
      <div className="absolute bottom-2 right-2">
        <span className="text-[9px] font-mono text-[rgba(255,255,255,0.2)]">
          TODO: replace with Higgsfield screenshot
        </span>
      </div>
    </div>
  );
}

export function DashboardPreview() {
  const [activePanel, setActivePanel] = useState("inbox");

  return (
    <Section id="mission-control">
      <Container size="lg">
        <FadeIn>
          <SectionHeader
            overline="Mission Control"
            title={
              <>
                Six panels.{" "}
                <span className="gradient-ember">Total visibility.</span>
              </>
            }
            description="Your operator dashboard puts every brand, every conversation, and every AI decision on one screen. Real-time. Fully audited."
            center
          />
        </FadeIn>

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
                    <MockPanel panel={panel} />
                    <div className="mt-5 flex flex-col sm:flex-row sm:items-center gap-4">
                      <div className="flex-1">
                        <h3 className="text-base font-semibold text-[var(--color-neutral-100)] mb-1">
                          {panel.label} Panel
                        </h3>
                        <p className="text-sm text-[var(--color-neutral-400)] leading-relaxed">
                          {panel.description}
                        </p>
                      </div>
                      <div className="flex gap-3 shrink-0">
                        {panel.stats.map((stat) => (
                          <div key={stat.label} className="text-center">
                            <div
                              className="text-lg font-bold"
                              style={{ color: panel.accent }}
                            >
                              {stat.value}
                            </div>
                            <div className="text-[10px] text-[var(--color-neutral-500)] mt-0.5">
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
          </Tabs>
        </FadeIn>
      </Container>
    </Section>
  );
}
