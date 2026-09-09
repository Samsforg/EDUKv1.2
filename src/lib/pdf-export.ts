"use client";
// Export PDF d'une fiche de cours via jspdf (déjà dans les dépendances).
export async function downloadLessonPdf(lesson: { id: number; title: string; content_md: string; duration_min?: number }): Promise<void> {
  const [{ default: JsPDF }] = await Promise.all([import("jspdf")]);
  const doc = new JsPDF({ unit: "pt", format: "a4" });
  const margin = 48;
  const width = doc.internal.pageSize.getWidth() - margin * 2;
  let y = 64;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor("#0047ab");
  const titleLines = doc.splitTextToSize(`Edukora — ${lesson.title}`, width);
  doc.text(titleLines, margin, y);
  y += titleLines.length * 24 + 8;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor("#888888");
  doc.text(`Fiche de révision · ${lesson.duration_min ?? 15} min · edukora.net`, margin, y);
  y += 28;

  doc.setFontSize(11);
  doc.setTextColor("#222222");
  const paragraphs = lesson.content_md
    .replace(/\r\n/g, "\n")
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);

  for (const p of paragraphs) {
    if (y > doc.internal.pageSize.getHeight() - 72) {
      doc.addPage();
      y = 64;
    }
    const lines = doc.splitTextToSize(p, width);
    for (const line of lines) {
      if (y > doc.internal.pageSize.getHeight() - 56) {
        doc.addPage();
        y = 64;
      }
      doc.text(line, margin, y);
      y += 16;
    }
    y += 10;
  }

  const pages = doc.getNumberOfPages();
  for (let i = 1; i <= pages; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor("#aaaaaa");
    doc.text(
      `edukora.net · Réussir son BAC & BEPC`,
      margin,
      doc.internal.pageSize.getHeight() - 32
    );
    doc.text(String(i), doc.internal.pageSize.getWidth() - margin, doc.internal.pageSize.getHeight() - 32);
  }

  const safe = lesson.title.replace(/[^a-z0-9]+/gi, "-").slice(0, 50).toLowerCase();
  doc.save(`edukora-${safe}.pdf`);
}
