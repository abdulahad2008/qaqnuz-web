"use client";

import { useReducedMotion } from "framer-motion";

export function EmberSVG({
  className = "",
  width = 120,
  height = 160,
}: {
  className?: string;
  width?: number;
  height?: number;
}) {
  const reduced = useReducedMotion();

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 120 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <defs>
        <radialGradient id="flame-core" cx="50%" cy="80%" r="50%">
          <stop offset="0%" stopColor="#ffbc4d" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#f07d00" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#f07d00" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="flame-outer" cx="50%" cy="90%" r="50%">
          <stop offset="0%" stopColor="#ff9d1a" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#f07d00" stopOpacity="0" />
        </radialGradient>
        <filter id="flame-blur">
          <feGaussianBlur stdDeviation="4" />
        </filter>
      </defs>

      {/* Outer glow */}
      <ellipse
        cx="60"
        cy="120"
        rx="40"
        ry="50"
        fill="url(#flame-outer)"
        filter="url(#flame-blur)"
      >
        {!reduced && (
          <animate
            attributeName="ry"
            values="50;55;48;52;50"
            dur="3s"
            repeatCount="indefinite"
          />
        )}
      </ellipse>

      {/* Main flame body */}
      <path
        d="M60 10 C60 10 90 50 88 90 C86 115 75 138 60 150 C45 138 34 115 32 90 C30 50 60 10 60 10Z"
        fill="url(#flame-core)"
      >
        {!reduced && (
          <animate
            attributeName="d"
            values="
              M60 10 C60 10 90 50 88 90 C86 115 75 138 60 150 C45 138 34 115 32 90 C30 50 60 10 60 10Z;
              M60 10 C65 15 92 52 90 92 C88 116 76 139 60 150 C44 139 33 116 30 92 C28 52 55 15 60 10Z;
              M60 10 C58 12 88 48 87 89 C85 114 74 137 60 150 C46 137 35 114 33 89 C32 48 62 12 60 10Z;
              M60 10 C60 10 90 50 88 90 C86 115 75 138 60 150 C45 138 34 115 32 90 C30 50 60 10 60 10Z
            "
            dur="2.4s"
            repeatCount="indefinite"
          />
        )}
      </path>

      {/* Inner bright core */}
      <ellipse
        cx="60"
        cy="115"
        rx="16"
        ry="22"
        fill="#ffbc4d"
        opacity="0.5"
        filter="url(#flame-blur)"
      >
        {!reduced && (
          <animate
            attributeName="opacity"
            values="0.5;0.8;0.4;0.7;0.5"
            dur="1.8s"
            repeatCount="indefinite"
          />
        )}
      </ellipse>
    </svg>
  );
}
