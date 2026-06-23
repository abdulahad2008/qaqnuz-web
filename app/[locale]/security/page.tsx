import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Shield, Lock, Eye, UserX, FileText, StopCircle, Clock, Bot } from "lucide-react";
import { Section, Container, SectionHeader } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { FadeIn, FadeInStagger, FadeInChild } from "@/components/motion/fade-in";
import { Footer } from "@/components/sections/footer";
import { Link } from "@/lib/navigation";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("securityPage");
  return {
    title: `${t("title")} ${t("titleEmphasis")} — Qaqnuz`,
    description: t("description"),
  };
}

const SECTION_ICONS: Record<string, React.ElementType> = {
  pii: UserX,
  disclosure: Bot,
  optout: StopCircle,
  audit: FileText,
  retention: Clock,
  guardrails: Shield,
};

const SECTION_COLORS: Record<string, { color: string; bg: string }> = {
  pii:        { color: "hsl(var(--accent))",  bg: "hsl(var(--accent) / 0.1)" },
  disclosure: { color: "#f97316",             bg: "rgba(249,115,22,0.1)" },
  optout:     { color: "#f87171",             bg: "rgba(248,113,113,0.1)" },
  audit:      { color: "#c084fc",             bg: "rgba(192,132,252,0.1)" },
  retention:  { color: "#94a3b8",             bg: "rgba(148,163,184,0.1)" },
  guardrails: { color: "#fbbf24",             bg: "rgba(251,191,36,0.1)" },
};

export default async function SecurityPage() {
  const t = await getTranslations("securityPage");
  const sections = t.raw("sections") as { id: string; title: string; content: string[] }[];

  return (
    <>
      <Section className="pt-32">
        <Container>
          <FadeIn>
            <SectionHeader
              overline={t("overline")}
              title={
                <>
                  {t("title")}{" "}
                  <span className="text-accent">{t("titleEmphasis")}</span>
                </>
              }
              description={t("description")}
              center
            />
          </FadeIn>

          <FadeInStagger className="grid md:grid-cols-2 gap-6">
            {sections.map((sec) => {
              const Icon = SECTION_ICONS[sec.id] ?? Lock;
              const style = SECTION_COLORS[sec.id] ?? { color: "hsl(var(--accent))", bg: "hsl(var(--accent) / 0.1)" };
              return (
                <FadeInChild key={sec.id}>
                  <div id={sec.id} className="surface-card p-7 h-full">
                    <div className="flex items-center gap-3 mb-5">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                        style={{ background: style.bg }}
                      >
                        <Icon className="h-5 w-5" style={{ color: style.color }} />
                      </div>
                      <h2 className="text-lg font-bold text-foreground">{sec.title}</h2>
                    </div>
                    <ul className="space-y-3">
                      {sec.content.map((point, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm">
                          <div
                            className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                            style={{ background: style.color }}
                          />
                          <span className="text-muted-foreground leading-relaxed">{point}</span>
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
              <Shield className="h-10 w-10 text-accent mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-foreground mb-3">{t("ctaTitle")}</h3>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">{t("ctaDescription")}</p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" asChild>
                  <Link href="/book-demo">{t("ctaButton")}</Link>
                </Button>
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/docs">{t("docsButton")}</Link>
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
