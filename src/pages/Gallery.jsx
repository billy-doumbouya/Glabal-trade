import { useEffect, useState } from "react";
import { globalTradeImages } from "../data/GlobalTradeImage";
import { ImageSkeleton } from "../components/ui/ImageSkeleton";

const API_KEY = import.meta.env.VITE_GOOGLE_DRIVE_API_KEY;
const FOLDER_ID = import.meta.env.VITE_GOOGLE_DRIVE_FOLDER_ID;

// Card image
function ImageCard({ img, onLightbox, isFallback }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const imageUrl = isFallback
    ? `${img.url}?w=800&auto=format&fit=crop`
    : `https://lh3.googleusercontent.com/d/${img.id}`;

  const imageAlt = isFallback ? img.alt : img.name;

  return (
    <div
      onClick={() => !error && onLightbox(img)}
      className="aspect-square overflow-hidden rounded-2xl cursor-pointer group relative bg-slate-900"
    >
      {loading && <ImageSkeleton />}

      {!error ? (
        <img
          src={imageUrl}
          alt={imageAlt}
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
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lightbox, setLightbox] = useState(null);
  const [error, setError] = useState(null);
  const [useFallbackImages, setUseFallbackImages] = useState(false);

  useEffect(() => {
    async function fetchImages() {
      try {
        // Si variables absentes → fallback direct
        if (!API_KEY || !FOLDER_ID) {
          console.warn("Variables Google Drive manquantes");
          setImages(globalTradeImages);
          setUseFallbackImages(true);
          return;
        }

        const url = `https://www.googleapis.com/drive/v3/files?q='${FOLDER_ID}'+in+parents+and+mimeType+contains+'image'&key=${API_KEY}&fields=files(id,name,mimeType)&pageSize=50`;

        const res = await fetch(url);

        if (!res.ok) {
          throw new Error(`Erreur HTTP ${res.status}`);
        }

        const data = await res.json();

        console.log("DATA GOOGLE DRIVE :", data);

        if (data.files && data.files.length > 0) {
          console.log(`✓ ${data.files.length} images trouvées`);

          setImages(data.files);
          setUseFallbackImages(false);
          setError(null);
        } else {
          console.warn("Aucune image Drive trouvée");

          setImages(globalTradeImages);
          setUseFallbackImages(true);
        }
      } catch (err) {
        console.error("Erreur Google Drive :", err);

        setImages(globalTradeImages);
        setUseFallbackImages(true);
        setError(null);
      } finally {
        setLoading(false);
      }
    }

    fetchImages();
  }, []);

  return (
    <main className="pt-24 min-h-screen bg-slate-950 px-6 pb-20">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-4 text-white">
          Notre <span className="text-amber-400">Galerie</span>
        </h1>

        <p className="text-slate-400 text-center mb-12">
          Photos de nos opérations logistiques et partenariats internationaux
        </p>

        {useFallbackImages && (
          <div className="mb-8 text-center">
            <span className="inline-flex items-center gap-2 text-xs bg-amber-400/10 text-amber-400 border border-amber-400/20 px-4 py-2 rounded-full">
              📸 Images de démonstration chargées
            </span>
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {[...Array(12)].map((_, i) => (
              <ImageSkeleton key={i} />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-red-400 mb-2">❌ {error}</p>

            <p className="text-slate-500 text-sm">
              Vérifie la console navigateur (F12)
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {images.map((img) => (
              <ImageCard
                key={img.id}
                img={img}
                onLightbox={setLightbox}
                isFallback={useFallbackImages}
              />
            ))}
          </div>
        )}
      </div>

      {/* LIGHTBOX */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-6"
        >
          <button className="absolute top-6 right-6 text-white text-4xl">
            ✕
          </button>

          <img
            src={
              useFallbackImages
                ? `${lightbox.url}?w=1400&auto=format&fit=crop`
                : `https://lh3.googleusercontent.com/d/${lightbox.id}`
            }
            alt={useFallbackImages ? lightbox.alt : lightbox.name}
            className="max-w-full max-h-full rounded-2xl object-contain"
          />
        </div>
      )}
    </main>
  );
}
