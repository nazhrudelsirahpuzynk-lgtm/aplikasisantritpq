/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from "react";
import { Santri, Evaluation, AttendanceDay, TpqConfig } from "../types";
import { MosqueIcon, IslamicBorder } from "./IslamOrnaments";

interface RaportPDFViewProps {
  santri: Santri;
  evaluation?: Evaluation;
  attendanceDays: AttendanceDay[];
  tpqProfile: TpqConfig;
}

export default function RaportPDFView({ santri, evaluation, attendanceDays, tpqProfile }: React.PropsWithChildren<RaportPDFViewProps>) {
  const printAreaRef = useRef<HTMLDivElement>(null);

  // Calculate stats
  const totalDays = attendanceDays.length;
  let hadirCount = 0;
  let izinCount = 0;
  let sakitCount = 0;
  let alfaCount = 0;

  attendanceDays.forEach((day) => {
    const status = day.records[santri.id];
    if (status === "hadir") hadirCount++;
    else if (status === "izin") izinCount++;
    else if (status === "sakit") sakitCount++;
    else if (status === "alfa") alfaCount++;
  });

  const attendanceRate = totalDays > 0 ? Math.round((hadirCount / totalDays) * 100) : 100;

  // Evaluation grades mapping
  const grades = evaluation
    ? [
        { name: "Makhorijul Huruf", score: evaluation.makhorijul, label: getScoreLabel(evaluation.makhorijul) },
        { name: "Tajwid / Hukum Bacaan", score: evaluation.tajwid, label: getScoreLabel(evaluation.tajwid) },
        { name: "Kelancaran Membaca", score: evaluation.kelancaran, label: getScoreLabel(evaluation.kelancaran) },
        { name: "Hafalan Doa Pilihan", score: evaluation.hafalanDoa, label: getScoreLabel(evaluation.hafalanDoa) },
        { name: "Hafalan Surat Pendek", score: evaluation.hafalanSurat, label: getScoreLabel(evaluation.hafalanSurat) },
        { name: "Adab, Akhlak, & karakter", score: evaluation.adabAkhlak, label: getScoreLabel(evaluation.adabAkhlak) },
        { name: "Keaktifan di Madrasah", score: evaluation.keaktifan, label: getScoreLabel(evaluation.keaktifan) },
      ]
    : [
        { name: "Makhorijul Huruf", score: 80, label: "Baik (B)" },
        { name: "Tajwid / Hukum Bacaan", score: 75, label: "Cukup (C)" },
        { name: "Kelancaran Membaca", score: 85, label: "Baik (B)" },
        { name: "Hafalan Doa Pilihan", score: 90, label: "Sangat Baik (A)" },
        { name: "Hafalan Surat Pendek", score: 80, label: "Baik (B)" },
        { name: "Adab, Akhlak, & karakter", score: 95, label: "Sangat Baik (A)" },
        { name: "Keaktifan di Madrasah", score: 90, label: "Sangat Baik (A)" },
      ];

  const averageScore = Math.round(grades.reduce((acc, curr) => acc + curr.score, 0) / grades.length);

  function getScoreLabel(score: number): string {
    if (score >= 90) return "Sangat Baik (A)";
    if (score >= 80) return "Baik (B)";
    if (score >= 70) return "Cukup (C)";
    return "Perlu Bimbingan (D)";
  }

  const handlePrint = () => {
    // Elegant simulation of exporting to PDF in browser inside an iframe
    const printContent = printAreaRef.current?.innerHTML;
    const originalContent = document.body.innerHTML;

    if (printContent) {
      // Create a style block for the printed frame
      const style = document.createElement("style");
      style.innerHTML = `
        @media print {
          body { background: white; color: black; font-family: sans-serif; padding: 20px; }
          .no-print { display: none; }
          .print-border { border: 2px solid #d97706 !important; }
        }
      `;
      document.head.appendChild(style);

      // Open empty document inside a new print window or prompt the user
      // Since window.open might be blocked in sandboxed iframe, we trigger native print with styling
      const printWin = window.open("", "_blank");
      if (printWin) {
        printWin.document.write(`
          <html>
            <head>
              <title>E-Raport Santri - TPA Al Asyhar Sima</title>
              <script src="https://cdn.tailwindcss.com"></script>
              <style>
                body { font-family: 'Plus Jakarta Sans', sans-serif; }
                @media print {
                  .no-print { display: none !important; }
                }
              </style>
            </head>
            <body class="p-8 bg-white">
              <div class="max-w-3xl mx-auto border-4 border-double border-amber-600/40 p-6 rounded-2xl">
                ${printContent}
              </div>
              <div class="mt-8 text-center no-print">
                <button onclick="window.print();window.close();" class="px-6 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-sm font-semibold shadow">
                  Konfirmasi Cetak / Simpan PDF
                </button>
              </div>
            </body>
          </html>
        `);
        printWin.document.close();
      } else {
        // Fallback: Trigger a sweet UI notification / fallback file download
        alert("Pop-up diblokir browser. Silakan izinkan pop-up atau gunakan link Cetak di tab baru.");
      }
    }
  };

  return (
    <div className="space-y-4">
      {/* Target printable card wrapper */}
      <div
        ref={printAreaRef}
        className="bg-white text-slate-800 p-6 rounded-2xl border border-amber-500/20 shadow-md relative overflow-hidden"
      >
        {/* Subtle Watermark Mandala in Background */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
          <svg viewBox="0 0 100 100" className="w-96 h-96 text-emerald-900">
            <use href="#mandala" />
          </svg>
        </div>

        {/* Head of Report */}
        <div className="flex flex-col items-center text-center space-y-2 pb-4 border-b border-dashed border-emerald-900/10">
          <div className="w-12 h-12 bg-emerald-900 text-amber-400 rounded-full flex items-center justify-center shadow-md">
            <MosqueIcon className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold font-serif tracking-widest text-emerald-900 uppercase">
              LEMBAGA PENDIDIKAN AL-QUR'AN
            </h3>
            <h4 className="text-base font-extrabold text-amber-600 font-sans">
              TPA AL ASYHAR SIMA MOGA
            </h4>
            <p className="text-[10px] text-slate-500 italic max-w-xs mx-auto">
              {tpqProfile.address}
            </p>
          </div>
        </div>

        {/* Decorative Divider */}
        <IslamicBorder className="h-2 text-amber-500/20 my-2" />

        <div className="text-center py-2 bg-emerald-50 rounded-xl mb-4">
          <h2 className="text-xs font-extrabold uppercase tracking-widest text-emerald-950">
            RAPORT EVALUASI PERKEMBANGAN SANTRI
          </h2>
          <p className="text-[10px] font-mono text-emerald-800">
            Semester Genap • Tahun Ajaran 2026/2027
          </p>
        </div>

        {/* Metadata Details Grid */}
        <div className="grid grid-cols-2 gap-4 text-[11px] mb-6 border-b border-slate-100 pb-4">
          <div className="space-y-1">
            <table className="w-full">
              <tbody>
                <tr>
                  <td className="w-20 font-semibold text-slate-500">Nama Santri</td>
                  <td className="text-slate-800">: <strong>{santri.name}</strong></td>
                </tr>
                <tr>
                  <td className="font-semibold text-slate-500">No. Induk</td>
                  <td className="text-slate-800">: {santri.id}</td>
                </tr>
                <tr>
                  <td className="font-semibold text-slate-500">Alamat Wali</td>
                  <td className="text-slate-800">: {santri.address}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="space-y-1 pl-4 border-l border-slate-100">
            <table className="w-full">
              <tbody>
                <tr>
                  <td className="w-20 font-semibold text-slate-500">Kelas/Level</td>
                  <td className="text-slate-800">: <span className="px-2 py-0.5 bg-emerald-900 text-white rounded-md text-[9px] font-bold">{santri.classCategory}</span></td>
                </tr>
                <tr>
                  <td className="font-semibold text-slate-500">Wali Santri</td>
                  <td className="text-slate-800">: {santri.waliName}</td>
                </tr>
                <tr>
                  <td className="font-semibold text-slate-500">Tanggal Cetak</td>
                  <td className="text-slate-800">: {new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Academic Grades Table */}
        <div className="space-y-2 mb-6">
          <h5 className="text-[11px] font-bold text-emerald-950 uppercase tracking-wider">
            I. Evaluasi Nilai Kemampuan & Adab
          </h5>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-emerald-900 text-white font-semibold text-[10px] uppercase">
                  <th className="p-2 border border-slate-200 text-center w-8">No</th>
                  <th className="p-2 border border-slate-200">Aspek Evaluasi Belajar</th>
                  <th className="p-2 border border-slate-200 text-center w-16">Nilai</th>
                  <th className="p-2 border border-slate-200">Keterangan Capaian</th>
                </tr>
              </thead>
              <tbody>
                {grades.map((g, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors odd:bg-slate-50/30">
                    <td className="p-2 border border-slate-100 text-center font-mono text-slate-400">{idx + 1}</td>
                    <td className="p-2 border border-slate-100 font-medium text-slate-700">{g.name}</td>
                    <td className="p-2 border border-slate-100 text-center font-bold text-emerald-850 font-mono">{g.score}</td>
                    <td className="p-2 border border-slate-100 text-slate-600 text-[11px]">{g.label}</td>
                  </tr>
                ))}
                <tr className="bg-emerald-50/70 font-bold">
                  <td colSpan={2} className="p-2 border border-slate-200 text-right uppercase text-[10px] text-emerald-950">Rata-Rata Nilai Keseluruhan</td>
                  <td className="p-2 border border-emerald-300 text-center text-emerald-900 font-mono text-sm">{averageScore}</td>
                  <td className="p-2 border border-slate-200 text-emerald-950 font-sans tracking-wide text-[11px]">
                    {getScoreLabel(averageScore)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Attendance Summary */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="space-y-2">
            <h5 className="text-[11px] font-bold text-emerald-950 uppercase tracking-wider">
              II. Ringkasan Kehadiran
            </h5>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex justify-between items-center text-center text-xs">
              <div>
                <p className="text-[9px] text-slate-400 font-bold uppercase">Hadir</p>
                <p className="font-mono font-bold text-emerald-800 text-sm mt-0.5">{hadirCount}</p>
              </div>
              <div className="h-6 w-[1px] bg-slate-200"></div>
              <div>
                <p className="text-[9px] text-slate-400 font-bold uppercase">Izin</p>
                <p className="font-mono font-bold text-amber-600 text-sm mt-0.5">{izinCount}</p>
              </div>
              <div className="h-6 w-[1px] bg-slate-200"></div>
              <div>
                <p className="text-[9px] text-slate-400 font-bold uppercase">Sakit</p>
                <p className="font-mono font-bold text-blue-600 text-sm mt-0.5">{sakitCount}</p>
              </div>
              <div className="h-6 w-[1px] bg-slate-200"></div>
              <div>
                <p className="text-[9px] text-slate-400 font-bold uppercase">Alfa</p>
                <p className="font-mono font-bold text-red-600 text-sm mt-0.5">{alfaCount}</p>
              </div>
            </div>
            <p className="text-[10px] text-slate-500 font-medium italic mt-1">
              Presentase Kehadiran Belajar: <strong className="text-emerald-800">{attendanceRate}%</strong>
            </p>
          </div>

          <div className="space-y-2">
            <h5 className="text-[11px] font-bold text-emerald-950 uppercase tracking-wider">
              III. Catatan Bimbingan Ustadz
            </h5>
            <div className="p-3 bg-amber-500/10 rounded-xl border border-amber-500/10 min-h-[56px] text-[10.5px] leading-relaxed text-slate-700 font-medium italic">
              "{evaluation?.catatan || `${santri.name} telah menunjukkan perkembangan yang patut disyukuri selama kajian semester ini. Rajinlah mengulang tilawah di rumah.`}"
            </div>
          </div>
        </div>

        {/* Signature Blocks */}
        <div className="grid grid-cols-2 gap-4 text-center text-[10px] pt-4 border-t border-dashed border-emerald-900/10">
          <div className="space-y-12">
            <p className="text-slate-500 font-medium">Mengetahui,<br />Orang Tua / Wali Santri</p>
            <div className="space-y-1">
              <div className="w-28 mx-auto border-b border-slate-400"></div>
              <p className="font-bold text-slate-800">{santri.waliName}</p>
            </div>
          </div>
          <div className="space-y-12">
            <p className="text-slate-500 font-medium">Moga, Sima, {new Date().toLocaleDateString("id-ID", { month: "long", year: "numeric" })}<br />Kepala TPA Al Asyhar Sima</p>
            <div className="space-y-1">
              <div className="w-36 mx-auto border-b border-slate-400"></div>
              <p className="font-bold text-emerald-900">{tpqProfile.headmaster}</p>
              <p className="text-[8px] text-slate-400 uppercase tracking-widest font-mono">NIP. 201207.039</p>
            </div>
          </div>
        </div>
      </div>

      {/* Control Panel Actions */}
      <div className="flex space-x-3">
        <button
          type="button"
          onClick={handlePrint}
          className="flex-1 py-3 bg-amber-550 hover:bg-amber-600 text-emerald-950 rounded-xl text-xs font-bold shadow-md active:scale-[0.98] transition-all flex items-center justify-center space-x-2"
        >
          <span>📥 Cetak Dokumen / Simpan PDF</span>
        </button>
      </div>
    </div>
  );
}
