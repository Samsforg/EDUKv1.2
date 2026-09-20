export default function Loading() {
  return (
    <div className="min-h-screen bg-surface">
      <div className="h-16 bg-surface-container-low animate-pulse" />
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        <div className="h-8 w-24 bg-surface-container-high rounded-lg animate-pulse" />
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-20 bg-surface-container-lowest border border-outline-variant rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  );
}
