"use client";

import { useState } from "react";
import { getCsrfToken } from "@/lib/csrf-client";

interface ImportReport {
  createdLessons: number;
  createdChapters: number;
  errors: { row: number; message: string }[];
}

const CSV_TEMPLATE = `classe,matiere,chapitre,titre,resume,contenu,ordre,duree_min,difficulte
"2nde-G2","Comptabilité","Comptabilité générale","Introduction au bilan","Notions de bilan et compte de résultat.","# Introduction au bilan\\n\\nLe bilan présente...",1,15,1
"2nde-G2","Comptabilité","Comptabilité générale","Le compte de résultat","Charges et produits.","# Le compte de résultat\\n\\nLes charges...",2,15,1
`;

const JSON_TEMPLATE = JSON.stringify(
  [
    {
      classe: "2nde-G2",
      matiere: "Comptabilité",
      chapitre: "Comptabilité générale",
      titre: "Introduction au bilan",
      resume: "Notions de bilan et compte de résultat.",
      contenu: "# Introduction au bilan\n\nLe bilan présente...",
      ordre: 1,
      duree_min: 15,
      difficulte: 1,
    },
  ],
  null,
  2,
);

function downloadTemplate(kind: "csv" | "json") {
  const blob = new Blob([kind === "csv" ? CSV_TEMPLATE : JSON_TEMPLATE], {
    type: kind === "csv" ? "text/csv;charset=utf-8" : "application/json;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = kind === "csv" ? "modele-import-cours.csv" : "modele-import-cours.json";
  a.click();
  URL.revokeObjectURL(url);
}

export function ContentImport() {
  const [fileName, setFileName] = useState<string | null>(null);
  const [payload, setPayload] = useState<string | null>(null);
  const [format, setFormat] = useState<"csv" | "json">("csv");
  const [previewCount, setPreviewCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [report, setReport] = useState<ImportReport | null>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    setError(null);
    setReport(null);
    setPreviewCount(null);
    if (!file) {
      setFileName(null);
      setPayload(null);
      return;
    }
    const lower = file.name.toLowerCase();
    setFormat(lower.endsWith(".json") ? "json" : "csv");
    setFileName(file.name);
    const text = await file.text();
    setPayload(text);
    try {
      if (lower.endsWith(".json")) {
        const parsed: unknown = JSON.parse(text);
        setPreviewCount(Array.isArray(parsed) ? parsed.length : 0);
      } else {
        const lines = text.split("\n").filter((l) => l.trim() !== "");
        setPreviewCount(Math.max(0, lines.length - 1));
      }
    } catch {
      setPreviewCount(null);
    }
  }

  async function handleImport() {
    if (!payload) return;
    setLoading(true);
    setError(null);
    setReport(null);
    try {
      const token = await getCsrfToken();
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (token) headers["x-csrf-token"] = token;
      const res = await fetch("/api/admin/content/import", {
        method: "POST",
        headers,
        body: JSON.stringify({ format, payload }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Import impossible.");
      setReport({
        createdLessons: data.createdLessons ?? 0,
        createdChapters: data.createdChapters ?? 0,
        errors: Array.isArray(data.errors) ? data.errors : [],
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur inconnue");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden mb-6">
      <div className="p-4 border-b border-outline-variant">
        <div className="font-headline-md text-on-surface">Import massif de cours (CSV / JSON)</div>
        <p className="text-on-surface-variant font-body-sm mt-1">
          Préparez dizaines ou centaines de cours hors-ligne puis importez-les. Colonnes : classe, matiere,
          chapitre, titre, resume, contenu, ordre, duree_min, difficulte. Les chapitres manquants sont créés.
        </p>
      </div>
      <div className="p-4 space-y-4">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => downloadTemplate("csv")}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-label-sm font-medium border border-outline-variant text-on-surface hover:bg-surface-container-high transition-colors"
          >
            <span className="material-symbols-outlined text-sm">download</span>
            Modèle CSV
          </button>
          <button
            type="button"
            onClick={() => downloadTemplate("json")}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-label-sm font-medium border border-outline-variant text-on-surface hover:bg-surface-container-high transition-colors"
          >
            <span className="material-symbols-outlined text-sm">download</span>
            Modèle JSON
          </button>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
          <label className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium border border-outline-variant text-on-surface hover:bg-surface-container-high transition-colors cursor-pointer">
            <span className="material-symbols-outlined text-sm">upload_file</span>
            {fileName ?? "Choisir un fichier…"}
            <input type="file" accept=".csv,.json,.txt" onChange={handleFile} className="hidden" />
          </label>
          {previewCount !== null && (
            <span className="text-label-sm text-on-surface-variant">{previewCount} ligne(s) détectée(s)</span>
          )}
          <button
            type="button"
            onClick={handleImport}
            disabled={!payload || loading}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium bg-primary text-on-primary hover:bg-primary/90 disabled:opacity-50 transition-colors sm:ml-auto"
          >
            {loading ? (
              <span className="animate-spin material-symbols-outlined text-sm">refresh</span>
            ) : (
              <span className="material-symbols-outlined text-sm">publish</span>
            )}
            {loading ? "Import…" : "Importer"}
          </button>
        </div>
        {error && <div className="bg-error-container text-on-error-container p-3 rounded-lg text-sm">{error}</div>}
        {report && (
          <div className="space-y-2">
            <div className="bg-tertiary-container text-on-tertiary-container p-3 rounded-lg text-sm font-medium">
              {report.createdLessons} leçon(s) créée(s) · {report.createdChapters} chapitre(s) créé(s) · {report.errors.length} erreur(s)
            </div>
            {report.errors.length > 0 && (
              <ul className="max-h-48 overflow-y-auto divide-y divide-outline-variant border border-outline-variant rounded-lg">
                {report.errors.map((e, i) => (
                  <li key={i} className="px-3 py-2 text-xs text-on-surface">
                    <span className="font-mono font-bold">Ligne {e.row}</span> — {e.message}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
