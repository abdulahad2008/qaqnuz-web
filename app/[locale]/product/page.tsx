import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ArrowRight, Cpu, Shield, BarChart3, Zap } from "lucide-react";
import { Section, Container, SectionHeader } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { FadeIn, FadeInStagger, FadeInChild } from "@/components/motion/fade-in";
import { PipelineFlow } from "@/components/pipeline/pipeline-flow";
import { DashboardPreview } from "@/components/dashboard-preview/dashboard-preview";
import { Footer } from "@/components/sections/footer";
import { Link } from "@/lib/navigation";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("productPage");
  return {
    title: `${t("title")} ${t("titleEmphasis")} — Qaqnuz`,
    description: t("description"),
  };
}

const ARCH_ICONS = [Cpu, Shield, Zap, BarChart3];

export default async function ProductPage() {
  const t = await getTranslations("productPage");
  const archPoints = t.raw("architecturePoints") as { title: string; description: string }[];
  const techStack = t.raw("techStack") as [string, string][];

  return (
    <>
      {/* Hero */}
      <Section className="pt-32">
        <Container>
          <FadeIn>
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-overline mb-6">{t("overline")}</p>
              <h1 className="text-5xl lg:text-7xl font-bold text-foreground leading-tight mb-6">
                {t("title")}{" "}
                <span className="text-accent">{t("titleEmphasis")}</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed mb-10">
                {t("description")}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" asChild>
                  <Link href="/book-demo">
                    {t("seeLive")} <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/security">{t("securityLink")}</Link>
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
              overline={t("archOverline")}
              title={
                <>
                  {t("archTitle")}{" "}
                  <span className="text-accent">{t("archTitleEmphasis")}</span>
                </>
              }
              description={t("archDescription")}
            />
          </FadeIn>
          <FadeInStagger className="grid md:grid-cols-2 gap-6">
            {archPoints.map((point, i) => {
              const Icon = ARCH_ICONS[i];
              return (
                <FadeInChild key={point.title}>
                  <div className="surface-card p-6 h-full">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                      <Icon className="h-5 w-5 text-accent" />
                    </div>
                    <h3 className="text-base font-semibold text-foreground mb-2">
                      {point.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {point.description}
                    </p>
                  </div>
                </FadeInChild>
              );
            })}
          </FadeInStagger>
        </Container>
      </Section>

      {/* Technical stack */}
      <Section>
        <Container size="sm">
          <FadeIn>
            <div className="surface-card p-8">
              <h2 className="text-xl font-bold text-foreground mb-4">{t("techTitle")}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-sm">
                {techStack.map(([label, value]) => (
                  <div key={label} className="flex flex-col gap-0.5">
                    <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
                      {label}
                    </span>
                    <span className="text-accent">{value}</span>
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
              <h2 className="text-3xl font-bold text-foreground mb-4">{t("ctaTitle")}</h2>
              <p className="text-muted-foreground mb-8">{t("ctaDescription")}</p>
              <Button size="xl" asChild>
                <Link href="/book-demo">
                  {t("ctaButton")} <ArrowRight className="h-5 w-5" />
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
