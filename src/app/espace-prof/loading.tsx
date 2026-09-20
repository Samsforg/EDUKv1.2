export default function Loading() {
  return (
    <div className="min-h-screen bg-surface">
      <div className="h-16 bg-surface-container-low animate-pulse" />
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        <div className="h-8 w-48 bg-surface-container-high rounded-lg animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-32 bg-surface-container-lowest border border-outline-variant rounded-xl animate-pulse" />
          ))}
        </div>
        <div className="h-64 bg-surface-container-lowest border border-outline-variant rounded-xl animate-pulse" />
      </div>
    </div>
  );
}
