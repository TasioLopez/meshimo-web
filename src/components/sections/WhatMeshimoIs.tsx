"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { whatMeshimoIs } from "@/content/site";
import { fadeUp, staggerParent, transition, usePrefersReducedMotion } from "@/lib/motion";

export function WhatMeshimoIs() {
  const reduced = usePrefersReducedMotion();

  return (
    <Section id="about" tone="inkLift">
      <motion.div
        initial={reduced ? false : "hidden"}
        whileInView={reduced ? undefined : "show"}
        viewport={{ once: true, margin: "-12%" }}
        variants={staggerParent}
      >
        <motion.div variants={fadeUp} transition={transition}>
          <Eyebrow variant="inverse">Positioning</Eyebrow>
          <h2 className="font-display mt-4 max-w-3xl text-[length:var(--text-display)] tracking-wide text-bone">
            {whatMeshimoIs.title}
          </h2>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-bone/75">
            {whatMeshimoIs.intro}
          </p>
        </motion.div>

        <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
          {whatMeshimoIs.columns.map((col) => (
            <motion.article
              key={col.title}
              variants={fadeUp}
              transition={transition}
              className="border-t border-white/10 pt-6"
            >
              <h3 className="text-sm font-semibold text-bone">{col.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-bone/65">{col.body}</p>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </Section>
  );
}
