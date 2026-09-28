"use client";

import { useState } from "react";
import { getCsrfToken } from "@/lib/csrf-client";

interface SubjectGradeRow {
  subject_id: number;
  subject_name: string;
  subject_code: string;
  grade_id: number;
  grade_name: string;
  grade_code: string;
  coefficient: number;
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

interface CoefficientsTableProps {
  subjectGrades: {
    subject_id: number;
    subject_name: string;
    subject_code: string;
    grade_id: number;
    grade_name: string;
    grade_code: string;
    coefficient: number;
  }[];
  grades: { id: number; code: string; name: string; cycle: string; order_index: number }[];
  subjects: { id: number; code: string; name: string; icon: string; color: string }[];
}

function CoefficientDialog({ isOpen, onClose, editing, loading, error, formData, onSubmit, onCancel, subjects, grades, resetForm }: {
  isOpen: boolean;
  onClose: () => void;
  editing: { subject_id: number; grade_id: number } | null;
  loading: boolean;
  error: string | null;
  formData: { subject_id: string; grade_id: string; coefficient: string };
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
  subjects: { id: number; code: string; name: string; icon: string; color: string }[];
  grades: { id: number; code: string; name: string; cycle: string; order_index: number }[];
  resetForm: () => void;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4" onClick={onClose}>
      <div className="bg-surface dark:bg-inverse-surface rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="p-4 border-b border-outline-variant flex items-center justify-between">
          <div>
            <h2 className="font-headline-md text-on-surface">Définir un coefficient</h2>
            <p className="text-on-surface-variant font-body-sm mt-0.5">Associez une matière à un niveau avec son coefficient officiel.</p>
          </div>
          <button onClick={onCancel} className="p-1 text-on-surface-variant hover:bg-surface-container-high rounded-full" aria-label="Fermer">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <form onSubmit={onSubmit} className="p-4 space-y-4">
          {error && <div className="bg-error-container text-on-error-container p-3 rounded-lg text-sm">{error}</div>}
          <div className="space-y-2">
            <label className="block text-label-md font-medium text-on-surface">Matière *</label>
            <select
              value={formData.subject_id}
              onChange={(e) => formData.subject_id = e.target.value}
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
            <label className="block text-label-md font-medium text-on-surface">Niveau (Grade) *</label>
            <select
              value={formData.grade_id}
              onChange={(e) => formData.grade_id = e.target.value}
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
            <label className="block text-label-md font-medium text-on-surface">Coefficient *</label>
            <input
              type="number"
              step="0.5"
              min="0"
              value={formData.coefficient}
              onChange={(e) => formData.coefficient = e.target.value}
              required
              className="w-full px-3 py-2 rounded-lg border border-outline-variant bg-surface text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium border border-outline-variant text-on-surface hover:bg-surface-container-high transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium bg-primary text-on-primary hover:bg-primary/90 disabled:opacity-50 transition-colors"
            >
              {loading ? <span className="animate-spin material-symbols-outlined">refresh</span> : "Enregistrer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function CoefficientsTable({ subjectGrades, grades, subjects }: {
  subjectGrades: {
    subject_id: number;
    subject_name: string;
    subject_code: string;
    grade_id: number;
    grade_name: string;
    grade_code: string;
    coefficient: number;
  }[];
  grades: { id: number; code: string; name: string; cycle: string; order_index: number }[];
  subjects: { id: number; code: string; name: string; icon: string; color: string }[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [editing, setEditing] = useState<{ subject_id: number; grade_id: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    subject_id: "",
    grade_id: "",
    coefficient: "",
  });

  const resetForm = () => {
    setFormData({ subject_id: "", grade_id: "", coefficient: "" });
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

      const res = await fetch("/api/admin/content/subject_grade", {
        method: "POST",
        headers,
        body: JSON.stringify({
          subject_id: Number(formData.subject_id),
          grade_id: Number(formData.grade_id),
          coefficient: Number(formData.coefficient),
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

  const handleDelete = async (subjectId: number, gradeId: number) => {
    if (!confirm("Supprimer ce coefficient ?")) return;
    try {
      const token = await getCsrfToken();
      const headers: Record<string, string> = {};
      if (token) headers["x-csrf-token"] = token;
      const res = await fetch(`/api/admin/content/subject_grade?subject_id=${subjectId}&grade_id=${gradeId}`, {
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
          <div className="font-headline-md text-on-surface">Coefficients ({subjectGrades.length})</div>
          <button
            type="button"
            onClick={() => { resetForm(); setIsOpen(true); }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold bg-primary text-on-primary hover:bg-primary/90 transition-colors"
          >
            <span className="material-symbols-outlined">add</span>
            Ajouter / Modifier
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-surface-container-high/60 text-label-xs uppercase tracking-wider text-on-surface-variant">
              <tr>
                <th className="px-6 py-3">Matière</th>
                <th className="px-6 py-3">Niveau</th>
                <th className="px-6 py-3">Coefficient</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              {subjectGrades.map((sg) => (
                <tr key={`${sg.subject_id}-${sg.grade_id}`} className="hover:bg-surface-container transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-on-surface">{sg.subject_name}</div>
                    <div className="text-label-sm text-on-surface-variant">{sg.subject_code}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-on-surface">{sg.grade_name}</div>
                    <div className="text-label-sm text-on-surface-variant">{sg.grade_code}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-mono font-semibold text-on-surface">{sg.coefficient}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      type="button"
                      onClick={() => handleDelete(sg.subject_id, sg.grade_id)}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-label-sm font-medium border border-error text-error hover:bg-error-container transition-colors"
                    >
                      <span className="material-symbols-outlined text-sm">delete</span>
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <CoefficientDialog
        isOpen={isOpen}
        onClose={() => { setIsOpen(false); resetForm(); }}
        editing={editing}
        loading={loading}
        error={error}
        formData={formData}
        onSubmit={(e) => { e.preventDefault(); handleSubmit(e); }}
        onCancel={() => { setIsOpen(false); resetForm(); }}
        subjects={subjects}
        grades={grades}
        resetForm={resetForm}
      />
    </>
  );
}