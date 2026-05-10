"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-lg font-semibold text-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ember-400)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-base)] disabled:pointer-events-none disabled:opacity-40 select-none",
  {
    variants: {
      variant: {
        primary:
          "bg-[var(--color-ember-500)] text-white hover:bg-[var(--color-ember-400)] active:bg-[var(--color-ember-600)] shadow-[0_0_20px_-4px_rgba(240,125,0,0.5)] hover:shadow-[0_0_28px_-4px_rgba(240,125,0,0.7)]",
        secondary:
          "border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.05)] text-[var(--color-neutral-100)] hover:bg-[rgba(255,255,255,0.1)] hover:border-[rgba(255,255,255,0.2)]",
        ghost:
          "text-[var(--color-neutral-300)] hover:text-white hover:bg-[rgba(255,255,255,0.06)]",
        trust:
          "bg-[var(--color-trust-500)] text-white hover:bg-[var(--color-trust-400)] shadow-[0_0_20px_-4px_rgba(13,158,137,0.4)]",
        outline:
          "border border-[var(--color-ember-500)] text-[var(--color-ember-400)] hover:bg-[rgba(240,125,0,0.08)]",
      },
      size: {
        sm: "h-8 px-3 text-xs",
        md: "h-10 px-5 text-sm",
        lg: "h-12 px-7 text-base",
        xl: "h-14 px-9 text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
