import Link from "next/link";
import { cn } from "@/lib/utils";

type Props = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

export function TextLink({ href, children, className }: Props) {
  return (
    <Link
      href={href}
      className={cn(
        "border-b border-charcoal/25 pb-0.5 text-sm font-medium text-charcoal transition hover:border-charcoal",
        className,
      )}
    >
      {children}
    </Link>
  );
}
