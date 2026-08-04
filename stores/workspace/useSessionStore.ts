import { callBackendApi, socket } from '../../services/backendClient';

// Contoh memanggil BOOT saat guru memulai kelas
export async function bootClassroomSession(sessionId: string, classId: string, teacherId: string) {
  const result = await callBackendApi('/api/classroom/session', {
    action: 'BOOT',
    sessionId,
    classId,
    teacherId
  });
  return result;
}

// Contoh memanggil ADVANCE MOMENT
export async function advanceClassroomMoment(sessionId: string) {
  const result = await callBackendApi('/api/classroom/session', {
    action: 'ADVANCE',
    sessionId
  });
  return result;
}

// Menghubungkan listener Socket.io untuk mendengarkan perubahan state secara real-time
socket.on('state_changed', (state) => {
  console.log('⚡ State dari Backend Server:', state);
  // Kamu bisa update Zustand store kamu di sini dengan state baru dari backend!
});