import type { Metadata } from "next";
import fs from "node:fs/promises";
import path from "node:path";
import ReactMarkdown from "react-markdown";
import { Container } from "@/components/layout/Container";
import { siteMeta } from "@/content/site";

export const metadata: Metadata = {
  title: `Cookie policy | ${siteMeta.title}`,
  description:
    "How Meshimo uses cookies, Google Tag Manager, and Consent Mode on this website.",
};

async function loadCookiePolicyMarkdown(): Promise<string> {
  const filePath = path.join(
    process.cwd(),
    "src",
    "content",
    "legal",
    "cookie-policy.en.md",
  );
  return fs.readFile(filePath, "utf8");
}

export default async function CookiePolicyPage() {
  const markdown = await loadCookiePolicyMarkdown();

  return (
    <div className="border-b border-taupe-line bg-bone py-16 md:py-24">
      <Container className="max-w-3xl">
        <article className="space-y-6 text-base leading-relaxed text-charcoal-soft">
          <ReactMarkdown
            components={{
              h1: ({ children }) => (
                <h1 className="font-display text-3xl tracking-wide text-charcoal">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="font-display mt-10 text-xl tracking-wide text-charcoal first:mt-0">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="mt-6 font-semibold text-charcoal">{children}</h3>
              ),
              p: ({ children }) => <p>{children}</p>,
              ul: ({ children }) => (
                <ul className="list-disc space-y-2 pl-6">{children}</ul>
              ),
              li: ({ children }) => <li>{children}</li>,
              a: ({ href, children }) => (
                <a
                  href={href}
                  className="text-accent-cta underline-offset-2 hover:underline"
                >
                  {children}
                </a>
              ),
              hr: () => <hr className="my-8 border-taupe-line" />,
              strong: ({ children }) => (
                <strong className="font-semibold text-charcoal">{children}</strong>
              ),
            }}
          >
            {markdown}
          </ReactMarkdown>
        </article>
      </Container>
    </div>
  );
}
