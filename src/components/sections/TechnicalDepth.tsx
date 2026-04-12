"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { technicalDepth } from "@/content/site";
import { fadeUp, staggerParent, transition, usePrefersReducedMotion } from "@/lib/motion";

export function TechnicalDepth() {
  const reduced = usePrefersReducedMotion();

  return (
    <Section tone="boneDeep" dividerTop id="depth">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
        <motion.div
          className="lg:col-span-5"
          initial={reduced ? false : "hidden"}
          whileInView={reduced ? undefined : "show"}
          viewport={{ once: true, margin: "-10%" }}
          variants={staggerParent}
        >
          <motion.div variants={fadeUp} transition={transition}>
            <Eyebrow>Why Meshimo</Eyebrow>
            <h2 className="font-display mt-4 text-[length:var(--text-display)] tracking-wide text-charcoal">
              {technicalDepth.title}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted">{technicalDepth.thesis}</p>
          </motion.div>
        </motion.div>

        <motion.ul
          className="grid gap-6 sm:grid-cols-2 lg:col-span-7"
          initial={reduced ? false : "hidden"}
          whileInView={reduced ? undefined : "show"}
          viewport={{ once: true, margin: "-10%" }}
          variants={staggerParent}
        >
          {technicalDepth.points.map((p) => (
            <motion.li
              key={p.title}
              variants={fadeUp}
              transition={transition}
              className="rounded-xl border border-taupe-line bg-bone p-5"
            >
              <p className="text-sm font-semibold text-charcoal">{p.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{p.text}</p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </Section>
  );
}
