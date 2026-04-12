"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { finalCta } from "@/content/site";
import { cn } from "@/lib/utils";
import { fadeUp, staggerParent, transition, usePrefersReducedMotion } from "@/lib/motion";

export function FinalCta() {
  const reduced = usePrefersReducedMotion();
  const [status, setStatus] = useState<string | null>(null);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const project = String(data.get("project") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const subject = encodeURIComponent(`Meshimo inquiry: ${project || "Project"}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nProject type: ${project}\n\n${message}`,
    );
    window.location.href = `mailto:hello@meshimo.com?subject=${subject}&body=${body}`;
    setStatus("Your email client should open with a draft message.");
  }

  return (
    <Section tone="ink" id="contact" dividerTop className="pb-24 md:pb-32">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
        <motion.div
          className="lg:col-span-5"
          initial={reduced ? false : "hidden"}
          whileInView={reduced ? undefined : "show"}
          viewport={{ once: true, margin: "-10%" }}
          variants={staggerParent}
        >
          <motion.div variants={fadeUp} transition={transition}>
            <Eyebrow variant="inverse">Contact</Eyebrow>
            <h2 className="font-display mt-4 text-[length:var(--text-display)] tracking-wide text-bone">
              {finalCta.title}
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-bone/75">{finalCta.body}</p>
          </motion.div>
          <ul className="mt-8 space-y-3 text-sm text-bone/70">
            {finalCta.fit.map((line) => (
              <motion.li
                key={line}
                variants={fadeUp}
                transition={transition}
                className="flex gap-3 border-l border-white/15 pl-4"
              >
                {line}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          className="lg:col-span-7"
          initial={reduced ? false : "hidden"}
          whileInView={reduced ? undefined : "show"}
          viewport={{ once: true, margin: "-10%" }}
          variants={staggerParent}
        >
          <motion.form
            variants={fadeUp}
            transition={transition}
            onSubmit={onSubmit}
            className="rounded-2xl border border-white/10 bg-surface-dark/80 p-6 shadow-[0_24px_80px_-40px_rgba(0,0,0,0.55)] md:p-8"
          >
            <div className="grid gap-5 md:grid-cols-2">
              <label className="block text-xs font-medium uppercase tracking-wide text-bone/55">
                Name
                <input
                  name="name"
                  required
                  className={inputClass}
                  placeholder="Your name"
                  autoComplete="name"
                />
              </label>
              <label className="block text-xs font-medium uppercase tracking-wide text-bone/55">
                Email
                <input
                  name="email"
                  type="email"
                  required
                  className={inputClass}
                  placeholder="you@company.com"
                  autoComplete="email"
                />
              </label>
            </div>
            <label className="mt-5 block text-xs font-medium uppercase tracking-wide text-bone/55">
              Project type
              <input
                name="project"
                className={inputClass}
                placeholder="e.g. internal tool, marketing site, AI workflow"
              />
            </label>
            <label className="mt-5 block text-xs font-medium uppercase tracking-wide text-bone/55">
              Context
              <textarea
                name="message"
                rows={5}
                className={cn(inputClass, "min-h-[140px] resize-y")}
                placeholder="Goals, constraints, timeline, stack if known."
              />
            </label>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="submit"
                className="inline-flex min-h-[44px] w-full items-center justify-center rounded-full bg-accent-cta px-8 text-sm font-semibold text-bone transition hover:bg-accent-cta-hover sm:w-auto"
              >
                Open email draft
              </button>
              {status ? (
                <p className="text-xs text-bone/60" role="status">
                  {status}
                </p>
              ) : (
                <p className="text-xs text-bone/45">{finalCta.formNote}</p>
              )}
            </div>
          </motion.form>
        </motion.div>
      </div>
    </Section>
  );
}

const inputClass =
  "mt-2 w-full rounded-lg border border-white/10 bg-surface-ink/60 px-3 py-2.5 text-sm text-bone placeholder:text-bone/35 outline-none transition focus:border-accent-cta/70 focus:ring-2 focus:ring-accent-cta/25";
