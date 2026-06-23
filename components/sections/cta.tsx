"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/navigation";
import { Section, Container } from "@/components/ui/section";
import { EmberSVG } from "@/components/motion/ember-svg";

export function FinalCTA() {
  const t = useTranslations("cta");
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduced = useReducedMotion();

  return (
    <Section>
      <Container>
        <motion.div
          ref={ref}
          className="relative overflow-hidden rounded-3xl p-12 lg:p-20 text-center border border-border bg-secondary"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(99,102,241,0.07) 0%, hsl(var(--secondary)) 65%)",
            borderColor: "rgba(99,102,241,0.2)",
          }}
          initial={reduced ? false : { opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          {/* Ember SVG ignites on scroll */}
          <motion.div
            className="flex justify-center mb-6"
            initial={reduced ? false : { scale: 0, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
          >
            <div className="relative">
              <EmberSVG width={64} height={96} />
              <div
                className="absolute inset-0 rounded-full blur-2xl"
                style={{ background: "rgba(240,125,0,0.2)" }}
              />
            </div>
          </motion.div>

          <motion.h2
            className="font-display text-4xl lg:text-6xl text-foreground leading-tight tracking-tight mb-4"
            initial={reduced ? false : { opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            {t("headline")}
            <br />
            <em className="not-italic text-accent">{t("headlineEmphasis")}</em>
          </motion.h2>

          <motion.p
            className="text-lg text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed"
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.42, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            {t("sub")}
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, delay: 0.54, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <Link
              href="/book-demo"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-accent text-accent-foreground px-8 py-3 text-sm font-medium hover:bg-accent/90 transition-colors shadow-sm"
            >
              {t("primary")}
              <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="/product"
              className="inline-flex items-center justify-center rounded-full border border-border bg-background text-foreground px-8 py-3 text-sm font-medium hover:bg-secondary transition-colors"
            >
              {t("secondary")}
            </Link>
          </motion.div>

          <motion.p
            className="text-xs text-muted-foreground mt-6"
            initial={reduced ? false : { opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.7 }}
          >
            {t("note")}
          </motion.p>
        </motion.div>
      </Container>
    </Section>
  );
}
