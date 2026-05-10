"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check, ArrowRight, Zap } from "lucide-react";
import { Section, Container, SectionHeader } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { FadeIn, FadeInStagger, FadeInChild } from "@/components/motion/fade-in";
import { Badge } from "@/components/ui/badge";

const tiers = [
  {
    name: "Starter",
    price: "Contact us",
    period: "",
    description: "For single brands getting started with AI automation.",
    features: [
      "1 Instagram account",
      "Up to 1,000 DMs / month",
      "Full AI pipeline (all 8 stages)",
      "9 safety guardrails",
      "L1–L2 trust ramp",
      "Email support",
    ],
    cta: "Book a demo",
    ctaVariant: "secondary" as const,
    highlighted: false,
  },
  {
    name: "Growth",
    price: "Contact us",
    period: "",
    description: "For brands scaling their Instagram commerce operations.",
    features: [
      "Up to 5 Instagram accounts",
      "Up to 10,000 DMs / month",
      "Full AI pipeline + proactive DM campaigns",
      "Cost governance & per-brand budgets",
      "L1–L4 trust ramp",
      "Multi-language support (UZ/RU/EN)",
      "Priority support",
    ],
    cta: "Book a demo",
    ctaVariant: "primary" as const,
    highlighted: true,
    badge: "Most popular",
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For agencies and multi-brand operators at scale.",
    features: [
      "Unlimited brands",
      "Unlimited message volume",
      "Full Mission Control dashboard",
      "Custom LLM configuration",
      "SLA + dedicated support",
      "Custom integrations & audit trail export",
      "On-premises deployment available",
    ],
    cta: "Talk to sales",
    ctaVariant: "outline" as const,
    highlighted: false,
  },
];

export function PricingTeaser() {
  return (
    <Section id="pricing">
      <Container>
        <FadeIn>
          <SectionHeader
            overline="Pricing"
            title={
              <>
                Simple tiers.{" "}
                <span className="gradient-ember">No surprises.</span>
              </>
            }
            description="All plans include the full 8-stage AI pipeline and 9 safety guardrails. You pay for volume, not features."
            center
          />
        </FadeIn>

        <FadeInStagger className="grid md:grid-cols-3 gap-6">
          {tiers.map((tier) => (
            <FadeInChild key={tier.name}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="surface-card p-7 flex flex-col h-full relative"
                style={
                  tier.highlighted
                    ? {
                        borderColor: "rgba(240,125,0,0.35)",
                        boxShadow: "0 0 40px -12px rgba(240,125,0,0.25)",
                      }
                    : {}
                }
              >
                {tier.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge variant="ember" className="gap-1">
                      <Zap className="h-2.5 w-2.5" />
                      {tier.badge}
                    </Badge>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-lg font-bold text-[var(--color-neutral-50)] mb-1">
                    {tier.name}
                  </h3>
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-3xl font-bold text-[var(--color-neutral-100)]">
                      {tier.price}
                    </span>
                    {tier.period && (
                      <span className="text-sm text-[var(--color-neutral-500)]">
                        {tier.period}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-[var(--color-neutral-500)] leading-relaxed">
                    {tier.description}
                  </p>
                </div>

                <ul className="space-y-3 flex-1 mb-7">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm">
                      <Check
                        className="h-4 w-4 mt-0.5 shrink-0 text-[var(--color-ember-400)]"
                      />
                      <span className="text-[var(--color-neutral-300)]">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button variant={tier.ctaVariant} size="lg" className="w-full" asChild>
                  <Link href="/book-demo">
                    {tier.cta}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </motion.div>
            </FadeInChild>
          ))}
        </FadeInStagger>

        <FadeIn delay={0.3}>
          <div className="text-center mt-10">
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 text-sm text-[var(--color-ember-400)] hover:text-[var(--color-ember-300)] transition-colors"
            >
              View full pricing & comparison table
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </FadeIn>
      </Container>
    </Section>
  );
}
