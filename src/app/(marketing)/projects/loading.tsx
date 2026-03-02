export default function ProjectsLoading() {
  return (
    <div className="min-h-screen py-24 animate-in fade-in duration-300">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <div className="h-12 w-48 mx-auto rounded bg-muted animate-pulse" />
          <div className="h-6 w-80 mx-auto mt-4 rounded bg-muted animate-pulse" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-52 rounded-xl border border-border/50 bg-muted/30 animate-pulse"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
