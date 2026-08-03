import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import { getForumPosts } from "@/lib/admin";
import { AdminShell } from "@/components/admin/AdminShell";
import { DeletePostButton } from "@/components/admin/DeletePostButton";

export const metadata: Metadata = { title: "Edukora Admin - Modération du forum" };

export default async function Page() {
  const user = await getCurrentUser();
  if (!user) redirect("/connexion-edukora");
  if (user.role !== "admin") redirect("/accueil-edukora");

  const posts = getForumPosts();

  return (
    <AdminShell active="moderation">
      <section className="mb-6">
        <h2 className="font-display text-[28px] md:text-display-lg font-bold text-on-surface">Modération du forum</h2>
        <p className="text-on-surface-variant font-body mt-1">
          {posts.length} sujet{posts.length > 1 ? "s" : ""} publié{posts.length > 1 ? "s" : ""}. Supprimez tout contenu inapproprié.
        </p>
      </section>

      <section className="space-y-4">
        {posts.length === 0 && (
          <div className="bg-surface-container-lowest border border-outline-variant p-8 rounded-xl text-center">
            <p className="text-sm text-on-surface-variant">Aucun sujet sur le forum.</p>
          </div>
        )}
        {posts.map((p) => (
          <div key={p.id} className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <span className="w-8 h-8 rounded-lg flex items-center justify-center material-symbols-outlined text-base shrink-0" style={{ backgroundColor: `${p.category_color}18`, color: p.category_color }}>
                  {p.category_icon}
                </span>
                <div className="min-w-0">
                  <p className="font-semibold text-on-surface truncate">{p.title}</p>
                  <p className="text-xs text-on-surface-variant">
                    {p.category_name} • par {p.author} • {p.relative}
                  </p>
                </div>
              </div>
              <DeletePostButton postId={p.id} />
            </div>
            <p className="mt-3 text-sm text-on-surface-variant line-clamp-3">{p.content}</p>
            <div className="mt-3 flex items-center gap-4 text-xs text-on-surface-variant">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">forum</span>
                {p.replies} réponse{p.replies > 1 ? "s" : ""}
              </span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>thumb_up</span>
                {p.votes} vote{p.votes > 1 ? "s" : ""}
              </span>
            </div>
          </div>
        ))}
      </section>
    </AdminShell>
  );
}
