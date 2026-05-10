"use client";

import { motion } from "framer-motion";
import { Globe, CreditCard, ShieldCheck } from "lucide-react";
import { Section, Container, SectionHeader } from "@/components/ui/section";
import { FadeIn, FadeInStagger, FadeInChild } from "@/components/motion/fade-in";

const paymentMethods = [
  { name: "Click", color: "#00b4d8", bg: "rgba(0,180,216,0.1)" },
  { name: "Payme", color: "#1DB954", bg: "rgba(29,185,84,0.1)" },
  { name: "Uzum", color: "#9b59b6", bg: "rgba(155,89,182,0.1)" },
  { name: "Humo", color: "#e67e22", bg: "rgba(230,126,34,0.1)" },
];

const languages = [
  { code: "UZ", name: "O'zbek", flag: "🇺🇿" },
  { code: "RU", name: "Русский", flag: "🇷🇺" },
  { code: "EN", name: "English", flag: "🇬🇧" },
];

const features = [
  {
    icon: Globe,
    title: "Native trilingual AI",
    description:
      "AI composes and understands messages in Uzbek (Latin script), Russian, and English — natively, not via translation. Context is preserved across language switches mid-conversation.",
  },
  {
    icon: CreditCard,
    title: "Local payment ecosystem",
    description:
      "Click, Payme, Uzum, and Humo payment links, instructions, and confirmation flows are built into the AI knowledge base. The bot handles payment questions with precision.",
  },
  {
    icon: ShieldCheck,
    title: "Uzbekistan compliance",
    description:
      "Designed for Uzbekistan's commerce environment: GDPR-adjacent data handling, opt-out via STOP keyword, and configurable data retention policies.",
  },
];

export function BuiltForUzbekistan() {
  return (
    <Section id="uzbekistan" variant="surface">
      <Container>
        <FadeIn>
          <SectionHeader
            overline="Built for Uzbekistan"
            title={
              <>
                Designed for where{" "}
                <span className="gradient-ember">you actually operate.</span>
              </>
            }
            description="Qaqnuz isn't a Western tool adapted for Uzbekistan — it's built from the ground up for Uzbekistan's Instagram commerce ecosystem."
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
                className="flex items-center gap-3 px-6 py-3 rounded-xl border border-[rgba(255,255,255,0.08)] bg-[var(--color-bg-elevated)]"
              >
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ background: payment.color }}
                />
                <span
                  className="text-sm font-bold"
                  style={{ color: payment.color }}
                >
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
                <span className="text-xs font-bold text-[var(--color-neutral-300)]">
                  {lang.code}
                </span>
                <span className="text-xs text-[var(--color-neutral-500)]">
                  {lang.name}
                </span>
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
                  <div className="w-10 h-10 rounded-lg bg-[rgba(240,125,0,0.1)] flex items-center justify-center mb-4">
                    <Icon className="h-5 w-5 text-[var(--color-ember-400)]" />
                  </div>
                  <h3 className="text-base font-semibold text-[var(--color-neutral-100)] mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-[var(--color-neutral-400)] leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </FadeInChild>
            );
          })}
        </FadeInStagger>
      </Container>
    </Section>
  );
}
