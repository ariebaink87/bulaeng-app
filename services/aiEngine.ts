import { CURRICULUM_PRESETS, CurriculumItem } from '@/content/curriculumPreset';
import { VIDEO_STORE_DATA, VideoModuleItem } from '@/content/videoStoreData';

export interface StudentProfile {
  id: string;
  name: string;
  status: 'perlu_pendampingan' | 'pengayaan';
  notes: string;
}

export interface DailyLessonPackage {
  date: string;
  targetObjective: CurriculumItem;
  featured3DVideo: VideoModuleItem;
  teacherPrompts: string[];
  studentSegmentation: {
    needSupport: StudentProfile[];
    advanced: StudentProfile[];
  };
}

// AI Engine Generator untuk Racikan Pembelajaran Otomatis
export function generateDailyPackage(
  group: string,
  semester: string,
  studentList: string[]
): DailyLessonPackage {
  // 1. AI memilih Target Pembelajaran yang relevan
  const matchedObjectives = CURRICULUM_PRESETS.filter(
    (item) => item.group === group && item.semester === semester
  );
  const activeTarget = matchedObjectives[0] || CURRICULUM_PRESETS[0];

  // 2. AI Otomatis Memasangkan Video Animasi 3D yang Cocok
  const matchedVideo = VIDEO_STORE_DATA.find(
    (vid) => vid.targetObjective === activeTarget.objective
  ) || VIDEO_STORE_DATA[0];

  // 3. AI Otomatis Membagi Segmentasi Murid
  const needSupport = studentList.slice(0, Math.ceil(studentList.length / 3)).map((name, idx) => ({
    id: `std-supp-${idx}`,
    name,
    status: 'perlu_pendampingan' as const,
    notes: 'Perlu panduan visual langsung dari video 3D & benda konkret.'
  }));

  const advanced = studentList.slice(Math.ceil(studentList.length / 3)).map((name, idx) => ({
    id: `std-adv-${idx}`,
    name,
    status: 'pengayaan' as const,
    notes: 'Siap untuk tantangan memimpin diskusi kelompok.'
  }));

  // 4. AI Menyiapkan Pertanyaan Pemantik Diskusi untuk Guru
  const teacherPrompts = [
    `"Anak-anak, coba perhatikan video 3D tadi, warna dan bentuk apa saja yang kalian lihat?"`,
    `"Siapa yang bisa menceritakan kembali apa yang dilakukan karakter Bulaeng?"`,
    `"Mari kita praktikkan gerakan bersama-sama!"`
  ];

  return {
    date: new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }),
    targetObjective: activeTarget,
    featured3DVideo: matchedVideo,
    teacherPrompts,
    studentSegmentation: {
      needSupport,
      advanced
    }
  };
}