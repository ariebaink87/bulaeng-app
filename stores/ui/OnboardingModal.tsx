'use client';

import React, { useState } from 'react';
import { useClassStore } from '@/stores/teacher/useClassStore'; // ✅ Path import diperbaiki

export default function OnboardingModal() {
  const { isConfigured, setClassConfig, loadDemoData } = useClassStore();
  const [className, setClassName] = useState('Kelas B2');
  const [activeTheme, setActiveTheme] = useState('Tanaman');
  const [rawStudents, setRawStudents] = useState('Andi\nBudi\nCitra\nDina\nEko');

  if (isConfigured) return null; // Sembunyikan jika sudah dikonfigurasi

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const studentList = rawStudents
      .split('\n')
      .map((name) => name.trim())
      .filter((name) => name.length > 0)
      .map((name, index) => ({
        id: String(index + 1),
        name,
        isPresent: true,
      }));

    setClassConfig({
      className,
      activeTheme,
      students: studentList,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 text-white shadow-2xl">
        <div className="mb-6 text-center">
          <span className="bg-amber-500/20 text-amber-400 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
            Pengaturan Awal Guru
          </span>
          <h2 className="text-2xl font-bold mt-2">Selamat Datang di BULAENG OS</h2>
          <p className="text-slate-400 text-sm mt-1">
            Persiapkan data kelas Anda agar Asisten AI dapat bekerja secara akurat.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Nama Kelas / Kelompok
            </label>
            <input
              type="text"
              required
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              placeholder="Contoh: Kelas B2"
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Tema / Topik Pembelajaran Pertama
            </label>
            <input
              type="text"
              required
              value={activeTheme}
              onChange={(e) => setActiveTheme(e.target.value)}
              placeholder="Contoh: Tanaman / Transportasi"
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Daftar Nama Murid (Satu nama per baris)
            </label>
            <textarea
              rows={4}
              value={rawStudents}
              onChange={(e) => setRawStudents(e.target.value)}
              placeholder="Andi&#10;Budi&#10;Citra"
              className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <button
              type="submit"
              className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-2.5 rounded-lg text-sm transition"
            >
              Simpan & Mulai Menggunakan OS
            </button>
            <button
              type="button"
              onClick={loadDemoData}
              className="w-full bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs py-2 rounded-lg transition"
            >
              Gunakan Data Contoh (Mode Demo)
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}