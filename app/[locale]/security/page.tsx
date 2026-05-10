import type { Metadata } from "next";
import Link from "next/link";
import { Shield, Lock, Eye, UserX, FileText, StopCircle, Clock, Bot } from "lucide-react";
import { Section, Container, SectionHeader } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { FadeIn, FadeInStagger, FadeInChild } from "@/components/motion/fade-in";
import { Footer } from "@/components/sections/footer";

export const metadata: Metadata = {
  title: "Security & Compliance — Qaqnuz",
  description:
    "How Qaqnuz handles PII, customer data, AI disclosure, opt-out, audit trails, and data retention for Instagram brands in Uzbekistan.",
};

const sections = [
  {
    id: "pii",
    icon: UserX,
    color: "var(--color-trust-400)",
    bg: "rgba(29,184,161,0.1)",
    title: "PII Detection & Handling",
    content: [
      "All incoming messages are scanned for personally identifiable information before AI processing.",
      "Phone numbers, national ID numbers, addresses, and financial data are detected and handled according to your configured retention policy.",
      "PII is never included in LLM prompts — it is extracted, flagged, and stored separately with restricted access.",
      "All PII handling is logged in the full audit trail with operator attribution.",
    ],
  },
  {
    id: "disclosure",
    icon: Bot,
    color: "var(--color-ember-400)",
    bg: "rgba(240,125,0,0.1)",
    title: "AI Disclosure",
    content: [
      'Qaqnuz supports configurable AI disclosure. You can include a disclosure statement in the first AI reply ("This is an automated response — a human can assist you at any time").',
      "Disclosure templates are provided in Uzbek, Russian, and English.",
      "Operators can choose: always disclose, disclose on first message, or operate without disclosure where permitted by local regulations.",
      "Disclosure configuration is logged in the audit trail and cannot be bypassed without operator action.",
    ],
  },
  {
    id: "optout",
    icon: StopCircle,
    color: "#f87171",
    bg: "rgba(248,113,113,0.1)",
    title: "Opt-Out: STOP Keyword",
    content: [
      "Any customer who sends the word STOP (in any language, any case) immediately exits AI automation.",
      "The opt-out is processed in real-time — the next message from that account routes directly to a human operator.",
      "Opt-outs are permanent until manually reversed by an operator with documented reason.",
      "All opt-out events are timestamped, logged, and included in compliance exports.",
    ],
  },
  {
    id: "audit",
    icon: FileText,
    color: "#c084fc",
    bg: "rgba(192,132,252,0.1)",
    title: "Full Audit Trail",
    content: [
      "Every AI decision — qualify, classify, retrieve, compose, guard result, evaluation score, trust gate outcome — is logged with nanosecond timestamps.",
      "Audit logs include the full pipeline trace: which LLM responded, which guardrails ran, which operator approved or rejected.",
      "Logs are immutable once written. Operators can export full audit trails in JSON or CSV format.",
      "Enterprise plans include long-term audit log retention and compliance report generation.",
    ],
  },
  {
    id: "retention",
    icon: Clock,
    color: "var(--color-neutral-400)",
    bg: "rgba(161,161,170,0.1)",
    title: "Data Retention",
    content: [
      "Message content retention is configurable per brand: 30, 90, 180, or 365 days, or custom.",
      "After the retention period, message content is purged from active storage. Audit logs (without message content) are retained for compliance purposes.",
      "Customer data is not used to train, fine-tune, or improve LLM models.",
      "Data is stored in Uzbekistan or EU regions depending on your enterprise configuration.",
    ],
  },
  {
    id: "guardrails",
    icon: Shield,
    color: "var(--color-ember-300)",
    bg: "rgba(255,188,77,0.1)",
    title: "9-Point Guardrail System",
    content: [
      "All nine safety checks run on every response, even in Trust Level L4 full-auto mode.",
      "Guardrails cannot be disabled — only configured. PII detection and toxicity filtering are always on.",
      "Each failed guardrail is logged with the specific violation reason and the response that triggered it.",
      "Guardrail configurations are versioned — you can review what rules were active at any historical point.",
    ],
  },
];

export default function SecurityPage() {
  return (
    <>
      <Section className="pt-32">
        <Container>
          <FadeIn>
            <SectionHeader
              overline="Security & Compliance"
              title={
                <>
                  Built for brands who{" "}
                  <span className="gradient-ember">can&apos;t afford mistakes.</span>
                </>
              }
              description="Qaqnuz was designed with enterprise-grade safety from day one. Every response is guarded, logged, and auditable."
              center
            />
          </FadeIn>

          <FadeInStagger className="grid md:grid-cols-2 gap-6">
            {sections.map((sec) => {
              const Icon = sec.icon;
              return (
                <FadeInChild key={sec.id}>
                  <div id={sec.id} className="surface-card p-7 h-full">
                    <div className="flex items-center gap-3 mb-5">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                        style={{ background: sec.bg }}
                      >
                        <Icon className="h-5 w-5" style={{ color: sec.color }} />
                      </div>
                      <h2 className="text-lg font-bold text-[var(--color-neutral-50)]">
                        {sec.title}
                      </h2>
                    </div>
                    <ul className="space-y-3">
                      {sec.content.map((point, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm">
                          <div
                            className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                            style={{ background: sec.color }}
                          />
                          <span className="text-[var(--color-neutral-400)] leading-relaxed">
                            {point}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </FadeInChild>
              );
            })}
          </FadeInStagger>

          <FadeIn delay={0.3}>
            <div className="mt-12 text-center surface-card p-10">
              <Shield className="h-10 w-10 text-[var(--color-trust-400)] mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-[var(--color-neutral-50)] mb-3">
                Security questions? Talk to our team.
              </h3>
              <p className="text-[var(--color-neutral-400)] mb-8 max-w-md mx-auto">
                Enterprise security reviews, custom compliance configurations, and
                on-premises deployments are available. Book a technical security call.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" asChild>
                  <Link href="/book-demo">Book a security review</Link>
                </Button>
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/docs">Read the docs</Link>
                </Button>
              </div>
            </div>
          </FadeIn>
        </Container>
      </Section>

      <Footer />
    </>
  );
}
