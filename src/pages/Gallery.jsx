import { useState } from "react";
import { globalTradeImages } from "../data/GlobalTradeImage";
import { X } from "lucide-react";

function ImageSkeleton() {
  return (
    <div className="aspect-square overflow-hidden rounded-2xl bg-slate-800 relative">
      <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800" />
    </div>
  );
}

function ImageCard({ img, onLightbox }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const imageUrl = `${img.url}?w=800&auto=format&fit=crop`;

  return (
    <div
      onClick={() => !error && onLightbox(img)}
      className="aspect-square overflow-hidden rounded-2xl cursor-pointer group relative bg-slate-900"
    >
      {loading && <ImageSkeleton />}

      {!error ? (
        <img
          src={imageUrl}
          alt={img.alt}
          loading="lazy"
          onLoad={() => setLoading(false)}
          onError={() => {
            console.log("Erreur image :", imageUrl);
            setLoading(false);
            setError(true);
          }}
          className={`w-full h-full object-cover transition duration-500 group-hover:scale-110 ${
            loading ? "opacity-0" : "opacity-100"
          }`}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-slate-800 text-slate-400 text-sm">
          Image indisponible
        </div>
      )}

      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition duration-300 flex items-center justify-center">
        <span className="text-white text-2xl opacity-0 group-hover:opacity-100 transition">
          🔍
        </span>
      </div>
    </div>
  );
}

export default function Gallery() {
  const [lightbox, setLightbox] = useState(null);

  return (
    <main className="pt-24 min-h-screen bg-slate-950 px-6 pb-20">
      <div className="max-w-7xl mx-auto">
        <h1
          className="text-4xl font-bold text-center mb-4 text-white"
          data-aos="fade-down"
        >
          Notre <span className="text-amber-400">Galerie</span>
        </h1>

        <p
          className="text-slate-400 text-center mb-12"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          Photos de nos opérations logistiques et partenariats internationaux
        </p>

        <div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          {globalTradeImages.map((img) => (
            <ImageCard key={img.id} img={img} onLightbox={setLightbox} />
          ))}
        </div>
      </div>

      {/* LIGHTBOX */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-6"
        >
          <button className="absolute top-6 right-6 text-white text-4xl">
            <X size={20} />
          </button>

          <img
            src={`${lightbox.url}?w=1400&auto=format&fit=crop`}
            alt={lightbox.alt}
            className="max-w-full max-h-full rounded-2xl object-contain"
          />
        </div>
      )}
    </main>
  );
}
