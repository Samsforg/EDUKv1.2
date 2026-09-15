"use client";

import Link from "next/link";

const bentoItems = [
  { href: "/simulateur", icon: "description", title: "Simulateur BAC / BEPC", subtitle: "Préparer l'examen", color: "bg-primary text-on-primary", bg: "absolute top-0 right-0 w-32 h-32 bg-on-primary/10 rounded-bl-full -mr-8 -mt-8", badge: "Lancer un sujet", badgeIcon: "play_circle" },
  { href: "/mes-classes", icon: "school", title: "Mes classes", subtitle: "Rejoins la classe de ton professeur", color: "bg-surface-container-high border border-outline-variant", bg: "", badge: "", badgeIcon: "" },
  { href: "/tuteur-ia", icon: "smart_toy", title: "Parler à Kora (Tuteur AI)", subtitle: "Une question sur un cours ?", color: "bg-surface-container-high border border-outline-variant", bg: "", badge: "", badgeIcon: "" },
  { href: "/fiches", icon: "menu_book", title: "Mes fiches de cours", subtitle: "Relire et réviser hors-ligne", color: "bg-secondary-container border border-outline-variant", bg: "", badge: "", badgeIcon: "" },
  { href: "/parcours", icon: "route", title: "Mon parcours de révision", subtitle: "Plan généré selon ta progression", color: "bg-surface-container-high border border-outline-variant", bg: "", badge: "", badgeIcon: "" },
  { href: "/forum", icon: "forum", title: "Communauté", subtitle: "Entraide et forum par matière", color: "bg-surface-container-high border border-outline-variant", bg: "", badge: "", badgeIcon: "" },
  { href: "/classement", icon: "emoji_events", title: "Classement", subtitle: "Comparer ta progression aux autres", color: "bg-surface-container-high border border-outline-variant", bg: "", badge: "", badgeIcon: "" },
  { href: "/parrainage", icon: "diversity_3", title: "Parrainage", subtitle: "Partager ton code et monter au classement", color: "bg-surface-container-high border border-outline-variant", bg: "", badge: "", badgeIcon: "" },
  { href: "/ligues", icon: "shield", title: "Ligue Académique", subtitle: "Ton échelon et tes rivaux", color: "bg-surface-container-high border border-outline-variant", bg: "", badge: "", badgeIcon: "" },
  { href: "/defis", icon: "swords", title: "Défis Inter-Communes", subtitle: "Ta commune contre les autres", color: "bg-surface-container-high border border-outline-variant", bg: "", badge: "", badgeIcon: "" },
  { href: "/espace-live", icon: "live_tv", title: "Edukora Live", subtitle: "Sessions directes et replays", color: "bg-surface-container-high border border-outline-variant", bg: "", badge: "", badgeIcon: "" },
  { href: "/badges", icon: "military_tech", title: "Mes badges", subtitle: "Débloquer des récompenses", color: "bg-surface-container-high border border-outline-variant", bg: "", badge: "", badgeIcon: "" },
  { href: "/planning", icon: "calendar_month", title: "Planning de révisions", subtitle: "Ta semaine générée automatiquement", color: "bg-surface-container-high border border-outline-variant", bg: "", badge: "", badgeIcon: "" },
];

export default function BentoGridClient() {
  return (
    <section className="grid grid-cols-2 gap-gutter" aria-label="Actions rapides">
      {bentoItems.map((item, index) => (
        <Link
          key={item.href}
          href={item.href}
          className={`col-span-2 bento-card ${item.color} p-4 rounded-xl flex items-center gap-4 group ${item.bg ? "relative overflow-hidden" : ""} ${item.bg ? "active:scale-95 transition-transform duration-100" : "active:bg-inverse-surface active:text-inverse-on-surface transition-colors"}`}
          style={{ transform: "scale(1)" }}
        >
          {item.bg && <div className={item.bg}></div>}
          <div className="w-12 h-12 rounded-full bg-primary/15 flex items-center justify-center text-primary shadow-sm shrink-0">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
              {item.icon}
            </span>
          </div>
          <div className="text-left">
            <p className="font-label-sm text-on-surface">{item.title}</p>
            <p className="text-label-xs text-on-surface">{item.subtitle}</p>
          </div>
          {item.badge && (
            <div className="z-10 flex items-center gap-2 ml-auto">
              <span className="bg-on-primary text-primary px-4 py-2 rounded-full text-label-sm font-label-sm flex items-center gap-2">
                {item.badge} <span className="material-symbols-outlined text-[18px]">{item.badgeIcon}</span>
              </span>
            </div>
          )}
        </Link>
      ))}
    </section>
  );
}