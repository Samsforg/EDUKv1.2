"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Modal } from "./Modal";
import { ConfirmButton } from "./ConfirmButton";
import type { ContentSubject } from "@/lib/admin";

const ICONS = ["menu_book", "science", "calculate", "translate", "history_edu", "functions", "biotech", "public", "palette", "sports", "music_note", "computer", "account_balance", "flag", "book"];

function SubjectModal({
  open,
  onClose,
  onSaved,
  mode,
  subject,
}: {
  open: boolean;
  onClose: () => void;
  onSaved: () => void;
  mode: "create" | "edit";
  subject?: ContentSubject;
}) {
  const [code, setCode] = useState(subject?.code ?? "");
  const [name, setName] = useState(subject?.name ?? "");
  const [icon, setIcon] = useState(subject?.icon ?? "menu_book");
  const [color, setColor] = useState(subject?.color ?? "#1976d2");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!code.trim() || !name.trim()) {
      setError("Code et nom sont requis");
      return;
    }
    setBusy(true);
    setError("");
    try {
      const res =
        mode === "create"
          ? await fetch("/api/admin/content/subject", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ code, name, icon, color }),
            })
          : await fetch(`/api/admin/content/subject/${subject?.subject_id}`, {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ code, name, icon, color }),
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
    <Modal open={open} onClose={onClose} title={mode === "create" ? "Ajouter une matière" : "Modifier la matière"}>
      <form onSubmit={submit} className="space-y-3">
        <div className="grid grid-cols-2 gap-2">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nom (ex. Mathématiques)" className="bg-surface-container-high text-on-surface text-sm rounded-lg px-3 py-2 border border-outline-variant focus:outline-none focus:border-primary" />
          <input value={code} onChange={(e) => setCode(e.target.value.toUpperCase())} placeholder="Code (ex. MATHS)" className="bg-surface-container-high text-on-surface text-sm rounded-lg px-3 py-2 border border-outline-variant focus:outline-none focus:border-primary" />
        </div>
        <div>
          <p className="text-label-xs text-on-surface-variant mb-1">Icône</p>
          <div className="flex flex-wrap gap-1.5">
            {ICONS.map((i) => (
              <button
                type="button"
                key={i}
                onClick={() => setIcon(i)}
                title={i}
                className={
                  "w-9 h-9 rounded-lg flex items-center justify-center material-symbols-outlined text-base border " +
                  (icon === i ? "bg-primary text-on-primary border-primary" : "bg-surface-container-high text-on-surface-variant border-outline-variant hover:border-primary")
                }
              >
                {i}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="text-label-xs text-on-surface-variant mb-1">Couleur</p>
          <div className="flex items-center gap-2">
            <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="w-10 h-9 rounded-lg border border-outline-variant cursor-pointer bg-transparent" />
            <span className="text-sm text-on-surface-variant">{color}</span>
          </div>
        </div>
        {error && <p className="text-xs text-error">{error}</p>}
        <button type="submit" disabled={busy} className="w-full flex items-center justify-center gap-1 bg-primary text-on-primary rounded-lg px-4 py-2 text-label-sm font-semibold hover:opacity-90 disabled:opacity-50">
          {busy ? <span className="material-symbols-outlined text-sm animate-spin">progress_activity</span> : <span className="material-symbols-outlined text-sm">save</span>}
          {mode === "create" ? "Créer la matière" : "Enregistrer"}
        </button>
      </form>
    </Modal>
  );
}

export function SubjectsManager({ initialSubjects }: { initialSubjects: ContentSubject[] }) {
  const router = useRouter();
  const [createOpen, setCreateOpen] = useState(false);
  const [editing, setEditing] = useState<ContentSubject | null>(null);

  function refresh() {
    router.refresh();
  }

  async function remove(subject: ContentSubject) {
    const res = await fetch(`/api/admin/content/subject/${subject.subject_id}`, { method: "DELETE" });
    if (res.ok) refresh();
  }

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display text-lg font-bold text-on-surface">Matières</h3>
        <button onClick={() => setCreateOpen(true)} className="flex items-center gap-1 bg-primary text-on-primary rounded-lg px-3 py-2 text-label-sm font-semibold hover:opacity-90 transition-opacity">
          <span className="material-symbols-outlined text-sm">add</span>
          Ajouter une matière
        </button>
      </div>

      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-surface-container-high/60 text-label-xs uppercase tracking-wider text-on-surface-variant">
              <tr>
                <th className="px-6 py-3">Matière</th>
                <th className="px-6 py-3">Chapitres</th>
                <th className="px-6 py-3">Leçons</th>
                <th className="px-6 py-3">Quiz</th>
                <th className="px-6 py-3">Sujets</th>
                <th className="px-6 py-3">Questions</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              {initialSubjects.map((s) => (
                <tr key={s.subject_id} className="hover:bg-surface-container transition-colors">
                  <td className="px-6 py-4">
                    <Link href={`/espace-admin/cours/${s.subject_id}`} className="flex items-center gap-3 group">
                      <span className="w-8 h-8 rounded-lg flex items-center justify-center material-symbols-outlined text-base" style={{ backgroundColor: `${s.color}18`, color: s.color }}>
                        {s.icon}
                      </span>
                      <div>
                        <span className="font-semibold text-on-surface group-hover:text-primary transition-colors">{s.name}</span>
                        <span className="block text-xs text-on-surface-variant">code: {s.code}</span>
                      </div>
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-on-surface-variant">{s.chapters}</td>
                  <td className="px-6 py-4 text-on-surface-variant">{s.lessons}</td>
                  <td className="px-6 py-4 text-on-surface-variant">{s.quizzes}</td>
                  <td className="px-6 py-4 text-on-surface-variant">{s.papers}</td>
                  <td className="px-6 py-4 text-on-surface-variant">{s.questions}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => setEditing(s)} className="flex items-center gap-1 px-2 py-1 rounded-lg text-label-xs font-semibold text-on-surface-variant hover:bg-surface-container-high transition-colors" title="Modifier la matière">
                        <span className="material-symbols-outlined text-sm">edit</span>
                        Modifier
                      </button>
                      <ConfirmButton label="Supprimer" onConfirm={() => remove(s)} title="Supprimer la matière et tout son contenu (irréversible)" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <SubjectModal open={createOpen} onClose={() => setCreateOpen(false)} onSaved={refresh} mode="create" />
      <SubjectModal open={!!editing} onClose={() => setEditing(null)} onSaved={refresh} mode="edit" subject={editing ?? undefined} />
    </>
  );
}