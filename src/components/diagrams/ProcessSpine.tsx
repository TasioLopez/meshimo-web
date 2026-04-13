"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/lib/motion";

type Props = {
  total: number;
  active: number;
  onSelect: (index: number) => void;
};

export function ProcessSpine({ total, active, onSelect }: Props) {
  const reduced = usePrefersReducedMotion();

  return (
    <nav
      className="relative flex shrink-0 flex-col items-center"
      aria-label="Process stages"
    >
      <div
        className="pointer-events-none absolute left-1/2 top-4 bottom-4 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-taupe-line to-transparent"
        aria-hidden
      />
      {Array.from({ length: total }).map((_, i) => {
        const isActive = i === active;
        return (
          <div key={i} className="flex flex-col items-center">
            <motion.button
              type="button"
              onClick={() => onSelect(i)}
              className={cn(
                "relative z-[1] flex h-11 w-11 items-center justify-center rounded-full border-2 font-mono text-[0.65rem] tabular-nums transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-cta",
                isActive
                  ? "border-accent-cta bg-accent-cta text-bone shadow-md"
                  : "border-taupe-line bg-bone text-muted hover:border-accent-secondary/60 hover:text-charcoal",
              )}
              aria-current={isActive ? "step" : undefined}
              aria-label={`Stage ${i + 1}`}
              animate={reduced ? undefined : isActive ? { scale: 1.06 } : { scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 26 }}
            >
              {(i + 1).toString().padStart(2, "0")}
            </motion.button>
            {i < total - 1 ? <div className="h-5 shrink-0" aria-hidden /> : null}
          </div>
        );
      })}
    </nav>
  );
}
