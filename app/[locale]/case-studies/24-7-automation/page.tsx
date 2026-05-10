import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Clock, MessageSquare, Star, Zap } from "lucide-react";
import { Section, Container } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/motion/fade-in";
import { Footer } from "@/components/sections/footer";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "24/7 Automation Without a 24/7 Team — Qaqnuz Case Study",
  description:
    "How a cosmetics brand eliminated overnight response delays with Qaqnuz AI automation.",
};

/* TODO: Replace all placeholder content with real brand story.
   Interview questions:
   - Brand name, Instagram handle (with permission)
   - Pre-deployment overnight response gap (hours missed, conversations lost)
   - How L2 trust level was configured for the brand
   - Specific types of messages now handled overnight by AI
   - Customer satisfaction scores before/after
   - Operator time saved per week
   - Quote from brand owner or head of marketing
*/

export default function TwentyFourSevenCaseStudy() {
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
              {["Cosmetics", "Operations", "L2 Trust", "Overnight Coverage"].map((tag) => (
                <Badge key={tag} variant="neutral" className="text-[10px]">
                  {tag}
                </Badge>
              ))}
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold text-[var(--color-neutral-50)] leading-tight mb-6">
              24/7 customer coverage{" "}
              <span className="gradient-ember">without a 24/7 team.</span>
            </h1>

            <p className="text-lg text-[var(--color-neutral-400)] leading-relaxed mb-10">
              A cosmetics brand deploying Qaqnuz at Trust Level L2 eliminated their
              overnight response gap — the 10-hour window where no operator was available.
              AI now handles routine inquiries around the clock; complex cases wait in
              the morning queue for the operator.
              <span className="block mt-2 text-sm text-[var(--color-neutral-600)] font-mono">
                TODO: Replace with verified brand details and consent.
              </span>
            </p>

            {/* Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
              {[
                { icon: Clock, value: "24/7", label: "Availability", color: "var(--color-trust-400)" },
                { icon: MessageSquare, value: "78%", label: "AI-handled", color: "var(--color-ember-400)" },
                { icon: Star, value: "4.9/5", label: "CSAT score", color: "#4ade80" },
                { icon: Zap, value: "<4 min", label: "Response time", color: "#c084fc" },
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

            <div className="space-y-8 text-[var(--color-neutral-400)]">
              <div>
                <h2 className="text-2xl font-bold text-[var(--color-neutral-100)] mb-3">
                  The problem
                </h2>
                <p className="leading-relaxed">
                  TODO: Describe the pre-automation situation — specific hours with no
                  coverage, approximate conversations lost per week, customer complaints
                  about response delays, and the cost of hiring an overnight operator.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-[var(--color-neutral-100)] mb-3">
                  The Qaqnuz approach
                </h2>
                <p className="leading-relaxed">
                  TODO: Describe the specific L2 trust configuration — which message types
                  were set to auto-publish (FAQs, shipping queries, product availability),
                  which required morning review (complaints, returns, custom orders).
                  Include the guardrail customizations made for the cosmetics category.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-[var(--color-neutral-100)] mb-3">
                  Results
                </h2>
                <p className="leading-relaxed">
                  TODO: Include verified metrics with date range. Add operator quote.
                  Mention any unexpected benefits (e.g., comment moderation, story reply
                  automation) that emerged during deployment.
                </p>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-[rgba(255,255,255,0.07)]">
              <Button size="lg" asChild>
                <Link href="/book-demo">
                  Eliminate your coverage gaps
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
