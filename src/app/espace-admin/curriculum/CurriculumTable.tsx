"use client";

import { useState } from "react";
import { getCsrfToken } from "@/lib/csrf-client";

interface CurriculumRow {
  id: number;
  grade_id: number;
  grade_name: string;
  grade_code: string;
  subject_id: number;
  subject_name: string;
  subject_code: string;
  official_ref: string | null;
  year: number | null;
  status: string;
  created_at: string;
}

interface GradeRow {
  id: number;
  code: string;
  name: string;
  cycle: string;
  order_index: number;
}

interface SubjectRow {
  id: number;
  code: string;
  name: string;
  icon: string;
  color: string;
}

interface CurriculumTableProps {
  curricula: CurriculumRow[];
  grades: GradeRow[];
  subjects: SubjectRow[];
}

function MaterialIcon({ name }: { name: string }) {
  return <span className="material-symbols-outlined text-base">{name}</span>;
}

export default function CurriculumTable({ curricula, grades, subjects }: CurriculumTableProps) {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editing, setEditing] = useState<CurriculumRow | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    grade_id: "",
    subject_id: "",
    official_ref: "",
    year: new Date().getFullYear().toString(),
    status: "active",
  });

  const resetForm = () => {
    setFormData({
      grade_id: "",
      subject_id: "",
      official_ref: "",
      year: new Date().getFullYear().toString(),
      status: "active",
    });
    setEditing(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const token = await getCsrfToken();
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (token) headers["x-csrf-token"] = token;

      const url = editing
        ? `/api/admin/content/curriculum/${editing.id}`
        : "/api/admin/content/curriculum";
      const method = editing ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers,
        body: JSON.stringify({
          grade_id: Number(formData.grade_id),
          subject_id: Number(formData.subject_id),
          official_ref: formData.official_ref || undefined,
          year: formData.year ? Number(formData.year) : undefined,
          status: formData.status,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Erreur");
      window.location.reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur inconnue");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Supprimer ce curriculum ?")) return;
    try {
      const token = await getCsrfToken();
      const headers: Record<string, string> = {};
      if (token) headers["x-csrf-token"] = token;
      const res = await fetch(`/api/admin/content/curriculum/${id}`, {
        method: "DELETE",
        headers,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Erreur");
      window.location.reload();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Erreur");
    }
  };

  return (
    <>
      <section className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 border-b border-outline-variant">
          <div className="font-headline-md text-on-surface">Programmes officiels ({curricula.length})</div>
          <button
            type="button"
            onClick={() => { resetForm(); setIsCreateOpen(true); }}
            className="ml-auto sm:ml-0 inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold bg-primary text-on-primary hover:bg-primary/90 transition-colors"
          >
            <span className="material-symbols-outlined">add</span>
            Nouveau curriculum
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-surface-container-high/60 text-label-xs uppercase tracking-wider text-on-surface-variant">
              <tr>
                <th className="px-6 py-3">Niveau</th>
                <th className="px-6 py-3">Matière</th>
                <th className="px-6 py-3">Référence officielle</th>
                <th className="px-6 py-3">Année</th>
                <th className="px-6 py-3">Statut</th>
                <th className="px-6 py-3">Créé le</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              {curricula.map((c) => (
                <tr key={c.id} className="hover:bg-surface-container transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-on-surface">{c.grade_name}</div>
                    <div className="text-label-sm text-on-surface-variant">{c.grade_code}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-on-surface">{c.subject_name}</div>
                    <div className="text-label-sm text-on-surface-variant">{c.subject_code}</div>
                  </td>
                  <td className="px-6 py-4 text-on-surface">{c.official_ref ?? "—"}</td>
                  <td className="px-6 py-4 text-on-surface">{c.year ?? "—"}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${c.status === "active" ? "bg-tertiary-container text-on-tertiary-container" : c.status === "draft" ? "bg-warning-container text-on-warning-container" : "bg-outline-variant text-on-surface-variant"}`}>
                      {c.status === "active" ? "Actif" : c.status === "draft" ? "Brouillon" : "Archivé"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-label-sm text-on-surface-variant">{c.created_at.slice(0, 10)}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => { setFormData({ grade_id: String(c.grade_id), subject_id: String(c.subject_id), official_ref: c.official_ref ?? "", year: String(c.year ?? ""), status: c.status }); setEditing(c); }}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-label-sm font-medium border border-outline-variant text-on-surface hover:bg-surface-container-high transition-colors"
                      >
                        <span className="material-symbols-outlined text-sm">edit</span>
                        Modifier
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(c.id)}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-label-sm font-medium border border-error text-error hover:bg-error-container transition-colors"
                      >
                        <span className="material-symbols-outlined text-sm">delete</span>
                        Supprimer
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Create/Edit Dialog */}
      {(isCreateOpen || editing) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4" onClick={() => { setIsCreateOpen(false); resetForm(); }}>
          <div className="bg-surface dark:bg-inverse-surface rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-4 border-b border-outline-variant flex items-center justify-between">
              <div>
                <h2 className="font-headline-md text-on-surface">{editing ? "Modifier le curriculum" : "Nouveau curriculum"}</h2>
                <p className="text-on-surface-variant font-body-sm mt-0.5">Associez un niveau (grade) à une matière pour définir le programme officiel.</p>
              </div>
              <button onClick={() => { setIsCreateOpen(false); resetForm(); }} className="p-1 text-on-surface-variant hover:bg-surface-container-high rounded-full" aria-label="Fermer">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              {error && <div className="bg-error-container text-on-error-container p-3 rounded-lg text-sm">{error}</div>}
              <div className="space-y-2">
                <label className="block text-label-md font-medium text-on-surface">Niveau (Grade) *</label>
                <select
                  value={formData.grade_id}
                  onChange={(e) => setFormData({ ...formData, grade_id: e.target.value })}
                  required
                  className="w-full px-3 py-2 rounded-lg border border-outline-variant bg-surface text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Choisir un niveau</option>
                  {grades.map((g) => (
                    <option key={g.id} value={String(g.id)}>{g.name} ({g.code})</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-label-md font-medium text-on-surface">Matière *</label>
                <select
                  value={formData.subject_id}
                  onChange={(e) => setFormData({ ...formData, subject_id: e.target.value })}
                  required
                  className="w-full px-3 py-2 rounded-lg border border-outline-variant bg-surface text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Choisir une matière</option>
                  {subjects.map((s) => (
                    <option key={s.id} value={String(s.id)}>{s.name} ({s.code})</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-label-md font-medium text-on-surface">Référence officielle</label>
                <input
                  type="text"
                  value={formData.official_ref}
                  onChange={(e) => setFormData({ ...formData, official_ref: e.target.value })}
                  placeholder="Ex: BO MENAET 2024"
                  className="w-full px-3 py-2 rounded-lg border border-outline-variant bg-surface text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-label-md font-medium text-on-surface">Année *</label>
                <input
                  type="number"
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  min="2020"
                  max="2030"
                  required
                  className="w-full px-3 py-2 rounded-lg border border-outline-variant bg-surface text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-label-md font-medium text-on-surface">Statut</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-outline-variant bg-surface text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="active">Actif</option>
                  <option value="draft">Brouillon</option>
                  <option value="archived">Archivé</option>
                </select>
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => { setIsCreateOpen(false); resetForm(); }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium border border-outline-variant text-on-surface hover:bg-surface-container-high transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium bg-primary text-on-primary hover:bg-primary/90 disabled:opacity-50 transition-colors"
                >
                  {loading ? <span className="animate-spin material-symbols-outlined">refresh</span> : editing ? "Enregistrer" : "Créer"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}