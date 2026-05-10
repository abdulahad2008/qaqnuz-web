"use client";

interface VideoBackgroundProps {
  src: string;
  fallbackColor?: string;
  opacity?: number;
}

export function VideoBackground({
  src,
  fallbackColor = "#0e0e0f",
  opacity = 0.45,
}: VideoBackgroundProps) {
  return (
    <div
      aria-hidden
      className="absolute inset-0 overflow-hidden"
      style={{ background: fallbackColor }}
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity }}
        onError={(e) => {
          (e.currentTarget as HTMLVideoElement).style.display = "none";
        }}
      >
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
}
