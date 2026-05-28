/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";

// Modern Islamic Geometric Patterns and Ornaments as crisp SVGs
export function IslamicMandala({ className = "w-64 h-64 text-emerald-990/5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="0.5" fill="none" />
      <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="0.5" fill="none" />
      <circle cx="50" cy="50" r="15" stroke="currentColor" strokeWidth="0.25" fill="none" />
      
      {/* Rotated Squares for Islamic Star Effect (Rub el Hizb style) */}
      <rect x="30" y="30" width="40" height="40" stroke="currentColor" strokeWidth="0.5" fill="none" transform="rotate(0 50 50)" />
      <rect x="30" y="30" width="40" height="40" stroke="currentColor" strokeWidth="0.5" fill="none" transform="rotate(15 50 50)" />
      <rect x="30" y="30" width="40" height="40" stroke="currentColor" strokeWidth="0.5" fill="none" transform="rotate(30 50 50)" />
      <rect x="30" y="30" width="40" height="40" stroke="currentColor" strokeWidth="0.5" fill="none" transform="rotate(45 50 50)" />
      <rect x="30" y="30" width="40" height="40" stroke="currentColor" strokeWidth="0.5" fill="none" transform="rotate(60 50 50)" />
      <rect x="30" y="30" width="40" height="40" stroke="currentColor" strokeWidth="0.5" fill="none" transform="rotate(75 50 50)" />
      
      {/* Interlacing rays */}
      {Array.from({ length: 24 }).map((_, i) => (
        <line
          key={i}
          x1="50"
          y1="5"
          x2="50"
          y2="95"
          stroke="currentColor"
          strokeWidth="0.25"
          transform={`rotate(${i * 15} 50 50)`}
        />
      ))}
    </svg>
  );
}

export function IslamicBorder({ className = "h-4 text-amber-500/30" }: { className?: string }) {
  return (
    <div className={`w-full overflow-hidden flex ${className}`}>
      {Array.from({ length: 20 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 40 20"
          className="h-full w-auto flex-shrink-0"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M 0,20 Q 10,0 20,20 Q 30,0 40,20" />
          <path d="M 0,20 Q 20,10 40,20" strokeWidth="0.5" />
          <circle cx="20" cy="8" r="1.5" fill="currentColor" />
        </svg>
      ))}
    </div>
  );
}

export function IslamicHeaderArch({ className = "text-emerald-950" }: { className?: string }) {
  return (
    <div className={`absolute top-0 left-0 right-0 h-20 -z-10 overflow-hidden ${className}`}>
      <div className="w-full h-full opacity-10 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:16px_16px]"></div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-12 bg-white rounded-t-full border-t border-x border-amber-500/20 shadow-inner flex items-center justify-center">
        <div className="w-40 h-8 rounded-t-full border border-dashed border-amber-500/20"></div>
      </div>
    </div>
  );
}

export function MosqueIcon({ className = "w-8 h-8 text-amber-500" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Base */}
      <rect x="4" y="52" width="56" height="8" rx="2" />
      <rect x="8" y="28" width="48" height="24" rx="1" />
      
      {/* Central Dome */}
      <path d="M 18,28 C 18,10 46,10 46,28 Z" fill="currentColor" />
      {/* Crescent on Central Dome */}
      <path d="M 32,2 A 6,6 0 1 0 35,12 A 5,5 0 1 1 32,2" fill="currentColor" />
      <line x1="32" y1="9" x2="32" y2="14" stroke="currentColor" strokeWidth="2" />

      {/* Minarets Left */}
      <rect x="8" y="16" width="6" height="36" />
      <path d="M 6,16 L 11,8 L 16,16 Z" />
      
      {/* Minarets Right */}
      <rect x="50" y="16" width="6" height="36" />
      <path d="M 48,16 L 53,8 L 58,16 Z" />
      
      {/* Arched Door */}
      <path d="M 26,52 L 26,38 C 26,30 38,30 38,38 L 38,52 Z" fill="#ffffff" className="stroke-amber-500" strokeWidth="1" />
      
      {/* Windows */}
      <path d="M 14,34 C 14,30 18,30 18,34 L 18,44 L 14,44 Z" fill="#ffffff" opacity="0.8" />
      <path d="M 46,34 C 46,30 50,30 50,34 L 50,44 L 46,44 Z" fill="#ffffff" opacity="0.8" />
    </svg>
  );
}
