"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { label: "Product", href: "/product" },
  { label: "Pricing", href: "/pricing" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Security", href: "/security" },
  { label: "Docs", href: "/docs" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-[rgba(14,14,15,0.92)] backdrop-blur-xl border-b border-[rgba(255,255,255,0.06)]"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative">
              <Flame className="h-6 w-6 text-[var(--color-ember-400)] group-hover:text-[var(--color-ember-300)] transition-colors" />
              <div className="absolute inset-0 blur-sm bg-[var(--color-ember-500)] opacity-40 group-hover:opacity-60 transition-opacity" />
            </div>
            <span className="text-lg font-bold tracking-tight text-[var(--color-neutral-50)]">
              Qaqnuz
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3.5 py-2 text-sm text-[var(--color-neutral-400)] hover:text-[var(--color-neutral-100)] rounded-lg hover:bg-[rgba(255,255,255,0.06)] transition-all duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/book-demo"
              className="text-sm text-[var(--color-neutral-400)] hover:text-[var(--color-neutral-100)] transition-colors"
            >
              Sign in
            </Link>
            <Button size="md" asChild>
              <Link href="/book-demo">Book a demo</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg text-[var(--color-neutral-400)] hover:text-[var(--color-neutral-100)] hover:bg-[rgba(255,255,255,0.08)] transition-all"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-[rgba(14,14,15,0.98)] backdrop-blur-xl border-b border-[rgba(255,255,255,0.06)]"
          >
            <div className="px-6 py-4 space-y-1">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 text-sm text-[var(--color-neutral-300)] hover:text-[var(--color-neutral-50)] rounded-lg hover:bg-[rgba(255,255,255,0.06)] transition-all"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-3 pb-1">
                <Button size="md" className="w-full" asChild>
                  <Link href="/book-demo" onClick={() => setMobileOpen(false)}>
                    Book a demo
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
