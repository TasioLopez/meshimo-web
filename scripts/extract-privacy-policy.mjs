import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { PDFParse } from "pdf-parse";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.join(__dirname, "..");
const pdfPath =
  process.argv[2] ?? "C:/Users/Tasio/Downloads/Privacy Policy Meshimo.pdf";
const outPath = path.join(repoRoot, "src", "content", "legal", "privacy-policy.en.md");

const buf = fs.readFileSync(pdfPath);
const parser = new PDFParse({ data: new Uint8Array(buf) });
const { text: raw } = await parser.getText();
await parser.destroy();

let t = raw
  .replace(/\r\n/g, "\n")
  .replace(/\n--\s*\d+\s+of\s+\d+\s+--\n/g, "\n\n")
  .replace(/\n{3,}/g, "\n\n")
  .trim();

// Remove PDF footer artefacts (stray "com" before section 14)
t = t.replace(/\ncom\n+(?=## 14\.|\n## 14\.)/g, "\n");
t = t.replace(/\ncom\n\n--/g, "\n\n--").replace(/\ncom$/g, "");

// Bullet character → markdown list
t = t.replace(/^●\s+/gm, "- ");

// Main numbered sections: "12. Something" but not "5.1 Something"
t = t.replace(/^(\d+)\.\s+(?!\d)(.+)$/gm, "\n\n## $1. $2\n");

// Subsections "3.1 Title"
t = t.replace(/^(\d+\.\d+)\s+(.+)$/gm, "\n\n### $1 $2\n");

t = t.replace(
  /^Privacy Policy\nSOTAB B\.V\. trading as Meshimo\nLast updated: 13\/04\/2026\n/,
  "# Privacy Policy\n\n**SOTAB B.V. trading as Meshimo**\n\n*Last updated: 13 April 2026*\n\n",
);

t = t.replace(
  /www\.meshimo\.com\/en\/cookie-policy/g,
  "/cookie-policy",
);

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, t.trimStart() + "\n", "utf8");
console.log("Wrote", outPath, "chars:", t.length);
