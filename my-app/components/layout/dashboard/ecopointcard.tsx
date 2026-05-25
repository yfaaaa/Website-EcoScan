"use client";
import { motion } from "framer-motion";
import { Trophy, Zap } from "lucide-react";

export default function EcoPointCard() {
    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-8 bg-zinc-900 border border-white/5 rounded-[2.5rem] relative overflow-hidden group shadow-2xl"
        >
            <div className="flex justify-between items-start mb-8 relative z-10">
                <div>
                    <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.3em] mb-1">EcoPoint Kamu</p>
                    <h3 className="text-4xl font-black text-emerald-400 tracking-tighter">
                        1,250 <span className="text-zinc-600 text-sm italic tracking-normal font-bold uppercase">pts</span>
                    </h3>
                </div>
                <div className="p-3 bg-emerald-500/10 rounded-2xl text-emerald-400 group-hover:rotate-12 transition-transform">
                    <Trophy size={24} />
                </div>
            </div>

            <div className="space-y-4 relative z-10">
                <div className="flex justify-between items-end font-black uppercase tracking-widest text-[10px]">
                    <span className="text-zinc-400">Elite Warrior</span>
                    <span className="text-zinc-600">750 PTS TO MASTER</span>
                </div>
                <div className="w-full h-3 bg-zinc-800 rounded-full overflow-hidden p-[2px]">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "65%" }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="h-full bg-emerald-500 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.5)]"
                    />
                </div>
                <div className="flex items-center gap-3 p-4 bg-zinc-950/50 rounded-2xl border border-white/5">
                    <Zap size={14} className="text-emerald-500 fill-current" />
                    <p className="text-[10px] text-zinc-500 font-bold uppercase leading-tight italic">
                        Dapatkan <span className="text-white">200 pts tambahan</span> dengan melakukan 1 scan lagi hari ini!
                    </p>
                </div>
            </div>

            {/* Dekorasi Background */}
            <div className="absolute right-[-20px] bottom-[-20px] opacity-[0.03] text-emerald-500 pointer-events-none">
                <Trophy size={180} />
            </div>
        </motion.div>
    );
}