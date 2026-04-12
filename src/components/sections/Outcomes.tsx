"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { outcomes } from "@/content/site";
import { fadeUp, staggerParent, transition, usePrefersReducedMotion } from "@/lib/motion";

export function Outcomes() {
  const reduced = usePrefersReducedMotion();

  return (
    <Section tone="bone" dividerTop id="outcomes">
      <motion.div
        initial={reduced ? false : "hidden"}
        whileInView={reduced ? undefined : "show"}
        viewport={{ once: true, margin: "-12%" }}
        variants={staggerParent}
      >
        <motion.div variants={fadeUp} transition={transition}>
          <Eyebrow>Outcomes</Eyebrow>
          <h2 className="font-display mt-4 max-w-2xl text-[length:var(--text-display)] tracking-wide text-charcoal">
            {outcomes.title}
          </h2>
          <p className="mt-4 max-w-2xl text-muted">{outcomes.subtitle}</p>
        </motion.div>

        <ol className="mt-12 grid divide-y divide-taupe-line border-y border-taupe-line md:grid-cols-2 md:divide-x md:divide-y-0">
          {outcomes.items.map((item, i) => (
            <motion.li
              key={item}
              variants={fadeUp}
              transition={transition}
              className="flex gap-4 py-6 md:px-6 md:py-8"
            >
              <span className="font-mono text-xs tabular-nums text-muted">
                {(i + 1).toString().padStart(2, "0")}
              </span>
              <span className="text-sm leading-relaxed text-charcoal-soft">{item}</span>
            </motion.li>
          ))}
        </ol>
      </motion.div>
    </Section>
  );
}
