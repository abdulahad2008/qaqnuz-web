import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ArrowLeft, TrendingUp, Clock, Users, MessageSquare } from "lucide-react";
import { Section, Container } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/motion/fade-in";
import { Footer } from "@/components/sections/footer";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/lib/navigation";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("caseStudiesPage");
  return {
    title: `${t("brandGrowth.title")} — Qaqnuz`,
    description: t("brandGrowth.description"),
  };
}

const METRIC_ICONS = [TrendingUp, Clock, Users, MessageSquare];
const METRIC_COLORS = ["hsl(var(--accent))", "hsl(174 72% 56%)", "#4ade80", "#c084fc"];

export default async function BrandGrowthCaseStudy() {
  const t = await getTranslations("caseStudiesPage");
  const data = t.raw("brandGrowth") as {
    tags: string[];
    title: string;
    description: string;
    metrics: { value: string; label: string }[];
    challengeTitle: string;
    challengeText: string;
    deploymentTitle: string;
    deploymentText: string;
    resultsTitle: string;
    resultsText: string;
    ctaButton: string;
  };

  return (
    <>
      <Section className="pt-32">
        <Container size="sm">
          <FadeIn>
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" /> {t("backToStudies")}
            </Link>

            <div className="flex flex-wrap gap-2 mb-6">
              {data.tags.map((tag) => (
                <Badge key={tag} variant="neutral" className="text-[10px]">{tag}</Badge>
              ))}
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-6">
              {data.title.split("tripled")[0]}
              <span className="text-accent">
                {data.title.includes("tripled") ? "tripled" + data.title.split("tripled")[1] : ""}
              </span>
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed mb-10">
              {data.description}
            </p>

            {/* Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
              {data.metrics.map((metric, i) => {
                const Icon = METRIC_ICONS[i];
                return (
                  <div key={metric.label} className="surface-card p-4 text-center">
                    <Icon className="h-5 w-5 mx-auto mb-2" style={{ color: METRIC_COLORS[i] }} />
                    <div className="text-2xl font-bold mb-1" style={{ color: METRIC_COLORS[i] }}>
                      {metric.value}
                    </div>
                    <div className="text-xs text-muted-foreground">{metric.label}</div>
                  </div>
                );
              })}
            </div>

            {/* Article body */}
            <div className="space-y-8 text-muted-foreground">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-3">{data.challengeTitle}</h2>
                <p className="leading-relaxed">{data.challengeText}</p>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-3">{data.deploymentTitle}</h2>
                <p className="leading-relaxed">{data.deploymentText}</p>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-3">{data.resultsTitle}</h2>
                <p className="leading-relaxed">{data.resultsText}</p>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-border">
              <Button size="lg" asChild>
                <Link href="/book-demo">{data.ctaButton}</Link>
              </Button>
            </div>
          </FadeIn>
        </Container>
      </Section>

      <Footer />
    </>
  );
}
