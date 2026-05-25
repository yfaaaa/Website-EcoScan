"use client";
import { useState } from "react";
import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar"; // Import Sidebar
import BottomNav from "@/components/layout/bottomnav";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Scan, ShoppingBag, Recycle, Trash2, Info, ChevronRight } from "lucide-react";
import { useEco } from "@/context/ecocontext";

export default function HistoryPage() {
    // State buat ngontrol Sidebar Profil
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    
    // Tarik data riwayat real dari Context
    const { history } = useEco();

    return (
        <div className="min-h-screen bg-[#050505] text-zinc-100 font-sans italic selection:bg-emerald-500/30 overflow-x-hidden">
            
            {/* 1. HEADER (Kiri: Logo, Kanan: Menu Trigger) */}
            <Header onOpenSidebar={() => setIsSidebarOpen(true)} />

            {/* 2. SIDEBAR (Isinya Profil & Logout) */}
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
            
            <main className="pt-28 pb-40 px-6 md:px-16 w-full max-w-5xl mx-auto">
                
                {/* HEADER SECTION */}
                <div className="mb-12 space-y-2">
                    <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase flex items-center gap-4 text-white leading-none">
                        <Clock className="text-emerald-500" size={45} /> LOG <span className="text-emerald-500">HISTORY</span>
                    </h2>
                    <p className="text-zinc-600 font-bold uppercase text-[10px] tracking-[0.5em] ml-1 not-italic">
                        Arsip Aktivitas Pengelolaan Limbah Anda
                    </p>
                </div>

                {/* ACTIVITY LIST */}
                <div className="space-y-3">
                    {history.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                            className="py-32 border-2 border-dashed border-zinc-900 rounded-[3rem] text-center bg-zinc-950/50"
                        >
                            <Info className="mx-auto text-zinc-800 mb-4" size={50} />
                            <p className="text-zinc-600 font-black uppercase tracking-[0.3em] text-[10px] not-italic">
                                Belum ada aktivitas terekam. <br/> Selesaikan proses scan barang terlebih dahulu.
                            </p>
                        </motion.div>
                    ) : (
                        history.map((item, i) => (
                            <motion.div 
                                key={item.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className="p-6 bg-zinc-900/40 border border-white/5 rounded-[2rem] flex items-center justify-between group hover:bg-zinc-900 hover:border-emerald-500/30 transition-all cursor-pointer shadow-xl"
                            >
                                <div className="flex items-center gap-6">
                                    {/* ICON DINAMIS BERDASARKAN TIPE */}
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 ${
                                        item.type === 'SELL' ? 'bg-emerald-500/10 text-emerald-400' :
                                        item.type === 'SORT' ? 'bg-blue-500/10 text-blue-400' :
                                        item.type === 'DROP' ? 'bg-red-500/10 text-red-400' :
                                        'bg-zinc-800 text-zinc-500'
                                    }`}>
                                        {item.type === 'SELL' && <ShoppingBag size={24} />}
                                        {item.type === 'SORT' && <Recycle size={24} />}
                                        {item.type === 'DROP' && <Trash2 size={24} />}
                                        {item.type === 'SCAN' && <Scan size={24} />}
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-black text-white uppercase tracking-tighter italic leading-none group-hover:text-emerald-400 transition-colors">
                                            {item.title || "Item Terdeteksi"}
                                        </h3>
                                        <div className="flex items-center gap-3 mt-2 not-italic font-black text-[9px] uppercase tracking-[0.2em] text-zinc-600">
                                            <span className="flex items-center gap-1"><Clock size={10} /> {item.date}</span>
                                            <span className="w-1 h-1 bg-zinc-800 rounded-full" />
                                            <span className={`${
                                                item.status.includes('Listing') ? 'text-emerald-500' : 'text-zinc-500'
                                            }`}>{item.status}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* BAGIAN KANAN (SIMPEL TYPE INDICATOR) */}
                                <div className="flex items-center gap-4">
                                    <div className="hidden md:block text-right">
                                        <p className="text-[8px] font-black text-zinc-700 uppercase tracking-widest leading-none">Activity</p>
                                        <p className="text-[10px] font-black text-zinc-500 uppercase italic">{item.type}</p>
                                    </div>
                                    <div className="w-10 h-10 rounded-full bg-zinc-950 flex items-center justify-center text-zinc-800 group-hover:text-emerald-500 group-hover:bg-emerald-500/10 transition-all border border-white/5 shadow-inner">
                                        <ChevronRight size={18} />
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    )}
                </div>

                {/* FOOTER INFO */}
                <div className="mt-12 p-8 bg-zinc-950 rounded-[2.5rem] border border-white/5 flex items-start gap-4 italic shadow-2xl">
                    <Info className="text-emerald-500 shrink-0" size={20} />
                    <p className="text-xs text-zinc-600 leading-relaxed font-medium not-italic uppercase tracking-widest opacity-60">
                        Sinkronisasi Real-time dengan Eco-Cloud Aktif. Log aktivitas disimpan secara lokal untuk keamanan data.
                    </p>
                </div>
            </main>

            <BottomNav />
        </div>
    );
}