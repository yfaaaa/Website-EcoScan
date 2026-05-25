"use client";
import { useState } from "react";
import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar"; // Import Sidebar terpisah
import BottomNav from "@/components/layout/bottomnav";
import FloatingAssistant from "@/components/layout/ai/floatingassistant";
import { motion } from "framer-motion";
import { Zap, Trophy, Leaf, TrendingUp, Users, ArrowUpRight } from "lucide-react";
import { useEco } from "@/context/ecocontext";
import Link from "next/link";

export default function DashboardPage() {
    const { currentUser } = useEco();
    // State buat ngontrol buka/tutup Sidebar Profil
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-[#050505] text-zinc-100 selection:bg-emerald-500/30 overflow-x-hidden font-sans italic">
            
            {/* 1. HEADER (Kiri: Logo, Kanan: Tombol Menu) */}
            <Header onOpenSidebar={() => setIsSidebarOpen(true)} />

            {/* 2. SIDEBAR (Isinya Profil lo & Logout) */}
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
            
            <main className="pt-28 pb-40 px-6 md:px-16 w-full max-w-full relative z-10">
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
                    
                    {/* AREA KIRI (HERO & INSIGHT) */}
                    <div className="xl:col-span-8 space-y-10">
                        {/* HERO BOX */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-12 rounded-[3.5rem] bg-gradient-to-br from-emerald-900/30 via-zinc-900/40 to-black border border-emerald-500/10 relative overflow-hidden group shadow-[0_30px_60px_rgba(0,0,0,0.5)]">
                            <div className="relative z-10">
                                <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.8] mb-6 uppercase text-white">
                                    READY TO <br /> <span className="text-emerald-400">SCAN?</span>
                                </h1>
                                <p className="text-zinc-400 max-w-xs text-sm font-medium leading-relaxed not-italic uppercase tracking-widest opacity-80 mb-10">
                                    Identifikasi furniture & limbah besar Anda dengan AI presisi tinggi.
                                </p>
                                <Link href="/scan">
                                    <button className="px-10 py-5 bg-white text-black font-black rounded-2xl hover:bg-emerald-400 hover:scale-105 transition-all uppercase tracking-[0.2em] text-[10px] shadow-2xl active:scale-95 not-italic">
                                        Open AI Scanner 
                                    </button>
                                </Link>
                            </div>
                            {/* Decorative Logo Background */}
                            <img src="/ecoscan.png" className="absolute right-[-40px] bottom-[-40px] w-80 opacity-[0.03] grayscale pointer-events-none" />
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 not-italic">
                            {/* RANKING CARD (SIMPEL) */}
                            <div className="p-8 bg-zinc-900/40 border border-white/5 rounded-[2.5rem] space-y-6">
                                <div className="flex items-center gap-2 text-zinc-600 font-black text-[10px] uppercase tracking-[0.4em] mb-2">
                                    <Users size={14} /> Eco Contributors
                                </div>
                                <div className="space-y-4">
                                    {[
                                        {n: "Andini Putri", p: "15,420"},
                                        {n: "Budi Santoso", p: "12,100"}
                                    ].map((u, i) => (
                                        <div key={i} className="flex justify-between items-center bg-zinc-950 p-4 rounded-2xl border border-white/5">
                                            <span className="font-bold text-sm uppercase tracking-tighter">{u.n}</span>
                                            <span className="font-black text-emerald-400 text-xs tracking-widest">{u.p} PTS</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            
                            {/* ALERT CARD */}
                            <div className="bg-emerald-500 p-8 rounded-[2.5rem] text-black shadow-xl shadow-emerald-500/10 flex flex-col justify-between group cursor-pointer hover:bg-emerald-400 transition-all">
                                <h4 className="text-3xl font-black uppercase italic tracking-tighter leading-[0.9]">Limbah area <br/> Anda naik 15%!</h4>
                                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest mt-6">
                                    Lihat Analisis Detail <ArrowUpRight size={14} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* AREA KANAN (STATS) */}
                    <div className="xl:col-span-4 space-y-8 not-italic">
                        {/* GLOBAL STATS */}
                        <div className="p-10 bg-zinc-900/50 border border-white/5 rounded-[3rem] shadow-2xl relative overflow-hidden">
                            <div className="relative z-10">
                                <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.3em] mb-4">Statistik Global</p>
                                <h4 className="text-5xl font-black text-white italic tracking-tighter">12.4K <span className="text-emerald-500 text-lg uppercase tracking-normal ml-2">KG</span></h4>
                                <div className="w-full h-1.5 bg-zinc-800 rounded-full mt-6 overflow-hidden">
                                    <motion.div initial={{ width: 0 }} animate={{ width: "75%" }} className="h-full bg-emerald-500" />
                                </div>
                            </div>
                        </div>

                        {/* POINT CARD (WHITE BG - HIGH CONTRAST) */}
                        <div className="p-10 bg-white rounded-[3.5rem] shadow-2xl text-black relative overflow-hidden group">
                            <p className="text-zinc-400 text-[10px] font-black uppercase tracking-[0.3em] mb-1">EcoPoint Balance</p>
                            <h3 className="text-6xl font-black tracking-tighter italic leading-none mb-6">
                                {currentUser?.pts || "0"} <span className="text-zinc-300 text-xl font-bold uppercase not-italic">pts</span>
                            </h3>
                            <div className="w-full h-3 bg-zinc-100 rounded-full overflow-hidden p-[2px]">
                                <motion.div 
                                    initial={{ width: 0 }} 
                                    animate={{ width: `${Math.min((currentUser?.pts || 0) / 2000 * 100, 100)}%` }} 
                                    className="h-full bg-emerald-500 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.5)]" 
                                />
                            </div>
                            <p className="text-[9px] font-black text-zinc-400 uppercase tracking-widest mt-4 italic">Updated Real-time via Eco-Cloud</p>
                        </div>
                    </div>

                </div>
            </main>

            {/* ASISTEN & NAVIGASI BAWAH */}
            <FloatingAssistant />
            <BottomNav />
        </div>
    );
}