import { useState } from 'react';
import { SetupFormData, StudentInput } from '../types/setup.contract';

export function useTeacherSetup(onSetupComplete: () => void) {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [formData, setFormData] = useState<SetupFormData>({
    teacherName: '',
    email: '',
    password: '',
    nip: '',
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
        ...(prev.students || []),
        { id: Date.now().toString(), name: '', characterTrait: '' },
      ],
    }));
  };

  const handleStudentChange = (id: string, field: keyof StudentInput, value: string) => {
    setFormData((prev) => ({
      ...prev,
      students: (prev.students || []).map((s) =>
        s.id === id ? { ...s, [field]: value } : s
      ),
    }));
  };

  const handleRemoveStudent = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      students: (prev.students || []).filter((s) => s.id !== id),
    }));
  };

  const handleSubmitSetup = async () => {
    setLoading(true);
    setErrorMsg(null);

    try {
      // Bypass Backend API 404 & Socket Issues
      // Simpan seluruh data setup ke LocalStorage
      const mockSession = {
        teacher: {
          name: formData.teacherName || formData.schoolName || 'Guru Bulaeng',
          email: formData.email,
          nip: formData.nip,
        },
        school: formData.schoolName,
        className: formData.className,
        students: formData.students,
        universe: formData.selectedUniverse,
        story: formData.selectedStory,
        has3dAnimationAssets: formData.has3dAnimationAssets,
        token: 'mock-bulaeng-token-2026',
      };

      localStorage.setItem('bulaeng_teacher_session', JSON.stringify(mockSession));
      localStorage.setItem('bulaeng_setup_completed', 'true');

      // Simulasi delay minor layaknya pemrosesan AI
      await new Promise((resolve) => setTimeout(resolve, 600));

      // Panggil callback setelah berhasil menyimpan
      onSetupComplete();
    } catch (error: any) {
      console.error('Terjadi kesalahan saat submit setup:', error);
      setErrorMsg(error?.message || 'Terjadi kesalahan tidak terduga saat menyimpan setup.');
    } finally {
      setLoading(false);
    }
  };

  return {
    currentStep,
    setCurrentStep,
    formData,
    setFormData,
    loading,
    errorMsg,
    handleAddStudent,
    handleStudentChange,
    handleRemoveStudent,
    handleSubmitSetup,
  };
}