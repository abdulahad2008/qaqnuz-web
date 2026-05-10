import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, TrendingUp, Clock, DollarSign } from "lucide-react";
import { Section, Container, SectionHeader } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { FadeIn, FadeInStagger, FadeInChild } from "@/components/motion/fade-in";
import { Footer } from "@/components/sections/footer";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Case Studies — Qaqnuz",
  description:
    "How Uzbekistan brands use Qaqnuz to automate Instagram DMs with AI. Real results, real pipelines.",
};

const caseStudies = [
  {
    slug: "brand-growth",
    title: "How a fashion brand tripled Instagram DM response rate",
    excerpt:
      "A Tashkent-based fashion retailer deployed Qaqnuz at Trust Level L1, gradually ascending to L3 over 8 weeks. Response rate went from 31% to 94%. This is a placeholder case study.",
    metric: "3×",
    metricLabel: "Response rate",
    icon: TrendingUp,
    color: "var(--color-ember-400)",
    tags: ["Fashion", "Engagement", "L3 Trust"],
    status: "TODO: Replace with real brand story and metrics",
  },
  {
    slug: "24-7-automation",
    title: "24/7 coverage without a 24/7 team",
    excerpt:
      "A cosmetics brand eliminated response delays on nights and weekends. Qaqnuz's L2 auto-publish handles routine inquiries; the operator queue surfaces only complex cases. Placeholder case study.",
    metric: "24/7",
    metricLabel: "Always-on",
    icon: Clock,
    color: "var(--color-trust-400)",
    tags: ["Cosmetics", "Operations", "L2 Trust"],
    status: "TODO: Replace with real brand story and metrics",
  },
];

export default function CaseStudiesPage() {
  return (
    <>
      <Section className="pt-32">
        <Container>
          <FadeIn>
            <SectionHeader
              overline="Case Studies"
              title={
                <>
                  What happens when{" "}
                  <span className="gradient-ember">AI takes the wheel.</span>
                </>
              }
              description="Real deployments, real pipelines, real results. Placeholder content — final versions will feature actual brands with verified metrics."
              center
            />
          </FadeIn>

          <FadeInStagger className="grid md:grid-cols-2 gap-6">
            {caseStudies.map((study) => {
              const Icon = study.icon;
              return (
                <FadeInChild key={study.slug}>
                  <Link href={`/case-studies/${study.slug}`} className="group block h-full">
                    <div className="surface-card p-7 h-full flex flex-col group-hover:border-[rgba(240,125,0,0.2)] transition-colors">
                      <div className="flex items-start justify-between mb-5">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center"
                          style={{ background: `${study.color}18` }}
                        >
                          <Icon className="h-6 w-6" style={{ color: study.color }} />
                        </div>
                        <div className="text-right">
                          <div
                            className="text-3xl font-bold"
                            style={{ color: study.color }}
                          >
                            {study.metric}
                          </div>
                          <div className="text-xs text-[var(--color-neutral-500)]">
                            {study.metricLabel}
                          </div>
                        </div>
                      </div>

                      <h2 className="text-lg font-semibold text-[var(--color-neutral-100)] mb-3 leading-snug">
                        {study.title}
                      </h2>
                      <p className="text-sm text-[var(--color-neutral-400)] leading-relaxed flex-1 mb-4">
                        {study.excerpt}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-5">
                        {study.tags.map((tag) => (
                          <Badge key={tag} variant="neutral" className="text-[10px]">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center gap-2 text-sm text-[var(--color-ember-400)] group-hover:text-[var(--color-ember-300)] transition-colors">
                        Read case study
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                      </div>

                      <p className="text-[10px] text-[var(--color-neutral-700)] mt-3 font-mono">
                        {study.status}
                      </p>
                    </div>
                  </Link>
                </FadeInChild>
              );
            })}
          </FadeInStagger>

          <FadeIn delay={0.3}>
            <div className="mt-12 text-center surface-card p-8">
              <h3 className="text-xl font-bold text-[var(--color-neutral-50)] mb-3">
                Want to be a case study?
              </h3>
              <p className="text-[var(--color-neutral-400)] mb-6 max-w-md mx-auto text-sm">
                Early Qaqnuz brands get featured case studies, co-marketing, and discounted
                enterprise rates. Book a demo to learn more.
              </p>
              <Button size="lg" asChild>
                <Link href="/book-demo">
                  Book a demo <ArrowRight className="h-4 w-4" />
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
