export interface StudentInput {
  id: string;
  name: string;
  characterTrait: string;
}

export interface SetupFormData {
  schoolName: string;
  className: string;
  semester: string;
  students: StudentInput[];
  selectedUniverse: string;
  selectedStory: string;
  has3dAnimationAssets: boolean;
}