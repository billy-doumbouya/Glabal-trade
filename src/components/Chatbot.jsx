import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import { SYSTEM } from "./ui/System";

const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

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
    endRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  async function send() {
    if (!input.trim() || loading) return;

    const userMsg = input.trim();

    setInput("");

    const updatedMessages = [
      ...messages,
      {
        role: "user",
        text: userMsg,
      },
    ];

    setMessages(updatedMessages);

    setLoading(true);

    try {
      if (!API_KEY) {
        throw new Error("Clé API OpenRouter manquante");
      }

      // Format OpenAI/OpenRouter
      const history = updatedMessages.map((m) => ({
        role: m.role,
        content: m.text,
      }));

      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",

        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",

          // optionnel mais recommandé
          "HTTP-Referer": window.location.origin,
          "X-Title": "GlobalTrade Chatbot",
        },

        body: JSON.stringify({
          model: "google/gemini-2.5-flash",

          messages: [
            {
              role: "system",
              content: SYSTEM,
            },

            ...history,
          ],

          temperature: 0.7,
          max_tokens: 500,
        }),
      });

      const data = await res.json();

      // Gestion erreurs HTTP
      if (!res.ok) {
        console.error(`Erreur HTTP ${res.status}:`, data);

        let errorMsg = "Erreur OpenRouter";

        if (res.status === 401) {
          errorMsg = "Clé API OpenRouter invalide";
        } else if (res.status === 429) {
          errorMsg = "Limite API atteinte";
        } else if (res.status === 400) {
          errorMsg = data.error?.message || "Requête invalide";
        }

        toast.error(errorMsg);

        throw new Error(errorMsg);
      }

      // Réponse IA
      const reply = data.choices?.[0]?.message?.content;

      if (!reply) {
        throw new Error("Aucune réponse du modèle");
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: reply,
        },
      ]);
    } catch (error) {
      console.error("Erreur Chatbot:", error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text:
            "⚠️ " +
            (error.message || "Problème technique. Vérifiez votre connexion."),
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
                className={`flex ${
                  m.role === "user" ? "justify-end" : "justify-start"
                }`}
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
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send();
                }
              }}
              placeholder="Votre question..."
              className="flex-1 bg-slate-800 text-white text-sm px-3 py-2 rounded-lg outline-none placeholder-slate-500"
            />

            <button
              onClick={send}
              disabled={loading}
              className="bg-amber-400 text-slate-950 px-3 py-2 rounded-lg text-sm font-semibold hover:bg-amber-300 transition disabled:opacity-50"
            >
              →
            </button>
          </div>
        </div>
      )}
    </>
  );
}
