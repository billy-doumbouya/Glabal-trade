import { useEffect, useState } from "react";

const API_KEY = import.meta.env.VITE_GOOGLE_DRIVE_API_KEY;
const FOLDER_ID = import.meta.env.VITE_GOOGLE_DRIVE_FOLDER_ID;

// Skeleton Loader Component
function ImageSkeleton() {
  return (
    <div className="aspect-square overflow-hidden rounded-xl bg-slate-800 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 animate-pulse" />
    </div>
  );
}

// Image Card Component avec loading et fallback
function ImageCard({ img, onLightbox }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [useFallback, setUseFallback] = useState(false);

  const handleLoadSuccess = () => {
    setLoading(false);
    setError(false);
  };

  const handleLoadError = () => {
    // Premier essai échoué, on bascule sur le fallback
    if (!useFallback) {
      setUseFallback(true);
      setLoading(true);
    } else {
      // Fallback aussi échoué
      setLoading(false);
      setError(true);
    }
  };

  // URL du thumbnail + fallback URL directe
  // Utilise directement l'URL Google Drive qui marche mieux que thumbnailLink
  const imageUrl = `https://drive.google.com/thumbnail?id=${img.id}&sz=w1000`;
  console.log("Tentative de charge:", imageUrl);

  return (
    <div
      className="aspect-square overflow-hidden rounded-xl cursor-pointer group relative"
      onClick={() => !error && onLightbox(img)}
    >
      {loading && <ImageSkeleton />}

      {!error ? (
        <img
          src={imageUrl}
          alt={img.name}
          className={`w-full h-full object-cover group-hover:scale-110 transition duration-300 ${
            loading ? "hidden" : "block"
          }`}
          loading="lazy"
          onLoad={handleLoadSuccess}
          onError={handleLoadError}
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
          <div className="text-center">
            <span className="text-3xl mb-2 block">🖼️</span>
            <p className="text-xs text-slate-400">Image indisponible</p>
          </div>
        </div>
      )}

      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition duration-300 flex items-center justify-center">
        <span className="text-white text-2xl opacity-0 group-hover:opacity-100 transition">
          {!error ? "🔍" : "❌"}
        </span>
      </div>
    </div>
  );
}

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lightbox, setLightbox] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchImages() {
      try {
        if (!API_KEY || !FOLDER_ID) {
          throw new Error("Clés API ou FOLDER_ID manquantes");
        }

        const url = `https://www.googleapis.com/drive/v3/files?q='${FOLDER_ID}'+in+parents+and+mimeType+contains+'image/'&key=${API_KEY}&fields=files(id,name,thumbnailLink,mimeType)&pageSize=50`;

        const res = await fetch(url);
        const data = await res.json();

        if (data.error) {
          console.error("Erreur API Google Drive:", data.error);
          setError(`Erreur API: ${data.error.message}`);
          setImages([]);
        } else if (data.files && data.files.length > 0) {
          console.log(`✓ ${data.files.length} images trouvées`);
          // Log des URLs pour déboguer
          data.files.forEach((f, i) => {
            console.log(`Image ${i + 1}:`, {
              id: f.id,
              name: f.name,
              thumbnail: f.thumbnailLink?.substring(0, 80) + "...",
            });
          });
          setImages(data.files);
          setError(null);
        } else {
          console.warn("Aucune image trouvée dans le dossier");
          setError("Aucune image dans le dossier Drive");
          setImages([]);
        }
      } catch (err) {
        console.error("Erreur fetch:", err.message);
        setError(err.message);
        setImages([]);
      }
      setLoading(false);
    }
    fetchImages();
  }, []);

  return (
    <main className="pt-24 min-h-screen bg-slate-950 px-6 pb-20">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-4">
          Notre <span className="text-amber-400">Galerie</span>
        </h1>
        <p className="text-slate-400 text-center mb-12">
          Photos de nos opérations logistiques et partenariats internationaux
        </p>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(12)].map((_, i) => (
              <ImageSkeleton key={i} />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-red-400 mb-2">❌ {error}</p>
            <p className="text-slate-400 text-sm">
              Vérifie la console (F12) pour plus de détails
            </p>
          </div>
        ) : images.length === 0 ? (
          <div className="text-center text-slate-500 py-20">
            Aucune image dans le dossier Drive pour l'instant.
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((img) => (
              <ImageCard key={img.id} img={img} onLightbox={setLightbox} />
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-6"
          onClick={() => setLightbox(null)}
        >
          <button className="absolute top-6 right-6 text-white text-3xl">
            ✕
          </button>
          <img
            src={`https://drive.google.com/uc?export=view&id=${lightbox.id}`}
            alt={lightbox.name}
            className="max-w-full max-h-full rounded-xl object-contain"
          />
        </div>
      )}
    </main>
  );
}
