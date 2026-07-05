"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  MessageCircle,
  MessageSquare,
  Bookmark,
  Heart,
  Send,
  MoreHorizontal,
  CheckCheck,
} from "lucide-react";
import { Section, Container, SectionHeader } from "@/components/ui/section";
import { FadeIn } from "@/components/motion/fade-in";

/*
 * Living Instagram surface demos (DM / Comments / Story). Each screen plays a
 * timed sequence when its tab is active and the phone is in view; it restarts
 * when the tab is re-selected and renders a static final state under
 * prefers-reduced-motion. All copy comes from channels.screens; all colour
 * comes from the .product-ui token layer (social surfaces are light/dark
 * product chrome, deliberately distinct from the dark marketing shell). The
 * decorative internals are aria-hidden; the tab buttons stay keyboard-native.
 */

type Dm = { handle: string; activeNow: string; placeholder: string; messages: { from: string; text: string }[] };
type Comment = { user: string; text: string; ai: boolean; likes: number };
type Comments = { handle: string; location: string; caption: string; list: Comment[] };
type Story = {
  handle: string; time: string; title: string; subtitle: string;
  mentionLabel: string; mention: string; reply: string; stamp: string;
};
type Screens = {
  typing: string; read: string; aiChip: string; leadToast: string; likes: string; ago: string; aiComment: string;
  dm: Dm; comments: Comments; story: Story;
};

/* ── shared bits ──────────────────────────────────────────── */

function StatusBar({ dark = false }: { dark?: boolean }) {
  const color = dark ? "var(--pu-text-inverse)" : "var(--pu-text)";
  return (
    <div className="flex items-center justify-between px-6 pt-2.5 pb-1 text-[10px] font-semibold" style={{ color }}>
      <span>9:41</span>
      <span className="flex items-center gap-1">
        <span className="flex gap-[2px] items-end">
          {[3, 5, 7, 9].map((h) => (
            <span key={h} className="w-[3px] rounded-sm" style={{ height: h, background: color }} />
          ))}
        </span>
        <span className="ml-0.5 inline-block h-2 w-4 rounded-[3px] border" style={{ borderColor: color }}>
          <span className="block h-full w-2/3 rounded-[1px]" style={{ background: color }} />
        </span>
      </span>
    </div>
  );
}

function IgAvatar({ letter, size = 28, ring = false }: { letter: string; size?: number; ring?: boolean }) {
  return (
    <span
      className="flex shrink-0 items-center justify-center rounded-full font-bold text-white"
      style={{
        width: size,
        height: size,
        fontSize: size * 0.36,
        background: "var(--pu-gradient-instagram)",
        boxShadow: ring ? "0 0 0 2px var(--pu-surface), 0 0 0 3.5px transparent" : undefined,
      }}
    >
      {letter}
    </span>
  );
}

function TypingDots({ dark = false }: { dark?: boolean }) {
  return (
    <span className="flex gap-1" aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-1.5 w-1.5 rounded-full"
          style={{ background: dark ? "var(--pu-text-inverse)" : "var(--pu-text-subtle)" }}
          animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
          transition={{ repeat: Infinity, duration: 0.9, delay: i * 0.15 }}
        />
      ))}
    </span>
  );
}

function PhoneShell({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <div className="product-ui relative" style={{ width: 280 }} aria-hidden="true">
      {/* soft glow */}
      <div
        className="absolute -inset-6 -z-10 rounded-[3rem] blur-3xl"
        style={{ background: "var(--pu-primary-soft)", opacity: 0.5 }}
      />
      <div
        className="relative rounded-[2.9rem] p-[3px]"
        style={{ background: "var(--pu-bezel)", boxShadow: "0 30px 80px -22px rgba(0,0,0,0.55)" }}
      >
        <div
          className="relative overflow-hidden rounded-[2.6rem]"
          style={{ background: dark ? "var(--pu-story-bg)" : "var(--pu-surface)" }}
        >
          {/* Dynamic Island */}
          <div
            className="absolute left-1/2 top-2 z-30 h-5 w-[68px] -translate-x-1/2 rounded-full"
            style={{ background: "var(--pu-bezel-notch)" }}
          />
          {/* screen reflection highlight */}
          <div
            className="pointer-events-none absolute inset-0 z-20"
            style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.10) 0%, transparent 38%)" }}
          />
          <div style={{ height: 532 }} className="relative flex flex-col">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── DM screen ────────────────────────────────────────────── */

function DMScreen({ s, ui, play, reduced }: { s: Dm; ui: Screens; play: boolean; reduced: boolean }) {
  const total = s.messages.length;
  const L = s.handle.charAt(0).toUpperCase();
  const [step, setStep] = useState(reduced ? total : 0);
  const [typing, setTyping] = useState(false);
  const threadRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduced) { setStep(total); return; }
    if (!play) return;
    setStep(0);
    setTyping(false);
    const timers: number[] = [];
    let delay = 600;
    s.messages.forEach((m, i) => {
      if (m.from === "ai") {
        timers.push(window.setTimeout(() => setTyping(true), delay));
        delay += 950;
      }
      timers.push(window.setTimeout(() => { setTyping(false); setStep(i + 1); }, delay));
      delay += 1150;
    });
    return () => timers.forEach(clearTimeout);
  }, [play, reduced, s.messages, total]);

  useEffect(() => {
    if (threadRef.current) threadRef.current.scrollTop = threadRef.current.scrollHeight;
  }, [step, typing]);

  const shown = s.messages.slice(0, step);
  const lastAi = shown.map((m) => m.from).lastIndexOf("ai");

  return (
    <>
      <StatusBar />
      {/* header */}
      <div className="flex items-center gap-2 border-b px-3 pb-2 pt-1" style={{ borderColor: "var(--pu-border)" }}>
        <span className="relative">
          <IgAvatar letter={L} size={30} />
          <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2" style={{ background: "var(--pu-success)", borderColor: "var(--pu-surface)" }} />
        </span>
        <div className="min-w-0">
          <div className="text-[12px] font-semibold" style={{ color: "var(--pu-text)" }}>{s.handle}</div>
          <div className="text-[9px]" style={{ color: "var(--pu-text-subtle)" }}>{s.activeNow}</div>
        </div>
        <MoreHorizontal className="ml-auto h-4 w-4" style={{ color: "var(--pu-text-subtle)" }} />
      </div>

      {/* thread */}
      <div ref={threadRef} className="flex flex-1 flex-col gap-2 overflow-hidden px-3 py-3" style={{ background: "var(--pu-bg)" }}>
        <AnimatePresence initial={false}>
          {shown.map((m, i) => {
            const isCustomer = m.from === "customer";
            return (
              <motion.div
                key={i}
                initial={reduced ? false : { opacity: 0, y: 10, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 380, damping: 26 }}
                className={`flex flex-col ${isCustomer ? "items-end" : "items-start"}`}
              >
                <div className="flex items-end gap-1.5">
                  {!isCustomer && <IgAvatar letter={L} size={18} />}
                  <p
                    className="max-w-[190px] rounded-2xl px-3 py-2 text-[11px] leading-relaxed"
                    style={
                      isCustomer
                        ? { background: "var(--pu-primary)", color: "var(--pu-text-inverse)", borderBottomRightRadius: 4 }
                        : { background: "var(--pu-surface-muted)", color: "var(--pu-text)", borderBottomLeftRadius: 4 }
                    }
                  >
                    {m.text}
                  </p>
                </div>
                {!isCustomer && (
                  <span className="ml-6 mt-1 flex items-center gap-1 text-[8px]" style={{ color: "var(--pu-text-subtle)" }}>
                    <span className="rounded px-1 py-0.5 font-semibold" style={{ background: "var(--pu-primary-soft)", color: "var(--pu-primary)" }}>✦ {ui.aiChip}</span>
                    {i === lastAi && <span className="flex items-center gap-0.5" style={{ color: "var(--pu-primary)" }}><CheckCheck className="h-2.5 w-2.5" />{ui.read}</span>}
                  </span>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
        {typing && !reduced && (
          <div className="flex items-end gap-1.5">
            <IgAvatar letter={L} size={18} />
            <span className="rounded-2xl px-3 py-2.5" style={{ background: "var(--pu-surface-muted)", borderBottomLeftRadius: 4 }}>
              <TypingDots />
            </span>
          </div>
        )}
      </div>

      {/* lead toast */}
      <AnimatePresence>
        {step >= total && (
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-3 mb-1 flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[10px] font-bold"
            style={{ background: "var(--pu-success-soft)", color: "var(--pu-success-text)" }}
          >
            ✅ {ui.leadToast}
          </motion.div>
        )}
      </AnimatePresence>

      {/* input */}
      <div className="flex items-center gap-2 border-t px-3 py-2" style={{ borderColor: "var(--pu-border)" }}>
        <div className="flex-1 rounded-full px-3 py-1.5 text-[10px]" style={{ background: "var(--pu-surface-muted)", color: "var(--pu-text-subtle)" }}>
          {s.placeholder}
        </div>
        <span className="flex h-6 w-6 items-center justify-center rounded-full" style={{ background: "var(--pu-primary)" }}>
          <Send className="h-3 w-3" style={{ color: "var(--pu-text-inverse)" }} />
        </span>
      </div>
    </>
  );
}

/* ── Comments screen ──────────────────────────────────────── */

function CommentsScreen({ s, ui, play, reduced }: { s: Comments; ui: Screens; play: boolean; reduced: boolean }) {
  const total = s.list.length;
  const L = s.handle.charAt(0).toUpperCase();
  const [count, setCount] = useState(reduced ? total : 0);
  const [liked, setLiked] = useState(reduced);
  const [likeN, setLikeN] = useState(reduced ? 248 : 214);

  useEffect(() => {
    if (reduced) { setCount(total); setLiked(true); setLikeN(248); return; }
    if (!play) return;
    setCount(0); setLiked(false); setLikeN(214);
    const timers: number[] = [];
    s.list.forEach((_, i) => timers.push(window.setTimeout(() => setCount(i + 1), 700 + i * 750)));
    timers.push(window.setTimeout(() => { setLiked(true); setLikeN(248); }, 700 + total * 750 + 400));
    return () => timers.forEach(clearTimeout);
  }, [play, reduced, s.list, total]);

  return (
    <>
      <StatusBar />
      {/* post header */}
      <div className="flex items-center gap-2 px-3 pb-2 pt-1">
        <IgAvatar letter={L} size={28} ring />
        <div>
          <div className="text-[11px] font-semibold" style={{ color: "var(--pu-text)" }}>{s.handle}</div>
          <div className="text-[8px]" style={{ color: "var(--pu-text-subtle)" }}>{s.location}</div>
        </div>
        <MoreHorizontal className="ml-auto h-4 w-4" style={{ color: "var(--pu-text-subtle)" }} />
      </div>
      {/* post image */}
      <div className="relative flex h-[120px] items-center justify-center" style={{ background: "var(--pu-surface-sky)" }}>
        <span className="text-4xl">👗</span>
        <span className="absolute bottom-2 left-2 rounded px-1.5 py-0.5 text-[9px] font-medium" style={{ background: "var(--pu-surface)", color: "var(--pu-text-muted)" }}>{s.caption}</span>
      </div>
      {/* actions */}
      <div className="flex items-center gap-3 px-3 py-2">
        <motion.span animate={liked && !reduced ? { scale: [1, 1.4, 1] } : {}} transition={{ duration: 0.4 }}>
          <Heart className="h-5 w-5" style={{ color: liked ? "var(--pu-heart)" : "var(--pu-text-muted)", fill: liked ? "var(--pu-heart)" : "transparent" }} />
        </motion.span>
        <MessageCircle className="h-5 w-5" style={{ color: "var(--pu-text-muted)" }} />
        <Send className="h-5 w-5" style={{ color: "var(--pu-text-muted)" }} />
        <Bookmark className="ml-auto h-5 w-5" style={{ color: "var(--pu-text-muted)" }} />
      </div>
      <div className="px-3 text-[10px] font-semibold" style={{ color: "var(--pu-text)" }}>{likeN.toLocaleString()} {ui.likes}</div>

      {/* comments */}
      <div className="flex flex-1 flex-col gap-2 overflow-hidden px-3 py-2">
        <AnimatePresence initial={false}>
          {s.list.slice(0, count).map((c, i) => (
            <motion.div
              key={i}
              initial={reduced ? false : { opacity: 0, x: -8, filter: "blur(4px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.35 }}
              className="flex gap-2"
            >
              {c.ai ? <IgAvatar letter={L} size={20} /> : (
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[8px] font-bold text-white" style={{ background: "var(--pu-text-subtle)" }}>
                  {c.user[1]?.toUpperCase()}
                </span>
              )}
              <div className="min-w-0 flex-1">
                <p className="text-[9px] leading-snug">
                  <span className="font-semibold" style={{ color: c.ai ? "var(--pu-primary)" : "var(--pu-text)" }}>{c.user}</span>{" "}
                  <span style={{ color: "var(--pu-text-muted)" }}>{c.text}</span>
                </p>
                <div className="mt-0.5 flex items-center gap-2 text-[7px]" style={{ color: "var(--pu-text-subtle)" }}>
                  <span>{ui.ago}</span>
                  <span>{c.likes} {ui.likes}</span>
                  {c.ai && (
                    <span className="flex items-center gap-0.5 font-semibold" style={{ color: "var(--pu-primary)" }}>
                      <CheckCheck className="h-2 w-2" /> {ui.aiComment}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
}

/* ── Story screen ─────────────────────────────────────────── */

function StoryScreen({ s, ui, play, reduced }: { s: Story; ui: Screens; play: boolean; reduced: boolean }) {
  const L = s.handle.charAt(0).toUpperCase();
  const [showMention, setShowMention] = useState(reduced);
  const [typed, setTyped] = useState(reduced ? s.reply : "");
  const [showStamp, setShowStamp] = useState(reduced);

  useEffect(() => {
    if (reduced) { setShowMention(true); setTyped(s.reply); setShowStamp(true); return; }
    if (!play) return;
    setShowMention(false); setTyped(""); setShowStamp(false);
    const timers: number[] = [];
    timers.push(window.setTimeout(() => setShowMention(true), 1400));
    // typewriter for the AI reply
    let idx = 0;
    timers.push(window.setTimeout(() => {
      const iv = window.setInterval(() => {
        idx += 1;
        setTyped(s.reply.slice(0, idx));
        if (idx >= s.reply.length) window.clearInterval(iv);
      }, 28);
      timers.push(iv);
    }, 2400));
    timers.push(window.setTimeout(() => setShowStamp(true), 2400 + s.reply.length * 28 + 400));
    return () => timers.forEach((t) => { clearTimeout(t); clearInterval(t); });
  }, [play, reduced, s.reply]);

  return (
    <>
      <StatusBar dark />
      {/* progress bars */}
      <div className="flex gap-1 px-3 pt-1">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-0.5 flex-1 overflow-hidden rounded-full" style={{ background: "rgba(255,255,255,0.3)" }}>
            {i === 0 && (
              <motion.div
                className="h-full rounded-full"
                style={{ background: "var(--pu-text-inverse)" }}
                initial={{ width: reduced ? "100%" : "0%" }}
                animate={{ width: play ? "100%" : reduced ? "100%" : "0%" }}
                transition={{ duration: reduced ? 0 : 5, ease: "linear" }}
              />
            )}
          </div>
        ))}
      </div>
      {/* profile */}
      <div className="flex items-center gap-2 px-3 py-2">
        <IgAvatar letter={L} size={24} />
        <span className="text-[10px] font-semibold" style={{ color: "var(--pu-text-inverse)" }}>{s.handle}</span>
        <span className="text-[8px]" style={{ color: "rgba(255,255,255,0.55)" }}>{s.time}</span>
      </div>
      {/* content */}
      <div className="flex flex-1 flex-col items-center justify-center px-4">
        <span className="mb-1.5 text-3xl">🧥</span>
        <div className="text-center text-[12px] font-bold" style={{ color: "var(--pu-text-inverse)" }}>{s.title}</div>
        <div className="text-[9px]" style={{ color: "rgba(255,255,255,0.7)" }}>{s.subtitle}</div>
      </div>
      {/* mention + AI reply */}
      <div className="px-3 pb-2.5">
        <div className="mb-1.5 text-center text-[8px]" style={{ color: "rgba(255,255,255,0.6)" }}>{s.mentionLabel}</div>
        <AnimatePresence>
          {showMention && (
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-1.5 rounded-2xl px-3 py-2 text-[9px]"
              style={{ background: "rgba(255,255,255,0.12)", color: "var(--pu-text-inverse)" }}
            >
              {s.mention}
            </motion.div>
          )}
        </AnimatePresence>
        {(typed || reduced) && (
          <div className="mb-1.5 rounded-2xl px-3 py-2 text-[9px] leading-relaxed" style={{ background: "var(--pu-primary)", color: "var(--pu-text-inverse)" }}>
            {typed}
            {!reduced && typed.length < s.reply.length && <span className="ml-0.5 inline-block h-2.5 w-[2px] align-middle" style={{ background: "var(--pu-text-inverse)" }} />}
          </div>
        )}
        <AnimatePresence>
          {showStamp && (
            <motion.div initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-center gap-1">
              <CheckCheck className="h-2.5 w-2.5" style={{ color: "var(--pu-success-400)" }} />
              <span className="text-[8px]" style={{ color: "var(--pu-success-400)" }}>{s.stamp}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

/* ── section ──────────────────────────────────────────────── */

const ICONS = { dms: MessageCircle, comments: MessageSquare, stories: Bookmark } as const;

export function ChannelsSection() {
  const t = useTranslations("channels");
  const reduced = useReducedMotion() ?? false;
  const tabs = t.raw("tabs") as { key: string; label: string; subtitle: string; description: string }[];
  const sc = t.raw("screens") as Screens;

  const [active, setActive] = useState("dms");
  const [inView, setInView] = useState(false);
  const activeTab = tabs.find((tab) => tab.key === active) ?? tabs[0];
  const play = inView && !reduced;
  const isDark = active === "stories";

  return (
    <Section id="channels" variant="surface">
      <Container>
        <FadeIn>
          <SectionHeader
            overline={t("overline")}
            title={<>{t("title")} <em className="not-italic text-accent">{t("titleEmphasis")}</em></>}
            description={t("description")}
          />
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left: tabs */}
            <div>
              <div className="mb-8 space-y-1">
                {tabs.map((tab) => {
                  const Icon = ICONS[tab.key as keyof typeof ICONS] ?? MessageCircle;
                  const isActive = active === tab.key;
                  return (
                    <button
                      key={tab.key}
                      onClick={() => setActive(tab.key)}
                      className={`flex w-full items-center gap-4 rounded-xl px-4 py-3.5 text-left transition-all duration-200 ${
                        isActive ? "border border-border bg-background shadow-sm" : "hover:bg-background/60"
                      }`}
                    >
                      <Icon className="h-6 w-6 shrink-0 transition-colors" style={{ color: isActive ? "hsl(var(--accent))" : "hsl(var(--muted-foreground))" }} />
                      <div>
                        <div className={`text-lg font-bold ${isActive ? "text-foreground" : "text-muted-foreground"}`}>{tab.label}</div>
                        {isActive && <div className="mt-0.5 text-xs text-muted-foreground">{tab.subtitle}</div>}
                      </div>
                    </button>
                  );
                })}
              </div>
              <AnimatePresence mode="wait">
                <motion.p
                  key={active}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="px-4 text-sm leading-relaxed text-muted-foreground"
                >
                  {activeTab.description}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Right: phone */}
            <motion.div
              className="flex justify-center lg:justify-end"
              onViewportEnter={() => setInView(true)}
              onViewportLeave={() => setInView(false)}
              viewport={{ margin: "-80px" }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, scale: 0.97, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97, y: -12 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  <PhoneShell dark={isDark}>
                    {active === "dms" && <DMScreen s={sc.dm} ui={sc} play={play} reduced={reduced} />}
                    {active === "comments" && <CommentsScreen s={sc.comments} ui={sc} play={play} reduced={reduced} />}
                    {active === "stories" && <StoryScreen s={sc.story} ui={sc} play={play} reduced={reduced} />}
                  </PhoneShell>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        </FadeIn>
      </Container>
    </Section>
  );
}
