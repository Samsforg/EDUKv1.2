"use client";

// Écran de transition affiché une fois par session avant la page d'accueil.
// Animations purement CSS ; accessible (skip au clic, prefers-reduced-motion).

import { useEffect, useRef, useState } from "react";

const SESSION_KEY = "edukora:welcome-seen";
const LETTERS = ["E", "d", "u", "k", "o", "r", "a"];
const EXIT_MS = 700;

export default function WelcomeSplash() {
  const [phase, setPhase] = useState<"hidden" | "enter" | "exit">("hidden");
  const [mounted, setMounted] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    let reduced = false;
    try {
      reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    } catch {
      /* noop */
    }
    let skip = false;
    try {
      skip = sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      /* noop */
    }
    if (skip) return;

    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      /* noop */
    }

    setMounted(true);
    document.documentElement.style.overflow = "hidden";

    const dismiss = () => {
      timers.current.forEach(clearTimeout);
      setPhase("exit");
      timers.current.push(
        setTimeout(() => {
          setMounted(false);
          document.documentElement.style.overflow = "";
        }, EXIT_MS),
      );
    };

    const base = reduced ? 900 : 1900;
    const exit = reduced ? 1000 : 3200;

    timers.current.push(setTimeout(() => setPhase("enter"), 30));
    timers.current.push(setTimeout(() => window.addEventListener("click", dismiss, { once: true }), base));
    timers.current.push(setTimeout(dismiss, exit));

    return () => {
      timers.current.forEach(clearTimeout);
      window.removeEventListener("click", dismiss);
      document.documentElement.style.overflow = "";
    };
  }, []);

  if (!mounted || phase === "hidden") return null;

  const exiting = phase === "exit";

  return (
    <div
      aria-hidden={exiting}
      onClick={() => {
        if (!exiting) {
          timers.current.forEach(clearTimeout);
          setPhase("exit");
          setTimeout(() => {
            setMounted(false);
            document.documentElement.style.overflow = "";
          }, EXIT_MS);
        }
      }}
      className={`splash-root fixed inset-0 z-[120] flex flex-col items-center justify-center overflow-hidden text-white select-none cursor-pointer ${
        exiting ? "splash-exit" : ""
      }`}
    >
      <style>{`
        .splash-root {
          background:
            radial-gradient(1200px 600px at 80% -10%, rgba(96,155,255,0.35), transparent 60%),
            radial-gradient(900px 500px at -10% 110%, rgba(245,158,11,0.22), transparent 55%),
            linear-gradient(135deg, #00327d 0%, #0047ab 100%);
        }
        .splash-root::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image:
            radial-gradient(rgba(255,255,255,0.16) 1px, transparent 1px),
            radial-gradient(rgba(255,255,255,0.16) 1px, transparent 1px);
          background-size: 28px 28px;
          background-position: 0 0, 14px 14px;
          opacity: 0.35;
          mask-image: radial-gradient(ellipse at center, black 30%, transparent 75%);
        }
        .splash-letter {
          display: inline-block;
          opacity: 0;
          transform: translateY(26px) scale(0.9);
          animation: splash-letter-in 0.55s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        @keyframes splash-letter-in {
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .splash-fade-in { opacity: 0; animation: splash-fade-in 0.6s ease forwards; }
        @keyframes splash-fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .splash-bar { width: 0%; animation: splash-bar 1.6s cubic-bezier(0.65, 0, 0.35, 1) forwards; }
        @keyframes splash-bar {
          0% { width: 2%; }
          100% { width: 100%; }
        }
        .splash-exit {
          opacity: 0;
          transform: scale(1.045);
          transition: opacity 0.65s ease, transform 0.65s ease;
          pointer-events: none;
        }
        @media (prefers-reduced-motion: reduce) {
          .splash-letter, .splash-fade-in { animation-duration: 0.01s !important; }
          .splash-bar { animation: none; width: 100% !important; }
          .splash-exit { transition: opacity 0.25s ease; transform: none; }
        }
      `}</style>

      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <div className="splash-fade-in mb-7 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] backdrop-blur-sm">
          <span className="material-symbols-outlined text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            school
          </span>
          Bienvenue sur Edukora
        </div>

        <h1 className="font-headline text-[56px] md:text-[76px] font-extrabold leading-none tracking-tight">
          {LETTERS.map((l, i) => (
            <span key={i} className="splash-letter" style={{ animationDelay: `${200 + i * 65}ms` }}>
              {l}
            </span>
          ))}
        </h1>

        <p
          className="splash-fade-in mt-6 max-w-md text-body-lg font-light leading-relaxed text-white/85"
          style={{ animationDelay: "1150ms" }}
        >
          Réussis ton <strong className="font-semibold text-white">BAC &amp; BEPC</strong> avec l'excellence
        </p>

        <div
          className="splash-fade-in mt-10 flex w-full max-w-[240px] items-center gap-3"
          style={{ animationDelay: "1350ms" }}
        >
          <span className="material-symbols-outlined text-white/70 text-base" style={{ fontVariationSettings: "'FILL' 1" }}>
            auto_awesome
          </span>
          <div className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/20">
            <div className="splash-bar h-full rounded-full bg-gradient-to-r from-[#F59E0B] to-[#ffc46b]" />
          </div>
          <span className="material-symbols-outlined text-white/70 text-base" style={{ fontVariationSettings: "'FILL' 1" }}>
            auto_awesome
          </span>
        </div>
      </div>

      <p
        className="splash-fade-in absolute bottom-8 z-10 text-[11px] font-medium tracking-wide text-white/60"
        style={{ animationDelay: "1500ms" }}
      >
        Prépare ta réussite…
      </p>
    </div>
  );
}