import { NextResponse } from "next/server";
import { deleteForumPost } from "@/lib/admin";
import { requireAdmin } from "@/lib/admin-guard";

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const forbidden = await requireAdmin();
  if (forbidden) return forbidden;

  const { id } = await params;
  const result = deleteForumPost(Number(id));
  if ("error" in result) return NextResponse.json({ error: result.error }, { status: 404 });
  return NextResponse.json({ ok: true });
}
