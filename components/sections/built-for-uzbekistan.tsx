"use client";

import { motion } from "framer-motion";
import { Globe, CreditCard, ShieldCheck } from "lucide-react";
import { useTranslations } from "next-intl";
import { Section, Container, SectionHeader } from "@/components/ui/section";
import { FadeIn, FadeInStagger, FadeInChild } from "@/components/motion/fade-in";

// Third-party payment providers Qaqnuz integrates with. Wordmark colours come
// from @theme brand tokens (nominative use). To show an official mark, drop its
// SVG at public/brand/payments/<id>.svg and set hasLogo:true.
const paymentMethods = [
  { id: "click", name: "Click", token: "--color-pay-click", hasLogo: false },
  { id: "payme", name: "Payme", token: "--color-pay-payme", hasLogo: false },
  { id: "uzum",  name: "Uzum",  token: "--color-pay-uzum",  hasLogo: false },
  { id: "humo",  name: "Humo",  token: "--color-pay-humo",  hasLogo: false },
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

        {/* Payment provider logos */}
        <FadeIn delay={0.1}>
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {paymentMethods.map((payment) => (
              <motion.div
                key={payment.id}
                whileHover={{ scale: 1.04, y: -2 }}
                className="flex min-w-[132px] items-center justify-center rounded-2xl border border-border bg-background px-7 py-4 shadow-sm"
              >
                {payment.hasLogo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={`/brand/payments/${payment.id}.svg`}
                    alt={payment.name}
                    className="h-6 w-auto"
                  />
                ) : (
                  <span
                    className="text-xl font-extrabold tracking-tight"
                    style={{ color: `var(${payment.token})` }}
                  >
                    {payment.name}
                  </span>
                )}
              </motion.div>
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
