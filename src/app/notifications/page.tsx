"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import PushSubscribe from "@/components/PushSubscribe";
import PageHeader from "@/components/PageHeader";

interface Notification {
  id: number;
  title: string;
  body: string;
  icon: string;
  read: number;
  created_at: string;
}

const ICONS: Record<string, string> = {
  quiz: "quiz",
  school: "school",
  local_fire_department: "local_fire_department",
  stars: "stars",
  flag: "flag",
  workspace_premium: "workspace_premium",
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/notifications")
      .then((r) => r.json())
      .then((d) => setNotifications(d.notifications ?? []))
      .finally(() => setLoading(false));
    fetch("/api/notifications", { method: "POST" }).catch(() => {});
  }, []);

  function timeAgo(date: string) {
    const s = Math.floor((Date.now() - new Date(date + "Z").getTime()) / 1000);
    if (s < 60) return "à l'instant";
    if (s < 3600) return `il y a ${Math.floor(s / 60)} min`;
    if (s < 86400) return `il y a ${Math.floor(s / 3600)} h`;
    return `il y a ${Math.floor(s / 86400)} j`;
  }

  return (
    <div className="bg-background text-on-background font-body-md min-h-screen pb-16 font-['Hanken_Grotesk']">
      <PageHeader
        title="Notifications"
        subtitle="Tes réussites et rappels"
        right={<PushSubscribe />}
      />

      <main className="px-margin-mobile pt-6 space-y-3">
        {loading ? (
          <div className="flex justify-center py-16">
            <span className="material-symbols-outlined text-primary text-3xl animate-spin">progress_activity</span>
          </div>
        ) : notifications.length === 0 ? (
          <div className="text-center py-16 space-y-3">
            <div className="w-16 h-16 rounded-full bg-primary-container/30 flex items-center justify-center mx-auto">
              <span className="material-symbols-outlined text-primary text-3xl">notifications_none</span>
            </div>
            <p className="font-body-md text-on-surface-variant">Aucune notification pour l&apos;instant. Termine un quiz ou un examen pour en recevoir !</p>
            <Link href="/quiz" className="inline-block bg-primary text-on-primary font-label-md px-6 py-3 rounded-full mt-2">Faire un quiz</Link>
          </div>
        ) : (
          notifications.map((n) => (
            <div key={n.id} className="bg-surface rounded-xl border border-outline-variant p-4 flex items-start gap-4">
              <div className="w-11 h-11 rounded-full bg-primary/15 text-primary flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined">{ICONS[n.icon] ?? "notifications"}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-label-md font-semibold text-on-surface">{n.title}</h3>
                  <span className="font-label-xs text-on-surface-variant shrink-0">{timeAgo(n.created_at)}</span>
                </div>
                <p className="font-body-sm text-on-surface-variant mt-0.5">{n.body}</p>
              </div>
              {n.read === 0 && <span className="w-2.5 h-2.5 rounded-full bg-primary shrink-0 mt-2"></span>}
            </div>
          ))
        )}
      </main>
    </div>
  );
}
