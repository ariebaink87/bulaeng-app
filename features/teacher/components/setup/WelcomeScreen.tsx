'use client';

import React, { useState, useEffect } from 'react';

interface Props {
  onComplete: () => void;
}

const lines = [
  "Hai, selamat datang di BULAENG Classroom...",
  "Silakan isi data kelas kamu, dan saya akan membantu kamu ke depannya.",
  "Saya akan menyiapkan semua kebutuhan kelas kamu setiap hari,",
  "dan kamu siap untuk mengajar..."
];

export const WelcomeScreen: React.FC<Props> = ({ onComplete }) => {
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [shownLines, setShownLines] = useState<string[]>([]);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    if (lineIndex < lines.length) {
      const currentText = lines[lineIndex];
      if (charIndex <= currentText.length) {
        const timeout = setTimeout(() => {
          setCharIndex((prev) => prev + 1);
        }, 38);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setShownLines((prev) => [...prev, currentText]);
          setLineIndex((prev) => prev + 1);
          setCharIndex(0);
        }, 600);
        return () => clearTimeout(timeout);
      }
    } else {
      // Teks selesai, tunggu 1.8 detik lalu buat efek Fade Out Cinematic
      const fadeTimeout = setTimeout(() => {
        setIsFadingOut(true);
      }, 1800);

      const completeTimeout = setTimeout(() => {
        onComplete();
      }, 2600); // Selesai transisi keluar

      return () => {
        clearTimeout(fadeTimeout);
        clearTimeout(completeTimeout);
      };
    }
  }, [lineIndex, charIndex, onComplete]);

  const currentLineText = lineIndex < lines.length ? lines[lineIndex].slice(0, charIndex) : '';

  return (
    <div
      className={`fixed inset-0 z-50 bg-[#111B38] flex items-center justify-center p-6 sm:p-12 transition-all duration-1000 ease-in-out ${
        isFadingOut ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'
      }`}
      style={{
        backgroundImage: `radial-gradient(rgba(212, 175, 55, 0.25) 1.5px, transparent 1.5px)`,
        backgroundSize: `28px 28px`
      }}
    >
      {/* Glowing Ambient Light di Latar Belakang Layar */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#D4AF37]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#D4AF37]/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Container Frame dengan Gold Border & Glow Aura */}
      <div className="w-full max-w-3xl min-h-[380px] bg-[#111B38]/95 backdrop-blur-md border-2 border-[#D4AF37] rounded-3xl p-8 sm:p-12 flex items-center justify-center shadow-[0_0_60px_rgba(212,175,55,0.2)] relative overflow-hidden z-10">
        
        {/* Glow Accent Ambient di Dalam Card */}
        <div className="absolute -top-24 -left-24 w-60 h-60 bg-[#D4AF37]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-60 h-60 bg-[#D4AF37]/15 rounded-full blur-3xl pointer-events-none" />

        {/* Text Container */}
        <div className="text-center space-y-4 max-w-2xl font-poppins relative z-10">
          {shownLines.map((text, idx) => (
            <p
              key={idx}
              className="text-white text-xl sm:text-2xl font-medium leading-relaxed drop-shadow-[0_2px_12px_rgba(212,175,55,0.35)] transition-all duration-500"
            >
              {text}
            </p>
          ))}

          {lineIndex < lines.length && (
            <p className="text-white text-xl sm:text-2xl font-medium leading-relaxed drop-shadow-[0_2px_12px_rgba(212,175,55,0.35)]">
              {currentLineText}
              <span className="inline-block ml-1 text-[#D4AF37] animate-pulse">▌</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};