import { useState } from 'react';
import { SetupFormData, StudentInput } from '../types/setup.contract';
import { callBackendApi, authBackendService } from '@/services/backendClient';

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
      // 1. Registrasi Akun Guru
      if (formData.email && formData.password) {
        const registerRes = await authBackendService.register({
          name: formData.teacherName || formData.schoolName || 'Guru Bulaeng',
          email: formData.email,
          password: formData.password,
          nip: formData.nip,
          schoolName: formData.schoolName,
        });

        if (!registerRes.success) {
          throw new Error(registerRes.message || 'Gagal mendaftarkan akun guru.');
        }
      }

      // 2. Ingestion Data Setup Kelas
      await callBackendApi('/api/v1/setup', {
        action: 'INITIAL_INGESTION',
        payload: formData,
      });

      // 3. Hanya panggil callback jika SEMUA step berhasil
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