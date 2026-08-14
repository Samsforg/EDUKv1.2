export interface DocumentChunkInput {
  sourceType: string;
  sourceId: number;
  lessonId?: number | null;
  chapterId?: number | null;
  subjectId?: number | null;
  gradeId?: number | null;
  title: string;
  content: string;
}

export interface DocumentChunk extends DocumentChunkInput {
  position: number;
}

const DEFAULT_MAX_LENGTH = 1200;
const DEFAULT_OVERLAP = 100;

function splitParagraphs(text: string): string[] {
  return text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}

function splitSentences(text: string): string[] {
  return text
    .split(/(?<=[.!?…])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

export function chunkText(
  text: string,
  options: { maxLength?: number; overlap?: number } = {},
): string[] {
  const maxLength = options.maxLength ?? DEFAULT_MAX_LENGTH;
  const overlap = options.overlap ?? DEFAULT_OVERLAP;

  const normalized = text.replace(/\r\n/g, "\n").trim();
  if (!normalized) return [];

  const headingRe = /^(#{1,3})\s+(.+)$/gm;
  const sections: { title: string; body: string }[] = [];
  let lastIndex = 0;
  let lastTitle = "";
  let match: RegExpExecArray | null;
  while ((match = headingRe.exec(normalized))) {
    if (match.index > lastIndex) {
      sections.push({ title: lastTitle, body: normalized.slice(lastIndex, match.index).trim() });
    }
    lastTitle = match[2].trim();
    lastIndex = match.index + match[0].length;
  }
  sections.push({ title: lastTitle, body: normalized.slice(lastIndex).trim() });

  const chunks: string[] = [];
  let currentTitle = "";
  let current = "";

  const flush = () => {
    if (!current.trim()) return;
    chunks.push(currentTitle ? `${currentTitle}\n${current.trim()}` : current.trim());
    current = "";
  };

  for (const section of sections) {
    currentTitle = section.title;
    if (!section.body) {
      if (section.title) {
        if (current) flush();
        chunks.push(section.title);
      }
      continue;
    }
    if (section.body.length <= maxLength) {
      if (current) flush();
      current = section.title ? `${section.title}\n${section.body}` : section.body;
      flush();
      continue;
    }

    const paragraphs = splitParagraphs(section.body);
    let paragraphBuffer = "";
    for (const paragraph of paragraphs) {
      if (paragraph.length > maxLength) {
        flush();
        const sentences = splitSentences(paragraph);
        let sentenceBuffer = "";
        for (const sentence of sentences) {
          if (sentence.length > maxLength) {
            flush();
            for (let i = 0; i < sentence.length; i += maxLength - overlap) {
              chunks.push(
                `${currentTitle ? `${currentTitle}\n` : ""}${sentence.slice(i, i + maxLength)}`,
              );
            }
            continue;
          }
          if (sentenceBuffer && sentenceBuffer.length + sentence.length + 1 > maxLength) {
            chunks.push(
              `${currentTitle ? `${currentTitle}\n` : ""}${sentenceBuffer.trim()}`,
            );
            const trimmed = sentenceBuffer.trim();
            sentenceBuffer = trimmed.length > overlap ? trimmed.slice(-overlap) + " " : "";
          }
          sentenceBuffer += `${sentenceBuffer ? " " : ""}${sentence}`;
        }
        if (sentenceBuffer.trim()) {
          chunks.push(`${currentTitle ? `${currentTitle}\n` : ""}${sentenceBuffer.trim()}`);
        }
        continue;
      }
      if (paragraphBuffer && paragraphBuffer.length + paragraph.length + 2 > maxLength) {
        flush();
        const trimmed = paragraphBuffer.trim();
        paragraphBuffer = trimmed.length > overlap ? trimmed.slice(-overlap) + "\n" : "";
      }
      paragraphBuffer += `${paragraphBuffer ? "\n" : ""}${paragraph}`;
    }
    if (paragraphBuffer.trim()) {
      if (current && current.length + paragraphBuffer.length + 2 > maxLength) {
        flush();
      }
      current += `${current ? "\n\n" : ""}${paragraphBuffer.trim()}`;
      if (current.length >= maxLength) flush();
    }
  }
  flush();

  return chunks.filter(Boolean);
}

export function chunkDocuments(inputs: DocumentChunkInput[]): DocumentChunk[] {
  const chunks: DocumentChunk[] = [];
  for (const input of inputs) {
    const pieces = chunkText(input.content);
    for (let i = 0; i < pieces.length; i++) {
      chunks.push({
        ...input,
        title: input.title,
        content: pieces[i],
        position: i,
      });
    }
  }
  return chunks;
}
