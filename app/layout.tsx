import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Qaqnuz — AI Instagram Automation for Uzbekistan",
    template: "%s | Qaqnuz",
  },
  description:
    "Qaqnuz runs your Instagram DMs, comments, and story mentions through a 7-stage AI pipeline with 9 safety guardrails and human oversight at every step. Built for Uzbekistan's top brands.",
  metadataBase: new URL("https://qaqnuz.uz"),
  openGraph: {
    siteName: "Qaqnuz",
    type: "website",
    locale: "uz_UZ",
    alternateLocale: ["en_US", "ru_RU"],
  },
  twitter: {
    card: "summary_large_image",
    site: "@qaqnuz",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // html/body are provided by app/[locale]/layout.tsx
  return children;
}
