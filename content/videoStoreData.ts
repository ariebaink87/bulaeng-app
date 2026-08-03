export interface VideoModuleItem {
  id: string;
  title: string;
  category: string;
  duration: string;
  thumbnail: string;
  description: string;
  targetObjective: string;
}

export const VIDEO_STORE_DATA: VideoModuleItem[] = [
  {
    id: 'vid-001',
    title: 'Petualangan Daun Ajaib (Animasi 3D)',
    category: 'Sains & Alam',
    duration: '12 Menit',
    thumbnail: '🍃',
    description: 'Petualangan interaktif 3D mengenalkan bagian-bagian daun dan proses fotosintesis sederhana untuk anak.',
    targetObjective: 'Mengenal bentuk dan warna'
  },
  {
    id: 'vid-002',
    title: 'Keajaiban Angka Bersama Bulaeng',
    category: 'Kognitif',
    duration: '15 Menit',
    thumbnail: '🔢',
    description: 'Animasi 3D interaktif berhitung angka 1-10 dengan lagu dan karakter hewan hutan yang lucu.',
    targetObjective: 'Mengenal angka 1-10'
  },
  {
    id: 'vid-003',
    title: 'Senam Ceria Karakter 3D',
    category: 'Fisik Motorik',
    duration: '10 Menit',
    thumbnail: '🤸',
    description: 'Panduan olah tubuh dan gerakan koordinasi anak yang dipandu oleh avatar 3D yang energik.',
    targetObjective: 'Senam anak ceria'
  },
  {
    id: 'vid-004',
    title: 'Misteri Alphabet di Hutan Rindang',
    category: 'Bahasa',
    duration: '18 Menit',
    thumbnail: '🔤',
    description: 'Eksplorasi huruf A-Z secara visual 3D yang memudahkan anak mengingat bentuk dan bunyi huruf.',
    targetObjective: 'Mengenal huruf A-Z'
  }
];