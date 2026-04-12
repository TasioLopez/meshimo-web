"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { easeOutExpo } from "@/lib/motion";
import { cn } from "@/lib/utils";

const ease = easeOutExpo;

type Props = { slideId: string; reduced: boolean };

/** Slide content for the laptop viewport only (no outer chrome). */
export function HeroSlideVisual({ slideId, reduced }: Props) {
  return (
    <div className="relative flex h-full min-h-0 w-full flex-1 flex-col items-stretch justify-stretch p-2 md:p-3">
      {slideId === "build" && <VisualBuild reduced={reduced} />}
      {slideId === "integrate" && <VisualIntegrate reduced={reduced} />}
      {slideId === "ship" && <VisualShip reduced={reduced} />}
      {slideId === "connect" && <VisualConnect reduced={reduced} />}
      {slideId === "optimize" && <VisualOptimize reduced={reduced} />}
      {slideId === "automate" && <VisualAutomate reduced={reduced} />}
    </div>
  );
}

/** Dev desktop: terminal + build panel with spinner. */
function VisualBuild({ reduced }: { reduced: boolean }) {
  const lines = [
    "$ meshimo build --production",
    "▸ resolving deps…",
    "▸ compiling modules… 847/847",
    "▸ bundling assets…",
  ];
  return (
    <div className="grid h-full min-h-0 w-full grid-cols-2 gap-2 md:gap-2.5">
      <motion.div
        className="flex min-h-0 flex-col overflow-hidden rounded-lg border border-charcoal/30 bg-[var(--surface-ink)] shadow-inner"
        initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduced ? 0 : 0.45, ease }}
      >
        <div className="flex shrink-0 items-center gap-1 border-b border-white/10 px-2 py-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-red-400/90" />
          <span className="h-1.5 w-1.5 rounded-full bg-amber-400/90" />
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500/80" />
          <span className="ml-1.5 font-mono text-[0.55rem] text-bone/45">terminal</span>
        </div>
        <div className="min-h-0 flex-1 overflow-hidden px-2 py-2 font-mono text-[0.58rem] leading-relaxed text-bone/88 md:text-[0.62rem]">
          {lines.map((line, i) => (
            <motion.p
              key={line}
              className="text-bone/75"
              initial={{ opacity: reduced ? 1 : 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: reduced ? 0 : 0.08 + i * 0.07, duration: reduced ? 0 : 0.3 }}
            >
              {line}
            </motion.p>
          ))}
          <p className="mt-1 text-accent-secondary/90">
            output ok
            {!reduced && <span className="animate-terminal-cursor ml-0.5 inline-block h-3 w-1.5 bg-accent-cta align-middle" />}
            {reduced && <span className="ml-0.5 inline-block h-3 w-1.5 bg-accent-cta align-middle" />}
          </p>
        </div>
      </motion.div>
      <motion.div
        className="flex min-h-0 flex-col items-center justify-center gap-3 rounded-lg border border-taupe-line bg-bone-deep/90 px-2 py-3 shadow-sm"
        initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduced ? 0 : 0.45, ease, delay: reduced ? 0 : 0.12 }}
      >
        <div
          className={cn(
            "h-11 w-11 rounded-full border-[3px] border-taupe-line border-t-accent-cta md:h-12 md:w-12",
            !reduced && "animate-spin",
          )}
        />
        <div className="text-center">
          <p className="text-[0.65rem] font-semibold text-charcoal md:text-[0.72rem]">Compiling…</p>
          <p className="mt-0.5 text-[0.58rem] text-muted md:text-[0.62rem]">Build output · artifacts</p>
        </div>
      </motion.div>
    </div>
  );
}

/** Four-disc stack (CRM → BPO → DB → Warehouse), then gap + AI insertion. */
const integrateBaseFour = [
  { key: "crm" as const, label: "CRM", cy0: 50, cy2: 44, rx: 36, ry: 9 },
  { key: "bpo" as const, label: "BPO", cy0: 80, cy2: 106, rx: 40, ry: 10 },
  { key: "db" as const, label: "DB", cy0: 110, cy2: 136, rx: 44, ry: 11 },
  { key: "wh" as const, label: "Warehouse", cy0: 140, cy2: 166, rx: 52, ry: 12 },
];

const integrateAi = { label: "AI", cy: 76, rx: 40, ry: 10 };

const cxDb = 120;

function VisualIntegrate({ reduced }: { reduced: boolean }) {
  const [phase, setPhase] = useState<0 | 1 | 2>(reduced ? 2 : 0);

  useEffect(() => {
    if (reduced) return;
    const openGap = window.setTimeout(() => setPhase(1), 980);
    const showAi = window.setTimeout(() => setPhase(2), 1520);
    return () => {
      window.clearTimeout(openGap);
      window.clearTimeout(showAi);
    };
  }, [reduced]);

  const showAi = reduced || phase >= 2;
  const shiftOpen = reduced || phase >= 1;

  return (
    <svg
      className="h-full w-full min-h-[150px] flex-1"
      viewBox="0 0 280 200"
      fill="none"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      <line x1={cxDb - 54} y1={38} x2={cxDb - 54} y2={184} stroke="var(--taupe-line)" strokeWidth="1.25" />
      <line x1={cxDb + 54} y1={38} x2={cxDb + 54} y2={184} stroke="var(--taupe-line)" strokeWidth="1.25" />
      {integrateBaseFour.map((tier, i) => {
        const dy = tier.cy2 - tier.cy0;
        return (
          <motion.g
            key={tier.key}
            initial={
              reduced ? { opacity: 1, y: dy } : { opacity: 0, y: -28 - i * 6 }
            }
            animate={{
              opacity: 1,
              y: shiftOpen ? dy : 0,
            }}
            transition={{
              opacity: { duration: reduced ? 0 : 0.35, delay: reduced ? 0 : 0.06 + i * 0.1 },
              y: reduced
                ? { duration: 0 }
                : shiftOpen
                  ? { type: "spring", stiffness: 180, damping: 20 }
                  : { type: "spring", stiffness: 200, damping: 18, delay: 0.06 + i * 0.1 },
            }}
          >
            <ellipse
              cx={cxDb}
              cy={tier.cy0}
              rx={tier.rx}
              ry={tier.ry}
              className="fill-bone-deep stroke-taupe-line"
              strokeWidth="1.5"
            />
            <ellipse
              cx={cxDb}
              cy={tier.cy0 - 3}
              rx={tier.rx * 0.92}
              ry={tier.ry * 0.45}
              className="fill-bone/80"
            />
            <text
              x="200"
              y={tier.cy0 + 4}
              fill="var(--charcoal-soft)"
              style={{ fontSize: 9, fontFamily: "var(--font-outfit), sans-serif", fontWeight: 600 }}
            >
              {tier.label}
            </text>
          </motion.g>
        );
      })}
      <motion.g
        initial={reduced ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
        animate={{
          opacity: showAi ? 1 : 0,
          x: showAi ? 0 : 100,
        }}
        transition={{
          type: "spring",
          stiffness: 220,
          damping: 22,
        }}
      >
        <ellipse
          cx={cxDb}
          cy={integrateAi.cy}
          rx={integrateAi.rx}
          ry={integrateAi.ry}
          className="fill-accent-cta/18 stroke-accent-cta"
          strokeWidth="1.75"
        />
        <ellipse
          cx={cxDb}
          cy={integrateAi.cy - 3}
          rx={integrateAi.rx * 0.92}
          ry={integrateAi.ry * 0.45}
          className="fill-accent-cta/12"
        />
        <text
          x="200"
          y={integrateAi.cy + 4}
          fill="var(--accent-cta)"
          style={{ fontSize: 9, fontFamily: "var(--font-outfit), sans-serif", fontWeight: 600 }}
        >
          {integrateAi.label}
        </text>
      </motion.g>
    </svg>
  );
}

const shipStages = [
  "Design",
  "MVP",
  "V1",
  "Test",
  "Stage",
  "Prod",
  "Monitor",
  "Live",
] as const;

/** Node centers; bottom-row spine uses y≈91 so the stroke avoids label midlines. */
const shipPts: readonly [number, number][] = [
  [28, 40],
  [92, 40],
  [156, 40],
  [220, 40],
  [220, 104],
  [156, 104],
  [92, 104],
  [28, 104],
];

/** Orthogonal snake: top centers, gutter down, spine along bottom-row tops, vertical into each node. */
const shipPathD =
  "M 28 40 L 92 40 L 156 40 L 220 40 L 220 91 L 220 104 L 220 91 L 156 91 L 156 104 L 156 91 L 92 91 L 92 104 L 92 91 L 28 91 L 28 104";

const SHIP_STEP_W = 54;
const SHIP_STEP_H = 26;
const SHIP_RX = 6;

/** Status copy while step `completedCount` is in progress (0–7). */
const shipStatusLabels = [
  "Designing…",
  "Building MVP…",
  "Pushing V1…",
  "Testing…",
  "Staging…",
  "Releasing to prod…",
  "Monitoring…",
  "Going live…",
] as const;

const SHIP_STEP_MS = 780;

/** isDone === (completedCount > i): steps 0..completedCount-1 are finished. */
function shipRectClass(i: number, isDone: boolean, lastIdx: number) {
  if (isDone) {
    if (i === lastIdx) {
      return "fill-accent-cta/25 stroke-accent-cta";
    }
    return "fill-bone stroke-taupe-line";
  }
  // All pending steps share one look (same as former bottom-row pending).
  return "fill-accent-secondary/12 stroke-accent-secondary";
}

function VisualShip({ reduced }: { reduced: boolean }) {
  const last = shipStages.length - 1;
  const [completedCount, setCompletedCount] = useState(() => (reduced ? 8 : 0));

  useEffect(() => {
    if (reduced) {
      setCompletedCount(8);
      return;
    }
    setCompletedCount(0);
    const id = window.setInterval(() => {
      setCompletedCount((c) => {
        const next = c >= 8 ? 8 : c + 1;
        if (next >= 8) window.clearInterval(id);
        return next;
      });
    }, SHIP_STEP_MS);
    return () => window.clearInterval(id);
  }, [reduced]);

  const shipped = reduced || completedCount >= 8;
  const statusLine = shipped ? "SHIPPED" : shipStatusLabels[completedCount] ?? "";

  return (
    <div className="flex h-full min-h-0 w-full flex-col items-center justify-center gap-2">
      <svg
        className="w-full min-h-[118px] flex-1"
        viewBox="0 0 256 128"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden
      >
        <motion.path
          d={shipPathD}
          stroke="var(--taupe-line)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          initial={{ pathLength: reduced ? 1 : 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: reduced ? 0 : 1.1, ease }}
        />
        {shipStages.map((label, i) => {
          const [x, y] = shipPts[i]!;
          const w = SHIP_STEP_W;
          const h = SHIP_STEP_H;
          const isDone = completedCount > i;
          const cls = shipRectClass(i, isDone, last);
          return (
            <motion.g key={label}>
              <motion.rect
                x={x - w / 2}
                y={y - h / 2}
                width={w}
                height={h}
                rx={SHIP_RX}
                className={cls}
                strokeWidth="1.5"
                initial={{ scale: reduced ? 1 : 0, opacity: reduced ? 1 : 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 22,
                  delay: reduced ? 0 : 0.12 + i * 0.09,
                }}
              />
              <text
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="var(--charcoal-soft)"
                style={{ fontSize: 7, fontFamily: "var(--font-outfit), sans-serif", fontWeight: 700 }}
              >
                {label}
              </text>
            </motion.g>
          );
        })}
      </svg>
      <div className="flex min-h-[1.75rem] w-full max-w-[14rem] shrink-0 items-center justify-center gap-2 px-1 pt-0.5">
        {shipped ? (
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-cta text-xs text-bone md:h-7 md:w-7 md:text-sm">
            ✓
          </span>
        ) : (
          <div
            className={cn(
              "h-6 w-6 shrink-0 rounded-full border-[3px] border-taupe-line border-t-accent-cta md:h-7 md:w-7",
              !reduced && "animate-spin",
            )}
            aria-hidden
          />
        )}
        <p
          className={cn(
            "min-w-[10rem] flex-1 text-center text-[0.72rem] font-semibold leading-tight text-charcoal md:min-w-[12rem] md:text-[0.82rem]",
            shipped && "uppercase tracking-[0.14em]",
          )}
        >
          {statusLine}
        </p>
      </div>
    </div>
  );
}

function connectLayout() {
  const cx = 220;
  const cy = 110;
  const rx = 118;
  const ry = 78;
  const n = 8;
  const nodes = Array.from({ length: n }, (_, i) => {
    const ang = (-Math.PI / 2 + (i * 2 * Math.PI) / n) as number;
    return {
      x: cx + rx * Math.cos(ang),
      y: cy + ry * Math.sin(ang),
      label: ["Web", "API", "Mobile", "Email", "Slack", "ERP", "Data", "Auth"][i]!,
      i,
    };
  });
  return { cx, cy, nodes };
}

/** Shorten segment so strokes stop at disc edges (lines read behind nodes). */
function trimSegment(
  x1: number,
  y1: number,
  r1: number,
  x2: number,
  y2: number,
  r2: number,
) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy) || 1;
  const ux = dx / len;
  const uy = dy / len;
  return {
    x1: x1 + ux * r1,
    y1: y1 + uy * r1,
    x2: x2 - ux * r2,
    y2: y2 - uy * r2,
  };
}

function VisualConnect({ reduced }: { reduced: boolean }) {
  const { cx, cy, nodes } = connectLayout();
  const hubR = 18;
  const satR = 19;
  const edges: [number, number][] = [];
  for (let i = 0; i < 8; i++) {
    edges.push([-1, i]);
    edges.push([i, (i + 1) % 8]);
  }
  edges.push([0, 3], [2, 5], [1, 6], [4, 7]);

  const pt = (idx: number) =>
    idx === -1 ? { x: cx, y: cy } : { x: nodes[idx]!.x, y: nodes[idx]!.y };

  return (
    <svg
      className="h-full w-full min-h-[150px] flex-1"
      viewBox="0 0 440 224"
      fill="none"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      {edges.map(([a, b], i) => {
        const A = pt(a);
        const B = pt(b);
        const isHub = a === -1 || b === -1;
        const isChord = a >= 0 && b >= 0 && Math.abs(a - b) > 1 && Math.abs(a - b) !== 7;
        let d: string;
        if (a === -1) {
          const t = trimSegment(cx, cy, hubR, B.x, B.y, satR);
          d = `M ${t.x1} ${t.y1} L ${t.x2} ${t.y2}`;
        } else if (b === -1) {
          const t = trimSegment(A.x, A.y, satR, cx, cy, hubR);
          d = `M ${t.x1} ${t.y1} L ${t.x2} ${t.y2}`;
        } else {
          const t = trimSegment(A.x, A.y, satR, B.x, B.y, satR);
          d = `M ${t.x1} ${t.y1} L ${t.x2} ${t.y2}`;
        }
        return (
          <motion.path
            key={`c-${i}-${a}-${b}`}
            d={d}
            stroke={isHub ? "var(--accent-secondary)" : isChord ? "var(--accent-cta)" : "var(--taupe-line)"}
            strokeWidth={isHub ? 1.6 : isChord ? 1.1 : 1.35}
            strokeOpacity={isChord ? 0.42 : 0.92}
            strokeLinecap="round"
            initial={{ pathLength: reduced ? 1 : 0, opacity: reduced ? 1 : 0.2 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              duration: reduced ? 0 : 0.35,
              ease,
              delay: reduced ? 0 : 0.03 + (i % 12) * 0.025,
            }}
          />
        );
      })}
      <motion.circle
        cx={cx}
        cy={cy}
        r={hubR}
        className="fill-accent-secondary/22 stroke-accent-secondary"
        strokeWidth="2"
        initial={{ scale: reduced ? 1 : 0.6, opacity: reduced ? 1 : 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 18, delay: reduced ? 0 : 0.05 }}
      />
      <text
        x={cx}
        y={cy + hubR + 11}
        textAnchor="middle"
        fill="var(--charcoal)"
        style={{ fontSize: 7, fontFamily: "var(--font-outfit), sans-serif", fontWeight: 700 }}
      >
        Mesh
      </text>
      {nodes.map((n, i) => (
        <motion.g key={n.label}>
          <motion.circle
            cx={n.x}
            cy={n.y}
            r={satR}
            className="fill-bone stroke-taupe-line"
            strokeWidth="1.75"
            initial={{ scale: reduced ? 1 : 0, opacity: reduced ? 1 : 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 320,
              damping: 18,
              delay: reduced ? 0 : 0.28 + i * 0.04,
            }}
          />
          <text
            x={n.x}
            y={n.y + satR + 13}
            textAnchor="middle"
            fill="var(--charcoal-soft)"
            style={{ fontSize: 8.5, fontFamily: "var(--font-outfit), sans-serif", fontWeight: 600 }}
          >
            {n.label}
          </text>
        </motion.g>
      ))}
    </svg>
  );
}

const optimizeBars = [
  { h0: 16, h1: 68, label: "Perf" },
  { h0: 22, h1: 74, label: "Errors" },
  { h0: 12, h1: 58, label: "Cost" },
  { h0: 26, h1: 80, label: "Stable" },
  { h0: 18, h1: 64, label: "UX" },
] as const;

function VisualOptimize({ reduced }: { reduced: boolean }) {
  const maxH = 118;
  return (
    <div className="flex h-full min-h-0 w-full flex-col">
      <div className="shrink-0 px-1 text-center">
        <p className="text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-muted md:text-[0.65rem]">
          Latency · stability · cost
        </p>
      </div>
      <div className="relative mt-2 flex min-h-0 flex-1 flex-col px-1 pb-0.5">
        <div className="flex min-h-[120px] flex-1 flex-col overflow-hidden rounded-md border border-taupe-line/70">
          <div className="relative flex min-h-0 flex-1 flex-col">
            <div
              className="pointer-events-none absolute inset-0 rounded-md bg-[repeating-linear-gradient(0deg,transparent,transparent_7px,rgba(45,43,40,0.06)_7px,rgba(45,43,40,0.06)_8px)]"
              aria-hidden
            />
            <div className="relative z-[1] flex min-h-0 flex-1 flex-col px-0.5 pt-2">
              <div className="flex h-full min-h-0 flex-1 items-end justify-center gap-2 pb-0.5 md:gap-3">
                {optimizeBars.map((b, i) => (
                  <div
                    key={b.label}
                    className="flex h-full min-h-0 min-w-0 flex-1 flex-col items-stretch justify-end"
                  >
                    <div className="flex h-full min-h-0 flex-1 flex-col justify-end overflow-hidden">
                      <motion.div
                        className="w-full max-w-[28px] self-center rounded-md bg-accent-cta/88"
                        initial={{
                          height: reduced ? `${(b.h1 / maxH) * 100}%` : `${(b.h0 / maxH) * 100}%`,
                        }}
                        animate={{ height: `${(b.h1 / maxH) * 100}%` }}
                        style={{ maxHeight: "100%" }}
                        transition={
                          reduced
                            ? { duration: 0 }
                            : {
                                type: "spring",
                                stiffness: 100,
                                damping: 14,
                                delay: 0.1 + i * 0.05,
                              }
                        }
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="relative z-[1] flex shrink-0 justify-center gap-2 border-t border-taupe-line/40 bg-bone/30 px-0.5 py-1.5 md:gap-3">
            {optimizeBars.map((b) => (
              <span
                key={`lbl-${b.label}`}
                className="min-w-0 flex-1 text-center text-[0.55rem] font-medium uppercase tracking-wider text-muted md:text-[0.6rem]"
              >
                {b.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function AutoStepIcon({ x, y, d }: { x: number; y: number; d: string }) {
  return (
    <g transform={`translate(${x},${y}) scale(0.4)`}>
      <path
        d={d}
        fill="none"
        stroke="var(--charcoal-soft)"
        strokeWidth="1.85"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  );
}

const AUTO_ICON = {
  bolt: "M13 2 4 14.5h6L9 22l11-12h-6l2-8z",
  ingest: "M12 3v12m0 0-4-4m4 4 4-4",
  classify: "M4 7h16M4 12h10M4 17h14",
  route: "M7 20V9m0 0 4-4 4 4",
  play: "M10 8.5 15.5 12 10 15.5V8.5z",
  audit: "M9 4h6v14H9zM10 8h4v5",
  model: "M8 8h8v8H8zM10 11h4v2",
  tools: "M14.7 6.3a4 4 0 0 1 0 5.7l-3 3-6-6 3-3a4 4 0 0 1 5.7 0zM16 11l2 2",
} as const;

const AUTO_ICON_PAD = 9;

/** Compact trigger source (no icon); label centered in chip. */
function AutoTriggerChip({
  x,
  y,
  label,
  reduced,
  delay,
}: {
  x: number;
  y: number;
  label: string;
  reduced: boolean;
  delay: number;
}) {
  const w = 48;
  const h = 22;
  const r = 5;
  const cx = x + w / 2;
  const cy = y + h / 2;
  return (
    <motion.g
      initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduced ? 0 : 0.35, ease, delay }}
    >
      <rect x={x} y={y} width={w} height={h} rx={r} fill="var(--bone)" stroke="var(--taupe-line)" strokeWidth="1.25" />
      <text
        x={cx}
        y={cy}
        textAnchor="middle"
        dominantBaseline="middle"
        fill="var(--charcoal)"
        style={{ fontSize: 7.5, fontFamily: "var(--font-outfit), sans-serif", fontWeight: 600 }}
      >
        {label}
      </text>
    </motion.g>
  );
}

function VisualAutomate({ reduced }: { reduced: boolean }) {
  const autoBox = (opts: {
    x: number;
    y: number;
    w: number;
    h: number;
    r: number;
    title: string;
    sub?: string;
    fill: string;
    stroke: string;
    sw?: number;
    icon?: string;
  }) => {
    const mid = opts.y + opts.h / 2;
    const tcx = opts.x + opts.w / 2;
    return (
      <g>
        <rect
          x={opts.x}
          y={opts.y}
          width={opts.w}
          height={opts.h}
          rx={opts.r}
          fill={opts.fill}
          stroke={opts.stroke}
          strokeWidth={opts.sw ?? 1.25}
        />
        {opts.icon ? (
          <AutoStepIcon x={opts.x + AUTO_ICON_PAD} y={opts.y + AUTO_ICON_PAD} d={opts.icon} />
        ) : null}
        {opts.sub ? (
          <>
            <text
              x={tcx}
              y={opts.y + 32}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="var(--charcoal)"
              style={{
                fontSize: 9.5,
                fontFamily: "var(--font-outfit), sans-serif",
                fontWeight: 700,
              }}
            >
              {opts.title}
            </text>
            <text
              x={tcx}
              y={opts.y + 48}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="var(--muted)"
              style={{ fontSize: 7.5, fontFamily: "var(--font-outfit), sans-serif" }}
            >
              {opts.sub}
            </text>
          </>
        ) : (
          <text
            x={tcx}
            y={mid}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="var(--charcoal)"
            style={{ fontSize: 9, fontFamily: "var(--font-outfit), sans-serif", fontWeight: 700 }}
          >
            {opts.title}
          </text>
        )}
      </g>
    );
  };

  return (
    <svg
      className="h-full w-full min-h-[150px] flex-1"
      viewBox="0 0 400 210"
      fill="none"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      <AutoTriggerChip x={6} y={68} label="Form" reduced={reduced} delay={0} />
      <AutoTriggerChip x={6} y={94} label="AI Bot" reduced={reduced} delay={0.05} />
      <AutoTriggerChip x={6} y={120} label="LinkedIn" reduced={reduced} delay={0.1} />
      <motion.g
        initial={{ opacity: reduced ? 1 : 0, scale: reduced ? 1 : 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: reduced ? 0 : 0.12, type: "spring", stiffness: 260, damping: 22 }}
      >
        {autoBox({
          x: 88,
          y: 80,
          w: 54,
          h: 52,
          r: 8,
          title: "Ingest",
          fill: "var(--bone-deep)",
          stroke: "var(--taupe-line)",
          icon: AUTO_ICON.ingest,
        })}
      </motion.g>
      <motion.g
        initial={{ opacity: reduced ? 1 : 0, scale: reduced ? 1 : 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: reduced ? 0 : 0.18, type: "spring", stiffness: 260, damping: 22 }}
      >
        {autoBox({
          x: 150,
          y: 80,
          w: 54,
          h: 52,
          r: 8,
          title: "Classify",
          fill: "rgba(47, 111, 107, 0.1)",
          stroke: "var(--accent-secondary)",
          icon: AUTO_ICON.classify,
        })}
      </motion.g>
      <motion.g
        initial={{ opacity: reduced ? 1 : 0, scale: reduced ? 1 : 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: reduced ? 0 : 0.24, type: "spring", stiffness: 240, damping: 20 }}
      >
        <rect
          x="208"
          y="64"
          width="84"
          height="84"
          rx="12"
          fill="var(--bone)"
          stroke="var(--accent-secondary)"
          strokeWidth="2"
        />
        <AutoStepIcon x={208 + AUTO_ICON_PAD} y={64 + AUTO_ICON_PAD} d={AUTO_ICON.route} />
        <text
          x="250"
          y="102"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="var(--charcoal)"
          style={{ fontSize: 10, fontFamily: "var(--font-outfit), sans-serif", fontWeight: 700 }}
        >
          Route
        </text>
        <text
          x="250"
          y="122"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="var(--muted)"
          style={{ fontSize: 7.5, fontFamily: "var(--font-outfit), sans-serif" }}
        >
          Rules · queues
        </text>
      </motion.g>
      <motion.g
        initial={{ opacity: reduced ? 1 : 0, scale: reduced ? 1 : 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: reduced ? 0 : 0.3, type: "spring", stiffness: 260, damping: 22 }}
      >
        {autoBox({
          x: 302,
          y: 80,
          w: 52,
          h: 52,
          r: 8,
          title: "Act",
          fill: "rgba(196, 92, 62, 0.12)",
          stroke: "var(--accent-cta)",
          icon: AUTO_ICON.play,
        })}
      </motion.g>
      <motion.g
        initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: reduced ? 0 : 0.38, duration: reduced ? 0 : 0.35, ease }}
      >
        <rect
          x="166"
          y="152"
          width="68"
          height="46"
          rx="8"
          fill="var(--bone-deep)"
          stroke="var(--taupe-line)"
          strokeDasharray="4 3"
        />
        <AutoStepIcon x={166 + AUTO_ICON_PAD} y={152 + AUTO_ICON_PAD} d={AUTO_ICON.audit} />
        <text
          x="200"
          y="174"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="var(--charcoal-soft)"
          style={{ fontSize: 9, fontFamily: "var(--font-outfit), sans-serif", fontWeight: 600 }}
        >
          Audit
        </text>
        <text
          x="200"
          y="190"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="var(--muted)"
          style={{ fontSize: 7.5, fontFamily: "var(--font-outfit), sans-serif" }}
        >
          Log · replay
        </text>
      </motion.g>

      <motion.path
        d="M 54 79 H 68 V 106"
        stroke="var(--accent-secondary)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={{ pathLength: reduced ? 1 : 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: reduced ? 0 : 0.22, delay: reduced ? 0 : 0.08 }}
      />
      <motion.path
        d="M 54 105 H 68 V 106"
        stroke="var(--accent-secondary)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={{ pathLength: reduced ? 1 : 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: reduced ? 0 : 0.22, delay: reduced ? 0 : 0.12 }}
      />
      <motion.path
        d="M 54 131 H 68 V 106"
        stroke="var(--accent-secondary)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={{ pathLength: reduced ? 1 : 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: reduced ? 0 : 0.22, delay: reduced ? 0 : 0.16 }}
      />
      <motion.path
        d="M 68 106 H 88"
        stroke="var(--accent-secondary)"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: reduced ? 1 : 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: reduced ? 0 : 0.2, delay: reduced ? 0 : 0.2 }}
      />
      <motion.path
        d="M 142 106 H 150"
        stroke="var(--accent-secondary)"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: reduced ? 1 : 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: reduced ? 0 : 0.25, delay: reduced ? 0 : 0.18 }}
      />
      <motion.path
        d="M 204 106 H 208"
        stroke="var(--accent-secondary)"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: reduced ? 1 : 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: reduced ? 0 : 0.25, delay: reduced ? 0 : 0.26 }}
      />
      <motion.path
        d="M 292 106 H 302"
        stroke="var(--accent-secondary)"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: reduced ? 1 : 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: reduced ? 0 : 0.25, delay: reduced ? 0 : 0.34 }}
      />
      <motion.path
        d="M 250 148 L 250 154 L 200 176"
        stroke="var(--taupe-line)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={{ pathLength: reduced ? 1 : 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: reduced ? 0 : 0.35, delay: reduced ? 0 : 0.42 }}
      />
      <motion.path
        d="M 250 64 C 250 32 292 24 322 28"
        stroke="var(--accent-cta)"
        strokeWidth="1.5"
        strokeDasharray="4 3"
        fill="none"
        initial={{ pathLength: reduced ? 1 : 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: reduced ? 0 : 0.4, delay: reduced ? 0 : 0.38 }}
      />
      <motion.path
        d="M 250 148 C 250 178 300 186 328 162"
        stroke="var(--charcoal-soft)"
        strokeWidth="1.35"
        strokeDasharray="3 3"
        strokeOpacity="0.5"
        fill="none"
        initial={{ pathLength: reduced ? 1 : 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: reduced ? 0 : 0.4, delay: reduced ? 0 : 0.45 }}
      />
      <rect
        x="302"
        y="6"
        width="88"
        height="48"
        rx="8"
        fill="var(--bone)"
        stroke="var(--accent-cta)"
        strokeOpacity="0.45"
      />
      <AutoStepIcon x={302 + AUTO_ICON_PAD} y={6 + AUTO_ICON_PAD} d={AUTO_ICON.model} />
      <text
        x="350"
        y="26"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="var(--charcoal)"
        style={{ fontSize: 9.5, fontFamily: "var(--font-outfit), sans-serif", fontWeight: 700 }}
      >
        Model
      </text>
      <text
        x="350"
        y="42"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="var(--muted)"
        style={{ fontSize: 7.5, fontFamily: "var(--font-outfit), sans-serif" }}
      >
        Inference · prompts
      </text>
      <rect
        x="302"
        y="154"
        width="88"
        height="48"
        rx="8"
        fill="var(--bone-deep)"
        stroke="var(--taupe-line)"
      />
      <AutoStepIcon x={302 + AUTO_ICON_PAD} y={154 + AUTO_ICON_PAD} d={AUTO_ICON.tools} />
      <text
        x="350"
        y="174"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="var(--charcoal-soft)"
        style={{ fontSize: 9.5, fontFamily: "var(--font-outfit), sans-serif", fontWeight: 700 }}
      >
        Tools
      </text>
      <text
        x="350"
        y="190"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="var(--muted)"
        style={{ fontSize: 7.5, fontFamily: "var(--font-outfit), sans-serif" }}
      >
        APIs · scripts · CRM
      </text>

    </svg>
  );
}
