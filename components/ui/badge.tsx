import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        ember:
          "bg-[rgba(240,125,0,0.15)] text-[var(--color-ember-300)] border border-[rgba(240,125,0,0.25)]",
        trust:
          "bg-[rgba(13,158,137,0.15)] text-[var(--color-trust-300)] border border-[rgba(13,158,137,0.25)]",
        neutral:
          "bg-[rgba(255,255,255,0.08)] text-[var(--color-neutral-300)] border border-[rgba(255,255,255,0.1)]",
        success:
          "bg-[rgba(34,197,94,0.15)] text-[#4ade80] border border-[rgba(34,197,94,0.25)]",
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
