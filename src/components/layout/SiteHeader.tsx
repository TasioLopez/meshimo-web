"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { MeshimoLogoLink } from "@/components/branding/MeshimoLogo";
import { cn } from "@/lib/utils";
import { Container } from "./Container";
import { ArrowUpRightIcon } from "@/components/ui/ArrowUpRightIcon";

const nav = [
  { href: "#capabilities", label: "Capabilities" },
  { href: "#process", label: "Process" },
  { href: "#work", label: "Work" },
  { href: "#contact", label: "Contact" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-colors duration-300",
        scrolled ? "border-b border-taupe-line bg-bone/92 backdrop-blur-md" : "border-b border-transparent",
      )}
    >
      <Container className="flex h-14 items-center justify-between gap-3 py-3 md:h-16 md:gap-6">
        <MeshimoLogoLink size="md" showWordmark />

        <div className="flex min-w-0 flex-1 items-center justify-end gap-2 sm:gap-3 md:flex-none md:gap-4">
          <nav
            className={cn(
              "flex max-w-[min(100%,52vw)] items-center overflow-x-auto rounded-full border border-taupe-line bg-bone/90 px-1 py-1 shadow-sm backdrop-blur-sm sm:max-w-none md:px-2",
            )}
            aria-label="Primary"
          >
            {nav.map((item, i) => (
              <div key={item.href} className="flex items-center">
                {i > 0 ? (
                  <span className="hidden h-4 w-px shrink-0 bg-taupe-line sm:block" aria-hidden />
                ) : null}
                <Link
                  href={item.href}
                  className="shrink-0 whitespace-nowrap rounded-full px-3 py-2 text-[0.7rem] font-medium text-charcoal-soft transition hover:bg-bone-deep hover:text-charcoal sm:px-4 sm:text-xs"
                >
                  {item.label}
                </Link>
              </div>
            ))}
          </nav>

          <Link
            href="#contact"
            className="inline-flex min-h-[44px] shrink-0 items-center gap-2 rounded-full bg-accent-cta px-4 py-2 text-xs font-semibold text-bone shadow-sm transition hover:bg-accent-cta-hover md:px-5 md:text-sm"
          >
            Contact
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-bone/20">
              <ArrowUpRightIcon className="text-bone" />
            </span>
          </Link>
        </div>
      </Container>
    </header>
  );
}
