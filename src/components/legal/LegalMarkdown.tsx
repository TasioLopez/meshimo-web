import type { ReactNode } from "react";
import ReactMarkdown from "react-markdown";

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
    <h3 className="mt-6 font-semibold text-charcoal">{children}</h3>
  ),
  p: ({ children }: { children?: ReactNode }) => <p>{children}</p>,
  ul: ({ children }: { children?: ReactNode }) => (
    <ul className="list-disc space-y-2 pl-6">{children}</ul>
  ),
  ol: ({ children }: { children?: ReactNode }) => (
    <ol className="list-decimal space-y-2 pl-6">{children}</ol>
  ),
  li: ({ children }: { children?: ReactNode }) => <li>{children}</li>,
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

export function LegalMarkdown({ markdown }: { markdown: string }) {
  return (
    <ReactMarkdown components={components}>{markdown}</ReactMarkdown>
  );
}
