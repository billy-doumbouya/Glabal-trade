// src/pages/Services.jsx
const services = [
  {
    icon: "🚢",
    title: "Transport Maritime",
    desc: "Expéditions FCL et LCL vers tous les ports mondiaux. Suivi en temps réel de vos conteneurs.",
  },
  {
    icon: "✈️",
    title: "Fret Aérien",
    desc: "Solutions express pour vos marchandises urgentes. Réseau de partenaires aériens mondial.",
  },
  {
    icon: "📋",
    title: "Dédouanement",
    desc: "Traitement rapide de vos déclarations en douane. Maîtrise complète des réglementations.",
  },
  {
    icon: "🌍",
    title: "Conseil Export",
    desc: "Accompagnement stratégique pour conquérir de nouveaux marchés internationaux.",
  },
  {
    icon: "📦",
    title: "Logistique Intégrée",
    desc: "Gestion complète de votre supply chain, de l'entrepôt à la livraison finale.",
  },
  {
    icon: "📜",
    title: "Conformité Réglementaire",
    desc: "Gestion des licences d'import-export et conformité aux normes internationales.",
  },
];

export default function Services() {
  return (
    <main className="pt-24 min-h-screen bg-slate-950 px-6 pb-20">
      <div className="max-w-6xl mx-auto">
        {/* TITLE */}
        <h1
          data-aos="fade-down"
          className="text-4xl font-bold text-center mb-4"
        >
          Nos <span className="text-amber-400">Services</span>
        </h1>

        {/* SUBTITLE */}
        <p
          data-aos="fade-up"
          data-aos-delay="100"
          className="text-slate-400 text-center mb-16"
        >
          Solutions complètes pour votre commerce international
        </p>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <div
              key={s.title}
              data-aos="fade-up"
              data-aos-delay={150 + i * 120}
              data-aos-duration="700"
              className="bg-slate-900 border border-slate-800 rounded-2xl p-8 
                     hover:border-amber-400/50 transition group"
            >
              <div className="text-4xl mb-5">{s.icon}</div>

              <h3 className="text-xl font-semibold mb-3 group-hover:text-amber-400 transition">
                {s.title}
              </h3>

              <p className="text-slate-400 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
