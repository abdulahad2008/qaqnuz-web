import Link from "next/link";
import { Flame, Send, ExternalLink, MessageCircle } from "lucide-react";

const sitemap = [
  {
    heading: "Product",
    links: [
      { label: "How it works", href: "/product" },
      { label: "The AI Pipeline", href: "/product#pipeline" },
      { label: "Mission Control", href: "/product#dashboard" },
      { label: "Security", href: "/security" },
    ],
  },
  {
    heading: "Pricing",
    links: [
      { label: "Pricing", href: "/pricing" },
      { label: "Starter", href: "/pricing#starter" },
      { label: "Growth", href: "/pricing#growth" },
      { label: "Enterprise", href: "/pricing#enterprise" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Case Studies", href: "/case-studies" },
      { label: "Documentation", href: "/docs" },
      { label: "Book a Demo", href: "/book-demo" },
      { label: "Blog", href: "#" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "AI Disclosure", href: "/security#disclosure" },
      { label: "Data Retention", href: "/security#retention" },
    ],
  },
];

const languages = [
  { code: "EN", href: "/en" },
  { code: "UZ", href: "/uz" },
  { code: "RU", href: "/ru" },
];

export function Footer() {
  return (
    <footer className="border-t border-[rgba(255,255,255,0.07)] bg-[var(--color-bg-surface)]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
        {/* Top row */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 mb-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4 group w-fit">
              <div className="relative">
                <Flame className="h-6 w-6 text-[var(--color-ember-400)]" />
                <div className="absolute inset-0 blur-sm bg-[var(--color-ember-500)] opacity-40" />
              </div>
              <span className="text-lg font-bold text-[var(--color-neutral-50)]">
                Qaqnuz
              </span>
            </Link>
            <p className="text-sm text-[var(--color-neutral-500)] leading-relaxed mb-5 max-w-[16rem]">
              AI-native Instagram automation for Uzbekistan&apos;s top brands.
            </p>
            <div className="flex gap-3">
              {[
                { icon: MessageCircle, label: "X / Twitter", href: "#" },
                { icon: Send, label: "Telegram", href: "#" },
                { icon: ExternalLink, label: "Instagram", href: "#" },
              ].map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-8 h-8 rounded-lg border border-[rgba(255,255,255,0.08)] flex items-center justify-center text-[var(--color-neutral-500)] hover:text-[var(--color-neutral-200)] hover:border-[rgba(255,255,255,0.16)] transition-all"
                >
                  <Icon className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Sitemap */}
          {sitemap.map((col) => (
            <div key={col.heading}>
              <h4 className="text-xs font-semibold text-[var(--color-neutral-300)] uppercase tracking-widest mb-4">
                {col.heading}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-[var(--color-neutral-500)] hover:text-[var(--color-neutral-200)] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-8 border-t border-[rgba(255,255,255,0.06)]">
          <p className="text-xs text-[var(--color-neutral-600)]">
            © {new Date().getFullYear()} Qaqnuz. All rights reserved.
          </p>

          {/* Language switcher */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-[var(--color-neutral-700)]">Language:</span>
            {languages.map((lang) => (
              <Link
                key={lang.code}
                href={lang.href}
                className="text-xs px-2.5 py-1 rounded-md border border-[rgba(255,255,255,0.08)] text-[var(--color-neutral-500)] hover:text-[var(--color-neutral-200)] hover:border-[rgba(255,255,255,0.16)] transition-all"
              >
                {lang.code}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
