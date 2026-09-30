"use client";

import { useState, useEffect } from "react";

interface ContentVersionRow {
  id: number;
  entity_type: string;
  entity_id: number;
  payload_json: string;
  created_by: number;
  creator_name: string;
  created_at: string;
}

export default function ContentVersionTable() {
  const [versions, setVersions] = useState<ContentVersionRow[]>([]);
  const [entityType, setEntityType] = useState<string>("");
  const [entityId, setEntityId] = useState<string>("");

  useEffect(() => {
    if (!entityType || !entityId) {
      setVersions([]);
      return;
    }
    const fetchVersions = async () => {
      try {
        const res = await fetch(`/api/admin/content/content_version?entity_type=${entityType}&entity_id=${entityId}`);
        const data = await res.json();
        if (data.versions) setVersions(data.versions);
      } catch (err) {
        console.error(err);
      }
    };
    fetchVersions();
  }, [entityType, entityId]);

  const types = [
    { value: "chapter", label: "Chapitre" },
    { value: "lesson", label: "Leçon" },
    { value: "quiz", label: "Quiz" },
    { value: "exam_paper", label: "Sujet d'examen" },
  ];

  const formatPayload = (json: string) => {
    try {
      return JSON.stringify(JSON.parse(json), null, 2).slice(0, 200) + "...";
    } catch {
      return json.slice(0, 200) + "...";
    }
  };

  return (
    <section className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 border-b border-outline-variant">
        <div className="font-headline-md text-on-surface">Historique des versions ({versions.length})</div>
        <div className="flex gap-2">
          <select
            value={entityType}
            onChange={(e) => setEntityType(e.target.value)}
            className="w-40 px-3 py-2 rounded-lg border border-outline-variant bg-surface text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">Type</option>
            {types.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
          </select>
          <input
            type="text"
            placeholder="ID de l'entité"
            value={entityId}
            onChange={(e) => setEntityId(e.target.value)}
            className="w-32 px-3 py-2 rounded-lg border border-outline-variant bg-surface text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-surface-container-high/60 text-label-xs uppercase tracking-wider text-on-surface-variant">
            <tr>
              <th className="px-6 py-3">Type</th>
              <th className="px-6 py-3">ID Entité</th>
              <th className="px-6 py-3">Aperçu du contenu</th>
              <th className="px-6 py-3">Modifié par</th>
              <th className="px-6 py-3">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant">
            {versions.map((v) => (
              <tr key={v.id} className="hover:bg-surface-container transition-colors">
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary-container text-on-primary-container">
                    {v.entity_type}
                  </span>
                </td>
                <td className="px-6 py-4 font-mono text-on-surface">#{v.entity_id}</td>
                <td className="px-6 py-4">
                  <code className="text-xs text-on-surface-variant font-mono max-w-xs block truncate">{formatPayload(v.payload_json)}</code>
                </td>
                <td className="px-6 py-4 text-on-surface">{v.creator_name}</td>
                <td className="px-6 py-4 text-label-sm text-on-surface-variant">{v.created_at.slice(0, 16).replace("T", " ")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function formatPayload(json: string) {
  try {
    return JSON.stringify(JSON.parse(json), null, 2).slice(0, 200) + "...";
  } catch {
    return json.slice(0, 200) + "...";
  }
}