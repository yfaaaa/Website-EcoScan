"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Sparkles } from "lucide-react";
import { askGeminiDashboard } from "@/lib/gemini";
import { useEco } from "@/context/ecocontext";

// Definisikan tipe pesan agar tidak error
interface Message {
    role: "user" | "model";
    text: string;
}

export default function FloatingAssistant() {
    const { currentUser } = useEco();
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Inisialisasi state dengan tipe Message[]
    const [messages, setMessages] = useState<Message[]>([]);

    // Efek auto-scroll ke bawah saat ada pesan baru
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, loading]);

    const handleAsk = async () => {
        if (!query.trim() || loading) return;

        const userText = query;
        const userMessage: Message = { role: "user", text: userText };

        // 1. Tambahkan pesan user ke layar
        setMessages((prev) => [...prev, userMessage]);
        setQuery("");
        setLoading(true);

        try {
            // 2. Format riwayat untuk dikirim ke Gemini
            const historyForGemini = [...messages, userMessage].map((m) => ({
                role: m.role,
                parts: [{ text: m.text }],
            }));

            // 3. Panggil API
            const res = await askGeminiDashboard(historyForGemini);

            // 4. Tambahkan balasan AI ke layar
            setMessages((prev) => [...prev, { role: "model", text: res }]);
        } catch (err) {
            console.error(err);
            setMessages((prev) => [
                ...prev,
                { role: "model", text: "Maaf, sistem sedang sibuk. Coba lagi nanti ya!" },
            ]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed bottom-28 right-6 md:right-12 z-[100] flex flex-col items-end gap-4">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 50 }}
                        className="w-[90vw] md:w-[400px] bg-zinc-900 border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col h-[500px]"
                    >
                        {/* Header */}
                        <div className="p-6 bg-emerald-500 flex justify-between items-center text-black font-black italic uppercase">
                            <span className="flex items-center gap-2 text-sm">
                                <Sparkles size={18} /> EcoScan AI
                            </span>
                            <button onClick={() => setIsOpen(false)}>
                                <X size={20} />
                            </button>
                        </div>

                        {/* Chat Area */}
                        <div
                            ref={scrollRef}
                            className="flex-1 p-6 overflow-y-auto space-y-4 bg-zinc-950/30 custom-scrollbar scroll-smooth"
                        >
                            {messages.length === 0 && (
                                <div className="text-center py-20 space-y-2">
                                    <p className="text-emerald-500 font-black text-xl italic tracking-tighter">HALO {currentUser?.name || "WARRIOR"}!</p>
                                    <p className="text-zinc-600 text-[10px] uppercase font-black tracking-widest">
                                        Ada yang bisa EcoScan AI bantu hari ini?
                                    </p>
                                </div>
                            )}
                            {messages.map((msg, i) => (
                                <div
                                    key={i}
                                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    <div
                                        className={`max-w-[85%] p-4 rounded-2xl text-xs leading-relaxed ${msg.role === "user"
                                                ? "bg-emerald-500 text-black font-bold rounded-tr-none shadow-lg shadow-emerald-500/10"
                                                : "bg-zinc-800 text-zinc-300 italic rounded-tl-none border border-white/5"
                                            }`}
                                    >
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                            {loading && (
                                <div className="flex justify-start">
                                    <div className="bg-zinc-800 p-4 rounded-2xl w-16 flex gap-1 items-center justify-center">
                                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce" />
                                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Input Area */}
                        <div className="p-4 bg-zinc-950 flex gap-2 border-t border-white/5">
                            <input
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleAsk()}
                                placeholder="Tanya soal sampah besar..."
                                className="flex-1 bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-emerald-500"
                            />
                            <button
                                onClick={handleAsk}
                                disabled={loading}
                                className="p-3 bg-emerald-500 text-black rounded-xl hover:bg-emerald-400 transition-all disabled:opacity-50"
                            >
                                <Send size={18} />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Trigger Button */}
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className="w-16 h-16 bg-emerald-500 text-black rounded-full flex items-center justify-center shadow-emerald-500/20 shadow-2xl border-2 border-white/10"
            >
                {isOpen ? <X size={28} /> : <MessageSquare size={28} fill="currentColor" />}
            </motion.button>
        </div>
    );
}