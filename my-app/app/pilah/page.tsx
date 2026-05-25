"use client";
import { useState } from "react";
import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import BottomNav from "@/components/layout/bottomnav";
import { motion } from "framer-motion";
import { 
    Recycle, PlayCircle, ChevronRight, 
    Info, CheckCircle2, Hammer, Droplets, Layers 
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function PilahPage() {
    const router = useRouter();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);

    // Dummy data untuk presentasi (Komponen Barang yang dipilah)
    const materials = [
        { name: "Besi/Logam", desc: "Bagian per atau kerangka utama.", icon: Layers, color: "text-blue-400" },
        { name: "Kayu Solid", desc: "Papan penyangga bagian dalam.", icon: Hammer, color: "text-orange-400" },
        { name: "Busa/Kain", desc: "Lapisan pembungkus dan kenyamanan.", icon: Droplets, color: "text-emerald-400" },
    ];

    return (
        <div className="min-h-screen bg-[#050505] text-zinc-100 font-sans italic selection:bg-emerald-500/30 overflow-x-hidden">
            <Header onOpenSidebar={() => setIsSidebarOpen(true)} />
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            <main className="pt-28 pb-40 px-6 md:px-16 w-full max-w-5xl mx-auto space-y-10">
                
                {/* HEADER SECTION */}
                <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-[10px] font-black text-blue-400 uppercase tracking-widest not-italic">
                        <Recycle size={12} /> Sorting Center Active
                    </div>
                    <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase text-white leading-none">
                        PROSES <span className="text-blue-400">PILAH</span>
                    </h2>
                    <p className="text-zinc-500 font-bold uppercase text-[10px] tracking-[0.4em] ml-1 not-italic opacity-70">
                        Panduan AI untuk pemisahan material secara mandiri
                    </p>
                </div>

                {/* VIDEO TUTORIAL SECTION */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    className="relative aspect-video w-full bg-zinc-900 border border-white/5 rounded-[3rem] overflow-hidden group shadow-2xl"
                >
                    <img 
                        src="https://images.unsplash.com/photo-1581578731522-aa7c041f021e?q=80&w=1000" 
                        className="w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-1000" 
                        alt="Sorting Guide"
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <PlayCircle size={80} className="text-white opacity-80 group-hover:text-emerald-400 group-hover:scale-110 transition-all cursor-pointer" strokeWidth={1} />
                        <p className="mt-4 font-black uppercase tracking-[0.3em] text-[10px] text-white/50 group-hover:text-white transition-all">Watch AI-Guide Video</p>
                    </div>
                    <div className="absolute bottom-6 left-6 right-6 p-6 bg-black/60 backdrop-blur-md rounded-2xl border border-white/5">
                        <h4 className="font-bold text-sm uppercase italic">Cara Memisahkan Busa dari Kerangka Kayu</h4>
                        <p className="text-[10px] text-zinc-400 mt-1 not-italic">Durasi: 02:45 • Tingkat Kesulitan: Sedang</p>
                    </div>
                </motion.div>

                {/* MATERIAL LIST */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {materials.map((m, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                            className="p-6 bg-zinc-900/50 border border-white/5 rounded-3xl hover:border-blue-400/30 transition-all"
                        >
                            <m.icon className={`${m.color} mb-4`} size={24} />
                            <h5 className="font-black uppercase tracking-tighter text-lg leading-none mb-2">{m.name}</h5>
                            <p className="text-[10px] text-zinc-500 font-medium leading-relaxed not-italic uppercase tracking-widest">{m.desc}</p>
                        </motion.div>
                    ))}
                </div>

                {/* ACTION FOOTER */}
                <div className="p-8 bg-zinc-900 border border-white/5 rounded-[2.5rem] flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-emerald-500/10 rounded-2xl text-emerald-500"><Info size={20} /></div>
                        <div>
                            <p className="text-white font-bold text-sm italic tracking-tighter">Sudah selesai memilah?</p>
                            <p className="text-[10px] text-zinc-500 uppercase font-black tracking-widest mt-1">Pastikan material tajam dibungkus dengan aman!</p>
                        </div>
                    </div>
                    <button 
                        onClick={() => setIsCompleted(true)}
                        className="px-10 py-5 bg-emerald-500 text-black font-black rounded-2xl hover:bg-emerald-400 transition-all shadow-xl shadow-emerald-500/10 uppercase tracking-widest text-[10px] not-italic active:scale-95"
                    >
                        Konfirmasi Pemilahan
                    </button>
                </div>
            </main>

            {/* MODAL BERHASIL (SAMA DENGAN SCAN) */}
            {isCompleted && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-md px-6 text-center">
                    <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-zinc-900 border border-emerald-500/30 p-12 rounded-[3rem]">
                        <CheckCircle2 size={60} className="mx-auto text-emerald-400 mb-6 animate-bounce" />
                        <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter leading-none mb-2">RECYCLE <br/> <span className="text-emerald-500">COMPLETE!</span></h2>
                        <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-[0.3em] mt-6">Redirecting to Home...</p>
                        <button 
                            onClick={() => router.push("/dashboard")}
                            className="mt-10 px-8 py-3 bg-zinc-800 text-zinc-400 rounded-xl text-[10px] font-black uppercase tracking-widest border border-white/5"
                        >
                            Skip to Dashboard
                        </button>
                    </motion.div>
                </div>
            )}

            <BottomNav />
        </div>
    );
}