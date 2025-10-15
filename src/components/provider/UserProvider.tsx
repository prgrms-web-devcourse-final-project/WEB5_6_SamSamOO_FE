'use client';
import { ReactNode, useEffect } from 'react';
import { useUserStore } from '@/store/useUserStore';
import { SessionSnapshot } from '@/types/session';

interface UserProviderProps {
  initialSession: SessionSnapshot;
  children: ReactNode;
}

export default function UserProvider({ initialSession, children }: UserProviderProps) {
  const setSession = useUserStore((state) => state.setSession);
  const setLoading = useUserStore((state) => state.setLoading);

  useEffect(() => {
    console.log('initialSession', initialSession);
    setLoading(true);
    setSession(initialSession);
  }, [initialSession, setSession]);

  return <>{children}</>;
}
