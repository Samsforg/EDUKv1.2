"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Modal } from "./Modal";
import { ConfirmButton } from "./ConfirmButton";
import type { AdminChallenge } from "@/lib/admin-content";

const CHALLENGE_CATEGORIES = ["National", "Défi de la Semaine", "Série Scientifique", "Spécial BAC", "Communal"] as const;
const CHALLENGE_STATUSES = ["upcoming", "active", "ended"] as const;

const STATUS_LABELS: Record<string, string> = {
  upcoming: "À venir",
  active: "Actif",
  ended: "Terminé",
};

const STATUS_STYLES: Record<string, string> = {
  upcoming: "bg-secondary-container text-on-secondary-container",
  active: "bg-primary-container text-on-primary-container",
  ended: "bg-surface-container-high text-on-surface-variant",
};

function ChallengeModal({
  open,
  onClose,
  onSaved,
  mode,
  challenge,
}: {
  open: boolean;
  onClose: () => void;
  onSaved: () => void;
  mode: "create" | "edit";
  challenge?: AdminChallenge;
}) {
  const [name, setName] = useState(challenge?.name ?? "");
  const [category, setCategory] = useState(challenge?.category ?? "National");
  const [communeA, setCommuneA] = useState(challenge?.commune_a ?? "");
  const [communeB, setCommuneB] = useState(challenge?.commune_b ?? "");
  const [description, setDescription] = useState(challenge?.description ?? "");
  const [rewardDesc, setRewardDesc] = useState(challenge?.reward_desc ?? "");
  const [status, setStatus] = useState(challenge?.status ?? "upcoming");
  const [startsAt, setStartsAt] = useState(challenge?.starts_at?.slice(0, 16) ?? "");
  const [endsAt, setEndsAt] = useState(challenge?.ends_at?.slice(0, 16) ?? "");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) {
      setError("Nom requis");
      return;
    }
    if (!communeA.trim() || !communeB.trim()) {
      setError("Deux communes requises");
      return;
    }
    if (!startsAt || !endsAt) {
      setError("Dates de début et fin requises");
      return;
    }
    if (new Date(endsAt).getTime() <= new Date(startsAt).getTime()) {
      setError("La date de fin doit être après le début");
      return;
    }

    setBusy(true);
    setError("");
    try {
      const payload = { name, category, commune_a: communeA, commune_b: communeB, description, reward_desc: rewardDesc, status, starts_at: startsAt, ends_at: endsAt };
      const res =
        mode === "create"
          ? await fetch("/api/admin/content/challenge", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload),
            })
          : await fetch(`/api/admin/content/challenge/${challenge?.id}`, {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload),
            });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Erreur");
        return;
      }
      onSaved();
      onClose();
    } catch {
      setError("Erreur réseau");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Modal open={open} onClose={onClose} title={mode === "create" ? "Ajouter un défi communautaire" : "Modifier le défi communautaire"}>
      <form onSubmit={submit} className="space-y-3">
        <div>
          <label className="block text-label-xs text-on-surface-variant mb-1">Nom du défi</label>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ex. Défi de la Semaine" className="w-full bg-surface-container-high text-on-surface text-sm rounded-lg px-3 py-2 border border-outline-variant focus:outline-none focus:border-primary" />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-label-xs text-on-surface-variant mb-1">Catégorie</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full bg-surface-container-high text-on-surface text-sm rounded-lg px-3 py-2 border border-outline-variant focus:outline-none focus:border-primary">
              {CHALLENGE_CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-label-xs text-on-surface-variant mb-1">Statut</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full bg-surface-container-high text-on-surface text-sm rounded-lg px-3 py-2 border border-outline-variant focus:outline-none focus:border-primary">
              {CHALLENGE_STATUSES.map((s) => (
                <option key={s} value={s}>{STATUS_LABELS[s]}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-label-xs text-on-surface-variant mb-1">Commune A</label>
            <input value={communeA} onChange={(e) => setCommuneA(e.target.value)} placeholder="Ex. Douala" className="w-full bg-surface-container-high text-on-surface text-sm rounded-lg px-3 py-2 border border-outline-variant focus:outline-none focus:border-primary" />
          </div>
          <div>
            <label className="block text-label-xs text-on-surface-variant mb-1">Commune B</label>
            <input value={communeB} onChange={(e) => setCommuneB(e.target.value)} placeholder="Ex. Yaoundé" className="w-full bg-surface-container-high text-on-surface text-sm rounded-lg px-3 py-2 border border-outline-variant focus:outline-none focus:border-primary" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-label-xs text-on-surface-variant mb-1">Début</label>
            <input type="datetime-local" value={startsAt} onChange={(e) => setStartsAt(e.target.value)} className="w-full bg-surface-container-high text-on-surface text-sm rounded-lg px-3 py-2 border border-outline-variant focus:outline-none focus:border-primary" />
          </div>
          <div>
            <label className="block text-label-xs text-on-surface-variant mb-1">Fin</label>
            <input type="datetime-local" value={endsAt} onChange={(e) => setEndsAt(e.target.value)} className="w-full bg-surface-container-high text-on-surface text-sm rounded-lg px-3 py-2 border border-outline-variant focus:outline-none focus:border-primary" />
          </div>
        </div>
        <div>
          <label className="block text-label-xs text-on-surface-variant mb-1">Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description du défi" className="w-full bg-surface-container-high text-on-surface text-sm rounded-lg px-3 py-2 border border-outline-variant focus:outline-none focus:border-primary min-h-[80px]" />
        </div>
        <div>
          <label className="block text-label-xs text-on-surface-variant mb-1">Récompense</label>
          <input value={rewardDesc} onChange={(e) => setRewardDesc(e.target.value)} placeholder="Ex. 500 XP" className="w-full bg-surface-container-high text-on-surface text-sm rounded-lg px-3 py-2 border border-outline-variant focus:outline-none focus:border-primary" />
        </div>
        {error && <p className="text-xs text-error">{error}</p>}
        <button type="submit" disabled={busy} className="w-full flex items-center justify-center gap-1 bg-primary text-on-primary rounded-lg px-4 py-2 text-label-sm font-semibold hover:opacity-90 disabled:opacity-50">
          {busy ? <span className="material-symbols-outlined text-sm animate-spin">progress_activity</span> : <span className="material-symbols-outlined text-sm">save</span>}
          {mode === "create" ? "Créer le défi" : "Enregistrer"}
        </button>
      </form>
    </Modal>
  );
}

export function ChallengesManager({ initialChallenges }: { initialChallenges: AdminChallenge[] }) {
  const router = useRouter();
  const [createOpen, setCreateOpen] = useState(false);
  const [editing, setEditing] = useState<AdminChallenge | null>(null);

  function refresh() {
    router.refresh();
  }

  async function remove(challenge: AdminChallenge) {
    const res = await fetch(`/api/admin/content/challenge/${challenge.id}`, { method: "DELETE" });
    if (res.ok) refresh();
  }

  return (
    <section className="mt-10">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-display text-lg font-bold text-on-surface">Défis communautaires ({initialChallenges.length})</h3>
        <button onClick={() => setCreateOpen(true)} className="flex items-center gap-1 bg-primary text-on-primary rounded-lg px-3 py-2 text-label-sm font-semibold hover:opacity-90 transition-opacity">
          <span className="material-symbols-outlined text-sm">add</span>
          Ajouter un défi
        </button>
      </div>
      {initialChallenges.length === 0 ? (
        <div className="bg-surface-container-lowest border border-dashed border-outline-variant rounded-xl p-6 text-center text-on-surface-variant">
          Aucun défi communautaire pour le moment.
        </div>
      ) : (
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden divide-y divide-outline-variant">
          {initialChallenges.map((c) => (
            <div key={c.id} className="flex items-center gap-3 px-4 py-3 hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-tertiary">emoji_events</span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-on-surface truncate">{c.name}</p>
                <p className="text-xs text-on-surface-variant truncate">
                  {c.commune_a} vs {c.commune_b} • {new Date(c.starts_at).toLocaleDateString("fr-FR")} → {new Date(c.ends_at).toLocaleDateString("fr-FR")} • {c.a_xp + c.b_xp} XP • {c.total_contributions} contribution{c.total_contributions > 1 ? "s" : ""}
                </p>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${STATUS_STYLES[c.status] ?? "bg-surface-container-high text-on-surface-variant"} shrink-0`}>
                {STATUS_LABELS[c.status] ?? c.status}
              </span>
              <button onClick={() => setEditing(c)} className="flex items-center gap-1 px-2 py-1 rounded-lg text-label-xs font-semibold text-on-surface-variant hover:bg-surface-container-high transition-colors shrink-0" title="Modifier">
                <span className="material-symbols-outlined text-sm">edit</span>
                Modifier
              </button>
              <ConfirmButton label="Supprimer" onConfirm={() => remove(c)} title="Supprimer ce défi et ses contributions" />
            </div>
          ))}
        </div>
      )}

      <ChallengeModal open={createOpen} onClose={() => setCreateOpen(false)} onSaved={refresh} mode="create" />
      <ChallengeModal open={!!editing} onClose={() => setEditing(null)} onSaved={refresh} mode="edit" challenge={editing ?? undefined} />
    </section>
  );
}
