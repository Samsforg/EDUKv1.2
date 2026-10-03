import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { destroySession, clearSessionCookie } from "@/lib/session";

// A5 : la deconnexion est une mutation d'etat, elle ne doit etre possible que
// via POST. Un GET resterait declenchable par une navigation inter-site de premier
// niveau, le cookie de session etant SameSite=Lax (cf. session.ts).
export async function GET() {
  return NextResponse.json(
    { error: "Methode non autorisee. Utilisez POST pour vous deconnecter." },
    { status: 405, headers: { Allow: "POST" } },
  );
}

// POST est protege par verifyCsrf() dans proxy.ts : /api/auth/logout n'est plus
// dans PUBLIC_ROUTES, la requete passe par le controle de session puis CSRF.
export async function POST() {
  try {
    const jar = await cookies();
    const token = jar.get("edukora_session")?.value;
    if (token) await destroySession(token);
    const res = NextResponse.json({ ok: true });
    clearSessionCookie(res);
    return res;
  } catch (err) {
    console.error("[auth/logout] POST:", err);
    return NextResponse.json({ error: "Erreur interne" }, { status: 500 });
  }
}