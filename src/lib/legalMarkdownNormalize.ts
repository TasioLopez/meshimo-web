/** Period + space that starts a new sentence; skip periods in `B.V.`, `U.S.`, etc. */
function isAbbreviationPeriod(rest: string, dotIdx: number): boolean {
  if (rest[dotIdx] !== ".") return false;
  if (rest.slice(Math.max(0, dotIdx - 3), dotIdx + 1) === "B.V.") return true;
  if (rest.slice(Math.max(0, dotIdx - 3), dotIdx + 1) === "U.S.") return true;
  if (rest.slice(Math.max(0, dotIdx - 4), dotIdx + 1) === "Ltd.") return true;
  return false;
}

function toTitleCase(words: string[]): string {
  return words
    .map((w) => {
      if (/^[A-Z0-9.&/-]+$/.test(w)) return w;
      if (/^\d+(\.\d+)?$/.test(w)) return w;
      return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();
    })
    .join(" ");
}

function firstSentence(text: string): string {
  let i = 0;
  while (i < text.length) {
    const idx = text.indexOf(". ", i);
    if (idx === -1) break;
    if (isAbbreviationPeriod(text, idx)) {
      i = idx + 2;
      continue;
    }
    return text.slice(0, idx + 1).trim();
  }
  return text.trim();
}

function trimGenericSuffix(phrase: string): string {
  return phrase
    .replace(/\bunder these General Terms and Conditions\b.*$/i, "")
    .replace(/\bunder the Agreement\b.*$/i, "")
    .replace(/\bin connection with the Agreement\b.*$/i, "")
    .replace(/\bfor the relevant assignment\b.*$/i, "")
    .replace(/\s+/g, " ")
    .trim();
}

function cleanTitlePhrase(phrase: string): string {
  let p = phrase
    .replace(/^[\s,.-]+/, "")
    .replace(/\s+/g, " ")
    .trim();

  p = trimGenericSuffix(p);
  p = p.replace(/^(the|any)\s+/i, "");

  const words = p.split(/\s+/).filter(Boolean);
  if (words.length > 7) {
    p = words.slice(0, 7).join(" ");
  }

  return p.trim();
}

function deriveShortClauseTitle(rest: string): string {
  const sentenceRaw = firstSentence(rest);

  // Clause-level overrides for legal readability in Article 2+.
  const explicit: Array<{ re: RegExp; title: string }> = [
    { re: /^The contracting party\b/i, title: "Contracting party" },
    { re: /^SOTAB B\.V\. uses the trade name\b/i, title: "Trade name use" },
    { re: /^SOTAB[’']s registered office\b/i, title: "Registered office" },
    { re: /^SOTAB is registered with the Dutch Chamber of Commerce\b/i, title: "Chamber registration" },
    { re: /^SOTAB[’']s VAT number\b/i, title: "VAT number" },
    { re: /^For formal legal notices\b/i, title: "Formal legal notices" },
    { re: /^If any provision\b/i, title: "Invalid provisions" },
    { re: /^No general email exchange\b/i, title: "No amendment by informal communications" },
    { re: /^Any terms or conditions of the Client\b/i, title: "Client terms do not override precedence" },
  ];

  for (const { re, title } of explicit) {
    if (re.test(sentenceRaw)) return title;
  }

  let sentence = sentenceRaw.replace(/[()]/g, " ").replace(/\s+/g, " ").trim();

  // Remove legal subordinate opener (only when comma-delimited).
  sentence = sentence.replace(
    /^(If|Unless|Where|When|While|Without prejudice to|To the extent that)\b[^,]*,\s*/i,
    "",
  );

  const verbMatch = sentence.match(
    /\b(is|are|shall|may|must|does|do|uses|means|includes|include|remains|remain|applies|apply|constitutes|constitute|provides|provide)\b/i,
  );

  if (!verbMatch) {
    const cleaned = cleanTitlePhrase(sentence);
    if (cleaned.length > 0) return toTitleCase(cleaned.split(/\s+/));
    return "Clause";
  }

  const verbIdx = verbMatch.index ?? 0;
  const pre = cleanTitlePhrase(sentence.slice(0, verbIdx));
  const post = sentence.slice(verbIdx + verbMatch[0].length).trim();

  // Prefer a meaningful subject phrase if available.
  const preWords = pre.split(/\s+/).filter(Boolean);
  const subjectLooksEntityOnly =
    preWords.length <= 2 &&
    preWords.every((w) => /^[A-Z0-9.]+$/.test(w) || w.toLowerCase() === "sotab");

  if (preWords.length >= 2 && !subjectLooksEntityOnly) {
    return toTitleCase(preWords);
  }

  // Otherwise derive from object phrase.
  const postLead = post
    .replace(/^(be\s+entitled\s+to|be\s+obliged\s+to|be\s+required\s+to|remain\s+responsible\s+for)\b/i, "")
    .split(",")[0]
    ?.trim() ?? post;
  const cleanedPost = cleanTitlePhrase(postLead);
  if (cleanedPost.length > 0) {
    return toTitleCase(cleanedPost.split(/\s+/));
  }

  return "Clause";
}

/**
 * No colon in clause: synthesize a short label and keep the full clause text in body.
 */
function splitNoColonClauseHeadingBody(merged: string): { heading: string; body: string } {
  const m = merged.match(/^(\d+\.\d+)\s+(.+)$/);
  if (!m) return { heading: merged, body: "" };
  const num = m[1];
  const rest = m[2];
  let splitIdx = -1;
  let i = 0;
  while (i < rest.length) {
    const idx = rest.indexOf(". ", i);
    if (idx === -1) break;
    if (isAbbreviationPeriod(rest, idx)) {
      i = idx + 2;
      continue;
    }
    const after = rest[idx + 2];
    if (after && /[A-Z]/.test(after)) {
      splitIdx = idx;
      break;
    }
    i = idx + 2;
  }

  const title = deriveShortClauseTitle(rest);
  if (splitIdx === -1) {
    return { heading: `${num} ${title}:`, body: rest };
  }

  const firstSentence = rest.slice(0, splitIdx + 1).trim();
  const remainder = rest.slice(splitIdx + 2).trim();
  const body = [firstSentence, remainder].filter(Boolean).join(" ").trim();
  return { heading: `${num} ${title}:`, body };
}

/**
 * Emit `###` heading line(s) and body as separate paragraphs so the whole clause is not one <h3>
 * (which would bold the entire block).
 */
function pushNumberedSubsectionHeadingAndBody(
  block: string[],
  out: string[],
): void {
  const mergedFull = block.join(" ").replace(/\s+/g, " ").trim();

  const colonIdx = mergedFull.indexOf(":");
  if (colonIdx !== -1) {
    const headPart = mergedFull.slice(0, colonIdx + 1).trim();
    const body = mergedFull.slice(colonIdx + 1).trim();
    out.push(`### ${headPart}`);
    if (body.length > 0) {
      out.push(body);
    }
    return;
  }

  const { heading, body } = splitNoColonClauseHeadingBody(mergedFull);
  out.push(`### ${heading}`);
  if (body.length > 0) {
    out.push(body);
  }
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
