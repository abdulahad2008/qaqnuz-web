import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/lib/routing";
import { Nav } from "@/components/sections/nav";

const inter = Inter({
  subsets: ["latin", "latin-ext", "cyrillic"],
  variable: "--font-sans",
  display: "swap",
});

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    alternates: {
      canonical: `https://qaqnuz.uz/${locale}`,
      languages: {
        uz: "https://qaqnuz.uz/uz",
        ru: "https://qaqnuz.uz/ru",
        en: "https://qaqnuz.uz/en",
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "en" | "uz" | "ru")) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className={inter.variable} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=EB+Garamond:ital,wght@0,400;0,500;1,400;1,500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-background antialiased">
        <NextIntlClientProvider messages={messages}>
          <Nav />
          <main>{children}</main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
