export default function Loading() {
  return (
    <div className="min-h-screen bg-surface">
      <div className="h-16 bg-surface-container-low animate-pulse" />
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        <div className="h-8 w-40 bg-surface-container-high rounded-lg animate-pulse" />
        <div className="flex gap-3 overflow-hidden">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-10 w-24 bg-surface-container-high rounded-full animate-pulse flex-shrink-0" />
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="h-48 bg-surface-container-lowest border border-outline-variant rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  );
}
