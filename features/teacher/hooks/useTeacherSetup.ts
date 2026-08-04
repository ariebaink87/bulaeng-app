import { useState } from 'react';
import { SetupFormData, StudentInput } from '../types/setup.contract';
import { callBackendApi } from '@/services/backendClient';

export function useTeacherSetup(onSetupComplete: () => void) {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  const [formData, setFormData] = useState<SetupFormData>({
    schoolName: '',
    className: '',
    semester: 'Semester 1',
    students: [{ id: '1', name: '', characterTrait: '' }],
    selectedUniverse: 'Alam Semesta',
    selectedStory: 'Tumbuhan',
    has3dAnimationAssets: true,
  });

  const handleAddStudent = () => {
    setFormData((prev) => ({
      ...prev,
      students: [
        ...prev.students,
        { id: Date.now().toString(), name: '', characterTrait: '' },
      ],
    }));
  };

  const handleStudentChange = (id: string, field: keyof StudentInput, value: string) => {
    setFormData((prev) => ({
      ...prev,
      students: prev.students.map((s) => (s.id === id ? { ...s, [field]: value } : s)),
    }));
  };

  const handleSubmitSetup = async () => {
    setLoading(true);
    try {
      await callBackendApi('/api/v1/setup', { action: 'INITIAL_INGESTION', payload: formData });
    } catch {
      // Fallback offline
    } finally {
      setLoading(false);
      onSetupComplete();
    }
  };

  return {
    currentStep,
    setCurrentStep,
    formData,
    setFormData,
    loading,
    handleAddStudent,
    handleStudentChange,
    handleSubmitSetup,
  };
}