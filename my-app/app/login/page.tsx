"use client";
import { useState } from "react";
import { useEco } from "@/context/ecocontext";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Mail, ShieldAlert, LogIn } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { loginUser } = useEco();
    const router = useRouter();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        const result = loginUser(email, password);

        if (result.success) {
            router.push("/dashboard");
        } else {
            setError(result.message);
            setTimeout(() => setError(""), 3000); // Hilang dalam 3 detik
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 relative overflow-hidden">
            <div className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[100px]" />

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md z-10">
                <div className="bg-zinc-900/40 backdrop-blur-3xl border border-white/10 p-10 rounded-[2.5rem]">
                    <div className="text-center mb-10">
                        <h1 className="text-4xl font-black text-white tracking-tighter italic">ACCESS PORTAL</h1>
                        <p className="text-zinc-500 text-xs mt-2 uppercase tracking-[0.3em] font-bold">Identifikasi Diperlukan</p>
                    </div>

                    <AnimatePresence>
                        {error && (
                            <motion.div initial={{ x: -10 }} animate={{ x: [0, -10, 10, -10, 10, 0] }} exit={{ opacity: 0 }}
                                className="bg-red-500/10 border border-red-500/50 p-4 rounded-2xl mb-6 flex items-center gap-3 text-red-500 text-xs font-bold"
                            >
                                <ShieldAlert size={18} /> {error}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="relative group">
                            <Mail className="absolute left-4 top-4 text-zinc-600 group-focus-within:text-emerald-400" size={20} />
                            <input required type="email" placeholder="Cyber Email" className="w-full bg-zinc-950/50 border border-white/5 rounded-2xl py-4.5 px-12 text-white outline-none focus:border-emerald-500/50 transition-all shadow-inner"
                                onChange={(e) => setEmail(e.target.value)} />
                        </div>

                        <div className="relative group">
                            <Lock className="absolute left-4 top-4 text-zinc-600 group-focus-within:text-emerald-400" size={20} />
                            <input required type="password" placeholder="Secure Password" className="w-full bg-zinc-950/50 border border-white/5 rounded-2xl py-4.5 px-12 text-white outline-none focus:border-emerald-500/50 transition-all shadow-inner"
                                onChange={(e) => setPassword(e.target.value)} />
                        </div>

                        <button className="w-full bg-gradient-to-r from-emerald-600 to-emerald-400 text-zinc-950 font-black py-4.5 rounded-2xl mt-4 flex items-center justify-center gap-2 hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] transition-all">
                            MASUK <LogIn size={20} />
                        </button>
                    </form>

                    <p className="text-center text-zinc-600 mt-10 text-xs font-bold uppercase tracking-widest">
                        Belum punya akses? <Link href="/register" className="text-emerald-400">Daftar</Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
}