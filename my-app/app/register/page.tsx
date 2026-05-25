"use client";
import { useState } from "react";
import { useEco } from "@/context/ecocontext";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Leaf, User, Mail, Lock, Sparkles } from "lucide-react";
import Link from "next/link";

export default function RegisterPage() {
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const { registerUser } = useEco();
    const router = useRouter();

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        registerUser(form);
        alert("Akun terdaftar! Sekarang coba login.");
        router.push("/login");
    };

    return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 relative overflow-hidden font-sans">
            {/* Background Ornaments */}
            <div className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] bg-emerald-600/20 rounded-full blur-[100px]" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-emerald-900/10 rounded-full blur-[100px]" />

            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md z-10">
                <div className="bg-zinc-900/40 backdrop-blur-3xl border border-white/10 p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                    <div className="flex flex-col items-center mb-8">
                        <div className="w-16 h-16 bg-gradient-to-tr from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.4)] mb-4">
                            <Sparkles className="text-zinc-950" size={32} />
                        </div>
                        <h1 className="text-3xl font-black text-white tracking-tighter">JOIN ECOSCAN</h1>
                        <p className="text-zinc-500 text-sm mt-1">Garda terdepan teknologi hijau.</p>
                    </div>

                    <form onSubmit={handleRegister} className="space-y-5">
                        <div className="space-y-1">
                            <label className="text-[10px] font-black text-emerald-500 uppercase tracking-widest ml-2">Username</label>
                            <div className="relative group">
                                <User className="absolute left-4 top-3.5 text-zinc-600 group-focus-within:text-emerald-400 transition-colors" size={20} />
                                <input required type="text" placeholder="Si Paling Eco" className="w-full bg-zinc-950/50 border border-white/5 rounded-2xl py-4 px-12 text-white outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all shadow-inner"
                                    onChange={(e) => setForm({ ...form, name: e.target.value })} />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-[10px] font-black text-emerald-500 uppercase tracking-widest ml-2">Cyber Email</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-3.5 text-zinc-600 group-focus-within:text-emerald-400 transition-colors" size={20} />
                                <input required type="email" placeholder="yahya@eco.ai" className="w-full bg-zinc-950/50 border border-white/5 rounded-2xl py-4 px-12 text-white outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all shadow-inner"
                                    onChange={(e) => setForm({ ...form, email: e.target.value })} />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-[10px] font-black text-emerald-500 uppercase tracking-widest ml-2">Secure Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-3.5 text-zinc-600 group-focus-within:text-emerald-400 transition-colors" size={20} />
                                <input required type="password" placeholder="••••••••" className="w-full bg-zinc-950/50 border border-white/5 rounded-2xl py-4 px-12 text-white outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all shadow-inner"
                                    onChange={(e) => setForm({ ...form, password: e.target.value })} />
                            </div>
                        </div>

                        <button className="w-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-black py-4 rounded-2xl mt-4 transition-all transform active:scale-95 shadow-[0_10px_20px_rgba(16,185,129,0.3)] uppercase tracking-tighter">
                            Daftar Sekarang
                        </button>
                    </form>

                    <p className="text-center text-zinc-600 mt-8 text-sm font-medium">Sudah punya akses? <Link href="/login" className="text-white hover:text-emerald-400 underline underline-offset-4 decoration-emerald-500 transition-colors">Masuk</Link></p>
                </div>
            </motion.div>
        </div>
    );
}