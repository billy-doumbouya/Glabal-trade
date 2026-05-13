export default function GlobalLoader({ active }) {
  if (!active) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/95 backdrop-blur-sm transition-opacity duration-500">
      <div className="space-y-4 text-center px-6 py-8 rounded-3xl border border-slate-700 bg-slate-900/95 shadow-2xl">
        <div className="mx-auto h-16 w-16 rounded-full border-4 border-amber-400 border-t-transparent animate-spin" />
        <div>
          <p className="text-white text-xl font-semibold">
            Chargement de GlobalTrade...
          </p>
          <p className="text-slate-400 text-sm mt-1">
            Patientez, nous préparons l'expérience.
          </p>
        </div>
      </div>
    </div>
  );
}
