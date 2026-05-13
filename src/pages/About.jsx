// src/pages/About.jsx
export default function About() {
  return (
    <main className="pt-24 min-h-screen bg-slate-950 px-6 pb-20">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-4">
          À <span className="text-amber-400">propos</span>
        </h1>
        <p className="text-slate-400 text-center mb-16">
          Notre histoire, nos valeurs, notre équipe
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <div>
            <h2 className="text-2xl font-bold mb-4">Notre Histoire</h2>
            <p className="text-slate-400 leading-relaxed">
              Fondée il y a plus de 15 ans, GlobalTrade s'est imposée comme un
              acteur incontournable du commerce international en Afrique de
              l'Ouest. Notre expertise couvre l'ensemble de la chaîne
              logistique, du départ à la livraison finale.
            </p>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
            <h3 className="text-amber-400 font-semibold mb-4">Nos Valeurs</h3>
            {["Fiabilité", "Transparence", "Excellence", "Innovation"].map(
              (v) => (
                <div
                  key={v}
                  className="flex items-center gap-3 py-2 border-b border-slate-800 last:border-0"
                >
                  <span className="text-amber-400">✓</span>
                  <span className="text-slate-300">{v}</span>
                </div>
              ),
            )}
          </div>
        </div>

        <h2 className="text-2xl font-bold text-center mb-10">
          Notre <span className="text-amber-400">Équipe</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: "Ibrahima Sow", role: "Directeur Général", initials: "IS" },
            {
              name: "Aissatou Barry",
              role: "Responsable Logistique",
              initials: "AB",
            },
            { name: "Moussa Koné", role: "Expert Douanier", initials: "MK" },
          ].map((p) => (
            <div
              key={p.name}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center hover:border-amber-400/50 transition"
            >
              <div className="w-16 h-16 rounded-full bg-amber-400 flex items-center justify-center text-slate-950 font-bold text-xl mx-auto mb-4">
                {p.initials}
              </div>
              <h3 className="font-semibold">{p.name}</h3>
              <p className="text-slate-500 text-sm mt-1">{p.role}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
