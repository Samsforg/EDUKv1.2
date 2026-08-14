import { chunkText, chunkDocuments } from "@/lib/ai/chunker";
import {
  buildRAGContextBlock,
  buildTutorRAGContext,
  searchChunks,
} from "@/lib/ai/rag";
import { run } from "@/lib/db";

const RUN = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

describe("chunker", () => {
  it("returns empty array for empty text", () => {
    expect(chunkText("   \n  ")).toEqual([]);
  });

  it("returns single chunk for short text", () => {
    const chunks = chunkText("Cours de mathématiques simples.");
    expect(chunks).toEqual(["Cours de mathématiques simples."]);
  });

  it("splits by headings and paragraphs", () => {
    const text = `# Introduction\n\nPremier paragraphe sur les dérivées.\n\n## Propriétés\n\nSecond paragraphe avec les propriétés.`;
    const chunks = chunkText(text);
    expect(chunks.length).toBeGreaterThanOrEqual(2);
    expect(chunks.some((c) => c.includes("Premier paragraphe"))).toBe(true);
    expect(chunks.some((c) => c.includes("Second paragraphe"))).toBe(true);
    expect(chunks[0]).toContain("Introduction");
    expect(chunks[1]).toContain("Propriétés");
  });

  it("respects maxLength and keeps heading context", () => {
    const longParagraph = "phrase ".repeat(300);
    const text = `# Chapitre : la dérivée\n\n${longParagraph}`;
    const chunks = chunkText(text, { maxLength: 200, overlap: 20 });
    expect(chunks.length).toBeGreaterThan(2);
    for (const chunk of chunks) {
      expect(chunk.length).toBeLessThanOrEqual(250);
    }
    expect(chunks[0].startsWith("Chapitre")).toBe(true);
  });

  it("chunkDocuments adds positions and metadata", () => {
    const inputs = [
      {
        sourceType: "lesson",
        sourceId: 7,
        lessonId: 7,
        chapterId: 2,
        subjectId: 1,
        gradeId: 3,
        title: "La dérivée",
        content: "mot ".repeat(800),
      },
    ];
    const chunks = chunkDocuments(inputs);
    expect(chunks.length).toBeGreaterThan(1);
    expect(chunks[0]).toMatchObject({ sourceType: "lesson", sourceId: 7, lessonId: 7, chapterId: 2, subjectId: 1, gradeId: 3, position: 0 });
    expect(chunks[1].position).toBe(1);
  });
});

describe("rag (SQLite keyword fallback)", () => {
  afterEach(async () => {
    await run("DELETE FROM document_chunks");
  });

  async function seedChunks() {
    await run(
      `INSERT INTO document_chunks (source_type, source_id, lesson_id, chapter_id, subject_id, grade_id, title, content, position)
       VALUES ('lesson', 1, 1, 10, 2, 3, 'La dérivée en Terminale C', 'La dérivée mesure la variation instantanée d une fonction.', 0)`,
    );
    await run(
      `INSERT INTO document_chunks (source_type, source_id, lesson_id, chapter_id, subject_id, grade_id, title, content, position)
       VALUES ('lesson', 2, 2, 20, 1, 2, 'La photosynthèse en 3ème', 'La photosynthèse transforme la lumière en énergie chimique.', 0)`,
    );
  }

  it("returns empty when no chunks stored", async () => {
    const sources = await searchChunks("dérivée", {});
    expect(sources).toEqual([]);
  });

  it("finds matching chunk by keyword", async () => {
    await seedChunks();
    const sources = await searchChunks("Comment calculer une dérivée ?", {});
    expect(sources.length).toBe(1);
    expect(sources[0].title).toContain("dérivée");
    expect(sources[0].content).toContain("variation");
  });

  it("filters by grade", async () => {
    await seedChunks();
    const sources = await searchChunks("dérivée", { gradeId: 3 });
    expect(sources.length).toBe(1);
    expect(sources[0].lessonId).toBe(1);
    const excluded = await searchChunks("dérivée", { gradeId: 2 });
    expect(excluded).toEqual([]);
  });

  it("filters by subject", async () => {
    await seedChunks();
    const sources = await searchChunks("photosynthèse", { subjectId: 1 });
    expect(sources.length).toBe(1);
    expect(sources[0].lessonId).toBe(2);
  });

  it("filters by lesson", async () => {
    await seedChunks();
    const sources = await searchChunks("dérivée", { lessonId: 1 });
    expect(sources.length).toBe(1);
    const excluded = await searchChunks("photosynthèse", { lessonId: 1 });
    expect(excluded).toEqual([]);
  });

  it("buildRAGContextBlock formats sources", () => {
    const block = buildRAGContextBlock([
      { title: "La dérivée", content: "Contenu.", sourceType: "lesson", sourceId: 1, lessonId: 1, chapterId: 1, distance: null },
    ]);
    expect(block).toContain("Contexte pédagogique Edukora");
    expect(block).toContain("[Extrait 1]");
    expect(block).toContain("La dérivée");
    expect(block).not.toContain("undefined");
  });

  it("buildRAGContextBlock returns empty string for no sources", () => {
    expect(buildRAGContextBlock([])).toBe("");
  });

  it("buildTutorRAGContext returns empty on failure or empty index", async () => {
    const context = await buildTutorRAGContext("une question sans réponse en base");
    expect(context).toBe("");
  });

  it("buildTutorRAGContext injects matching content", async () => {
    await seedChunks();
    const context = await buildTutorRAGContext("explique la dérivée");
    expect(context).toContain("Contexte pédagogique Edukora");
    expect(context).toContain("variation");
  });

  it("is stable across runs", async () => {
    const key = `rag-stable-${RUN}`;
    await run(
      `INSERT INTO document_chunks (source_type, source_id, lesson_id, title, content, position)
       VALUES ('lesson', 99, 99, '${key}', 'Contenu de test pour ${key}.', 0)`,
    );
    const sources = await searchChunks(key, {});
    expect(sources.length).toBe(1);
    expect(sources[0].content).toContain(key);
  });
});

describe("rag (PG pgvector — exécuté si DATABASE_URL défini)", () => {
  const isPGRun = !!process.env.DATABASE_URL;

  it("searches by vector similarity", async () => {
    if (!isPGRun) return;
    const sources = await searchChunks("Comment calculer la dérivée d une fonction ?", {}, 3);
    expect(sources.length).toBeGreaterThan(0);
    expect(sources[0].content.toLowerCase()).toContain("dérivée");
  }, 60000);

  it("filters by subject and grade", async () => {
    if (!isPGRun) return;
    const s = await searchChunks("chlorophylle lumière", { subjectId: 2 }, 3);
    expect(s.length).toBeGreaterThan(0);
    for (const row of s) {
      const content = row.content.toLowerCase();
      expect(
        content.includes("photosynthèse") ||
          content.includes("chloro") ||
          content.includes("lumière"),
      ).toBe(true);
    }
    const g = await searchChunks("fonction mathématiques", { gradeId: 1 }, 3);
    expect(g.length).toBeGreaterThan(0);
    expect(g[0].content.toLowerCase()).toContain("dérivée");
  }, 60000);
});
