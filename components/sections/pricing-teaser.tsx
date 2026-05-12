"use client";

import { motion } from "framer-motion";
import { Check, ArrowRight, Zap } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/navigation";
import { Section, Container, SectionHeader } from "@/components/ui/section";
import { FadeIn, FadeInStagger, FadeInChild } from "@/components/motion/fade-in";

const TIER_CONFIG = [
  { priceKey: "contactUs", ctaVariant: "outline" as const, highlighted: false  },
  { priceKey: "contactUs", ctaVariant: "primary" as const, highlighted: true   },
  { priceKey: "custom",    ctaVariant: "outline" as const, highlighted: false  },
] as const;

export function PricingTeaser() {
  const t = useTranslations("pricing");
  const rawTiers = t.raw("tiers") as Array<{
    name: string;
    description: string;
    cta: string;
    features: string[];
  }>;

  const tiers = TIER_CONFIG.map((cfg, i) => ({ ...cfg, ...rawTiers[i] }));

  return (
    <Section id="pricing">
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

        <FadeInStagger className="grid md:grid-cols-3 gap-6">
          {tiers.map((tier, i) => (
            <FadeInChild key={tier.name}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="surface-card p-7 flex flex-col h-full relative"
                style={
                  tier.highlighted
                    ? {
                        borderColor: "hsl(var(--accent))",
                        boxShadow: "0 0 0 1px hsl(var(--accent)), 0 20px 60px -12px rgba(99,102,241,0.15)",
                      }
                    : {}
                }
              >
                {tier.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-accent text-accent-foreground px-3 py-1 text-[10px] font-semibold">
                      <Zap className="h-2.5 w-2.5" />
                      {t("mostPopular")}
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-foreground mb-1">{tier.name}</h3>
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-2xl font-semibold text-foreground">
                      {t(tier.priceKey)}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {tier.description}
                  </p>
                </div>

                <ul className="space-y-3 flex-1 mb-7">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm">
                      <Check className="h-4 w-4 mt-0.5 shrink-0 text-accent" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/book-demo"
                  className={
                    tier.highlighted
                      ? "flex items-center justify-center gap-2 w-full rounded-full bg-accent text-accent-foreground px-5 py-2.5 text-sm font-medium hover:bg-accent/90 transition-colors"
                      : "flex items-center justify-center gap-2 w-full rounded-full border border-border text-foreground px-5 py-2.5 text-sm font-medium hover:bg-secondary transition-colors"
                  }
                >
                  {tier.cta}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
            </FadeInChild>
          ))}
        </FadeInStagger>

        <FadeIn delay={0.3}>
          <div className="text-center mt-10">
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 text-sm text-accent hover:text-accent/80 transition-colors"
            >
              {t("viewFull")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </FadeIn>
      </Container>
    </Section>
  );
}
