"use client";

import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

/**
 * Laptop silhouette: title bar + clipped screen viewport + deck.
 * Children render inside the screen area only.
 */
export function HeroLaptopFrame({ children, className }: Props) {
  return (
    <div
      className={
        className ??
        "relative flex w-full max-w-[440px] shrink-0 flex-col items-center md:max-w-[480px] lg:max-w-[560px]"
      }
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-t-[0.65rem] border border-taupe-line bg-charcoal/5 shadow-[0_28px_70px_-22px_rgba(28,27,25,0.42)] ring-1 ring-charcoal/12">
        <div className="absolute inset-x-0 top-0 z-[2] flex h-7 items-center gap-1.5 border-b border-taupe-line bg-bone-deep/95 px-3 backdrop-blur-sm">
          <span className="h-2 w-2 rounded-full bg-stone-muted/80" />
          <span className="h-2 w-2 rounded-full bg-stone-muted/55" />
          <span className="h-2 w-2 rounded-full bg-stone-muted/45" />
          <span className="ml-2 h-1 flex-1 max-w-[40%] rounded-full bg-taupe-line" />
        </div>
        <div className="absolute inset-x-0 bottom-0 top-7 z-[1] overflow-hidden bg-bone">{children}</div>
      </div>
      <div
        className="-mt-px h-[10px] w-[104%] max-w-[500px] rounded-b-md border border-taupe-line bg-gradient-to-b from-bone-deep via-stone/90 to-stone shadow-inner lg:max-w-[580px]"
        aria-hidden
      />
      <div
        className="-mt-px h-2 w-[112%] max-w-[520px] rounded-b-sm border border-taupe-line/80 bg-bone-deep/90 lg:max-w-[600px]"
        aria-hidden
      />
    </div>
  );
}
