// lib/gemini.ts
import { GoogleGenerativeAI } from "@google/generative-ai";

// PANGGIL DARI ENV BIAR AMAN ANJING!
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "");

export async function askGeminiDashboard(prompt: any) {
    try {
        // Pake model yang paling stabil
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        if (typeof prompt === "string") {
            const result = await model.generateContent(`Kamu asisten EcoScan. Jawab singkat: ${prompt}`);
            return result.response.text();
        }

        // Pastiin history gak kosong
        const history = (prompt && Array.isArray(prompt)) ? prompt.slice(0, -1) : [];
        const chat = model.startChat({ history });

        const lastMessage = prompt[prompt.length - 1]?.parts[0]?.text || "Halo";
        const result = await chat.sendMessage(lastMessage);
        return result.response.text();

    } catch (error: any) {
        console.error("Gemini Error:", error);

        // INI PELINDUNG KALAU GOOGLE LAGI MATI (KAYAK SEKARANG)
        if (error.message.includes("404") || error.message.includes("not found")) {
            return "Woi, server AI Google pusat lagi down/error global. Coba lagi nanti kalau Google udah bener!";
        }

        return "AI lagi pusing, mungkin jatah gratisan lo abis atau server down.";
    }
}

export async function analyzeItemScan(itemName: string) {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(`Saran 2 kalimat buat sampah ${itemName}`);
        return result.response.text();
    } catch (error) {
        return "Server Google lagi gangguan.";
    }
}