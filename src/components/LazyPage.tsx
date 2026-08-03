"use client";

import { Suspense, lazy, ComponentType } from "react";

function Spinner() {
  return (
    <div className="min-h-dvh bg-background flex items-center justify-center">
      <span className="material-symbols-outlined text-primary text-3xl animate-spin">progress_activity</span>
    </div>
  );
}

export function lazyPage<T extends ComponentType<Record<string, unknown>>>(
  factory: () => Promise<{ default: T }>,
) {
  const Component = lazy(factory);
  return function LazyWrapper(props: Record<string, unknown>) {
    return (
      <Suspense fallback={<Spinner />}>
        {/* @ts-expect-error generic props */}
        <Component {...props} />
      </Suspense>
    );
  };
}