import { io, Socket } from 'socket.io-client';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

// Socket singleton (autoConnect: false agar terhubung saat komponen di-mount)
export const socket: Socket = io(BACKEND_URL, {
  autoConnect: false,
});

export async function callBackendApi(endpoint: string, body: object) {
  try {
    const response = await fetch(`${BACKEND_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    return await response.json();
  } catch (error) {
    console.error(`❌ Error calling API ${endpoint}:`, error);
    throw error;
  }
}