"use client";
import { motion } from "framer-motion";
import { Leaf, ArrowRight, ShieldCheck, Zap, Globe } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white overflow-hidden relative">
      {/* Efek Cahaya Background (Glow) */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-mint-500/10 rounded-full blur-[120px]" />

      {/* Navbar Minimalis */}
      <nav className="flex justify-between items-center px-8 py-6 relative z-10">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-emerald-500 rounded-lg text-zinc-950"><Leaf size={20} fill="currentColor" /></div>
          <span className="text-xl font-bold tracking-tighter uppercase">EcoScan</span>
        </div>
        <Link href="/login" className="text-sm font-bold text-zinc-400 hover:text-emerald-400 transition-colors">
          Masuk
        </Link>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 flex flex-col items-center justify-center text-center px-4 pt-20 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold tracking-widest uppercase mb-6 inline-block">
            AI-Powered Eco Technology
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent">
            Kelola Sampah Besar <br /> Jadi Lebih Cerdas.
          </h1>
          <p className="text-zinc-400 max-w-2xl mx-auto text-lg mb-10">
            Gunakan kekuatan AI untuk mendeteksi, menjual, atau mendaur ulang barang bekas besar Anda. Dapatkan EcoPoints dan selamatkan bumi sekarang.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-emerald-500 text-zinc-950 font-bold rounded-2xl flex items-center gap-2 shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:bg-emerald-400 transition-all"
              >
                Mulai Sekarang <ArrowRight size={20} />
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* Fitur Singkat */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 max-w-5xl mx-auto w-full"
        >
          <div className="p-6 rounded-3xl bg-zinc-900/50 border border-zinc-800 backdrop-blur-sm text-left">
            <Zap className="text-emerald-400 mb-4" />
            <h3 className="font-bold text-lg mb-2">Scan Cepat</h3>
            <p className="text-zinc-500 text-sm">Deteksi jenis barang dan nilai ekonomisnya dalam hitungan detik.</p>
          </div>
          <div className="p-6 rounded-3xl bg-zinc-900/50 border border-zinc-800 backdrop-blur-sm text-left">
            <ShieldCheck className="text-emerald-400 mb-4" />
            <h3 className="font-bold text-lg mb-2">Terpercaya</h3>
            <p className="text-zinc-500 text-sm">Sistem penjemputan aman dan transparan untuk setiap transaksi.</p>
          </div>
          <div className="p-6 rounded-3xl bg-zinc-900/50 border border-zinc-800 backdrop-blur-sm text-left">
            <Globe className="text-emerald-400 mb-4" />
            <h3 className="font-bold text-lg mb-2">Ramah Lingkungan</h3>
            <p className="text-zinc-500 text-sm">Pastikan limbah Anda tidak berakhir di tempat yang salah.</p>
          </div>
        </motion.div>
      </main>

      {/* Footer Minimalis */}
      <footer className="text-center py-10 text-zinc-600 text-xs border-t border-zinc-900 relative z-10">
        &copy; 2024 EcoScan AI. Teknologi Masa Depan untuk Bumi.
      </footer>
    </div>
  );
}