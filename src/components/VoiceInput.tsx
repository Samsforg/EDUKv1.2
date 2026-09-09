"use client";
import { useEffect, useRef, useState } from "react";

// Micro dictée Web Speech API : l'élève dicte sa question à Kora au lieu de taper.
// Gratuit, natif navigateur (Chrome/Edge/Safari), fallback silencieux si non supporté.

export default function VoiceInput({ onResult }: { onResult: (text: string) => void }) {
  const [supported, setSupported] = useState(false);
  const [listening, setListening] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const recRef = useRef<unknown>(null);

  useEffect(() => {
    const w = window as unknown as Record<string, unknown>;
    const SR = (w.SpeechRecognition ?? w.webkitSpeechRecognition) as
      | (new () => {
          lang: string;
          continuous: boolean;
          interimResults: boolean;
          onresult: ((e: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
          onend: (() => void) | null;
          onerror: ((e: { error: string }) => void) | null;
          start: () => void;
          stop: () => void;
        })
      | undefined;
    if (!SR) return;
    setSupported(true);
    const rec = new SR();
    rec.lang = "fr-FR";
    rec.continuous = false;
    rec.interimResults = false;
    rec.onresult = (e) => {
      let text = "";
      for (let i = 0; i < e.results.length; i++) text += e.results[i][0].transcript;
      if (text.trim()) onResult(text.trim());
    };
    rec.onend = () => setListening(false);
    rec.onerror = (ev) => {
      setListening(false);
      if (ev.error === "not-allowed") setError("Micro refusé — autorisez le micro dans votre navigateur.");
      else if (ev.error !== "aborted") setError("Dictée interrompue. Réessayez.");
    };
    recRef.current = rec as unknown;
    return () => {
      try { rec.stop(); } catch {}
    };
  }, [onResult]);

  if (!supported) return null;

  const toggle = () => {
    const rec = recRef.current as { start: () => void; stop: () => void } | null;
    if (!rec) return;
    setError(null);
    if (listening) {
      rec.stop();
      setListening(false);
    } else {
      try {
        rec.start();
        setListening(true);
      } catch {
        setError("Impossible de démarrer la dictée.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center">
      <button
        type="button"
        onClick={toggle}
        aria-label={listening ? "Arrêter la dictée" : "Dicter ma question"}
        className={`w-11 h-11 rounded-full flex items-center justify-center transition-all active:scale-90 ${
          listening ? "bg-error text-on-error animate-pulse" : "bg-primary/10 text-primary hover:bg-primary/20"
        }`}
      >
        <span className="material-symbols-outlined">{listening ? "stop_circle" : "mic"}</span>
      </button>
      {listening && <span className="text-[10px] text-error font-bold mt-1">J&apos;écoute…</span>}
      {!listening && !error && <span className="text-[10px] text-on-surface-variant mt-1">Dicter</span>}
      {error && <span className="text-[10px] text-error mt-1 max-w-[140px] text-center">{error}</span>}
    </div>
  );
}
