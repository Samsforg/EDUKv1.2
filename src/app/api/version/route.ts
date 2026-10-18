import { NextResponse } from "next/server";
import { getBuildId } from "@/lib/version";

// Toujours dynamique : la version doit refléter le déploiement en cours,
// jamais une réponse mise en cache par le CDN.
export const dynamic = "force-dynamic";

async function GETHandler() {
  return NextResponse.json(
    { version: getBuildId() },
    { headers: { "Cache-Control": "no-store, max-age=0" } },
  );
}

export const GET = GETHandler;
