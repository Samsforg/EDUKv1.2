"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Modal } from "./Modal";
import { ConfirmButton } from "./ConfirmButton";
import type { AdminLeagueChallenge } from "@/lib/admin-content";

const LIGUE_NAMES: Record<string, string> = {
  bronze: "Ligue Bronze",
  argent: "Ligue Argent",
  or: "Ligue Or",
  diamant: "Ligue Diamant",
  maitre: "Ligue Maître",
};

const GOAL_TYPES = ["quiz_done", "quiz_perfect", "forum_replies", "xp_total"] as const;
const REWARD_TYPES = ["xp", "badge"] as const;

function LeagueChallengeModal({
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
  challenge?: AdminLeagueChallenge;
}) {
  const [ligue, setLigue] = useState(challenge?.ligue ?? "bronze");
  const [title, setTitle] = useState(challenge?.title ?? "");
  const [icon, setIcon] = useState(challenge?.icon ?? "flag");
  const [color, setColor] = useState(challenge?.color ?? "primary");
  const [description, setDescription] = useState(challenge?.description ?? "");
  const [goalType, setGoalType] = useState(challenge?.goal_type ?? "quiz_done");
  const [goalValue, setGoalValue] = useState(challenge?.goal_value ?? 1);
  const [rewardType, setRewardType] = useState(challenge?.reward_type ?? "xp");
  const [rewardLabel, setRewardLabel] = useState(challenge?.reward_label ?? "");
  const [rewardValue, setRewardValue] = useState(challenge?.reward_value ?? "");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) {
      setError("Titre requis");
      return;
    }
    if (!goalValue || goalValue < 1) {
      setError("Valeur d'objectif invalide (>= 1)");
      return;
    }
    if (rewardType === "xp") {
      const val = Number(rewardValue);
      if (Number.isNaN(val) || val < 1) {
        setError("Valeur XP invalide (entier >= 1)");
        return;
      }
    }
    if (!rewardLabel.trim()) {
      setError("Libellé de récompense requis");
      return;
    }
    if (!rewardValue.trim()) {
      setError("Valeur de récompense requise");
      return;
    }

    setBusy(true);
    setError("");
    try {
      const res =
        mode === "create"
          ? await fetch("/api/admin/content/league_challenge", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                ligue,
                title,
                icon,
                color,
                description,
                goal_type: goalType,
                goal_value: goalValue,
                reward_type: rewardType,
                reward_label: rewardLabel,
                reward_value: rewardValue,
              }),
            })
          : await fetch(`/api/admin/content/league_challenge/${challenge?.id}`, {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                ligue,
                title,
                icon,
                color,
                description,
                goal_type: goalType,
                goal_value: goalValue,
                reward_type: rewardType,
                reward_label: rewardLabel,
                reward_value: rewardValue,
              }),
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
    <Modal open={open} onClose={onClose} title={mode === "create" ? "Ajouter un défi de ligue" : "Modifier le défi de ligue"}>
      <form onSubmit={submit} className="space-y-3">
        <div>
          <label className="block text-label-xs text-on-surface-variant mb-1">Ligue</label>
          <select value={ligue} onChange={(e) => setLigue(e.target.value)} className="w-full bg-surface-container-high text-on-surface text-sm rounded-lg px-3 py-2 border border-outline-variant focus:outline-none focus:border-primary">
            {Object.entries(LIGUE_NAMES).map(([key, name]) => (
              <option key={key} value={key}>{name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-label-xs text-on-surface-variant mb-1">Titre</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Ex. Premiers Pas" className="w-full bg-surface-container-high text-on-surface text-sm rounded-lg px-3 py-2 border border-outline-variant focus:outline-none focus:border-primary" />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-label-xs text-on-surface-variant mb-1">Icône</label>
            <input value={icon} onChange={(e) => setIcon(e.target.value)} placeholder="flag" className="w-full bg-surface-container-high text-on-surface text-sm rounded-lg px-3 py-2 border border-outline-variant focus:outline-none focus:border-primary" />
          </div>
          <div>
            <label className="block text-label-xs text-on-surface-variant mb-1">Couleur</label>
            <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="w-full h-9 rounded-lg border border-outline-variant cursor-pointer bg-transparent" />
          </div>
        </div>
        <div>
          <label className="block text-label-xs text-on-surface-variant mb-1">Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" className="w-full bg-surface-container-high text-on-surface text-sm rounded-lg px-3 py-2 border border-outline-variant focus:outline-none focus:border-primary min-h-[80px]" />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-label-xs text-on-surface-variant mb-1">Type d'objectif</label>
            <select value={goalType} onChange={(e) => setGoalType(e.target.value)} className="w-full bg-surface-container-high text-on-surface text-sm rounded-lg px-3 py-2 border border-outline-variant focus:outline-none focus:border-primary">
              {GOAL_TYPES.map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-label-xs text-on-surface-variant mb-1">Valeur d'objectif</label>
            <input type="number" value={goalValue} onChange={(e) => setGoalValue(Number(e.target.value))} min="1" className="w-full bg-surface-container-high text-on-surface text-sm rounded-lg px-3 py-2 border border-outline-variant focus:outline-none focus:border-primary" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-label-xs text-on-surface-variant mb-1">Type de récompense</label>
            <select value={rewardType} onChange={(e) => setRewardType(e.target.value)} className="w-full bg-surface-container-high text-on-surface text-sm rounded-lg px-3 py-2 border border-outline-variant focus:outline-none focus:border-primary">
              {REWARD_TYPES.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-label-xs text-on-surface-variant mb-1">Valeur de récompense</label>
            <input value={rewardValue} onChange={(e) => setRewardValue(e.target.value)} placeholder="50" className="w-full bg-surface-container-high text-on-surface text-sm rounded-lg px-3 py-2 border border-outline-variant focus:outline-none focus:border-primary" />
          </div>
        </div>
        <div>
          <label className="block text-label-xs text-on-surface-variant mb-1">Libellé de récompense</label>
          <input value={rewardLabel} onChange={(e) => setRewardLabel(e.target.value)} placeholder="Ex. +50 XP" className="w-full bg-surface-container-high text-on-surface text-sm rounded-lg px-3 py-2 border border-outline-variant focus:outline-none focus:border-primary" />
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

export function LeagueChallengesManager({ initialChallenges }: { initialChallenges: AdminLeagueChallenge[] }) {
  const router = useRouter();
  const [createOpen, setCreateOpen] = useState(false);
  const [editing, setEditing] = useState<AdminLeagueChallenge | null>(null);

  function refresh() {
    router.refresh();
  }

  async function remove(challenge: AdminLeagueChallenge) {
    const res = await fetch(`/api/admin/content/league_challenge/${challenge.id}`, { method: "DELETE" });
    if (res.ok) refresh();
  }

  const ligueColors: Record<string, string> = {
    bronze: "bg-orange-100 text-orange-800",
    argent: "bg-gray-200 text-gray-700",
    or: "bg-yellow-100 text-yellow-800",
    diamant: "bg-cyan-100 text-cyan-800",
    maitre: "bg-purple-100 text-purple-800",
  };

  return (
    <section className="mt-10">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-display text-lg font-bold text-on-surface">Défis de ligue ({initialChallenges.length})</h3>
        <button onClick={() => setCreateOpen(true)} className="flex items-center gap-1 bg-primary text-on-primary rounded-lg px-3 py-2 text-label-sm font-semibold hover:opacity-90 transition-opacity">
          <span className="material-symbols-outlined text-sm">add</span>
          Ajouter un défi
        </button>
      </div>
      {initialChallenges.length === 0 ? (
        <div className="bg-surface-container-lowest border border-dashed border-outline-variant rounded-xl p-6 text-center text-on-surface-variant">
          Aucun défi de ligue pour le moment.
        </div>
      ) : (
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden divide-y divide-outline-variant">
          {initialChallenges.map((c) => (
            <div key={c.id} className="flex items-center gap-3 px-4 py-3 hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-tertiary">{c.icon || "flag"}</span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-on-surface truncate">{c.title}</p>
                <p className="text-xs text-on-surface-variant truncate">
                  {c.ligue_name} • {c.goal_type.replace("_", " ")} {c.goal_value} • {c.reward_label}
                </p>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${ligueColors[c.ligue] ?? "bg-primary-container text-on-primary-container"} shrink-0`}>
                {c.ligue_name}
              </span>
              <span className="text-xs text-on-surface-variant shrink-0">
                {c.completed_count}/{c.attempted_count} complété{c.completed_count > 1 ? "s" : ""}
              </span>
              <button onClick={() => setEditing(c)} className="flex items-center gap-1 px-2 py-1 rounded-lg text-label-xs font-semibold text-on-surface-variant hover:bg-surface-container-high transition-colors shrink-0" title="Modifier">
                <span className="material-symbols-outlined text-sm">edit</span>
                Modifier
              </button>
              <ConfirmButton label="Supprimer" onConfirm={() => remove(c)} title="Supprimer ce défi de ligue" />
            </div>
          ))}
        </div>
      )}

      <LeagueChallengeModal open={createOpen} onClose={() => setCreateOpen(false)} onSaved={refresh} mode="create" />
      <LeagueChallengeModal open={!!editing} onClose={() => setEditing(null)} onSaved={refresh} mode="edit" challenge={editing ?? undefined} />
    </section>
  );
}
