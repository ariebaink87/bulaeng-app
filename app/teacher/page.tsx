'use client';

import React, { useState } from 'react';
import { useTeacherSetup } from '@/features/teacher/hooks/useTeacherSetup';
import { WelcomeScreen } from '@/features/teacher/components/setup/WelcomeScreen';
import { SchoolClassSetupForm } from '@/features/teacher/components/setup/SchoolClassSetupForm';
import { StudentDataForm } from '@/features/teacher/components/setup/StudentDataForm';
import { CurriculumModuleForm } from '@/features/teacher/components/setup/CurriculumModuleForm';
import { TeacherHeader } from '@/features/teacher/components/TeacherHeader';
import { ClassroomExecutionCard } from '@/features/teacher/components/ClassroomExecutionCard';
import { AiDraftGovernance } from '@/features/teacher/components/AiDraftGovernance';
import { AiVideoModules } from '@/features/teacher/components/AiVideoModules';
import { useTeacherSession } from '@/features/teacher/hooks/useTeacherSession';

export default function TeacherPage() {
  const [isSetupDone, setIsSetupDone] = useState<boolean>(false);
  const [showWelcome, setShowWelcome] = useState<boolean>(true);

  const setup = useTeacherSetup(() => setIsSetupDone(true));
  const session = useTeacherSession();

  if (!session.isMounted) {
    return (
      <div className="min-h-screen bg-[#111B38] flex items-center justify-center p-6 text-[#D4AF37] font-poppins font-semibold">
        Loading BULAENG OS...
      </div>
    );
  }

  // 1. WELCOME SCREEN CINEMATIC
  if (showWelcome) {
    return <WelcomeScreen onComplete={() => setShowWelcome(false)} />;
  }

  // 2. TAHAP 1: SETUP FORMULIR DENGAN BACKGROUND NAVY & GOLD DOT GRID
  if (!isSetupDone) {
    return (
      <div 
        className="min-h-screen bg-[#111B38] relative flex items-center justify-center p-6 sm:p-10 overflow-hidden animate-fade-in"
        style={{
          backgroundImage: `radial-gradient(rgba(212, 175, 55, 0.25) 1.5px, transparent 1.5px)`,
          backgroundSize: `28px 28px`
        }}
      >
        {/* Glowing Ambient Light */}
        <div className="absolute top-10 left-10 w-[500px] h-[500px] bg-[#D4AF37]/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-[#D4AF37]/10 rounded-full blur-[140px] pointer-events-none" />

        {/* Card Form Container */}
        <div className="w-full max-w-2xl bg-[#111B38]/95 backdrop-blur-md border border-[#D4AF37]/40 rounded-[28px] shadow-[0_25px_60px_rgba(0,0,0,0.6)] overflow-hidden relative z-10">
          
          {/* Header Navy */}
          <div className="bg-[#111B38] p-8 text-white border-b border-[#D4AF37]/30">
            <span className="text-xs uppercase text-[#D4AF37] font-bold tracking-widest font-poppins">
              Tahap 1: Ingestion
            </span>
            <h2 className="text-3xl font-extrabold font-poppins mt-1 text-white tracking-tight">
              Setup Awal Guru & Kelas Baru
            </h2>
            <p className="text-sm text-[#A0A6B1] font-inter mt-1.5">
              Input data sekali saja agar AI dapat mengenali konteks pembelajaran.
            </p>
          </div>

          {/* Form Content */}
          <div className="p-8">
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

  // 3. MAIN DASHBOARD GURU DENGAN GOLD DOT GRID BACKGROUND
  return (
    <div
      className="min-h-screen bg-[#111B38] relative p-6 sm:p-8 text-white overflow-x-hidden"
      style={{
        backgroundImage: `radial-gradient(rgba(212, 175, 55, 0.25) 1.5px, transparent 1.5px)`,
        backgroundSize: `28px 28px`,
      }}
    >
      {/* Ambient Light Background */}
      <div className="absolute top-10 left-10 w-[500px] h-[500px] bg-[#D4AF37]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-[#D4AF37]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-8 relative z-10">
        {/* Header Dashboard dengan Tombol Beranda */}
        <TeacherHeader
          isConnected={session.isConnected}
          sessionState={session.sessionState}
          universeName={setup.formData.selectedUniverse || 'Alam Semesta'}
          className={setup.formData.className || 'Kelas B2'}
        />

        {/* Section 1 & 2: Eksekusi Kelas & Review Draft Governance */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ClassroomExecutionCard
            sessionState={session.sessionState}
            loading={session.loading}
            onStartEpisode={session.handleStartEpisode}
            onEndEpisode={(session as any).handleEndEpisode || session.handleStartEpisode}
          />

          <AiDraftGovernance
            draftData={session.draftData}
            loading={session.loading}
            onUpdateDraft={(updated) => session.setDraftData(updated)}
            onApprove={session.handleApproveDraft}
          />
        </div>

        {/* Section 3: Modul Video Pembelajaran AI */}
        <AiVideoModules />
      </div>
    </div>
  );
}