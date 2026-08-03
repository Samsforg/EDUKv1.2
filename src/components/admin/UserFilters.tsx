"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function UserFilters({
  initialQ,
  initialRole,
  initialStatus,
}: {
  initialQ: string;
  initialRole: string;
  initialStatus: string;
}) {
  const [q, setQ] = useState(initialQ);
  const [role, setRole] = useState(initialRole);
  const [status, setStatus] = useState(initialStatus);
  const router = useRouter();

  function go(next: { q?: string; role?: string; status?: string }) {
    const sp = new URLSearchParams();
    const qq = next.q !== undefined ? next.q : q;
    const rr = next.role !== undefined ? next.role : role;
    const ss = next.status !== undefined ? next.status : status;
    if (qq.trim()) sp.set("q", qq.trim());
    if (rr && rr !== "all") sp.set("role", rr);
    if (ss && ss !== "all") sp.set("status", ss);
    router.push(`/espace-admin/utilisateurs?${sp.toString()}`);
    router.refresh();
  }

  return (
    <div className="flex flex-col md:flex-row gap-3 mb-4">
      <form
        className="flex-1 relative"
        onSubmit={(e) => {
          e.preventDefault();
          go({});
        }}
      >
        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg">
          search
        </span>
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Rechercher par nom, email, téléphone ou classe…"
          className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg pl-10 pr-4 py-2.5 text-sm text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-primary"
        />
      </form>
      <select
        value={role}
        onChange={(e) => {
          setRole(e.target.value);
          go({ role: e.target.value });
        }}
        className="bg-surface-container-lowest border border-outline-variant rounded-lg px-3 py-2.5 text-sm text-on-surface focus:outline-none focus:border-primary"
        aria-label="Filtrer par rôle"
      >
        <option value="all">Tous les rôles</option>
        <option value="student">Élèves</option>
        <option value="teacher">Professeurs</option>
        <option value="parent">Parents</option>
        <option value="admin">Admins</option>
        <option value="expert">Experts</option>
      </select>
      <select
        value={status}
        onChange={(e) => {
          setStatus(e.target.value);
          go({ status: e.target.value });
        }}
        className="bg-surface-container-lowest border border-outline-variant rounded-lg px-3 py-2.5 text-sm text-on-surface focus:outline-none focus:border-primary"
        aria-label="Filtrer par statut"
      >
        <option value="all">Tous les statuts</option>
        <option value="active">Actifs</option>
        <option value="blocked">Bloqués</option>
      </select>
      {(q || role !== "all" || status !== "all") && (
        <button
          onClick={() => {
            setQ("");
            setRole("all");
            setStatus("all");
            router.push("/espace-admin/utilisateurs");
            router.refresh();
          }}
          className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-semibold text-on-surface-variant hover:bg-surface-container-high transition-colors"
        >
          <span className="material-symbols-outlined text-base">close</span>
          Réinitialiser
        </button>
      )}
    </div>
  );
}
