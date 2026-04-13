import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { PDFParse } from "pdf-parse";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.join(__dirname, "..");
const pdfPath =
  process.argv[2] ??
  "C:/Users/Tasio/Downloads/General Terms and Conditions for Services of SOTAB B.V. trading as Meshimo.pdf";
const outPath = path.join(repoRoot, "src", "content", "legal", "general-terms.en.md");

const buf = fs.readFileSync(pdfPath);
const parser = new PDFParse({ data: new Uint8Array(buf) });
const { text: raw } = await parser.getText();
await parser.destroy();

let t = raw
  .replace(/\r\n/g, "\n")
  .replace(/\n--\s*\d+\s+of\s+\d+\s+--\n/g, "\n\n")
  .replace(/\n{3,}/g, "\n\n")
  .trim();

// Promote main articles only (line begins with "Article N. ")
t = t.replace(/^Article\s+(\d+)\.\s+/gm, "\n\n## Article $1. ");

t = t.replace(
  /^General Terms and Conditions for\nServices of SOTAB B\.V\. trading as\nMeshimo\n/,
  "# General Terms and Conditions for Services\n\n**SOTAB B.V. trading as Meshimo**\n\n",
);

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, t.trimStart() + "\n", "utf8");
console.log("Wrote", outPath, "chars:", t.length);
