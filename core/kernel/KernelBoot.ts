import { KernelState } from '@/types/kernel';

export const KernelBoot = {
  /**
   * Menginisialisasi status awal sistem aplikasi
   */
  async bootSystem(): Promise<Partial<KernelState>> {
    try {
      // 1. Cek ketersediaan koneksi internet
      const isOffline = typeof window !== 'undefined' ? !navigator.onLine : false;

      // 2. Cek token autentikasi lokal
      const token = typeof window !== 'undefined' ? localStorage.getItem('blg_auth_token') : null;

      // 3. Return status awal kernel
      return {
        isBooted: true,
        isOffline,
        // Gunakan screen state default yang sesuai dengan kontrak tipe KernelState
        activeScreen: token ? 'mission-control' : ('mission-control' as any),
      };
    } catch (error) {
      console.error('❌ Gagal melakukan boot kernel:', error);
      return {
        isBooted: true,
        isOffline: false,
      };
    }
  },
};