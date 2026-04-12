"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SystemsDiagram } from "@/components/diagrams/SystemsDiagram";
import { fadeUp, staggerParent, transition, usePrefersReducedMotion } from "@/lib/motion";

export function SystemsMap() {
  const reduced = usePrefersReducedMotion();

  return (
    <Section tone="bone" dividerTop id="systems">
      <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
        <motion.div
          className="lg:col-span-5"
          initial={reduced ? false : "hidden"}
          whileInView={reduced ? undefined : "show"}
          viewport={{ once: true, margin: "-12%" }}
          variants={staggerParent}
        >
          <motion.div variants={fadeUp} transition={transition}>
            <Eyebrow>Connected infrastructure</Eyebrow>
            <h2 className="font-display mt-4 text-[length:var(--text-display)] tracking-wide text-charcoal">
              Not isolated pages. Linked systems.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted">
              Meshimo connects what customers see with what teams operate: CRMs, data
              stores, AI-assisted workflows, dashboards, and automations that keep
              information consistent across surfaces.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          className="rounded-2xl border border-taupe-line bg-bone-deep/50 p-6 lg:col-span-7 lg:p-8"
          initial={reduced ? false : { opacity: 0, y: 12 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={transition}
        >
          <SystemsDiagram />
          <p className="mt-6 text-xs leading-relaxed text-muted">
            Representative map. Actual topologies vary by stack, compliance, and
            operational maturity.
          </p>
        </motion.div>
      </div>
    </Section>
  );
}
