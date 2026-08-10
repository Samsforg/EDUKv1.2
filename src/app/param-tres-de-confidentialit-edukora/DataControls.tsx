"use client";

export default function DataControls() {
  async function handleExport() {
    const res = await fetch("/api/me/export", { credentials: "same-origin" });
    if (!res.ok) return alert((await res.json()).error || "Erreur export");
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `edukora-donnees-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  async function handleDelete() {
    if (
      !confirm(
        "Êtes-vous sûr ? Cette action est irréversible et supprimera l'ensemble de votre historique.",
      )
    )
      return;
    const res = await fetch("/api/me", { method: "DELETE", credentials: "same-origin" });
    const d = await res.json().catch(() => ({}));
    if (d.ok) {
      alert("Votre compte a été supprimé. Vous allez être redirigé…");
      window.location.href = "/connexion-edukora";
    } else {
      alert(d.error || "Erreur lors de la suppression");
    }
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          onClick={handleExport}
          className="flex items-center justify-center gap-3 border border-primary text-primary px-4 py-3 rounded-xl font-semibold hover:bg-primary-fixed/50 transition-all active:scale-95"
        >
          <span className="material-symbols-outlined">download</span>
          Télécharger mes données
        </button>
        <button
          onClick={handleDelete}
          className="flex items-center justify-center gap-3 border border-error text-error px-4 py-3 rounded-xl font-semibold hover:bg-error-container/20 transition-all active:scale-95"
        >
          <span className="material-symbols-outlined">delete_forever</span>
          Supprimer mon compte
        </button>
      </div>
    </>
  );
}
