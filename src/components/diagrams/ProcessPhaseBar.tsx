/** Simplified phase timeline (illustrative, not project-specific). */
export function ProcessPhaseBar() {
  const segments = [
    { key: "d", label: "Discover", pct: 14, className: "bg-accent-cta" },
    { key: "s", label: "Scope", pct: 16, className: "bg-accent-secondary" },
    { key: "u", label: "UX", pct: 16, className: "bg-accent-secondary/80" },
    { key: "b", label: "Build", pct: 28, className: "bg-charcoal/70" },
    { key: "a", label: "AI", pct: 12, className: "bg-accent-cta/85" },
    { key: "l", label: "Launch", pct: 14, className: "bg-accent-secondary/60" },
  ];

  return (
    <div className="mt-10 rounded-2xl border border-taupe-line bg-bone p-4 md:p-5">
      <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-muted">
        Illustrative phase emphasis
      </p>
      <p className="mt-2 text-xs leading-relaxed text-muted">
        Actual timelines vary by scope, integrations, and compliance. This bar shows typical
        relative weighting, not calendar weeks.
      </p>
      <div className="mt-4 flex h-4 overflow-hidden rounded-full bg-bone-deep">
        {segments.map((s) => (
          <div
            key={s.key}
            className={`${s.className} first:rounded-l-full last:rounded-r-full`}
            style={{ width: `${s.pct}%` }}
            title={s.label}
          />
        ))}
      </div>
      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[0.65rem] text-muted">
        {segments.map((s) => (
          <span key={s.key} className="inline-flex items-center gap-1.5">
            <span className={`h-2 w-2 rounded-sm ${s.className}`} aria-hidden />
            {s.label}
          </span>
        ))}
      </div>
    </div>
  );
}
