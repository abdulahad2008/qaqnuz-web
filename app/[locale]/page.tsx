import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { LogoStrip } from "@/components/sections/logo-strip";
import { BelowFold } from "@/components/sections/below-fold";

export const metadata: Metadata = {
  title: "Qaqnuz — AI Instagram Automation for Uzbekistan",
  description:
    "Qaqnuz runs your Instagram DMs, comments, and story mentions through a 7-stage AI pipeline with 9 safety guardrails and human oversight. Built for Uzbekistan's top brands.",
  openGraph: {
    title: "Qaqnuz — AI Instagram Automation for Uzbekistan",
    description:
      "7-stage AI pipeline · 9 safety guardrails · 4-level trust ramp · Built for Uzbekistan",
    url: "https://qaqnuz.uz",
  },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Qaqnuz",
            url: "https://qaqnuz.uz",
            description:
              "AI-native Instagram automation platform for Uzbekistan-based brands",
            areaServed: "UZ",
            serviceType: "AI automation, Instagram marketing automation",
          }),
        }}
      />

      {/* Above the fold — SSR, eager */}
      <Hero />
      <LogoStrip />

      {/* Below the fold — client-only, code-split, lazy hydrated */}
      <BelowFold />
    </>
  );
}
