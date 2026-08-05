import { io, Socket } from 'socket.io-client';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://bulaeng-platform-omega.vercel.app';

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