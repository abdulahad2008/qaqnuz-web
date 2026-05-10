import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  variant?: "default" | "surface" | "elevated";
}

export function Section({ children, className, id, variant = "default" }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "py-24 lg:py-32",
        variant === "surface" && "bg-[var(--color-bg-surface)]",
        variant === "elevated" && "bg-[var(--color-bg-elevated)]",
        className
      )}
    >
      {children}
    </section>
  );
}

export function Container({
  children,
  className,
  size = "default",
}: {
  children: ReactNode;
  className?: string;
  size?: "sm" | "default" | "lg" | "xl";
}) {
  return (
    <div
      className={cn(
        "mx-auto px-6 lg:px-8",
        size === "sm" && "max-w-3xl",
        size === "default" && "max-w-6xl",
        size === "lg" && "max-w-7xl",
        size === "xl" && "max-w-screen-2xl",
        className
      )}
    >
      {children}
    </div>
  );
}

export function SectionHeader({
  overline,
  title,
  description,
  center = false,
  className,
}: {
  overline?: string;
  title: ReactNode;
  description?: string;
  center?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("mb-16", center && "text-center", className)}>
      {overline && <p className="text-overline mb-4">{overline}</p>}
      <h2 className="text-4xl lg:text-5xl font-bold text-[var(--color-neutral-50)] leading-tight mb-4">
        {title}
      </h2>
      {description && (
        <p className="text-lg text-[var(--color-neutral-400)] max-w-2xl leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
