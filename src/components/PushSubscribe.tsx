"use client";
import { useEffect, useState } from "react";

export default function PushSubscribe() {
  const [status, setStatus] = useState<"unsupported" | "denied" | "granted" | "pending">("pending");

  useEffect(() => {
    if (!("Notification" in window)) return setStatus("unsupported");
    const perm = Notification.permission;
    if (perm === "default") setStatus("pending");
    else setStatus(perm);
  }, []);

  const subscribe = async () => {
    if (Notification.permission === "denied") return alert("Activez les notifications dans les paramètres du navigateur");
    const perm = await Notification.requestPermission();
    if (perm !== "granted") return;

    const reg = await navigator.serviceWorker.ready;
    const sub = await reg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlB64ToUint8Array(process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!),
    });

    await fetch("/api/push/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sub),
      credentials: "include",
    });
    setStatus("granted");
  };

  function urlB64ToUint8Array(base64: string) {
    const padding = "=".repeat((4 - (base64.length % 4)) % 4);
    const base64url = (base64 + padding).replace(/-/g, "+").replace(/_/g, "/");
    return Uint8Array.from(atob(base64url), (c) => c.charCodeAt(0));
  }

  if (status === "unsupported") return null;
  if (status === "granted") return <span className="text-green-600 text-xs">Notifications activees</span>;

  return (
    <button onClick={subscribe} className="bg-primary text-on-primary px-4 py-2 rounded-lg text-sm font-semibold">
      {status === "pending" ? "Activer notifications" : "Autoriser notifications"}
    </button>
  );
}