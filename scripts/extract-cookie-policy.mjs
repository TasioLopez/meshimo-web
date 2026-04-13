import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { PDFParse } from "pdf-parse";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.join(__dirname, "..");
const pdfPath =
  process.argv[2] ?? "C:/Users/Tasio/Downloads/Cookie Policy Meshimo.pdf";
const outPath = path.join(repoRoot, "src", "content", "legal", "cookie-policy.en.md");

const buf = fs.readFileSync(pdfPath);
const parser = new PDFParse({ data: new Uint8Array(buf) });
const { text: raw } = await parser.getText();
await parser.destroy();

let t = raw
  .replace(/\r\n/g, "\n")
  .replace(/\n--\s*\d+\s+of\s+\d+\s+--\n/g, "\n\n")
  .replace(/\n{3,}/g, "\n\n")
  .trim();

t = t.replace(/^●\s+/gm, "- ");

t = t.replace(/^(\d+)\.\s+(?!\d)(.+)$/gm, "\n\n## $1. $2\n");

t = t.replace(/^(\d+\.\d+)\s+(.+)$/gm, "\n\n### $1 $2\n");

t = t.replace(
  /^Cookie Policy\nSOTAB B\.V\., trading as Meshimo\nLast updated: 13\/04\/2026\n/,
  "# Cookie Policy\n\n**SOTAB B.V., trading as Meshimo**\n\n*Last updated: 13 April 2026*\n\n",
);

t = t.replace(/www\.meshimo\.com/g, "https://www.meshimo.com");
t = t.replace(
  "https://www.meshimo.com at any time through the",
  "this website at any time through the",
);
t = t.replace(
  /please see our\nPrivacy Policy\./g,
  "please see our [Privacy Policy](/privacy-policy).",
);
// Site domain for local storage (PDF may say sotab.nl; live site is meshimo.com)
t = t.replace(
  /for sotab\.nl in your browser/g,
  "for this website (meshimo.com) in your browser",
);

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, t.trimStart() + "\n", "utf8");
console.log("Wrote", outPath, "chars:", t.length);
