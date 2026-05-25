"use client";
import { Menu } from "lucide-react";
import { motion } from "framer-motion";

export default function Header({ onOpenSidebar }: { onOpenSidebar: () => void }) {
    return (
        <header className="fixed top-0 left-0 right-0 h-20 z-[60] flex items-center justify-between px-6 md:px-12 bg-black/40 backdrop-blur-xl border-b border-white/5">
            
            {/* LOGO DENGAN CONTAINER PUTIH (BIAR KELIHATAN) */}
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-2xl p-2 shadow-[0_0_15px_rgba(255,255,255,0.1)] flex items-center justify-center overflow-hidden">
                    <motion.img 
                        whileHover={{ scale: 1.1 }}
                        src="/ecoscan.png" 
                        alt="Logo" 
                        className="w-full h-full object-contain" 
                    />
                </div>
                <div className="flex flex-col">
                    <span className="text-xl font-black tracking-tighter uppercase italic text-white leading-none">EcoScan</span>
                    <span className="text-[8px] font-black text-emerald-500 uppercase tracking-[0.3em]">AI Intelligence</span>
                </div>
            </div>

            {/* TOMBOL MENU */}
            <button 
                onClick={onOpenSidebar}
                className="p-3 bg-zinc-900 border border-white/10 rounded-2xl hover:bg-emerald-500 hover:text-black transition-all group"
            >
                <Menu size={22} />
            </button>
        </header>
    );
}