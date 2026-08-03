"use client";

import { useState } from "react";

const ROLES = [
  { value: "student", label: "Élève" },
  { value: "teacher", label: "Professeur" },
  { value: "parent", label: "Parent" },
  { value: "admin", label: "Admin" },
  { value: "expert", label: "Expert" },
];

const ROLE_BADGE: Record<string, string> = {
  student: "bg-primary-container text-on-primary-container",
  teacher: "bg-secondary-container text-on-secondary-container",
  parent: "bg-tertiary-container text-on-tertiary-container",
  admin: "bg-error-container text-on-error-container",
  expert: "bg-surface-container-high text-on-surface-variant",
};

export function RoleSelect({ userId, current }: { userId: number; current: string }) {
  const [role, setRole] = useState(current);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function handleChange(next: string) {
    if (next === role) return;
    setBusy(true);
    setError("");
    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: next }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Erreur");
        return;
      }
      setRole(next);
    } catch {
      setError("Erreur réseau");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <span className={`inline-block px-2 py-1 rounded-full text-xs font-bold mr-2 ${ROLE_BADGE[role] ?? "bg-surface-container-high"}`}>
        {ROLES.find((r) => r.value === role)?.label ?? role}
      </span>
      <select
        value={role}
        disabled={busy}
        onChange={(e) => handleChange(e.target.value)}
        className="bg-surface-container-high text-on-surface text-xs font-semibold rounded-lg px-2 py-1 border border-outline-variant focus:outline-none focus:border-primary disabled:opacity-50"
        aria-label="Changer le rôle"
      >
        {ROLES.map((r) => (
          <option key={r.value} value={r.value}>
            {r.label}
          </option>
        ))}
      </select>
      {busy && <span className="material-symbols-outlined text-sm animate-spin text-primary align-middle ml-1">progress_activity</span>}
      {error && <p className="text-xs text-error mt-1">{error}</p>}
    </div>
  );
}
