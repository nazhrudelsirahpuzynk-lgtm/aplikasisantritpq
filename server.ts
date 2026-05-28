/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

// Load environment variables
dotenv.config();

const PORT = 3000;

async function startServer() {
  const app = express();
  app.use(express.json());

  // AI Recommendation Endpoint (Server-Side to protect the Gemini API Key!)
  app.post("/api/recommendation", async (req, res) => {
    try {
      const {
        name,
        classCategory,
        makhorijul,
        tajwid,
        kelancaran,
        adabAkhlak,
        keaktifan,
        catatanUstadz,
      } = req.body;

      const apiKey = process.env.GEMINI_API_KEY;

      // Handle missing/placeholder keys gracefully
      if (!apiKey || apiKey === "MY_GEMINI_API_KEY" || apiKey.trim() === "") {
        const adabCategory = adabAkhlak >= 85 ? "Masya Allah, akhlaknya sangat terpuji" : "terus dibimbing adabnya";
        const fallbackText = `[Mode Demo - Tanpa API Key] Masya Allah, ananda ${name} di kelas ${classCategory} menunjukkan semangat yang membahagiakan. Dengan nilai kelancaran ${kelancaran}/100, ketepatan membaca (${makhorijul}/100), dan adab (${adabAkhlak}/100), ananda terus berprogres. Rekomendasi: Sering-seringlah disimak murojaahnya di rumah agar bacaannya semakin mantap dan tajwidnya (${tajwid}/100) lebih konsisten ditahan dengungnya. Barakallahu fiikum.`;
        return res.json({ recommendation: fallbackText });
      }

      // Initialize the official @google/genai client
      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });

      const prompt = `Analisis data belajar santri TPA AL ASYHAR SIMA berikut ini dan buatlah 2-3 kalimat catatan evaluasi / saran yang sangat ramah, hangat, penuh kasih sayang islami, dan memotivasi untuk wali santri (dalam Bahasa Indonesia). Gunakan doa khas ustadz (seperti Barakallahu fiikum, Jazakumullah khairan, Masya Allah, dll).

Informasi Santri:
- Nama Lengkap: ${name}
- Kelas/Jilid: ${classCategory}
- Nilai Makhorijul Huruf (ketepatan huruf): ${makhorijul}/100
- Nilai Tajwid (hukum bacaan): ${tajwid}/100
- Nilai Kelancaran Membaca: ${kelancaran}/100
- Nilai Adab & Akhlak di TPQ: ${adabAkhlak}/100
- Nilai Keaktifan Mengaji: ${keaktifan}/100
- Catatan Manual Ustadz: "${catatanUstadz || "Ananda bersemangat"}"

Berikan nasehat pedagogis yang konkret tentang apa yang perlu dilatih di rumah dan puji pencapaian terbaik mereka secara tulus.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
      });

      const recommendationText = response.text || "Tidak ada respon dari AI.";
      return res.json({ recommendation: recommendationText.trim() });
    } catch (error: any) {
      console.error("Gemini API Error:", error);
      return res.status(500).json({
        error: "Terjadi kesalahan saat memproses saran AI.",
        details: error.message || error,
      });
    }
  });

  // Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", app: "E-Santri TPQ" });
  });

  // Mount Vite or static file handlers depending on the state
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting server in DEVELOPMENT mode with Vite middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Serving production files from dist directory...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*all", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
