import { readFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import PDFDocument from "pdfkit";
import { generalTermsMeta } from "@/content/legal/general-terms.meta";
import {
  normalizeLegalDocumentMarkdown,
  stripMarkdownForPdf,
} from "@/lib/legalMarkdownNormalize";

export const runtime = "nodejs";

export async function GET() {
  const filePath = path.join(
    process.cwd(),
    "src",
    "content",
    "legal",
    "general-terms.en.md",
  );
  const raw = await readFile(filePath, "utf8");
  const normalized = normalizeLegalDocumentMarkdown(raw);
  const blocks = normalized.split(/\n\n+/).filter((b) => b.trim().length > 0);

  const pdfBuffer = await new Promise<Buffer>((resolve, reject) => {
    const doc = new PDFDocument({
      margin: 50,
      size: "A4",
      bufferPages: true,
      info: {
        Title: "General Terms and Conditions — Meshimo (SOTAB B.V.)",
        Author: "SOTAB B.V.",
      },
    });
    const chunks: Buffer[] = [];
    doc.on("data", (d: Buffer) => chunks.push(d));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);

    const writeParagraph = (plain: string) => {
      doc.font("Helvetica").fontSize(9).text(plain, {
        width: 500,
        align: "justify",
        lineGap: 1,
      });
      doc.moveDown(0.35);
    };

    for (const block of blocks) {
      const t = block.trim();
      if (t.startsWith("# ")) {
        doc.moveDown(0.5);
        doc
          .font("Helvetica-Bold")
          .fontSize(15)
          .text(stripMarkdownForPdf(t.replace(/^# /, "")), { width: 500 });
        doc.moveDown(0.5);
        continue;
      }
      if (t.startsWith("## ")) {
        doc.moveDown(0.45);
        doc
          .font("Helvetica-Bold")
          .fontSize(11.5)
          .text(stripMarkdownForPdf(t.replace(/^## /, "")), { width: 500 });
        doc.moveDown(0.4);
        continue;
      }
      if (t.startsWith("### ")) {
        doc.moveDown(0.35);
        doc
          .font("Helvetica-Bold")
          .fontSize(10)
          .text(stripMarkdownForPdf(t.replace(/^### /, "")), { width: 500 });
        doc.moveDown(0.3);
        continue;
      }
      const listLines = t.split("\n").filter((l) => l.trim().length > 0);
      if (
        listLines.length > 0 &&
        listLines.every((l) => l.trimStart().startsWith("- "))
      ) {
        for (const line of listLines) {
          const plain = stripMarkdownForPdf(line);
          doc.font("Helvetica").fontSize(9).text(plain, { width: 500 });
          doc.moveDown(0.2);
        }
        doc.moveDown(0.15);
        continue;
      }
      writeParagraph(stripMarkdownForPdf(t));
    }

    doc.end();
  });

  const filename = `meshimo-general-terms-v${generalTermsMeta.version}-${generalTermsMeta.effectiveDate}.pdf`;
  return new NextResponse(new Uint8Array(pdfBuffer), {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "public, max-age=3600",
    },
  });
}
