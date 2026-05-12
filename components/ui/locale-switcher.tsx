"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/lib/navigation";
import { cn } from "@/lib/utils";

const LOCALES = [
  { code: "uz", label: "UZ" },
  { code: "ru", label: "RU" },
  { code: "en", label: "EN" },
] as const;

export function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function switchLocale(next: string) {
    router.replace(pathname, { locale: next });
  }

  return (
    <div className="flex items-center gap-0.5">
      {LOCALES.map(({ code, label }, i) => (
        <span key={code} className="flex items-center">
          <button
            onClick={() => switchLocale(code)}
            className={cn(
              "text-xs px-1.5 py-0.5 rounded transition-colors duration-150",
              locale === code
                ? "text-accent font-semibold"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {label}
          </button>
          {i < LOCALES.length - 1 && (
            <span className="text-border text-xs select-none">·</span>
          )}
        </span>
      ))}
    </div>
  );
}
