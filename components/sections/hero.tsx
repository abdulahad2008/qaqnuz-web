"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Play, Search } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/navigation";
import { EmberCanvas } from "@/components/motion/ember-canvas";
import { FilmGrain } from "@/components/motion/film-grain";
import { QaqnuzMark } from "@/components/ui/qaqnuz-logo";

/* Word-by-word blur reveal (cinematic-scroll pattern library). */
function WordBlur({
  words,
  delay = 0,
  className = "",
}: {
  words: string[];
  delay?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={reduced ? false : { opacity: 0, filter: "blur(8px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{
            duration: 0.5,
            delay: delay + i * 0.04,
            ease: [0.21, 0.47, 0.32, 0.98],
          }}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

/* Channel badge dot (IG / TG / WA) — decorative, product-ui tokens. */
function ChannelDot({ ch }: { ch: "ig" | "tg" | "wa" }) {
  const map = {
    ig: { c: "var(--pu-ch-instagram)", l: "IG" },
    tg: { c: "var(--pu-ch-telegram)", l: "TG" },
    wa: { c: "var(--pu-ch-whatsapp)", l: "WA" },
  } as const;
  return (
    <span
      className="flex h-4 w-4 items-center justify-center rounded-full text-[7px] font-bold text-white"
      style={{ background: map[ch].c }}
    >
      {map[ch].l}
    </span>
  );
}

/*
 * Compact FLOW-7 inbox — the "window into the product" clipped by the fold.
 * Light .product-ui palette (blue #1a5cff), intentional contrast against the
 * dark/orange marketing shell. Fully decorative: aria-hidden, non-interactive.
 */
function HeroInboxPreview() {
  const t = useTranslations("hero.inboxPreview");

  const rows = [
    { initials: "AK", name: "Alisher Karimov", ch: "ig" as const, score: "0.94" },
    { initials: "MR", name: "Madina R.", ch: "ig" as const, score: "0.91" },
    { initials: "BT", name: "Bobur T.", ch: "wa" as const, score: "0.88" },
  ];

  return (
    <div
      className="product-ui select-none overflow-hidden rounded-xl text-left"
      aria-hidden="true"
    >
      {/* Top bar */}
      <div className="flex items-center gap-2 border-b px-3 py-2.5 bg-[var(--pu-surface)] border-[var(--pu-border)]">
        <QaqnuzMark className="h-4 w-3.5" />
        <span className="text-[13px] font-bold tracking-tight text-[var(--pu-text)]">
          Qaqnuz
        </span>
        <span className="ml-2 hidden rounded-full px-2.5 py-0.5 text-[10px] sm:inline bg-[var(--pu-surface-muted)] text-[var(--pu-text-muted)]">
          Korzinka.uz · Operator
        </span>
        <div className="ml-auto hidden items-center gap-1.5 rounded-full px-2 py-1 text-[10px] sm:flex bg-[var(--pu-surface-muted)] text-[var(--pu-text-subtle)]">
          <Search className="h-3 w-3" /> ⌘K
        </div>
        <span
          className="ml-2 rounded-full px-2 py-0.5 text-[10px] font-semibold"
          style={{ background: "var(--pu-success-soft)", color: "var(--pu-success-text)" }}
        >
          {t("sla")}
        </span>
        <span
          className="flex h-6 w-6 items-center justify-center rounded-full text-[9px] font-bold text-white"
          style={{ background: "var(--pu-primary)" }}
        >
          SN
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] lg:grid-cols-[200px_1fr_180px]">
        {/* Conversation list */}
        <div className="hidden border-r md:block bg-[var(--pu-surface)] border-[var(--pu-border)]">
          <div className="flex items-center gap-2 border-b px-3 py-2.5 border-[var(--pu-border)]">
            <span className="text-[12px] font-bold text-[var(--pu-text)]">
              {t("inboxLabel")}
            </span>
            <span className="rounded px-1.5 text-[10px] bg-[var(--pu-surface-muted)] text-[var(--pu-text-muted)]">
              147
            </span>
            <span
              className="ml-auto rounded-full px-2 py-0.5 text-[9px] font-semibold text-white"
              style={{ background: "var(--pu-primary)" }}
            >
              23
            </span>
          </div>
          {rows.map((r, i) => (
            <div
              key={r.name}
              className="flex items-start gap-2 px-3 py-2.5"
              style={
                i === 0
                  ? {
                      background: "var(--pu-surface-sky)",
                      borderLeft: "2px solid var(--pu-primary)",
                    }
                  : undefined
              }
            >
              <span className="relative">
                <span
                  className="flex h-7 w-7 items-center justify-center rounded-full text-[9px] font-semibold text-white"
                  style={{ background: "var(--pu-primary)" }}
                >
                  {r.initials}
                </span>
                <span className="absolute -bottom-0.5 -right-0.5">
                  <ChannelDot ch={r.ch} />
                </span>
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[11px] font-semibold text-[var(--pu-text)]">
                  {r.name}
                </span>
                <span className="mt-1 flex items-center gap-1">
                  <span
                    className="rounded px-1 py-0.5 text-[8px] font-bold"
                    style={{ background: "var(--pu-success-soft)", color: "var(--pu-success-text)" }}
                  >
                    {t("aiClosed")}
                  </span>
                  <span className="text-[9px] text-[var(--pu-text-subtle)]">{r.score}</span>
                </span>
              </span>
            </div>
          ))}
        </div>

        {/* Thread */}
        <div className="flex flex-col bg-[var(--pu-bg)]" style={{ minHeight: 260 }}>
          <div className="flex items-center gap-2 border-b px-3 py-2.5 bg-[var(--pu-surface)] border-[var(--pu-border)]">
            <span
              className="flex h-7 w-7 items-center justify-center rounded-full text-[9px] font-semibold text-white"
              style={{ background: "var(--pu-primary)" }}
            >
              MR
            </span>
            <div>
              <p className="text-[12px] font-bold text-[var(--pu-text)]">Madina R.</p>
              <p className="text-[9px] text-[var(--pu-text-subtle)]">Instagram DM</p>
            </div>
            <span
              className="ml-auto rounded-full px-2 py-0.5 text-[9px] font-bold"
              style={{ background: "var(--pu-success-soft)", color: "var(--pu-success-text)" }}
            >
              ● {t("aiActive")}
            </span>
          </div>

          <div className="flex flex-1 flex-col gap-2.5 p-3">
            {/* customer */}
            <div className="flex items-end gap-2">
              <span
                className="flex h-5 w-5 items-center justify-center rounded-full text-[8px] font-semibold text-white"
                style={{ background: "var(--pu-primary)" }}
              >
                MR
              </span>
              <p className="max-w-[80%] rounded-2xl rounded-bl-sm border px-3 py-2 text-[12px] bg-[var(--pu-surface)] border-[var(--pu-border)] text-[var(--pu-text)]">
                {t("customerMsg")}
              </p>
            </div>
            {/* ai */}
            <div className="flex flex-col items-end gap-1">
              <p
                className="max-w-[82%] rounded-2xl rounded-br-sm px-3 py-2 text-[12px] text-[var(--pu-text)]"
                style={{ background: "var(--pu-surface-sky)" }}
              >
                {t("aiReply")}
              </p>
              <span className="flex items-center gap-1 text-[9px] text-[var(--pu-text-subtle)]">
                <span
                  className="rounded px-1 py-0.5 font-semibold"
                  style={{ background: "var(--pu-primary-soft)", color: "var(--pu-primary)" }}
                >
                  ✦ AI · 0.94
                </span>
                <span
                  className="rounded px-1 py-0.5"
                  style={{ background: "var(--pu-surface-muted)", color: "var(--pu-text-muted)" }}
                >
                  {t("sourceChip")}
                </span>
                <span style={{ color: "var(--pu-primary)" }}>✓✓ {t("delivered")}</span>
              </span>
            </div>
          </div>
        </div>

        {/* AI analysis */}
        <div className="hidden border-l p-3 lg:block bg-[var(--pu-surface)] border-[var(--pu-border)]">
          <p className="text-[9px] font-bold uppercase tracking-wider text-[var(--pu-text-subtle)]">
            AI · {t("intent")}
          </p>
          <div className="mt-2 rounded-lg p-2.5" style={{ background: "var(--pu-surface-muted)" }}>
            <p className="flex justify-between text-[11px] font-semibold text-[var(--pu-text)]">
              {t("intent")} <span style={{ color: "var(--pu-purple)" }}>0.94</span>
            </p>
            <div className="mt-1.5 h-1.5 rounded-full" style={{ background: "var(--pu-border)" }}>
              <div
                className="h-1.5 rounded-full"
                style={{ width: "94%", background: "var(--pu-purple)" }}
              />
            </div>
          </div>
          <div className="mt-2 rounded-lg p-2.5" style={{ background: "var(--pu-surface-muted)" }}>
            <p className="flex justify-between text-[11px] font-semibold text-[var(--pu-text)]">
              {t("responseTime")}{" "}
              <span style={{ color: "var(--pu-success-text)" }}>1.4s</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  const t = useTranslations("hero");
  const reduced = useReducedMotion();

  const words1 = t("headlinePart1").split(" ").filter(Boolean);
  const wordsEmphasis = t("headlineEmphasis").split(" ").filter(Boolean);
  const words2 = t("headlinePart2").split(" ").filter(Boolean);

  const emphasisDelay = 0.15 + words1.length * 0.04;
  const part2Delay = emphasisDelay + wordsEmphasis.length * 0.04;

  return (
    <section className="relative flex h-screen min-h-[640px] flex-col overflow-hidden pt-16">
      {/* Living background: video slot (hidden until asset ships) + embers */}
      <div aria-hidden className="absolute inset-0" style={{ background: "hsl(var(--background))" }}>
        <video
          autoPlay
          muted
          loop
          playsInline
          poster=""
          className="absolute inset-0 h-full w-full object-cover opacity-40"
          onError={(e) => {
            (e.currentTarget as HTMLVideoElement).style.display = "none";
          }}
        >
          <source src="/video/hero.mp4" type="video/mp4" />
        </video>
      </div>
      <EmberCanvas className="opacity-90" />
      {/* Orange radial glow (logo-orange, replaces Nexora indigo) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 72% 55% at 50% -5%, hsl(var(--accent) / 0.14) 0%, transparent 68%)",
        }}
      />
      <FilmGrain opacity={0.02} />
      {/* Bottom fade so the clipped preview melts into the page */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 z-10"
        style={{ background: "linear-gradient(to bottom, transparent, hsl(var(--background)))" }}
      />

      {/* Content */}
      <div className="relative z-20 mx-auto flex w-full max-w-6xl flex-1 flex-col items-center px-6 pt-6 lg:pt-10">
        {/* Badge */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary/60 px-4 py-1.5 text-sm text-muted-foreground backdrop-blur-sm"
        >
          {t("badge")}
        </motion.div>

        {/* Headline */}
        <h1 className="text-center font-display text-[2.75rem] leading-[0.98] tracking-tight sm:text-6xl lg:text-[5rem]">
          <WordBlur words={words1} delay={0.15} className="text-foreground" />
          <WordBlur
            words={wordsEmphasis}
            delay={emphasisDelay}
            className="italic text-accent"
          />
          {words2.length > 0 && (
            <>
              {" "}
              <WordBlur words={words2} delay={part2Delay} className="text-foreground" />
            </>
          )}
        </h1>

        {/* Sub */}
        <motion.p
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-5 max-w-[650px] text-center text-base leading-relaxed text-muted-foreground md:text-lg"
        >
          {t("sub")}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-7 flex items-center gap-3"
        >
          <Link
            href="/book-demo"
            className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-foreground shadow-[0_0_40px_-8px_hsl(var(--accent)/0.5)] transition-colors hover:bg-accent/90"
          >
            {t("cta1")}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/product"
            aria-label={t("cta2")}
            className="group inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 py-2 pl-2 pr-5 text-sm font-medium text-foreground backdrop-blur-sm transition-colors hover:bg-secondary"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-background/80 shadow-sm">
              <Play className="h-3.5 w-3.5 fill-foreground text-foreground" />
            </span>
            {t("cta2")}
          </Link>
        </motion.div>

        {/* Dashboard preview — frosted glass, clipped by the fold */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 40, rotateX: 6 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{ perspective: 1200 }}
          className="mt-10 w-full max-w-5xl"
        >
          <div className="glass rounded-2xl p-3 md:p-4">
            <HeroInboxPreview />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
