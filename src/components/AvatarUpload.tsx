"use client";

import { useRef, useState } from "react";

interface Props {
  currentAvatar: string | null;
  initials: string;
  size?: "sm" | "md" | "lg";
  onUploaded: (url: string) => void;
}

const SIZE_MAP = { sm: "w-10 h-10 text-sm", md: "w-16 h-16 text-lg", lg: "w-24 h-24 text-2xl" };

export default function AvatarUpload({ currentAvatar, initials, size = "lg", onUploaded }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const pickFile = () => inputRef.current?.click();

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);

    if (!file.type.startsWith("image/")) {
      setError("Veuillez choisir une image.");
      return;
    }

    setUploading(true);
    try {
      const compressed = await compressImage(file, 300_000);
      const res = await fetch("/api/me/avatar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ avatar: compressed }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? "Erreur lors de l'upload.");
      } else {
        onUploaded(json.avatar_url);
      }
    } catch {
      setError("Erreur réseau.");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        type="button"
        onClick={pickFile}
        disabled={uploading}
        className={`relative rounded-full overflow-hidden border-2 border-primary/30 hover:border-primary transition-colors ${SIZE_MAP[size]} flex items-center justify-center shrink-0 ${uploading ? "opacity-60 cursor-wait" : "cursor-pointer"}`}
      >
        {currentAvatar ? (
          <img src={currentAvatar} alt="Avatar" className="w-full h-full object-cover" />
        ) : (
          <span className="font-headline-md font-bold text-on-primary">{initials}</span>
        )}
        {/* Overlay camera icon */}
        <span className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity">
          {uploading ? (
            <span className="material-symbols-outlined text-white animate-spin text-xl">progress_activity</span>
          ) : (
            <span className="material-symbols-outlined text-white text-xl">photo_camera</span>
          )}
        </span>
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFile}
        className="hidden"
      />
      {error && <p className="text-xs text-error">{error}</p>}
    </div>
  );
}

/**
 * Compress an image file to JPEG ≤ targetBytes using canvas.
 * Returns a base64 data URL string.
 */
function compressImage(file: File, targetBytes: number): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        // Max 400px wide for avatar
        const maxDim = 400;
        let w = img.width;
        let h = img.height;
        if (w > maxDim || h > maxDim) {
          const ratio = Math.min(maxDim / w, maxDim / h);
          w = Math.round(w * ratio);
          h = Math.round(h * ratio);
        }
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d")!;
        ctx.drawImage(img, 0, 0, w, h);

        // Try JPEG at decreasing quality
        let quality = 0.85;
        let result = canvas.toDataURL("image/jpeg", quality);
        while (result.length * 0.75 > targetBytes && quality > 0.15) {
          quality -= 0.1;
          result = canvas.toDataURL("image/jpeg", quality);
        }

        // If still too big, try WebP
        if (result.length * 0.75 > targetBytes) {
          quality = 0.8;
          result = canvas.toDataURL("image/webp", quality);
          while (result.length * 0.75 > targetBytes && quality > 0.15) {
            quality -= 0.1;
            result = canvas.toDataURL("image/webp", quality);
          }
        }

        resolve(result);
      };
      img.onerror = () => reject(new Error("Impossible de charger l'image"));
      img.src = reader.result as string;
    };
    reader.onerror = () => reject(new Error("Erreur de lecture du fichier"));
    reader.readAsDataURL(file);
  });
}
