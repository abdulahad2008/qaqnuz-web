import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        ember:
          "bg-accent/15 text-accent border border-accent/30",
        trust:
          "bg-[rgba(13,158,137,0.15)] text-[var(--color-trust-600)] dark:text-[var(--color-trust-400)] border border-[rgba(13,158,137,0.25)]",
        neutral:
          "bg-secondary text-muted-foreground border border-border",
        success:
          "bg-[rgba(34,197,94,0.15)] text-emerald-700 dark:text-emerald-400 border border-[rgba(34,197,94,0.25)]",
      },
    },
    defaultVariants: { variant: "ember" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
