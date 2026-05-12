"use client";

import { useRef, useState } from "react";
import {
  motion, AnimatePresence, useScroll, useTransform, useReducedMotion,
} from "framer-motion";
import {
  MessageSquare, Building2, Activity, ListChecks, BarChart3, TrendingUp,
  CheckCircle2, Clock, AlertCircle, Wifi, Zap, Check, X,
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
  { id: "inbox",     icon: MessageSquare, accentRgb: "232,84,26"    },
  { id: "brands",    icon: Building2,     accentRgb: "29,184,161"   },
  { id: "monitor",   icon: Activity,      accentRgb: "192,132,252"  },
  { id: "queue",     icon: ListChecks,    accentRgb: "234,88,12"    },
  { id: "analytics", icon: BarChart3,     accentRgb: "13,158,137"   },
  { id: "metrics",   icon: TrendingUp,    accentRgb: "255,150,50"   },
] as const;

/* ── Per-panel rich content ─────────────────────────────── */

function InboxContent({ accent }: { accent: string }) {
  const rows = [
    { handle: "@aziza_m",    brand: "KadrBeauty",   time: "2m",  msg: "Krem narxi qancha? 🙏",          status: "auto" },
    { handle: "@mohira_s",   brand: "DilnozaStyle", time: "5m",  msg: "Bu ko'ylak 38 razmer bormi?",    status: "pending" },
    { handle: "@bobur93",    brand: "ModaHouse",    time: "12m", msg: "Delivery qancha vaqt oladi?",    status: "auto" },
    { handle: "@nargiza.f",  brand: "KadrBeauty",   time: "18m", msg: "Chegirma kodim ishlamaydi 😔",   status: "escalated" },
  ];
  return (
    <div className="flex flex-col gap-0">
      {rows.map((r, i) => (
        <div key={i} className={`flex items-start gap-2.5 px-3 py-2 ${i % 2 === 0 ? "bg-white" : "bg-gray-50/60"}`}>
          <div className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold text-white shrink-0 mt-0.5"
               style={{ background: `rgba(${accent},1)` }}>
            {r.handle[1].toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-1">
              <span className="text-[10px] font-semibold text-gray-700 truncate">{r.handle}</span>
              <span className="text-[8px] text-gray-400 shrink-0">{r.time} ago</span>
            </div>
            <div className="text-[9px] text-gray-400 mb-0.5 truncate">{r.brand}</div>
            <div className="text-[9px] text-gray-600 truncate">{r.msg}</div>
          </div>
          <div className="shrink-0">
            {r.status === "auto" && <CheckCircle2 className="h-3 w-3 text-emerald-500" />}
            {r.status === "pending" && <Clock className="h-3 w-3 text-amber-500" />}
            {r.status === "escalated" && <AlertCircle className="h-3 w-3 text-rose-500" />}
          </div>
        </div>
      ))}
    </div>
  );
}

function BrandsContent({ accent }: { accent: string }) {
  const brands = [
    { name: "KadrBeauty",   trust: "L3", dms: 87,  active: true  },
    { name: "DilnozaStyle", trust: "L2", dms: 54,  active: true  },
    { name: "ModaHouse",    trust: "L3", dms: 129, active: true  },
    { name: "OzodStyle",    trust: "L1", dms: 0,   active: false },
    { name: "ToshFashion",  trust: "L2", dms: 33,  active: true  },
  ];
  return (
    <div className="flex flex-col gap-0">
      <div className="grid grid-cols-4 px-3 py-1.5 border-b border-gray-100 bg-gray-50/80">
        {["Brand", "Trust", "DMs/day", "Status"].map((h) => (
          <span key={h} className="text-[8px] font-semibold text-gray-400 uppercase tracking-wide">{h}</span>
        ))}
      </div>
      {brands.map((b, i) => (
        <div key={i} className={`grid grid-cols-4 items-center px-3 py-2 ${i % 2 === 0 ? "bg-white" : "bg-gray-50/40"}`}>
          <span className="text-[10px] font-medium text-gray-700">{b.name}</span>
          <span className="text-[9px] font-semibold" style={{ color: `rgba(${accent},1)` }}>{b.trust}</span>
          <span className="text-[9px] text-gray-500">{b.active ? `${b.dms} DMs` : "—"}</span>
          <div className="flex items-center gap-1">
            <div className={`w-1.5 h-1.5 rounded-full ${b.active ? "bg-emerald-400" : "bg-gray-300"}`}
                 style={b.active ? { boxShadow: "0 0 4px rgba(52,211,153,0.7)" } : {}} />
            <span className="text-[8px] text-gray-400">{b.active ? "Live" : "Paused"}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function MonitorContent({ accent }: { accent: string }) {
  const services = [
    { name: "amt-intel",         latency: "12ms",  ok: true  },
    { name: "amt-rag",           latency: "24ms",  ok: true  },
    { name: "amt-guard",         latency: "8ms",   ok: true  },
    { name: "amt-eval",          latency: "11ms",  ok: true  },
    { name: "amt-trust",         latency: "3ms",   ok: true  },
    { name: "amt-comms",         latency: "18ms",  ok: true  },
    { name: "amt-conversations", latency: "5ms",   ok: true  },
  ];
  return (
    <div className="p-3 flex flex-col gap-2">
      <div className="grid grid-cols-2 gap-2 mb-1">
        {[
          { label: "Queue depth", value: "3", color: accent },
          { label: "Uptime",      value: "99.8%", color: "16,185,129" },
          { label: "Errors/hr",   value: "0", color: "16,185,129" },
          { label: "Avg latency", value: "12ms", color: accent },
        ].map((s) => (
          <div key={s.label} className="rounded-lg border border-gray-100 bg-white px-2.5 py-2">
            <div className="text-[8px] text-gray-400 mb-0.5">{s.label}</div>
            <div className="text-[12px] font-bold" style={{ color: `rgba(${s.color},1)` }}>{s.value}</div>
          </div>
        ))}
      </div>
      <div className="rounded-lg border border-gray-100 bg-white overflow-hidden">
        {services.map((svc, i) => (
          <div key={i} className={`flex items-center justify-between px-2.5 py-1.5 ${i < services.length - 1 ? "border-b border-gray-50" : ""}`}>
            <div className="flex items-center gap-1.5">
              <Wifi className="h-2.5 w-2.5 text-emerald-500" />
              <span className="text-[9px] font-mono text-gray-600">{svc.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[8px] text-gray-400 font-mono">{svc.latency}</span>
              <span className="text-[8px] font-medium text-emerald-500">OK</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function QueueContent({ accent }: { accent: string }) {
  const items = [
    { handle: "@nargiza.f", brand: "KadrBeauty",   msg: "Yetkazib berish qancha kun oladi?",        score: 94 },
    { handle: "@dilshod_t", brand: "ModaHouse",     msg: "Chegirma kodim ishlamaydi, yordam bering", score: 88 },
    { handle: "@zulfiya99", brand: "DilnozaStyle",  msg: "38 razmer bormi? Tez kerak 🙏",            score: 97 },
  ];
  return (
    <div className="flex flex-col gap-0 p-2">
      <div className="flex items-center justify-between px-1 mb-2">
        <span className="text-[9px] font-semibold text-gray-500">Pending review — {items.length} items</span>
        <span className="text-[8px] font-medium" style={{ color: `rgba(${accent},1)` }}>Avg review: 12s</span>
      </div>
      {items.map((item, i) => (
        <div key={i} className="rounded-xl border border-gray-100 bg-white p-2.5 mb-1.5">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[9px] font-semibold text-gray-700">{item.handle}</span>
            <span className="text-[8px] px-1.5 py-0.5 rounded-full font-mono"
                  style={{ background: `rgba(${accent},0.1)`, color: `rgba(${accent},1)` }}>
              Q:{item.score}
            </span>
          </div>
          <div className="text-[8px] text-gray-400 mb-0.5">{item.brand}</div>
          <div className="text-[9px] text-gray-600 mb-2 leading-relaxed">"{item.msg}"</div>
          <div className="flex gap-1.5">
            <button className="flex items-center gap-0.5 rounded-md px-2 py-1 text-[8px] font-medium bg-emerald-50 text-emerald-600">
              <Check className="h-2.5 w-2.5" /> Approve
            </button>
            <button className="flex items-center gap-0.5 rounded-md px-2 py-1 text-[8px] font-medium bg-gray-50 text-gray-500">
              Edit
            </button>
            <button className="flex items-center gap-0.5 rounded-md px-2 py-1 text-[8px] font-medium bg-rose-50 text-rose-500">
              <X className="h-2.5 w-2.5" /> Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

function AnalyticsContent({ accent }: { accent: string }) {
  const days = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
  const autos = [62, 71, 58, 84, 93, 77, 88];
  const reviews = [14, 10, 18, 8, 6, 12, 9];
  const max = 100;
  return (
    <div className="p-3 flex flex-col gap-2.5">
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: "Auto rate", value: "76%", color: accent },
          { label: "Sentiment", value: "+87%", color: "16,185,129" },
          { label: "Cost/conv", value: "$0.04", color: accent },
        ].map((s) => (
          <div key={s.label} className="rounded-lg border border-gray-100 bg-white px-2 py-1.5 text-center">
            <div className="text-[10px] font-bold mb-0.5" style={{ color: `rgba(${s.color},1)` }}>{s.value}</div>
            <div className="text-[7px] text-gray-400">{s.label}</div>
          </div>
        ))}
      </div>
      <div className="rounded-lg border border-gray-100 bg-white p-2">
        <div className="text-[8px] text-gray-400 mb-2 font-medium">Response volume — last 7 days</div>
        <div className="flex items-end gap-1 h-16">
          {days.map((d, i) => (
            <div key={d} className="flex-1 flex flex-col items-center gap-0.5">
              <div className="w-full flex flex-col gap-px" style={{ height: 52 }}>
                <div className="w-full rounded-t-sm mt-auto"
                     style={{ height: `${(autos[i] / max) * 52}px`, background: `rgba(${accent},0.85)` }} />
                <div className="w-full rounded-sm"
                     style={{ height: `${(reviews[i] / max) * 52}px`, background: `rgba(${accent},0.25)` }} />
              </div>
              <span className="text-[7px] text-gray-400">{d}</span>
            </div>
          ))}
        </div>
        <div className="flex gap-3 mt-1.5">
          <div className="flex items-center gap-1"><div className="w-2 h-1.5 rounded-sm" style={{ background: `rgba(${accent},0.85)` }} /><span className="text-[7px] text-gray-400">Auto</span></div>
          <div className="flex items-center gap-1"><div className="w-2 h-1.5 rounded-sm" style={{ background: `rgba(${accent},0.25)` }} /><span className="text-[7px] text-gray-400">Reviewed</span></div>
        </div>
      </div>
    </div>
  );
}

function MetricsContent({ accent }: { accent: string }) {
  const kpis = [
    { label: "Total conversations", value: "18,420", sub: "this month"   },
    { label: "Auto-publish rate",   value: "76%",    sub: "↑ 4% vs last" },
    { label: "Response rate",       value: "94%",    sub: "↑ 63% baseline"},
    { label: "Avg response time",   value: "3.2 min",sub: "↓ from 4.1 hrs"},
    { label: "CSAT score",          value: "4.8/5",  sub: "across all brands"},
    { label: "Cost per conv.",      value: "$0.04",  sub: "↓ 60% vs manual"},
  ];
  return (
    <div className="p-3 grid grid-cols-2 gap-2">
      {kpis.map((k) => (
        <div key={k.label} className="rounded-xl border border-gray-100 bg-white p-2.5">
          <div className="text-[8px] text-gray-400 mb-1">{k.label}</div>
          <div className="text-[14px] font-bold leading-none mb-0.5" style={{ color: `rgba(${accent},1)` }}>
            {k.value}
          </div>
          <div className="text-[7px] text-gray-400">{k.sub}</div>
        </div>
      ))}
    </div>
  );
}

const PANEL_CONTENT_MAP: Record<string, (accent: string) => React.ReactNode> = {
  inbox:     (a) => <InboxContent accent={a} />,
  brands:    (a) => <BrandsContent accent={a} />,
  monitor:   (a) => <MonitorContent accent={a} />,
  queue:     (a) => <QueueContent accent={a} />,
  analytics: (a) => <AnalyticsContent accent={a} />,
  metrics:   (a) => <MetricsContent accent={a} />,
};

function MockPanel({
  panel,
  allIcons,
}: {
  panel: (typeof PANEL_VISUAL)[number] & PanelTranslation;
  allIcons: typeof PANEL_VISUAL;
}) {
  const Icon = panel.icon;
  return (
    <div
      className="relative w-full aspect-[16/9] rounded-xl overflow-hidden border border-[rgba(0,0,0,0.08)]"
      style={{ background: "#f8f9fc" }}
    >
      <div className="absolute inset-0 flex flex-col">
        {/* Browser chrome */}
        <div className="flex items-center gap-2 px-4 h-9 border-b border-border bg-white/80 backdrop-blur-sm shrink-0">
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
          <div className="w-14 border-r border-border flex flex-col items-center py-3 gap-3 bg-secondary/60 shrink-0">
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

          {/* Rich panel content */}
          <div className="flex-1 overflow-hidden bg-background/80">
            <div className="flex items-center gap-2 px-3 py-2 border-b border-border bg-white/60">
              <Icon className="h-3.5 w-3.5" style={{ color: `rgba(${panel.accentRgb},1)` }} />
              <span className="text-[11px] font-semibold" style={{ color: `rgba(${panel.accentRgb},1)` }}>
                {panel.label}
              </span>
              <div className="ml-auto flex gap-2">
                {panel.stats.slice(0, 2).map((stat) => (
                  <div key={stat.label} className="px-2 py-0.5 rounded text-[8px] font-mono border border-border"
                       style={{ color: "hsl(var(--muted-foreground))" }}>
                    {stat.label}: <span style={{ color: `rgba(${panel.accentRgb},1)` }}>{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="overflow-auto" style={{ maxHeight: "calc(100% - 36px)" }}>
              {PANEL_CONTENT_MAP[panel.id]?.(panel.accentRgb)}
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
