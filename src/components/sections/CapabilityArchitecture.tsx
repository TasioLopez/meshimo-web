"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { capabilityClusters } from "@/content/capabilities";
import { cn } from "@/lib/utils";
import { fadeUp, staggerParent, transition, usePrefersReducedMotion } from "@/lib/motion";

export function CapabilityArchitecture() {
  const reduced = usePrefersReducedMotion();
  const [activeId, setActiveId] = useState(() => capabilityClusters[0]?.id ?? "");
  const [mobileOpen, setMobileOpen] = useState<string | null>(null);

  const active = capabilityClusters.find((c) => c.id === activeId) ?? capabilityClusters[0];

  return (
    <Section id="capabilities" tone="bone" dividerTop>
      <motion.div
        initial={reduced ? false : "hidden"}
        whileInView={reduced ? undefined : "show"}
        viewport={{ once: true, margin: "-12%" }}
        variants={staggerParent}
      >
        <motion.div variants={fadeUp} transition={transition}>
          <Eyebrow>Our services</Eyebrow>
          <h2 className="font-display mt-4 max-w-3xl text-[length:var(--text-display)] tracking-wide text-charcoal">
            Service architecture
          </h2>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted">
            Five clusters cover the full stack Meshimo delivers: from customer-facing
            surfaces to integrations, automation, and technical growth infrastructure.
          </p>
        </motion.div>

        <div className="mt-14 hidden gap-10 lg:grid lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="sticky top-28 space-y-2">
              {capabilityClusters.map((c) => {
                const isActive = c.id === activeId;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onMouseEnter={() => setActiveId(c.id)}
                    onFocus={() => setActiveId(c.id)}
                    onClick={() => setActiveId(c.id)}
                    className={cn(
                      "w-full rounded-xl border px-4 py-4 text-left transition",
                      isActive
                        ? "border-accent-cta/35 bg-bone-deep shadow-md ring-1 ring-accent-cta/10"
                        : "border-transparent hover:border-taupe-line hover:bg-bone-deep/50",
                    )}
                  >
                    <span className="text-sm font-semibold text-charcoal">{c.title}</span>
                    <p className="mt-2 text-xs leading-relaxed text-muted">{c.overview}</p>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="relative lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={reduced ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? undefined : { opacity: 0, y: -6 }}
                transition={transition}
                className="rounded-2xl border border-taupe-line bg-bone-deep/60 p-6 shadow-sm md:p-8"
              >
                <h3 className="text-lg font-semibold text-charcoal">{active.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{active.overview}</p>
                <ul className="mt-6 space-y-3 border-t border-taupe-line pt-6">
                  {active.items.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 text-sm leading-relaxed text-charcoal-soft"
                    >
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent-secondary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-10 space-y-3 lg:hidden">
          {capabilityClusters.map((c) => {
            const open = mobileOpen === c.id;
            return (
              <div key={c.id} className="overflow-hidden rounded-xl border border-taupe-line bg-bone-deep/40">
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left"
                  onClick={() => setMobileOpen(open ? null : c.id)}
                  aria-expanded={open}
                >
                  <span className="text-sm font-semibold text-charcoal">{c.title}</span>
                  <span className="text-xs text-muted">{open ? "Close" : "Open"}</span>
                </button>
                <AnimatePresence initial={false}>
                  {open ? (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={transition}
                      className="border-t border-taupe-line"
                    >
                      <div className="space-y-4 px-4 py-4">
                        <p className="text-sm leading-relaxed text-muted">{c.overview}</p>
                        <ul className="space-y-3">
                          {c.items.map((item) => (
                            <li key={item} className="flex gap-3 text-sm text-charcoal-soft">
                              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent-secondary" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </motion.div>
    </Section>
  );
}
