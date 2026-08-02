export interface PriorityMission {
  id: string;
  title: string;
  category: 'teaching' | 'assessment' | 'administration';
  deadline: string;
  completed: boolean;
}

export interface TeachingSession {
  classId: string;
  subject: string;
  currentStep: number;
  totalSteps: number;
  isActive: boolean;
}

export interface FlowStep {
  id: string;
  title: string;
  description: string;
}