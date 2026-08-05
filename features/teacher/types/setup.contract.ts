export interface StudentInput {
  id?: string;
  name: string;
  characterTrait?: string;
}

export interface SetupFormData {
  // --- Kredensial Akun Guru ---
  teacherName?: string;
  email?: string;
  password?: string;
  nip?: string;

  // --- Data Sekolah & Skenario Kelas ---
  schoolName: string;
  className: string;
  semester: string;
  students?: StudentInput[];
  selectedUniverse: string;
  selectedStory: string;
  has3dAnimationAssets: boolean;
}