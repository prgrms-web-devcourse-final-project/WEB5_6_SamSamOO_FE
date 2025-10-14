'use client';
import { createContext, useContext, useTransition, useEffect, useState } from 'react';

const SearchPendingContext = createContext<{
  isPending: boolean;
  startPending: (callback: () => void) => void;
} | null>(null);

export function SearchPendingProvider({ children }: { children: React.ReactNode }) {
  const [isPending, setIsPending] = useState(false);
  const [reactPending, startTransition] = useTransition();

  useEffect(() => {
    setIsPending(reactPending);
  }, [reactPending]);

  const startPending = (callback: () => void) => {
    startTransition(callback);
  };

  return (
    <SearchPendingContext.Provider value={{ isPending, startPending }}>
      {children}
    </SearchPendingContext.Provider>
  );
}

export const useSearchPending = () => {
  const ctx = useContext(SearchPendingContext);
  if (!ctx)
    throw new Error('useSearchPending은 <SearchPendingContextProvider>안에서 사용해야합니다');
  return ctx;
};
