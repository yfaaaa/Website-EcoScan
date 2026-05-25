"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar"; // Import Sidebar
import BottomNav from "@/components/layout/bottomnav";
import { motion, AnimatePresence } from "framer-motion";
import {
    Camera, Zap, RefreshCw, Sparkles, ShoppingBag,
    Recycle, Trash2, CheckCircle2, Truck, MapPin
} from "lucide-react";
import { analyzeItemScan } from "@/lib/gemini";
import { useEco } from "@/context/ecocontext";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import "@tensorflow/tfjs";

export default function ScanPage() {
    const { addPoints, addToHistory } = useEco();
    const router = useRouter();

    // --- STATE MANAGEMENT ---
    const videoRef = useRef<HTMLVideoElement>(null);
    const [model, setModel] = useState<any>(null);
    const [isScanning, setIsScanning] = useState(false);
    const [hasStarted, setHasStarted] = useState(false);
    const [prediction, setPrediction] = useState("");
    const [aiSaran, setAiSaran] = useState("");
    const [loadingAi, setLoadingAi] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [disposalMode, setDisposalMode] = useState(false);

    // 1. Load Model AI
    useEffect(() => {
        const loadModel = async () => {
            const loadedModel = await cocoSsd.load();
            setModel(loadedModel);
        };
        loadModel();
    }, []);

    // 2. Fungsi Mulai Kamera
    const startVideo = async () => {
        setHasStarted(true);
        setPrediction("");
        setAiSaran("");
        setDisposalMode(false);
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: { facingMode: "environment" },
                });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            } catch (err) { alert("Gagal akses kamera!"); }
        }
    };

    // 3. Fungsi Deteksi & Analisis Gemini
    const handleCapture = async () => {
        if (model && videoRef.current) {
            setIsScanning(true);
            const predictions = await model.detect(videoRef.current);

            if (predictions.length > 0) {
                const itemFound = predictions[0].class.toUpperCase();
                setPrediction(itemFound);
                setLoadingAi(true);
                try {
                    const saran = await analyzeItemScan(itemFound);
                    setAiSaran(saran);
                } catch (error) { setAiSaran("Gagal mendapatkan saran AI."); }
                setLoadingAi(false);
            } else { alert("Objek tidak ditemukan!"); }
            setIsScanning(false);
        }
    };

    // 4. FUNGSI FINAL: SINKRON POIN, HISTORY, & PAGE
    const handleFinalAction = (type: 'jual' | 'pilah' | 'jemput' | 'sendiri') => {
        let pts = 0;
        let historyType: 'SELL' | 'SORT' | 'DROP' = 'SCAN' as any;
        let statusText = "Selesai";
        let targetPath = "/dashboard";

        if (type === 'jual') {
            pts = 500; historyType = 'SELL'; statusText = "Listing Market"; targetPath = "/shop";
        } else if (type === 'pilah') {
            pts = 200; historyType = 'SORT'; statusText = "Pilah Selesai"; targetPath = "/pilah";
        } else if (type === 'jemput') {
            pts = 50; historyType = 'DROP'; statusText = "Jemput Kurir";
        } else if (type === 'sendiri') {
            pts = 100; historyType = 'DROP'; statusText = "Drop-off Berhasil";
        }

        // Jalankan Fungsi Context444444
        addPoints(pts);
        addToHistory({
            title: prediction || "Barang Bekas",
            type: historyType,
            points: `+${pts}`,
            status: statusText
        });

        setShowSuccess(true);
        setTimeout(() => {
            setShowSuccess(false);
            router.push(targetPath);
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white selection:bg-emerald-500/30 font-sans italic">
            <Header onOpenSidebar={() => setIsSidebarOpen(true)} />
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            <main className="pt-28 pb-40 px-6 max-w-2xl mx-auto flex flex-col items-center">
                <h2 className="text-4xl font-black tracking-tighter uppercase mb-2">AI Scanner</h2>
                <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-8 not-italic tracking-[0.3em]">Precision Recognition</p>

                {/* VIEWPORT KAMERA */}
                <div className="relative w-full aspect-[3/4] bg-zinc-900 rounded-[3rem] border-2 border-emerald-500/20 overflow-hidden shadow-2xl">
                    {hasStarted ? (
                        <video ref={videoRef} autoPlay muted playsInline className="w-full h-full object-cover" />
                    ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4">
                            <Camera size={48} className="text-emerald-500 opacity-20" />
                            <button onClick={startVideo} className="px-8 py-3 bg-emerald-500 text-black font-black rounded-2xl uppercase text-[10px] not-italic tracking-widest">Aktifkan Kamera</button>
                        </div>
                    )}
                    <AnimatePresence>
                        {isScanning && (
                            <motion.div animate={{ top: ["0%", "100%", "0%"] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                className="absolute left-0 right-0 h-[2px] bg-emerald-400 shadow-[0_0_20px_#10b981] z-10" />
                        )}
                    </AnimatePresence>
                </div>

                {/* HASIL & 4 MENU */}
                {prediction && !showSuccess && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full mt-10 space-y-6">
                        {!disposalMode ? (
                            <div className="space-y-6">
                                <div className="p-8 bg-zinc-900 border border-emerald-500/20 rounded-[2.5rem]">
                                    <h3 className="text-2xl font-black uppercase italic text-emerald-400 leading-none mb-2">DITEMUKAN: {prediction}!</h3>
                                    <p className="text-sm text-zinc-400 leading-relaxed italic">{loadingAi ? "Gemini sedang menganalisis..." : `"${aiSaran}"`}</p>
                                </div>
                                <div className="grid grid-cols-1 gap-3 not-italic">
                                    <button onClick={() => handleFinalAction('jual')} className="flex items-center justify-between p-6 bg-emerald-500 text-black rounded-2xl font-black uppercase italic tracking-tighter hover:scale-[1.02] transition-all">
                                        <div className="flex items-center gap-3"><ShoppingBag size={20} /> Jual Ke Market</div>
                                        <span className="text-[10px] bg-black/10 px-2 py-1 rounded-lg">+500 PTS</span>
                                    </button>
                                    <button onClick={() => handleFinalAction('pilah')} className="flex items-center justify-between p-6 bg-zinc-900 border border-white/10 rounded-2xl font-black uppercase italic tracking-tighter hover:border-emerald-500 transition-all">
                                        <div className="flex items-center gap-3"><Recycle size={20} /> Pilah Sendiri</div>
                                        <span className="text-[10px] text-emerald-500">+200 PTS</span>
                                    </button>
                                    <button onClick={() => setDisposalMode(true)} className="flex items-center justify-between p-6 bg-zinc-950 border border-red-500/20 text-red-500 rounded-2xl font-black uppercase italic tracking-tighter hover:bg-red-500/10 transition-all">
                                        <div className="flex items-center gap-3"><Trash2 size={20} /> Buang Sampah</div>
                                        <span className="text-[10px] opacity-70">Opsi Buang</span>
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-4 not-italic">
                                <button onClick={() => handleFinalAction('sendiri')} className="w-full flex items-center justify-between p-6 bg-zinc-900 border border-blue-500/30 rounded-2xl text-blue-400 font-black uppercase italic">
                                    <div className="flex items-center gap-3"><MapPin size={20}/> Buang Sendiri (Depo)</div>
                                    <span className="text-[10px]">+100 PTS</span>
                                </button>
                                <button onClick={() => handleFinalAction('jemput')} className="w-full flex items-center justify-between p-6 bg-zinc-900 border border-white/5 rounded-2xl text-zinc-400 font-black uppercase italic">
                                    <div className="flex items-center gap-3"><Truck size={20}/> Layanan Jemput</div>
                                    <span className="text-[10px]">+50 PTS</span>
                                </button>
                                <button onClick={() => setDisposalMode(false)} className="w-full text-zinc-600 font-bold uppercase text-[10px] mt-4 tracking-widest text-center">Kembali</button>
                            </div>
                        )}
                    </motion.div>
                )}

                {/* MODAL SUKSES */}
                <AnimatePresence>
                    {showSuccess && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] flex items-center justify-center px-6 bg-black/90 backdrop-blur-md text-center">
                            <div className="bg-zinc-900 border border-emerald-500/30 p-12 rounded-[3rem]">
                                <CheckCircle2 size={60} className="mx-auto text-emerald-400 mb-6 animate-bounce" />
                                <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter">DATA MASUK!</h2>
                                <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.3em] mt-4 italic">Sinkronisasi Poin & Riwayat...</p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* TOMBOL SCAN AWAL */}
                {hasStarted && !prediction && (
                    <button onClick={handleCapture} disabled={isScanning} className="mt-8 w-full py-5 bg-zinc-900 border border-emerald-500/30 rounded-2xl font-black uppercase text-xs tracking-[0.3em] flex items-center justify-center gap-3 transition-all active:scale-95 shadow-xl">
                        {isScanning ? <RefreshCw className="animate-spin" /> : <Zap fill="currentColor" />}
                        {isScanning ? "PROCESSING..." : "Capture Object"}
                    </button>
                )}
            </main>
            <BottomNav />
        </div>
    );
}