export default function Loading() {
  return (
    <div className="min-h-screen bg-background text-on-background flex flex-col">
      <div className="flex">
        <div className="hidden md:flex w-64 shrink-0 border-r border-outline-variant bg-surface dark:bg-inverse-surface">
          <div className="w-full p-6 space-y-3 animate-pulse">
            <div className="h-10 w-40 bg-surface-container-high rounded-lg" />
            <div className="h-3 w-24 bg-surface-container-high rounded" />
            <div className="h-3 w-24 bg-surface-container-high rounded" />
            <div className="h-3 w-24 bg-surface-container-high rounded" />
            <div className="h-3 w-24 bg-surface-container-high rounded" />
          </div>
        </div>
        <div className="flex-1 min-h-screen">
          <div className="h-16 bg-primary/80 animate-pulse" />
          <div className="max-w-6xl mx-auto px-4 md:px-8 py-6 space-y-4">
            <div className="h-8 w-64 bg-surface-container-high rounded-lg animate-pulse" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="h-28 bg-surface-container-lowest border border-outline-variant rounded-xl animate-pulse" />
              <div className="h-28 bg-surface-container-lowest border border-outline-variant rounded-xl animate-pulse" />
              <div className="h-28 bg-surface-container-lowest border border-outline-variant rounded-xl animate-pulse" />
            </div>
            <div className="h-64 bg-surface-container-lowest border border-outline-variant rounded-xl animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
