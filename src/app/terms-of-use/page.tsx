import type { Metadata } from "next";
import fs from "node:fs/promises";
import path from "node:path";
import { LegalMarkdown } from "@/components/legal/LegalMarkdown";
import { Container } from "@/components/layout/Container";
import { siteMeta } from "@/content/site";

export const metadata: Metadata = {
  title: `Website terms of use | ${siteMeta.title}`,
  description:
    "Terms governing use of meshimo.com operated by SOTAB B.V. (Meshimo): permitted use, IP, disclaimers, and governing law.",
};

async function loadWebsiteTermsMarkdown(): Promise<string> {
  const filePath = path.join(
    process.cwd(),
    "src",
    "content",
    "legal",
    "website-terms-of-use.en.md",
  );
  return fs.readFile(filePath, "utf8");
}

export default async function WebsiteTermsOfUsePage() {
  const markdown = await loadWebsiteTermsMarkdown();

  return (
    <div className="border-b border-taupe-line bg-bone py-16 md:py-24">
      <Container className="max-w-3xl">
        <article
          lang="en"
          className="legal-markdown text-base leading-relaxed text-charcoal-soft"
        >
          <LegalMarkdown markdown={markdown} />
        </article>
      </Container>
    </div>
  );
}
