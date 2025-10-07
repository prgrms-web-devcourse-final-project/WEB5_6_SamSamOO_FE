'use client';
import { ReactNode, useEffect } from 'react';
import { useUserStore } from '@/store/useUserStore';
import { SessionSnapshot } from '@/types/Session';

interface UserProviderProps {
  initialSession: SessionSnapshot;
  children: ReactNode;
}

export default function UserProvider({ initialSession, children }: UserProviderProps) {
  const setSession = useUserStore((state) => state.setSession);

  useEffect(() => {
    setSession(initialSession);
  }, [initialSession, setSession]);

  return <>{children}</>;
}
