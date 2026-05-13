import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";
import { contactValidationSchema } from "../validators/contact.validator";

export default function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(contactValidationSchema),
    mode: "onBlur",
  });

  async function onSubmit(data) {
    try {
      // Appel API simulé
      const response = await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simuler un succès aléatoire pour test
          if (Math.random() > 0.2) {
            resolve({ success: true });
          } else {
            reject(new Error("Erreur serveur temporaire"));
          }
        }, 1500);
      });

      toast.success("✅ Message envoyé avec succès !", {
        description: "Nous vous répondrons sous 24h",
      });
      reset();
    } catch (error) {
      toast.error("❌ Erreur lors de l'envoi", {
        description: error.message || "Veuillez réessayer plus tard",
      });
    }
  }

  return (
    <main className="pt-24 min-h-screen bg-slate-950 px-6 pb-20">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-4">
          <span className="text-amber-400">Contactez</span>-nous
        </h1>
        <p className="text-slate-400 text-center mb-16">
          Notre équipe vous répond sous 24h
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Formulaire */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Name */}
              <div>
                <label className="text-sm text-slate-400 mb-1 block">
                  Nom complet
                </label>
                <input
                  type="text"
                  placeholder="Jean Dupont"
                  {...register("name")}
                  className={`w-full bg-slate-800 border rounded-xl px-4 py-3 text-white text-sm outline-none transition placeholder-slate-600 ${
                    errors.name
                      ? "border-red-500 focus:border-red-500"
                      : "border-slate-700 focus:border-amber-400"
                  }`}
                />
                {errors.name && (
                  <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                    ⚠️ {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="text-sm text-slate-400 mb-1 block">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="jean@exemple.com"
                  {...register("email")}
                  className={`w-full bg-slate-800 border rounded-xl px-4 py-3 text-white text-sm outline-none transition placeholder-slate-600 ${
                    errors.email
                      ? "border-red-500 focus:border-red-500"
                      : "border-slate-700 focus:border-amber-400"
                  }`}
                />
                {errors.email && (
                  <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                    ⚠️ {errors.email.message}
                  </p>
                )}
              </div>

              {/* Subject */}
              <div>
                <label className="text-sm text-slate-400 mb-1 block">
                  Sujet
                </label>
                <input
                  type="text"
                  placeholder="Demande de devis"
                  {...register("subject")}
                  className={`w-full bg-slate-800 border rounded-xl px-4 py-3 text-white text-sm outline-none transition placeholder-slate-600 ${
                    errors.subject
                      ? "border-red-500 focus:border-red-500"
                      : "border-slate-700 focus:border-amber-400"
                  }`}
                />
                {errors.subject && (
                  <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                    ⚠️ {errors.subject.message}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label className="text-sm text-slate-400 mb-1 block">
                  Message
                </label>
                <textarea
                  rows={5}
                  placeholder="Décrivez votre besoin..."
                  {...register("message")}
                  className={`w-full bg-slate-800 border rounded-xl px-4 py-3 text-white text-sm outline-none transition placeholder-slate-600 resize-none ${
                    errors.message
                      ? "border-red-500 focus:border-red-500"
                      : "border-slate-700 focus:border-amber-400"
                  }`}
                />
                {errors.message && (
                  <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                    ⚠️ {errors.message.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-amber-400 text-slate-950 py-3 rounded-xl font-semibold hover:bg-amber-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
              </button>
            </form>
          </div>

          {/* Infos + Carte */}
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 space-y-4">
              {[
                { icon: "📍", label: "Adresse", value: "Conakry, Guinée" },
                { icon: "📞", label: "Téléphone", value: "+224 623 95 20 11" },
                {
                  icon: "✉️",
                  label: "Email",
                  value: "contact@globaltrade.com",
                },
                { icon: "🕒", label: "Horaires", value: "Lun–Ven : 8h–18h" },
              ].map((c) => (
                <div key={c.label} className="flex items-start gap-4">
                  <span className="text-2xl">{c.icon}</span>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wider">
                      {c.label}
                    </p>
                    <p className="text-white font-medium">{c.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Google Maps embed */}
            <div className="rounded-2xl overflow-hidden border border-slate-800 h-64">
              <iframe
                title="Localisation GlobalTrade"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126092.26!2d-13.7!3d9.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xf1cd773ac5b7a07%3A0x0!2sConakry%2C+Guinée!5e0!3m2!1sfr!2sgn!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
