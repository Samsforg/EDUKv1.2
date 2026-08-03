import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import { getAdminUsersPage } from "@/lib/admin";
import { AdminShell } from "@/components/admin/AdminShell";
import { UserFilters } from "@/components/admin/UserFilters";
import { RoleSelect } from "@/components/admin/RoleSelect";
import { NotifyButton } from "@/components/admin/NotifyButton";
import { BlockButton } from "@/components/admin/BlockButton";
import { DeleteUserButton } from "@/components/admin/DeleteUserButton";

export const metadata: Metadata = { title: "Edukora Admin - Utilisateurs" };

function str(v: string | string[] | undefined): string {
  return typeof v === "string" ? v : "";
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/connexion-edukora");
  if (user.role !== "admin") redirect("/accueil-edukora");

  const sp = await searchParams;
  const q = str(sp.q);
  const role = str(sp.role);
  const status = str(sp.status);
  const page = Math.max(1, Number.parseInt(str(sp.page), 10) || 1);

  const { users, total, pages, page: currentPage } = getAdminUsersPage({
    q,
    role,
    status: (status === "active" || status === "blocked" ? status : undefined) as "active" | "blocked" | undefined,
    page,
  });

  function pageHref(p: number): string {
    const spu = new URLSearchParams();
    if (q) spu.set("q", q);
    if (role && role !== "all") spu.set("role", role);
    if (status && status !== "all") spu.set("status", status);
    if (p > 1) spu.set("page", String(p));
    const s = spu.toString();
    return `/espace-admin/utilisateurs${s ? `?${s}` : ""}`;
  }

  return (
    <AdminShell active="users">
      <section className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-[28px] md:text-display-lg font-bold text-on-surface">Gestion des Utilisateurs</h2>
          <p className="text-on-surface-variant font-body mt-1">
            {total} compte{total > 1 ? "s" : ""}. Recherchez, filtrez, changez un rôle, notifiez, bloquez ou supprimez.
          </p>
        </div>
        <NotifyButton all />
      </section>

      <UserFilters initialQ={q} initialRole={role || "all"} initialStatus={status || "all"} />

      <section className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
        {users.length === 0 ? (
          <div className="p-12 text-center">
            <span className="material-symbols-outlined text-4xl text-on-surface-variant mb-2">search_off</span>
            <p className="text-on-surface-variant">Aucun utilisateur ne correspond à ces critères.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-surface-container-high/60 text-label-xs uppercase tracking-wider text-on-surface-variant">
                <tr>
                  <th className="px-6 py-3">Utilisateur</th>
                  <th className="px-6 py-3">Rôle</th>
                  <th className="px-6 py-3">Contact</th>
                  <th className="px-6 py-3">Classe / Série</th>
                  <th className="px-6 py-3">XP</th>
                  <th className="px-6 py-3">Série de jours</th>
                  <th className="px-6 py-3">Activité</th>
                  <th className="px-6 py-3">Quiz</th>
                  <th className="px-6 py-3">Examens</th>
                  <th className="px-6 py-3">Forum</th>
                  <th className="px-6 py-3">Statut</th>
                  <th className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-surface-container transition-colors">
                    <td className="px-6 py-4">
                      <Link href={`/espace-admin/utilisateurs/${u.id}`} className="flex items-center gap-3 group">
                        <div className="w-9 h-9 rounded-full bg-primary-fixed flex items-center justify-center text-on-primary-fixed font-bold text-xs shrink-0">
                          {`${u.first_name[0]}${u.last_name[0]}`.toUpperCase()}
                        </div>
                        <div>
                          <p className="font-semibold text-on-surface group-hover:text-primary transition-colors">{u.first_name} {u.last_name}</p>
                          <p className="text-xs text-on-surface-variant">#{u.id}{u.id === user.id ? " • vous" : ""}</p>
                        </div>
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      <RoleSelect userId={u.id} current={u.role} />
                    </td>
                    <td className="px-6 py-4 text-on-surface-variant">
                      <p>{u.email ?? "—"}</p>
                      <p className="text-xs">{u.phone ?? ""}</p>
                    </td>
                    <td className="px-6 py-4 text-on-surface-variant">
                      {u.class_level ?? "—"}
                      {u.serie_name ? <p className="text-xs">{u.serie_name}</p> : null}
                    </td>
                    <td className="px-6 py-4 font-bold text-on-surface">{u.xp}</td>
                    <td className="px-6 py-4 text-on-surface-variant">{u.streak} j</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${u.online ? "bg-tertiary" : "bg-outline-variant"}`}></span>
                        <span className="text-xs text-on-surface-variant">{u.online ? "En ligne" : (u.last_active ?? "Jamais")}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-on-surface-variant">{u.quiz_attempts}</td>
                    <td className="px-6 py-4 text-on-surface-variant">{u.exam_attempts}</td>
                    <td className="px-6 py-4 text-on-surface-variant">{u.forum_posts}</td>
                    <td className="px-6 py-4">
                      {u.blocked ? (
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold bg-error-container text-on-error-container">
                          <span className="material-symbols-outlined text-sm">block</span>
                          Bloqué
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold bg-tertiary-container text-on-tertiary-container">
                          <span className="material-symbols-outlined text-sm">check_circle</span>
                          Actif
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 flex-wrap">
                        {u.id !== user.id && (
                          <>
                            <NotifyButton userId={u.id} userName={`${u.first_name} ${u.last_name}`} />
                            <BlockButton userId={u.id} blocked={!!u.blocked} />
                            <DeleteUserButton userId={u.id} userName={`${u.first_name} ${u.last_name}`} />
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {pages > 1 && (
        <nav className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-4" aria-label="Pagination">
          <p className="text-sm text-on-surface-variant">
            Page {currentPage} sur {pages} — {total} résultat{total > 1 ? "s" : ""}
          </p>
          <div className="flex items-center gap-1">
            <Link
              href={pageHref(currentPage - 1)}
              aria-disabled={currentPage <= 1}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-semibold border border-outline-variant transition-colors ${
                currentPage <= 1
                  ? "text-on-surface-variant/40 pointer-events-none"
                  : "text-on-surface hover:bg-surface-container-high"
              }`}
            >
              <span className="material-symbols-outlined text-base">chevron_left</span>
              Précédent
            </Link>
            {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
              <Link
                key={p}
                href={pageHref(p)}
                className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-semibold transition-colors ${
                  p === currentPage
                    ? "bg-primary text-on-primary"
                    : "text-on-surface border border-outline-variant hover:bg-surface-container-high"
                }`}
                aria-current={p === currentPage ? "page" : undefined}
              >
                {p}
              </Link>
            ))}
            <Link
              href={pageHref(currentPage + 1)}
              aria-disabled={currentPage >= pages}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-semibold border border-outline-variant transition-colors ${
                currentPage >= pages
                  ? "text-on-surface-variant/40 pointer-events-none"
                  : "text-on-surface hover:bg-surface-container-high"
              }`}
            >
              Suivant
              <span className="material-symbols-outlined text-base">chevron_right</span>
            </Link>
          </div>
        </nav>
      )}
    </AdminShell>
  );
}
