import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ArrowRight, TrendingUp, Clock } from "lucide-react";
import { Section, Container, SectionHeader } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { FadeIn, FadeInStagger, FadeInChild } from "@/components/motion/fade-in";
import { Footer } from "@/components/sections/footer";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/lib/navigation";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("caseStudiesPage");
  return {
    title: `${t("title")} ${t("titleEmphasis")} — Qaqnuz`,
    description: t("description"),
  };
}

const STUDY_ICONS = [TrendingUp, Clock];
const STUDY_COLORS = ["hsl(var(--accent))", "hsl(174 72% 56%)"];

export default async function CaseStudiesPage() {
  const t = await getTranslations("caseStudiesPage");
  const studies = t.raw("studies") as {
    slug: string;
    title: string;
    excerpt: string;
    metric: string;
    metricLabel: string;
    tags: string[];
  }[];

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
            {studies.map((study, i) => {
              const Icon = STUDY_ICONS[i];
              const color = STUDY_COLORS[i];
              return (
                <FadeInChild key={study.slug}>
                  <Link href={`/case-studies/${study.slug}`} className="group block h-full">
                    <div className="surface-card p-7 h-full flex flex-col group-hover:border-accent/30 transition-colors">
                      <div className="flex items-start justify-between mb-5">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center"
                          style={{ background: `${color}18` }}
                        >
                          <Icon className="h-6 w-6" style={{ color }} />
                        </div>
                        <div className="text-right">
                          <div className="text-3xl font-bold" style={{ color }}>
                            {study.metric}
                          </div>
                          <div className="text-xs text-muted-foreground">{study.metricLabel}</div>
                        </div>
                      </div>

                      <h2 className="text-lg font-semibold text-foreground mb-3 leading-snug">
                        {study.title}
                      </h2>
                      <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-4">
                        {study.excerpt}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-5">
                        {study.tags.map((tag) => (
                          <Badge key={tag} variant="neutral" className="text-[10px]">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center gap-2 text-sm text-accent group-hover:opacity-80 transition-opacity">
                        {t("readStudy")}
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </FadeInChild>
              );
            })}
          </FadeInStagger>

          <FadeIn delay={0.3}>
            <div className="mt-12 text-center surface-card p-8">
              <h3 className="text-xl font-bold text-foreground mb-3">{t("ctaTitle")}</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto text-sm">
                {t("ctaDescription")}
              </p>
              <Button size="lg" asChild>
                <Link href="/book-demo">
                  {t("ctaButton")} <ArrowRight className="h-4 w-4" />
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
