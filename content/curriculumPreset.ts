export interface CurriculumItem {
  id: number;
  category: 'Nilai Agama & Moral' | 'Pancasila / Jati Diri Bangsa' | 'Fisik Motorik' | 'Kognitif' | 'Bahasa' | 'Sosial Emosional';
  group: 'Kelompok A (4-5 tahun)' | 'Kelompok B (5-6 tahun)';
  semester: 'Semester 1' | 'Semester 2';
  objective: string;
}

export const CURRICULUM_PRESETS: CurriculumItem[] = [
  // Nilai Agama & Moral
  { id: 1, category: 'Nilai Agama & Moral', group: 'Kelompok A (4-5 tahun)', semester: 'Semester 1', objective: 'Berdoa sebelum makan' },
  { id: 2, category: 'Nilai Agama & Moral', group: 'Kelompok A (4-5 tahun)', semester: 'Semester 2', objective: 'Belajar berbagi dengan teman' },
  { id: 3, category: 'Nilai Agama & Moral', group: 'Kelompok B (5-6 tahun)', semester: 'Semester 1', objective: 'Berdoa sebelum makan' },
  { id: 4, category: 'Nilai Agama & Moral', group: 'Kelompok B (5-6 tahun)', semester: 'Semester 2', objective: 'Belajar berbagi dengan teman' },

  // Pancasila / Jati Diri Bangsa
  { id: 5, category: 'Pancasila / Jati Diri Bangsa', group: 'Kelompok A (4-5 tahun)', semester: 'Semester 1', objective: 'Mengenal simbol negara' },
  { id: 6, category: 'Pancasila / Jati Diri Bangsa', group: 'Kelompok A (4-5 tahun)', semester: 'Semester 2', objective: 'Gotong royong di sekolah' },
  { id: 7, category: 'Pancasila / Jati Diri Bangsa', group: 'Kelompok B (5-6 tahun)', semester: 'Semester 1', objective: 'Mengenal simbol negara' },
  { id: 8, category: 'Pancasila / Jati Diri Bangsa', group: 'Kelompok B (5-6 tahun)', semester: 'Semester 2', objective: 'Gotong royong di sekolah' },

  // Fisik Motorik
  { id: 9, category: 'Fisik Motorik', group: 'Kelompok A (4-5 tahun)', semester: 'Semester 1', objective: 'Senam anak ceria' },
  { id: 10, category: 'Fisik Motorik', group: 'Kelompok A (4-5 tahun)', semester: 'Semester 2', objective: 'Gerak dan lagu koordinasi tubuh' },
  { id: 11, category: 'Fisik Motorik', group: 'Kelompok B (5-6 tahun)', semester: 'Semester 1', objective: 'Senam anak ceria' },
  { id: 12, category: 'Fisik Motorik', group: 'Kelompok B (5-6 tahun)', semester: 'Semester 2', objective: 'Gerak dan lagu koordinasi tubuh' },

  // Kognitif
  { id: 13, category: 'Kognitif', group: 'Kelompok A (4-5 tahun)', semester: 'Semester 1', objective: 'Mengenal angka 1-10' },
  { id: 14, category: 'Kognitif', group: 'Kelompok A (4-5 tahun)', semester: 'Semester 2', objective: 'Mengenal bentuk dan warna' },
  { id: 15, category: 'Kognitif', group: 'Kelompok B (5-6 tahun)', semester: 'Semester 1', objective: 'Mengenal angka 1-10' },
  { id: 16, category: 'Kognitif', group: 'Kelompok B (5-6 tahun)', semester: 'Semester 2', objective: 'Mengenal bentuk dan warna' },

  // Bahasa
  { id: 17, category: 'Bahasa', group: 'Kelompok A (4-5 tahun)', semester: 'Semester 1', objective: 'Mengenal huruf A-Z' },
  { id: 18, category: 'Bahasa', group: 'Kelompok A (4-5 tahun)', semester: 'Semester 2', objective: 'Bercerita kosakata sehari-hari' },
  { id: 19, category: 'Bahasa', group: 'Kelompok B (5-6 tahun)', semester: 'Semester 1', objective: 'Mengenal huruf A-Z' },
  { id: 20, category: 'Bahasa', group: 'Kelompok B (5-6 tahun)', semester: 'Semester 2', objective: 'Bercerita kosakata sehari-hari' },

  // Sosial Emosional
  { id: 21, category: 'Sosial Emosional', group: 'Kelompok A (4-5 tahun)', semester: 'Semester 1', objective: 'Mengenali perasaan diri' },
  { id: 22, category: 'Sosial Emosional', group: 'Kelompok A (4-5 tahun)', semester: 'Semester 2', objective: 'Belajar berteman dan empati' },
  { id: 23, category: 'Sosial Emosional', group: 'Kelompok B (5-6 tahun)', semester: 'Semester 1', objective: 'Mengenali perasaan diri' },
  { id: 24, category: 'Sosial Emosional', group: 'Kelompok B (5-6 tahun)', semester: 'Semester 2', objective: 'Belajar berteman dan empati' },
];