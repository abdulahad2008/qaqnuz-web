"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Section, Container } from "@/components/ui/section";

const placeholderBrands = [
  { id: 1, name: "Brand A" },
  { id: 2, name: "Brand B" },
  { id: 3, name: "Brand C" },
  { id: 4, name: "Brand D" },
  { id: 5, name: "Brand E" },
  { id: 6, name: "Brand F" },
  { id: 7, name: "Brand G" },
  { id: 8, name: "Brand H" },
];

export function LogoStrip() {
  const t = useTranslations("logoStrip");
  return (
    <Section className="py-12 lg:py-16 border-y border-border">
      <Container>
        <p className="text-center text-overline mb-10">{t("tagline")}</p>
        <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-12">
          {placeholderBrands.map((brand, idx) => (
            <motion.div
              key={brand.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.06, duration: 0.4 }}
              className="flex items-center justify-center w-28 h-10 rounded-lg border border-border bg-secondary hover:border-accent/30 transition-colors"
              title={`TODO: Replace with ${brand.name} logo`}
            >
              <span className="text-xs text-muted-foreground font-mono">
                LOGO {brand.id}
              </span>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
