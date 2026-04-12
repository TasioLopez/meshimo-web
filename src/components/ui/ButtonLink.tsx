import Link from "next/link";
import { cn } from "@/lib/utils";

type Props = {
  href: string;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "ghost";
};

export function ButtonLink({ href, children, className, variant = "primary" }: Props) {
  const base =
    "inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-cta";

  const styles =
    variant === "ghost"
      ? "border border-taupe-line bg-transparent text-charcoal hover:border-charcoal/25"
      : "bg-accent-cta text-bone shadow-sm hover:bg-accent-cta-hover";

  return (
    <Link href={href} className={cn(base, styles, className)}>
      {children}
    </Link>
  );
}
