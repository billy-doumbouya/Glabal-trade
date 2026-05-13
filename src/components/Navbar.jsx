import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const links = [
  { to: "/", label: "Accueil" },
  { to: "/about", label: "À propos" },
  { to: "/services", label: "Services" },
  { to: "/gallery", label: "Galerie" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <nav className="fixed top-0 w-full z-50 bg-slate-950/90 backdrop-blur border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        <Link
          to="/"
          className="text-xl font-bold text-amber-400 tracking-wider"
        >
          GLOBAL<span className="text-white">TRADE</span>
        </Link>

        <ul className="hidden md:flex gap-8">
          {links.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                className={`text-sm font-medium transition-colors hover:text-amber-400 ${
                  pathname === l.to ? "text-amber-400" : "text-slate-300"
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          to="/contact"
          className="hidden md:block bg-amber-400 text-slate-950 px-5 py-2 rounded-full text-sm font-semibold hover:bg-amber-300 transition"
        >
          Demander un devis
        </Link>

        <button className="md:hidden text-white" onClick={() => setOpen(!open)}>
          <span className="text-2xl">{open ? "✕" : "☰"}</span>
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-slate-900 px-6 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="text-slate-300 hover:text-amber-400 transition"
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
