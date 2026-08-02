import { PriorityMission, TeachingSession } from '@/types/teacher';

export class TeachingEngine {
  /**
   * Menghitung progres penyelesaian misi guru
   */
  public static calculateMissionProgress(missions: PriorityMission[]): number {
    if (missions.length === 0) return 0;
    const completed = missions.filter((m) => m.completed).length;
    return Math.round((completed / missions.length) * 100);
  }

  /**
   * Memvalidasi apakah sesi mengajar siap dijalankan
   */
  public static validateSessionStart(session: Partial<TeachingSession>): boolean {
    return Boolean(session.classId && session.subject);
  }
}