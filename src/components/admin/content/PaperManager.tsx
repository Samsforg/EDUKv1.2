"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Modal } from "./Modal";
import { ConfirmButton } from "./ConfirmButton";
import { QuestionsModal } from "./QuestionsModal";
import type { AdminPaper } from "@/lib/admin-content";

function PaperModal({
  open,
  onClose,
  onSaved,
  mode,
  paper,
  subjectId,
  series,
}: {
  open: boolean;
  onClose: () => void;
  onSaved: (id?: number, title?: string) => void;
  mode: "create" | "edit";
  paper?: AdminPaper;
  subjectId: number;
  series: { id: number; code: string; name: string }[];
}) {
  const [title, setTitle] = useState(paper?.title ?? "");
  const [category, setCategory] = useState(paper?.category ?? "BAC");
  const [year, setYear] = useState(paper?.year?.toString() ?? String(new Date().getFullYear()));
  const [duration, setDuration] = useState(paper?.duration_minutes?.toString() ?? "120");
  const [seriesId, setSeriesId] = useState(paper?.series_id?.toString() ?? "");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) {
      setError("Titre requis");
      return;
    }
    setBusy(true);
    setError("");
    try {
      const payload = {
        title,
        category,
        year: Number(year) || new Date().getFullYear(),
        duration_minutes: Number(duration) || 120,
        series_id: seriesId ? Number(seriesId) : null,
      };
      const res =
        mode === "create"
          ? await fetch("/api/admin/content/paper", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ ...payload, subject_id: subjectId }),
            })
          : await fetch(`/api/admin/content/paper/${paper?.id}`, {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload),
            });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Erreur");
        return;
      }
      onSaved(mode === "create" ? data.id : undefined, title);
      onClose();
    } catch {
      setError("Erreur réseau");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Modal open={open} onClose={onClose} title={mode === "create" ? "Nouveau sujet d'examen" : "Modifier le sujet"}>
      <form onSubmit={submit} className="space-y-3">
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Titre (ex. BAC Blanc 2025)" className="w-full bg-surface-container-high text-on-surface text-sm rounded-lg px-3 py-2 border border-outline-variant focus:outline-none focus:border-primary" />
        <div className="grid grid-cols-2 gap-2">
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="bg-surface-container-high text-on-surface text-sm rounded-lg px-3 py-2 border border-outline-variant focus:outline-none focus:border-primary">
            <option value="BAC">BAC</option>
            <option value="BEPC">BEPC</option>
          </select>
          <input type="number" min={2000} max={2100} value={year} onChange={(e) => setYear(e.target.value)} placeholder="Année" className="bg-surface-container-high text-on-surface text-sm rounded-lg px-3 py-2 border border-outline-variant focus:outline-none focus:border-primary" />
          <select value={seriesId} onChange={(e) => setSeriesId(e.target.value)} className="bg-surface-container-high text-on-surface text-sm rounded-lg px-3 py-2 border border-outline-variant focus:outline-none focus:border-primary">
            <option value="">Série —</option>
            {series.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
          <input type="number" min={10} value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="Durée (min)" className="bg-surface-container-high text-on-surface text-sm rounded-lg px-3 py-2 border border-outline-variant focus:outline-none focus:border-primary" />
        </div>
        {error && <p className="text-xs text-error">{error}</p>}
        <button type="submit" disabled={busy} className="w-full flex items-center justify-center gap-1 bg-primary text-on-primary rounded-lg px-4 py-2 text-label-sm font-semibold hover:opacity-90 disabled:opacity-50">
          {busy ? <span className="material-symbols-outlined text-sm animate-spin">progress_activity</span> : <span className="material-symbols-outlined text-sm">save</span>}
          {mode === "create" ? "Créer le sujet" : "Enregistrer"}
        </button>
      </form>
    </Modal>
  );
}

export function PaperManager({
  subjectId,
  initialPapers,
  series,
}: {
  subjectId: number;
  initialPapers: AdminPaper[];
  series: { id: number; code: string; name: string }[];
}) {
  const router = useRouter();
  const [createOpen, setCreateOpen] = useState(false);
  const [editing, setEditing] = useState<AdminPaper | null>(null);
  const [questionsFor, setQuestionsFor] = useState<AdminPaper | null>(null);

  function refresh() {
    router.refresh();
  }

  async function remove(paper: AdminPaper) {
    const res = await fetch(`/api/admin/content/paper/${paper.id}`, { method: "DELETE" });
    if (res.ok) refresh();
  }

  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-display text-lg font-bold text-on-surface">Sujets d'examen ({initialPapers.length})</h3>
        <button onClick={() => setCreateOpen(true)} className="flex items-center gap-1 bg-primary text-on-primary rounded-lg px-3 py-2 text-label-sm font-semibold hover:opacity-90 transition-opacity">
          <span className="material-symbols-outlined text-sm">add</span>
          Ajouter un sujet
        </button>
      </div>
      {initialPapers.length === 0 ? (
        <div className="bg-surface-container-lowest border border-dashed border-outline-variant rounded-xl p-6 text-center text-on-surface-variant">
          Aucun sujet d'examen dans cette matière.
        </div>
      ) : (
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden divide-y divide-outline-variant">
          {initialPapers.map((p) => (
            <div key={p.id} className="flex items-center gap-3 px-4 py-3 hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-tertiary">description</span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-on-surface truncate">{p.title}</p>
                <p className="text-xs text-on-surface-variant truncate">
                  {p.category} {p.year} • {p.series_name ?? "Sans série"} • {p.duration_minutes} min • {p.question_count} question{p.question_count > 1 ? "s" : ""} • {p.attempts} tentative{p.attempts > 1 ? "s" : ""}
                </p>
              </div>
              {p.status !== "approved" && (
                <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-tertiary-container text-on-tertiary-container shrink-0">en attente</span>
              )}
              <button onClick={() => setQuestionsFor(p)} className="flex items-center gap-1 px-2 py-1 rounded-lg text-label-xs font-semibold text-on-surface-variant hover:bg-surface-container-high transition-colors shrink-0" title="Éditer les questions">
                <span className="material-symbols-outlined text-sm">help</span>
                Questions
              </button>
              <button onClick={() => setEditing(p)} className="flex items-center gap-1 px-2 py-1 rounded-lg text-label-xs font-semibold text-on-surface-variant hover:bg-surface-container-high transition-colors shrink-0" title="Modifier">
                <span className="material-symbols-outlined text-sm">edit</span>
                Modifier
              </button>
              <ConfirmButton label="Supprimer" onConfirm={() => remove(p)} title="Supprimer le sujet, ses questions et les résultats associés" />
            </div>
          ))}
        </div>
      )}

      <PaperModal open={createOpen} onClose={() => setCreateOpen(false)} onSaved={(id, title) => {
        if (id) setQuestionsFor({ id, title: title ?? "", category: "BAC", series_id: null, series_name: null, year: Number(new Date().getFullYear()), duration_minutes: 120, status: "approved", question_count: 0, attempts: 0 });
      }} mode="create" subjectId={subjectId} series={series} />
      <PaperModal open={!!editing} onClose={() => setEditing(null)} onSaved={() => {}} mode="edit" paper={editing ?? undefined} subjectId={subjectId} series={series} />
      <QuestionsModal open={!!questionsFor} onClose={() => setQuestionsFor(null)} onSaved={refresh} id={questionsFor?.id ?? 0} title={questionsFor?.title ?? ""} />
    </section>
  );
}