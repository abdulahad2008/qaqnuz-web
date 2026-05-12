"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CheckCircle2, Clock, AlertCircle, LayoutDashboard, GitBranch, Shield, BarChart3, Layers } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/navigation";
import { VideoBackground } from "@/components/motion/video-background";
import { FilmGrain } from "@/components/motion/film-grain";

const HIGGSFIELD_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260319_015952_e1deeb12-8fb7-4071-a42a-60779fc64ab6.mp4";

const SIDEBAR_ICONS = [
  { Icon: LayoutDashboard, active: true },
  { Icon: GitBranch, active: false },
  { Icon: Shield, active: false },
  { Icon: Layers, active: false },
  { Icon: BarChart3, active: false },
];

const PIPELINE_STAGES = ["Q", "C", "R", "Co", "G", "E", "T", "P"];
const STAGE_COLORS = [
  "#E8541A", "#E8541A", "#E8541A", "#E8541A",
  "#E8541A", "#E8541A", "#e11d48", "#10b981",
];

const SAMPLE_CONVERSATIONS = [
  { time: "2m", handle: "@aziza_m", brand: "KadrBeauty", statusKey: "autoReplied" },
  { time: "5m", handle: "@mohira_s", brand: "DilnozaStyle", statusKey: "pendingReview" },
  { time: "12m", handle: "@bobur93", brand: "ModaHouse", statusKey: "escalated" },
];

function StatusBadge({ statusKey }: { statusKey: string }) {
  const t = useTranslations("hero");
  const label = t(`statuses.${statusKey}` as Parameters<typeof t>[0]);
  if (statusKey === "autoReplied") {
    return (
      <span className="flex items-center gap-1 text-[10px] text-emerald-600">
        <CheckCircle2 className="h-2.5 w-2.5" />
        {label}
      </span>
    );
  }
  if (statusKey === "pendingReview") {
    return (
      <span className="flex items-center gap-1 text-[10px] text-amber-600">
        <Clock className="h-2.5 w-2.5" />
        {label}
      </span>
    );
  }
  return (
    <span className="flex items-center gap-1 text-[10px] text-rose-500">
      <AlertCircle className="h-2.5 w-2.5" />
      {label}
    </span>
  );
}

function WordBlur({ words, delay = 0, className = "" }: { words: string[]; delay?: number; className?: string }) {
  const reduced = useReducedMotion();
  return (
    <span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={reduced ? false : { opacity: 0, filter: "blur(8px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.5, delay: delay + i * 0.04, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

export function Hero() {
  const t = useTranslations("hero");
  const reduced = useReducedMotion();

  const part1 = t("headlinePart1");
  const emphasis = t("headlineEmphasis");
  const part2 = t("headlinePart2");

  const words1 = part1.split(" ").filter(Boolean);
  const wordsEmphasis = emphasis.split(" ").filter(Boolean);
  const words2 = part2.split(" ").filter(Boolean);

  const totalWords1 = words1.length;
  const totalWordsEmphasis = wordsEmphasis.length;

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-16">
      {/* Video background — very subtle under light overlay */}
      <VideoBackground src={HIGGSFIELD_VIDEO} opacity={0.12} />

      {/* Light overlay — keeps theme bright */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.94) 0%, rgba(255,255,255,0.90) 60%, rgba(255,255,255,0.96) 100%)",
        }}
      />

      {/* Subtle indigo radial accent */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(99,102,241,0.06) 0%, transparent 70%)",
        }}
      />

      {/* Film grain (light, barely visible on white) */}
      <FilmGrain opacity={0.018} />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-8 py-20 lg:py-28">
        {/* Headline — 3-part word-blur reveal */}
        <h1 className="text-center text-5xl md:text-6xl lg:text-7xl leading-[1.04] tracking-tight mb-6">
          {words1.length > 0 && (
            <WordBlur
              words={words1}
              delay={0.15}
              className="text-foreground font-display"
            />
          )}
          {wordsEmphasis.length > 0 && (
            <WordBlur
              words={wordsEmphasis}
              delay={0.15 + totalWords1 * 0.04}
              className="font-display italic text-accent"
            />
          )}
          {words2.length > 0 && (
            <>
              {" "}
              <WordBlur
                words={words2}
                delay={0.15 + (totalWords1 + totalWordsEmphasis) * 0.04}
                className="text-foreground font-display"
              />
            </>
          )}
        </h1>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-10"
        >
          {t("sub")}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.62 }}
          className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-16"
        >
          <Link
            href="/book-demo"
            className="group inline-flex items-center gap-2 rounded-full bg-accent text-accent-foreground px-7 py-3 text-sm font-medium hover:bg-accent/90 transition-colors shadow-sm"
          >
            {t("cta1")}
            <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <Link
            href="/product"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background/80 text-foreground px-7 py-3 text-sm font-medium hover:bg-secondary transition-colors backdrop-blur-sm"
          >
            {t("cta2")}
          </Link>
        </motion.div>

        {/* ── Mission Control Dashboard Mockup ───────────────────── */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 40, rotateX: 6 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.7, delay: 0.78, ease: [0.16, 1, 0.3, 1] }}
          style={{ perspective: 1200 }}
        >
          {/* Browser chrome */}
          <div className="rounded-2xl border border-border shadow-[var(--shadow-dashboard)] overflow-hidden bg-white">
            {/* Top bar */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-border bg-secondary/50">
              <div className="flex gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                <div className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                <div className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="flex items-center gap-1.5 rounded-md border border-border bg-background px-3 py-1 text-[11px] text-muted-foreground w-48 text-center">
                  qaqnuz.uz/dashboard
                </div>
              </div>
              <div className="flex gap-2">
                <div className="h-5 w-12 rounded bg-border/50" />
                <div className="h-5 w-16 rounded bg-border/50" />
              </div>
            </div>

            {/* Dashboard body */}
            <div className="flex" style={{ minHeight: 340 }}>
              {/* Sidebar */}
              <div className="hidden sm:flex flex-col items-center gap-4 py-5 px-3 border-r border-border bg-secondary/30 w-12">
                <div className="mb-1">
                  <span className="text-accent font-display text-xs">✦</span>
                </div>
                {SIDEBAR_ICONS.map(({ Icon, active }, i) => (
                  <button
                    key={i}
                    className={`p-1.5 rounded-lg transition-colors ${
                      active
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </button>
                ))}
              </div>

              {/* Main content */}
              <div className="flex-1 p-4 space-y-3 overflow-hidden">
                {/* Header row */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">{t("dashboardGreeting", { name: "Dilnoza" })}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-[11px] font-medium text-foreground">
                        {t("pipelineHealth")} <span className="text-emerald-600 font-semibold">99.8%</span>
                      </span>
                      <span className="text-[11px] text-muted-foreground">
                        {t("uptime")}: <span className="text-foreground font-medium">24/7</span>
                      </span>
                      <span className="text-[11px] text-muted-foreground">
                        {t("last24h")}: <span className="text-accent font-medium">{t("replies")}</span>
                      </span>
                    </div>
                  </div>
                  {/* Action chips */}
                  <div className="hidden lg:flex items-center gap-1.5">
                    {(["sendReply", "takeOver", "pauseAI"] as const).map((key) => (
                      <button
                        key={key}
                        className="rounded-full border border-border bg-background px-2.5 py-1 text-[10px] text-muted-foreground hover:text-foreground hover:border-accent/40 transition-colors"
                      >
                        {t(`dashboardActions.${key}` as Parameters<typeof t>[0])}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Cards row */}
                <div className="grid grid-cols-2 gap-2.5">
                  {/* Pipeline health card */}
                  <div className="rounded-xl border border-border bg-background p-3">
                    <p className="text-[10px] text-muted-foreground mb-2">{t("pipelineHealth")}</p>
                    <div className="flex items-end gap-1 mb-2">
                      {PIPELINE_STAGES.map((stage, i) => (
                        <div key={i} className="flex flex-col items-center gap-1">
                          <div
                            className="rounded-sm text-white text-[7px] font-bold px-1 py-0.5 leading-none"
                            style={{ background: STAGE_COLORS[i], minWidth: 18, textAlign: "center" }}
                          >
                            {stage}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                      <span className="text-rose-500 font-medium">{t("blocked")}</span>
                      <span>·</span>
                      <span className="text-foreground font-medium">{t("replies")}</span>
                    </div>
                  </div>

                  {/* Active Brands card */}
                  <div className="rounded-xl border border-border bg-background p-3">
                    <p className="text-[10px] text-muted-foreground mb-2">
                      {t("activeBrands")}
                    </p>
                    <div className="space-y-1.5">
                      {["KadrBeauty", "DilnozaStyle", "ModaHouse"].map((brand) => (
                        <div key={brand} className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <div
                              className="h-2 w-2 rounded-full bg-emerald-400"
                              style={{ boxShadow: "0 0 4px rgba(52,211,153,0.6)" }}
                            />
                            <span className="text-[10px] text-foreground font-medium">{brand}</span>
                          </div>
                          <span className="text-[9px] text-muted-foreground">Live</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Recent Conversations table */}
                <div className="rounded-xl border border-border bg-background overflow-hidden">
                  <div className="px-3 py-2 border-b border-border">
                    <p className="text-[10px] font-medium text-foreground">{t("recentConversations")}</p>
                  </div>
                  <table className="w-full text-[10px]">
                    <thead>
                      <tr className="border-b border-border bg-secondary/40">
                        <th className="px-3 py-1.5 text-left text-muted-foreground font-medium">{t("tableHeaders.time")}</th>
                        <th className="px-3 py-1.5 text-left text-muted-foreground font-medium">{t("tableHeaders.customer")}</th>
                        <th className="hidden sm:table-cell px-3 py-1.5 text-left text-muted-foreground font-medium">{t("tableHeaders.brand")}</th>
                        <th className="px-3 py-1.5 text-left text-muted-foreground font-medium">{t("tableHeaders.status")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {SAMPLE_CONVERSATIONS.map((row, i) => (
                        <tr key={i} className="border-b border-border/50 last:border-0 hover:bg-secondary/20 transition-colors">
                          <td className="px-3 py-1.5 text-muted-foreground">{row.time} ago</td>
                          <td className="px-3 py-1.5 text-foreground font-medium">{row.handle}</td>
                          <td className="hidden sm:table-cell px-3 py-1.5 text-muted-foreground">{row.brand}</td>
                          <td className="px-3 py-1.5">
                            <StatusBadge statusKey={row.statusKey} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.1 }}
          className="grid grid-cols-3 gap-6 max-w-md mx-auto mt-10"
        >
          {[
            { value: t("stats.pipeline"), label: t("stats.pipelineLabel") },
            { value: t("stats.guardrails"), label: t("stats.guardrailsLabel") },
            { value: t("stats.coverage"), label: t("stats.coverageLabel") },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-xl font-display italic text-accent">{stat.value}</div>
              <div className="text-xs text-muted-foreground mt-0.5 leading-tight">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll chevron */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 opacity-40"
        style={{ animation: "fade-up 1s 1.5s ease-out both" }}
      >
        <div className="flex flex-col items-center gap-1">
          <div className="w-px h-7 bg-gradient-to-b from-accent to-transparent" />
          <div className="w-1.5 h-1.5 border-r border-b border-accent rotate-45" />
        </div>
      </div>
    </section>
  );
}
