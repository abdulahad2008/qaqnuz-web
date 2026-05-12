"use client";

import { Send, ExternalLink, MessageCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/navigation";
import { LocaleSwitcher } from "@/components/ui/locale-switcher";
import { QaqnuzMark } from "@/components/ui/qaqnuz-logo";

const SITEMAP = [
  {
    sectionKey: "product" as const,
    links: [
      { labelKey: "howItWorks",    href: "/product"              },
      { labelKey: "pipeline",      href: "/product#pipeline"     },
      { labelKey: "missionControl",href: "/product#dashboard"    },
      { labelKey: "security",      href: "/security"             },
    ],
  },
  {
    sectionKey: "pricing" as const,
    links: [
      { labelKey: "pricingPage", href: "/pricing"            },
      { labelKey: "starter",     href: "/pricing#starter"    },
      { labelKey: "growth",      href: "/pricing#growth"     },
      { labelKey: "enterprise",  href: "/pricing#enterprise" },
    ],
  },
  {
    sectionKey: "resources" as const,
    links: [
      { labelKey: "caseStudies", href: "/case-studies" },
      { labelKey: "docs",        href: "/docs"          },
      { labelKey: "bookDemo",    href: "/book-demo"     },
      { labelKey: "blog",        href: "#"              },
    ],
  },
  {
    sectionKey: "legal" as const,
    links: [
      { labelKey: "privacy",       href: "#"                    },
      { labelKey: "terms",         href: "#"                    },
      { labelKey: "aiDisclosure",  href: "/security#disclosure" },
      { labelKey: "dataRetention", href: "/security#retention"  },
    ],
  },
];

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="border-t border-border bg-secondary">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
        {/* Top row */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 mb-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4 group w-fit">
              <QaqnuzMark className="h-6 w-5 group-hover:opacity-80 transition-opacity" />
              <span className="font-display italic text-lg text-foreground group-hover:text-accent transition-colors">
                QaqnUz
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed mb-5 max-w-[16rem]">
              {t("tagline")}
            </p>
            <div className="flex gap-3">
              {[
                { icon: MessageCircle, label: "X / Twitter", href: "#" },
                { icon: Send,          label: "Telegram",    href: "#" },
                { icon: ExternalLink,  label: "Instagram",   href: "#" },
              ].map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-accent/40 transition-all"
                >
                  <Icon className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Sitemap */}
          {SITEMAP.map((col) => (
            <div key={col.sectionKey}>
              <h4 className="text-xs font-semibold text-foreground uppercase tracking-widest mb-4">
                {t(`sections.${col.sectionKey}` as Parameters<typeof t>[0])}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.labelKey}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {t(`links.${link.labelKey}` as Parameters<typeof t>[0])}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-8 border-t border-border">
          <p className="text-xs text-muted-foreground">
            {t("copyright", { year: new Date().getFullYear() })}
          </p>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">{t("language")}</span>
            <LocaleSwitcher />
          </div>
        </div>
      </div>
    </footer>
  );
}
