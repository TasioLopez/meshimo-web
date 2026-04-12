import Link from "next/link";
import { cn } from "@/lib/utils";

const LOGO_SRC = "/meshimo-logo.svg";

const sizeHeights = {
  sm: "h-7",
  md: "h-9",
  lg: "h-11",
  xl: "h-14",
} as const;

export type LogoSize = keyof typeof sizeHeights;

type MarkProps = {
  className?: string;
  size?: LogoSize;
  /** When true, hide visible "Meshimo" text from screen readers (parent provides context). */
  decorative?: boolean;
};

/**
 * Meshimo wordmark image. Source: `/public/meshimo-logo.svg`.
 */
export function MeshimoLogoMark({ className, size = "md", decorative }: MarkProps) {
  return (
    <img
      src={LOGO_SRC}
      alt={decorative ? "" : "Meshimo"}
      width={1500}
      height={1500}
      decoding="async"
      className={cn("w-auto max-w-[none] object-contain object-left", sizeHeights[size], className)}
      {...(decorative ? ({ "aria-hidden": true } as const) : {})}
    />
  );
}

type LinkProps = {
  className?: string;
  size?: LogoSize;
  /** Show Bebas wordmark beside the mark (header-style). */
  showWordmark?: boolean;
  wordmarkClassName?: string;
};

/** Home link with logo; wordmark optional for layout balance. */
export function MeshimoLogoLink({
  className,
  size = "md",
  showWordmark = false,
  wordmarkClassName,
}: LinkProps) {
  return (
    <Link
      href="/"
      className={cn("flex items-center gap-2.5 shrink-0 outline-offset-4", className)}
    >
      <MeshimoLogoMark size={size} decorative={showWordmark} />
      {showWordmark ? (
        <span
          className={cn(
            "font-display text-lg tracking-wide text-charcoal sm:text-xl md:text-2xl",
            wordmarkClassName,
          )}
        >
          Meshimo
        </span>
      ) : null}
    </Link>
  );
}
