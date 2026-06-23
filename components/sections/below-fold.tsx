"use client";

import dynamic from "next/dynamic";

/*
  Client wrapper for all below-fold sections.
  `ssr: false` defers their JS until after the hero paints,
  dramatically reducing Time-to-Interactive on the home page.
*/

const ChannelsSection = dynamic(
  () => import("@/components/sections/channels-section").then((m) => m.ChannelsSection),
  { ssr: false }
);
const PipelineFlow = dynamic(
  () => import("@/components/pipeline/pipeline-flow").then((m) => m.PipelineFlow),
  { ssr: false }
);
const TrustRamp = dynamic(
  () => import("@/components/sections/trust-ramp").then((m) => m.TrustRamp),
  { ssr: false }
);
const Guardrails = dynamic(
  () => import("@/components/sections/guardrails").then((m) => m.Guardrails),
  { ssr: false }
);
const DashboardPreview = dynamic(
  () =>
    import("@/components/dashboard-preview/dashboard-preview").then(
      (m) => m.DashboardPreview
    ),
  { ssr: false }
);
const MultiBrand = dynamic(
  () => import("@/components/sections/multi-brand").then((m) => m.MultiBrand),
  { ssr: false }
);
const Results = dynamic(
  () => import("@/components/sections/results").then((m) => m.Results),
  { ssr: false }
);
const BuiltForUzbekistan = dynamic(
  () =>
    import("@/components/sections/built-for-uzbekistan").then(
      (m) => m.BuiltForUzbekistan
    ),
  { ssr: false }
);
const PricingTeaser = dynamic(
  () =>
    import("@/components/sections/pricing-teaser").then((m) => m.PricingTeaser),
  { ssr: false }
);
const FAQ = dynamic(
  () => import("@/components/sections/faq").then((m) => m.FAQ),
  { ssr: false }
);
const FinalCTA = dynamic(
  () => import("@/components/sections/cta").then((m) => m.FinalCTA),
  { ssr: false }
);
const Footer = dynamic(
  () => import("@/components/sections/footer").then((m) => m.Footer),
  { ssr: false }
);

export function BelowFold() {
  return (
    <>
      <ChannelsSection />
      <PipelineFlow />
      <TrustRamp />
      <Guardrails />
      <DashboardPreview />
      <MultiBrand />
      <Results />
      <BuiltForUzbekistan />
      <PricingTeaser />
      <FAQ />
      <FinalCTA />
      <Footer />
    </>
  );
}
