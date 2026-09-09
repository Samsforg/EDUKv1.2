"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const SLIDES = [
  {
    src: "/images/landing-5-hero.webp",
    alt: "Application Edukora sur smartphone avec le tuteur IA Kora",
    label: "Tuteur IA Kora 24h/24",
  },
  {
    src: "/images/ecran-001.webp",
    alt: "Cours et fiches de révision certifiées Edukora",
    label: "Fiches certifiées",
  },
  {
    src: "/images/landing-6-hd.webp",
    alt: "Étudiants ivoiriens en session de révision collaborative",
    label: "Révision collaborative",
  },
  {
    src: "/images/landing-7.webp",
    alt: "Élève admise à son examen grâce à Edukora",
    label: "Admise au BAC !",
  },
];

export function HeroCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), 4500);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative w-full h-full rounded-[24px] overflow-hidden bg-surface-container">
      {SLIDES.map((slide, i) => (
        <Image
          key={slide.src}
          src={slide.src}
          alt={slide.alt}
          fill
          sizes="100vw"
          fetchPriority={i === 0 ? "high" : undefined}
          loading={i === 0 ? undefined : "lazy"}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1">
        {SLIDES.map((slide, i) => (
          <button
            key={slide.src}
            onClick={() => setIndex(i)}
            aria-label={`Voir le visuel ${i + 1}`}
            aria-current={i === index}
            className="group flex h-6 w-6 items-center justify-center"
          >
            <span
              className={`block h-1.5 rounded-[999px] transition-all ${
                i === index ? "w-4 bg-primary" : "w-1.5 bg-white/80 group-hover:bg-white"
              }`}
            />
          </button>
        ))}
      </div>
      <div
        key={SLIDES[index].src}
        className="absolute top-3 left-3 z-10 px-3 py-1 bg-black/70 backdrop-blur-sm text-white text-label-xs font-bold rounded-full"
      >
        {SLIDES[index].label}
      </div>
    </div>
  );
}