import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Check, X, ArrowRight } from "lucide-react";
import { Section, Container, SectionHeader } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { FadeIn, FadeInStagger, FadeInChild } from "@/components/motion/fade-in";
import { FAQ } from "@/components/sections/faq";
import { Footer } from "@/components/sections/footer";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/lib/navigation";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("pricingPage");
  return {
    title: `${t("title")} — Qaqnuz`,
    description: t("description"),
  };
}

type FeatureRow = {
  name: string;
  starter: boolean | string;
  growth: boolean | string;
  enterprise: boolean | string;
};

function Cell({ value }: { value: boolean | string }) {
  if (typeof value === "boolean") {
    return value ? (
      <Check className="h-4 w-4 text-accent mx-auto" />
    ) : (
      <X className="h-4 w-4 text-muted-foreground/40 mx-auto" />
    );
  }
  return <span className="text-sm text-muted-foreground">{value}</span>;
}

export default async function PricingPage() {
  const t = await getTranslations("pricingPage");
  const tiers = t.raw("tiers") as { name: string; description: string; badge?: string; cta: string }[];
  const features = t.raw("features") as FeatureRow[];

  return (
    <>
      <Section className="pt-32">
        <Container>
          <FadeIn>
            <SectionHeader
              overline={t("overline")}
              title={
                <>
                  {t("title")}
                  <br />
                  <span className="text-accent">{t("titleEmphasis")}</span>
                </>
              }
              description={t("description")}
              center
            />
          </FadeIn>

          {/* Tier cards */}
          <FadeInStagger className="grid md:grid-cols-3 gap-6 mb-16">
            {tiers.map((tier) => (
              <FadeInChild key={tier.name}>
                <div
                  className={`surface-card p-7 flex flex-col relative ${tier.badge ? "border-accent/30" : ""}`}
                  style={tier.badge ? { boxShadow: "0 0 40px -12px hsl(var(--accent) / 0.2)" } : {}}
                >
                  {tier.badge && (
                    <div className="absolute -top-3 left-6">
                      <Badge variant="ember">{tier.badge}</Badge>
                    </div>
                  )}
                  <h3 className="text-xl font-bold text-foreground mb-2">{tier.name}</h3>
                  <p className="text-sm text-muted-foreground mb-6 flex-1">{tier.description}</p>
                  <Button
                    size="lg"
                    variant={tier.badge ? "primary" : "secondary"}
                    className="w-full"
                    asChild
                  >
                    <Link href="/book-demo">
                      {tier.cta} <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </FadeInChild>
            ))}
          </FadeInStagger>

          {/* Comparison table */}
          <FadeIn delay={0.2}>
            <div className="surface-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-4 text-muted-foreground font-medium w-1/2">
                        {t("tableFeature")}
                      </th>
                      {[t("tableStarter"), t("tableGrowth"), t("tableEnterprise")].map((name) => (
                        <th key={name} className="text-center p-4 text-foreground font-semibold">
                          {name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {features.map((row, idx) => (
                      <tr
                        key={row.name}
                        className={`border-b border-border/50 ${idx % 2 === 0 ? "" : "bg-secondary/50"}`}
                      >
                        <td className="p-4 text-muted-foreground">{row.name}</td>
                        <td className="p-4 text-center"><Cell value={row.starter} /></td>
                        <td className="p-4 text-center"><Cell value={row.growth} /></td>
                        <td className="p-4 text-center"><Cell value={row.enterprise} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="mt-10 text-center">
              <Button size="xl" asChild>
                <Link href="/book-demo">
                  {t("customQuote")} <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <p className="text-sm text-muted-foreground mt-4">{t("customQuoteNote")}</p>
            </div>
          </FadeIn>
        </Container>
      </Section>

      <FAQ />
      <Footer />
    </>
  );
}
