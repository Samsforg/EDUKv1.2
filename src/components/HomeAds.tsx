"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface Ad {
  id: number;
  title: string;
  subtitle: string | null;
  image_url: string | null;
  link_url: string | null;
  background: string | null;
}

const textOn = (bg: string | null): string => {
  if (!bg) return "";
  const hex = bg.replace("#", "");
  if (hex.length !== 6) return "";
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  const lum = 0.299 * r + 0.587 * g + 0.114 * b;
  return lum > 160 ? "#111827" : "#ffffff";
};

export function HomeAds() {
  const [ads, setAds] = useState<Ad[]>([]);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchX = useRef<number | null>(null);

  useEffect(() => {
    fetch("/api/ads")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d && Array.isArray(d.ads) && setAds(d.ads))
      .catch(() => {});
  }, []);

  const goTo = useCallback(
    (n: number) => {
      if (ads.length === 0) return;
      setIndex(((n % ads.length) + ads.length) % ads.length);
    },
    [ads.length],
  );

  useEffect(() => {
    if (ads.length <= 1 || paused) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % ads.length), 5000);
    return () => clearInterval(t);
  }, [ads.length, paused]);

  if (ads.length === 0) return null;

  const renderAd = (a: Ad) => (
    <div className="relative overflow-hidden rounded-[28px] p-8 md:p-12 shadow-sm border border-outline-variant/40 w-full">
      {a.background && (
        <div className="absolute inset-0" style={{ backgroundColor: a.background }} />
      )}
      {a.background && (
        <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-2xl -mr-24 -mt-24" />
      )}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-6">
        <div className={`flex-1 ${a.background ? "text-white" : ""}`}>
          <p
            className="text-label-sm font-bold uppercase tracking-wider mb-2"
            style={a.background ? { color: "rgba(255,255,255,0.8)" } : undefined}
          >
            Publicité
          </p>
          <h2
            className="text-[24px] md:text-[32px] font-extrabold leading-tight mb-2"
            style={a.background ? { color: textOn(a.background) } : undefined}
          >
            {a.title}
          </h2>
          {a.subtitle && (
            <p
              className="text-body-md leading-relaxed"
              style={a.background ? { color: textOn(a.background) } : undefined}
            >
              {a.subtitle}
            </p>
          )}
        </div>
        {a.image_url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={a.image_url}
            alt={a.title}
            className="w-40 h-40 md:w-52 md:h-52 rounded-2xl object-cover shadow-lg shrink-0 border border-outline-variant/40"
            loading="lazy"
          />
        )}
        {!a.background && !a.image_url && (
          <span className="material-symbols-outlined text-6xl text-on-surface-variant shrink-0">campaign</span>
        )}
      </div>
    </div>
  );

  return (
    <section className="px-4 md:px-8 pt-16 md:pt-20">
      <div
        className="max-w-7xl mx-auto relative"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={(e) => {
          touchX.current = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          if (touchX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          touchX.current = null;
          if (Math.abs(dx) < 50) return;
          goTo(dx < 0 ? index + 1 : index - 1);
        }}
      >
        {ads.length > 1 && (
          <>
            <button
              onClick={() => goTo(index - 1)}
              aria-label="Pub précédente"
              className="absolute -left-2 md:-left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-surface shadow-md border border-outline-variant flex items-center justify-center text-on-surface hover:bg-primary hover:text-on-primary transition-colors active:scale-95"
            >
              <span className="material-symbols-outlined text-lg">chevron_left</span>
            </button>
            <button
              onClick={() => goTo(index + 1)}
              aria-label="Pub suivante"
              className="absolute -right-2 md:-right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-surface shadow-md border border-outline-variant flex items-center justify-center text-on-surface hover:bg-primary hover:text-on-primary transition-colors active:scale-95"
            >
              <span className="material-symbols-outlined text-lg">chevron_right</span>
            </button>
          </>
        )}
        <div className="overflow-hidden rounded-[28px]">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {ads.map((a) =>
              a.link_url ? (
                <a
                  key={a.id}
                  href={a.link_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full shrink-0"
                >
                  {renderAd(a)}
                </a>
              ) : (
                <div key={a.id} className="w-full shrink-0">
                  {renderAd(a)}
                </div>
              ),
            )}
          </div>
        </div>
        {ads.length > 1 && (
          <div className="flex items-center justify-center gap-1.5 mt-4">
            {ads.map((a, i) => (
              <button
                key={a.id}
                onClick={() => goTo(i)}
                aria-label={`Aller à la pub ${i + 1}`}
                aria-current={i === index}
                className="group flex h-6 w-6 items-center justify-center"
              >
                <span
                  className={`block h-2 rounded-[999px] transition-all ${
                    i === index ? "w-8 bg-primary" : "w-2 bg-outline-variant group-hover:bg-on-surface-variant"
                  }`}
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}