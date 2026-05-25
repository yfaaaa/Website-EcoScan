"use client";
import { useState, useEffect } from "react";
import { useEco } from "@/context/ecocontext";
import { motion, AnimatePresence } from "framer-motion";
import { User, LogOut, X, Mail, Edit3, Save, Camera, UploadCloud } from "lucide-react";

export default function Sidebar({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
    const { currentUser, logout, updateUser } = useEco();
    
    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newAvatar, setNewAvatar] = useState(""); // State buat foto baru

    useEffect(() => {
        if (currentUser) {
            setNewName(currentUser.name);
            setNewEmail(currentUser.email);
            setNewAvatar(currentUser.avatar || "");
        }
    }, [currentUser, isOpen]);

    // FUNGSI HANDLE UPLOAD FOTO
    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewAvatar(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = () => {
        updateUser(newName, newEmail, newAvatar);
        setIsEditing(false);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[70]" />
                    
                    <motion.div 
                        initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} 
                        className="fixed top-0 right-0 h-full w-full max-w-sm bg-[#0a0a0a] border-l border-white/10 z-[80] p-10 flex flex-col shadow-2xl"
                    >
                        <button onClick={onClose} className="absolute top-8 right-8 text-zinc-500 hover:text-white"><X size={28} /></button>
                        
                        <div className="mt-16 flex-1 space-y-10 overflow-y-auto no-scrollbar">
                            <div className="flex flex-col items-center">
                                
                                {/* LINGKARAN FOTO PROFIL */}
                                <div className="relative group mb-6">
                                    <div className="w-32 h-32 bg-zinc-900 rounded-[2.5rem] border-2 border-emerald-500/30 p-1 overflow-hidden">
                                        {newAvatar ? (
                                            <img src={newAvatar} alt="Profile" className="w-full h-full object-cover rounded-[2.2rem]" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-emerald-500/10 text-emerald-500">
                                                <User size={60} strokeWidth={1.5} />
                                            </div>
                                        )}
                                    </div>

                                    {/* TOMBOL OVERLAY KAMERA (CUMA MUNCUL PAS EDIT) */}
                                    {isEditing && (
                                        <label className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 rounded-[2.5rem] cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity border-2 border-dashed border-emerald-500">
                                            <Camera size={24} className="text-emerald-400 mb-1" />
                                            <span className="text-[8px] font-black text-white uppercase">Upload</span>
                                            <input type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
                                        </label>
                                    )}
                                </div>

                                {isEditing ? (
                                    <div className="w-full space-y-4 not-italic">
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-black text-emerald-500 uppercase ml-2 tracking-widest">Display Name</label>
                                            <input value={newName} onChange={(e) => setNewName(e.target.value)} className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-emerald-500" />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-black text-emerald-500 uppercase ml-2 tracking-widest">Email Identity</label>
                                            <input value={newEmail} onChange={(e) => setNewEmail(e.target.value)} className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-emerald-500" />
                                        </div>
                                        <button onClick={handleSave} className="w-full bg-emerald-500 text-black py-4 rounded-xl font-black uppercase text-xs flex items-center justify-center gap-2 mt-4 shadow-xl"><Save size={16} /> Save Changes</button>
                                        <button onClick={() => setIsEditing(false)} className="w-full text-zinc-500 text-[10px] font-bold uppercase tracking-widest">Cancel</button>
                                    </div>
                                ) : (
                                    <div className="text-center space-y-2">
                                        <h3 className="text-4xl font-black text-white uppercase italic tracking-tighter leading-none">{currentUser?.name}</h3>
                                        <p className="text-zinc-500 text-xs font-bold uppercase tracking-[0.2em]">{currentUser?.email}</p>
                                        <button onClick={() => setIsEditing(true)} className="mt-6 flex items-center gap-2 text-[10px] font-black text-emerald-500 border border-emerald-500/20 px-5 py-2.5 rounded-full hover:bg-emerald-500 hover:text-black transition-all mx-auto uppercase">
                                            <Edit3 size={12} /> Edit Personal Info
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        <button onClick={() => { logout(); onClose(); }} className="w-full py-5 bg-red-500/10 text-red-500 rounded-[2rem] font-black text-xs uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all mb-10 shadow-xl">
                            Terminate Session
                        </button>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}