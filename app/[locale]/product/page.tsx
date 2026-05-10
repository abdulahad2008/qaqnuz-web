import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Cpu, Shield, BarChart3, Zap } from "lucide-react";
import { Section, Container, SectionHeader } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { FadeIn, FadeInStagger, FadeInChild } from "@/components/motion/fade-in";
import { PipelineFlow } from "@/components/pipeline/pipeline-flow";
import { DashboardPreview } from "@/components/dashboard-preview/dashboard-preview";
import { Footer } from "@/components/sections/footer";

export const metadata: Metadata = {
  title: "How Qaqnuz Works — The AI Pipeline",
  description:
    "Deep dive into Qaqnuz's 8-stage AI pipeline, 9-point safety system, and Mission Control dashboard. Built on pgvector RAG, LLM composition, and real-time human oversight.",
};

const architecturePoints = [
  {
    icon: Cpu,
    title: "7 dedicated microservices",
    description:
      "amt-intel (classify), amt-rag (retrieve), amt-guard (safety), amt-eval (quality), amt-trust (gate), amt-conversations (state), amt-comms (publish). Each service is isolated, independently scalable, and observable via OpenTelemetry.",
  },
  {
    icon: Shield,
    title: "Fail-safe by design",
    description:
      "Every AI response passes through all 9 guardrails before publication. If any check fails, the response is rejected — not queued, not edited. The pipeline cannot publish an unguarded response.",
  },
  {
    icon: Zap,
    title: "Cost governance built in",
    description:
      "Per-brand LLM budgets with daily spending caps. Cost per conversation is tracked in real-time. Brands approaching their budget threshold trigger operator alerts automatically.",
  },
  {
    icon: BarChart3,
    title: "Full observability stack",
    description:
      "OpenTelemetry distributed tracing, Prometheus metrics, Pino structured logging, and Grafana dashboards. Every pipeline stage emits traces. You can audit any AI decision in the system.",
  },
];

export default function ProductPage() {
  return (
    <>
      {/* Hero */}
      <Section className="pt-32">
        <Container>
          <FadeIn>
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-overline mb-6">Product Deep Dive</p>
              <h1 className="text-5xl lg:text-7xl font-bold text-[var(--color-neutral-50)] leading-tight mb-6">
                The AI engine behind{" "}
                <span className="gradient-ember">every reply.</span>
              </h1>
              <p className="text-xl text-[var(--color-neutral-400)] leading-relaxed mb-10">
                Qaqnuz is not a chatbot with a prompt. It&apos;s a multi-stage AI
                pipeline with dedicated services for classification, retrieval,
                composition, safety, quality, trust gating, and publication.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" asChild>
                  <Link href="/book-demo">
                    See it live <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/security">Security & Compliance</Link>
                </Button>
              </div>
            </div>
          </FadeIn>
        </Container>
      </Section>

      {/* Pipeline */}
      <PipelineFlow />

      {/* Architecture */}
      <Section variant="surface">
        <Container>
          <FadeIn>
            <SectionHeader
              overline="Architecture"
              title={
                <>
                  Built to{" "}
                  <span className="gradient-ember">enterprise standards.</span>
                </>
              }
              description="Qaqnuz is the operator-facing layer of the Phoenix platform — a production system running on a microservices architecture with full observability."
            />
          </FadeIn>
          <FadeInStagger className="grid md:grid-cols-2 gap-6">
            {architecturePoints.map((point) => {
              const Icon = point.icon;
              return (
                <FadeInChild key={point.title}>
                  <div className="surface-card p-6 h-full">
                    <div className="w-10 h-10 rounded-lg bg-[rgba(240,125,0,0.1)] flex items-center justify-center mb-4">
                      <Icon className="h-5 w-5 text-[var(--color-ember-400)]" />
                    </div>
                    <h3 className="text-base font-semibold text-[var(--color-neutral-100)] mb-2">
                      {point.title}
                    </h3>
                    <p className="text-sm text-[var(--color-neutral-400)] leading-relaxed">
                      {point.description}
                    </p>
                  </div>
                </FadeInChild>
              );
            })}
          </FadeInStagger>
        </Container>
      </Section>

      {/* Technical stack note */}
      <Section>
        <Container size="sm">
          <FadeIn>
            <div className="surface-card p-8">
              <h2 className="text-xl font-bold text-[var(--color-neutral-50)] mb-4">
                Technical Stack
              </h2>
              <div className="grid grid-cols-2 gap-3 font-mono text-sm">
                {[
                  ["Backend API", "Hono · Node.js"],
                  ["Pipeline Queue", "BullMQ · Redis 7"],
                  ["Database", "PostgreSQL 16 + pgvector"],
                  ["Vector Search", "pgvector embeddings"],
                  ["LLM Providers", "OpenRouter · Anthropic · OpenAI"],
                  ["Frontend", "Next.js 16 · React 19"],
                  ["Observability", "OpenTelemetry · Prometheus"],
                  ["Deployment", "Docker · Dokploy · Traefik"],
                ].map(([label, value]) => (
                  <div key={label} className="flex flex-col gap-0.5">
                    <span className="text-[10px] text-[var(--color-neutral-600)] uppercase tracking-wider">
                      {label}
                    </span>
                    <span className="text-[var(--color-ember-300)]">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </Container>
      </Section>

      {/* Dashboard */}
      <DashboardPreview />

      {/* CTA */}
      <Section>
        <Container>
          <FadeIn>
            <div className="text-center">
              <h2 className="text-3xl font-bold text-[var(--color-neutral-50)] mb-4">
                Ready to go deeper?
              </h2>
              <p className="text-[var(--color-neutral-400)] mb-8">
                Book a technical demo and walk through the full pipeline with your own
                Instagram account.
              </p>
              <Button size="xl" asChild>
                <Link href="/book-demo">
                  Book a technical demo <ArrowRight className="h-5 w-5" />
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
