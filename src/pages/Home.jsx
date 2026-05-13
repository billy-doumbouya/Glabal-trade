import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Counter } from "../components/Counter";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export default function Home() {
  const [parentRef] = useAutoAnimate();
  return (
    <main className="pt-16" ref={parentRef}>
      {/* Hero */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 px-6 text-center">
        <div>
          <span className="inline-block bg-amber-400/10 text-amber-400 text-xs font-semibold px-4 py-1 rounded-full mb-6 tracking-widest uppercase">
            Commerce International
          </span>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Votre partenaire
            <br />
            <span className="text-amber-400">d'import-export</span>
            <br />
            mondial
          </h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto mb-10">
            Logistique internationale, dédouanement et conseil en commerce
            extérieur. Nous connectons vos marchés avec fiabilité et expertise.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              to="/contact"
              className="bg-amber-400 text-slate-950 px-8 py-3 rounded-full font-semibold hover:bg-amber-300 transition"
            >
              Demander un devis
            </Link>
            <Link
              to="/services"
              className="border border-slate-600 text-white px-8 py-3 rounded-full hover:border-amber-400 hover:text-amber-400 transition"
            >
              Nos services
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-amber-400 py-16 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-slate-950">
          {[
            { value: 15, suffix: "+", label: "Années d'expérience" },
            { value: 50, suffix: "+", label: "Pays couverts" },
            { value: 1200, suffix: "+", label: "Clients satisfaits" },
            { value: 98, suffix: "%", label: "Livraisons à temps" },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-4xl font-bold" ref={parentRef}>
                <Counter target={s.value} suffix={s.suffix} />
              </div>
              <div className="text-sm font-medium mt-1 opacity-75">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Services aperçu */}
      <section className="py-24 px-6 bg-slate-950">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">
            Nos <span className="text-amber-400">Services</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "🚢",
                title: "Transport Maritime",
                desc: "Gestion complète de vos expéditions maritimes internationales.",
              },
              {
                icon: "✈️",
                title: "Fret Aérien",
                desc: "Solutions rapides pour vos marchandises urgentes partout dans le monde.",
              },
              {
                icon: "📋",
                title: "Dédouanement",
                desc: "Traitement efficace de vos formalités douanières.",
              },
            ].map((s) => (
              <div
                key={s.title}
                ref={parentRef}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-8 hover:border-amber-400/50 transition group"
              >
                <div className="text-4xl mb-4">{s.icon}</div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-amber-400 transition">
                  {s.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              to="/services"
              className="text-amber-400 hover:underline font-medium"
            >
              Voir tous les services →
            </Link>
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section className="py-24 px-6 bg-slate-900">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">
            Ce que disent <span className="text-amber-400">nos clients</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                name: "Mamadou Diallo",
                role: "Directeur, DialloCorp",
                text: "GlobalTrade a transformé notre chaîne logistique. Professionnalisme et réactivité exemplaires.",
              },
              {
                name: "Fatou Camara",
                role: "Gérante, Camara Import",
                text: "Grâce à leur expertise en dédouanement, nous gagnons un temps précieux sur chaque expédition.",
              },
            ].map((t) => (
              <div
                key={t.name}
                ref={parentRef}
                className="bg-slate-800 rounded-2xl p-8 border border-slate-700"
              >
                <p className="text-slate-300 italic mb-6">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-400 flex items-center justify-center text-slate-950 font-bold text-sm">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{t.name}</p>
                    <p className="text-slate-500 text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
