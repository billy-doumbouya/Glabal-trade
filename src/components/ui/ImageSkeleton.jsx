export function ImageSkeleton() {
  return (
    <div className="aspect-square overflow-hidden rounded-2xl bg-slate-800 relative">
      <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800" />
    </div>
  );
}
