"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Tag } from "@/components/ui/Tag";
import { workItems } from "@/content/work";
import { fadeUp, staggerParent, transition, usePrefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

const tagVariants = ["neutral", "secondary", "cta"] as const;

function WorkFrame() {
  return (
    <div className="relative mb-6 aspect-[16/10] overflow-hidden rounded-xl border border-taupe-line bg-gradient-to-br from-surface-ink via-charcoal to-surface-elevated shadow-inner">
      <div
        className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-accent-cta/20 blur-2xl"
        aria-hidden
      />
      <div className="absolute inset-3 rounded-lg border border-white/10 bg-charcoal/50 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)] transition duration-500 group-hover:rotate-[1deg] group-hover:shadow-[0_28px_60px_-24px_rgba(0,0,0,0.55)]" />
      <div className="absolute inset-7 rounded-md border border-white/5 bg-bone/5 backdrop-blur-[2px]" />
      <div className="absolute bottom-4 left-4 right-4 flex flex-col gap-2">
        <div className="h-1.5 w-2/5 rounded-full bg-bone/25" />
        <div className="h-1 w-3/5 rounded-full bg-bone/15" />
        <div className="mt-2 flex gap-1">
          {[32, 44, 28, 36].map((w) => (
            <div
              key={w}
              className="h-6 rounded-sm bg-bone/10"
              style={{ width: `${w}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function WorkCard({
  title,
  category,
  types,
  outcome,
  className,
  showFrame = true,
}: {
  title: string;
  category: string;
  types: string[];
  outcome: string;
  className?: string;
  showFrame?: boolean;
}) {
  return (
    <article
      className={cn(
        "group flex h-full flex-col justify-between rounded-2xl border border-taupe-line bg-bone p-6 transition hover:border-accent-cta/25 hover:shadow-[0_22px_70px_-40px_rgba(28,27,25,0.55)]",
        className,
      )}
    >
      <div>
        {showFrame ? <WorkFrame /> : null}
        <div className="flex flex-wrap gap-2">
          {types.map((t, i) => (
            <Tag key={t} variant={tagVariants[i % tagVariants.length]}>
              {t}
            </Tag>
          ))}
        </div>
        <h3 className="mt-4 font-display text-xl tracking-wide text-charcoal md:text-2xl">
          {title}
        </h3>
        <p className="mt-2 text-xs font-medium uppercase tracking-wide text-muted">{category}</p>
      </div>
      <p className="mt-6 text-sm leading-relaxed text-charcoal-soft">{outcome}</p>
    </article>
  );
}

export function SelectedWork() {
  const reduced = usePrefersReducedMotion();
  const [a, b, c, d, e] = workItems;

  return (
    <Section tone="boneDeep" dividerTop id="work">
      <motion.div
        initial={reduced ? false : "hidden"}
        whileInView={reduced ? undefined : "show"}
        viewport={{ once: true, margin: "-12%" }}
        variants={staggerParent}
      >
        <motion.div variants={fadeUp} transition={transition}>
          <Eyebrow>Selected work</Eyebrow>
          <h2 className="font-display mt-4 max-w-3xl text-[length:var(--text-display)] tracking-wide text-charcoal">
            Builds across surfaces and systems
          </h2>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted">
            Illustrative engagements showing breadth: customer-facing experiences,
            internal platforms, AI-enabled workflows, and integration-heavy
            infrastructure.
          </p>
        </motion.div>

        <div className="mt-14 flex flex-col gap-5">
          <div className="grid gap-5 lg:grid-cols-3">
            <motion.div variants={fadeUp} transition={transition} className="lg:col-span-2">
              <WorkCard
                title={a.title}
                category={a.category}
                types={a.types}
                outcome={a.outcome}
              />
            </motion.div>
            <motion.div variants={fadeUp} transition={transition} className="min-h-[280px] lg:min-h-[320px]">
              <WorkCard
                title={b.title}
                category={b.category}
                types={b.types}
                outcome={b.outcome}
                className="h-full"
              />
            </motion.div>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {[c, d, e].map((item) => (
              <motion.div key={item.slug} variants={fadeUp} transition={transition}>
                <WorkCard
                  title={item.title}
                  category={item.category}
                  types={item.types}
                  outcome={item.outcome}
                  showFrame={false}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </Section>
  );
}
