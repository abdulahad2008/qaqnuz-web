import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, TrendingUp, Clock, Users, MessageSquare } from "lucide-react";
import { Section, Container } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/motion/fade-in";
import { Footer } from "@/components/sections/footer";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Fashion Brand 3× Response Rate — Qaqnuz Case Study",
  description:
    "How a Tashkent fashion brand tripled Instagram DM response rate with Qaqnuz AI automation.",
};

/* TODO: Replace all placeholder content below with a real brand story.
   Interview questions to gather:
   - Brand name and Instagram handle (with permission to publish)
   - Pre-Qaqnuz baseline metrics (response rate, avg response time, volume)
   - Deployment timeline (L1 → L2 → L3 progression)
   - Specific challenges solved (overnight gaps, comment volume, etc.)
   - Post-deployment metrics with verification date
   - Quote from founder/operator for pull quote
*/

export default function BrandGrowthCaseStudy() {
  return (
    <>
      <Section className="pt-32">
        <Container size="sm">
          <FadeIn>
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 text-sm text-[var(--color-neutral-500)] hover:text-[var(--color-neutral-200)] mb-8 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" /> All case studies
            </Link>

            <div className="flex flex-wrap gap-2 mb-6">
              {["Fashion", "Tashkent", "L3 Trust", "Multi-channel"].map((tag) => (
                <Badge key={tag} variant="neutral" className="text-[10px]">
                  {tag}
                </Badge>
              ))}
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold text-[var(--color-neutral-50)] leading-tight mb-6">
              How a fashion brand{" "}
              <span className="gradient-ember">tripled their DM response rate</span>
            </h1>

            <p className="text-lg text-[var(--color-neutral-400)] leading-relaxed mb-10">
              A Tashkent-based fashion retailer deployed Qaqnuz to handle Instagram
              DMs across three accounts. Starting at Trust Level L1, they progressed to
              L3 in 8 weeks — while maintaining a 4.9/5 customer satisfaction score.
              <span className="block mt-2 text-sm text-[var(--color-neutral-600)] font-mono">
                TODO: Replace with verified brand details and consent.
              </span>
            </p>

            {/* Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
              {[
                { icon: TrendingUp, value: "3×", label: "Response rate", color: "var(--color-ember-400)" },
                { icon: Clock, value: "4 min", label: "Avg response time", color: "var(--color-trust-400)" },
                { icon: Users, value: "94%", label: "DMs handled by AI", color: "#4ade80" },
                { icon: MessageSquare, value: "1,200+", label: "DMs/month", color: "#c084fc" },
              ].map((metric) => {
                const Icon = metric.icon;
                return (
                  <div key={metric.label} className="surface-card p-4 text-center">
                    <Icon className="h-5 w-5 mx-auto mb-2" style={{ color: metric.color }} />
                    <div className="text-2xl font-bold mb-1" style={{ color: metric.color }}>
                      {metric.value}
                    </div>
                    <div className="text-xs text-[var(--color-neutral-500)]">
                      {metric.label}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Article body */}
            <div className="prose prose-invert max-w-none space-y-6 text-[var(--color-neutral-400)]">
              <h2 className="text-2xl font-bold text-[var(--color-neutral-100)]">
                The challenge
              </h2>
              <p>
                TODO: Describe the brand&apos;s pre-automation situation. What was the response
                rate? How many hours per day was a human spending on DMs? What was the
                cost of missed conversations during off-hours?
              </p>

              <h2 className="text-2xl font-bold text-[var(--color-neutral-100)]">
                The Qaqnuz deployment
              </h2>
              <p>
                TODO: Walk through the onboarding process. Brand profile configuration,
                trust level progression (L1 → L2 → L3), specific guardrail customizations,
                and how the operator used the Mission Control queue.
              </p>

              <h2 className="text-2xl font-bold text-[var(--color-neutral-100)]">
                Results
              </h2>
              <p>
                TODO: Add verified before/after metrics with dates. Include operator
                quote. Add specific examples of conversation types that were automated.
              </p>
            </div>

            <div className="mt-12 pt-8 border-t border-[rgba(255,255,255,0.07)]">
              <Button size="lg" asChild>
                <Link href="/book-demo">
                  Get similar results for your brand
                </Link>
              </Button>
            </div>
          </FadeIn>
        </Container>
      </Section>

      <Footer />
    </>
  );
}
