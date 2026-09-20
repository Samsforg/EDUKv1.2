export default function Loading() {
  return (
    <div className="min-h-screen bg-surface">
      <div className="h-16 bg-surface-container-low animate-pulse" />
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        <div className="flex justify-between items-center">
          <div className="h-8 w-32 bg-surface-container-high rounded-lg animate-pulse" />
          <div className="h-10 w-36 bg-primary rounded-lg animate-pulse" />
        </div>
        <div className="space-y-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-24 bg-surface-container-lowest border border-outline-variant rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  );
}
