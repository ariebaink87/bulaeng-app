import { io, Socket } from 'socket.io-client';
import { 
  RegisterTeacherInput, 
  LoginTeacherInput, 
  AuthResult, 
  AuthStatusResult 
} from '@/features/teacher/types/auth.contract';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://bulaeng-platform-omega.vercel.app';
const API_BASE_URL = `${BACKEND_URL}/api/v1`;

// Inisialisasi socket HANYA jika berada di browser (Client-Side)
export const socket: Socket = typeof window !== 'undefined'
  ? io(BACKEND_URL, {
      path: '/socket.io/',
      transports: ['polling', 'websocket'], // Polling didahulukan untuk stabilitas Serverless Vercel
      autoConnect: true,                     // Otomatis menyambung begitu di-load
      withCredentials: true,                // Diperlukan untuk CORS cross-origin Vercel
      
      // Strategi Reconnection agar stabil dan tidak putus-nyambung
      reconnection: true,
      reconnectionAttempts: Infinity,       // Terus mencoba terhubung kembali jika terputus
      reconnectionDelay: 1000,              // Tunggu 1 detik sebelum mencoba lagi
      reconnectionDelayMax: 5000,           // Maksimal jeda mencoba ulang 5 detik
      timeout: 20000,                       // Toleransi waktu koneksi
    })
  : ({} as Socket);

/**
 * Helper dasar untuk pemanggilan API generik
 */
export async function callBackendApi(endpoint: string, body: object) {
  try {
    const response = await fetch(`${BACKEND_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP Error ${response.status}: ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`❌ Error calling API ${endpoint}:`, error);
    throw error;
  }
}

/**
 * Service Layanan Autentikasi Guru (bulaeng-platform backend)
 */
export const authBackendService = {
  /**
   * Mengecek status sesi guru (apakah sudah mendaftar & terautentikasi)
   */
  async checkSessionStatus(): Promise<AuthStatusResult> {
    const token = typeof window !== 'undefined' ? localStorage.getItem('blg_auth_token') : null;

    if (!token) {
      return { isRegistered: false, isAuthenticated: false };
    }

    try {
      const res = await fetch(`${API_BASE_URL}/auth/me`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!res.ok) throw new Error('Session expired');

      const data = await res.json();
      return {
        isRegistered: true,
        isAuthenticated: true,
        teacher: data.teacher
      };
    } catch {
      return { isRegistered: true, isAuthenticated: false };
    }
  },

  /**
   * Registrasi Guru Baru (Hari Ke-1)
   */
  async register(payload: RegisterTeacherInput): Promise<AuthResult> {
    const res = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data: AuthResult = await res.json();
    if (data.token && typeof window !== 'undefined') {
      localStorage.setItem('blg_auth_token', data.token);
    }
    return data;
  },

  /**
   * Login Guru Lama (Hari Ke-2 dst)
   */
  async login(payload: LoginTeacherInput): Promise<AuthResult> {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data: AuthResult = await res.json();
    if (data.token && typeof window !== 'undefined') {
      localStorage.setItem('blg_auth_token', data.token);
    }
    return data;
  },

  /**
   * Logout Sesi
   */
  logout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('blg_auth_token');
    }
  }
};