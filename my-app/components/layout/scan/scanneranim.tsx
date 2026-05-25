"use client";
import { motion } from "framer-motion";

export default function ScannerAnim() {
    return (
        <div className="absolute inset-0 pointer-events-none z-20">
            {/* Garis Laser Bergerak */}
            <motion.div
                initial={{ top: "0%" }}
                animate={{ top: "100%" }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear"
                }}
                className="absolute left-0 right-0 h-[2px] bg-emerald-500 shadow-[0_0_25px_#10b981,0_0_10px_#10b981] z-30"
            />

            {/* Efek Gradasi Laser */}
            <motion.div
                initial={{ top: "-20%" }}
                animate={{ top: "100%" }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear"
                }}
                className="absolute left-0 right-0 h-[150px] bg-gradient-to-b from-emerald-500/0 via-emerald-500/10 to-emerald-500/0 z-20"
            />

            {/* Grid Overlay Scanner */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.05)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

            {/* Frame Pojok Scanner */}
            <div className="absolute top-10 left-10 w-8 h-8 border-t-2 border-l-2 border-emerald-500/50 rounded-tl-xl" />
            <div className="absolute top-10 right-10 w-8 h-8 border-t-2 border-r-2 border-emerald-500/50 rounded-tr-xl" />
            <div className="absolute bottom-10 left-10 w-8 h-8 border-b-2 border-l-2 border-emerald-500/50 rounded-bl-xl" />
            <div className="absolute bottom-10 right-10 w-8 h-8 border-b-2 border-r-2 border-emerald-500/50 rounded-br-xl" />
        </div>
    );
}