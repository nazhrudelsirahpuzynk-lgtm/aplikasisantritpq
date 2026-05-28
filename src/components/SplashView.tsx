/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from "react";
import { MosqueIcon, IslamicMandala } from "./IslamOrnaments";

interface SplashViewProps {
  onFinish: () => void;
}

export default function SplashView({ onFinish }: SplashViewProps) {
  useEffect(() => {
    // Auto finish after 2.6 seconds
    const timer = setTimeout(() => {
      onFinish();
    }, 2600);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="relative w-full h-full min-h-[580px] bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-950 flex flex-col justify-between items-center p-8 overflow-hidden text-white select-none">
      {/* Background decorations */}
      <div className="absolute inset-0 flex items-center justify-center -z-10 opacity-15">
        <IslamicMandala className="w-96 h-96 animate-spin-slow text-amber-500" />
      </div>

      <div className="absolute -top-12 -left-12 w-48 h-48 rounded-full bg-emerald-800/10 blur-xl"></div>
      <div className="absolute -bottom-12 -right-12 w-48 h-48 rounded-full bg-amber-500/10 blur-xl"></div>

      {/* Decorative Top arches */}
      <div className="w-full flex justify-center pt-4 opacity-40">
        <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>
      </div>

      {/* Core Branding */}
      <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6">
        {/* Animated Badge Frame */}
        <div className="relative p-6 bg-emerald-900/40 border border-amber-500/30 rounded-2xl shadow-2xl backdrop-blur-sm animate-pulse-subtle">
          <div className="absolute -inset-1 border border-dashed border-amber-500/10 rounded-2xl"></div>
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-300">
            <MosqueIcon className="w-12 h-12 text-emerald-950" />
          </div>
        </div>

        {/* Text Details */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-wider font-sans text-amber-400 drop-shadow-md">
            E-Santri TPQ
          </h1>
          <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto"></div>
          <p className="text-sm font-medium tracking-widest text-emerald-50">
            TPA AL ASYHAR SIMA
          </p>
        </div>
      </div>

      {/* Footer credits and progress */}
      <div className="w-full flex flex-col items-center space-y-6 pb-6">
        <div className="flex space-x-1.5 justify-center items-center">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-bounce" style={{ animationDelay: '0ms' }}></span>
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-bounce" style={{ animationDelay: '150ms' }}></span>
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-bounce" style={{ animationDelay: '300ms' }}></span>
        </div>

        <div className="text-center">
          <p className="text-xs text-emerald-300/80 tracking-normal">Sistem Evaluasi Belajar Santri Digital</p>
          <p className="text-[10px] text-amber-500/60 font-mono tracking-wider mt-0.5">VERSION 2.0 • KOTLIN MVVM STYLED</p>
        </div>
      </div>
    </div>
  );
}
