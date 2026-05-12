"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { MessageCircle, MessageSquare, Bookmark, CheckCircle2, Heart } from "lucide-react";
import { Section, Container, SectionHeader } from "@/components/ui/section";
import { FadeIn } from "@/components/motion/fade-in";

/* ── Phone mockup conversations ──────────────────────────── */

function DMPhone() {
  return (
    <div className="flex flex-col h-full bg-white">
      {/* App header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100 bg-white">
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-white text-[10px] font-bold">
          K
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[11px] font-semibold text-gray-900 leading-none">kadr_beauty</div>
          <div className="text-[9px] text-gray-400 mt-0.5">Chat s kompaniyey</div>
        </div>
        <div className="flex gap-2 text-gray-400">
          <div className="w-4 h-4 rounded-full border border-gray-200" />
          <div className="w-4 h-4 rounded-full border border-gray-200" />
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-hidden px-3 py-3 flex flex-col gap-2.5 bg-gray-50/50">
        {/* User message */}
        <div className="flex justify-end">
          <div className="bg-blue-500 text-white text-[10px] rounded-2xl rounded-tr-sm px-3 py-2 max-w-[75%] leading-relaxed">
            Salom! Bu kremning narxi qancha? 🙏
          </div>
        </div>

        {/* Bot response */}
        <div className="flex gap-2">
          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-white text-[7px] font-bold shrink-0 mt-auto">
            K
          </div>
          <div className="bg-white border border-gray-100 text-gray-800 text-[10px] rounded-2xl rounded-tl-sm px-3 py-2 max-w-[75%] leading-relaxed shadow-sm">
            Salom! Bizning Vitamin C kremimiz 89,000 so&apos;m. Hozir buyurtma bersangiz 10% chegirma olasiz! 🎁
          </div>
        </div>

        {/* User follow-up */}
        <div className="flex justify-end">
          <div className="bg-blue-500 text-white text-[10px] rounded-2xl rounded-tr-sm px-3 py-2 max-w-[75%] leading-relaxed">
            Ajoyib! Qanday to&apos;layman?
          </div>
        </div>

        {/* Bot final */}
        <div className="flex gap-2">
          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-white text-[7px] font-bold shrink-0 mt-auto">
            K
          </div>
          <div className="bg-white border border-gray-100 text-gray-800 text-[10px] rounded-2xl rounded-tl-sm px-3 py-2 max-w-[75%] leading-relaxed shadow-sm">
            Click yoki Payme orqali to&apos;lash mumkin. To&apos;lov havolasini yuboraman! 💳
          </div>
        </div>
      </div>

      {/* Input bar */}
      <div className="flex items-center gap-2 px-3 py-2.5 border-t border-gray-100 bg-white">
        <div className="flex-1 rounded-full bg-gray-100 px-3 py-1.5 text-[9px] text-gray-400">
          Xabar yozing...
        </div>
        <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
          <div className="w-2.5 h-2.5 border-r border-t border-white rotate-45 -translate-x-px" />
        </div>
      </div>
    </div>
  );
}

function CommentsPhone() {
  const comments = [
    { user: "@nargiza_u", text: "Bu ko'ylak bormi 38 razmer? 😍",       isBot: false, likes: 3  },
    { user: "dilnoza_style", text: "Ha, 36-42 razmerlarda mavjud! DM yozing, to'liq katalog yuboramiz 🌸", isBot: true, likes: 12 },
    { user: "@malika_t",   text: "Narxi qancha?",                        isBot: false, likes: 1  },
    { user: "dilnoza_style", text: "150,000 so'mdan boshlanadi. Hozir chegirma mavjud! 💜",               isBot: true, likes: 8  },
  ];
  return (
    <div className="flex flex-col h-full bg-white">
      {/* Post header */}
      <div className="flex items-center gap-2 px-3 py-2.5 border-b border-gray-100">
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-400 to-indigo-500 flex items-center justify-center text-white text-[10px] font-bold">
          D
        </div>
        <div>
          <div className="text-[10px] font-semibold text-gray-900">dilnoza_style</div>
          <div className="text-[8px] text-gray-400">Toshkent, O&apos;zbekiston</div>
        </div>
        <div className="ml-auto text-gray-400 text-[9px] font-semibold">···</div>
      </div>

      {/* Post image placeholder */}
      <div className="h-24 bg-gradient-to-br from-purple-100 via-pink-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl mb-1">👗</div>
          <div className="text-[9px] text-gray-500 font-medium">Yangi kolleksiya</div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 px-3 py-2">
        <Heart className="h-4 w-4 text-rose-500" fill="currentColor" />
        <MessageCircle className="h-4 w-4 text-gray-500" />
        <Bookmark className="h-4 w-4 text-gray-500 ml-auto" />
      </div>

      {/* Comments */}
      <div className="flex-1 overflow-hidden px-3 pb-2 flex flex-col gap-2">
        {comments.map((c, i) => (
          <div key={i} className="flex gap-2">
            <div className={`w-5 h-5 rounded-full shrink-0 flex items-center justify-center text-white text-[7px] font-bold ${c.isBot ? "bg-gradient-to-br from-purple-400 to-indigo-500" : "bg-gray-300"}`}>
              {c.user[c.isBot ? 0 : 1].toUpperCase()}
            </div>
            <div className="flex-1">
              <div className="flex items-baseline gap-1 flex-wrap">
                <span className={`text-[9px] font-semibold ${c.isBot ? "text-indigo-600" : "text-gray-800"}`}>
                  {c.user}
                </span>
                <span className="text-[9px] text-gray-600 leading-snug">{c.text}</span>
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[7px] text-gray-400">1d</span>
                <span className="text-[7px] text-gray-400">{c.likes} likes</span>
                {c.isBot && <span className="text-[7px] text-indigo-500 flex items-center gap-0.5"><CheckCircle2 className="h-2 w-2" /> AI</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StoriesPhone() {
  return (
    <div className="flex flex-col h-full bg-white">
      {/* Story viewer header */}
      <div className="bg-gray-900 px-3 pt-3 pb-2">
        {/* Progress bar */}
        <div className="flex gap-1 mb-3">
          <div className="flex-1 h-0.5 rounded-full bg-white" />
          <div className="flex-1 h-0.5 rounded-full bg-white/30" />
          <div className="flex-1 h-0.5 rounded-full bg-white/30" />
        </div>
        {/* Profile */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full border-2 border-orange-400 bg-gradient-to-br from-orange-300 to-pink-400" />
          <span className="text-white text-[10px] font-semibold">moda_house</span>
          <span className="text-white/50 text-[8px]">2h</span>
        </div>
      </div>

      {/* Story content */}
      <div className="flex-1 bg-gradient-to-b from-gray-900 to-gray-800 flex flex-col items-center justify-center px-4">
        <div className="text-center">
          <div className="text-3xl mb-2">🧥</div>
          <div className="text-white text-[11px] font-bold mb-1">Yangi Kuz Kolleksiyasi!</div>
          <div className="text-white/70 text-[9px]">50+ yangi model</div>
        </div>
      </div>

      {/* Story mention reply */}
      <div className="bg-gray-900 px-3 py-3">
        <div className="text-white/60 text-[8px] mb-2 text-center">@sarvinoz mentionladi</div>

        {/* User mention bubble */}
        <div className="bg-white/10 rounded-2xl px-3 py-2 mb-2">
          <div className="text-white text-[9px]">@sarvinoz: 🔥 @moda_house juda yoqdi!</div>
        </div>

        {/* AI reply */}
        <div className="bg-orange-500 rounded-2xl px-3 py-2 mb-2">
          <div className="text-white text-[9px] leading-relaxed">
            Rahmat! 💙 Yangi kolleksiya ko&apos;rishni xohlaysizmi? Maxsus kod: MODA10 🎁
          </div>
        </div>

        <div className="flex items-center gap-1 justify-center">
          <CheckCircle2 className="h-2.5 w-2.5 text-emerald-400" />
          <span className="text-[8px] text-emerald-400">AI auto-replied · 8s</span>
        </div>
      </div>
    </div>
  );
}

const CHANNEL_CONTENT = {
  dms:      { component: DMPhone,       bg: "from-blue-50 to-indigo-50" },
  comments: { component: CommentsPhone, bg: "from-purple-50 to-pink-50" },
  stories:  { component: StoriesPhone,  bg: "from-gray-900 to-gray-800" },
};

const CHANNEL_ICONS = {
  dms:      MessageCircle,
  comments: MessageSquare,
  stories:  Bookmark,
};

const CHANNEL_COLORS = {
  dms:      "hsl(var(--accent))",
  comments: "#7c3aed",
  stories:  "#e11d48",
};

export function ChannelsSection() {
  const t = useTranslations("channels");
  const tabs = t.raw("tabs") as {
    key: string;
    label: string;
    subtitle: string;
    description: string;
  }[];

  const [active, setActive] = useState("dms");
  const activeTab = tabs.find((tab) => tab.key === active) ?? tabs[0];
  const PhoneContent = CHANNEL_CONTENT[active as keyof typeof CHANNEL_CONTENT]?.component ?? DMPhone;

  return (
    <Section variant="surface">
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

        <FadeIn delay={0.1}>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: tabs + description */}
            <div>
              <div className="space-y-1 mb-8">
                {tabs.map((tab) => {
                  const Icon = CHANNEL_ICONS[tab.key as keyof typeof CHANNEL_ICONS] ?? MessageCircle;
                  const isActive = active === tab.key;
                  return (
                    <button
                      key={tab.key}
                      onClick={() => setActive(tab.key)}
                      className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-left transition-all duration-200 ${
                        isActive
                          ? "bg-background shadow-sm border border-border"
                          : "hover:bg-background/60"
                      }`}
                    >
                      <Icon
                        className="h-6 w-6 shrink-0 transition-colors duration-200"
                        style={{ color: isActive ? CHANNEL_COLORS[tab.key as keyof typeof CHANNEL_COLORS] : "hsl(var(--muted-foreground))" }}
                      />
                      <div>
                        <div
                          className={`text-lg font-bold transition-colors duration-200 ${
                            isActive ? "text-foreground" : "text-muted-foreground"
                          }`}
                        >
                          {tab.label}
                        </div>
                        {isActive && (
                          <div className="text-xs text-muted-foreground mt-0.5">{tab.subtitle}</div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Description for active tab */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                >
                  <p className="text-muted-foreground leading-relaxed text-sm px-4">
                    {activeTab.description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right: phone mockup */}
            <div className="flex justify-center lg:justify-end">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, scale: 0.97, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97, y: -12 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="relative"
                  style={{ width: 280 }}
                >
                  {/* Glow behind phone */}
                  <div
                    className="absolute inset-8 rounded-full blur-3xl opacity-30 -z-10"
                    style={{ background: CHANNEL_COLORS[active as keyof typeof CHANNEL_COLORS] }}
                  />

                  {/* Phone shell */}
                  <div
                    className="rounded-[2.8rem] overflow-hidden shadow-2xl"
                    style={{
                      border: "10px solid #1a1a1a",
                      backgroundColor: "#1a1a1a",
                      boxShadow: "0 0 0 1px rgba(255,255,255,0.1) inset, 0 30px 80px -20px rgba(0,0,0,0.4)",
                    }}
                  >
                    {/* Notch / Dynamic Island */}
                    <div className="flex justify-center pt-2.5 pb-1 bg-gray-950">
                      <div className="w-20 h-5 rounded-full bg-gray-900" />
                    </div>

                    {/* Screen */}
                    <div style={{ height: 480 }} className="overflow-hidden">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={active}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.15 }}
                          className="h-full"
                        >
                          <PhoneContent />
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    {/* Home bar */}
                    <div className="flex justify-center py-2 bg-white">
                      <div className="w-24 h-1 rounded-full bg-gray-200" />
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </FadeIn>
      </Container>
    </Section>
  );
}
