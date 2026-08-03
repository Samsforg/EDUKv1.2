"use client";

import { useState } from "react";

export function EncourageButton({ childId, childName }: { childId: number; childName: string }) {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    setLoading(true);
    try {
      const res = await fetch("/api/parent/encourage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ child_id: childId }),
      });
      if (res.ok) {
        setSent(true);
        setTimeout(() => setSent(false), 3500);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="w-full bg-secondary-container text-on-secondary-container font-headline font-bold py-4 rounded-xl flex items-center justify-center gap-3 shadow-md hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-60"
    >
      {sent ? (
        <>
          <span className="material-symbols-outlined">check_circle</span>
          Message envoyé à {childName} !
        </>
      ) : (
        <>
          <span className="material-symbols-outlined">favorite</span>
          Partager un message d&apos;encouragement
        </>
      )}
    </button>
  );
}
