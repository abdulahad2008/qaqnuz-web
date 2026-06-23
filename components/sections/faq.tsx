"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import { Section, Container, SectionHeader } from "@/components/ui/section";
import { FadeIn } from "@/components/motion/fade-in";

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();

  return (
    <div className="border-b border-border last:border-0">
      <button
        className="w-full flex items-center justify-between gap-4 py-5 text-left group"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <span className="text-sm font-medium text-foreground group-hover:text-accent transition-colors leading-relaxed">
          {q}
        </span>
        <motion.div
          animate={reduced ? {} : { rotate: open ? 45 : 0 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="shrink-0 w-5 h-5 rounded-full border border-border flex items-center justify-center"
        >
          <Plus className="h-3 w-3 text-accent" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={reduced ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduced ? {} : { height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: "hidden" }}
          >
            <p className="pb-5 text-sm text-muted-foreground leading-relaxed pr-8">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQ() {
  const t = useTranslations("faq");
  const items = t.raw("items") as Array<{ q: string; a: string }>;

  return (
    <Section id="faq" variant="surface">
      <Container size="sm">
        <FadeIn>
          <SectionHeader
            overline={t("overline")}
            title={t("title")}
            description={t("description")}
            center
          />
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="surface-card px-6 divide-y divide-border">
            {items.map((item, idx) => (
              <FAQItem key={idx} q={item.q} a={item.a} />
            ))}
          </div>
        </FadeIn>
      </Container>
    </Section>
  );
}
