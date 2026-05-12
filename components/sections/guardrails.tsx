"use client";

import { useRef } from "react";
import { motion, useMotionValue, useTransform, useReducedMotion } from "framer-motion";
import {
  UserX, DollarSign, Flame, Copy, Lock, Users, Compass, AlignLeft, Scale,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Section, Container, SectionHeader } from "@/components/ui/section";
import { FadeIn, FadeInStagger, FadeInChild } from "@/components/motion/fade-in";

const GUARDRAIL_VISUAL = [
  { icon: UserX,    color: "#1db8a1", rgb: "29,184,161",   bg: "rgba(29,184,161,0.08)" },
  { icon: DollarSign,color:"#ffbc4d", rgb: "255,188,77",   bg: "rgba(255,188,77,0.08)" },
  { icon: Flame,    color: "#f87171", rgb: "248,113,113",  bg: "rgba(248,113,113,0.08)" },
  { icon: Copy,     color: "#ff9d1a", rgb: "255,157,26",   bg: "rgba(255,157,26,0.08)" },
  { icon: Lock,     color: "#4fd1bd", rgb: "79,209,189",   bg: "rgba(79,209,189,0.08)" },
  { icon: Users,    color: "#c084fc", rgb: "192,132,252",  bg: "rgba(192,132,252,0.08)" },
  { icon: Compass,  color: "#f07d00", rgb: "240,125,0",    bg: "rgba(240,125,0,0.08)" },
  { icon: AlignLeft,color: "#a1a1aa", rgb: "161,161,170",  bg: "rgba(161,161,170,0.08)" },
  { icon: Scale,    color: "#0d9e89", rgb: "13,158,137",   bg: "rgba(13,158,137,0.08)" },
] as const;

function TiltCard({
  guardrail,
  idx,
}: {
  guardrail: (typeof GUARDRAIL_VISUAL)[number] & { title: string; description: string };
  idx: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const Icon = guardrail.icon;

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-6, 6]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  const tiltStyle = reduced
    ? { perspective: "1000px", borderColor: `rgba(${guardrail.rgb},0.2)` }
    : { perspective: "1000px", rotateX, rotateY, borderColor: `rgba(${guardrail.rgb},0.2)` };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={tiltStyle}
      whileHover={reduced ? {} : { scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="surface-card p-5 h-full group cursor-default will-change-transform"
    >
      <div className="flex items-start gap-4">
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
          style={{ background: guardrail.bg }}
        >
          <Icon className="h-4 w-4" style={{ color: guardrail.color }} />
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <h3 className="text-sm font-semibold text-foreground">{guardrail.title}</h3>
            <span
              className="text-[10px] font-bold font-mono opacity-50"
              style={{ color: guardrail.color }}
            >
              G{idx + 1}
            </span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">{guardrail.description}</p>
        </div>
      </div>
    </motion.div>
  );
}

export function Guardrails() {
  const t = useTranslations("guardrails");
  const rawItems = t.raw("items") as Array<{ title: string; description: string }>;
  const guardrails = GUARDRAIL_VISUAL.map((vis, i) => ({ ...vis, ...rawItems[i] }));

  return (
    <Section id="guardrails" variant="surface">
      <Container>
        <FadeIn>
          <SectionHeader
            overline={t("overline")}
            title={
              <>
                {t("title")}{" "}
                <em className="not-italic text-accent">{t("titleEmphasis")}</em>
              </>
            }
            description={t("description")}
            center
          />
        </FadeIn>

        <FadeInStagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4" stagger={0.06}>
          {guardrails.map((guardrail, idx) => (
            <FadeInChild key={guardrail.title}>
              <TiltCard guardrail={guardrail} idx={idx} />
            </FadeInChild>
          ))}
        </FadeInStagger>

        <FadeIn delay={0.3}>
          <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground">{t("bottomNote")}</p>
          </div>
        </FadeIn>
      </Container>
    </Section>
  );
}
