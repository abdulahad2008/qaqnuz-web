"use client";

export function FilmGrain({ opacity = 0.035 }: { opacity?: number }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-10 overflow-hidden"
    >
      <div
        className="absolute"
        style={{
          inset: "-50%",
          width: "200%",
          height: "200%",
          opacity,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
          backgroundSize: "180px 180px",
          animation: "grain-shift 0.18s steps(1) infinite",
        }}
      />
    </div>
  );
}
