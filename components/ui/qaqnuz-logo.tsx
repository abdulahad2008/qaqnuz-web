import { cn } from "@/lib/utils";

/** Pixel-art Q mark — 9 rectangles forming the QaqnUz logomark */
export function QaqnuzMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 124"
      className={cn("shrink-0", className)}
      aria-hidden
      focusable="false"
    >
      <rect x="26" y="4"   width="20" height="20" fill="#E8541A" />
      <rect x="50" y="4"   width="20" height="20" fill="#E8541A" />
      <rect x="4"  y="28"  width="20" height="20" fill="#E8541A" />
      <rect x="74" y="28"  width="20" height="20" fill="#E8541A" />
      <rect x="4"  y="52"  width="20" height="20" fill="#E8541A" />
      <rect x="74" y="52"  width="20" height="20" fill="#E8541A" />
      <rect x="26" y="76"  width="20" height="20" fill="#E8541A" />
      <rect x="50" y="76"  width="20" height="20" fill="#E8541A" />
      <rect x="74" y="100" width="20" height="20" fill="#E8541A" />
    </svg>
  );
}

/** Full wordmark: Q mark + "QaqnUz" text — use in nav, footer, auth pages */
export function QaqnuzWordmark({
  className,
  textClassName,
}: {
  className?: string;
  textClassName?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <QaqnuzMark className="h-6 w-5" />
      <span
        className={cn(
          "font-display italic text-lg tracking-tight text-foreground",
          textClassName
        )}
      >
        QaqnUz
      </span>
    </span>
  );
}
