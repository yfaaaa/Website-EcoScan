"use client";
import { useState, useMemo } from "react";
import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import BottomNav from "@/components/layout/bottomnav";
import { motion, AnimatePresence } from "framer-motion";
import { 
    ShoppingBag, Plus, Trash2, X, Tag, 
    Image as ImageIcon, UploadCloud, MessageSquare, 
    Search, Edit3, AlertCircle 
} from "lucide-react";
import { useEco } from "@/context/ecocontext";

export default function ShopPage() {
    const { products, addProduct, deleteProduct, updateProduct, currentUser } = useEco();
    
    // --- STATE UI ---
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [editId, setEditId] = useState<string | null>(null); // State buat tau lagi edit atau baru
    
    // --- STATE FORM ---
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [desc, setDesc] = useState("");
    const [image, setImage] = useState(""); 

    // --- LOGIC SEARCH & FILTER ---
    const filteredProducts = useMemo(() => {
        return products.filter(p => 
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.desc.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [products, searchQuery]);

    // FUNGSI BUKA MODAL EDIT
    const openEditModal = (product: any) => {
        setEditId(product.id);
        setName(product.name);
        setPrice(product.price);
        setDesc(product.desc);
        setImage(product.image);
        setIsModalOpen(true);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setImage(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!image) return alert("Wajib ada foto bos!");

        if (editId) {
            // JALANKAN UPDATE
            updateProduct(editId, { name, price, desc, image });
        } else {
            // JALANKAN CREATE
            addProduct({ name, price, desc, image });
        }
        
        // Reset & Close
        closeModal();
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditId(null);
        setName(""); setPrice(""); setDesc(""); setImage("");
    };

    return (
        <div className="min-h-screen bg-[#050505] text-zinc-100 font-sans selection:bg-emerald-500/30 overflow-x-hidden italic">
            <Header onOpenSidebar={() => setIsSidebarOpen(true)} />
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
            
            <main className="pt-28 pb-40 px-6 md:px-16 w-full max-w-full relative z-10">
                
                {/* HEADER SECTION */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
                    <div className="space-y-2">
                        <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase text-white leading-none">
                            ECO <span className="text-emerald-500">SHOP</span>
                        </h2>
                        <p className="text-zinc-600 font-bold uppercase text-[10px] tracking-[0.4em] ml-1 not-italic">Search, Sell, and Update Your Items</p>
                    </div>
                    
                    <button 
                        onClick={() => setIsModalOpen(true)}
                        className="bg-emerald-500 text-black px-10 py-5 rounded-[2rem] font-black uppercase text-xs flex items-center gap-3 hover:bg-emerald-400 transition-all shadow-xl active:scale-95 not-italic"
                    >
                        <Plus size={20} strokeWidth={3} /> Jual Barang
                    </button>
                </div>

                {/* SEARCH BAR (LOGIC JALAN) */}
                <div className="mb-10 relative group max-w-md not-italic">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-700 group-focus-within:text-emerald-500 transition-colors" size={20} />
                    <input 
                        type="text" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Cari nama barang (ex: Anjay)..." 
                        className="w-full bg-zinc-900/50 border border-white/5 py-5 px-14 rounded-2xl outline-none focus:border-emerald-500/50 transition-all font-medium text-sm text-white" 
                    />
                </div>

                {/* GRID LIST BARANG */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {filteredProducts.length === 0 ? (
                        <div className="col-span-full py-32 border-2 border-dashed border-zinc-900 rounded-[3rem] text-center bg-zinc-900/10">
                            <AlertCircle className="mx-auto text-red-500 mb-4 opacity-50" size={64} />
                            <p className="text-zinc-500 font-black uppercase tracking-widest text-sm not-italic">
                                {searchQuery ? `Barang "${searchQuery}" belum tersedia` : "Pasar sedang kosong..."}
                            </p>
                        </div>
                    ) : (
                        filteredProducts.map((p) => (
                            <motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} key={p.id} className="bg-zinc-900/40 border border-white/5 rounded-[2.5rem] overflow-hidden group hover:border-emerald-500/30 transition-all shadow-2xl flex flex-col">
                                <div className="aspect-[4/3] w-full overflow-hidden bg-zinc-800 relative">
                                    <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                    
                                    {/* TOMBOL EDIT & DELETE (Hanya Seller) */}
                                    {p.seller === currentUser?.name && (
                                        <div className="absolute top-4 right-4 flex gap-2">
                                            <button onClick={() => openEditModal(p)} className="p-3 bg-emerald-500 text-black rounded-xl hover:bg-emerald-400 transition-all shadow-lg"><Edit3 size={16} /></button>
                                            <button onClick={() => deleteProduct(p.id)} className="p-3 bg-red-500/80 text-white rounded-xl hover:bg-red-600 transition-all shadow-lg"><Trash2 size={16} /></button>
                                        </div>
                                    )}
                                </div>

                                <div className="p-8 flex-1 flex flex-col">
                                    <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter leading-none mb-2">{p.name}</h3>
                                    <p className="text-emerald-400 font-black text-2xl mb-4 tracking-tighter">Rp {Number(p.price).toLocaleString('id-ID')}</p>
                                    <p className="text-zinc-500 text-xs line-clamp-2 mb-6 font-medium uppercase tracking-tight leading-relaxed flex-1 opacity-70">"{p.desc}"</p>
                                    <div className="pt-6 border-t border-white/5 flex justify-between items-center not-italic">
                                        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Seller: {p.seller}</span>
                                        <MessageSquare size={18} className="text-emerald-500" />
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    )}
                </div>
            </main>

            {/* MODAL UPDATE / CREATE */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[150] flex items-center justify-center px-6">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeModal} className="fixed inset-0 bg-black/95 backdrop-blur-md" />
                        <motion.div 
                            initial={{ scale: 0.9, y: 50 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 50 }}
                            className="bg-zinc-900 border border-white/10 w-full max-w-lg p-10 rounded-[3rem] relative z-10 shadow-2xl max-h-[90vh] overflow-y-auto not-italic"
                        >
                            <button onClick={closeModal} className="absolute top-8 right-8 text-zinc-500 hover:text-white"><X size={24}/></button>
                            <h3 className="text-4xl font-black text-white uppercase italic tracking-tighter mb-10 text-center">
                                {editId ? 'UPDATE' : 'SELL'} <span className="text-emerald-500">ITEM</span>
                            </h3>
                            
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="relative aspect-video w-full bg-zinc-950 border-2 border-dashed border-zinc-800 rounded-[2rem] overflow-hidden group hover:border-emerald-500/50 transition-all cursor-pointer">
                                    {image ? (
                                        <div className="relative w-full h-full">
                                            <img src={image} className="w-full h-full object-cover" />
                                            <button onClick={(e) => { e.preventDefault(); setImage(""); }} className="absolute top-4 right-4 p-2 bg-black/70 text-white rounded-full"><X size={16}/></button>
                                        </div>
                                    ) : (
                                        <label className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer">
                                            <UploadCloud className="text-zinc-800 group-hover:text-emerald-500 mb-2" size={32} />
                                            <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest text-center px-4">Upload physical evidence</span>
                                            <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                                        </label>
                                    )}
                                </div>

                                <div className="space-y-4">
                                    <input required value={name} placeholder="Nama Barang..." className="w-full bg-zinc-950 border border-white/5 p-5 rounded-2xl outline-none focus:border-emerald-500 transition-all text-sm font-bold" onChange={(e) => setName(e.target.value)} />
                                    <input required value={price} type="number" placeholder="Harga Jual..." className="w-full bg-zinc-950 border border-white/5 p-5 rounded-2xl outline-none focus:border-emerald-500 transition-all text-sm font-bold" onChange={(e) => setPrice(e.target.value)} />
                                    <textarea required value={desc} rows={4} placeholder="Deskripsi Barang..." className="w-full bg-zinc-950 border border-white/5 p-5 rounded-2xl outline-none focus:border-emerald-500 transition-all text-sm font-medium italic" onChange={(e) => setDesc(e.target.value)} />
                                </div>
                                
                                <button type="submit" className="w-full bg-emerald-500 text-black py-5 rounded-[1.8rem] font-black uppercase text-[10px] tracking-[0.2em] mt-6 shadow-xl hover:bg-emerald-400 transition-all">
                                    {editId ? 'Simpan Perubahan' : 'Luncurkan Ke Eco-Market'}
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <BottomNav />
        </div>
    );
}