// features/teacher/types/auth.contract.ts

/**
 * Data profil dasar guru yang didapat dari sesi/backend
 */
export interface TeacherProfile {
  id: string;
  name: string;
  email: string;
  nip?: string;
  schoolName?: string;
}

/**
 * Payload untuk Pendaftaran Guru Baru (Onboarding + Password)
 */
export interface RegisterTeacherInput {
  name: string;
  email: string;
  password: string;
  nip?: string;
  schoolName?: string;
}

/**
 * Payload untuk Login Guru Lama (Kembali di hari berikutnya)
 */
export interface LoginTeacherInput {
  emailOrNip: string;
  password: string;
}

/**
 * Respons standar dari API backend autentikasi
 */
export interface AuthResult {
  success: boolean;
  message: string;
  token?: string;
  teacher?: TeacherProfile;
}

/**
 * Respons untuk pengecekan status awal sesi (Check Status)
 */
export interface AuthStatusResult {
  isRegistered: boolean;    // True jika user pernah mendaftar
  isAuthenticated: boolean; // True jika JWT/Session masih valid
  teacher?: TeacherProfile;
}