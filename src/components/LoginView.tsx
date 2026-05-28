/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { UserRole } from "../types";
import { MosqueIcon, IslamicMandala } from "./IslamOrnaments";

interface LoginViewProps {
  onLoginSuccess: (role: UserRole, username: string, waliOfSantriId?: string) => void;
}

export default function LoginView({ onLoginSuccess }: LoginViewProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [role, setRole] = useState<UserRole>("ustadz");
  const [error, setError] = useState("");
  const [isResetting, setIsResetting] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetSuccess, setResetSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) {
      setError("Silakan masukkan nama pengguna.");
      return;
    }
    if (password.length < 4) {
      setError("Kata sandi minimal 4 karakter.");
      return;
    }

    // Pass role-based success
    let targetSantriId = undefined;
    if (role === "wali") {
      // Default to first santri (Ahmad Fauzan S-101) or second for the demo
      targetSantriId = username.toLowerCase().includes("fatimah") ? "S-102" : "S-101";
    }
    
    setError("");
    onLoginSuccess(role, username, targetSantriId);
  };

  const handlePresetSelect = (presetRole: UserRole) => {
    setRole(presetRole);
    if (presetRole === "admin") {
      setUsername("admin.asyhar");
      setPassword("admin123");
    } else if (presetRole === "ustadz") {
      setUsername("ustadzah.fatimah");
      setPassword("ustadzah123");
    } else {
      setUsername("wali.fauzan");
      setPassword("wali123");
    }
    setError("");
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail.trim()) return;
    setResetSuccess(true);
    setTimeout(() => {
      setIsResetting(false);
      setResetSuccess(false);
      setResetEmail("");
    }, 2500);
  };

  return (
    <div className="relative w-full h-full min-h-[580px] bg-slate-50 flex flex-col justify-between overflow-y-auto font-sans text-slate-800">
      
      {/* Curved Islamic Green Header Banner */}
      <div className="relative w-full bg-gradient-to-br from-emerald-900 to-emerald-800 text-white pt-8 pb-14 px-6 rounded-b-[2rem] shadow-md overflow-hidden">
        {/* Background Mandala overlay */}
        <div className="absolute right-0 bottom-0 translate-x-12 translate-y-12 opacity-10">
          <IslamicMandala className="w-56 h-56 text-amber-500" />
        </div>
        <div className="absolute -top-12 -left-12 w-32 h-32 rounded-full bg-emerald-700/20 blur-lg"></div>

        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center shadow-lg">
            <MosqueIcon className="w-6 h-6 text-emerald-950" />
          </div>
          <div>
            <h2 className="text-xl font-bold font-sans tracking-wide text-amber-400">E-Santri TPQ</h2>
            <p className="text-xs text-emerald-100 opacity-90 font-medium">TPA AL ASYHAR SIMA</p>
          </div>
        </div>

        <div className="mt-8 space-y-1">
          <h3 className="text-lg font-bold">Selamat Datang</h3>
          <p className="text-xs text-emerald-200/90 max-w-[90%] font-light">
            Masuk ke sistem evaluasi santri digital untuk memantau kemajuan kajian.
          </p>
        </div>
      </div>

      {/* Main Login Form Container */}
      <div className="flex-1 px-6 -mt-8 pb-8">
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-emerald-950/5 relative">
          
          {/* Quick preset selector buttons */}
          <div className="mb-6">
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 text-center">
              Pilih Role Pengguna (Preset)
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                id="btn-pres-admin"
                onClick={() => handlePresetSelect("admin")}
                className={`py-2 px-1 text-center rounded-xl text-xs font-medium border transition-all duration-200 ${
                  role === "admin"
                    ? "bg-amber-500 border-amber-500 text-emerald-950 shadow-md transform -translate-y-0.5"
                    : "bg-emerald-50/50 border-emerald-900/10 text-emerald-800 hover:bg-emerald-50"
                }`}
              >
                🛠️ Admin
              </button>
              <button
                type="button"
                id="btn-pres-ustadz"
                onClick={() => handlePresetSelect("ustadz")}
                className={`py-2 px-1 text-center rounded-xl text-xs font-medium border transition-all duration-200 ${
                  role === "ustadz"
                    ? "bg-amber-500 border-amber-500 text-emerald-950 shadow-md transform -translate-y-0.5"
                    : "bg-emerald-50/50 border-emerald-900/10 text-emerald-800 hover:bg-emerald-50"
                }`}
              >
                🕌 Ustadz
              </button>
              <button
                type="button"
                id="btn-pres-wali"
                onClick={() => handlePresetSelect("wali")}
                className={`py-2 px-1 text-center rounded-xl text-xs font-medium border transition-all duration-200 ${
                  role === "wali"
                    ? "bg-amber-500 border-amber-500 text-emerald-950 shadow-md transform -translate-y-0.5"
                    : "bg-emerald-50/50 border-emerald-900/10 text-emerald-800 hover:bg-emerald-50"
                }`}
              >
                👨‍👩‍👦 Wali
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 bg-red-50 border-l-4 border-red-500 text-xs text-red-700 rounded-r-lg font-medium">
                ⚠️ {error}
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5" htmlFor="txt-username">
                Nama Pengguna / No Wali
              </label>
              <input
                id="txt-username"
                type="text"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setError("");
                }}
                placeholder="Masukkan username Anda"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 text-xs bg-slate-50 transition-all font-medium"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-semibold text-slate-600" htmlFor="txt-password">
                  Kata Sandi
                </label>
                <button
                  type="button"
                  onClick={() => setIsResetting(true)}
                  className="text-[11px] font-semibold text-emerald-700 hover:underline"
                >
                  Lupa Sandi?
                </button>
              </div>
              <input
                id="txt-password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 text-xs bg-slate-50 transition-all font-mono"
              />
            </div>

            <div className="flex items-center">
              <input
                id="chk-remember"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-3.5 h-3.5 text-emerald-750 focus:ring-emerald-750 border-slate-300 rounded accent-emerald-800"
              />
              <label htmlFor="chk-remember" className="ml-2 text-xs font-medium text-slate-500 select-none">
                Ingat Saya di Perangkat Ini
              </label>
            </div>

            <button
              type="submit"
              id="btn-submit-login"
              className="w-full py-3 bg-emerald-850 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold shadow-md hover:shadow-lg transform active:scale-[0.98] transition-all duration-150 flex items-center justify-center space-x-2"
            >
              <span>Masuk Aplikasi</span>
              <span>⚡</span>
            </button>
          </form>
        </div>
      </div>

      {/* Decorative footer credits */}
      <div className="pb-4 text-center">
        <p className="text-[10px] text-slate-400 font-medium">
          Dikelola oleh Tim Admin TPA AL ASYHAR SIMA
        </p>
        <p className="text-[9px] text-slate-300 font-mono mt-0.5">© 2026 • SECURITY ISLAMIC SYSTEM</p>
      </div>

      {/* Reset Password Modal */}
      {isResetting && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-6 z-50">
          <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-2xl border border-slate-100">
            <h3 className="text-base font-bold text-emerald-900 mb-2">Lupa Kata Sandi?</h3>
            <p className="text-xs text-slate-500 mb-4 leading-relaxed">
              Masukkan alamat email wali santri atau ustadz yang terdaftar. Kami akan mengirimkan tautan pemulihan.
            </p>

            {resetSuccess ? (
              <div className="p-4 bg-emerald-50 border border-emerald-500/20 rounded-xl text-xs text-emerald-800 text-center font-medium animate-pulse">
                ✔️ Tautan pemulihan berhasil dikirim! Silakan periksa inbox atau kotak spam email Anda.
              </div>
            ) : (
              <form onSubmit={handleResetPassword} className="space-y-4">
                <div>
                  <input
                    type="email"
                    required
                    placeholder="nama@email.com"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
                  />
                </div>
                <div className="flex space-x-3 justify-end text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => setIsResetting(false)}
                    className="px-4 py-2 text-slate-500 hover:bg-slate-100 rounded-lg"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg shadow-sm"
                  >
                    Kirim Tautan
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
      
    </div>
  );
}
