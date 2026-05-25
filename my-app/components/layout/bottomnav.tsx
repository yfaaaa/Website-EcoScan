"use client";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { ShoppingBag, LayoutDashboard, History as HistoryIcon } from "lucide-react"; // GANTI DISINI
import { useRouter, usePathname } from "next/navigation";

export default function BottomNav() {
    const router = useRouter();
    const pathname = usePathname();

    const navItems = [
        { id: "shop", label: "EcoShop", icon: ShoppingBag, path: "/shop" },
        { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" }, // PAKE LAYOUTDASHBOARD
        { id: "history", label: "History", icon: HistoryIcon, path: "/history" },
    ];

    /** 
     * LOGIC ROTASI:
     * Yang aktif dipaksa ke tengah (Index 1)
     */
    const getDisplayItems = () => {
        if (pathname === "/shop") return [navItems[2], navItems[0], navItems[1]];
        if (pathname === "/history") return [navItems[1], navItems[2], navItems[0]];
        return navItems; // Default Dashboard di tengah
    };

    const displayItems = getDisplayItems();

    return (
        <div className="fixed bottom-0 left-0 right-0 z-[100] flex justify-center pb-8 pointer-events-none">
            <div className="relative flex items-end justify-center px-4 pointer-events-auto">
                
                {/* Background Bar */}
                <div className="absolute bottom-0 w-[320px] md:w-[400px] h-16 bg-zinc-900/90 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)]" />

                <LayoutGroup>
                    <div className="relative flex items-center justify-between w-[320px] md:w-[400px] px-8 h-16">
                        {displayItems.map((item) => {
                            const isActive = pathname === item.path;
                            const Icon = item.icon;

                            return (
                                <motion.button
                                    key={item.id}
                                    layout
                                    onClick={() => router.push(item.path)}
                                    transition={{
                                        type: "spring",
                                        stiffness: 400,
                                        damping: 30
                                    }}
                                    className="relative flex flex-col items-center justify-center w-16 h-full"
                                >
                                    <AnimatePresence mode="wait">
                                        {isActive ? (
                                            <motion.div
                                                key="active"
                                                initial={{ y: 20, opacity: 0 }}
                                                animate={{ y: -32, opacity: 1 }}
                                                exit={{ y: 20, opacity: 0 }}
                                                className="absolute flex flex-col items-center"
                                            >
                                                {/* Lingkaran Pop Up Hijau */}
                                                <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center shadow-[0_15px_30px_rgba(16,185,129,0.4)] border-4 border-[#050505]">
                                                    <Icon size={28} className="text-black" strokeWidth={3} />
                                                </div>
                                                <span className="mt-2 text-[10px] font-black uppercase tracking-widest text-emerald-400 italic">
                                                    {item.label}
                                                </span>
                                            </motion.div>
                                        ) : (
                                            <motion.div
                                                key="inactive"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                className="flex items-center justify-center text-zinc-500 hover:text-white transition-colors"
                                            >
                                                <Icon size={24} />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.button>
                            );
                        })}
                    </div>
                </LayoutGroup>
            </div>
        </div>
    )
}