import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Code2, Terminal, Zap } from "lucide-react";
import { Section, Container } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/motion/fade-in";
import { Footer } from "@/components/sections/footer";

export const metadata: Metadata = {
  title: "Documentation — Qaqnuz",
  description: "Qaqnuz platform documentation, API reference, and integration guides.",
};

const docSections = [
  {
    icon: BookOpen,
    title: "Getting Started",
    description: "Brand onboarding, account connection, trust level configuration.",
    href: "https://docs.qaqnuz.uz/getting-started",
  },
  {
    icon: Terminal,
    title: "Mission Control",
    description: "Operator dashboard guide: Inbox, Brands, Monitor, Queue, Analytics.",
    href: "https://docs.qaqnuz.uz/mission-control",
  },
  {
    icon: Code2,
    title: "API Reference",
    description: "Webhook integration, brand profile API, conversation export API.",
    href: "https://docs.qaqnuz.uz/api",
  },
  {
    icon: Zap,
    title: "AI Pipeline",
    description: "Deep dive into qualify → classify → retrieve → compose → guard → evaluate → trust → publish.",
    href: "https://docs.qaqnuz.uz/pipeline",
  },
];

export default function DocsPage() {
  return (
    <>
      <Section className="pt-32">
        <Container>
          <FadeIn>
            <div className="text-center mb-16">
              <p className="text-overline mb-4">Documentation</p>
              <h1 className="text-5xl font-bold text-[var(--color-neutral-50)] mb-4">
                Qaqnuz Docs
              </h1>
              <p className="text-lg text-[var(--color-neutral-400)] max-w-xl mx-auto mb-8">
                Full documentation is hosted at{" "}
                <span className="font-mono text-[var(--color-ember-300)]">
                  docs.qaqnuz.uz
                </span>
                . The links below will take you there.
              </p>
              <Button size="lg" asChild>
                <a href="https://docs.qaqnuz.uz" target="_blank" rel="noopener noreferrer">
                  Open Documentation <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="grid sm:grid-cols-2 gap-4">
              {docSections.map((section) => {
                const Icon = section.icon;
                return (
                  <a
                    key={section.title}
                    href={section.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="surface-card p-6 flex items-start gap-4 hover:border-[rgba(240,125,0,0.2)] hover:ember-glow transition-all group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[rgba(240,125,0,0.1)] flex items-center justify-center shrink-0">
                      <Icon className="h-5 w-5 text-[var(--color-ember-400)]" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-[var(--color-neutral-100)] mb-1 group-hover:text-[var(--color-ember-300)] transition-colors">
                        {section.title}
                        <ArrowRight className="inline h-3.5 w-3.5 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </h3>
                      <p className="text-xs text-[var(--color-neutral-500)] leading-relaxed">
                        {section.description}
                      </p>
                    </div>
                  </a>
                );
              })}
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="mt-10 text-center surface-card p-8">
              <p className="text-sm text-[var(--color-neutral-500)] mb-4">
                Can&apos;t find what you need?
              </p>
              <Button variant="secondary" size="md" asChild>
                <Link href="/book-demo">Talk to the team</Link>
              </Button>
            </div>
          </FadeIn>
        </Container>
      </Section>

      <Footer />
    </>
  );
}
