"use client";

import { motion } from "framer-motion";
import { Globe, CreditCard, ShieldCheck } from "lucide-react";
import { useTranslations } from "next-intl";
import { Section, Container, SectionHeader } from "@/components/ui/section";
import { FadeIn, FadeInStagger, FadeInChild } from "@/components/motion/fade-in";

const paymentMethods = [
  { name: "Click", color: "#00b4d8", bg: "rgba(0,180,216,0.08)" },
  { name: "Payme", color: "#1DB954", bg: "rgba(29,185,84,0.08)"  },
  { name: "Uzum",  color: "#9b59b6", bg: "rgba(155,89,182,0.08)" },
  { name: "Humo",  color: "#e67e22", bg: "rgba(230,126,34,0.08)" },
];

const languages = [
  { code: "UZ", name: "O'zbek",  flag: "🇺🇿" },
  { code: "RU", name: "Русский", flag: "🇷🇺" },
  { code: "EN", name: "English", flag: "🇬🇧" },
];

const FEATURE_ICONS = [Globe, CreditCard, ShieldCheck] as const;

export function BuiltForUzbekistan() {
  const t = useTranslations("uzbekistan");
  const rawFeatures = t.raw("features") as Array<{ title: string; description: string }>;
  const features = rawFeatures.map((f, i) => ({ ...f, icon: FEATURE_ICONS[i] }));

  return (
    <Section id="uzbekistan" variant="surface">
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
            center
          />
        </FadeIn>

        {/* Payment logos */}
        <FadeIn delay={0.1}>
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {paymentMethods.map((payment) => (
              <motion.div
                key={payment.name}
                whileHover={{ scale: 1.05, y: -2 }}
                className="flex items-center gap-3 px-6 py-3 rounded-xl border border-border bg-background"
                style={{ background: payment.bg }}
              >
                <div className="w-2 h-2 rounded-full" style={{ background: payment.color }} />
                <span className="text-sm font-bold" style={{ color: payment.color }}>
                  {payment.name}
                </span>
              </motion.div>
            ))}
          </div>
        </FadeIn>

        {/* Language badges */}
        <FadeIn delay={0.15}>
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {languages.map((lang) => (
              <div
                key={lang.code}
                className="flex items-center gap-2.5 px-4 py-2 rounded-full surface-elevated"
              >
                <span className="text-base">{lang.flag}</span>
                <span className="text-xs font-bold text-foreground">{lang.code}</span>
                <span className="text-xs text-muted-foreground">{lang.name}</span>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Feature cards */}
        <FadeInStagger className="grid md:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <FadeInChild key={feature.title}>
                <div className="surface-card p-6 h-full">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                    <Icon className="h-5 w-5 text-accent" />
                  </div>
                  <h3 className="text-base font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              </FadeInChild>
            );
          })}
        </FadeInStagger>
      </Container>
    </Section>
  );
}
