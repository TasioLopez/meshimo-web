"use client";

import { marqueeLine } from "@/content/site";
import { usePrefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function MarqueeStrip() {
  const reduced = usePrefersReducedMotion();

  if (reduced) {
    return (
      <div className="border-y border-taupe-line bg-bone-deep/50 py-3 text-center md:py-4">
        <p className="font-display px-4 text-lg tracking-[0.12em] text-charcoal md:text-xl">
          {marqueeLine.trim()}
        </p>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden border-y border-taupe-line bg-bone-deep/50 py-3 md:py-4">
      <div
        className={cn("flex w-max gap-16 md:gap-24", "animate-meshimo-marquee")}
        style={{ animationDuration: "42s" }}
      >
        <p
          className="font-display whitespace-nowrap text-xl tracking-[0.14em] text-charcoal md:text-2xl"
          aria-hidden
        >
          {marqueeLine}
        </p>
        <p
          className="font-display whitespace-nowrap text-xl tracking-[0.14em] text-charcoal md:text-2xl"
          aria-hidden
        >
          {marqueeLine}
        </p>
      </div>
      <p className="sr-only">{marqueeLine}</p>
    </div>
  );
}
