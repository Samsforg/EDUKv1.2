import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import { getPromoCodes } from "@/lib/promo";
import { AdminShell } from "@/components/admin/AdminShell";
import { PromoForm } from "@/components/admin/PromoForm";
import { PromoActions } from "@/components/admin/PromoActions";

export const metadata: Metadata = { title: "Edukora Admin - Codes promo" };

const STATUS_META: Record<string, { label: string; cls: string }> = {
  active: { label: "Actif", cls: "bg-tertiary-container text-on-tertiary-container" },
  disabled: { label: "Désactivé", cls: "bg-surface-container-high text-on-surface-variant" },
  expired: { label: "Expiré", cls: "bg-surface-container-high text-on-surface-variant" },
  exhausted: { label: "Épuisé", cls: "bg-error-container text-on-error-container" },
};

export default async function Page() {
  const user = await getCurrentUser();
  if (!user) redirect("/connexion-edukora");
  if (user.role !== "admin") redirect("/accueil-edukora");

  const codes = getPromoCodes();

  return (
    <AdminShell active="promo">
      <section className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-[28px] md:text-display-lg font-bold text-on-surface">Codes Promo</h2>
          <p className="text-on-surface-variant font-body mt-1">
            {codes.length} code{codes.length > 1 ? "s" : ""} — créez, activez ou supprimez des codes de remise.
          </p>
        </div>
        <PromoForm />
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5">
          <p className="text-xs text-on-surface-variant">Codes actifs</p>
          <p className="text-3xl font-bold text-primary">{codes.filter((c) => c.status === "active").length}</p>
        </div>
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5">
          <p className="text-xs text-on-surface-variant">Utilisations totales</p>
          <p className="text-3xl font-bold text-primary">{codes.reduce((a, c) => a + c.used_count, 0)}</p>
        </div>
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5">
          <p className="text-xs text-on-surface-variant">Épuisés / désactivés</p>
          <p className="text-3xl font-bold text-primary">
            {codes.filter((c) => c.status === "exhausted" || c.status === "disabled" || c.status === "expired").length}
          </p>
        </div>
      </section>

      <section className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
        {codes.length === 0 ? (
          <div className="p-12 text-center text-on-surface-variant">
            Aucun code promo. Créez votre premier code avec « Nouveau code ».
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-surface-container-high/60 text-label-xs uppercase tracking-wider text-on-surface-variant">
                <tr>
                  <th className="px-6 py-3">Code</th>
                  <th className="px-6 py-3">Remise</th>
                  <th className="px-6 py-3">Utilisations</th>
                  <th className="px-6 py-3">Expiration</th>
                  <th className="px-6 py-3">Statut</th>
                  <th className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant">
                {codes.map((c) => {
                  const meta = STATUS_META[c.status] ?? STATUS_META.active;
                  return (
                    <tr key={c.id} className="hover:bg-surface-container transition-colors">
                      <td className="px-6 py-4">
                        <span className="font-mono font-bold text-on-surface tracking-wide bg-surface-container-high rounded-lg px-3 py-1.5 border border-outline-variant">
                          {c.code}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-bold text-primary">
                          {c.discount_type === "percent" ? `−${c.discount_value}%` : `−${Number(c.discount_value).toLocaleString("fr-FR")} F`}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-on-surface-variant">
                        {c.used_count}
                        <span className="text-xs"> / {c.max_uses}</span>
                        <div className="w-24 h-1.5 rounded-full bg-surface-container-high mt-1 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-primary"
                            style={{ width: `${Math.min(100, (c.used_count / Math.max(1, c.max_uses)) * 100)}%` }}
                          ></div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-on-surface-variant">
                        {c.expires_at ? c.expires_at.slice(0, 10) : "Jamais"}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold ${meta.cls}`}>
                          {meta.label}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <PromoActions id={c.id} active={!!c.active} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </AdminShell>
  );
}
