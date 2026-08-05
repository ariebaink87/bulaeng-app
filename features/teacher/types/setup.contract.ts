export interface StudentInput {
  name: string;
  notes?: string;
}

export interface SetupFormData {
  teacherName?: string; // Tambahkan properti ini
  schoolName: string;
  className: string;
  semester?: string;
  students?: StudentInput[];
  selectedUniverse?: string;
  selectedStory?: string;
  has3dAnimationAssets?: boolean;
}