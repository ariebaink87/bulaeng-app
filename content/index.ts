// 1. Interface Definitions
export interface CurriculumItem {
  id: string;
  title: string;
  group?: string;
  semester?: string;
  objective?: string;
}

export interface VideoModuleItem {
  id: string;
  title: string;
  duration?: string;
  targetObjective?: string;
}

// 2. Data Presets
export const CURRICULUM_PRESET: CurriculumItem[] = [
  { 
    id: "1", 
    title: "Materi Pembelajaran Dasar", 
    group: "A", 
    semester: "1", 
    objective: "Mengenal Dasar Pembelajaran" 
  }
];

export const VIDEO_STORE_DATA: VideoModuleItem[] = [
  { 
    id: "1", 
    title: "Video Modul Pembelajaran", 
    duration: "10:00",
    targetObjective: "Mengenal Dasar Pembelajaran"
  }
];