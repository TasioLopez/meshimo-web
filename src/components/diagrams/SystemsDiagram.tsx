"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/motion";

const nodes = [
  { id: "brand", label: "Brand", x: 40, y: 36, emphasis: "secondary" as const },
  { id: "site", label: "Site", x: 140, y: 36, emphasis: "none" as const },
  { id: "crm", label: "CRM", x: 240, y: 36, emphasis: "none" as const },
  { id: "ai", label: "AI flow", x: 340, y: 36, emphasis: "cta" as const },
  { id: "data", label: "Data", x: 140, y: 120, emphasis: "none" as const },
  { id: "dash", label: "Dashboard", x: 240, y: 120, emphasis: "secondary" as const },
  { id: "auto", label: "Automation", x: 340, y: 120, emphasis: "none" as const },
];

const edges: [string, string, "strong" | "normal"][] = [
  ["brand", "site", "strong"],
  ["site", "crm", "normal"],
  ["crm", "ai", "strong"],
  ["site", "data", "normal"],
  ["data", "dash", "strong"],
  ["ai", "auto", "strong"],
  ["crm", "dash", "normal"],
];

export function SystemsDiagram() {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<SVGSVGElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.45 });

  const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));

  return (
    <svg
      ref={ref}
      viewBox="0 0 400 160"
      className="h-auto w-full max-w-3xl"
      role="img"
      aria-label="Diagram of connected systems"
    >
      <title>Connected layers from brand to automation</title>
      {edges.map(([a, b, strength]) => {
        const A = byId[a];
        const B = byId[b];
        if (!A || !B) return null;
        const d = `M ${A.x} ${A.y} L ${B.x} ${B.y}`;
        const stroke =
          strength === "strong" ? "var(--accent-secondary)" : "rgba(45, 43, 40, 0.22)";
        const sw = strength === "strong" ? 1.75 : 1;
        return (
          <motion.path
            key={`${a}-${b}`}
            d={d}
            stroke={stroke}
            strokeWidth={sw}
            fill="none"
            strokeLinecap="round"
            initial={reduced ? false : { pathLength: 0, opacity: 0 }}
            animate={inView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.9, ease: [0.16, 1, 0.3, 1] }}
          />
        );
      })}
      {nodes.map((n, i) => {
        const fill =
          n.emphasis === "cta"
            ? "var(--accent-cta)"
            : n.emphasis === "secondary"
              ? "var(--accent-secondary)"
              : "var(--bone)";
        const stroke =
          n.emphasis === "none" ? "rgba(45, 43, 40, 0.2)" : "rgba(47, 111, 107, 0.45)";
        return (
          <g key={n.id}>
            <motion.rect
              x={n.x - 38}
              y={n.y - 14}
              width={76}
              height={28}
              rx="6"
              fill={fill}
              stroke={stroke}
              strokeWidth="1"
              initial={reduced ? false : { opacity: 0, y: 6 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
              transition={{ delay: reduced ? 0 : 0.05 * i, duration: 0.45 }}
            />
            <motion.text
              x={n.x}
              y={n.y + 4}
              textAnchor="middle"
              fill={n.emphasis === "none" ? "#2d2b28" : "#f4f1eb"}
              style={{ fontSize: 10, fontWeight: 600 }}
              initial={reduced ? false : { opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: reduced ? 0 : 0.05 * i + 0.1 }}
            >
              {n.label}
            </motion.text>
          </g>
        );
      })}
    </svg>
  );
}
