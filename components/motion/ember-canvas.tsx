"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

type Ember = {
  x: number;
  y: number;
  r: number;
  vy: number;
  vx: number;
  life: number;
  maxLife: number;
  hue: number;
};

/**
 * Lightweight rising-ember particle field on a 2D canvas — the living
 * phoenix background used behind the hero until a real motion asset ships.
 * Density scales down on small screens; rendering pauses when offscreen
 * (IntersectionObserver) and is disabled entirely for reduced motion.
 * Zero user-facing strings — decorative, aria-hidden.
 */
export function EmberCanvas({
  density = 1,
  className = "",
}: {
  density?: number;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let embers: Ember[] = [];
    let raf = 0;
    let visible = true;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const spawn = (e: Ember, initial: boolean) => {
      e.x = Math.random() * width;
      e.y = initial ? Math.random() * height : height + 10;
      e.r = 0.6 + Math.random() * 1.8;
      e.vy = -(0.15 + Math.random() * 0.45);
      e.vx = (Math.random() - 0.5) * 0.15;
      e.maxLife = 300 + Math.random() * 500;
      e.life = initial ? Math.random() * e.maxLife : 0;
      e.hue = 16 + Math.random() * 24; // logo-orange → gold
    };

    const resize = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const mobile = window.innerWidth < 768;
      const count = Math.round(
        (width * height * (mobile ? 0.00004 : 0.00008) + 12) * density
      );
      embers = Array.from({ length: count }, () => {
        const e = {} as Ember;
        spawn(e, true);
        return e;
      });
    };

    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!visible) return;
      ctx.clearRect(0, 0, width, height);
      for (const e of embers) {
        e.life += 1;
        e.x += e.vx + Math.sin((e.life + e.y) * 0.01) * 0.1;
        e.y += e.vy;
        if (e.life > e.maxLife || e.y < -10) spawn(e, false);
        const t = e.life / e.maxLife;
        const alpha = t < 0.1 ? t * 10 : 1 - (t - 0.1) / 0.9;
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${e.hue}, 100%, ${55 + e.hue * 0.4}%, ${alpha * 0.55})`;
        ctx.fill();
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { rootMargin: "100px" }
    );
    observer.observe(canvas);

    resize();
    window.addEventListener("resize", resize);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, [reduced, density]);

  if (reduced) return null;
  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      aria-hidden="true"
    />
  );
}
