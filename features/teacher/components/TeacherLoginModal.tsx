'use client';

import React, { useState } from 'react';
import { authBackendService } from '@/services/backendClient';

interface TeacherLoginModalProps {
  isOpen: boolean;
  onSuccess: () => void;
  onSwitchToRegister?: () => void;
}

export const TeacherLoginModal: React.FC<TeacherLoginModalProps> = ({
  isOpen,
  onSuccess,
  onSwitchToRegister,
}) => {
  const [emailOrNip, setEmailOrNip] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const res = await authBackendService.login({
        emailOrNip,
        password,
      });

      if (res.success) {
        onSuccess();
      } else {
        setErrorMsg(res.message || 'Login gagal. Periksa kembali email/NIP dan password Anda.');
      }
    } catch {
      setErrorMsg('Terjadi kesalahan jaringan. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-slate-900 border border-slate-800 text-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-amber-400">Selamat Datang Kembali!</h2>
          <p className="text-sm text-slate-400 mt-1">
            Masukkan password untuk melanjutkan ke Kelas Bulaeng OS
          </p>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-xs">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Email atau NIP
            </label>
            <input
              type="text"
              required
              value={emailOrNip}
              onChange={(e) => setEmailOrNip(e.target.value)}
              placeholder="Contoh: guru@sekolah.sch.id / 19820..."
              className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-amber-400 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-amber-400 text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 mt-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 font-semibold rounded-lg text-slate-950 transition-all disabled:opacity-50 text-sm"
          >
            {loading ? 'Memverifikasi...' : 'Masuk ke Kelas Bulaeng'}
          </button>
        </form>

        {onSwitchToRegister && (
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={onSwitchToRegister}
              className="text-xs text-amber-400/80 hover:text-amber-400 underline"
            >
              Belum punya akun? Mendaftar sebagai guru baru
            </button>
          </div>
        )}
      </div>
    </div>
  );
};