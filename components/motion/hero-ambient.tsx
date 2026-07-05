"use client";

import { useEffect, useRef } from "react";

/*
 * Ambient hero backdrop — 4 large, very soft radial "clouds" in the logo-orange
 * family (accent + ember peach + faint gold) drifting slowly behind the hero on
 * the dark near-black base. The Nexora "airy motion" feel, in Qaqnuz orange.
 * Compositor-only (transform/opacity via CSS @keyframes drift-*), token colours
 * only, paused offscreen (IntersectionObserver), and collapsed to a single
 * static frame under prefers-reduced-motion by the global reduced-motion rule.
 */

type Cloud = { color: string; anim: string; dur: string; opacity: number; style: React.CSSProperties };

const CLOUDS: Cloud[] = [
  { color: "hsl(var(--accent))", anim: "drift-a", dur: "38s", opacity: 0.16, style: { top: "-14%", left: "6%", width: "46vw", height: "46vw" } },
  { color: "var(--color-ember-300)", anim: "drift-b", dur: "52s", opacity: 0.14, style: { top: "2%", right: "-6%", width: "42vw", height: "42vw" } },
  { color: "var(--color-ember-200)", anim: "drift-c", dur: "46s", opacity: 0.1, style: { bottom: "-18%", left: "24%", width: "50vw", height: "50vw" } },
  { color: "var(--color-ember-500)", anim: "drift-d", dur: "60s", opacity: 0.12, style: { top: "18%", left: "40%", width: "34vw", height: "34vw" } },
];

export function HeroAmbient() {
  const ref = useRef<HTMLDivElement>(null);

  // Pause the drift while the hero is scrolled out of view.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => el.classList.toggle("is-paused", !e.isIntersecting),
      { rootMargin: "60px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="hero-ambient pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {CLOUDS.map((c, i) => (
        <span
          key={i}
          className="hero-cloud absolute rounded-full"
          style={{
            ...c.style,
            opacity: c.opacity,
            background: `radial-gradient(circle at center, ${c.color} 0%, transparent 66%)`,
            filter: "blur(28px)",
            animation: `${c.anim} ${c.dur} ease-in-out infinite alternate`,
            willChange: "transform",
          }}
        />
      ))}
    </div>
  );
}
