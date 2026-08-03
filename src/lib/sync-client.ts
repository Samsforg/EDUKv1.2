import { enqueue, getQueue, removeFromQueue, incrementRetries, QueuedAction } from "@/lib/offline-queue";

const MAX_RETRIES = 3;

export async function queueAction(action: Omit<QueuedAction, 'id' | 'timestamp' | 'retries'>) {
  await enqueue(action);
  await registerSync();
}

export async function registerSync() {
  if ("serviceWorker" in navigator && "sync" in window.ServiceWorkerRegistration.prototype) {
    const reg = await navigator.serviceWorker.ready;
    await (reg as unknown as { sync: { register: (tag: string) => Promise<void> } }).sync.register("edukora-sync");
  }
}

// Appelé par le SW via postMessage
export async function handleSyncMessage() {
  const queue = await getQueue();
  for (const item of queue) {
    if (item.retries >= 3) {
      await removeFromQueue(item.id);
      continue;
    }
    try {
      await processAction(item);
      await removeFromQueue(item.id);
    } catch (e) {
      console.error("Sync failed for", item.id, e);
      await incrementRetries(item.id);
    }
  }
}

async function processAction(item: QueuedAction) {
  const endpoints: Record<string, string> = {
    quiz_submit: "/api/quiz/submit",
    question_ask: "/api/live/questions",
    forum_reply: "/api/forum/reply",
    lesson_complete: "/api/lesson/complete",
  };
  const endpoint = endpoints[item.type];
  if (!endpoint) throw new Error("Unknown action type");

  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item.payload),
    credentials: "include",
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
}

// Écouteur messages du SW
if (typeof window !== "undefined") {
  navigator.serviceWorker.addEventListener("message", (event) => {
    if (event.data?.type === "SYNC_QUEUE") {
      handleSyncMessage();
    }
  });
}

// Enregistrement périodique (fallback si periodic sync non supporté)
export function registerPeriodicSync() {
  if ("serviceWorker" in navigator && "periodicSync" in (window.ServiceWorkerRegistration.prototype as unknown as Record<string, unknown>)) {
    navigator.serviceWorker.ready.then((reg) => {
      (reg as unknown as { periodicSync: { register: (tag: string, opts: { minInterval: number }) => Promise<void> } }).periodicSync.register("edukora-content-sync", { minInterval: 24 * 60 * 60 * 1000 })
        .catch(() => console.log("Periodic sync not granted"));
    });
  } else {
    setInterval(() => registerSync(), 24 * 60 * 60 * 1000);
  }
}