"use client";

import { useEffect, useState } from "react";

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

  useEffect(() => {
    fetch("/api/ads")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d && Array.isArray(d.ads) && setAds(d.ads))
      .catch(() => {});
  }, []);

  if (ads.length === 0) return null;

  return (
    <section className="px-4 md:px-8 pt-16 md:pt-20">
      <div className="max-w-7xl mx-auto space-y-4">
        {ads.map((ad) => {
          const content = (
            <div className="relative overflow-hidden rounded-[28px] p-8 md:p-12 shadow-sm border border-outline-variant/40 w-full">
              {ad.background && (
                <div
                  className="absolute inset-0"
                  style={{ backgroundColor: ad.background }}
                />
              )}
              {ad.background && (
                <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-2xl -mr-24 -mt-24" />
              )}
              <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-6">
                <div className={`flex-1 ${ad.background ? "text-white" : ""}`}>
                  <p
                    className="text-label-sm font-bold uppercase tracking-wider mb-2"
                    style={ad.background ? { color: "rgba(255,255,255,0.8)" } : undefined}
                  >
                    Publicité
                  </p>
                  <h3
                    className="text-[24px] md:text-[32px] font-extrabold leading-tight mb-2"
                    style={ad.background ? { color: textOn(ad.background) } : undefined}
                  >
                    {ad.title}
                  </h3>
                  {ad.subtitle && (
                    <p
                      className="text-body-md leading-relaxed"
                      style={ad.background ? { color: textOn(ad.background) } : undefined}
                    >
                      {ad.subtitle}
                    </p>
                  )}
                </div>
                {ad.image_url && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={ad.image_url}
                    alt={ad.title}
                    className={
                      ad.background
                        ? "w-40 h-40 md:w-52 md:h-52 rounded-2xl object-cover shadow-lg shrink-0"
                        : "w-40 h-40 md:w-52 md:h-52 rounded-2xl object-cover shadow-lg shrink-0 border border-outline-variant/40"
                    }
                    loading="lazy"
                  />
                )}
                {!ad.background && !ad.image_url && (
                  <span className="material-symbols-outlined text-6xl text-on-surface-variant shrink-0">campaign</span>
                )}
              </div>
            </div>
          );
          return ad.link_url ? (
            <a key={ad.id} href={ad.link_url} target="_blank" rel="noopener noreferrer" className="block">
              {content}
            </a>
          ) : (
            <div key={ad.id}>{content}</div>
          );
        })}
      </div>
    </section>
  );
}