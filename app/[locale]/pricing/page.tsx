import type { Metadata } from "next";
import Link from "next/link";
import { Check, X, ArrowRight } from "lucide-react";
import { Section, Container, SectionHeader } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { FadeIn, FadeInStagger, FadeInChild } from "@/components/motion/fade-in";
import { FAQ } from "@/components/sections/faq";
import { Footer } from "@/components/sections/footer";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Pricing — Qaqnuz",
  description:
    "Simple, transparent pricing for AI Instagram automation. All plans include the full 8-stage pipeline and 9 safety guardrails.",
};

const features = [
  { name: "Instagram accounts", starter: "1", growth: "Up to 5", enterprise: "Unlimited" },
  { name: "Monthly DM volume", starter: "1,000", growth: "10,000", enterprise: "Unlimited" },
  { name: "8-stage AI pipeline", starter: true, growth: true, enterprise: true },
  { name: "9 safety guardrails", starter: true, growth: true, enterprise: true },
  { name: "Trust ramp (L1–L4)", starter: "L1–L2", growth: "L1–L4", enterprise: "L1–L4" },
  { name: "Proactive DM campaigns", starter: false, growth: true, enterprise: true },
  { name: "Cost governance", starter: false, growth: true, enterprise: true },
  { name: "Multi-language (UZ/RU/EN)", starter: false, growth: true, enterprise: true },
  { name: "Full Mission Control", starter: false, growth: true, enterprise: true },
  { name: "Custom LLM configuration", starter: false, growth: false, enterprise: true },
  { name: "Audit trail export", starter: false, growth: false, enterprise: true },
  { name: "SLA guarantee", starter: false, growth: false, enterprise: true },
  { name: "On-premises deployment", starter: false, growth: false, enterprise: true },
  { name: "Support", starter: "Email", growth: "Priority + CSM", enterprise: "Dedicated SLA" },
];

function Cell({ value }: { value: boolean | string }) {
  if (typeof value === "boolean") {
    return value ? (
      <Check className="h-4 w-4 text-[var(--color-ember-400)] mx-auto" />
    ) : (
      <X className="h-4 w-4 text-[var(--color-neutral-700)] mx-auto" />
    );
  }
  return <span className="text-sm text-[var(--color-neutral-300)]">{value}</span>;
}

export default function PricingPage() {
  return (
    <>
      <Section className="pt-32">
        <Container>
          <FadeIn>
            <SectionHeader
              overline="Pricing"
              title={
                <>
                  Transparent pricing.
                  <br />
                  <span className="gradient-ember">No hidden fees.</span>
                </>
              }
              description="All plans include the full 8-stage AI pipeline, 9 safety guardrails, and audit trail. You pay for scale, not for capabilities."
              center
            />
          </FadeIn>

          {/* Tier cards */}
          <FadeInStagger className="grid md:grid-cols-3 gap-6 mb-16">
            {[
              {
                name: "Starter",
                description: "Single brand, getting started with AI automation.",
                badge: null,
                cta: "Book a demo",
              },
              {
                name: "Growth",
                description: "Scaling brands and multi-account operators.",
                badge: "Most Popular",
                cta: "Book a demo",
              },
              {
                name: "Enterprise",
                description: "Agencies and unlimited-scale operations.",
                badge: null,
                cta: "Talk to sales",
              },
            ].map((tier) => (
              <FadeInChild key={tier.name}>
                <div
                  className={`surface-card p-7 flex flex-col relative ${tier.badge ? "border-[rgba(240,125,0,0.3)]" : ""}`}
                  style={
                    tier.badge
                      ? { boxShadow: "0 0 40px -12px rgba(240,125,0,0.2)" }
                      : {}
                  }
                >
                  {tier.badge && (
                    <div className="absolute -top-3 left-6">
                      <Badge variant="ember">{tier.badge}</Badge>
                    </div>
                  )}
                  <h3 className="text-xl font-bold text-[var(--color-neutral-50)] mb-2">
                    {tier.name}
                  </h3>
                  <p className="text-sm text-[var(--color-neutral-500)] mb-6 flex-1">
                    {tier.description}
                  </p>
                  <Button
                    size="lg"
                    variant={tier.badge ? "primary" : "secondary"}
                    className="w-full"
                    asChild
                  >
                    <Link href="/book-demo">
                      {tier.cta} <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </FadeInChild>
            ))}
          </FadeInStagger>

          {/* Comparison table */}
          <FadeIn delay={0.2}>
            <div className="surface-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[rgba(255,255,255,0.07)]">
                      <th className="text-left p-4 text-[var(--color-neutral-500)] font-medium w-1/2">
                        Feature
                      </th>
                      {["Starter", "Growth", "Enterprise"].map((name) => (
                        <th
                          key={name}
                          className="text-center p-4 text-[var(--color-neutral-300)] font-semibold"
                        >
                          {name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {features.map((row, idx) => (
                      <tr
                        key={row.name}
                        className={`border-b border-[rgba(255,255,255,0.04)] ${
                          idx % 2 === 0 ? "" : "bg-[rgba(255,255,255,0.015)]"
                        }`}
                      >
                        <td className="p-4 text-[var(--color-neutral-400)]">{row.name}</td>
                        <td className="p-4 text-center">
                          <Cell value={row.starter} />
                        </td>
                        <td className="p-4 text-center">
                          <Cell value={row.growth} />
                        </td>
                        <td className="p-4 text-center">
                          <Cell value={row.enterprise} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="mt-10 text-center">
              <Button size="xl" asChild>
                <Link href="/book-demo">
                  Get a custom quote <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <p className="text-sm text-[var(--color-neutral-600)] mt-4">
                All prices are custom-quoted based on your specific volume and requirements.
              </p>
            </div>
          </FadeIn>
        </Container>
      </Section>

      <FAQ />
      <Footer />
    </>
  );
}
