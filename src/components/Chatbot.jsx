import { useState, useRef, useEffect } from "react";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const SYSTEM = `Tu es l'assistant virtuel de GlobalTrade, entreprise spécialisée dans l'import-export international basée en Guinée. 
Tu réponds aux questions sur nos services : logistique, dédouanement, transport maritime et aérien, conseil en commerce extérieur.
Sois professionnel, concis et utile. Réponds toujours en français.`;

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Bonjour ! Je suis l'assistant GlobalTrade. Comment puis-je vous aider ?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  async function send() {
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setInput("");

    // 1. Mise à jour immédiate de l'UI
    const newMessages = [...messages, { role: "user", text: userMsg }];
    setMessages(newMessages);
    setLoading(true);

    try {
      // 2. Préparation de l'historique pour Gemini
      // On ne garde que les messages qui ont un texte et on s'assure de l'alternance
      const history = newMessages
        .filter((m, index) => {
          // Règle d'or : Le tout premier message de l'historique DOIT être "user"
          // Donc on ignore le message de bienvenue de l'assistant à l'index 0
          return index > 0;
        })
        .map((m) => ({
          role: m.role === "assistant" ? "model" : "user",
          parts: [{ text: m.text }],
        }));

      if (!API_KEY) throw new Error("Clé API manquante");

      // 3. Appel API
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
        {
          // https://generativelanguage.googleapis.com/v1beta/models
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            system_instruction: { parts: [{ text: SYSTEM }] },
            contents: history,
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 500,
            },
          }),
        },
      );

      const data = await res.json();

      // 4. Diagnostic précis en cas d'erreur
      if (!res.ok) {
        console.error(`Erreur HTTP ${res.status}:`, data);

        let errorMsg = "Erreur de connexion";
        if (res.status === 401 || res.status === 403) {
          errorMsg = "Clé API invalide ou expirée";
        } else if (res.status === 429) {
          errorMsg = "Quota API dépassé. Réessayez plus tard";
        } else if (res.status === 400) {
          errorMsg = `Requête invalide: ${data.error?.message || ""}`;
        }

        throw new Error(errorMsg);
      }

      if (data.error) {
        console.error("Erreur API Gemini:", data.error);
        throw new Error(data.error?.message || "Erreur API Gemini");
      }

      // 5. Extraction de la réponse
      const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;

      if (reply) {
        setMessages((prev) => [...prev, { role: "assistant", text: reply }]);
      } else {
        // Si Gemini bloque le contenu (sécurité), on vérifie le finishReason
        const reason = data.candidates?.[0]?.finishReason;
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            text: `Désolé, je ne peux pas répondre (Raison: ${reason || "inconnue"}).`,
          },
        ]);
      }
    } catch (error) {
      console.error("Erreur Chatbot:", error.message);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: `⚠️ ${error.message || "Problème technique. Vérifiez votre clé API ou votre connexion."}`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 bg-amber-400 text-slate-950 w-14 h-14 rounded-full text-2xl shadow-lg hover:bg-amber-300 transition flex items-center justify-center"
      >
        {open ? "✕" : "💬"}
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-80 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          <div className="bg-amber-400 text-slate-950 px-4 py-3 font-semibold text-sm">
            Assistant GlobalTrade
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-80">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[75%] text-sm px-3 py-2 rounded-xl leading-relaxed ${
                    m.role === "user"
                      ? "bg-amber-400 text-slate-950"
                      : "bg-slate-800 text-slate-200"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-slate-800 text-slate-400 text-sm px-3 py-2 rounded-xl">
                  En train d'écrire...
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          <div className="p-3 border-t border-slate-700 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Votre question..."
              className="flex-1 bg-slate-800 text-white text-sm px-3 py-2 rounded-lg outline-none placeholder-slate-500"
            />
            <button
              onClick={send}
              className="bg-amber-400 text-slate-950 px-3 py-2 rounded-lg text-sm font-semibold hover:bg-amber-300 transition"
            >
              →
            </button>
          </div>
        </div>
      )}
    </>
  );
}
