import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans",
  display: "swap",
});

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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#0e0e0f] antialiased">
        {children}
      </body>
    </html>
  );
}
