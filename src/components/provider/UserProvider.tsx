'use client';
import { ReactNode, useEffect, useRef } from 'react';
import { useUserStore } from '@/store/useUserStore';
import { User } from '@/types/User';

interface UserProviderProps {
  initialUser: User | null;
  children: ReactNode;
}

export default function UserProvider({ initialUser, children }: UserProviderProps) {
  const { setUser } = useUserStore();
  const didHydrate = useRef(false);

  useEffect(() => {
    if (didHydrate.current) return;
    didHydrate.current = true;

    if (initialUser) {
      setUser(initialUser);
    } else {
      setUser(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{children}</>;
}
