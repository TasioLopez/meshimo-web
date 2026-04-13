"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ProcessPhaseBar } from "@/components/diagrams/ProcessPhaseBar";
import { processStages } from "@/content/process";
import { cn } from "@/lib/utils";
import { fadeUp, staggerParent, transition, usePrefersReducedMotion } from "@/lib/motion";

function pickStageByMostVisible(
  blocks: HTMLElement[],
  viewportHeight: number,
): number {
  if (blocks.length === 0) return 0;
  let bestIdx = 0;
  let bestVisible = -1;
  for (let i = 0; i < blocks.length; i++) {
    const r = blocks[i]!.getBoundingClientRect();
    const visibleTop = Math.max(r.top, 0);
    const visibleBottom = Math.min(r.bottom, viewportHeight);
    const visible = Math.max(0, visibleBottom - visibleTop);
    if (visible > bestVisible) {
      bestVisible = visible;
      bestIdx = i;
    }
  }
  return bestIdx;
}

export function ProcessInteractive() {
  const reduced = usePrefersReducedMotion();
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);
  const rafRef = useRef<number | null>(null);

  const updateActiveFromScroll = useCallback(() => {
    const root = rootRef.current;
    if (!root) return;
    const blocks = Array.from(
      root.querySelectorAll<HTMLElement>("[data-stage-index]"),
    );
    if (blocks.length === 0) return;
    const idx = pickStageByMostVisible(blocks, window.innerHeight);
    setActive(idx);
  }, []);

  useEffect(() => {
    const onScrollOrResize = () => {
      if (rafRef.current != null) return;
      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = null;
        updateActiveFromScroll();
      });
    };

    updateActiveFromScroll();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      if (rafRef.current != null) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, [updateActiveFromScroll]);

  function scrollToStage(index: number) {
    const el = document.getElementById(`process-stage-${index}`);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <Section tone="boneDeep" id="process" dividerTop className="pb-8 md:pb-12">
      <motion.div
        initial={reduced ? false : "hidden"}
        whileInView={reduced ? undefined : "show"}
        viewport={{ once: true, margin: "-12%" }}
        variants={staggerParent}
      >
        <motion.div variants={fadeUp} transition={transition}>
          <Eyebrow>Process</Eyebrow>
          <h2 className="font-display mt-4 max-w-3xl text-[length:var(--text-display)] tracking-wide text-charcoal">
            How Meshimo works
          </h2>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted">
            Every project moves from clear scope to live delivery. Strategy matters, but the work
            is always grounded in real outputs: what gets designed, what gets built, how it
            connects, and how it runs after launch.
          </p>
          <ProcessPhaseBar />
        </motion.div>
      </motion.div>

      <div ref={rootRef} className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-6">
        <aside className="hidden lg:col-span-4 lg:block xl:col-span-3">
          <nav
            className="relative space-y-2 lg:sticky lg:top-28"
            aria-label="Process stages"
          >
            <div
              className="pointer-events-none absolute left-[22px] top-3 bottom-3 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-taupe-line to-transparent"
              aria-hidden
            />
            {processStages.map((stage, index) => {
              const isActive = index === active;
              return (
                <button
                  key={stage.id}
                  type="button"
                  onClick={() => scrollToStage(index)}
                  className={cn(
                    "relative z-[1] flex w-full gap-3 rounded-xl border px-2 py-2.5 text-left transition",
                    "items-start",
                    isActive
                      ? "border-accent-cta/40 bg-bone shadow-sm ring-1 ring-accent-cta/15"
                      : "border-transparent hover:border-taupe-line hover:bg-bone/80",
                  )}
                  aria-current={isActive ? "step" : undefined}
                >
                  <motion.span
                    className={cn(
                      "flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 font-mono text-[0.65rem] tabular-nums transition-colors",
                      isActive
                        ? "border-accent-cta bg-accent-cta text-bone shadow-md"
                        : "border-taupe-line bg-bone text-muted hover:border-accent-secondary/60 hover:text-charcoal",
                    )}
                    animate={
                      reduced ? undefined : isActive ? { scale: 1.06 } : { scale: 1 }
                    }
                    transition={{ type: "spring", stiffness: 400, damping: 26 }}
                  >
                    {(index + 1).toString().padStart(2, "0")}
                  </motion.span>
                  <span className="min-w-0 flex-1 pt-1.5 text-xs font-semibold leading-snug text-charcoal">
                    {stage.title}
                  </span>
                </button>
              );
            })}
          </nav>
        </aside>

        <div className="lg:col-span-8 xl:col-span-9">
          <div className="mb-6 flex gap-2 overflow-x-auto pb-2 lg:hidden">
            {processStages.map((stage, index) => (
              <button
                key={stage.id}
                type="button"
                onClick={() => scrollToStage(index)}
                className={cn(
                  "min-h-[44px] shrink-0 rounded-full border px-3 py-2 text-xs font-medium transition",
                  index === active
                    ? "border-accent-cta/50 bg-bone text-charcoal shadow-sm"
                    : "border-taupe-line bg-bone-deep/40 text-muted",
                )}
              >
                {(index + 1).toString().padStart(2, "0")}
              </button>
            ))}
          </div>

          <div className="space-y-6">
            {processStages.map((stage, index) => (
              <article
                key={stage.id}
                id={`process-stage-${index}`}
                data-stage-index={index}
                className="scroll-mt-28 rounded-2xl border border-taupe-line bg-bone p-6 shadow-sm md:p-8"
              >
                <div className="flex flex-wrap items-start gap-4">
                  <div
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-accent-secondary bg-bone-deep/50 font-display text-xl tabular-nums text-accent-secondary"
                    aria-hidden
                  >
                    {(index + 1).toString().padStart(2, "0")}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-lg font-semibold leading-snug text-charcoal md:text-xl">
                      {stage.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted">{stage.summary}</p>
                  </div>
                </div>

                <ul className="mt-6 space-y-3 border-t border-taupe-line pt-6">
                  {stage.bullets.map((b) => (
                    <li key={b} className="flex gap-3 text-sm leading-relaxed text-charcoal-soft">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent-cta" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                {stage.details && stage.details.length > 0 ? (
                  <div className="mt-6 space-y-3">
                    {stage.details.map((group) => (
                      <details
                        key={group.title}
                        className="group rounded-xl border border-taupe-line bg-bone-deep/35 open:bg-bone open:shadow-sm"
                      >
                        <summary className="cursor-pointer list-none px-4 py-3 text-sm font-semibold text-charcoal marker:content-none [&::-webkit-details-marker]:hidden">
                          <span className="flex items-center justify-between gap-2">
                            {group.title}
                            <span className="text-xs font-normal text-muted transition duration-200 group-open:rotate-180">
                              ▼
                            </span>
                          </span>
                        </summary>
                        <ul className="space-y-2 border-t border-taupe-line px-4 py-3 text-sm leading-relaxed text-charcoal-soft">
                          {group.items.map((item) => (
                            <li key={item} className="flex gap-2">
                              <span className="text-accent-secondary" aria-hidden>
                                ·
                              </span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </details>
                    ))}
                  </div>
                ) : null}

                <div className="mt-6 rounded-xl border border-dashed border-accent-secondary/35 bg-bone-deep/50 p-4 text-sm leading-relaxed text-charcoal-soft">
                  <span className="font-semibold text-charcoal">Meshimo lens: </span>
                  {stage.meshimoAngle}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
