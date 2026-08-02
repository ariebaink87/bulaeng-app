'use client';

import { useEffect, ReactNode } from 'react';
import { useKernelStore } from '@/stores/kernel/useKernelStore';

interface KernelProviderProps {
  children: ReactNode;
}

export function KernelProvider({ children }: KernelProviderProps) {
  const boot = useKernelStore((state) => state.boot);
  const isBooted = useKernelStore((state) => state.isBooted);

  useEffect(() => {
    // Jalankan boot hanya jika OS belum dalam status booted
    if (!isBooted) {
      boot();
    }
  }, [boot, isBooted]);

  return <>{children}</>;
}