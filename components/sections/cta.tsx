"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Section, Container } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { EmberSVG } from "@/components/motion/ember-svg";

export function FinalCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduced = useReducedMotion();

  return (
    <Section>
      <Container>
        <motion.div
          ref={ref}
          className="relative overflow-hidden rounded-3xl p-12 lg:p-20 text-center"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(240,125,0,0.18) 0%, rgba(14,14,15,0) 65%), var(--color-bg-surface)",
            border: "1px solid rgba(240,125,0,0.2)",
          }}
          initial={reduced ? false : { opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          {/* Ember SVG ignites on scroll-in */}
          <motion.div
            className="flex justify-center mb-6"
            initial={reduced ? false : { scale: 0, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{
              duration: 0.7,
              delay: 0.2,
              ease: [0.34, 1.56, 0.64, 1],
            }}
          >
            <div className="relative">
              <EmberSVG width={64} height={96} />
              {/* Glow halo */}
              <div
                className="absolute inset-0 rounded-full blur-2xl"
                style={{ background: "rgba(240,125,0,0.3)" }}
              />
            </div>
          </motion.div>

          <motion.h2
            className="text-4xl lg:text-6xl font-bold text-[var(--color-neutral-50)] leading-tight mb-4"
            initial={reduced ? false : { opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            Ready to put your DMs
            <br />
            <span className="gradient-text-hero text-display">on autopilot?</span>
          </motion.h2>

          <motion.p
            className="text-lg text-[var(--color-neutral-400)] max-w-xl mx-auto mb-10 leading-relaxed"
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.42, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            Book a 30-minute demo and see the full AI pipeline in action — with your
            own Instagram account, your own messages, and your own brand voice.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, delay: 0.54, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <Button size="xl" asChild className="group">
              <Link href="/book-demo">
                Book a demo
                <ArrowRight className="h-5 w-5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </Button>
            <Button size="xl" variant="secondary" asChild>
              <Link href="/product">See how it works</Link>
            </Button>
          </motion.div>

          <motion.p
            className="text-xs text-[var(--color-neutral-600)] mt-6"
            initial={reduced ? false : { opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.7 }}
          >
            No commitment. No credit card. Setup in 48 hours.
          </motion.p>
        </motion.div>
      </Container>
    </Section>
  );
}
