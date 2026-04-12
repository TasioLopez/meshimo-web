import { cn } from "@/lib/utils";
import { Container } from "./Container";

export type SectionTone = "bone" | "boneDeep" | "ink" | "inkLift";

type Props = {
  id?: string;
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  dividerTop?: boolean;
  dividerBottom?: boolean;
  /** Visual surface. `inkLift` = dark band with rounded top overlapping previous section. */
  tone?: SectionTone;
};

const toneClass: Record<SectionTone, string> = {
  bone: "bg-bone text-charcoal",
  boneDeep: "bg-bone-deep text-charcoal",
  ink: "bg-surface-ink text-bone",
  inkLift: "section-ink-lift bg-surface-ink text-bone",
};

export function Section({
  id,
  children,
  className,
  containerClassName,
  dividerTop,
  dividerBottom,
  tone = "bone",
}: Props) {
  return (
    <section
      id={id}
      className={cn(
        "relative scroll-mt-24 py-20 md:py-28",
        toneClass[tone],
        dividerTop && tone === "bone" && "border-t border-taupe-line",
        dividerTop && tone === "boneDeep" && "border-t border-taupe-line",
        dividerBottom && "border-b border-taupe-line",
        className,
      )}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
