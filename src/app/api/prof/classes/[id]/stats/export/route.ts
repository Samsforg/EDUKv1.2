import { guardApi } from "@/lib/api-guard";
import { NextRequest, NextResponse } from "next/server";
import { queryOne } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { fetchClassExport, buildClassCsv, buildClassPdf } from "@/lib/export";

async function GETHandler(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Non connecté" }, { status: 401 });
  if (user.role !== "teacher")
    return NextResponse.json({ error: "Réservé aux professeurs" }, { status: 403 });

  const { id } = await params;
  const cls = await queryOne<{ id: number; teacher_id: number }>(
    "SELECT id, teacher_id FROM classes WHERE id = ?",
    Number(id),
  );
  if (!cls) return NextResponse.json({ error: "Classe introuvable" }, { status: 404 });
  if (cls.teacher_id !== user.id)
    return NextResponse.json({ error: "Pas ta classe" }, { status: 403 });

  const format = req.nextUrl.searchParams.get("format") ?? "csv";
  if (format !== "csv" && format !== "pdf") {
    return NextResponse.json({ error: "Format invalide (csv | pdf)" }, { status: 400 });
  }

  const data = await fetchClassExport(cls.id);
  if (!data) return NextResponse.json({ error: "Classe introuvable" }, { status: 404 });

  const date = new Date().toISOString().slice(0, 10);
  const filename = `classe-${cls.id}-stats-${date}.${format}`;

  if (format === "pdf") {
    const arrayBuffer = await buildClassPdf(data);
    return new NextResponse(Buffer.from(arrayBuffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "no-store",
      },
    });
  }

  const csv = buildClassCsv(data);
  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "no-store",
    },
  });
}

export const GET = guardApi("GET /api/prof/classes/[id]/stats/export", GETHandler);