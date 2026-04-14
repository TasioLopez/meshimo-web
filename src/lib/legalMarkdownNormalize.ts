/**
 * Emit `###` heading line(s) and body as separate paragraphs so the whole clause is not one <h3>
 * (which would bold the entire block).
 */
function pushNumberedSubsectionHeadingAndBody(
  block: string[],
  out: string[],
): void {
  const firstLine = block[0].trim();
  const tailJoined = block.slice(1).join(" ");

  const colonIdx = firstLine.indexOf(":");
  if (colonIdx !== -1) {
    const headPart = firstLine.slice(0, colonIdx + 1).trim();
    const afterColonFirst = firstLine.slice(colonIdx + 1).trim();
    const body = [afterColonFirst, tailJoined].filter(Boolean).join(" ").replace(/\s+/g, " ").trim();
    out.push(`### ${headPart}`);
    if (body.length > 0) {
      out.push(body);
    }
    return;
  }

  const m = firstLine.match(/^(\d+\.\d+)\s+(.*)$/);
  if (m) {
    const restOfFirst = m[2].trim();
    const body = [restOfFirst, tailJoined].filter(Boolean).join(" ").replace(/\s+/g, " ").trim();
    out.push(`### ${m[1]}`);
    if (body.length > 0) {
      out.push(body);
    }
    return;
  }

  const merged = block.join(" ").replace(/\s+/g, " ").trim();
  out.push(`### ${merged}`);
}

/**
 * Normalizes legal markdown extracted from PDFs so that:
 * - Numbered subsections like `1.1 SOTAB:` become `###` headings with merged soft-wrapped lines.
 * - Lettered list items `a.` … `b.` become markdown bullet lists with merged continuations.
 * - Paragraphs are separated consistently (fixes stray gaps before `1.10` vs `1.9`).
 */
export function normalizeLegalDocumentMarkdown(input: string): string {
  const lines = input.split(/\r?\n/);
  const out: string[] = [];
  let i = 0;

  const isHeading = (line: string) => {
    const t = line.trim();
    return /^#{1,6}\s/.test(t);
  };

  const isNumberedSubsection = (line: string) => {
    const t = line.trim();
    if (/^#{1,6}\s/.test(t)) return false;
    return /^\d+\.\d+\s/.test(t);
  };

  const isLettered = (line: string) => /^[a-z]\.\s/i.test(line.trim());

  const isMarkdownListItem = (line: string) => line.trimStart().startsWith("- ");

  while (i < lines.length) {
    const line = lines[i];
    const t = line.trimEnd();

    if (t === "") {
      i++;
      continue;
    }

    if (isHeading(t)) {
      out.push(t);
      i++;
      continue;
    }

    if (isNumberedSubsection(t)) {
      const block: string[] = [t];
      i++;
      while (i < lines.length) {
        const L = lines[i].trimEnd();
        if (L === "") {
          const next = i + 1 < lines.length ? lines[i + 1].trimEnd() : "";
          if (next && (isNumberedSubsection(next) || isHeading(next) || isLettered(next))) {
            i++;
            break;
          }
          i++;
          continue;
        }
        if (isNumberedSubsection(L) || isHeading(L) || isLettered(L)) break;
        block.push(L);
        i++;
      }
      pushNumberedSubsectionHeadingAndBody(block, out);
      continue;
    }

    if (isLettered(t)) {
      const items: string[] = [];
      let current = t;
      i++;
      while (i < lines.length) {
        const L = lines[i].trimEnd();
        if (L === "") {
          const next = i + 1 < lines.length ? lines[i + 1].trimEnd() : "";
          if (next && (isNumberedSubsection(next) || isHeading(next))) {
            i++;
            break;
          }
          i++;
          continue;
        }
        if (isNumberedSubsection(L) || isHeading(L)) break;
        if (isLettered(L)) {
          items.push(current);
          current = L;
          i++;
        } else {
          current += " " + L;
          i++;
        }
      }
      items.push(current);
      out.push(items.map((x) => `- ${x}`).join("\n"));
      continue;
    }

    if (isMarkdownListItem(t)) {
      const listLines: string[] = [t];
      i++;
      while (i < lines.length) {
        const L = lines[i].trimEnd();
        if (L === "") break;
        if (isHeading(L) || isNumberedSubsection(L) || isLettered(L)) break;
        if (isMarkdownListItem(L)) {
          listLines.push(L);
          i++;
          continue;
        }
        listLines[listLines.length - 1] += " " + L;
        i++;
      }
      out.push(listLines.join("\n"));
      continue;
    }

    const para: string[] = [t];
    i++;
    while (i < lines.length) {
      const L = lines[i].trimEnd();
      if (L === "") break;
      if (isHeading(L) || isNumberedSubsection(L) || isLettered(L)) break;
      if (isMarkdownListItem(L)) break;
      para.push(L);
      i++;
    }
    out.push(para.join(" ").replace(/\s+/g, " ").trim());
  }

  return out.join("\n\n");
}

/** Strip minimal markdown for PDF text (bold, links). */
export function stripMarkdownForPdf(text: string): string {
  return text
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
}
