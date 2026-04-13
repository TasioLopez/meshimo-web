import type { Metadata } from "next";
import fs from "node:fs/promises";
import path from "node:path";
import { LegalMarkdown } from "@/components/legal/LegalMarkdown";
import { Container } from "@/components/layout/Container";
import { siteMeta } from "@/content/site";

export const metadata: Metadata = {
  title: `Privacy policy | ${siteMeta.title}`,
  description:
    "How SOTAB B.V. (Meshimo) collects, uses, and protects personal data when you use the website or contact us.",
};

async function loadPrivacyPolicyMarkdown(): Promise<string> {
  const filePath = path.join(
    process.cwd(),
    "src",
    "content",
    "legal",
    "privacy-policy.en.md",
  );
  return fs.readFile(filePath, "utf8");
}

export default async function PrivacyPolicyPage() {
  const markdown = await loadPrivacyPolicyMarkdown();

  return (
    <div className="border-b border-taupe-line bg-bone py-16 md:py-24">
      <Container className="max-w-3xl">
        <article
          lang="en"
          className="space-y-6 text-base leading-relaxed text-charcoal-soft"
        >
          <LegalMarkdown markdown={markdown} />
        </article>
      </Container>
    </div>
  );
}
