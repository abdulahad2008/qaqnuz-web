"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Flame } from "lucide-react";
import { Section, Container } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/motion/fade-in";

export function FinalCTA() {
  return (
    <Section>
      <Container>
        <FadeIn>
          <motion.div
            className="relative overflow-hidden rounded-3xl p-12 lg:p-20 text-center"
            style={{
              background:
                "radial-gradient(ellipse at 50% 0%, rgba(240,125,0,0.18) 0%, rgba(14,14,15,0) 65%), var(--color-bg-surface)",
              border: "1px solid rgba(240,125,0,0.2)",
            }}
          >
            {/* Background decoration */}
            {/* Static glow — no continuous animation */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div
                className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full opacity-70"
                style={{
                  background:
                    "radial-gradient(circle, rgba(240,125,0,0.15) 0%, transparent 70%)",
                }}
              />
            </div>

            <div className="relative">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <Flame className="h-10 w-10 text-[var(--color-ember-400)]" />
                  <div className="absolute inset-0 blur-lg bg-[var(--color-ember-500)] opacity-50" />
                </div>
              </div>

              <h2 className="text-4xl lg:text-6xl font-bold text-[var(--color-neutral-50)] leading-tight mb-4">
                Ready to put your DMs
                <br />
                <span className="gradient-text-hero text-display">
                  on autopilot?
                </span>
              </h2>

              <p className="text-lg text-[var(--color-neutral-400)] max-w-xl mx-auto mb-10 leading-relaxed">
                Book a 30-minute demo and see the full AI pipeline in action — with
                your own Instagram account, your own messages, and your own brand voice.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="xl" asChild className="group">
                  <Link href="/book-demo">
                    Book a demo
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </Button>
                <Button size="xl" variant="secondary" asChild>
                  <Link href="/product">See how it works</Link>
                </Button>
              </div>

              <p className="text-xs text-[var(--color-neutral-600)] mt-6">
                No commitment. No credit card. Setup in 48 hours.
              </p>
            </div>
          </motion.div>
        </FadeIn>
      </Container>
    </Section>
  );
}
