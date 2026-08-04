'use client';

import React from 'react';
import { useTeacherSession } from '@/features/teacher/hooks/useTeacherSession';
import { TeacherHeader } from '@/features/teacher/components/TeacherHeader';
import { ClassroomExecution } from '@/features/teacher/components/ClassroomExecution';
import { AiDraftGovernance } from '@/features/teacher/components/AiDraftGovernance';

export default function TeacherDashboardPage() {
  const {
    isMounted,
    isConnected,
    sessionState,
    currentScene,
    setCurrentScene,
    loading,
    draftData,
    setDraftData,
    handleStartEpisode,
    handleFinishEpisode,
    handleApproveDraft,
  } = useTeacherSession();

  if (!isMounted) {
    return <div className="p-6 text-slate-400 font-sans">Memuat Dashboard Guru BULAENG OS...</div>;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <TeacherHeader isConnected={isConnected} sessionState={sessionState} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <ClassroomExecution
            sessionState={sessionState}
            currentScene={currentScene}
            loading={loading}
            onStart={handleStartEpisode}
            onFinish={handleFinishEpisode}
            onSceneChange={setCurrentScene}
          />
        </div>

        <div>
          <AiDraftGovernance
            draftData={draftData}
            loading={loading}
            onUpdateDraft={setDraftData}
            onApprove={handleApproveDraft}
          />
        </div>
      </div>
    </div>
  );
}