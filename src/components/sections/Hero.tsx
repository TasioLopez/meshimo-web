"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { animate, motion, useMotionValue } from "framer-motion";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Container } from "@/components/layout/Container";
import {
  hero,
  heroRotateIntervalMs,
  heroRotatingSlides,
  heroShuttleMs,
  siteMeta,
} from "@/content/site";
import { easeOutExpo, fadeUp, transition, usePrefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { HeroLaptopFrame } from "@/components/sections/hero/HeroLaptopFrame";
import { HeroSlideVisual } from "@/components/sections/hero/HeroSlideVisual";

const ease = easeOutExpo;

/** Tailwind `md` — keep in sync with shuttle behavior vs laptop `md:` widths. */
const MD_STAGE_PX = 768;

/**
 * Desktop/tablet (md+): original shuttle range (unchanged from launch layout).
 * Below md: cap travel so the mockup + headline stay inside the stage (vw-safe widths).
 */
function shuttleOffsets(stageWidth: number) {
  if (stageWidth >= MD_STAGE_PX) {
    return Math.min(268, Math.max(120, stageWidth * 0.36));
  }
  const lw = Math.min(440, Math.max(0, stageWidth - 16));
  const pad = 12;
  const maxTravel = Math.max(0, stageWidth / 2 - lw / 2 - pad);
  const desired = Math.min(268, Math.max(0, stageWidth * 0.36));
  return Math.min(desired, maxTravel);
}

export function Hero() {
  const reduced = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const [transit, setTransit] = useState<{ from: number; to: number } | null>(null);
  const [midpoint, setMidpoint] = useState(false);
  const [shuttling, setShuttling] = useState(false);
  const [stageW, setStageW] = useState(640);
  const stageRef = useRef<HTMLDivElement>(null);
  const crossedRef = useRef(false);
  const isShuttlingRef = useRef(false);
  const indexRef = useRef(index);

  indexRef.current = index;

  const wordX = useMotionValue(-120);
  const wordY = useMotionValue(0);
  const laptopX = useMotionValue(120);
  const laptopY = useMotionValue(0);
  const laptopRotate = useMotionValue(0);

  useLayoutEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setStageW(el.offsetWidth));
    ro.observe(el);
    setStageW(el.offsetWidth);
    return () => ro.disconnect();
  }, []);

  const syncPositions = useCallback(
    (i: number, w: number) => {
      const off = shuttleOffsets(w);
      const left = -off;
      const right = off;
      if (i % 2 === 0) {
        wordX.set(left);
        laptopX.set(right);
      } else {
        wordX.set(right);
        laptopX.set(left);
      }
      wordY.set(0);
      laptopY.set(0);
      laptopRotate.set(0);
    },
    [laptopRotate, laptopX, laptopY, wordX, wordY],
  );

  useLayoutEffect(() => {
    if (reduced) return;
    if (shuttling || transit) return;
    syncPositions(index, stageW);
  }, [index, stageW, reduced, shuttling, transit, syncPositions]);

  const displayIdx =
    reduced || !transit ? index : midpoint ? transit.to : transit.from;
  const slide = heroRotatingSlides[displayIdx]!;
  /** Shorter clamp so 8+ letter words (e.g. OPTIMIZE) do not run under the mockup */
  const longHeroWord = slide.word.length >= 8;
  /** OPTIMIZE is an even index (4): word is always left of the mockup */
  const optimizeSlide = slide.id === "optimize";

  const runShuttle = useCallback(async () => {
    if (reduced || isShuttlingRef.current) return;
    const from = indexRef.current;
    const to = (from + 1) % heroRotatingSlides.length;
    const el = stageRef.current;
    const w = el?.offsetWidth ?? stageW;
    const off = shuttleOffsets(w);

    const ws = from % 2 === 0 ? -off : off;
    const we = from % 2 === 0 ? off : -off;
    const ls = from % 2 === 0 ? off : -off;
    const le = from % 2 === 0 ? -off : off;

    isShuttlingRef.current = true;
    crossedRef.current = false;
    setShuttling(true);
    setMidpoint(false);
    setTransit({ from, to });

    const duration = heroShuttleMs / 1000;

    try {
      await animate(0, 1, {
        duration,
        ease,
        onUpdate: (latest) => {
          wordX.set(ws + (we - ws) * latest);
          laptopX.set(ls + (le - ls) * latest);
          const arc = Math.sin(latest * Math.PI);
          wordY.set(arc * -5);
          laptopY.set(arc * 4);
          laptopRotate.set(arc * 0.55);
          if (latest >= 0.5 && !crossedRef.current) {
            crossedRef.current = true;
            setMidpoint(true);
          }
        },
      });
    } finally {
      setIndex(to);
      indexRef.current = to;
      setTransit(null);
      setMidpoint(false);
      setShuttling(false);
      isShuttlingRef.current = false;
      wordY.set(0);
      laptopY.set(0);
      laptopRotate.set(0);
    }
  }, [
    reduced,
    stageW,
    wordX,
    laptopX,
    wordY,
    laptopY,
    laptopRotate,
  ]);

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => {
      void runShuttle();
    }, heroRotateIntervalMs);
    return () => window.clearInterval(id);
  }, [reduced, runShuttle]);

  return (
    <section className="relative overflow-x-clip overflow-y-visible border-b border-taupe-line bg-bone pb-20 pt-14 md:pb-28 md:pt-20">
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(-18deg, transparent, transparent 47px, var(--charcoal) 47px, var(--charcoal) 48px)",
        }}
        aria-hidden
      />

      <div
        className="pointer-events-none absolute inset-0 z-[1] flex items-center justify-center overflow-hidden"
        aria-hidden
      >
        <div
          className={cn(
            "flex w-[min(78vw,520px)] max-w-full items-center justify-center opacity-[0.05] mix-blend-multiply contrast-[1.02] saturate-[0.88] md:w-[min(72vw,500px)] md:opacity-[0.058]",
            !reduced && "animate-meshimo-watermark-drift",
          )}
        >
          <img
            src="/meshimo-logo.svg"
            alt=""
            width={1500}
            height={1500}
            decoding="async"
            className="h-auto w-full max-w-full select-none object-contain"
          />
        </div>
      </div>

      <Container className="relative z-[2]">
        <div className="mx-auto flex max-w-6xl flex-col items-center px-2 text-center sm:px-4 lg:max-w-7xl">
          <h1 className="sr-only">{siteMeta.title}</h1>

          <motion.div
            className="w-full"
            initial={reduced ? false : "hidden"}
            animate={reduced ? undefined : "show"}
            variants={{
              hidden: {},
              show: {
                transition: { staggerChildren: 0.07, delayChildren: 0.04 },
              },
            }}
          >
            <motion.div variants={fadeUp} transition={{ ...transition, duration: 0.5 }}>
              <Eyebrow className="text-center">{hero.eyebrow}</Eyebrow>
            </motion.div>
          </motion.div>

          {!reduced ? (
            <motion.p
              key={slide.id}
              className={cn(
                "mt-8 w-full text-center font-display text-charcoal md:hidden",
                longHeroWord ? "tracking-[0.03em]" : "tracking-[0.04em]",
                "text-[length:clamp(2.75rem,11vw,4.25rem)] leading-[0.84]",
              )}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: easeOutExpo }}
            >
              {slide.word}
            </motion.p>
          ) : null}

          {reduced ? (
            <div className="mt-8 flex w-full max-w-4xl flex-col items-center gap-8 md:mt-12 md:flex-row md:items-center md:justify-between md:gap-12 lg:max-w-6xl lg:gap-16">
              <p className="w-full max-w-[min(100%,380px)] text-right font-display text-[length:clamp(2.75rem,10vw,4.5rem)] leading-[0.86] tracking-[0.04em] text-charcoal md:pr-2 lg:max-w-[min(100%,540px)] lg:pr-5 lg:text-[length:clamp(4.25rem,min(17vw,34vh),11rem)] lg:leading-[0.78]">
                {heroRotatingSlides[0]!.word}
              </p>
              <HeroLaptopFrame>
                <HeroSlideVisual slideId={heroRotatingSlides[0]!.id} reduced />
              </HeroLaptopFrame>
            </div>
          ) : (
            <div
              ref={stageRef}
              className="relative mt-4 h-[min(220px,48vw)] w-full max-w-5xl md:mt-14 md:h-[340px] lg:max-w-6xl lg:h-[420px] xl:max-w-7xl xl:h-[450px]"
              aria-hidden
            >
              <motion.div
                className={cn(
                  "pointer-events-none absolute left-1/2 top-1/2 z-10 hidden w-[min(54%,320px)] -translate-x-1/2 -translate-y-1/2 md:block md:w-[min(50%,360px)] lg:w-[min(52%,440px)] xl:w-[min(54%,520px)]",
                  displayIdx % 2 === 0
                    ? cn(
                        "text-right",
                        optimizeSlide
                          ? "pr-9 md:pr-14 lg:pr-[7.5rem] xl:pr-[9rem]"
                          : cn(
                              "pr-7 md:pr-10 lg:pr-14 xl:pr-20",
                              longHeroWord && "pr-8 md:pr-12 lg:pr-[4.5rem] xl:pr-24",
                            ),
                      )
                    : cn(
                        "text-left",
                        "pl-7 md:pl-10 lg:pl-14 xl:pl-20",
                        longHeroWord && "pl-8 md:pl-12 lg:pl-[4.5rem] xl:pl-24",
                      ),
                )}
                style={{ x: wordX, y: wordY }}
              >
                <p
                  className={cn(
                    "font-display text-charcoal",
                    longHeroWord ? "tracking-[0.03em]" : "tracking-[0.04em]",
                    "text-[length:clamp(2.4rem,9.5vw,5.5rem)] leading-[0.84]",
                    longHeroWord
                      ? "md:text-[length:clamp(2.5rem,8.5vw,5.75rem)] md:leading-[0.82]"
                      : "md:text-[length:clamp(2.85rem,11vw,6.5rem)] md:leading-[0.82]",
                    longHeroWord
                      ? "lg:text-[length:clamp(3.25rem,min(11vw,30vh),9.5rem)] lg:leading-[0.78]"
                      : "lg:text-[length:clamp(4.25rem,min(14vw,34vh),11.5rem)] lg:leading-[0.78]",
                    longHeroWord
                      ? "xl:text-[length:clamp(3.5rem,min(10vw,32vh),10.25rem)] xl:leading-[0.76]"
                      : "xl:text-[length:clamp(4.75rem,min(13vw,36vh),12.5rem)] xl:leading-[0.76]",
                  )}
                >
                  {slide.word}
                </p>
              </motion.div>

              <motion.div
                className="pointer-events-none absolute left-1/2 top-1/2 z-30 w-full max-w-[min(440px,calc(100vw-3.5rem))] shrink-0 -translate-x-1/2 -translate-y-1/2 md:w-[min(90vw,480px)] md:max-w-[480px] lg:w-[min(86vw,540px)] lg:max-w-[560px]"
                style={{
                  x: laptopX,
                  y: laptopY,
                  rotate: laptopRotate,
                }}
              >
                <HeroLaptopFrame>
                  <HeroSlideVisual
                    key={slide.id}
                    slideId={slide.id}
                    reduced={reduced}
                  />
                </HeroLaptopFrame>
              </motion.div>
            </div>
          )}

          <div className="mt-8 flex justify-center gap-1.5 md:mt-10" aria-hidden>
            {heroRotatingSlides.map((s, i) => (
              <span
                key={s.id}
                className={cn(
                  "h-1 w-6 rounded-full transition-colors duration-300 md:w-8",
                  i === index ? "bg-accent-cta" : "bg-taupe-line",
                )}
              />
            ))}
          </div>

          <motion.p
            className="mt-8 max-w-xl text-pretty text-base leading-relaxed text-muted md:mt-12 md:text-lg"
            initial={reduced ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transition, duration: 0.55, delay: reduced ? 0 : 0.15 }}
          >
            {hero.subhead}
          </motion.p>

          <motion.div
            className="mt-8 flex w-full flex-wrap justify-center gap-4 md:mt-10"
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transition, duration: 0.55, delay: reduced ? 0 : 0.22 }}
          >
            <ButtonLink href={hero.primaryCta.href}>{hero.primaryCta.label}</ButtonLink>
            <ButtonLink href={hero.secondaryCta.href} variant="ghost">
              {hero.secondaryCta.label}
            </ButtonLink>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
