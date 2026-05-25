"use client";
import { motion } from "framer-motion";
import { ArrowUpRight, Newspaper } from "lucide-react";

const NEWS_DATA = [
    { title: "Sofa Bekas Jadi Aset? AI EcoScan Ungkap Caranya", tag: "Tech", date: "Today" },
    { title: "Daur Ulang Elektronik Meningkat 40% di Malang", tag: "Eco", date: "Yesterday" },
    { title: "Voucher Listrik Gratis Dari Tukar Poin EcoScan", tag: "Update", date: "2 Days ago" },
];

export default function NewsCarousel() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between px-4">
                <div className="flex items-center gap-2 text-zinc-600 font-black text-[10px] uppercase tracking-[0.4em]">
                    <Newspaper size={14} /> Global Eco Feed
                </div>
                <button className="text-[10px] font-black text-emerald-500 uppercase tracking-widest hover:underline">
                    Lihat Semua
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {NEWS_DATA.map((news, i) => (
                    <motion.div
                        key={i}
                        whileHover={{ y: -5, borderColor: "rgba(16,185,129,0.3)" }}
                        className="p-6 bg-zinc-900/40 border border-white/5 rounded-[2rem] transition-all cursor-pointer group relative overflow-hidden"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <span className="text-emerald-500 text-[10px] font-black uppercase tracking-widest bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                                {news.tag}
                            </span>
                            <ArrowUpRight size={16} className="text-zinc-700 group-hover:text-emerald-400 transition-colors" />
                        </div>
                        <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors leading-tight mb-4 tracking-tight">
                            {news.title}
                        </h3>
                        <p className="text-zinc-600 text-[10px] font-black uppercase">{news.date}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}