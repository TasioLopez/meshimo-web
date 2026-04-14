import type { ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import { normalizeLegalDocumentMarkdown } from "@/lib/legalMarkdownNormalize";

const components = {
  h1: ({ children }: { children?: ReactNode }) => (
    <h1 className="font-display text-3xl tracking-wide text-charcoal">{children}</h1>
  ),
  h2: ({ children }: { children?: ReactNode }) => (
    <h2 className="font-display mt-10 text-xl tracking-wide text-charcoal first:mt-0">
      {children}
    </h2>
  ),
  h3: ({ children }: { children?: ReactNode }) => (
    <h3 className="mt-5 scroll-mt-24 border-b border-taupe-line/60 pb-2 font-sans text-base font-semibold leading-snug text-charcoal first:mt-0">
      {children}
    </h3>
  ),
  p: ({ children }: { children?: ReactNode }) => (
    <p className="text-pretty font-normal">{children}</p>
  ),
  ul: ({ children }: { children?: ReactNode }) => (
    <ul className="list-disc space-y-2 pl-6">{children}</ul>
  ),
  ol: ({ children }: { children?: ReactNode }) => (
    <ol className="list-decimal space-y-2 pl-6">{children}</ol>
  ),
  li: ({ children }: { children?: ReactNode }) => (
    <li className="font-normal">{children}</li>
  ),
  a: ({ href, children }: { href?: string; children?: ReactNode }) => (
    <a href={href} className="text-accent-cta underline-offset-2 hover:underline">
      {children}
    </a>
  ),
  hr: () => <hr className="my-8 border-taupe-line" />,
  strong: ({ children }: { children?: ReactNode }) => (
    <strong className="font-semibold text-charcoal">{children}</strong>
  ),
  em: ({ children }: { children?: ReactNode }) => (
    <em className="text-charcoal/85">{children}</em>
  ),
  code: ({ children }: { children?: ReactNode }) => (
    <code className="rounded bg-charcoal/[0.06] px-1.5 py-0.5 font-mono text-[0.9em] text-charcoal">
      {children}
    </code>
  ),
} as const;

type LegalMarkdownProps = {
  markdown: string;
  /** Merge soft-wrapped lines and promote `1.1`-style clauses to headings (general terms). */
  normalize?: boolean;
};

export function LegalMarkdown({ markdown, normalize = true }: LegalMarkdownProps) {
  const source = normalize ? normalizeLegalDocumentMarkdown(markdown) : markdown;
  return (
    <ReactMarkdown components={components}>{source}</ReactMarkdown>
  );
}
