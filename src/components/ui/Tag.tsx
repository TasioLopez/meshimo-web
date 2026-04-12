import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
  variant?: "neutral" | "secondary" | "cta";
};

const variantClass: Record<NonNullable<Props["variant"]>, string> = {
  neutral:
    "border-taupe-line bg-bone-deep/60 text-charcoal-soft",
  secondary:
    "border-accent-secondary/35 bg-accent-secondary/12 text-accent-secondary",
  cta: "border-accent-cta/35 bg-accent-cta/12 text-charcoal",
};

export function Tag({ children, className, variant = "neutral" }: Props) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-[0.65rem] font-medium uppercase tracking-wide",
        variantClass[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
