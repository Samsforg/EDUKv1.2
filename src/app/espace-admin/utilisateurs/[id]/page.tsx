import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import { getUserDetail, type UserAttempt, type UserNotif } from "@/lib/admin";
import { AdminShell } from "@/components/admin/AdminShell";
import { RoleSelect } from "@/components/admin/RoleSelect";
import { NotifyButton } from "@/components/admin/NotifyButton";
import { BlockButton } from "@/components/admin/BlockButton";
import { DeleteUserButton } from "@/components/admin/DeleteUserButton";
import { ResetPasswordButton } from "@/components/admin/ResetPasswordButton";

export const metadata: Metadata = { title: "Edukora Admin - Détail utilisateur" };

const ROLE_LABEL: Record<string, string> = {
  student: "Élève",
  teacher: "Professeur",
  parent: "Parent",
  admin: "Admin",
  expert: "Expert",
};

const ROLE_BADGE: Record<string, string> = {
  student: "bg-primary-container text-on-primary-container",
  teacher: "bg-secondary-container text-on-secondary-container",
  parent: "bg-tertiary-container text-on-tertiary-container",
  admin: "bg-error-container text-on-error-container",
  expert: "bg-surface-container-high text-on-surface-variant",
};

function fmtDate(iso: string | null): string {
  if (!iso) return "—";
  const d = new Date(`${iso.slice(0, 10)}T12:00:00`);
  return d.toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" });
}

function fmtDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m} min ${String(s).padStart(2, "0")} s`;
}

function AttemptRow({ a }: { a: UserAttempt }) {
  const score = a.kind === "quiz" ? `${a.score}/${a.max_score}` : `${a.score_over_20}/20`;
  return (
    <div className="flex items-center gap-3 px-4 py-3">
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
        style={{ backgroundColor: `${a.subject_color}22`, color: a.subject_color }}
      >
        <span className="material-symbols-outlined text-sm">{a.kind === "quiz" ? "quiz" : "school"}</span>
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-on-surface truncate">{a.title}</p>
        <p className="text-xs text-on-surface-variant truncate">{a.subject_name} • {a.relative}</p>
      </div>
      <div className="text-right shrink-0">
        <p className="text-sm font-bold text-on-surface">{score}</p>
        <div className="flex items-center justify-end gap-1">
          <div className="w-16 h-1.5 rounded-full bg-surface-container-high overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{ width: `${a.pct ?? 0}%`, backgroundColor: (a.pct ?? 0) >= 50 ? "var(--color-tertiary, #006a60)" : "var(--color-error, #ba1a1a)" }}
            ></div>
          </div>
          <span className="text-xs text-on-surface-variant">{a.pct}%</span>
        </div>
        {a.duration_seconds > 0 && <p className="text-[11px] text-on-surface-variant">{fmtDuration(a.duration_seconds)}</p>}
      </div>
    </div>
  );
}

function NotifRow({ n }: { n: UserNotif }) {
  return (
    <div className={`flex items-start gap-3 px-4 py-3 ${!n.read ? "bg-surface-container/40" : ""}`}>
      <span className={`material-symbols-outlined text-sm mt-0.5 ${n.icon === "campaign" ? "text-tertiary" : "text-on-surface-variant"}`}>
        {n.icon}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-on-surface">{n.title}</p>
        <p className="text-xs text-on-surface-variant">{n.body}</p>
      </div>
      <div className="text-right shrink-0">
        <span className="text-xs text-on-surface-variant">{n.relative}</span>
        {!n.read && <span className="block mt-1 h-2 w-2 rounded-full bg-primary ml-auto"></span>}
      </div>
    </div>
  );
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const me = await getCurrentUser();
  if (!me) redirect("/connexion-edukora");
  if (me.role !== "admin") redirect("/accueil-edukora");

  const { id } = await params;
  const detail = getUserDetail(Number(id));
  if (!detail.user) redirect("/espace-admin/utilisateurs");
  const u = detail.user;
  const isSelf = u.id === me.id;
  const initials = `${u.first_name[0]}${u.last_name[0]}`.toUpperCase();

  return (
    <AdminShell active="users">
      <div className="mb-6 flex items-center gap-2 text-sm text-on-surface-variant">
        <Link href="/espace-admin/utilisateurs" className="flex items-center gap-1 hover:text-primary transition-colors">
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          Utilisateurs
        </Link>
        <span className="material-symbols-outlined text-sm">chevron_right</span>
        <span className="text-on-surface">{u.first_name} {u.last_name}</span>
      </div>

      <section className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-primary-fixed flex items-center justify-center text-on-primary-fixed font-bold text-xl shrink-0">
            {initials}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="font-display text-2xl font-bold text-on-surface">{u.first_name} {u.last_name}</h2>
              <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${ROLE_BADGE[u.role] ?? "bg-surface-container-high"}`}>
                {ROLE_LABEL[u.role] ?? u.role}
              </span>
              {u.blocked ? (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold bg-error-container text-on-error-container">
                  <span className="material-symbols-outlined text-sm">block</span> Bloqué
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold bg-tertiary-container text-on-tertiary-container">
                  <span className="material-symbols-outlined text-sm">check_circle</span> Actif
                </span>
              )}
            </div>
            <p className="text-on-surface-variant mt-1">
              #{u.id}{isSelf ? " • vous" : ""} — Inscrit le {fmtDate(u.created_at)}
              {u.last_active ? ` — Activité le ${fmtDate(u.last_active)}` : " — Jamais connecté"}
            </p>
          </div>
          {!isSelf && (
            <div className="flex flex-wrap items-center gap-2 md:justify-end">
              <RoleSelect userId={u.id} current={u.role} />
              <NotifyButton userId={u.id} userName={`${u.first_name} ${u.last_name}`} />
              <ResetPasswordButton userId={u.id} userName={`${u.first_name} ${u.last_name}`} />
              <BlockButton userId={u.id} blocked={!!u.blocked} />
              <DeleteUserButton userId={u.id} userName={`${u.first_name} ${u.last_name}`} />
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
          <div className="bg-surface-container rounded-xl p-4">
            <p className="text-xs text-on-surface-variant">XP total</p>
            <p className="text-2xl font-bold text-on-surface">{u.xp}</p>
          </div>
          <div className="bg-surface-container rounded-xl p-4">
            <p className="text-xs text-on-surface-variant">Série de jours</p>
            <p className="text-2xl font-bold text-on-surface">{u.streak} j</p>
          </div>
          <div className="bg-surface-container rounded-xl p-4">
            <p className="text-xs text-on-surface-variant">Classe / Série</p>
            <p className="text-lg font-bold text-on-surface">{u.class_level ?? "—"}</p>
            {u.serie_name && <p className="text-xs text-on-surface-variant">{u.serie_name}</p>}
          </div>
          <div className="bg-surface-container rounded-xl p-4">
            <p className="text-xs text-on-surface-variant">Contact</p>
            <p className="text-sm font-semibold text-on-surface truncate">{u.email ?? "—"}</p>
            <p className="text-xs text-on-surface-variant">{u.phone ?? ""}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-3">
          <div className="rounded-xl border border-outline-variant p-4">
            <p className="text-xs text-on-surface-variant">Quiz terminés</p>
            <p className="text-2xl font-bold text-primary">{detail.totals.quizzes}</p>
          </div>
          <div className="rounded-xl border border-outline-variant p-4">
            <p className="text-xs text-on-surface-variant">Examens blancs</p>
            <p className="text-2xl font-bold text-primary">{detail.totals.exams}</p>
          </div>
          <div className="rounded-xl border border-outline-variant p-4">
            <p className="text-xs text-on-surface-variant">Messages forum</p>
            <p className="text-2xl font-bold text-primary">{detail.totals.forum_posts}</p>
          </div>
          <div className="rounded-xl border border-outline-variant p-4">
            <p className="text-xs text-on-surface-variant">Badges obtenus</p>
            <p className="text-2xl font-bold text-primary">{detail.totals.badges}</p>
          </div>
          <div className="rounded-xl border border-outline-variant p-4">
            <p className="text-xs text-on-surface-variant">Notifs non lues</p>
            <p className="text-2xl font-bold text-primary">{detail.totals.notifications_unread}</p>
          </div>
        </div>
      </section>

      <section className="mb-6">
        <h3 className="font-display text-lg font-bold text-on-surface mb-3">Badges</h3>
        {detail.badges.length === 0 ? (
          <div className="bg-surface-container-lowest border border-dashed border-outline-variant rounded-xl p-6 text-center text-on-surface-variant">
            Aucun badge obtenu pour le moment.
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {detail.badges.map((b) => (
              <div key={b.id} className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 flex items-start gap-3">
                <span className="material-symbols-outlined text-2xl text-primary shrink-0">{b.icon}</span>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-on-surface">{b.name}</p>
                  <p className="text-xs text-on-surface-variant line-clamp-2">{b.description}</p>
                  <p className="text-[11px] text-on-surface-variant mt-1">Obtenu {b.relative}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="mb-6">
        <h3 className="font-display text-lg font-bold text-on-surface mb-3">
          Tentatives d'évaluation ({detail.attempts.length})
        </h3>
        {detail.attempts.length === 0 ? (
          <div className="bg-surface-container-lowest border border-dashed border-outline-variant rounded-xl p-6 text-center text-on-surface-variant">
            Aucune tentative d'évaluation.
          </div>
        ) : (
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden divide-y divide-outline-variant">
            {detail.attempts.map((a) => (
              <AttemptRow key={`${a.kind}-${a.id}`} a={a} />
            ))}
          </div>
        )}
      </section>

      <section>
        <h3 className="font-display text-lg font-bold text-on-surface mb-3">
          Historique des notifications ({detail.notifications.length})
        </h3>
        {detail.notifications.length === 0 ? (
          <div className="bg-surface-container-lowest border border-dashed border-outline-variant rounded-xl p-6 text-center text-on-surface-variant">
            Aucune notification envoyée.
          </div>
        ) : (
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden divide-y divide-outline-variant">
            {detail.notifications.map((n) => (
              <NotifRow key={n.id} n={n} />
            ))}
          </div>
        )}
      </section>
    </AdminShell>
  );
}
