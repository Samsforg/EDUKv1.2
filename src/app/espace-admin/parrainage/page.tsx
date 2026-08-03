import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import { getReferralStats } from "@/lib/admin";
import { AdminShell } from "@/components/admin/AdminShell";

export const metadata: Metadata = { title: "Edukora Admin - Parrainage" };

const MEDALS = ["🥇", "🥈", "🥉"];

export default async function Page() {
  const user = await getCurrentUser();
  if (!user) redirect("/connexion-edukora");
  if (user.role !== "admin") redirect("/accueil-edukora");

  const { totals, top, list } = getReferralStats();

  return (
    <AdminShell active="referral">
      <section className="mb-6">
        <h2 className="font-display text-[28px] md:text-display-lg font-bold text-on-surface">Statistiques de Parrainage</h2>
        <p className="text-on-surface-variant font-body mt-1">
          Suivi du programme de parrainage : filleuls, parrains et activité.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5">
          <p className="text-xs text-on-surface-variant">Parrains actifs</p>
          <p className="text-3xl font-bold text-primary">{totals.referrers}</p>
        </div>
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5">
          <p className="text-xs text-on-surface-variant">Comptes parrainés</p>
          <p className="text-3xl font-bold text-primary">{totals.referred}</p>
        </div>
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5">
          <p className="text-xs text-on-surface-variant">Filleuls actifs (7 j)</p>
          <p className="text-3xl font-bold text-tertiary">{totals.active_week}</p>
        </div>
      </section>

      <section className="mb-6">
        <h3 className="font-display text-lg font-bold text-on-surface mb-3">Top parrains</h3>
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
          {top.length === 0 ? (
            <div className="p-8 text-center text-on-surface-variant">Aucun parrainage enregistré.</div>
          ) : (
            <div className="divide-y divide-outline-variant">
              {top.map((r, i) => (
                <div key={r.user_id} className="flex items-center gap-4 p-4 hover:bg-surface-container transition-colors">
                  <span className="w-8 text-center text-lg shrink-0">{MEDALS[i] ?? i + 1}</span>
                  <Link href={`/espace-admin/utilisateurs/${r.user_id}`} className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-on-primary-fixed font-bold text-xs shrink-0">
                    {r.name.split(" ").map((p) => p[0]).join("").slice(0, 2).toUpperCase()}
                  </Link>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-on-surface truncate">{r.name}</p>
                    <p className="text-xs text-on-surface-variant font-mono">{r.referral_code} • {r.xp} XP</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-2xl font-bold text-primary">{r.count}</p>
                    <p className="text-xs text-on-surface-variant">filleul{r.count > 1 ? "s" : ""} • {r.active_week} actif{r.active_week > 1 ? "s" : ""}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section>
        <h3 className="font-display text-lg font-bold text-on-surface mb-3">Filleuls ({list.length})</h3>
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
          {list.length === 0 ? (
            <div className="p-8 text-center text-on-surface-variant">Aucun compte parrainé pour le moment.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-surface-container-high/60 text-label-xs uppercase tracking-wider text-on-surface-variant">
                  <tr>
                    <th className="px-6 py-3">Filleul</th>
                    <th className="px-6 py-3">Classe</th>
                    <th className="px-6 py-3">Parrain</th>
                    <th className="px-6 py-3">Code du parrain</th>
                    <th className="px-6 py-3">Inscrit le</th>
                    <th className="px-6 py-3">Activité</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant">
                  {list.map((u) => (
                    <tr key={u.user_id} className="hover:bg-surface-container transition-colors">
                      <td className="px-6 py-4">
                        <Link href={`/espace-admin/utilisateurs/${u.user_id}`} className="font-semibold text-on-surface hover:text-primary transition-colors">
                          {u.name}
                        </Link>
                      </td>
                      <td className="px-6 py-4 text-on-surface-variant">{u.class_level ?? "—"}</td>
                      <td className="px-6 py-4 text-on-surface">{u.referrer_name}</td>
                      <td className="px-6 py-4">
                        <span className="font-mono text-xs text-on-surface-variant bg-surface-container-high rounded px-2 py-0.5">{u.referrer_code}</span>
                      </td>
                      <td className="px-6 py-4 text-on-surface-variant">{u.created_at.slice(0, 10)}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className={`h-2 w-2 rounded-full ${u.online ? "bg-tertiary" : "bg-outline-variant"}`}></span>
                          <span className="text-xs text-on-surface-variant">
                            {u.online ? "En ligne" : (u.last_active ? `Actif ${u.relative}` : "Jamais")}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </AdminShell>
  );
}
