"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Check,
  Inbox as InboxIcon,
  LayoutGrid,
  Search,
  Settings,
  Sparkles,
  TrendingUp,
  X,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { QaqnuzMark } from "@/components/ui/qaqnuz-logo";

/*
 * Faithful scaled recreation of the real QAQNUZ inbox (Pencil FLOW-7:
 * design/exports/qaqnuz-inbox-mockup.png): top bar, nav rail, conversation
 * list with filter + tag chips, message thread with journey chips + escalation
 * card, and the AI analysis panel. The product palette is the app's light/blue
 * .product-ui system — intentional contrast against the dark/orange marketing
 * shell. Chat internals are aria-hidden (decorative-interactive); the industry
 * tabs stay keyboard-navigable. Ported from the donor prototype: next-intl copy,
 * useReducedMotion, and tokens-only styling.
 */

type Msg = { from: string; text: string };
type Convo = { sector: string; channel: string; customer: string; preview: string; messages: Msg[] };
type Rec = { level: string; text: string; score: string };
type Ui = {
  brandPill: string; search: string; sla: string; nav: string[]; filters: string[];
  tagAiClosed: string; tagPlaybook: string; tagEscalation: string; tagMine: string;
  journey: string[]; aiSource: string; quickActions: string[]; composerToggle: string[];
  send: string; replyPlaceholder: string; escTitle: string; escAccept: string; escReturn: string;
  panelTitle: string; intent: string; sentiment: string; sentimentValue: string;
  layerTitle: string; layers: string[]; recsTitle: string; recs: Rec[];
  leadTitle: string; leadValue: string; leadNote: string;
};

const AVATAR_COLORS = [
  "var(--pu-primary)", "var(--pu-purple)", "var(--pu-ch-instagram)",
  "var(--pu-ch-whatsapp)", "var(--pu-info)", "var(--pu-success)",
];

function initialsOf(name: string) {
  return name.split(" ").map((w) => w[0]).slice(0, 2).join("");
}

function Avatar({ name, size = 32 }: { name: string; size?: number }) {
  const c = AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length];
  return (
    <span
      className="flex shrink-0 items-center justify-center rounded-full font-semibold text-white"
      style={{ background: c, width: size, height: size, fontSize: size * 0.34 }}
      aria-hidden="true"
    >
      {initialsOf(name)}
    </span>
  );
}

function ChannelBadge({ channel }: { channel: string }) {
  const map: Record<string, { c: string; l: string }> = {
    instagram: { c: "var(--pu-ch-instagram)", l: "IG" },
    telegram: { c: "var(--pu-ch-telegram)", l: "TG" },
    whatsapp: { c: "var(--pu-ch-whatsapp)", l: "WA" },
  };
  const m = map[channel] ?? map.instagram;
  return (
    <span
      className="flex h-4 w-4 items-center justify-center rounded-full text-[7px] font-bold text-white"
      style={{ background: m.c }}
      aria-hidden="true"
    >
      {m.l}
    </span>
  );
}

function channelLabel(channel: string) {
  return channel === "instagram" ? "Instagram DM" : channel === "telegram" ? "Telegram" : "WhatsApp";
}

function TypingDots() {
  return (
    <span className="flex gap-1 px-1" aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-1.5 w-1.5 rounded-full"
          style={{ background: "var(--pu-text-subtle)" }}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ repeat: Infinity, duration: 1, delay: i * 0.18 }}
        />
      ))}
    </span>
  );
}

function EscalationCard({ ui }: { ui: Ui }) {
  return (
    <div
      className="rounded-xl border p-3"
      style={{ borderColor: "var(--pu-warning)", background: "var(--pu-warning-soft)" }}
    >
      <p className="text-[12px] font-semibold" style={{ color: "var(--pu-warning)" }}>
        ⚠ {ui.escTitle}
      </p>
      <div className="mt-2.5 flex gap-2">
        <span
          className="rounded-lg px-3 py-1.5 text-[11px] font-semibold text-white"
          style={{ background: "var(--pu-primary)" }}
        >
          {ui.escAccept}
        </span>
        <span
          className="rounded-lg border px-3 py-1.5 text-[11px] font-semibold"
          style={{ borderColor: "var(--pu-border-strong)", color: "var(--pu-text-muted)" }}
        >
          {ui.escReturn}
        </span>
      </div>
    </div>
  );
}

function Bubble({
  msg, customer, isLastAi, ui, delivered,
}: {
  msg: Msg; customer: string; isLastAi: boolean; ui: Ui; delivered: string;
}) {
  if (msg.from === "system") {
    return (
      <div className="flex justify-center">
        <span
          className="rounded-full border px-3 py-1 text-[11px] font-semibold"
          style={{ borderColor: "var(--pu-success)", background: "var(--pu-success-soft)", color: "var(--pu-success-text)" }}
        >
          {msg.text}
        </span>
      </div>
    );
  }
  if (msg.from === "guardrail") {
    return <EscalationCard ui={ui} />;
  }
  if (msg.from === "customer") {
    return (
      <div className="flex items-end gap-2">
        <Avatar name={customer} size={22} />
        <p
          className="max-w-[78%] rounded-2xl rounded-bl-sm border px-3.5 py-2.5 text-[13px]"
          style={{ background: "var(--pu-surface)", borderColor: "var(--pu-border)", color: "var(--pu-text)" }}
        >
          {msg.text}
        </p>
      </div>
    );
  }
  const wrong = msg.from === "ai-draft-wrong";
  return (
    <div className="flex flex-col items-end gap-1">
      <p
        className="max-w-[78%] rounded-2xl rounded-br-sm px-3.5 py-2.5 text-[13px]"
        style={
          wrong
            ? { border: "1px solid var(--pu-warning)", background: "var(--pu-warning-soft)", color: "var(--pu-text-muted)", textDecoration: "line-through" }
            : { background: "var(--pu-surface-sky)", color: "var(--pu-text)" }
        }
      >
        {msg.text}
      </p>
      {!wrong && (
        <span className="flex items-center gap-1 text-[10px]" style={{ color: "var(--pu-text-subtle)" }}>
          <span
            className="rounded px-1.5 py-0.5 font-semibold"
            style={{ background: "var(--pu-primary-soft)", color: "var(--pu-primary)" }}
          >
            ✦ AI · 0.91
          </span>
          <span
            className="rounded px-1.5 py-0.5"
            style={{ background: "var(--pu-surface-muted)", color: "var(--pu-text-muted)" }}
          >
            {ui.aiSource}
          </span>
          {isLastAi && <span style={{ color: "var(--pu-primary)" }}>✓✓ {delivered}</span>}
        </span>
      )}
    </div>
  );
}

const NAV_ICONS = [LayoutGrid, InboxIcon, Sparkles, TrendingUp, Settings];
const ROW_TAGS = ["tagEscalation", "tagAiClosed", "tagPlaybook", "tagAiClosed"] as const;
const ROW_SCORES = ["0.41", "0.92", "0.88", "0.91"];

export function InboxDemo() {
  const t = useTranslations("inbox");
  const reduced = useReducedMotion();
  const ui = t.raw("ui") as Ui;
  const convos = t.raw("conversations") as Convo[];
  const tabs = t.raw("tabs") as string[];

  const [tab, setTab] = useState(1); // default: online store (has the guardrail beat)
  const [visibleCount, setVisibleCount] = useState(0);
  const [typing, setTyping] = useState(false);
  const [inView, setInView] = useState(false);
  const timeouts = useRef<number[]>([]);
  const threadRef = useRef<HTMLDivElement>(null);

  const convo = convos[tab];
  const messages = convo.messages;

  const shown = reduced
    ? messages.filter((m) => m.from !== "ai-draft-wrong")
    : messages.slice(0, visibleCount).filter((m, i) => {
        if (m.from === "ai-draft-wrong") {
          const guardIdx = messages.findIndex((x) => x.from === "guardrail");
          return visibleCount <= guardIdx + 1 || i > guardIdx;
        }
        return true;
      });

  useEffect(() => {
    if (reduced || !inView) return;
    timeouts.current.forEach(clearTimeout);
    timeouts.current = [];
    timeouts.current.push(window.setTimeout(() => {
      setVisibleCount(0);
      setTyping(false);
    }, 0));
    let delay = 500;
    messages.forEach((m, i) => {
      const fromAi = m.from === "ai" || m.from === "ai-draft-wrong";
      if (fromAi) {
        timeouts.current.push(window.setTimeout(() => setTyping(true), delay));
        delay += 900;
      }
      timeouts.current.push(window.setTimeout(() => {
        setTyping(false);
        setVisibleCount(i + 1);
      }, delay));
      delay += m.from === "guardrail" ? 1400 : m.from === "system" ? 600 : 1100;
    });
    return () => timeouts.current.forEach(clearTimeout);
  }, [tab, inView, reduced, messages]);

  useEffect(() => {
    const el = threadRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [shown.length, typing]);

  const lastAiIdx = shown.map((m) => m.from).lastIndexOf("ai");
  const leadDone = reduced || shown.some((m) => m.from === "system");

  const recTone = (level: string) =>
    level === "HIGH"
      ? { bg: "var(--pu-danger-soft)", fg: "var(--pu-danger-text)" }
      : level === "MEDIUM"
        ? { bg: "var(--pu-warning-soft)", fg: "var(--pu-warning)" }
        : { bg: "var(--pu-info-soft)", fg: "var(--pu-info)" };

  return (
    <section id="inbox-demo" className="py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section header — marketing (dark) styling */}
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">
            {t("kicker")}
          </p>
          <h2 className="font-display text-3xl sm:text-5xl">{t("title")}</h2>
          <p className="mt-4 text-muted-foreground">{t("sub")}</p>
        </div>

        {/* Sector tabs */}
        <div className="mb-6 flex flex-wrap justify-center gap-2" role="tablist" aria-label={t("kicker")}>
          {tabs.map((label, i) => (
            <button
              key={label}
              role="tab"
              aria-selected={tab === i}
              onClick={() => setTab(i)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                tab === i
                  ? "bg-accent text-accent-foreground"
                  : "border border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* The product window — light .product-ui */}
        <motion.div
          onViewportEnter={() => setInView(true)}
          onViewportLeave={() => setInView(false)}
          viewport={{ margin: "-100px" }}
          className="product-ui ember-glow overflow-hidden rounded-2xl border border-border text-left"
          aria-hidden="true"
        >
          {/* Top bar */}
          <div
            className="flex items-center gap-2 border-b px-4 py-2.5"
            style={{ background: "var(--pu-surface)", borderColor: "var(--pu-border)" }}
          >
            <QaqnuzMark className="h-5 w-4" />
            <span className="text-sm font-bold tracking-tight" style={{ color: "var(--pu-text)" }}>Qaqnuz</span>
            <span
              className="ml-2 hidden rounded-full px-3 py-1 text-[11px] sm:block"
              style={{ background: "var(--pu-surface-muted)", color: "var(--pu-text-muted)" }}
            >
              {ui.brandPill}
            </span>
            <div
              className="ml-auto hidden items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] lg:flex"
              style={{ background: "var(--pu-surface-muted)", color: "var(--pu-text-subtle)" }}
            >
              <Search className="h-3 w-3" />
              <span className="max-w-[180px] truncate">{ui.search}</span>
              <span className="rounded px-1" style={{ background: "var(--pu-surface)" }}>⌘K</span>
            </div>
            <span
              className="ml-2 rounded-full px-2.5 py-1 text-[11px] font-semibold"
              style={{ background: "var(--pu-success-soft)", color: "var(--pu-success-text)" }}
            >
              {ui.sla}
            </span>
            <span
              className="flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold text-white"
              style={{ background: "var(--pu-primary)" }}
            >
              SN
            </span>
          </div>

          <div className="grid md:grid-cols-[56px_1fr] lg:grid-cols-[56px_248px_1fr] xl:grid-cols-[56px_248px_1fr_248px]">
            {/* Nav rail */}
            <nav
              className="hidden flex-col items-center gap-3 border-r py-4 md:flex"
              style={{ background: "var(--pu-surface)", borderColor: "var(--pu-border)" }}
            >
              {NAV_ICONS.map((Icon, i) => (
                <span
                  key={ui.nav[i]}
                  title={ui.nav[i]}
                  className="relative flex h-9 w-9 items-center justify-center rounded-lg"
                  style={i === 1 ? { background: "var(--pu-primary)", color: "var(--pu-text-inverse)" } : { color: "var(--pu-text-subtle)" }}
                >
                  <Icon className="h-4 w-4" />
                  {i === 1 && (
                    <span
                      className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[8px] font-bold text-white"
                      style={{ background: "var(--pu-danger)" }}
                    >
                      23
                    </span>
                  )}
                </span>
              ))}
            </nav>

            {/* Conversation list */}
            <div
              className="hidden border-r lg:block"
              style={{ background: "var(--pu-surface)", borderColor: "var(--pu-border)" }}
            >
              <div className="border-b px-3 py-2.5" style={{ borderColor: "var(--pu-border)" }}>
                <p className="flex items-center gap-2 text-sm font-bold" style={{ color: "var(--pu-text)" }}>
                  {t("inboxTitle")}
                  <span className="rounded px-1.5 text-xs" style={{ background: "var(--pu-surface-muted)", color: "var(--pu-text-muted)" }}>147</span>
                </p>
                <div className="mt-2 flex gap-1.5 overflow-x-auto pb-0.5">
                  {ui.filters.map((f, i) => (
                    <span
                      key={f}
                      className="shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold"
                      style={i === 0
                        ? { background: "var(--pu-primary)", color: "var(--pu-text-inverse)" }
                        : { background: "var(--pu-surface-muted)", color: "var(--pu-text-muted)" }}
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>
              <ul>
                {convos.map((c, i) => {
                  const tag = ui[ROW_TAGS[i]];
                  const tagStyle =
                    ROW_TAGS[i] === "tagEscalation"
                      ? { background: "var(--pu-danger-soft)", color: "var(--pu-danger-text)" }
                      : ROW_TAGS[i] === "tagPlaybook"
                        ? { background: "var(--pu-purple-soft)", color: "var(--pu-purple)" }
                        : { background: "var(--pu-success-soft)", color: "var(--pu-success-text)" };
                  return (
                    <li key={c.customer}>
                      <button
                        onClick={() => setTab(i)}
                        aria-hidden="true"
                        tabIndex={-1}
                        className="flex w-full items-start gap-2.5 px-3 py-3 text-left transition-colors"
                        style={tab === i
                          ? { background: "var(--pu-surface-sky)", borderLeft: "2px solid var(--pu-primary)" }
                          : { borderLeft: "2px solid transparent" }}
                      >
                        <span className="relative">
                          <Avatar name={c.customer} />
                          <span className="absolute -bottom-0.5 -right-0.5"><ChannelBadge channel={c.channel} /></span>
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-[13px] font-semibold" style={{ color: "var(--pu-text)" }}>{c.customer}</span>
                          <span className="block truncate text-xs" style={{ color: "var(--pu-text-muted)" }}>{c.preview}</span>
                          <span className="mt-1 flex items-center gap-1">
                            <span className="rounded px-1.5 py-0.5 text-[9px] font-bold" style={tagStyle}>{tag}</span>
                            <span className="text-[9px]" style={{ color: "var(--pu-text-subtle)" }}>{ROW_SCORES[i]}</span>
                          </span>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Thread */}
            <div className="flex min-h-[440px] flex-col" style={{ background: "var(--pu-bg)" }}>
              {/* Thread header + journey chips */}
              <div className="border-b" style={{ background: "var(--pu-surface)", borderColor: "var(--pu-border)" }}>
                <div className="flex items-center gap-2.5 px-4 py-2.5">
                  <span className="relative">
                    <Avatar name={convo.customer} />
                    <span className="absolute -bottom-0.5 -right-0.5"><ChannelBadge channel={convo.channel} /></span>
                  </span>
                  <div>
                    <p className="text-sm font-bold" style={{ color: "var(--pu-text)" }}>{convo.customer}</p>
                    <p className="text-[11px]" style={{ color: "var(--pu-text-subtle)" }}>{channelLabel(convo.channel)}</p>
                  </div>
                  <span
                    className="ml-auto rounded-full px-2.5 py-1 text-[10px] font-bold"
                    style={{ background: "var(--pu-success-soft)", color: "var(--pu-success-text)" }}
                  >
                    ● {t("aiActive")}
                  </span>
                </div>
                <div className="flex gap-1.5 overflow-x-auto px-4 pb-2.5">
                  {ui.journey.map((j, i) => {
                    const last = i === ui.journey.length - 1;
                    return (
                      <span
                        key={j}
                        className="flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium"
                        style={last
                          ? { background: "var(--pu-danger-soft)", color: "var(--pu-danger-text)" }
                          : { background: "var(--pu-surface-muted)", color: "var(--pu-text-muted)" }}
                      >
                        {j} {last ? "" : <Check className="h-2.5 w-2.5" />}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Messages */}
              <div ref={threadRef} className="flex max-h-[420px] flex-1 flex-col gap-3 overflow-y-auto p-4" aria-live="off">
                <AnimatePresence initial={false}>
                  {shown.map((m, i) => (
                    <motion.div
                      key={`${tab}-${m.from}-${i}`}
                      initial={reduced ? false : { opacity: 0, y: 12, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, filter: "blur(8px)", transition: { duration: 0.45 } }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                      <Bubble msg={m} customer={convo.customer} isLastAi={i === lastAiIdx} ui={ui} delivered={t("delivered")} />
                    </motion.div>
                  ))}
                </AnimatePresence>
                {typing && !reduced && (
                  <div className="flex justify-end">
                    <span
                      className="flex items-center gap-1.5 rounded-2xl px-3 py-2 text-[11px]"
                      style={{ background: "var(--pu-surface-sky)", color: "var(--pu-text-muted)" }}
                    >
                      ✦ {t("typing")} <TypingDots />
                    </span>
                  </div>
                )}
              </div>

              {/* Composer */}
              <div className="border-t p-3" style={{ background: "var(--pu-surface)", borderColor: "var(--pu-border)" }}>
                <div className="mb-2 flex gap-1.5 overflow-x-auto">
                  {ui.quickActions.map((q) => (
                    <span
                      key={q}
                      className="shrink-0 rounded-full border px-2.5 py-1 text-[10px]"
                      style={{ borderColor: "var(--pu-border)", color: "var(--pu-text-muted)" }}
                    >
                      {q}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex rounded-lg p-0.5 text-[10px] font-semibold" style={{ background: "var(--pu-surface-muted)" }}>
                    {ui.composerToggle.map((c, i) => (
                      <span
                        key={c}
                        className="rounded-md px-2 py-1"
                        style={i === 0 ? { background: "var(--pu-primary)", color: "var(--pu-text-inverse)" } : { color: "var(--pu-text-muted)" }}
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                  <span className="flex-1 truncate text-[12px]" style={{ color: "var(--pu-text-subtle)" }}>{ui.replyPlaceholder}</span>
                  <span className="rounded-lg px-3 py-1.5 text-xs font-semibold text-white" style={{ background: "var(--pu-primary)" }}>{ui.send}</span>
                </div>
              </div>
            </div>

            {/* AI analysis panel */}
            <aside className="hidden border-l p-3.5 xl:block" style={{ background: "var(--pu-surface)", borderColor: "var(--pu-border)" }}>
              <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "var(--pu-text-subtle)" }}>{ui.panelTitle}</p>

              <div className="mt-2 rounded-lg p-2.5" style={{ background: "var(--pu-surface-muted)" }}>
                <p className="flex justify-between text-[11px] font-semibold" style={{ color: "var(--pu-text)" }}>
                  {ui.intent} <span style={{ color: "var(--pu-purple)" }}>0.94</span>
                </p>
                <div className="mt-1.5 h-1.5 rounded-full" style={{ background: "var(--pu-border)" }}>
                  <div className="h-1.5 rounded-full" style={{ width: "94%", background: "var(--pu-purple)" }} />
                </div>
              </div>

              <div className="mt-2 flex items-center justify-between rounded-lg p-2.5 text-[11px]" style={{ background: "var(--pu-surface-muted)" }}>
                <span className="font-semibold" style={{ color: "var(--pu-text)" }}>{ui.sentiment}</span>
                <span style={{ color: "var(--pu-success-text)" }}>● {ui.sentimentValue}</span>
              </div>

              {/* Layer Moslik checklist */}
              <div className="mt-2 rounded-lg p-2.5" style={{ background: "var(--pu-surface-muted)" }}>
                <p className="mb-1.5 flex justify-between text-[11px] font-semibold" style={{ color: "var(--pu-text)" }}>
                  {ui.layerTitle} <span style={{ color: "var(--pu-text-subtle)" }}>3/4</span>
                </p>
                <ul className="space-y-1">
                  {ui.layers.map((l, i) => {
                    const ok = i < 3;
                    return (
                      <li key={l} className="flex items-center gap-1.5 text-[11px]" style={{ color: "var(--pu-text-muted)" }}>
                        {ok
                          ? <Check className="h-3 w-3" style={{ color: "var(--pu-success)" }} />
                          : <X className="h-3 w-3" style={{ color: "var(--pu-danger)" }} />}
                        {l}
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Recommendations */}
              <p className="mt-3 text-[10px] font-bold uppercase tracking-wider" style={{ color: "var(--pu-text-subtle)" }}>{ui.recsTitle}</p>
              <div className="mt-1.5 space-y-1.5">
                {ui.recs.map((r) => {
                  const tone = recTone(r.level);
                  return (
                    <div key={r.level} className="flex items-center gap-2 rounded-lg p-2" style={{ background: "var(--pu-surface-muted)" }}>
                      <span className="rounded px-1.5 py-0.5 text-[8px] font-bold" style={{ background: tone.bg, color: tone.fg }}>{r.level}</span>
                      <span className="min-w-0 flex-1 truncate text-[11px]" style={{ color: "var(--pu-text)" }}>{r.text}</span>
                      {r.score && <span className="text-[10px]" style={{ color: "var(--pu-text-subtle)" }}>{r.score}</span>}
                    </div>
                  );
                })}
              </div>

              {/* Lead status */}
              <div className="mt-3 rounded-lg p-2.5" style={{ background: "var(--pu-surface-muted)" }}>
                <p className="flex items-baseline justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "var(--pu-text-subtle)" }}>{ui.leadTitle}</span>
                  <span className="text-lg font-bold" style={{ color: "var(--pu-success-text)" }}>{ui.leadValue}</span>
                </p>
                <div className="mt-1 h-1.5 rounded-full" style={{ background: "var(--pu-border)" }}>
                  <div className="h-1.5 rounded-full" style={{ width: ui.leadValue, background: "var(--pu-success)" }} />
                </div>
                <p className="mt-1 text-[10px]" style={{ color: "var(--pu-text-subtle)" }}>{ui.leadNote}</p>
              </div>

              {/* Lead-captured toast */}
              <AnimatePresence>
                {leadDone && (
                  <motion.div
                    initial={reduced ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-3 rounded-lg border p-2.5"
                    style={{ borderColor: "var(--pu-success)", background: "var(--pu-success-soft)" }}
                  >
                    <p className="text-[11px] font-bold" style={{ color: "var(--pu-success-text)" }}>✅ {t("leadCaptured")}</p>
                    <p className="mt-0.5 text-[10px]" style={{ color: "var(--pu-success-text)" }}>
                      {convo.messages[convo.messages.length - 1].text}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </aside>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
