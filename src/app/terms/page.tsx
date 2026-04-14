import type { Metadata } from "next";
import fs from "node:fs/promises";
import path from "node:path";
import Link from "next/link";
import { LegalMarkdown } from "@/components/legal/LegalMarkdown";
import { Container } from "@/components/layout/Container";
import { generalTermsMeta } from "@/content/legal/general-terms.meta";
import { siteMeta } from "@/content/site";

export const metadata: Metadata = {
  title: `General terms and conditions | ${siteMeta.title}`,
  description:
    "General Terms and Conditions for Services of SOTAB B.V. trading as Meshimo (business clients). Download the official PDF.",
};

function formatDisplayDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

async function loadGeneralTermsMarkdown(): Promise<string> {
  const filePath = path.join(
    process.cwd(),
    "src",
    "content",
    "legal",
    "general-terms.en.md",
  );
  return fs.readFile(filePath, "utf8");
}

export default async function TermsPage() {
  const markdown = await loadGeneralTermsMarkdown();
  const effectiveLabel = formatDisplayDate(generalTermsMeta.effectiveDate);

  return (
    <div className="border-b border-taupe-line bg-bone py-16 md:py-24">
      <Container className="max-w-3xl">
        <div className="mb-10 space-y-4 rounded-lg border border-taupe-line bg-white/60 p-6 text-sm text-charcoal-soft shadow-sm">
          <p className="font-semibold text-charcoal">Document information</p>
          <dl className="grid gap-2 sm:grid-cols-2">
            <div>
              <dt className="text-charcoal/70">Version</dt>
              <dd className="font-medium text-charcoal">{generalTermsMeta.version}</dd>
            </div>
            <div>
              <dt className="text-charcoal/70">Effective date</dt>
              <dd className="font-medium text-charcoal">{effectiveLabel}</dd>
            </div>
          </dl>
          <p className="text-charcoal/80">
            These terms apply to business clients only (not consumers), as stated in the
            document. You can read the full text on this page or download the official PDF for
            your records.
          </p>
          <a
            href={generalTermsMeta.pdfPath}
            download
            className="inline-flex w-fit items-center rounded-md border border-charcoal/20 bg-charcoal px-4 py-2.5 text-sm font-medium text-bone transition hover:bg-charcoal/90"
          >
            Download PDF (version {generalTermsMeta.version}, {effectiveLabel})
          </a>
        </div>

        <article
          lang="en"
          className="legal-markdown text-base leading-relaxed text-charcoal-soft"
        >
          <LegalMarkdown markdown={markdown} />
        </article>

        <p className="mt-12 text-sm text-charcoal/60">
          Questions about these terms? Contact{" "}
          <Link href="mailto:contact@sotab.nl" className="text-accent-cta underline-offset-2 hover:underline">
            contact@sotab.nl
          </Link>
          .
        </p>
      </Container>
    </div>
  );
}
