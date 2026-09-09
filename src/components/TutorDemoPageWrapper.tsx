"use client";

import dynamic from "next/dynamic";

const TutorDemoPage = dynamic(() => import("@/components/TutorDemoPage"), {
  ssr: false,
  loading: () => (
    <div className="min-h-dvh bg-background flex items-center justify-center">
      <span className="material-symbols-outlined text-primary text-3xl animate-spin">smart_toy</span>
    </div>
  ),
});

export default function TutorDemoPageWrapper() {
  return <TutorDemoPage />;
}