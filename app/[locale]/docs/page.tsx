import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ArrowRight, BookOpen, Code2, Terminal, Zap } from "lucide-react";
import { Section, Container } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/motion/fade-in";
import { Footer } from "@/components/sections/footer";
import { Link } from "@/lib/navigation";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("docsPage");
  return {
    title: `${t("title")} — Qaqnuz`,
    description: t("description"),
  };
}

const SECTION_ICONS = [BookOpen, Terminal, Code2, Zap];

const DOC_HREFS = [
  "https://docs.qaqnuz.uz/getting-started",
  "https://docs.qaqnuz.uz/mission-control",
  "https://docs.qaqnuz.uz/api",
  "https://docs.qaqnuz.uz/pipeline",
];

export default async function DocsPage() {
  const t = await getTranslations("docsPage");
  const sections = t.raw("sections") as { title: string; description: string }[];

  return (
    <>
      <Section className="pt-32">
        <Container>
          <FadeIn>
            <div className="text-center mb-16">
              <p className="text-overline mb-4">{t("overline")}</p>
              <h1 className="text-5xl font-bold text-foreground mb-4">{t("title")}</h1>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8">
                {t("description")}
              </p>
              <Button size="lg" asChild>
                <a href="https://docs.qaqnuz.uz" target="_blank" rel="noopener noreferrer">
                  {t("openDocs")} <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="grid sm:grid-cols-2 gap-4">
              {sections.map((section, i) => {
                const Icon = SECTION_ICONS[i];
                return (
                  <a
                    key={section.title}
                    href={DOC_HREFS[i]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="surface-card p-6 flex items-start gap-4 hover:border-accent/30 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                      <Icon className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-foreground mb-1 group-hover:text-accent transition-colors">
                        {section.title}
                        <ArrowRight className="inline h-3.5 w-3.5 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">
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
              <p className="text-sm text-muted-foreground mb-4">{t("cantFind")}</p>
              <Button variant="secondary" size="md" asChild>
                <Link href="/book-demo">{t("talkToTeam")}</Link>
              </Button>
            </div>
          </FadeIn>
        </Container>
      </Section>

      <Footer />
    </>
  );
}
