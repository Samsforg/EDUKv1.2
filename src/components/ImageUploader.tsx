"use client";

import { useRef, useState } from "react";

interface Props {
  onUploaded: (url: string) => void;
  className?: string;
}

export default function ImageUploader({ onUploaded, className = "" }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);
    setUploading(true);

    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload/image", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Erreur lors de l'upload");
        return;
      }
      onUploaded(data.url);
    } catch {
      setError("Erreur réseau");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div className={className}>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        onChange={handleFile}
        className="hidden"
      />
      <button
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        type="button"
        className="flex items-center gap-2 px-3 py-2 rounded-lg border border-outline-variant bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container-low text-sm font-medium disabled:opacity-50 transition-colors"
      >
        {uploading ? (
          <span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>
        ) : (
          <span className="material-symbols-outlined text-[18px]">image</span>
        )}
        {uploading ? "Envoi…" : "Insérer une image"}
      </button>
      {error && <p className="text-xs text-error mt-1">{error}</p>}
    </div>
  );
}
