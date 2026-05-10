"use client";

import { motion } from "framer-motion";
import { Section, Container } from "@/components/ui/section";

/* Placeholder brand logos — replace with real SVGs */
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
  return (
    <Section className="py-12 lg:py-16">
      <Container>
        <p className="text-center text-overline mb-10">
          Trusted by Uzbekistan&apos;s fastest-growing brands
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-12">
          {placeholderBrands.map((brand, idx) => (
            <motion.div
              key={brand.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.06, duration: 0.4 }}
              className="flex items-center justify-center w-28 h-10 rounded-lg border border-[rgba(255,255,255,0.07)] bg-[var(--color-bg-surface)] hover:border-[rgba(255,255,255,0.14)] transition-colors"
              title={`TODO: Replace with ${brand.name} logo`}
            >
              <span className="text-xs text-[var(--color-neutral-600)] font-mono">
                LOGO {brand.id}
              </span>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
