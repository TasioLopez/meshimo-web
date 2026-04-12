import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
  /** Light text on dark sections */
  variant?: "default" | "inverse";
};

export function Eyebrow({ children, className, variant = "default" }: Props) {
  return (
    <p
      className={cn(
        "text-[0.7rem] font-semibold uppercase tracking-[0.22em]",
        variant === "inverse" ? "text-bone/55" : "text-muted",
        className,
      )}
    >
      {children}
    </p>
  );
}
