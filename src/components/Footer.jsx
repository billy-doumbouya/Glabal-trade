import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <h3 className="text-amber-400 font-bold text-lg mb-3">GLOBALTRADE</h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            Leader en import-export international. Solutions logistiques
            complètes pour vos échanges mondiaux.
          </p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Navigation</h4>
          <ul className="space-y-2 text-slate-400 text-sm">
            {["/", "/about", "/services", "/gallery", "/contact"].map(
              (path, i) => (
                <li key={path}>
                  <Link to={path} className="hover:text-amber-400 transition">
                    {
                      ["Accueil", "À propos", "Services", "Galerie", "Contact"][
                        i
                      ]
                    }
                  </Link>
                </li>
              ),
            )}
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Contact</h4>
          <ul className="space-y-2 text-slate-400 text-sm">
            <li>📍 Conakry, Guinée</li>
            <li>📞 +224 623 95 20 11</li>
            <li>✉️ billydoumbouya5210@gmail.com</li>
          </ul>
        </div>
      </div>
      <p className="text-center text-slate-600 text-xs mt-10">
        © {new Date().getFullYear()} GlobalTrade — Tous droits réservés
      </p>
    </footer>
  );
}
