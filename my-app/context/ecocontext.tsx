"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

// 1. DEFINISI INTERFACES
interface User {
    name: string;
    email: string;
    password?: string;
    pts: number;
    avatar?: string; // Field Foto Profil
}

interface HistoryItem {
    id: string;
    type: 'SCAN' | 'SELL' | 'SORT' | 'DROP';
    title: string;
    date: string;
    points: string;
    status: string;
}

interface Product {
    id: string;
    name: string;
    price: string;
    desc: string;
    seller: string;
    image: string;
}

interface EcoContextType {
    currentUser: User | null;
    registeredUsers: User[];
    history: HistoryItem[];
    products: Product[];
    registerUser: (newUser: any) => void;
    loginUser: (email: string, pass: string) => { success: boolean; message: string };
    logout: () => void;
    updateUser: (newName: string, newEmail: string, newAvatar: string) => void; // Update Profil Lengkap
    addPoints: (amount: number) => void;
    addToHistory: (item: Omit<HistoryItem, 'id' | 'date'>) => void;
    addProduct: (item: Omit<Product, 'id' | 'seller'>) => void;
    deleteProduct: (id: string) => void;
    updateProduct: (id: string, updatedData: Partial<Product>) => void;
}

const EcoContext = createContext<EcoContextType | undefined>(undefined);

export const EcoProvider = ({ children }: { children: ReactNode }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [registeredUsers, setRegisteredUsers] = useState<User[]>([]);
    const [history, setHistory] = useState<HistoryItem[]>([]);
    const [products, setProducts] = useState<Product[]>([]);

    // 2. LOAD DATA DARI LOCALSTORAGE SAAT START
    useEffect(() => {
        const savedUsers = localStorage.getItem("eco_db");
        const savedActive = localStorage.getItem("eco_session");
        const savedHistory = localStorage.getItem("eco_history");
        const savedProducts = localStorage.getItem("eco_products");

        if (savedUsers) setRegisteredUsers(JSON.parse(savedUsers));
        if (savedActive) setCurrentUser(JSON.parse(savedActive));
        if (savedHistory) setHistory(JSON.parse(savedHistory));
        if (savedProducts) setProducts(JSON.parse(savedProducts));
    }, []);

    // 3. AUTO SAVE TIAP ADA PERUBAHAN
    useEffect(() => {
        if (registeredUsers.length > 0) localStorage.setItem("eco_db", JSON.stringify(registeredUsers));
        localStorage.setItem("eco_history", JSON.stringify(history));
        localStorage.setItem("eco_products", JSON.stringify(products));
        if (currentUser) localStorage.setItem("eco_session", JSON.stringify(currentUser));
    }, [registeredUsers, history, currentUser, products]);

    // --- LOGIKA AUTH & PROFIL ---
    const registerUser = (newUser: any) => {
        const userWithPoints = { ...newUser, pts: 0, avatar: "" };
        setRegisteredUsers((prev) => [...prev, userWithPoints]);
    };

    const loginUser = (email: string, pass: string) => {
        const found = registeredUsers.find((u: any) => u.email === email && u.password === pass);
        if (found) {
            setCurrentUser(found);
            return { success: true, message: "Berhasil masuk!" };
        }
        return { success: false, message: "Email atau Password salah!" };
    };

    const logout = () => {
        setCurrentUser(null);
        localStorage.removeItem("eco_session");
    };

    const updateUser = (newName: string, newEmail: string, newAvatar: string) => {
        if (!currentUser) return;
        
        // Buat objek user yang sudah diupdate
        const updatedUser = { 
            ...currentUser, 
            name: newName, 
            email: newEmail, 
            avatar: newAvatar 
        };
        
        // Update user aktif (Session)
        setCurrentUser(updatedUser);
        
        // Update di database registeredUsers (Permanent)
        setRegisteredUsers((prev) => 
            prev.map((u) => (u.email === currentUser.email ? updatedUser : u))
        );
    };

    // --- LOGIKA POIN & HISTORY ---
    const addPoints = (amount: number) => {
        setCurrentUser((prev) => {
            if (!prev) return null;
            const updated = { ...prev, pts: prev.pts + amount };
            setRegisteredUsers(users => users.map(u => u.email === prev.email ? updated : u));
            return updated;
        });
    };

    const addToHistory = (item: Omit<HistoryItem, 'id' | 'date'>) => {
        const newItem: HistoryItem = {
            ...item,
            id: Date.now().toString(),
            date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })
        };
        setHistory((prev) => [newItem, ...prev]);
    };

    // --- LOGIKA CRUD SHOP ---
    const addProduct = (item: Omit<Product, 'id' | 'seller'>) => {
        const newProd = {
            ...item,
            id: Date.now().toString(),
            seller: currentUser?.name || "EcoWarrior"
        };
        setProducts((prev) => [newProd, ...prev]);
    };

    const deleteProduct = (id: string) => {
        setProducts((prev) => prev.filter(p => p.id !== id));
    };

    const updateProduct = (id: string, updatedData: Partial<Product>) => {
        setProducts((prev) => 
            prev.map((p) => (p.id === id ? { ...p, ...updatedData } : p))
        );
    };

    return (
        <EcoContext.Provider value={{
            currentUser, registeredUsers, history, products,
            registerUser, loginUser, logout, updateUser,
            addPoints, addToHistory, 
            addProduct, deleteProduct, updateProduct
        }}>
            {children}
        </EcoContext.Provider>
    );
};

export const useEco = () => {
    const context = useContext(EcoContext);
    if (!context) throw new Error("useEco error");
    return context;
};