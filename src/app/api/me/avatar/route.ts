import { guardApi } from "@/lib/api-guard";
import { NextResponse } from "next/server";
import { run } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

const MAX_BYTES = 300_000; // 300 KB after client-side compression

async function POSTHandler(req: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Non connecté" }, { status: 401 });

  const body = await req.json().catch(() => ({}));
  const { avatar } = body as { avatar?: string };

  if (!avatar || typeof avatar !== "string") {
    return NextResponse.json({ error: "Aucune image fournie" }, { status: 400 });
  }

  // Must be a data URL: data:image/...;base64,...
  const match = avatar.match(/^data:(image\/\w+);base64,(.+)$/);
  if (!match) {
    return NextResponse.json({ error: "Format d'image invalide" }, { status: 400 });
  }

  const mimeType = match[1];
  const b64 = match[2];
  const byteLen = Math.round((b64.length * 3) / 4);

  if (byteLen > MAX_BYTES) {
    return NextResponse.json(
      { error: `Image trop lourde (${Math.round(byteLen / 1000)} Ko). Maximum 300 Ko.` },
      { status: 400 },
    );
  }

  // Store the data URL directly — small enough for DB, no external dependency
  await run("UPDATE users SET avatar_url = ? WHERE id = ?", avatar, user.id);

  return NextResponse.json({ ok: true, avatar_url: avatar });
}

export const POST = guardApi("POST /api/me/avatar", POSTHandler);
