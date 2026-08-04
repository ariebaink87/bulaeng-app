'use client';

import React, { useState } from 'react';
import { useTeacherSetup } from '@/features/teacher/hooks/useTeacherSetup';
import { SchoolClassSetupForm } from '@/features/teacher/components/setup/SchoolClassSetupForm';
import { StudentDataForm } from '@/features/teacher/components/setup/StudentDataForm';
import { CurriculumModuleForm } from '@/features/teacher/components/setup/CurriculumModuleForm';
import { TeacherHeader } from '@/features/teacher/components/TeacherHeader';
import { AiDraftGovernance } from '@/features/teacher/components/AiDraftGovernance';
import { useTeacherSession } from '@/features/teacher/hooks/useTeacherSession';

export default function TeacherPage() {
  const [isSetupDone, setIsSetupDone] = useState<boolean>(false);

  const setup = useTeacherSetup(() => setIsSetupDone(true));
  const session = useTeacherSession();

  if (!session.isMounted) return <div className="p-6 text-slate-400">Loading BULAENG OS...</div>;

  // TAHAP 1: SETUP AWAL (JIKA BELUM SELESAI)
  if (!isSetupDone) {
    return (
      <div className="min-h-screen bg-[#F5F7FA] p-6 flex items-center justify-center">
        <div className="w-full max-w-xl bg-white border border-[#A0A6B1]/20 rounded-[20px] shadow-[0_12px_40px_rgba(0,0,0,0.08)] overflow-hidden">
          {/* Card Header Navy */}
          <div className="bg-[#111B38] p-6 text-white border-b-2 border-[#D4AF37]">
            <span className="text-[10px] uppercase text-[#D4AF37] font-bold tracking-wider font-poppins">
              Tahap 1: Ingestion
            </span>
            <h2 className="text-xl font-bold font-poppins mt-0.5">Setup Awal Guru & Kelas Baru</h2>
            <p className="text-xs text-[#A0A6B1] font-inter">
              Input data sekali saja agar AI dapat mengenali konteks pembelajaran.
            </p>
          </div>

          {/* Card Body Putih */}
          <div className="p-6">
            {setup.currentStep === 1 && (
              <SchoolClassSetupForm
                formData={setup.formData}
                setFormData={setup.setFormData}
                onNext={() => setup.setCurrentStep(2)}
              />
            )}

            {setup.currentStep === 2 && (
              <StudentDataForm
                formData={setup.formData}
                onAddStudent={setup.handleAddStudent}
                onStudentChange={setup.handleStudentChange}
                onNext={() => setup.setCurrentStep(3)}
                onPrev={() => setup.setCurrentStep(1)}
              />
            )}

            {setup.currentStep === 3 && (
              <CurriculumModuleForm
                formData={setup.formData}
                setFormData={setup.setFormData}
                loading={setup.loading}
                onSubmit={setup.handleSubmitSetup}
                onPrev={() => setup.setCurrentStep(2)}
              />
            )}
          </div>
        </div>
      </div>
    );
  }

  // TAHAP 2-4: EXECUTION DASHBOARD (JIKA SETUP SELESAI)
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <TeacherHeader
        isConnected={session.isConnected}
        sessionState={session.sessionState}
        universeName={setup.formData.selectedUniverse}
        className={setup.formData.className || 'Kelas Baru'}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
          <h2 className="font-bold text-slate-100 text-lg">1. Eksekusi Kelas (Classroom Mode)</h2>
          <button
            onClick={session.handleStartEpisode}
            disabled={session.loading}
            className="w-full py-3 bg-[#D4AF37] hover:bg-[#c3a030] text-[#111B38] font-bold rounded-xl transition shadow-md"
          >
            MULAI EPISODE
          </button>
        </div>

        <AiDraftGovernance
          draftData={session.draftData}
          loading={session.loading}
          onUpdateDraft={(updated) => session.setDraftData(updated)}
          onApprove={session.handleApproveDraft}
        />
      </div>
    </div>
  );
}