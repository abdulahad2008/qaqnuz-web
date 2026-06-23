import * as React from "react";
import { cn } from "@/lib/utils";

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { glow?: "ember" | "trust" | "none" }
>(({ className, glow = "none", ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "surface-card p-6 transition-all duration-300",
      glow === "ember" && "hover:ember-glow hover:border-[rgba(240,125,0,0.2)]",
      glow === "trust" && "hover:trust-glow hover:border-[rgba(13,158,137,0.2)]",
      className
    )}
    {...props}
  />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("mb-4", className)} {...props} />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-lg font-semibold text-[var(--color-neutral-50)]", className)}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-[var(--color-neutral-400)] leading-relaxed", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

export { Card, CardHeader, CardTitle, CardDescription };
